const { Queue } = require('bullmq');
const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis(process.env.REDIS_URL);

const notificationQueue = new Queue('notification-high', { connection });

module.exports = { notificationQueue };

