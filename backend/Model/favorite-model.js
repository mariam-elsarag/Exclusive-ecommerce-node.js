import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
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
});

favoriteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.favoriteId = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    return ret;
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema, "Favorite");
export default Favorite;
