const express = require('express');
const Twit = require('../models/Twit');

const { createTwits, getTwits, getTwit, likeTwit, deleteTwit } = require('../controllers/twits')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router();

router
    .route('/')
    .post(protect, authorize('user'), createTwits)
    .get(advancedResults(Twit, 'comments'), getTwits);

router
    .route('/:id')
    .get(getTwit);

router
    .route('/:twitId/likes')
    .patch(likeTwit);

router
    .route('/:id')
    .delete(protect, authorize('user'), deleteTwit);
    

module.exports = router;