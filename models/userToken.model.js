const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['web', 'android', 'ios'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '365d', // Automatically delete after 1 year
  },
});

module.exports = mongoose.model('UserToken', userTokenSchema);