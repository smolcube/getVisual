//*** DONE ***//
const asyncHandler = require('express-async-handler');

// Import models
const Customer = require('../models/customerModel');
const User = require('../models/userModel');

//JWT module
const generateJWTToken = require('../config/jwt');

// @desc   Register new user
// @route  POST /getvisual/register|signup
// @access Public
const register = asyncHandler(async (req, res) => {
    const {username, email, password, accType} = req.body;

    // Simple Validation
    if(!email || !username || !password || !accType){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    // Check if account exists as a Customer
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
    res.status(400);
    throw new Error('Email is already used');
    }

    // Check if account exists as a User
    const userExists = await User.findOne({ email });
    if (userExists) {
    res.status(400);
    throw new Error('Email is already used');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create user OR customer
    let createdAccount;

    if (accType === 'user') {
    createdAccount = await User.create({
      username,
      email,
      password: hashedPass,
      accType,
    });
    } else if (accType === 'customer') {
    createdAccount = await Customer.create({
      username,
      email,
      password: hashedPass,
      accType,
    });
    }
  
    // Generate JWT
    const token = generateJWTToken(createdAccount._id);

    // check creation
    if (createdAccount) {
    res.status(201).json({
      _id: createdAccount.id,
      username: createdAccount.username,
      email: createdAccount.email,
      accType: createdAccount.accType,
      token: token,
      message: "REGISTERED SUCCESSFULLY" 
    });
    } else {
    res.status(400);
    throw new Error('Invalid account data');
    }
});

module.exports = {
  register,
};
