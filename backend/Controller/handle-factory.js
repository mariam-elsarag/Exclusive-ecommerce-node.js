// utils
import CatchAsync from "../Utils/CatchAsync.js";
import AppErrors from "../Utils/AppError.js";
import FilterBody from "../Utils/FilterBody.js";

// create one field
export const createOne = (Model, allowedFields) =>
  CatchAsync(async (req, res, next) => {
    const filterData = FilterBody(req.body, next, allowedFields);
    const doc = await Model.create(filterData);
    res.status(201).json({ data: doc });
  });

//update one
export const updateOne = (Model, allowedFields, nameOfReturnData = "data") =>
  CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const filterData = FilterBody(req.body, next, allowedFields, false);

    const doc = await Model.findByIdAndUpdate(id, filterData, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppErrors("Not found", 404));
    }
    res.status(201).json({ [nameOfReturnData]: doc });
  });

// delete one field
export const deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppErrors("Not found", 404));
    }
    res.status(204).json({ data: null });
  });

// get one field
export const getOne = (Model, excludeFields = [], populateOption) =>
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

// get all
export const getAll = (Model, nameOfReturnData) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({ [nameOfReturnData]: doc });
  });
