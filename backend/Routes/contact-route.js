import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();
// middleware
import protect from "../Middleware/protect.js";
import authrized from "../Middleware/authorized.js";
// controller
import {
  createNewContact,
  getContactForm,
  deleteContactForm,
} from "../Controller/contact-controller.js";

// route
router.route("/").post(upload.none(), createNewContact);

router.use(protect(), authrized("admin"));

router.route("/:id").get(getContactForm).delete(deleteContactForm);
export default router;
