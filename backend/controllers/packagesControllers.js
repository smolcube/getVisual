const asyncHandler = require('express-async-handler');

// import models
const Package = require('../models/packageModel');


// @desc   Get all packages based on state
// @route  GET /getVisual/dashboard/:state
// @access Private
const displayAll = asyncHandler(async (req, res) => {
    
    console.log("display all");
    const { state } = req.params;

    if (state === "approved"){
    try {
        const packages = await Package.find({ state: true }).populate('user', 'username');
        res.status(200).json({ packages });
    } catch (error) {
        console.error(`Error fetching ALL ${state} packages:`, error);
        res.status(500).json({ message: 'Server error' });
    }
    } 
    else if ( "pending" || "rejected" ){
        try {
            const packages = await Package.find({ state: false }).populate('user', 'username');
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
            const packageItem = await Package.find({ _id:id , state: false })
                                        .populate('user', 'username')
            res.status(200).json({ packageItem });
            console.log("display ", packageItem);
        } catch (error) {
            console.error('Error fetching ONE PENDDING package:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    else if ( state === "approved" ){
        try {
            const packageItem = await Package.find({ _id:id , state: true })
                                        .populate('user', 'username')
            res.status(200).json({ packageItem });
            console.log("display ", packageItem);
        } catch (error) {
            console.error('Error fetching ONE package:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
});
 
// @desc   Changes state to true or false bases on func parameter
// @route  PUT /getVisual/dashboard/:state/:func/:id
// @access Private
const updateStatus = asyncHandler(async (req, res) => {

    // Assuming you're also passing a function in the URL
    const { func, state, id } = req.params; 

    try {
        let updatedPackage;
        if (func === "accept") {
            console.log(`function: ${id}`);
            updatedPackage = await Package.findByIdAndUpdate(id, { state: true }, { new: true });
            updatedPackage.save();
            console.log({updatedPackage});

        } 
        else if (func === "reject") {
            console.log(`function: ${func}`);
            updatedPackage = await Package.findByIdAndUpdate(id, { state: false }, { new: true });
            updatedPackage.save();
            console.log({updatedPackage});
        } 
        else {
            res.status(400);
            throw new Error('Invalid function specified');
        }

        if (!updatedPackage) {
            res.status(404);
            throw new Error('Package not found');
        }

    } catch (error) {
        console.error(error);
    }
});

module.exports = {
    displayAll,
    displayOne,
    updateStatus,
};