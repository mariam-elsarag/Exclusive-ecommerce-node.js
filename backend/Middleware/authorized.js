import AppErrors from "../Utils/AppError.js";

const authrized = (...roles) => {
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
export default authrized;
