import express from "express";
import multer from "multer";

// controller
import {
  register,
  login,
  refreshToken,
} from "../Controller/auth-controller.js";

const router = express.Router();
const upload = multer();

router.route("/register").post(upload.none(), register);

router.route("/login").post(upload.none(), login);

router.route("/refresh-token").post(refreshToken);

export default router;
