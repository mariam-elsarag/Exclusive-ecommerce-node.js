// model
const Favorite = require("../Model/favorite-model");

//utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const ApiFeatures = require("../Utils/ApiFeatures");

// get user favorite list
exports.getUserFavoriteList = CatchAsync(async (req, res, next) => {
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
  res.status(200).json({ favoriteList });
});

// put favorite
exports.toggleFavorite = CatchAsync(async (req, res, next) => {
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
