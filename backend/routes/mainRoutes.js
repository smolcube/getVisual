const express = require('express');
const router = express.Router();

// import controllers
const { main} = require('../controllers/mainController');
const { register, confirmEmail } = require('../controllers/registerController');
const { login, getProfile } = require('../controllers/loginController')
const { forgotPass , checkPassToken, setPass } = require('../controllers/passResetingController')

// Main routes
router.get('/', main);
router.post('/register',register);
router.get('/register/confirm-email/:registerToken',confirmEmail);

router.post('/login',login);

router.post('/login/forgot-password', forgotPass);
router.get('/login/forgot-password/reset-password/:passwordResetToken', checkPassToken);
router.post('/login/forgot-password/reset-password/:passwordResetToken',setPass);

router.get('/:username', getProfile);


module.exports = router;
