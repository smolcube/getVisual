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
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // check credentials user OR customer by email
  // compare passwords (plain text & hashed)
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
   
    // Generate JWT
    const token = generateJWTToken(customer._id);
    res.json({
      username: user.username,
      email: user.email,
      accType: user.accType,
      token: token,
      message: "LOGGED IN SUCCESSFULLY" 
    });
    return; // Exit early since we found a matching user
  }
  const customer = await Customer.findOne({ email });
  if (customer && (await bcrypt.compare(password, customer.password))) {
    
    // Generate JWT
    const token = generateJWTToken(customer._id);
    res.json({
      username: customer.username,
      email: customer.email,
      accType: customer.accType,
      token: token,
      message: "LOGGED IN SUCCESSFULLY" // Add this line to show the account type
    });
    return; // Exit early since we found a matching customer
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
