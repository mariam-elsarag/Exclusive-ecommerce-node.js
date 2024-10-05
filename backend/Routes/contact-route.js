const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

// controller
const contactController = require("../Controller/contact-controller");
const authController = require("../Controller/auth-controller");

// route
router.route("/").post(upload.none(), contactController.createNewContact);

router.use(authController.protect, authController.restrectTo("admin"));

router
  .route("/:id")
  .get(contactController.getContactForm)
  .delete(contactController.deleteContactForm);
module.exports = router;
