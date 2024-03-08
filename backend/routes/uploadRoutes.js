const express = require('express');
const router = express.Router();


// controllers
const { postPackage } = require('../controllers/postPackageController');

router.post('/users/:username/post-package', postPackage);


module.exports = router;
