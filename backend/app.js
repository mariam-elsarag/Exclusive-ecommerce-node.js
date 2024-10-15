import express from "express";
import cors from "cors";

// Utils
import AppErrors from "./Utils/AppError.js";

// for global errors
import GlobalErrors from "./Controller/error-controller.js";

// routes
import authRoutes from "./Routes/auth-route.js";
import accountRoutes from "./Routes/account-route.js";
import contactRoutes from "./Routes/contact-route.js";
import productRoutes from "./Routes/product-route.js";
import categoryRoutes from "./Routes/category-route.js";
import adminRoutes from "./Routes/admin-route.js";
import cartRoutes from "./Routes/cart-route.js";
// payment
import checkoutRoutes from "./Routes/checkout-route.js";

// for security
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

// for cors
app.use(cors());
// body parser
app.use(express.json());
// set security HTTP headers
app.use(helmet());
//Data sanitization aganist xss
app.use(xss());
// app.use(hpp({ whitelist: [] }));
app.use(hpp());
//Data sanitization aganist noSql injection
app.use(mongoSanitize());

// App routes
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);

app.use("/api/contact", contactRoutes);
// admin route
app.use("/api/admin", adminRoutes);

// for product
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
console.log("Current Environment:", process.env.NODE_ENV);
// payment
app.use("/api/check-out", checkoutRoutes);

// for routes errors
app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});

// for global errors
app.use(GlobalErrors);

export default app;
