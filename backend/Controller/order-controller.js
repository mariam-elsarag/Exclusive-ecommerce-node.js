// model
import Order from "../Model/order-model.js";
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
