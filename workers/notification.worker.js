const { Worker } = require('bullmq');
const { notificationQueue } = require('../config/queue');

const notificationWorker = new Worker(
  'notificationQueue',
  async (job) => {
    console.log(`Processing job: ${job.id} - Sending notification to ${job.data.userId}`);

    // Simulate notification sending
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (!isSuccess) {
      throw new Error('Failed to send notification');
    }

    console.log(`Notification sent: ${job.data.message}`);
  },
  { connection: notificationQueue.opts.connection }
);

notificationWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

notificationWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});
