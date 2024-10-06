// model
const Category = require("../Model/category-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");
const cloudinary = require("../Utils/Cloudnary");
// controller
const Factory = require("./handle-factory");

// create new category
exports.createNewCategory = CatchAsync(async (req, res, next) => {
  const filterData = FilterBody(req.body, next, ["title"]);
  if (!req.file) {
    return next(new AppErrors([{ icon: "Please upload an icon" }], 400));
  }
  const result = await cloudinary.uploader.upload_stream(
    { folder: "/mediafiles/categories" },

    async (error, result) => {
      if (error) {
        return next(new AppErrors([{ icon: "Failed to upload image" }], 500));
      }

      filterData.icon = result.secure_url;

      const category = await Category.create(filterData);
      res.status(201).json({ category });
    }
  );
  result.end(req.file.buffer);
});

// delete category
exports.deleteCategory = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new AppErrors("Category not found", 404));
  }

  const publicId = category.icon
    .replace("https://res.cloudinary.com/dwlbskyfd/image/upload/", "") // Remove base URL
    .replace(/v\d+\//, "")
    .replace(/\.[^/.]+$/, "");

  try {
    const result = await cloudinary.api.delete_resources([publicId], {
      type: "upload",
      resource_type: "image",
    });
  } catch (error) {
    return next(new AppErrors("Error deleting image from Cloudinary", 500));
  }

  await Category.findByIdAndDelete(id);
  res.status(204).json({ data: null });
});

// get all category
exports.getAllCategory = CatchAsync(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({ category });
});
