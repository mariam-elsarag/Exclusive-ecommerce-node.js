import AppErrors from "./AppError.js";

const FilterBody = (body, next, allowedFields, fieldsRequired = true) => {
  let errors = [];
  let filter = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filter[key] = body[key];
    }
  });
  if (fieldsRequired) {
    allowedFields.forEach((el) => {
      if (!filter[el]) {
        errors.push({ [el]: `${el} is required` });
      }
    });
  }
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  return filter;
};
export default FilterBody;
