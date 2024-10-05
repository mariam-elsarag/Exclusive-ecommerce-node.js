const AppErrors = require("../Utils/AppError");

// jwt
const handleJWTError = () => {
  return new AppErrors("Invalid token", 401);
};
const handleExpireJWTError = () => {
  return new AppErrors("Your token has expired!", 401);
};

// validator error
const handleValidatorError = (err) => {
  let errors = [];

  if (err.errors.password) {
    errors.push({ password: err.errors.password.message });
  }
  if (err.errors.phone_number) {
    errors.push({ phone_number: err.errors.phone_number.message });
  }
  if (err.errors.email) {
    errors.push({ email: err.errors.email.message });
  }
  return new AppErrors(errors, 400);
};
const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorForProduction = (err, res) => {
  console.log(err.isOperational, "is oper");
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
    console.log(error.name, "name");
    if (error.name === "ValidationError") {
      error = handleValidatorError(error);
    }
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
