const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

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