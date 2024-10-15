import express from "express";
import multer from "multer";

// middleware
import protect from "../Middleware/protect.js";
// controller
import { checkout } from "../Controller/cart-controller.js";

const router = express.Router();
const upload = multer();

router.use(protect());

router.route("/check-out").post(checkout);

export default router;
