require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const { startScheduler } = require('./services/scheduler');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('[SERVER] Authenticating database connection...');
    await sequelize.authenticate();
    console.log('[SERVER] Database connection authenticated successfully.');

    // Start Express listener
    app.listen(PORT, () => {
      console.log(`[SERVER] Express server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      
      // Start cart abandonment scheduler
      startScheduler();
    });
  } catch (error) {
    console.error(`[SERVER CRITICAL ERROR] Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
