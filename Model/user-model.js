const mongoose = require("mongoose");
const validator = require("validator");

const userScema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      maxLength: [50, "Max length for first name is 50 character"],
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      maxLength: [50, "Max length for last name is 50 character"],
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Email is required"],
    },
    phone_number: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "ar-EG"),
        message: "Please provide a valid phone number",
      },
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      validate: [
        validator.isStrongPassword,
        "Password is too common, please use a strong password",
        ,
      ],
    },
    passwordChangedAt: Date,
    otp: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model("User", userScema, "User");
module.exports = User;
