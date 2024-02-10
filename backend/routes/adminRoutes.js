const express = require('express');
const router = express.Router();

// import controllers
//const { main } = require('../controllers/mainController');
const { dashboard } = require('../controllers/dashboardController');
const { adminLogin } = require('../controllers/adminController');

const { protect } = require('../middleware/authHandler')

// Main routes
router.get('/main', dashboard);
router.post('/login|signin', adminLogin);
router.post('/logout');

router.get('/:username');
router.get('/posts');
router.get('/post/:id');
router.put('/post/:id');
router.delete('/post/:id');

module.exports = router;
