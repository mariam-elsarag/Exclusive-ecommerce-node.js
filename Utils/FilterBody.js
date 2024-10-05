const FilterBody = (body, allowedFields) => {
  let filter = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filter[key] = body[key];
    }
  });
  return filter;
};
module.exports = FilterBody;
