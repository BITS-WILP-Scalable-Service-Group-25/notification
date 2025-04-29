const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    enum: ['pending', 'sent', 'delivered', 'failed'],
    default: 'pending',
  },
  attempts: {
    type: Number,
    default: 0,
  },
  lastAttemptAt: Date,
  error: String,
  deliveredAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('NotificationLog', notificationLogSchema);