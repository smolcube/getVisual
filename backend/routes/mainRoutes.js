const express = require('express');
const router = express.Router();

// import controllers
const { main} = require('../controllers/mainController');
const { register, confirmEmail } = require('../controllers/registerController');
const { login, getProfile } = require('../controllers/loginController')
const { forgotPass , checkPassToken, setPass } = require('../controllers/passResetingController')
const { private } = require('../middleware/authHandler');


// Main routes
router.get('/', main); // Visitors and there should be another on for registered
router.post('/register',register);
router.get('/register/confirm-email/:registerToken',confirmEmail);

router.post('/login',login);

router.post('/auth/forgot-password', forgotPass);
router.get('/auth/forgot-password/reset-password/:passwordResetToken', checkPassToken);
router.post('/auth/forgot-password/reset-password/:passwordResetToken',setPass);

router.get('/profile/:username', private, getProfile);


module.exports = router;
