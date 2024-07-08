const express = require('express');
const router = express.Router();
const path = require('path');

// import controllers
const { main, logout } = require('../controllers/mainController');
const { register, confirmEmail } = require('../controllers/registerController');
const { login, getProfile, deletePackage } = require('../controllers/loginController')
const { forgotPass ,verifyUser,  resetPass } = require('../controllers/passResetingController')
const { search, package } = require('../controllers/searchController')
const { private } = require('../middleware/authHandler');

// Main routes
router.get('/', main); // Visitors and there should be another on for registered

router.post('/signup',register);
router.get('/signup/confirm-email/:registerToken',confirmEmail);

router.post('/login',login);

router.post('/auth/logout',logout);

router.post('/auth/forgot-password', forgotPass);
router.get('/auth/forgot-password/reset-password/:passwordResetToken', verifyUser);
router.post('/auth/forgot-password/reset-password/:passwordResetToken', resetPass);

router.get('/profile/:username', getProfile);
router.delete('/profile/:username/:packageId', deletePackage)

router.get('/search/:searchValue', search);
router.get('/package/:id', package);

module.exports = router;
