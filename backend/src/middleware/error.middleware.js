import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: 'An account with this email already exists',
    });
  }

  let statusCode = error.statusCode || 500;
  let message = error.message;

  if (error.name === 'ValidationError') {
    statusCode = 422;
    message = Object.values(error.errors)[0].message;
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${error.path}`;
  }

  const isProductionError =
    statusCode === 500 && process.env.NODE_ENV === 'production';

  if (statusCode === 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    message: isProductionError ? 'Internal server error' : message,
  });
};
