require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tokenRoutes = require('./routes/token.routes');
const notificationRoutes = require('./routes/notification.routes');
require('./jobs/notification.processor'); // Start the worker

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// After DB connection
require('./jobs/push.processor');

// Routes
app.use('/api', tokenRoutes);
app.use('/api', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});