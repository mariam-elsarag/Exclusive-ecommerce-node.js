// model
import Contact from "../Model/contact-model.js";

// utils

// controller
import { createOne, deleteOne, getOne } from "../Controller/handle-factory.js";

// controllers
// create new contact form
export const createNewContact = createOne(Contact, [
  "user",
  "email",
  "phone_number",
  "message",
]);

// delete contact form (only admin )
export const deleteContactForm = deleteOne(Contact);

// get one contact form (only admin)
export const getContactForm = getOne(Contact);
