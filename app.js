const express = require("express");
const cors = require("cors");

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

module.exports = app;
