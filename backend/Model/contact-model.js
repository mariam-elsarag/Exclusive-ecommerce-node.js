import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "user name is required"],
    maxLength: [50, "Max length for first name is 50 character"],
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: [true, "Email is required"],
  },
  phone_number: {
    type: String,
    validate: {
      validator: (value) => validator.isMobilePhone(value, "ar-EG"),
      message: "Please provide a valid phone number",
    },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
});
contactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.contactId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});
const Contact = mongoose.model("Contact", contactSchema, "Contact");
export default Contact;
