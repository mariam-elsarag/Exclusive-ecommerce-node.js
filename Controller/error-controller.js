const AppErrors = require("../Utils/AppError");

// jwt
const handleJWTError = () => {
  return new AppErrors("Invalid token", 401);
};
const handleExpireJWTError = () => {
  return new AppErrors("Your token has expired!", 401);
};

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorForProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ errors: err.message });
  } else {
    res.status(err.statusCode).json({ error: "Something went wrong" });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "production") {
    let error = err;
    if (
      error.name === "jsonWebTokenError" ||
      error.name === "invalid signature"
    ) {
      error = handleJWTError();
    }

    if (error.name === "TokenExpiredError") error = handleExpireJWTError();

    sendErrorForProduction(error, res);
  } else {
    sendErrorForDev(err, res);
  }
  next();
};
