const express = require("express");

const upload = require("../Middleware/multer");

const router = express.Router();

// controller
const authController = require("../Controller/auth-controller");
const categoryController = require("../Controller/category-controller");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    authController.protect,
    authController.restrectTo("admin"),
    upload.single("icon"),
    categoryController.createNewCategory
  );

router.use(authController.protect, authController.restrectTo("admin"));
router.route("/:id").delete(categoryController.deleteCategory);
module.exports = router;
