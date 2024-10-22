import sharp from "sharp";
// model
import Product from "../Model/product-model.js";
import Order from "../Model/order-model.js";

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
    "-__v -updatedAt -createdAt "
  );

  if (!product) {
    return next(new AppErrors("Product not found", 404));
  }
  const productDetails = await toggleFavorite([product], req);

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .select(
      "-images -description -category -__v -updatedAt -createdAt -shipping -varient"
    );

  res
    .status(200)
    .json({ ...productDetails[0], related_products: relatedProducts });
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

// best selling products
export const bestSellingProducts = CatchAsync(async (req, res, next) => {
  const bestSellingProducts = await Order.aggregate([
    { $match: { status: "paid" } },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        totalSold: { $sum: "$products.varient.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 4 },
  ]);
  const productIds = bestSellingProducts.map(({ _id }) => _id);
  const products = await Product.find({ _id: { $in: productIds } }).select(
    "thumbnail  title price offer_percentage ratingQuantity ratingAverage offer_price productId"
  );
  res.status(200).json({ products });
});

// New Arrival
export const newArrival = CatchAsync(async (req, res, next) => {
  const products = await Product.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $project: {
        productId: "$_id",
        _id: 0,
        createdAt: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
      },
    },
    { $limit: 4 },
  ]);
  res.status(200).json({ products });
});
