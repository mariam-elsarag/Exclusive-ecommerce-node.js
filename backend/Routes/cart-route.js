import express from "express";
import multer from "multer";

// middleware
import protect from "../Middleware/protect.js";
// controller
import { getAllCart, toggleItemToCart } from "../Controller/cart-controller.js";

const router = express.Router();
const upload = multer();
router.use(protect());

router.route("/").get(getAllCart);
router.route("/:id").put(toggleItemToCart);
export default router;
