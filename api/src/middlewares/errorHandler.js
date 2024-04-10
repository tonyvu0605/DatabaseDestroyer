// Catch all error handler middleware
import logger from '../utils/logger.js';

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  logger.error({ err, status: statusCode, path: req.path }, 'Error occurred');

  res.status(statusCode).json({ message });
}

export default errorHandler;
