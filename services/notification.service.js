const { notificationQueue } = require('../config/queue');

const addNotificationToQueue = async (userId, message, role, quizId) => {
  await notificationQueue.add('sendNotification', {
    notificationId,
    userId,
    message,
    role,
    quizId,
  });
};

module.exports = { addNotificationToQueue };
