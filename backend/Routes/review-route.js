const express = require("express");
const router = express.Router();

// middleware
const upload = require("../Middleware/multer");
const protect = require("../Middleware/protect");
const authorized = require("../Middleware/authorized");

// controller
const reviewController = require("../Controller/review-controller");

router.use(protect());

router.route("/").post();
module.exports = router;
