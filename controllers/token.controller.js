const UserToken = require('../models/userToken.model');

const TokenController = {
  async saveToken(req, res) {
    try {
      const { userId, token, platform } = req.body;
  
      // Check if token already exists for this user
      const existingToken = await UserToken.findOne({ userId });
  
      if (existingToken) {
        // If token exists, update it
        existingToken.token = token; // Update the token
        existingToken.platform = platform || 'web'; // Optionally update platform if needed
  
        // Save the updated token
        await existingToken.save();
  
        return res.status(200).json({ message: 'Token updated successfully' });
      }
  
      // If no token exists, create a new one
      const userToken = new UserToken({
        userId,
        token,
        platform,
      });
  
      await userToken.save();
  
      res.status(201).json({
        message: 'Token saved successfully',
        token: userToken,
      });
    } catch (error) {
      console.error('Error saving token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteToken(req, res) {
    try {
      const { userId, token } = req.body;

      const result = await UserToken.deleteOne({ userId, token });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Token not found' });
      }

      res.status(200).json({ message: 'Token deleted successfully' });
    } catch (error) {
      console.error('Error deleting token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = TokenController;