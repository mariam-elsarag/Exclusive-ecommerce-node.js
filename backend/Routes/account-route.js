import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

// middleware
import protect from "../Middleware/protect.js";
// controller
import { getUser, updaterUser } from "../Controller/account-controller.js";

router.use(protect());
router.route("/").get(getUser).patch(upload.none(), updaterUser);

export default router;
