// utils
const CatchAsync = require("../Utils/CatchAsync");
const AppErrors = require("../Utils/AppError");
const FilterBody = require("../Utils/FilterBody");

// create one field
exports.createOne = (Model, allowedFields) =>
  CatchAsync(async (req, res, next) => {
    const filterData = FilterBody(req.body, allowedFields);
    const doc = await Model.create(filterData);
    res.status(201).json({ data: doc });
  });

// delete one field
exports.deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppErrors("Not found", 404));
    }
    res.status(204).json({ data: null });
  });

// get one field
exports.getOne = (Model, excludeFields = [], populateOption) =>
  CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    let query = Model.findById(id);
    if (populateOption) {
      query = query.populate(populateOption);
    }
    if (excludeFields.length > 0) {
      const excludeFieldsString = excludeFields
        .map((field) => `-${field}`)
        .join(" ");
      query = query.select(excludeFieldsString);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppErrors("Not found", 404));
    }
    res.status(200).json({ data: doc });
  });
