// model
import Discount from "../Model/discount-model.js";
// controller
import { createOne, getAll, deleteOne, updateOne } from "./handle-factory.js";

// create discount
export const createDiscount = createOne(Discount, [
  "discount_code",
  "percentage",
  "exp_date",
  "usage_limit",
]);

// get all discounts
export const getAllDiscounts = getAll(Discount, "discounts");

// delete discount code
export const deleteDiscountCode = deleteOne(Discount);

// update discount
export const updateDiscount = updateOne(
  Discount,
  ["discount_code", "usage_limit", "percentage", "exp_date"],
  "discount"
);
