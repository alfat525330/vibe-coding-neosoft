const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
  });
  app.use('/api/', limiter);
};

module.exports = setupSecurity;
