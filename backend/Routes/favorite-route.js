import express from "express";

const router = express.Router({ mergeParams: true });
// middleware
import protect from "../Middleware/protect.js";

import {
  getUserFavoriteList,
  toggleFavorite,
} from "../Controller/favorite-controller.js";

router
  .route("/")
  .get(protect(), getUserFavoriteList)
  .patch(protect(), toggleFavorite);

export default router;
