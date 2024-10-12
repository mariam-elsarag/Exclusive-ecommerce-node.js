// model
import User from "../Model/user-model.js";

// utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";

// controller

// get user data
export const getUser = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppErrors("User not found", 404));
  }
  res.status(200).json({ user });
});

// update user data
export const updaterUser = CatchAsync(async (req, res, next) => {
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
