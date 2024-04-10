const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Package = require('../models/packageModel');

// @desc  searching for all types of users and packages
// @route GET /getVisual/search/:q
// @access Public
const search = asyncHandler(async (req, res) => {
   try {
       const { searchValue } = req.params; // Assuming the search query is passed as a query parameter
      console.log(searchValue);
       // Fetch users sorted alphabetically
       const users = await User.find({}).sort({ username: 1 });

       // Fetch packages sorted by price from cheaper to more expensive
       const packages = await Package.find({}).sort({ price: 1 });

       // Match search term against both users and packages
       const userResults = users.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
       const packageResults = packages.filter(pkg => pkg.name.toLowerCase().includes(searchValue.toLowerCase()));

       // Combine and return the results
       const combinedResults = {
           users: userResults,
           packages: packageResults
       };

       res.json(combinedResults);
   } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Internal Server Error' });
   }
});

// @desc  display package
// @route GET /getVisual/package/:id
// @access Public
const package = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const singlePackage = await Package.findById(id);

    if (!singlePackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(singlePackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
   search,
   package,
};
