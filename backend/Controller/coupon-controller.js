import Stripe from "stripe";
// model

import CatchAsync from "../Utils/CatchAsync.js";
// controller

import AppErrors from "../Utils/AppError.js";

export const createDiscount = CatchAsync(async (req, res, next) => {
  const { duration, percent_off, duration_in_months } = req.body;
  const durationValue = ["repeating", "once", "forever"];
  let errors = [];
  if (!duration) {
    errors.push({ duration: "Duration is require" });
  } else if (!durationValue.includes(duration)) {
    errors.push({ duration: "Duration must be repeating - once or forever" });
  }
  if (duration === "repeating" && !duration_in_months) {
    errors.push({
      duration: "Duration in month require when duration is repeating",
    });
  }
  if (!percent_off) {
    errors.push({ percent_off: "percent off is require" });
  }
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let cuponObject = {
    duration: duration,
    percent_off: +percent_off,
  };
  if (duration === "repeating") {
    cuponObject.duration_in_months = +duration_in_months;
  }
  const coupon = await stripe.coupons.create(cuponObject);
  res.status(201).json({ coupon: coupon.id });
});
// get all discounts
export const getAllDiscounts = CatchAsync(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const coupons = await stripe.coupons.list();
  res.status(200).json({ coupons });
});

// delete discount code
export const deleteDiscountCode = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const coupons = await stripe.coupons.del(id);
  res.status(204).json({ coupons });
});
