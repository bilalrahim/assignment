import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    menu: { type: Array, required: true },
    overallRating: { type: Number, default: 0 }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;