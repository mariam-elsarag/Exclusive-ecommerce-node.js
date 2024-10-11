const express = require("express");

// middleware
const upload = require("../Middleware/multer");
const protect = require("../Middleware/protect");

const router = express.Router();

router.use(protect());

router.route("/").post();
module.exports = router;
