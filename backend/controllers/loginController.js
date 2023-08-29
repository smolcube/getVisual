//*** DONE ***//
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//JWT module
const generateJWTToken = require('../config/jwt');

// Import models
const User = require('../models/userModel');
const Customer = require('../models/customerModel');

// @desc   Login
// @route  POST /getvisual/login|signin
// @access Public
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body; //"identifier" can be either email or username

  // Validation
  if (!identifier || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // check credentials user OR customer
  // Check if user exists and credentials match (using email or username) 
  // compare passwords (plain text & hashed)
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateJWTToken(user._id);
    res.json({
      username: user.username,
      email: user.email,
      accType: user.accType,
      token: token,
      message: 'LOGGED IN SUCCESSFULLY',
    });
    return;
  }

  // Check if customer exists and credentials match (using email or username)
  const customer = await Customer.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (customer && (await bcrypt.compare(password, customer.password))) {
    const token = generateJWTToken(customer._id);
    res.json({
      username: customer.username,
      email: customer.email,
      accType: customer.accType,
      token: token,
      message: 'LOGGED IN SUCCESSFULLY',
    });
    return;
  }

  // Invalid credentials
  res.status(401).json({ message: 'Invalid credentials' });
});

// @desc   Get profile
// @route  GET /getvisual/username
// @access Public AND private
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'user profile page' });
});

module.exports = {
  login,
  getProfile,
};