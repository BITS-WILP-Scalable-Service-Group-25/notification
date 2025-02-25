const { addNotificationToQueue } = require("../services/notification.service");

const sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    await addNotificationToQueue(userId, message);
    res
      .status(200)
      .json({ success: true, message: "Notification added to queue" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding notification", error });
  }
};

module.exports = { sendNotification };
