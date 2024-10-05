const express = require("express");
const multer = require("multer");

// controller
const authController = require("../Controller/auth-controller");

const router = express.Router();
const upload = multer();

router.route("/register").post(upload.none(), authController.register);
module.exports = router;
