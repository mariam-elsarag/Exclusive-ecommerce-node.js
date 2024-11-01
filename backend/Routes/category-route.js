import express from "express";

import upload from "../Middleware/multer.js";

const router = express.Router();
// middleware
import protect from "../Middleware/protect.js";
import authrized from "../Middleware/authorized.js";
// controller
import {
  getAllCategory,
  getAllCategoryPaginated,
  deleteCategory,
  createNewCategory,
} from "../Controller/category-controller.js";

router
  .route("/")
  .get(getAllCategory)
  .post(
    protect(),
    authrized("admin"),
    upload.single("icon"),
    createNewCategory
  );
router.route("/all").get(getAllCategoryPaginated);

router.use(protect(), authrized("admin"));
router.route("/:id").delete(deleteCategory);
export default router;
