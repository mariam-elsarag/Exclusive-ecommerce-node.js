const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
// model
const User = require("../Model/user-model");
// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");

// for generation token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.userId, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
    }
  );
};
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

// Protect route
exports.protect = CatchAsync(async (req, res, next) => {
  const token = extractAuthorization(req);
  if (!token) return next(new AppErrors("Unauthorized: Access is denied", 401));
  // check if this token is valid
  const decoded = verifyToken(token);
  if (!decoded)
    return next(new AppErrors("Unauthorized: Access is denied", 401));

  // find user
  const user = await User.findById(decoded.id);

  if (!user) return next(new AppErrors("User no longer exists", 404));
  if (user.checkChangePasswordAfterJWT(decoded.iat)) {
    return next(new AppErrors("User recently changed password", 404));
  }
  req.user = user;
  next();
});

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
exports.register = CatchAsync(async (req, res, next) => {
  let errors = [];
  const requiredData = [
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "password",
  ];
  const filterdata = FilterBody(req.body, requiredData);

  requiredData.forEach((el) => {
    if (!filterdata[el]) {
      errors.push({ [el]: `${el} is required` });
    }
  });
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  const user = await User.create(filterdata);
  res.status(201).json({ user });
});
