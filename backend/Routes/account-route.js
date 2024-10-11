const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

// middleware
const protect = require("../Middleware/protect");
// controller
const accountController = require("../Controller/account-controller");

router.use(protect());
router
  .route("/")
  .get(accountController.getUser)
  .patch(upload.none(), accountController.updaterUser);

module.exports = router;
