
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

//JWT module
const generateJWTToken = require('../config/jwt');

// Modules
const { isPasswordValid, passwordHashing } = require('../utils/passwordFunc');
const { sendEmail } = require('../utils/sendEmail');

// Import models
const User = require('../models/userModel');
const Customer = require('../models/customerModel');


// @desc   Forgot password for both users and customers
// @route  POST /getvisual/login|signin/forogt-password
// @access Private
const forgotPass = asyncHandler(async (req, res)=>{
    const { email } = req.body;
    if ( !email ){
        //console.log('Email is missing'); 
        res.status(400).json({message:'Please enter your email address'});
    } 

// Check if email exists in users and customers model
const user = await User.findOne({ email });
const customer = await Customer.findOne({ email });

if (!user && !customer){
    throw new Error("Email doesn't exist");
}

// Determine which model was found and retrieve the id
let id;
if (user) {
    id = user._id; // Assuming User model has a field named '_id' for user id
} else if (customer) {
    id = customer._id; // Assuming Customer model has a field named '_id' for customer id
}

// Generate a unique passwordResetToken for password reset
const passwordResetToken = generateJWTToken({ id }, "15m");

// Store the passwordResetToken in a cookie and set its expiration time
const tokenCookie = cookie.serialize('passwordResetToken', passwordResetToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    path: '/getVisual/login/reset-password', // Set the cookie path to match your reset password route
    httpOnly: true, // Make the cookie accessible only via HTTP
});

// Attach the passwordResetToken cookie to the response
res.setHeader('Set-Cookie', [tokenCookie]);

const resetLink = `http://localhost:5000/getVisual/login/forgot-password/reset-password/?passwordResetToken=${passwordResetToken}`;

sendEmail(
    email,
    'Password Reset',
    `Click the link below to reset your password, 
if you didn't ask to reset your password
ignore this email.\n\n${resetLink} \n\n\n
Sincerely,\nThe getVisual Team`,
res );
/**/
});


// @desc   Reset password for both users and customers
// @route  POST /getvisual/login|signin/forgot-password/reset-password
// @access Private
const resetPass = asyncHandler(async (req, res)=>{
    const { password, rePassword} = req.body;
    const { passwordResetToken } = req.header.cookie;
    // Validation
    if (!password || !rePassword){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    // passwordResetToken Validation
    if (!passwordResetToken){
        res.status(400);
        throw new Error('No token genrated');
    }
    
    // Verify the passwordResetToken and check if it's not expired
    try {
        const decoded = jwt.verify(passwordResetToken, process.env.JWT_SECRET);

        // Now, you can access the decoded information, including the expiration time
        const { exp } = decoded;

        // Check if the passwordResetToken is expired
        if (exp < Date.now() / 1000) {
            res.status(400).json({ message: 'Token has expired' });
            return;
        }

    // Validation and password matching here...
    // Check if 2 field are identical 
    if (password !== rePassword){
        throw new Error('passwords in 2 field should match')
    }

    // Check if passowrds pass the condetions
    if (isPasswordValid(password)){
        res.status(200);    
        throw new Error(
            'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character among @$!%*?&, and a minimum total length of 8 characters.'
        );
    }
    } catch (error) {
        // Handle passwordResetToken verification error
        res.status(400).json({ message: 'Invalid token' });
    }

    // Hash password
    const hashedPass = passwordHashing(password);

    try{
    // Determine whether it's a user or customer based on the passwordResetToken payload
    if (decoded.userId) {
    // It's a user
    const user = await User.findById(decoded.userId);
    if (user) {
        // Update the user's password in the database
        user.password = hashedPass;
        await user.save();
    }
    
    } else if (decoded.customerId) {
    // It's a customer
    const customer = await Customer.findById(decoded.customerId);
    if (customer) {
        // Update the customer's password in the database
        customer.password = hashedPass;
        await customer.save();
    }
    } else {
        const user = await User.findById(token._id);

    return;
    }

    // Password updated successfully
    res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
    // Handle passwordResetToken verification error
    res.status(400).json({ message: 'Invalid token' });
    }
});


module.exports = {
    forgotPass,
    resetPass,
};
