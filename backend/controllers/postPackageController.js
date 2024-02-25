const asyncHandler = require('express-async-handler');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


// @desc   Handle POST request to create a new package
// @route  POST /getVisual/users/:username/post-package
// @access Private
const PostPackage = asyncHandler(async (req, res) => {
  const { name, description, tags, price, category } = req.body;
  const file = req.file; // Access the uploaded file using req.file

  // Check if all required fields are filled
  if (!name || !description || !tags || !price || !category || !file) {
    console.log('Please fill all fields and upload an image.');
    return res.status(400).json({ message: 'Please fill all fields and upload an image.' });
  }

  // You can now use 'name', 'description', 'tags', 'price', 'category', and 'file' variables to handle the uploaded data
  
  res.send('uploaded!!!!');
});

module.exports = {
  PostPackage,
};
