import express from "express";
import multer from "multer";

// controller
import {
  register,
  login,
  refreshToken,
} from "../Controller/auth-controller.js";

import { requestOtp } from "../Controller/otp-controller.js";

const router = express.Router();
const upload = multer();

router.route("/register").post(upload.none(), register);

router.route("/login").post(upload.none(), login);

router.route("/refresh-token").post(refreshToken);
router.route("/send-otp").post(upload.none(), requestOtp);

export default router;
