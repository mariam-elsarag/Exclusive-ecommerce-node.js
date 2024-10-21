import Review from "./review-model.js";
import Favorite from "./favorite-model.js";
import Cart from "./cart-model.js";
import Order from "./order-model.js";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: [true, "thumbnail required"],
    },
    images: [{ type: String, required: [true, "images required"] }],
    title: {
      type: String,
      maxLength: [100, "Max length for title is 100 character"],
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    offer_price: {
      type: Number,
    },
    offer_percentage: {
      type: Number,
      min: [1, "Min percentage of offer is 1%"],
      max: [100, "Max percentage of offer is 5%"],
    },
    is_new: {
      type: Boolean,
      default: true,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 1"],
      max: [5, "Rating must be below 5"],
      set: (val) => Math.round(val * 10) / 10,
    },

    shipping: {
      type: Number,
      required: [true, "shipping is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    varient: {
      required: [true, "At least one variant is required"],
      type: [
        {
          color: {
            type: String,

            required: [true, "Color is required"],
          },
          stock: {
            type: Number,
            min: [1, "Stock must be more than 1"],
            required: [true, "Stock for the color is required"],
          },
          size: [
            {
              type: String,
              enum: ["xs", "s", "M", "l", "Xl"],
            },
          ],
          status: {
            type: String,
            default: "in_stoke",
            enum: ["in_stoke", "out_of_stoke"],
          },
        },
      ],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one variant must be provided",
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.pre("save", function (next) {
  if (this.offer_percentage) {
    this.offer_price = this.price - (this.price * this.offer_percentage) / 100;
  }
  next();
});
// remove reviews after remove product
productSchema.post("findOneAndDelete", async function (doc, next) {
  console.log(doc._id, "doc");

  if (doc) {
    //  delete all reviews related to this product
    await Review.deleteMany({ product: doc._id });
    //  deleteall favorite product
    await Favorite.deleteMany({ product: doc._id });
    // delete items in cart related to this product
    await Cart.deleteMany({ products: doc._id });
    // delete all order that pending
    await Order.deleteMany({
      products: {
        $elemMatch: { productId: doc._id },
      },
      status: "pending",
    });
  }
});
productSchema.set("toJSON", {
  timestamps: true,
  virtuals: true,
  transform: (doc, ret) => {
    ret.productId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Product = mongoose.model("Product", productSchema, "Product");
export default Product;
