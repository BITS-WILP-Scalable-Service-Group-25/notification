const Notification = require('../models/notification.model');
const NotificationLog = require('../models/notification-log.model');
const priorityQueue = require('../queues/priority-queue');
const FCMService = require('./fcm.service');
const EmailService = require('./email.service');
const SMSService = require('./sms.service');

class NotificationService {
  async createNotification(notificationData) {
    try {
      // Save to database
      const notification = new Notification(notificationData);
      await notification.save();

      // Add to appropriate priority queue
      const result = await priorityQueue.add({
        ...notificationData,
        notificationId: notification._id,
      });

      return { notification, queueInfo: result };
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async logNotificationAttempt(notificationId, type, status, error = null) {
    try {
      const update = {
        status,
        $inc: { attempts: 1 },
        lastAttemptAt: new Date(),
      };

      if (status === 'delivered') {
        update.deliveredAt = new Date();
      }

      if (error) {
        update.error = error.message || String(error);
      }

      await NotificationLog.findOneAndUpdate(
        { notificationId, type },
        update,
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error logging notification attempt:', error);
    }
  }

  async getNotificationStatus(notificationId) {
    return NotificationLog.find({ notificationId });
  }

  async getUserNotifications(userId, limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    return Notification.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async markAsRead(notificationId) {
    return Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  }
}

module.exports = new NotificationService();