import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

// for db connection
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error while connect DB", error);
  });

// Connect application
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Application work");
});
