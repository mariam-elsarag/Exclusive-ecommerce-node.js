const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();
// middleware

const protect = require("../Middleware/protect");
const authorized = require("../Middleware/authorized");
// controller
const discountController = require("../Controller/discount-controller");

router.use(protect(), authorized("admin"));
// for discount
router
  .route("/discount")
  .post(upload.none(), discountController.createDiscount);

module.exports = router;
