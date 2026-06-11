const express = require('express');
const setupSecurity = require('./middleware/security');
const errorHandler = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSecurity(app);

const apiRouter = require('./routes/api');

// Simple healthcheck route
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// Mount main API router
app.use('/api', apiRouter);

// Centralized error handling
app.use(errorHandler);

module.exports = app;
