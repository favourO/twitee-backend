const express = require('express');
const Comment = require('../models/Comment');
const Twit = require('../models/Twit');

const { createComment, getComments } = require('../controllers/comments')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router
    .route('/:twitId')
    .post(protect, authorize('user'), createComment)
    
router
    .route('/')
    .get(getComments);



module.exports = router;