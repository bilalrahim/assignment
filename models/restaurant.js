import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    menu: { type: Object, required: true }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;