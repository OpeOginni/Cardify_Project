// Here is a module that will help make out Error Handling a Whole lot easier
class AppError extends Error {
  constructor(message, statusCode) {
    // Takes in an Error Message and the Status Code
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // If the status Code starts with a 4(400, 404, etc) the status is fail, else its an error
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
