const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
// model
const User = require("../Model/user-model");
// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");
const ApiFeature = require("../Utils/ApiFeatures");

// controller
const Factory = require("./handle-factory");
// for generation token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
const createRefreshToken = (user, res) => {
  const refreshToken = jwt.sign(
    { id: user.userId, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
    }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/api/auth/refresh-token",
  });
};

// authrization
exports.restrectTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppErrors(
          "Access denied: You do not have permission to perform this action",
          403
        )
      );
    }
    return next();
  };
};
// Controllers
// register

exports.register = Factory.createOne(User, [
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "password",
]);

// login
exports.login = CatchAsync(async (req, res, next) => {
  const requiredData = ["query", "password"];
  const filterdata = FilterBody(req.body, next, requiredData);

  const user = await User.findOne({
    $or: [{ email: filterdata.query }, { phone_number: filterdata.query }],
  });

  if (
    !user ||
    !(await user.comparePassword(filterdata.password, user.password))
  ) {
    return next(new AppErrors("Wrong credentials", 401));
  }
  // generat tokens
  const accessToken = generateToken(user);
  createRefreshToken(user, res);

  res.status(200).json({ token: accessToken, user });
});

// refresh token
exports.refreshToken = CatchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return next(new AppErrors("No refresh token", 403));
  const decoded = await verifyToken(refreshToken);
  if (!decoded)
    return next(new AppErrors("Unauthorized: Access is denied", 401));
  //  find user
  const user = await User.findById(decoded.id);

  if (!user) return next(new AppErrors("User no longer exists", 404));
  if (user.checkChangePasswordAfterJWT(decoded.iat)) {
    return next(new AppErrors("User recently changed password", 404));
  }
  const newAccessToken = generateToken(user);

  res.status(200).json({ token: newAccessToken });
});
