const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();
// middleware
const protect = require("../Middleware/protect");
const authrized = require("../Middleware/authorized");
// controller
const contactController = require("../Controller/contact-controller");

// route
router.route("/").post(upload.none(), contactController.createNewContact);

router.use(protect(), authrized("admin"));

router
  .route("/:id")
  .get(contactController.getContactForm)
  .delete(contactController.deleteContactForm);
module.exports = router;
