const { Worker } = require('bullmq');
const { connection } = require('../config/queues');
const NotificationService = require('../services/notification.service');
const FCMService = require('../services/fcm.service');

const worker = new Worker(
  'notification-high',
  async (job) => {
    const { notificationId, userId, title, body, data } = job.data;
    
    try {
      // Send push notification
      await FCMService.sendToUser(userId, title, body, data);
      
      // Log successful delivery
      await NotificationService.logNotificationAttempt(
        notificationId,
        'push',
        'delivered'
      );
      
      return { success: true };
    } catch (error) {
      // Log failed attempt
      await NotificationService.logNotificationAttempt(
        notificationId,
        'push',
        'failed',
        error
      );
      throw error;
    }
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Push notification sent for job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Push notification failed for job ${job.id}:`, err);
});

module.exports = worker;