import Product from "./product-model.js";

import mongoose, { Aggregate } from "mongoose";

const reviewSchema = new mongoose.Schema(
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
    rate: {
      type: Number,
      min: [1, "min rate is 1"],
      max: [5, "max rate is 5"],
      required: [true, "rate is required"],
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
  },
  { timestamps: true }
);
// calc avg rate
reviewSchema.statics.calcAverageRate = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        nAverage: { $avg: "$rate" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].nAverage,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: 0,
      ratingAverage: 0,
    });
  }
};

reviewSchema.pre("save", function (next) {
  this.populate({
    path: "user",
    select: "full_name",
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "full_name",
  });
  next();
});

reviewSchema.post("save", function (doc, next) {
  // to work with review model not instense (this.constructor)
  this.constructor.calcAverageRate(this.product);
  next();
});

reviewSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.reviewId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.product;
    return ret;
  },
});
const Review = mongoose.model("Review", reviewSchema, "Review");
export default Review;
