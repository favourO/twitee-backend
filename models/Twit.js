const mongoose = require('mongoose');


const TwitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a twit']
    },

    likes: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
  
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Reverse populate with virtuals
TwitSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'twit',
    justOne: false
})


// Cascade delete courses when a bootcamp is deleted
TwitSchema.pre('remove', async function (next) {
    await this.model('Comment').deleteMany({ twit: this._id })
    next();
  })
module.exports = mongoose.model('Twit', TwitSchema);