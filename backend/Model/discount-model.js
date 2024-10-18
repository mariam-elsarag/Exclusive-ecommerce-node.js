import mongoose from "mongoose";
import moment from "moment";

const discountSchema = new mongoose.Schema(
  {
    discount_code: {
      type: String,
      required: [true, "Discount code is required"],
      unique: true,
    },
    percentage: {
      type: Number,
      required: [true, "Discount percentage is required"],
    },
    usage_limit: {
      type: Number,
      required: [true, "usage for discount  is required"],
    },
    exp_date: {
      type: Date,
      required: [true, "Discount expire date is required"],
      set: function (value) {
        const formats = [
          "DD-MM-YYYY",
          "MM-DD-YYYY",
          "YYYY-MM-DD",
          "DD/MM/YYYY",
        ];
        const parsedDate = moment(value, formats, true);
        if (!parsedDate.isValid()) {
          throw new mongoose.Error.ValidationError(
            `Invalid date format. Expected formats: ${formats.join(", ")}`
          );
        }

        return parsedDate.toDate();
      },
      validate: {
        validator: function (value) {
          const today = moment().startOf("day");
          return moment(value).isAfter(today);
        },
        message: "Expiration date cannot be today or in the past.",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

discountSchema.virtual("status").get(function () {
  const today = moment().startOf("day");
  return moment(this.exp_date).isAfter(today) ? "valid" : "expired";
});

discountSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.discountId = ret._id;
    ret.exp_date = moment(ret.exp_date).format("DD-MM-YYYY");
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});

const Discount = mongoose.model("Discount", discountSchema, "Discount");
export default Discount;
