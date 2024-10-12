import express from "express";
const router = express.Router();

// middleware

import protect from "../Middleware/protect.js";
import authorized from "../Middleware/authorized.js";

// controller
const reviewController = require("../Controller/review-controller.js");

router.use(protect());

// router.route("/").post();
export default router;
