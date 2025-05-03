const admin = require("../config/fcm");
const User = require("../models/userToken.model"); // Adjust path as needed

/**
 * Send a push notification to a user's device using userId.
 * @param {string} userId - The ID of the user in the database.
 * @param {string} title - Notification title.
 * @param {string} body - Notification body.
 * @param {Object} data - Additional custom data (optional).
 */
const sendToUser = async (userId, title, body, data = {}) => {
  try {
    // 🔍 Step 1: Fetch user by ID
    const user = await User.findOne(userId);

    if (!user || !user.fcmToken) {
      throw new Error(`FCM token not found for user ${userId}`);
    }

    const message = {
      token: user.token,
      notification: {
        title,
        body,
      },
      data,
    };

    // 🚀 Step 2: Send notification
    const response = await admin.messaging().send(message);
    console.log("✅ FCM sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending FCM:", error.message);
    throw error;
  }
};

module.exports = { sendToUser };
