import express from "express";
import multer from "multer";

// middleware
import protect from "../Middleware/protect.js";

// controller
import {
  createNewReview,
  getAllReviews,
  deleteReview,
} from "../Controller/review-controller.js";

const router = express.Router({ mergeParams: true });
const upload = multer();

router.route("/").get(getAllReviews);

router.use(protect());
router.route("/:id").delete(deleteReview);

router.route("/").put(upload.none(), createNewReview);

export default router;
