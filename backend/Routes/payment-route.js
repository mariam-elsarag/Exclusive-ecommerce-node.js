import express from "express";
import multer from "multer";

// middleware
import protect from "../Middleware/protect.js";
// controller
import { checkout } from "../Controller/payment-controller.js";

const router = express.Router();
const upload = multer();

router.use(protect());

router.route("/check-out").post(upload.none(), checkout);

export default router;
