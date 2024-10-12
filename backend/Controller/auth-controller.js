import jwt from "jsonwebtoken";
// model
import User from "../Model/user-model.js";
// utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";
import verifyUser from "../Utils/verifyUser.js";

// controller
import { createOne } from "./handle-factory.js";
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

// Controllers
// register
export const register = createOne(User, [
  "first_name",
  "last_name",
  "email",
  "phone_number",
  "password",
]);

// login
export const login = CatchAsync(async (req, res, next) => {
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
export const refreshToken = CatchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return next(new AppErrors("No refresh token", 403));
  try {
    await verifyUser(token, req, next);
    const user = req.user;
    const newAccessToken = generateToken(user);
    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    return next(new AppErrors("Failed to refresh token", 500));
  }
});
