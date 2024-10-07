const sharp = require("sharp");
// model
const Product = require("../Model/product-model");

// utils
const AppErrors = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const FilterBody = require("../Utils/FilterBody");
const cloudinary = require("../Utils/Cloudnary");

exports.resizeProductImages = CatchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // resize image
  if (req.files.thumbnail) {
    const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
      .resize(250, 270)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    req.thumbnailBuffer = thumbnailBuffer;
  }
  next();
});
// create new product
exports.createNewProduct = CatchAsync(async (req, res, next) => {
  const allowFields = [
    "title",
    "description",
    "price",
    "category",
    "offer_price",
    "is_new",
    "size",
    "is_free_delivery",
    "colors",
  ];
  const filterData = FilterBody(req.body, next, allowFields, false);
  let errors = [];
  if (!req.files.thumbnail || req.files.thumbnail.length === 0) {
    errors.push({ thumbnail: "thumbnail is required" });
  }
  if (!req.files.images || req.files.images.length === 0) {
    errors.push({ images: "Images are required" });
  }
  if (errors.length > 0) {
    return next(new AppErrors(errors, 400));
  }
  // upload thumbnail
  const results = await cloudinary.uploader.upload_stream(
    { folder: "/mediafiles/product" },
    async (error, result) => {
      if (error) {
        return next(
          new AppErrors([{ thumbnail: "Failed to upload thumbnail" }], 500)
        );
      }

      filterData.thumbnail = result.secure_url;

      // Upload images to Cloudinary
      const imageUploadPromises = req.files.images.map(
        (image) =>
          new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "/mediafiles/product" },
              (error, result) => {
                if (error) {
                  return reject(
                    new AppErrors([{ images: "Failed to upload images" }], 500)
                  );
                }
                resolve(result.secure_url);
              }
            );
            uploadStream.end(image.buffer);
          })
      );

      const imagesResults = await Promise.all(imageUploadPromises);
      filterData.images = imagesResults;

      // create product
      const product = await Product.create(filterData);
      res.status(201).json({ product });
    }
  );
  results.end(req.thumbnailBuffer);
});
