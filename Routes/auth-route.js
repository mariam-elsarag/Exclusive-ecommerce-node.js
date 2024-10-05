const express = require("express");
const multer = require("multer");

// controller
const authController = require("../Controller/auth-controller");

const router = express.Router();

router.route("login").post();

module.exports = router;
