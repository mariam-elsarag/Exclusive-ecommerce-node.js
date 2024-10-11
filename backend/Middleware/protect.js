const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
// model
const User = require("../Model/user-model");
// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");

// to check if have authorization
const extractAuthorization = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

// check token
const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

// verify user
const verifyUser = CatchAsync(async (token, req, next) => {
  const decoded = await verifyToken(token);
  if (!decoded)
    return next(new AppErrors("Unauthorized: Access is denied", 401));

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppErrors("User no longer exists", 404));

  if (user.checkChangePasswordAfterJWT(decoded.iat)) {
    return next(new AppErrors("User recently changed password", 401));
  }

  req.user = user;
  next();
});

// Protect route middleware
const protect = (isRequire = true) =>
  CatchAsync(async (req, res, next) => {
    const token = extractAuthorization(req);
    if (isRequire) {
      if (!token)
        return next(new AppErrors("Unauthorized: Access is denied", 401));
      await verifyUser(token, req, next);
    } else {
      if (token) {
        await verifyUser(token, req, next);
      } else {
        next();
      }
    }
  });

module.exports = protect;
