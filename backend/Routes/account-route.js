import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

// middleware
import protect from "../Middleware/protect.js";
// controller
import { getUser, updaterUser } from "../Controller/account-controller.js";
// order controller
import { getAllOrders } from "../Controller/order-controller.js";

router.use(protect());
router.route("/").get(getUser).patch(upload.none(), updaterUser);

// for order
router.route("/order").get(getAllOrders);

export default router;
