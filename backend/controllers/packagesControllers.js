const asyncHandler = require('express-async-handler');

// import models
const Package = require('../models/packageModel');


// @desc   Get all packages based on state
// @route  GET /getVisual/dashboard/:state
// @access Private
const displayAll = asyncHandler(async (req, res) => {
    console.log("display all");

    const { state } = req.params;
    if (state === "pending"){
    try {
        const packages = await Package.find({ state: false }).populate('user', 'username');
        res.status(200).json({ packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ message: 'Server error' });
    }
    } else if (state === "approved"){
        try {
            const packages = await Package.find({ state: true }).populate('user', 'username');
            res.status(200).json({ packages });
        } catch (error) {
            console.error('Error fetching packages:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
});



// @desc   Get one package based on id
// @route  GET /getVisual/dashboard/:state/:id
// @access Private
const displayOne = asyncHandler(async (req, res) => {
    console.log("display one");
    const { id, state } = req.params;

    // display one approved packageItemsDets
    if (state === "pending"){
        try {
            const packageItem = await Package.find({ _id:id ,state: false }).populate('user', 'username');
            res.status(200).json({ packageItem });
        } catch (error) {
            console.error('Error fetching packages:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
});
 

// @desc   Change state to true
// @route  PUT /getVisual/dashboard/:state/:id/accpect
// @access Private
const confirmAccept = asyncHandler(async (req, res) => {
    console.log("accept one");

});
 

// @desc   Change state to false
// @route  PUT /getVisual/dashboard/:state/:id/reject
// @access Private
const confirmReject = asyncHandler(async (req, res) => {
    console.log("reject one");
});

module.exports = {
    displayAll,
    displayOne,
    confirmAccept,
    confirmReject,
};