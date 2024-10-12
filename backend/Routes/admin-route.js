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
  updateDiscount,
} from "../Controller/discount-controller.js";

router.use(protect(), authorized("admin"));
// for discount
router
  .route("/discount")
  .post(upload.none(), createDiscount)
  .get(getAllDiscounts);

router
  .route("/discount/:id")
  .delete(deleteDiscountCode)
  .put(upload.none(), updateDiscount);

export default router;
