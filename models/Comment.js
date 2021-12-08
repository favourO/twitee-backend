const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a twit']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    twit: {
        type: mongoose.Schema.ObjectId,
        ref: 'Twit',
        required: true
    },
  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Comment', CommentSchema);