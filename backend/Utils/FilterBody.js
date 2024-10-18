import AppErrors from "./AppError.js";

const FilterBody = (
  body,
  next,
  requiredFields,
  fieldsRequired = true,
  allowedFields = []
) => {
  let errors = [];
  let filter = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key) || requiredFields.includes(key)) {
      filter[key] = body[key];
    }
    console.log(key, "mariam");
  });
  if (fieldsRequired) {
    requiredFields.forEach((el) => {
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
