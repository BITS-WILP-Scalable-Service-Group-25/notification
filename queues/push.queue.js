const { Queue } = require('bullmq');
const  connection  = require('../config/queue');



const notificationQueue = new Queue('notification-queue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

module.exports = notificationQueue;