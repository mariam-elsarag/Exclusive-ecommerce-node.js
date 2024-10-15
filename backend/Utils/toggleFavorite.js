// model
import Favorite from "../Model/favorite-model.js";

// function
const toggleFavorite = async (data, req) => {
  if (!req.user) {
    return data.map((item) => {
      const { _id, ...rest } = item._doc;
      return {
        ...rest,
        favorite: null,
        productId: _id,
      };
    });
  } else {
    const favoriteProducts = await Favorite.find({ user: req.user._id });
    return data.map((item) => {
      const { _id, ...rest } = item._doc;

      return {
        ...rest,
        favorite: favoriteProducts.some(
          (fav) => fav.product.toString() === _id.toString()
        ),
        productId: _id,
      };
    });
  }
};

export default toggleFavorite;
