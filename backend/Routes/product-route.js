const express = require("express");
const router = express.Router();

const upload = require("../Middleware/multer");

// controller
const authController = require("../Controller/auth-controller");
const productController = require("../Controller/product-controller");

router.route("/").post(
  authController.protect,
  authController.restrectTo("admin"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productController.createNewProduct
);

module.exports = upload;
