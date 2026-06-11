const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} - ${err.stack || err.message}`);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    error: {
      message,
      status
    }
  });
};

module.exports = errorHandler;
