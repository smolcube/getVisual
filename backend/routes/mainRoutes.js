const express = require('express');
const router = express.Router();

// import controllers
const { main } = require('../controllers/mainController');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController')

// Main routes
router.get('|&/main', main);
router.post('/register|signup',register);
router.post('/login|signin',login);

module.exports = router;
