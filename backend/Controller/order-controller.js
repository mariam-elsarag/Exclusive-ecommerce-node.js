// model
import Order from "../Model/order-model.js";
import Product from "./../Model/product-model.js";

// utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import ApiFeatures from "./../Utils/ApiFeatures.js";

// get all orders
export const getAllOrders = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const featues = new ApiFeatures(Order.find({ user: userId }), req.query)
    .limitFields("products status orderId total_price")
    .pagination(8);
  const orders = await featues.getPaginations(Order, req);
  res.status(200).json(orders);
});

// remove order that aren't paid after 2 weeks
export const removeUnpaidOrder = CatchAsync(async (req, res, next) => {
  console.log("i am working");
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 1);
  const pendingOrders = await Order.find({
    status: "pending",
    createdAt: { $lte: twoWeeksAgo },
  });

  for (const order of pendingOrders) {
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        const variantIndex = product.varient.findIndex(
          (v) =>
            v.color === item.varient.color &&
            (!item.varient.size || v.size.includes(item.varient.size))
        );

        if (variantIndex !== -1) {
          product.varient[variantIndex].stock += item.varient.quantity;
          product.varient[variantIndex].status = "in_stoke";
          await product.save();
        }
      }
    }
  }

  // remove order
  await Order.deleteMany({
    status: "pending",
    createdAt: { $lte: twoWeeksAgo },
  });
});
