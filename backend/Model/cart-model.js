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
  },
  { timestamps: true }
);
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select:
      "thumbnail title price is_new ratingQuantity ratingAverage offer_price varient",
  });

  next();
});

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
