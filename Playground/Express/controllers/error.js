const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(500, message);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational trusted error: send to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: 'failed',
      message: err.message,
    });
  } else {
    // Programming or other error: don't send whole error, send generic message to client
    console.error('ERROR: ', err);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }
    sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
