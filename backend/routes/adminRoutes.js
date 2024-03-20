const express = require('express');
const router = express.Router();

// import controllers
const { dashboard } = require('../controllers/dashboardController');
const { adminLogin } = require('../controllers/adminController');
const { displayAll, displayOne, confirmAccept, confirmReject } = require('../controllers/packagesControllers');

const { protect } = require('../middleware/authHandler')

// Main routes
router.post('/login', adminLogin);
router.get('/', dashboard);

// Main routes
router.get('/:state', displayAll);
router.get('/:state/:id', displayOne);
// Operations
router.put('/:state/:id/accept', confirmAccept);
router.put('/:state/:id/reject', confirmReject);

module.exports = router;
