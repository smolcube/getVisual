
const asyncHandler = require('express-async-handler');

// @desc   Get home page
// @route  GET /getvisual/main
// @access Public

const main = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'main page' });
});

module.exports = {
    main,
};
 