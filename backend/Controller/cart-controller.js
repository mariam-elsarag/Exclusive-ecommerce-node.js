// model
import Cart from "../Model/cart-model.js";
import Product from "../Model/product-model.js";

// utils
import AppErrors from "./../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";

// toggle item to cart
export const toggleItemToCart = CatchAsync(async (req, res, next) => {
  const { id } = req.params; //product id
  const userId = req.user._id;
  let message = "";

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, products: [] });
  }
  // check if product out of stock or not
  const productInStock = await Product.findOne({
    _id: id,
    varient: { $elemMatch: { status: "in_stock" } },
  });
  console.log(productInStock, "kjkj");
  if (!productInStock) {
    return next(new AppErrors({ product: "Product is unavailable" }, 404));
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

  const carts = await Cart.findOne({ user: id });

  if (!carts) {
    return res.status(200).json({
      products: [],
    });
  }
  if (!carts.products || carts.products.length === 0) {
    return res.status(200).json({
      products: [],
    });
  }

  const inStockProducts = carts.products
    .map((product) => ({
      ...product.toObject(),
      varient: product.varient.filter(
        (variant) => variant.status === "in_stock"
      ),
    }))
    .filter((product) => product.varient.length > 0);

  if (inStockProducts.length === 0) {
    return next(new AppErrors("No in-stock products found in the cart", 404));
  }

  res.status(200).json({
    products: inStockProducts,
    user: carts.user,
    cartId: carts._id,
  });
});
