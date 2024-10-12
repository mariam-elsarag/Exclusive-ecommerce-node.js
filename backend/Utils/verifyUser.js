import { promisify } from "node:util";
import jwt from "jsonwebtoken";
// model
import User from "../Model/user-model.js";
// Utils
import CatchAsync from "./CatchAsync.js";
import AppErrors from "./AppError.js";

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
  next();
});
export default verifyUser;
