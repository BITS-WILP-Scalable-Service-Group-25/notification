const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  _id:String,
  userId: { type: String, required: true },
  quizId:{ type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  createdAt: { type: String, default: new Date().getTime() },
});

module.exports = mongoose.model('Notification', notificationSchema);
