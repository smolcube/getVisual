const asyncHandler = require('express-async-handler');

const Package = require('../models/packageModel');

// Endpoint to retrieve image filenames
const imageController = asyncHandler(async (req, res) => {
  try {
    const packages = await Package.find(); // Assuming you have a Package model
    const imageFilenames = packages.map(package => package.images); // Assuming image filenames are stored in the 'image' field
    
    console.log(imageFilenames)
    res.json(imageFilenames);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
});

module.exports = imageController;
