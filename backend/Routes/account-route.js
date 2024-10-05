const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

// controller
const authController = require("../Controller/auth-controller");
const accountController = require("../Controller/account-controller");

router.use(authController.protect);
router
  .route("/")
  .get(accountController.getUser)
  .patch(upload.none(), accountController.updaterUser);

module.exports = router;
