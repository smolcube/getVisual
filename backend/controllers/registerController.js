//*** DONE ***//
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const cookie = require('cookie');

// Import models
const Customer = require('../models/customerModel');
const User = require('../models/userModel');

// modules
const generateJWTToken = require('../config/jwt');
const { isPasswordValid, passwordHashing } = require('../utils/passwordFunc');
const { sendEmail } = require('../utils/sendEmail');
const { cookieToken } = require('../utils/cookieToken');

// @desc   Register new user
// @route  POST /getvisual/register|signup
// @access Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, accType } = req.body;

  // Simple Validation
  if (!username || !email || !password || !accType) {
      res.status(400);
      throw new Error('Please fill all fields');
  }

  // Email validation using a regular expression
  const emailConditions = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailConditions.test(email)) {
      res.status(400);
      throw new Error('Invalid email format');
  }

  // Check password conditions
  if (!isPasswordValid(password)) {
      res.status(400);
      throw new Error('Password must have at least one uppercase letter, one lowercase letter, one digit, one special character among @$!%*?&, and a minimum total length of 8 characters.');
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
  const hashedPass = passwordHashing(password);

  // Generate JWT
  const registerToken = generateJWTToken({ email }, "24hr");
  const random = crypto.randomBytes(32).toString('hex');
  const registerLink = `http://localhost:5000/getVisual/signup/confirm-email/${random}`;

  // make and save a cookie
  cookieToken(req, res, 'registerToken',
      registerToken, 24 * 60 * 60 * 1000,
      '/getVisual/signup/confirm-email');

  // Send email
  await sendEmail(
      email,
      'Email verification',
      `Dear ${username},\n\nThank you for registering with getVisual! To complete your registration and verify your email address, please click on the link below:\n\n${registerLink}\n\nIf you didn't request this registration, please ignore this email.\n\nThank you for choosing getVisual!\n\nSincerely,\nThe getVisual Team`
  );

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

  // check creation
  if (createdAccount) {
      return res.status(201).json({
          _id: createdAccount.id,
          username: createdAccount.username,
          email: createdAccount.email,
          accType: createdAccount.accType,
          token: registerToken,
          message: "REGISTERED SUCCESSFULLY"
      });
  } else {
      res.status(400);
      throw new Error('Invalid account data');
  }
});


// @desc   Confirm email
// @route  GET /getvisual/register/confirm-email/:registerToken
// @access Private 
const confirmEmail = asyncHandler(async (req, res) => {
  const registerToken = req.cookies.registerToken;

  if (!registerToken) {
    res.status(400);
    throw new Error('Invalid token');
  }
  
  try {  
    // Verify the token and extract the user/customer ID
    const decodedToken = jwt.verify(registerToken, process.env.JWT_SECRET);
    const email = decodedToken.email;

    // Update the 'verified' attribute in the User or Customer model
    const user = await User.findOne({email: email});
    const customer = await Customer.findOne({email: email});

    if (user) {
      // Update 'verified' attribute for User
      user.verified = true;
      await user.save();
    } else if (customer) {
      // Update 'verified' attribute for Customer
      customer.verified = true;
      await customer.save();
    } else {
      return res.status(404).json({ error: 'User or Customer not found' });
    }

    res.clearCookie('registerToken');

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  register,
  confirmEmail,
};
