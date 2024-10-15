// model
import Cart from "../Model/cart-model.js";
import Discount from "../Model/discount-model.js";

// utils
import AppErrors from "./../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";
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
    Cart.findOne({ user: id }),
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
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });

  const requiredFields = ["varient", "productId"];
  const allowFields = ["discount_code"];
  let errors = [];
  let filterData = [];
  console.log(req.body, "k");
  req.body.forEach((item, index) => {
    let hasAllRequiredFields = true;
    const filteredItem = {};

    requiredFields.forEach((field) => {
      if (!item[field]) {
        errors.push({ [field]: `${field} is required` });
        hasAllRequiredFields = false;
      } else {
        filteredItem[field] = item[field];
      }
    });
    allowFields.forEach((field) => {
      if (item[field]) {
        filteredItem[field] = item[field];
      }
    });

    if (hasAllRequiredFields) {
      filterData.push(filteredItem);
    }
  });
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  // check if there is cart for this users and this cart have products
  if (!cart || cart.products.length === 0) {
    return next(new AppErrors("You don't have items in you cart", 404));
  }

  res.status(200).json(req.body);
});
