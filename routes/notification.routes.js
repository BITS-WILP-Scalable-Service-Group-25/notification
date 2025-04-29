const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller');

router.post('/notifications', NotificationController.sendNotification);
router.get('/notifications/:userId', NotificationController.getUserNotifications);
router.patch('/notifications/:id/read', NotificationController.markNotificationAsRead);

module.exports = router;