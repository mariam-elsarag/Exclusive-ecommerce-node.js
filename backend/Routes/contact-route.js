const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();
// middleware
const protect = require("../Middleware/protect");
// controller
const contactController = require("../Controller/contact-controller");
const authController = require("../Controller/auth-controller");

// route
router.route("/").post(upload.none(), contactController.createNewContact);

router.use(protect());
router.use(authController.restrectTo("admin"));
router
  .route("/:id")
  .get(contactController.getContactForm)
  .delete(contactController.deleteContactForm);
module.exports = router;
