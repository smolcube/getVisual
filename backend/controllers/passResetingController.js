
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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

console.log(tokenCookie);

// Attach the passwordResetToken cookie to the response
res.cookie('passwordResetToken', passwordResetToken);

// Set a random value 
const random =crypto.randomBytes(32).toString('hex');

const resetLink = `http://localhost:5000/getVisual/login/forgot-password/reset-password/${random}`;

sendEmail(
    email,
    'Password Reset',
    `Click the link below to reset your password, 
if you didn't ask to reset your password
ignore this email.\n\n${resetLink} \n\n\n
Sincerely,\nThe getVisual Team`,
);
res.status(200).json({message:"email sent successfully"});

});


// @desc   Check password reset token
// @route  GET /getvisual/login|signin/forgot-password/reset-password
// @access Private
const checkPassToken = asyncHandler(async (req, res)=>{
    
    const passwordResetToken = req.cookies.passwordResetToken;

    console.log(passwordResetToken);

    // passwordResetToken Validation
    if (!passwordResetToken){
        res.status(400);
        throw new Error('No token genrated');
    }
    
    // Verify the passwordResetToken and check if it's not expired
    try {
        const decoded = jwt.verify(passwordResetToken, process.env.JWT_SECRET);

        // Aaccess the decoded information (expiration time)
        const exp = decoded.exp;
        
        // Check if the passwordResetToken is expired
        if (exp < Date.now() / 1000) {
            res.status(400).json({ message: 'Token has expired' });
            return;
        } else {
            res.status(200).json({ message: "token is valid" });
        }
        
        // res.status(200).json({ message: `reset page and token is:${passwordResetToken}`});
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(400).json({ message: 'Invalid token format' });

        } else if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: 'Token has expired' });
        } else {
            console.error(error);
            res.status(400).json({ message: 'Error verifying token' });
        }
    }
});


// @desc   Reset password for both users and customers
// @route  GET /getvisual/login|signin/forgot-password/reset-password
// @access Private
const setPass = asyncHandler(async (req, res) =>{   // Validation
    const token = req.cookies.passwordResetToken;
    
    const { password, rePassword } = req.body;

    if (!password || !rePassword){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    // Validation and password matching here...
    // Check if 2 field are identical 
    if (password !== rePassword){
        throw new Error('passwords in 2 field should match')
    }

    // Check if passowrds pass the condetions
    if (isPasswordValid(password)){
        res.status(200);
    } else {     
        throw new Error(
            'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character among @$!%*?&, and a minimum total length of 8 characters.'
        );}

    // Hash password
    const hashedPass = passwordHashing(password);

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;

    // Determine whether it's a user or customer based on the passwordResetToken payload
    // It's a user
    const user = await User.findById(id);
    const customer = await Customer.findById(id);
    
    if (user) {
        // Update the user's password in the database
        user.password = hashedPass;
        await user.save();
    }
    else if (customer) {
        // Update the customer's password in the database
        customer.password = hashedPass;
        await customer.save();
    } else {
        res.status(400).json({ message: 'Invalid token' });
        return;
    }

    // Password updated successfully
    res.status(200).json({ message: 'Password updated successfully' });
    } 
    catch (error) {
    // Handle passwordResetToken verification error
    res.status(400).json({ message: 'Invalid token' });
    }

})



module.exports = {
    forgotPass,
    checkPassToken,
    setPass,
};
