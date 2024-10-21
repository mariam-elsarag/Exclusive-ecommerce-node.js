import express from "express";
import multer from "multer";

// middleware
import protect from "../Middleware/protect.js";
// controller
import { checkout, successPayment } from "../Controller/payment-controller.js";

const router = express.Router();
const upload = multer();

router.use(protect());

router.route("/check-out").post(upload.none(), checkout);
router.route("/success-payment/:id").patch(successPayment);
export default router;
