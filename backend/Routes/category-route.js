const express = require("express");

const upload = require("../Middleware/multer");

const router = express.Router();
// middleware
const protect = require("../Middleware/protect");
// controller
const categoryController = require("../Controller/category-controller");
const authController = require("../Controller/auth-controller");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    protect(),
    authController.restrectTo("admin"),
    upload.single("icon"),
    categoryController.createNewCategory
  );

router.use(protect(), authController.restrectTo("admin"));
router.route("/:id").delete(categoryController.deleteCategory);
module.exports = router;
