
const { addNotificationToQueue } = require('../services/notification.service');
const Notification = require('../models/notification.model')
const NotificationLog = require('../models/notification-log.model')
const mongoose = require('mongoose')

const sendNotification = async (req, res) => {
  try {
    const { userId, message, role, quizId } = req.body;
    const notificationId =  new mongoose.Types.ObjectId();

    // Step 2: Save to Notification collection
    await Notification.create({
      _id: notificationId,
      userId,
      message,
      quizId,
      status: 'pending',
      createdAt: new Date().getTime().toString()
    });
  
    // Step 3: Save to NotificationLog collection
    await NotificationLog.create({
      notificationId,
      userId,
      type: 'push',
      status: 'pending',
      role,
      quizId
    });
  
    // Add notification with role and quizId to the queue
    await addNotificationToQueue(notificationId,userId, message, role, quizId);

    res.status(200).json({ success: true, message: "Notification added to queue" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding notification", error:error.message });
  }
};


// SSE endpoint to stream notifications
const streamnotification = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Simulate notification stream
  setInterval(() => {
      const notificationData = JSON.stringify({
          title: 'New Quiz Created',
          body: 'A new quiz has been created. Check it out!',
          timestamp: new Date().toISOString(),
        });
        

    // Send notification data to the client
    res.write(`data: ${notificationData}\n\n`);
  }, 5000); // Send a new notification every 5 seconds
}

module.exports = { sendNotification ,streamnotification};
