
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookie = require('cookie');

//JWT module
const generateJWTToken = require('../config/jwt');

// Modules
const path = require('path');
const { isPasswordValid, passwordHashing } = require('../utils/passwordFunc');
const { sendEmail } = require('../utils/sendEmail');
const { cookieToken } = require('../utils/cookieToken');

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
    throw new Error("عنوان البريد الإلكتروني غير موجود");
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

// make and save a cookie
cookieToken(req, res, 'passwordResetToken', 
        passwordResetToken, 15 * 60 * 1000,
        '/getVisual/auth/forgot-password/reset-password');
  

// Set a random value 
const random =crypto.randomBytes(32).toString('hex');

const resetLink = `http://localhost:5000/getVisual/auth/forgot-password/reset-password/${random}`;

sendEmail(
    email,
    'Password Reset',
    `Click the link below to reset your password, 
if you didn't ask to reset your password
ignore this email.\n\n${resetLink} \n\n\n
Sincerely,\nThe getVisual Team`,
);
res.status(200).json({message:"الرجاء التحقق من بريدك الإلكتروني"});

});


// @desc   Reset password for both users and customers
// @route  GET /getvisual/auth/forgot-password/reset-password/:passwordResetToken
// @access Private
const verifyUser = asyncHandler(async (req, res) => {
    const token = req.cookies.passwordResetToken;
    if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check decoded properties (e.g., id, exp)
        console.log(decoded.id); // Example: Output the user ID
        console.log(decoded.exp); // Example: Output the token expiration time

        res.render('ResetPass');

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

// @desc   Reset password for both users and customers
// @route  POST /getvisual/auth/forgot-password/reset-password/:passwordResetToken
// @access Private
const resetPass = asyncHandler(async (req, res) => {
    const { password, rePassword } = req.body;
    const passwordResetToken = req.cookies.passwordResetToken;

// Validate password fields
if (!password || !rePassword) {
    res.status(400).json({ message: 'Please fill all fields' });
    return;
}

// Validate password matching
if (password !== rePassword) {
    res.status(400).json({ message: 'Passwords in both fields should match' });
    return;
}

// Validate password complexity
if (!isPasswordValid(password)) {
    res.status(400).json({
        message: 'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character among @$!%*?&, and a minimum total length of 8 characters.'
    });
    return;
}

try {
    // Verify the token
    const decoded = jwt.verify(passwordResetToken, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID in both User and Customer collections
    const user = await User.findById(userId);
    const customer = await Customer.findById(userId);

    if (!user && !customer) {
        res.status(400).json({ message: 'Not found' });
        return;
    }

        // Choose the model based on whether user or customer is found
        const Found = user || customer;

        // Hash the new password
        const hashedPassword = passwordHashing(password);

        // Update user's password
        Found.password = hashedPassword;
        await Found.save();

    // Clear passwordResetToken cookie
    res.clearCookie('passwordResetToken');

    // Password updated successfully, redirect to login page
    res.status(200).json({ message: 'Password updated successfully. Redirecting to login page...' });
    res.redirect('/getvisual/login');

    // Password updated successfully
    res.status(200).json({ message: 'Password updated successfully' });
} catch (error) {
    if (error.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'Invalid token format' });
    } else if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'Token has expired' });
    } else {
        console.error(error);
        res.status(400).json({ message: 'Error resetting password' });

        // If an error occurs, redirect to the forgot password page
        res.redirect('/getVisual/auth/forgot-password'); // Adjust the route as per your application's routes
    }
}});

module.exports = {
    forgotPass,
    verifyUser,
    resetPass,
    
};
/*
const { password, rePassword } = req.body;
const { passwordResetToken } = req.params;

// Validate password fields
if (!password || !rePassword) {
    res.status(400).json({ message: 'Please fill all fields' });
    return;
}

// Validate password matching
if (password !== rePassword) {
    res.status(400).json({ message: 'Passwords in both fields should match' });
    return;
}

// Validate password complexity
if (!isPasswordValid(password)) {
    res.status(400).json({
        message: 'Password must have at least one uppercase letter, one lowercase letter, one digit, one special character among @$!%*?&, and a minimum total length of 8 characters.'
    });
    return;
}

try {
    // Verify the token
    const decoded = jwt.verify(passwordResetToken, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
    }

    // Hash the new password
    const hashedPassword = passwordHashing(password);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Clear passwordResetToken cookie
    res.clearCookie('passwordResetToken');

    // Password updated successfully
    res.status(200).json({ message: 'Password updated successfully' });
} catch (error) {
    if (error.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'Invalid token format' });
    } else if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'Token has expired' });
    } else {
        console.error(error);
        res.status(400).json({ message: 'Error resetting password' });
    }
}*/
