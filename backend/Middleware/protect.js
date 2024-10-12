// utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import verifyUser from "../Utils/verifyUser.js";

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

// Protect route middleware
const protect = (isRequire = true) =>
  CatchAsync(async (req, res, next) => {
    const token = extractAuthorization(req);
    if (isRequire) {
      if (!token)
        return next(new AppErrors("Unauthorized: Access is denied", 401));
    }

    if (token) {
      try {
        await verifyUser(token, req, next);
      } catch (err) {
        return next(new AppErrors("Error while checking user", 500));
      }
    } else {
      next();
    }
  });

export default protect;
