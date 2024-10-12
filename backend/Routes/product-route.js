import express from "express";
const router = express.Router();

import upload from "../Middleware/multer.js";
// middleware
import protect from "../Middleware/protect.js";
import authrized from "../Middleware/authorized.js";
// controller
import {
  resizeProductImages,
  createNewProduct,
  getAllProduct,
  deleteProduct,
  getProductDetails,
  deleteProductImage,
} from "../Controller/product-controller.js";

// route
import favoriteRoute from "./favorite-route.js";

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
    resizeProductImages,
    createNewProduct
  )
  .get(protect(false), getAllProduct);

router
  .route("/:id")
  .delete(protect(), authrized("admin"), deleteProduct)
  .get(protect(false), getProductDetails);

router
  .route("/:id/images")
  .delete(protect(), authrized("admin"), upload.none(), deleteProductImage);

export default router;
