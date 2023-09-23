const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//JWT module
const generateJWTToken = require('../config/jwt');

// Import models
const Admin = require('../models/adminModel');


// @desc   Get dashboard
// @route  GET /getvisual/dashboard/main
// @access Private
const dashboard = asyncHandler(async (req, res)=>{
    res.status(200).json({message:'dashboard page'});
})

module.exports = {
    dashboard,
  };