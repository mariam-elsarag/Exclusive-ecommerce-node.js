const express = require("express");
const router = express.Router();

const upload = require("../Middleware/multer");
// middleware
const protect = require("../Middleware/protect");
// controller
const productController = require("../Controller/product-controller");
const authController = require("../Controller/auth-controller");

// route
const favoriteRoute = require("./favorite-route.js");

// for favorite product
router.use("/:productId/favorite", favoriteRoute);
router.use("/favorite", favoriteRoute);

router
  .route("/")
  .post(
    protect(),
    authController.restrectTo("admin"),
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    productController.resizeProductImages,
    productController.createNewProduct
  )
  .get(protect(false), productController.getAllProduct);

router
  .route("/:id")
  .delete(
    protect(),
    authController.restrectTo("admin"),
    productController.deleteProduct
  )
  .get(productController.getProductDetails);

router.use(protect(), authController.restrectTo("admin"));

router
  .route("/:id/images")
  .delete(upload.none(), productController.deleteProductImage);

module.exports = router;
