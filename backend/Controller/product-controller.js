import sharp from "sharp";
// model
import Product from "../Model/product-model.js";
import Favorite from "../Model/favorite-model.js";

// utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";
import FilterBody from "../Utils/FilterBody.js";
import cloudinary from "../Utils/Cloudnary.js";
import ApiFeature from "../Utils/ApiFeatures.js";
import toggleFavorite from "../Utils/toggleFavorite.js";

export const resizeProductImages = CatchAsync(async (req, res, next) => {
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

// Get all products
export const getAllProduct = CatchAsync(async (req, res, next) => {
  const features = new ApiFeature(Product.find(), req.query)
    .filter()
    .search(["title"])
    .limitFields(
      "thumbnail title price is_new ratingQuantity ratingAverage productId offer_price offer_percentage"
    )
    .pagination(8);

  const products = await features.getPaginations(Product, req);
  // if not authorized will return favorite null
  products.results = await toggleFavorite(products.results, req);
  res.status(200).json(products);
});
// get product details
export const getProductDetails = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).select(
    "-__v -updatedAt -createdAt -category"
  );

  const productDetails = await toggleFavorite([product], req);
  res.status(200).json({ ...productDetails[0] });
});
// create new product
export const createNewProduct = CatchAsync(async (req, res, next) => {
  const allowFields = ["offer_percentage"];
  const requireFields = [
    "title",
    "description",
    "price",
    "category",
    "shipping",
    "varient",
  ];
  const filterData = FilterBody(
    req.body,
    next,
    requireFields,
    true,
    allowFields
  );
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

// delete product
export const deleteProduct = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  // not found
  if (!product) {
    return next(new AppErrors("Product not found", 404));
  }
  const publidIds = [];
  const images = [...product.images, product.thumbnail];
  images.forEach((image) => {
    publidIds.push(
      image
        .replace("https://res.cloudinary.com/dwlbskyfd/image/upload/", "")
        .replace(/v\d+\//, "")
        .replace(/\.[^/.]+$/, "")
    );
  });

  // delete images from cloudinary
  try {
    const result = await cloudinary.api.delete_resources(publidIds);
  } catch (error) {
    return next(new AppErrors("Error deleting image from Cloudinary", 500));
  }

  // actually delete product from DB
  await Product.findByIdAndDelete(id);

  res.status(204).json({ data: null });
});

// delete image
export const deleteProductImage = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { image_url } = req.body;
  if (!image_url) {
    return next(new AppErrors("image is required", 400));
  }

  const product = await Product.findById(id);

  // not found
  if (!product) {
    return next(new AppErrors("Product not found", 404));
  }
  // for delete image
  const publicId = image_url
    .replace("https://res.cloudinary.com/dwlbskyfd/image/upload/", "")
    .replace(/v\d+\//, "")
    .replace(/\.[^/.]+$/, "");

  // delete image from cloudinary
  try {
    const result = await cloudinary.api.delete_resources([publicId]);
  } catch (error) {
    return next(new AppErrors("Error deleting image from Cloudinary", 500));
  }

  product.images = product.images.filter((img) => img !== image_url);

  await product.save();
  res.status(200).json({ product });
});
