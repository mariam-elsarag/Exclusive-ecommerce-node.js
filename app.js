const express = require("express");
const cors = require("cors");

// Utils
const AppErrors = require("./Utils/AppError");

// for global errors
const GlobalErrors = require("./Controller/error-controller");

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

// for routes errors
app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});
module.exports = app;
