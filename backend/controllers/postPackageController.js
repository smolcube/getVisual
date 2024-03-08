const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

// models
const Package = require('../models/packageModel');
const User = require('../models/userModel');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000}, // Limit file size to 1MB
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('file', 10);// Accepts up to 10 files, using 'files' as the field name

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only! (jpeg, jpg, png, gif)');
  }
}

// @desc   Handle POST request to create a new package
// @route  POST /getVisual/upload/users/:username/post-package
// @access Private
const postPackage = asyncHandler(async (req, res) => {
  try {
    console.log('Request Headers:', req.headers);
    // Retrieve the token from the cookie
    const authCookie = req.cookies.authCookie;
    console.log(authCookie);
    if (!authCookie) {
      console.log("authCookie not found");
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(authCookie, process.env.JWT_SECRET);
    const userId = decoded.id;

    console.log(userId)

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User Not found' });
    }

    // Proceed with file upload and package creation
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err }); // Error handling for file upload
      }
      if (!req.files || req.files.length === 0) { // Check if files are present
        return res.status(400).json({ message: 'Error: No Files Selected!' });
      }

      try {
        // Extract form data
        const { name, desc, tags,state, price, category } = req.body;
        const imagePaths = req.files.map(file => `uploads/${file.filename}`);

        // Create new package instance
        const newPackage = new Package({
          name,
          desc,
          images: imagePaths,
          tags: tags.split(','),
          state,
          user: userId, 
          price,
          category
        });

        // Save package to database
        await newPackage.save();

        res.status(201).json({ message: 'Package created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
});

module.exports = {
  postPackage,
}