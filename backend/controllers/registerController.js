
const asyncHandler = require('express-async-handler');
// @desc   Register new user
// @route  POST /getvisual/register|signup
// @access Public

// const User = require('../models/User'); // Assuming you have a User model

// Display registration form
/* const showRegistrationForm = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Display registration form here' });
});
*/
// Handle registration form submission
const register = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'register page' })
});

module.exports = {
    register
};
