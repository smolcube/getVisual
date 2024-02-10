const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// Import models
const Admin = require('../models/adminModel')
const Customer = require('../models/customerModel')
const User = require('../models/userModel')

// @desc   Protecting routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get admin from the token
      req.admin = await Admin.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
});

// @desc   Privating routes
const private =asyncHandler(async (req, res, next) =>{

  // Check token
  const isAuth = req.cookies.authCookie;

  if (!isAuth) {
    res.status(401).json({ message: "not authorized" });
  } else {
  // Check token's id
  try {
    const decoded = jwt.verify(isAuth, process.env.JWT_SECRET);

    // Aaccess the decoded information (expiration time)
    const exp = decoded.exp;
    const id = decoded._id;

    // Check if the passwordResetToken is expired
    if (exp < Date.now() / 1000) {
        res.status(400).json({ message: 'Token has expired' });
        return id;
    } else {
        res.status(200).json({ message: "token is valid" });
        const user = await User.findById(id);
        const customer = await Customer.findById(id);
        
    }
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
}}
)

module.exports = { protect, private, }