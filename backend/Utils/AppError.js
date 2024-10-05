class AppErrors extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.isOperational = true;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppErrors;
