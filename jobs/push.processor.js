const { Worker } = require('bullmq');
const  connection  = require('../config/queue');
const  notificationQueue  = require('../queues/push.queue');
const NotificationService = require('../services/notification.service');
const NotificationLog = require('../models/notification-log.model')
const FCMService = require('../services/fcm.service');

const worker = new Worker(
  'notification-high',
  async (job) => {

    const { notificationId, userId, title, body, data, role, quizId } = job.data;

    try {
      // Handle delete scenario (role === 3)
      if (role == 3 && quizId) {
        const jobs = await notificationQueue.getJobs(['waiting', 'delayed']);
        for (const queuedJob of jobs) {
          if (
            queuedJob.data.quizId === quizId &&
            queuedJob.id !== job.id
          ) {
            await queuedJob.remove();
            console.log(`🗑️ Removed stale job ${queuedJob.id} for deleted quizId ${quizId}`);
          }
        }

           await NotificationLog.findOneAndUpdate(
        { notificationId, status:'deleted' }, // ensure correct entry
        update,
        { new: true }
      );
    

        

        return { status: 'deleted', message: 'Quiz was deleted, job removed from queue' };
      }

      // Determine action
      let action = '';
      if (role == 1) action = 'created';
      else if (role == 2) action = 'updated';
      else action = 'performed';

      const finalTitle = title || `Quiz ${action}`;
      const finalBody = body || `A quiz has been ${action}.`;

      // Send notification
      await FCMService.sendToUser(userId, finalTitle, finalBody, data || { quizId, role });

      await NotificationLog.findOneAndUpdate(
        { notificationId}, {status:'delivered' }, // ensure correct entry
        { new: true }
      );
    

      return { success: true };
    } catch (error) {
      
      await NotificationLog.findOneAndUpdate(
        { notificationId}, {status:'failed' }, 
        { new: true }
      );
    
     
      throw error;
    }
  },
  { connection }
);

// Listeners
worker.on('completed', (job) => {
  console.log(`✅ Notification completed for job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Notification failed for job ${job.id}:`, err);
});

module.exports = worker;
