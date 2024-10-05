// model
const Contact = require("../Model/contact-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");

// controller
const Factory = require("../Controller/handle-factory");

// controllers
// create new contact form
exports.createNewContact = Factory.createOne(Contact, [
  "user",
  "email",
  "phone_number",
  "message",
]);

// delete contact form (only admin )
exports.deleteContactForm = Factory.deleteOne(Contact);

// get one contact form (only admin)
exports.getContactForm = Factory.getOne(Contact);
