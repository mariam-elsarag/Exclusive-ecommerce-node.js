// model
const User = require("../Model/user-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");

// controller

// get user data
exports.getUser = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppErrors("User not found", 404));
  }
  res.status(200).json({ user });
});

// update user data
exports.updaterUser = CatchAsync(async (req, res, next) => {
  const requiredData = [
    "first_name",
    "last_name",
    "email",
    "address",
    "old_password",
    "new_password",
  ];
  const filterdata = FilterBody(req.body, next, requiredData, false);
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppErrors("User not found", 404));
  }
  if (filterdata.old_password && filterdata.new_password) {
    const isPasswordCorrect = await user.comparePassword(
      filterdata.old_password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(new AppErrors("Your current password is wrong", 400));
    } else {
      user.password = filterdata.new_password;
      await user.save({ validateBeforeSave: false });
    }
  }
  if (filterdata.new_password && !filterdata.old_password) {
    return next(new AppErrors("old_password is required", 400));
  }
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterdata, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ user: updateUser });
});
