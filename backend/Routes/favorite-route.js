const express = require("express");

const router = express.Router({ mergeParams: true });
// middleware
const protect = require("../Middleware/protect");

const favoriteController = require("../Controller/favorite-controller");

router
  .route("/")
  .get(protect(), favoriteController.getUserFavoriteList)
  .patch(protect(), favoriteController.toggleFavorite);

module.exports = router;
