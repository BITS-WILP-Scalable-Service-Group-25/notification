const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    ref: 'Notification',
    required: true,
  },
  userId: {
    type:String,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'push'],
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  attempts: {
    type: Number,
    default: 0,
  },
  lastAttemptAt: Date,
  error: String,
  deliveredAt: Date,

  // ✅ Added at top level
  role: {
    type: Number,
    enum: [1, 2, 3], // 1: create, 2: update, 3: delete (for clarity)
    required: true,
  },
  quizId: {
    type:String,
    ref: 'Quiz', // assuming you have a Quiz model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('NotificationLog', notificationLogSchema);
