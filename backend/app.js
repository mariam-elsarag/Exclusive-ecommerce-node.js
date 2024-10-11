const express = require("express");
const cors = require("cors");

// Utils
const AppErrors = require("./Utils/AppError");

// for global errors
const GlobalErrors = require("./Controller/error-controller");

// routes
const authRoutes = require("./Routes/auth-route");
const accountRoutes = require("./Routes/account-route");
const adminRoutes = require("./Routes/admin-route");
const contactRoutes = require("./Routes/contact-route");
const productRoutes = require("./Routes/product-route");
const categoryRoutes = require("./Routes/category-route");
const favoriteRoutes = require("./Routes/favorite-route");

// for security
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

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
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
// for product
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/favorite", favoriteRoutes);

// for routes errors
app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});

// for global errors
app.use(GlobalErrors);
module.exports = app;
