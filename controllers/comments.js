const Comment = require('../models/Comment');
const Twit = require('../models/Twit');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc    create a comment
// @route   /api/comment/:twitId
// @access  Private
exports.createComment = asyncHandler(async (req, res, next) => {
    req.body.twit = req.params.twitId;

    req.body.user = req.user.id
    
    const twit = await Twit.findById(req.params.twitId);

    if(!twit) {
        return next(new ErrorResponse(`No twit with the id of ${req.params.twitId}`), 404);
    } 

    const comment = await Comment.create(req.body);

    res.status(200).json({
        success: true,
        data: comment
    })

})



// @desc    get all twits
// @route   /api/comment/
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
    // Get question is access through a route that uses the advance result
    res
    .status(200)
    .json(res.advancedResults);  
    
})