import Review from "../Model/review-model.js";
import Order from "../Model/order-model.js";
// utils
import CatchAsync from "../Utils/CatchAsync.js";
import ApiFeature from "../Utils/ApiFeatures.js";
import FilterBody from "../Utils/FilterBody.js";
import AppErrors from "../Utils/AppError.js";

// create new review
export const createNewReview = CatchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  // filter body
  const requiredFields = ["rate", "comment"];
  const filterData = FilterBody(req.body, next, requiredFields);

  // check if use have order
  const orders = await Order.find({
    user: userId,
    products: { $elemMatch: { productId: productId } },
    status: "paid",
  });
  // check if user review this product
  const review = await Review.findOne({ product: productId, user: userId });
  if (review) {
    // check lates order
    const hasRecentOrder = orders.some(
      (order) => order.createdAt > review.createdAt
    );

    if (hasRecentOrder) {
      review.rate = filterData.rate;
      review.comment = filterData.comment;
      await review.save();
      res.status(200).json({ review });
    } else {
      return res.status(400).json({
        message: "No recent order found. You cannot update the review.",
      });
    }
  } else {
    const newReview = await Review.create({
      product: productId,
      user: userId,
      rate: filterData.rate,
      comment: filterData.comment,
    });
    res.status(201).json({ review: newReview });
  }
});

// get all product reviews
export const getAllReviews = CatchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const features = new ApiFeature(
    Review.find({ product: productId }),
    req.query,
    req.query
  )
    .limitFields("-createdAt -product")
    .pagination(8);
  const reviews = await features.getPaginations(Review, req);

  res.status(200).json({ ...reviews });
});

// delete review
export const deleteReview = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const review = await Review.findByIdAndDelete({ _id: id, user: userId });

  if (!review) {
    return next(new AppErrors("Review not found", 404));
  }
  await Review.calcAverageRate(review.product);
  res.status(204).end();
});
