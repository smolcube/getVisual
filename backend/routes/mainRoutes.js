const express = require('express');
const router = express.Router();

// import controllers
const { main} = require('../controllers/mainController');
const { register, confirmEmail } = require('../controllers/registerController');
const { login, getProfile } = require('../controllers/loginController')
const { forgotPass ,verifyUser,  resetPass } = require('../controllers/passResetingController')
const { private } = require('../middleware/authHandler');
const { PostPackage } = require('../controllers/postPackageController');


// Main routes
router.get('/', main); // Visitors and there should be another on for registered
router.post('/signup',register);
router.get('/signup/confirm-email/:registerToken',confirmEmail);

router.post('/login',login);

router.post('/auth/forgot-password', forgotPass);
router.get('/auth/forgot-password/reset-password/:passwordResetToken', verifyUser);
router.post('/auth/forgot-password/reset-password/:passwordResetToken', resetPass);


router.post('/getVisual/users/:username/post-package', PostPackage);

router.get('/profile/:username', private, getProfile);


module.exports = router;
