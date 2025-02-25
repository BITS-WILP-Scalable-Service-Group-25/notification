const { notificationQueue } = require('../config/queue');

const addNotificationToQueue = async (userId, message) => {
  await notificationQueue.add('sendNotification', { userId, message });
};

module.exports = { addNotificationToQueue };
