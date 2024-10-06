const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

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
    size: [
      {
        type: String,
        enum: ["xs", "s", "M", "l", "Xl"],
      },
    ],
    is_free_delivery: {
      type: Boolean,
      required: [true, "is_free_delivery is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    colors: [
      {
        color: {
          type: String,
          required: [true, "Color is required"],
        },
        stock: {
          type: Number,
          required: [true, "Stock for the color is required"],
        },
      },
    ],
  },
  { timestamps: true }
);
productSchema.set("toJSON", {
  timestamps: true,
  transform: (doc, ret) => {
    ret.productId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Product = mongoose.model("Product", productSchema, "Product");
module.exports = Product;
