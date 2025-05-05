const express = require('express');
const { sendNotification ,streamnotification} = require('../controllers/notification.controller');

const router = express.Router();

router.post('/send', sendNotification);
router.get('/stream-notifications',streamnotification)

module.exports = router;
