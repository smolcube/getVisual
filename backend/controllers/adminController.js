const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//JWT module
const generateJWTToken = require('../config/jwt');

// Import models
const Admin = require('../models/adminModel');


// @desc   Admin login page
// @route  POST /getvisual/dashboard/login|signin
// @access Private
const adminLogin = asyncHandler(async (req, res)=>{
    const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // check credentials
  const admin = await Admin.findOne({ email });
  if (admin && (password, admin.password)){
   
    // Generate JWT
    const token = generateJWTToken({id: admin._id}, "12hr");

    // Set the token in the response headers
    res.setHeader('Authorization', `Bearer ${token}`);
    
    res.json({
      username: admin.username,
      email: admin.email,
      token: token,
      message: "LOGGED IN SUCCESSFULLY" 
    });
    return; // Exit early since we found a matching user
  }
    // Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
});


module.exports = {
    adminLogin,
  };