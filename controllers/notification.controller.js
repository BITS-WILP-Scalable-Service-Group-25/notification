const NotificationService = require('../services/notification.service');

const NotificationController = {
  async sendNotification(req, res) {
    try {
      const notificationData = {
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body,
        data: req.body.data,
        priority: req.body.priority || 'medium',
        channels: req.body.channels || ['push'], // ['push', 'email', 'sms']
      };

      const result = await NotificationService.createNotification(notificationData);

      res.status(202).json({
        message: 'Notification queued for delivery',
        notificationId: result.notification._id,
        queue: result.queueInfo.queue,
      });
    } catch (error) {
      console.error('Error queuing notification:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getNotificationStatus(req, res) {
    try {
      const notificationId = req.params.id;
      const status = await NotificationService.getNotificationStatus(notificationId);

      res.status(200).json(status);
    } catch (error) {
      console.error('Error fetching notification status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // ... keep other methods from previous implementation
};

module.exports = NotificationController;