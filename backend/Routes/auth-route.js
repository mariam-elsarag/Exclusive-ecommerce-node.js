const express = require("express");
const multer = require("multer");

// controller
const authController = require("../Controller/auth-controller");

const router = express.Router();
const upload = multer();

router.route("/register").post(upload.none(), authController.register);

router.route("/login").post(upload.none(), authController.login);

router.route("/refresh-token").post(authController.refreshToken);

module.exports = router;
