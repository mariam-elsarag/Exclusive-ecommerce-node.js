// model
import Favorite from "../Model/favorite-model.js";

//utils

import CatchAsync from "../Utils/CatchAsync.js";
import ApiFeatures from "../Utils/ApiFeatures.js";

// get user favorite list
export const getUserFavoriteList = CatchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Favorite.find({ user: req.user._id }).populate({
      path: "product",
      select:
        "thumbnail title price is_new ratingQuantity ratingAverage offer_price",
    }),
    req.query
  )
    .limitFields("product favoriteId")
    .pagination(8);
  const favoriteList = await features.getPaginations(Favorite, req);

  favoriteList.results = favoriteList.results.map((item) => {
    const { _id, ...rest } = item._doc;
    return {
      ...rest,
      favorite: true,
      favoriteId: _id,
    };
  });
  res.status(200).json({ ...favoriteList });
});

// put favorite
export const toggleFavorite = CatchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const isFavoriteProduct = await Favorite.findOne({
    product: productId,
    user: req.user._id,
  });
  let favorite;
  if (isFavoriteProduct) {
    await Favorite.findByIdAndDelete(isFavoriteProduct._id);
    favorite = false;
  } else {
    await Favorite.create({ product: productId, user: req.user._id });
    favorite = true;
  }
  res.status(200).json({ favorite });
});
