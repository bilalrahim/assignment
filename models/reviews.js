import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    restaurantName: { type: String, required: true },
    foodName: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 }
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;
