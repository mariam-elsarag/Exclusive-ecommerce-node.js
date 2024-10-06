const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: [true, "Icon required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|svg|webp|gif)$/.test(v);
        },
        message: "Invalid icon URL format",
      },
    },
    title: {
      type: String,

      required: [true, "Title required"],
      maxLength: [50, "Title must be less than 50 characters"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.categoryId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});

const Category = mongoose.model("Category", categorySchema, "Category");
module.exports = Category;
