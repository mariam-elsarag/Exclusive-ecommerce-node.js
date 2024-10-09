const express = require("express");
const router = express.Router();

const upload = require("../Middleware/multer");

// controller
const authController = require("../Controller/auth-controller");
const productController = require("../Controller/product-controller");

router.use(authController.protect, authController.restrectTo("admin"));

router.route("/").post(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productController.resizeProductImages,
  productController.createNewProduct
);

router.route("/:id").delete(productController.deleteProduct);
router
  .route("/:id/images")
  .delete(upload.none(), productController.deleteProductImage);
module.exports = router;
