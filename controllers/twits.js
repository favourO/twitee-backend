const Twits = require('../models/Twit');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    create a single twit
// @route   /api/twitee
// @access  Private
exports.createTwits = asyncHandler(async (req, res, next) => {
    // Add user to request.body
    req.body.user = req.user.id

    const twit = await Twits.create(req.body);

    res.status(201).json({
        success: true,
        data: twit
    })
    
})

// @desc    get a single twit
// @route   /api/twitee/:id
// @access  Public
exports.getTwit = asyncHandler(async (req, res, next) => {
    // check if twit exist with the id
    const twit = await Twits.findById(req.params.id);

    if (!twit) {
        return next(new ErrorResponse(`Twit not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: twit
    })
    
})


// @desc    get all twits
// @route   /api/twitee/
// @access  Public
exports.getTwits = asyncHandler(async (req, res, next) => {
    // Get question is access through a route that uses the advance result
    res
    .status(200)
    .json(res.advancedResults);  
    
})


// @desc        like tweets
// @route       /api/twitee/twits/:twitId/like
// @access      Public
exports.likeTwit = asyncHandler(async (req, res, next) => {
    const twit = await Twits.findById(req.params.twitId);

    if (!twit) {
        return next(new ErrorResponse(`Twit not found with id of ${req.params.twitId}`, 404));
    }

    const updateTwit = await Twits.findByIdAndUpdate(req.params.twitId, {
        likes: twit.likes + 1
    }, {
        new: true
    });

    res.json({
        success: true,
        data: updateTwit
    })
})


// @desc        Delete tweets
// @route       /api/twitee/twits/:id
// @access      Private
exports.deleteTwit = asyncHandler( async(req, res, next) => {
    const twitee = await Twits.findById(req.params.id);

    if(!twitee) {
        return next(new ErrorResponse(`Twit not found with id of ${req.params.id}`, 404));
    }

    // console.log(req.user.id)
    console.log(twitee.user)
    if (twitee.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to delete this Twit`, 401));
    }
    //&& req.user.role !== 'user'

    twitee.remove();
    res
        .status(200)
        .json({
            success: true,
            data: `Twit with ${req.params.id} deleted successfully`
    })
})