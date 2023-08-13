
const asyncHandler = require('express-async-handler');

// @desc   log a user in
// @route  POST /getvisual/login|signin
// @access Public

const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'login page' });
});

module.exports = {
    login
};
 