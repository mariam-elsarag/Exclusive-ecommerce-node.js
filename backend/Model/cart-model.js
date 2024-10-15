import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    quantity: {
      type: Number,
    },
    color: {
      type: String,
    },
    total_price: {
      type: Number,
    },

    discount_code: {
      type: String,
    },
  },
  { timestamps: true }
);
cartSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.cartId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Cart = mongoose.model("Cart", cartSchema, "Cart");
export default Cart;
