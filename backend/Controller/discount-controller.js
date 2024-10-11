// model
const Discount = require("../Model/discount-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");

// controller
const Factory = require("./handle-factory");

// create discount
exports.createDiscount = Factory.createOne(Discount, [
  "discount_code",
  "percentage",
  "exp_date",
  "usage_limit",
]);
