const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
// model
const User = require("../Model/user-model");
// Utils
const CatchAsync = require("./CatchAsync");
const AppErrors = require("./AppError");

// check token
const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

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
});
module.exports = verifyUser;
