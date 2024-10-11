// model
const Favorite = require("../Model/favorite-model");

//utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const ApiFeatures = require("../Utils/ApiFeatures");

// get user favorite list
exports.getUserFavoriteList = CatchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Favorite.find({ _id: req.user._id }),
    req.query
  ).pagination(8);
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
