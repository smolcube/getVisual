const express = require('express');
const router = express.Router();

const { imageController } = require('../controllers/imagesController');

// controllers
const { postPackage } = require('../controllers/postPackageController');

router.post('/users/:username/post-package', postPackage);


module.exports = router;
