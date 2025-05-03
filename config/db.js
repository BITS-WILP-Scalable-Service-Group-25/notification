const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

// MongoDB URI from environment variable or hardcoded
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';

const connectDB = async () => {
  try {
    // Attempt to connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the connection function to be used in other files
module.exports = connectDB;
