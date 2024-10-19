import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();
// middleware

import protect from "../Middleware/protect.js";
import authorized from "../Middleware/authorized.js";
// controller
import {
  createDiscount,
  getAllDiscounts,
  deleteDiscountCode,
} from "../Controller/coupon-controller.js";

router.use(protect(), authorized("admin"));
// for discount
router
  .route("/coupon")
  .post(upload.none(), createDiscount)
  .get(getAllDiscounts);

router.route("/coupon/:id").delete(deleteDiscountCode);

export default router;
