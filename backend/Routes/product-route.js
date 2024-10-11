const express = require("express");
const router = express.Router();

const upload = require("../Middleware/multer");
// middleware
const protect = require("../Middleware/protect");
const authrized = require("../Middleware/authorized.js");
// controller
const productController = require("../Controller/product-controller");

// route
const favoriteRoute = require("./favorite-route.js");

// for favorite product
router.use("/:productId/favorite", favoriteRoute);
router.use("/favorite", favoriteRoute);

router
  .route("/")
  .post(
    protect(),
    authrized("admin"),
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
  .delete(protect(), authrized("admin"), productController.deleteProduct)
  .get(protect(false), productController.getProductDetails);

router
  .route("/:id/images")
  .delete(
    protect(),
    authrized("admin"),
    upload.none(),
    productController.deleteProductImage
  );

module.exports = router;
