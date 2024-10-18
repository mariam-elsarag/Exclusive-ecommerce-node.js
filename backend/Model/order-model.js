import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        varient: {
          color: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          size: {
            type: String,
            enum: ["xs", "s", "M", "l", "Xl"],
          },
        },
      },
    ],
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    },
    total_price: {
      type: Number,
      min: [0, "min price is 0"],
      required: [true, "total price is required"],
    },
    discount_code: {
      type: mongoose.Schema.ObjectId,
      ref: "Disoucnt",
    },
  },
  { timestamps: true }
);
orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.orderId = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Order = mongoose.model("Order", orderSchema, "Order");
export default Order;
