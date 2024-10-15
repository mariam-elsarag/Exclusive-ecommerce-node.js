// model
import Cart from "../Model/cart-model.js";
import Product from "../Model/product-model.js";

// utils
import AppErrors from "./../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";

import toggleFavorite from "../Utils/toggleFavorite.js";
import ApiFeature from "./../Utils/ApiFeatures.js";

// toggle item to cart
export const toggleItemToCart = CatchAsync(async (req, res, next) => {
  const { id } = req.params; //product id
  const userId = req.user._id;
  let message = "";

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, products: [] });
  }
  const productExists = cart.products.includes(id);
  if (productExists) {
    if (cart.products.length === 1) {
      await Cart.deleteOne({ user: userId, products: id });
    } else {
      await Cart.updateOne({ user: userId }, { $pull: { products: id } });
    }
    message = "Successfully remove it from cart";
  } else {
    await Cart.updateOne({ user: userId }, { $addToSet: { products: id } });
    message = "Successfully added to cart";
  }
  res.status(200).json({ message });
});

// get cart list
export const getAllCart = CatchAsync(async (req, res, next) => {
  const id = req.user._id;
  const features = new ApiFeature(
    Cart.findOne({ user: id }).populate({
      path: "products",
      select:
        "thumbnail title price is_new ratingQuantity ratingAverage offer_price varient",
    }),
    req.query
  ).pagination(8);

  let cart = await features.getPaginations(Cart, req);

  let favoriteProducts = await toggleFavorite(cart.results.products, req);

  cart.results = {
    products: favoriteProducts,
    user: cart.results.user,
    cartId: cart.results._id,
  };
  res.status(200).json({ ...cart });
});

// checkout
export const checkout = CatchAsync(async (req, res, next) => {
  console.log("roma");
});
