
const asyncHandler = require('express-async-handler');

// @desc   Get home page
// @route  GET /getvisual/
// @access Public
const main = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'main page' });
});

// @desc   logout
// @route  GET /getvisual/auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
    console.log("logout hit");
    try {
        // Clear the cookie on the server-side
        res.clearCookie('authCookie');
        // Send a success response
        res.json({ message: 'Logout successful' });
      } catch (error) {
        console.error(error);
      }

});

module.exports = {
    main,
    logout,
};
 