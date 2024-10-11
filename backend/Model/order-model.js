const mongoose = require("mongoose");

orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);
orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.orderId = _id;
    delete ret._id;
    delete ret.__v;
    delete ret.id;
    return ret;
  },
});

const Order = mongoose.model("Order", orderSchema, "Order");
module.exports = Order;
