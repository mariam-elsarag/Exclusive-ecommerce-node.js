import AppErrors from "../Utils/AppError.js";

// JWT error handling
const handleJWTError = () => {
  return new AppErrors("Invalid token", 401);
};

const handleExpireJWTError = () => {
  return new AppErrors("Your token has expired!", 401);
};

// Validator error
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
  if (err.errors.exp_date) {
    errors.push({ exp_date: err.errors.exp_date.message });
  }
  if (err.errors.rate) {
    errors.push({ rate: "Rate must be a number between 1 to 5" });
  }
  return new AppErrors(errors, 400);
};

// Database errors
const handleDublicateDbData = (err) => {
  console.log("iam test");
  if (err.keyPattern.email) {
    return new AppErrors({ email: "Email already exists" }, 400);
  }
  if (err.keyPattern.phone_number) {
    return new AppErrors({ phone_number: "Phone number already exists" }, 400);
  }
  if (err.keyPattern.discount_code) {
    return new AppErrors(
      { discount_code: "Discount code already exists" },
      400
    );
  }
};
// type errro

const handleCastError = (err) => {
  let errors = [];
  if (err?.errors?.exp_date) {
    errors.push({ exp_date: "Invalid date format" });
  } else {
    errors.push({ validation: err.message });
  }
  return new AppErrors(errors, 400);
};

// for striep
const handleStripeError = (err) => {
  return new AppErrors(
    err.raw.message,
    err.raw.code === "resource_missing" ? 404 : 400
  );
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

const GlobalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.name === "ValidationError") {
      error = handleValidatorError(error);
    }

    if (error.code === 11000) {
      error = handleDublicateDbData(error);
    }
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "invalid signature"
    ) {
      error = handleJWTError();
    }
    if (err.name === "CastError") {
      error = handleCastError(err);
    }
    if (error.type === "StripeInvalidRequestError") {
      error = handleStripeError(error);
    }
    if (error.name === "TokenExpiredError") error = handleExpireJWTError();

    sendErrorForProduction(error, res);
  } else {
    sendErrorForDev(err, res);
  }

  next();
};

export default GlobalErrors;
