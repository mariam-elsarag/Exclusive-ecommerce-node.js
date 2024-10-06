// model
const Product = require("../Model/product-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");

// create new product
exports.createNewProduct = CatchAsync(async (req, res, next) => {
  console.log(req.file);
  next();
});
