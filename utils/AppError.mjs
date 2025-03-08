// utils/AppError.mjs

class AppError extends Error {
  constructor(message="Something went wrong!", statusCode=500) {
    super(message); // Call the Error constructor
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Identify operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
