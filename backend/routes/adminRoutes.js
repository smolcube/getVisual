const express = require('express');
const router = express.Router();

// import controllers
const { dashboard } = require('../controllers/dashboardController');
const { adminLogin } = require('../controllers/adminController');
const { displayAll, displayOne, updateStatus } = require('../controllers/packagesControllers');

const { protect } = require('../middleware/authHandler')

// Main routes
router.post('/login', adminLogin);
router.get('/', dashboard);

// Main routes
router.get('/:state', displayAll);
router.get('/:state/:id', displayOne);

// Operations
router.put('/:state/:func/:id', updateStatus);


module.exports = router;
