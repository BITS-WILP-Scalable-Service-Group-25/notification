const express = require('express');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/notification.routes');
const tokenRoutes = require('./routes/token.routes')

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/token', tokenRoutes);

module.exports = app;
