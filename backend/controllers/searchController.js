
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc   searching for all types of users
// @route  GET /getvisual/search?q
// @access Public
const search = asyncHandler(async (req, res) => {
    try {
        const searchTerm = req.query.q; // Assuming the search query is passed as a query parameter
    
        // Perform search query on the 'username' field of the User model
        const results = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
    
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

module.exports = {
    search,
};