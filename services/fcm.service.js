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
    const user = await User.findOne({userId:userId});

    if (!user || !user.fcmToken) {
      throw new Error(`FCM token not found for user ${userId}`);
    }

    // Convert all data values to strings
    const stringData = {};
    for (const key in data) {
      stringData[key] = String(data[key]);
    }

    console.log(data,'data')

    const message = {
      token: "fSIW07QfDe3Inmwxd_T5sh:APA91bEMZcZoqdiD0FyIP5dUdOouNuypXjODA3_s2vA82y9bXYPx5zN39jlo066XjCkrnKcjufUXKfYYJf2IuZYdTWckzaPh6ckJeGt138NPCmdIMxpVlRo",
      notification: {
        title,
        body,
      },
      data:stringData,
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
