// model
import Cart from "../Model/cart-model.js";
import Order from "../Model/order-model.js";
import Product from "./../Model/product-model.js";
import Discount from "./../Model/discount-model.js";

// utils
import AppErrors from "./../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";

// checkout
// check discount code
const checkDiscountCodeIsAvailable = async (discount_code, errors) => {
  const discountCode = await Discount.findOne({
    discount_code: discount_code,
    usage_limit: { $gt: 0 },
  });
  if (!discountCode) {
    errors.push({
      discount_code: "Invalid discount code. please try other one",
    });
    return null;
  }
  if (discountCode.status === "expired") {
    errors.push({
      discount_code: "This code is expired. Please try other one",
    });
    return null;
  }
  return discountCode;
};
// check if product is available
const checkProductIsAvailable = async (products) => {
  let total_price = 0;
  const productsCheck = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findOne({
        _id: item.productId,
        varient: {
          $elemMatch: {
            color: item.varient.color,
            stock: { $gte: item.varient.quantity },
          },
        },
      });

      if (!product) {
        return {
          product: `Product with ID ${item.productId} and specified variant is not available`,
        };
      }
      if (product.offer_price) {
        total_price += item.varient.quantity * product.offer_price;
      } else {
        total_price += item.varient.quantity * product.price;
      }

      // to check if product has this varient
      const matchedVariant = product.varient.find(
        (varient) => varient.color === item.varient.color
      );
      // to chekc if this varient has size
      if (
        matchedVariant &&
        matchedVariant.size &&
        matchedVariant.size.length > 0
      ) {
        if (!item.varient.size) {
          return {
            size: `Size is required for item ${
              index + 1
            } as the product variant has sizes`,
          };
        } else if (!matchedVariant.size.includes(item.varient.size)) {
          return {
            size: `Invalid size for item ${
              index + 1
            }. Allowed sizes are: ${matchedVariant.size.join(", ")}`,
          };
        }
      }
    })
  );
  return { productsCheck, total_price };
};

export const checkout = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.products.length === 0) {
    return next(new AppErrors("You don't have items in your cart", 404));
  }

  const requiredFields = ["varient", "productId"];
  const allowFields = ["discount_code"];
  let errors = [];
  let filterData = [];

  if (!req.body.product || !Array.isArray(req.body.product)) {
    return next(
      new AppErrors("Product array is required in the request body", 400)
    );
  }
  req.body.product.forEach((item, index) => {
    let hasAllRequiredFields = true;
    const filteredItem = {};

    requiredFields.forEach((field) => {
      if (!item[field] && field !== "varient") {
        errors.push({ [field]: `${field} is required for item ${index + 1}` });
        hasAllRequiredFields = false;
      } else {
        filteredItem[field] = item[field];
      }
    });

    if (item.varient) {
      const { color, quantity, size } = item.varient;

      if (
        typeof item.varient !== "object" ||
        Array.isArray(item.varient) ||
        !item.varient
      ) {
        errors.push({
          varient: `Varient in item ${index + 1} must be an object`,
        });
      } else {
        if (!color && !quantity) {
          errors.push({
            varient: `Varient in item ${
              index + 1
            } must have both color and quantity`,
          });
        } else if (!color) {
          errors.push({
            color: `Color is required in varient of item ${index + 1}`,
          });
        } else if (!quantity) {
          errors.push({
            quantity: `Quantity is required in varient of item ${index + 1}`,
          });
        }

        if (color && quantity) {
          filteredItem.varient = { color, quantity };

          if (size) {
            filteredItem.varient.size = size;
          }
        }
      }
    } else {
      errors.push({
        varient: `Varient is required and must be an object for item ${
          index + 1
        }`,
      });
      hasAllRequiredFields = false;
    }

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
  // check if product exist

  let { productsCheck, total_price } = await checkProductIsAvailable(
    filterData
  );
  if (productsCheck.some((error) => error !== undefined)) {
    return next(new AppErrors(productsCheck, 400));
  }

  // check discount code
  let discountCode;
  if (req.body.discount_code) {
    discountCode = await checkDiscountCodeIsAvailable(
      req.body.discount_code,
      errors
    );
    if (!discountCode) {
      return next(new AppErrors(discountCode, 400));
    }

    total_price = total_price - (total_price * discountCode.percentage) / 100;
  }

  // create order
  let orderData = {
    user: userId,
    products: filterData,
    total_price,
  };
  // update discount usage
  if (req.body.discount_code) {
    orderData.discount_code = discountCode._id;
    discountCode.usage_limit -= 1;
    await discountCode.save();
  }
  console.log(orderData);
  const order = await Order.create(orderData);

  // Return filtered data
  res.status(200).json({ order: "successfully create an order" });
});
