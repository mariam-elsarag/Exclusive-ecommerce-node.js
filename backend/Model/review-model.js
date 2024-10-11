const mongoose = require("mongoose");

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

reviewSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.reviewId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Review = mongoose.model("Review", reviewSchema, "Review");
module.exports = Review;
