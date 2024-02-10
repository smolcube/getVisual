//*** DONE ***//
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//JWT module
const generateJWTToken = require('../config/jwt');

// Modules
const { cookieToken } = require('../utils/cookieToken');

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
    const authToken = generateJWTToken({id: user._id}, "24hr");
    
  // make and save a cookie
  cookieToken(req, res, 'authCookie',
      authToken, 24 * 60 * 60 * 1000,
      '/profile/:username');

    res.json({
      username: user.username,
      email: user.email,
      accType: user.accType,
      token: authToken,
      message: 'LOGGED IN SUCCESSFULLY',
    });
    return;
  }

  // Check if customer exists and credentials match (using email or username)
  const customer = await Customer.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (customer && (await bcrypt.compare(password, customer.password))) {
    const authToken = generateJWTToken({id: customer._id}, "24hr");

  // make and save a cookie
  cookieToken(req, res, 'authCookie',
    authToken, 24 * 60 * 60 * 1000,
    '/');

    res.json({
      username: customer.username,
      email: customer.email,
      accType: customer.accType,
      token: authToken,
      message: 'LOGGED IN SUCCESSFULLY',
    });
    return;
  }
  
  // Invalid credentials
  res.status(401).json({ message: 'Invalid credentials' });
});

// @desc   Get profile
// @route  GET /getvisual/:username
// @access Public AND private
const getProfile = asyncHandler(async (req, res) => {
  const username = req.params.username; // Access the 'username' parameter from the URL
  
  try {
    // Find the user by username in the database
    const profile = await User.findOne({ username });

    if (!profile) {
      return res.status(404).json({ message: 'profile not found' });
    }

    // Return the user's profile information
    res.status(200).json({ username: profile.username, email: profile.email, /* Add other profile fields here */ });
  } 
  catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
  
 
  // res.send(`Username: ${username}`);
  // res.status(200).json({ message: 'user profile page' });

});

module.exports = {
  login,
  getProfile,
};