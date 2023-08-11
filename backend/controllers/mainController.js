const asyncHandler = require('express-async-handler');

const main = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'main page' });
});

module.exports = {
    main
};
