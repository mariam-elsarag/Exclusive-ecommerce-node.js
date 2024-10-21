import Stripe from "stripe";
// model
import Cart from "../Model/cart-model.js";
import Order from "../Model/order-model.js";
import Product from "./../Model/product-model.js";

// utils
import AppErrors from "./../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";

// checkout
// check discount code
const checkDiscountCodeIsAvailable = async (code) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const coupon = await stripe.coupons.reterieve(code);
  return coupon;
};
// check if product is available
const checkProductIsAvailable = async (products) => {
  let total_price = 0;
  let item_price = 0;
  let productDetails = [];
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
        item_price = product.offer_price;
      } else {
        total_price += item.varient.quantity * product.price;
        item_price = product.price;
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
      const variantIndex = product.varient.findIndex(
        (varient) => varient.color === item.varient.color
      );

      if (variantIndex !== -1) {
        product.varient[variantIndex].stock -= item.varient.quantity;
      }
      await product.save();
      productDetails.push({
        product_price: item_price,
        quantity: item.varient.quantity,
        product_name: product.title,
      });
    })
  );
  return { productsCheck, total_price, productDetails };
};

// create strip session
const stripSession = async (products, orderId, email, code) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.product_name,
        },
        unit_amount: Math.round(item.product_price * 100),
      },
      quantity: +item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONT_SERVER}/success-payment/order=${orderId}`,
      cancel_url: `${process.env.FRONT_SERVER}/cancel-payment`,
      customer_email: email,
      client_reference_id: orderId.toString(),
      discounts: code ? [{ coupon: code }] : undefined,
    });
    return { id: session.id, url: session.url };
  } catch (error) {
    throw new AppErrors(error, 400);
  }
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
  const cartProductIds = cart.products.map((cartItem) =>
    cartItem._id.toString()
  );

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
      if (!cartProductIds.includes(item.productId)) {
        errors.push({
          product: `Product with ID ${item.productId} is not in your cart`,
        });
      } else {
        filterData.push(filteredItem);
      }
    }
  });
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  // check if product exist

  let { productsCheck, total_price, productDetails } =
    await checkProductIsAvailable(filterData);
  if (productsCheck.some((error) => error !== undefined)) {
    return next(new AppErrors(productsCheck, 400));
  }

  // check discount code
  let discountCode;
  if (req.body.coupon) {
    discountCode = await checkDiscountCodeIsAvailable(req.body.coupon);

    total_price = total_price - (total_price * discountCode.percent_off) / 100;
  }

  // create order
  let orderData = {
    user: userId,
    products: filterData,
    total_price,
  };
  // update discount usage
  if (req.body.coupon) {
    orderData.coupon = req.body.coupon;
  }
  const order = await Order.create(orderData);
  const session = await stripSession(
    productDetails,
    order._id,
    req.user.email,
    req.body.coupon
  );
  // Return filtered data
  res.status(200).json({ orderId: order._id, session: session });
});

// success payment
export const successPayment = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const order = await Order.findOne({ user: userId, _id: id });
  if (!order) {
    return next(new AppErrors("Order not found", 404));
  }
  order.status = "paid";
  await order.save();
  res.status(200).json({ order: "Successfully pay order" });
});
