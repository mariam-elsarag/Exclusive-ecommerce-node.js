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
  const productExists = cart.products.find((item) => item.id === id);
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
    Cart.findOne({ user: id }),
    req.query
  ).pagination(8);

  let cart = await features.getPaginations(Cart, req);
  if (!cart.results) {
    return next(new AppErrors("No cart found for this user", 404));
  }
  if (!cart.results.products || cart.results.products.length === 0) {
    return next(new AppErrors("No products found in the cart", 404));
  }

  let favoriteProducts = await toggleFavorite(cart.results.products, req);

  cart.results = {
    products: favoriteProducts,
    user: cart.results.user,
    cartId: cart.results._id,
  };
  res.status(200).json({ ...cart });
});
