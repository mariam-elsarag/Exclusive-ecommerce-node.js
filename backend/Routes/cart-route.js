import express from "express";

// middleware
import upload from "../Middleware/multer.js";
import protect from "../Middleware/protect.js";

const router = express.Router();

router.use(protect());

router.route("/").post();
export default router;
