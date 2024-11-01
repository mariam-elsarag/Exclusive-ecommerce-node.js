import mongoose from "mongoose";
import validator from "validator";

// for encrypt password
import bcrypt from "bcrypt";

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

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
    otpExpire: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userScema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
// for encrypt password
userScema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// compare user password with password store in DB
userScema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// replace _id to userid for readablity
userScema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.userId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});
// check if user change password after jwt issue
userScema.methods.checkChangePasswordAfterJWT = function (jwtTimeStemp) {
  if (this.passwordChangedAt) {
    const passwordChangeInMillis = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStemp < passwordChangeInMillis;
  }
  return false;
};

const User = mongoose.model("User", userScema, "User");
export default User;
