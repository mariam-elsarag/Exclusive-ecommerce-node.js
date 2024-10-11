const express = require("express");

const upload = require("../Middleware/multer");

const router = express.Router();
// middleware
const protect = require("../Middleware/protect");
const authrized = require("../Middleware/authorized");
// controller
const categoryController = require("../Controller/category-controller");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    protect(),
    authrized("admin"),
    upload.single("icon"),
    categoryController.createNewCategory
  );

router.use(protect(), authrized("admin"));
router.route("/:id").delete(categoryController.deleteCategory);
module.exports = router;
