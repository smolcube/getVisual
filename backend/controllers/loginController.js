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
const Package = require('../models/packageModel');

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
      authToken, 60 * 1000,
      '/getVisual');

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
    '/getVisual');

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
    const { authCookie } = req.cookie.authCookie;
        
    // Find the user by username in the database
    const profile = await User.findOne({ username });

    if (!profile) {
      return res.status(404).json({ message: 'profile not found' });
    } else if ( !authCookie ) {
      return res.status(400).json({ message: 'not Auth' });
    }

   // Fetch packages associated with the user
   const packages = await Package.find({ user: profile._id });

   // Return the user's profile information along with the fetched packages
   res.status(200).json({packages});
   console.log(packages);

 } catch (error) {
   // Handle any errors that occur during the database query
   console.error(error);
   res.status(500).json({ message: 'Server Error' });
 }
});



// @desc   Delete a package
// @route  DELETE /profile/:username/:packageId
// @access Private
const deletePackage = asyncHandler(async (req, res) => {
  
  const { username, packageId } = req.params;
  console.log(username, packageId);

  const user = await User.findOne({ username: username });
  const id = user._id;

  try {
    // Find the package in the database
    const package = await Package.findOne({ _id: packageId, user: id });

    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    } else if (package) {
      // Delete the package
      console.log("DELETED PACKAGE", package);
      await package.deleteOne();
    }
  } catch (err) {
    console.error("Error deleting package:", err);
    res.status(500).json({ message: 'Failed to delete package' });
  }

  res.json({ message: 'Package deleted successfully' });
});

module.exports = {
  login,
  getProfile,
  deletePackage,
};