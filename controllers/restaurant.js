import Restaurant from "../models/restaurant.js"
import Reviews from "../models/reviews.js";

const addUpdateMenu = async (req, res) => {
    try {
        const {restaurantName, menu} = req.body;
        const filter = { restaurantName };
        const update = { menu };
        await Restaurant.findOneAndUpdate(filter, update, { upsert: true });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update menu" });
    }
};

const deleteMenu = async (req, res)=>{
    try {
        const {restaurantName} = req.body;
        const filter = { restaurantName };
        const update = { $unset: { menu: "" } };
        await Restaurant.updateOne(filter, update);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete menu" });
    }
}
const addReview = async (req, res) => {
    try {
        const newReview = new Reviews(req.body);
        await newReview.save();
        res.status(201).json({ success: true, message: 'Review added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to add review" });
    }
};



const updateReview = async (req, res) => {
    try {
        const { customerName, foodName, restaurantName, review, rating } = req.body;
        const filter = { restaurantName, foodName };
        const update = { $set: { customerName, review, rating } };
        await Reviews.findOneAndUpdate(filter, update, { upsert: true });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update review" });
    }
};

const deleteReview = async (req, res)=>{
    try {
        const {restaurantName, foodName, customerName} = req.body;
        const filter = { restaurantName, foodName, customerName };
        await Reviews.deleteOne(filter);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete menu" });
    }
}

const getRestaurantOverallRating = async (req, res) => {
    try {
        const { restaurantName } = req.body;
        if (!restaurantName) return res.status(400).json({message: 'restaurantName is required'});
        const aggregatePipeline = [
            {
                $match: {
                    restaurantName
                }
            },
            {
                $group: {
                    _id: null,
                    overallRating: { $avg: "$rating" }
                }
            }
        ];
        const overallRating = await Reviews.aggregate(aggregatePipeline);
        if(!overallRating.length) return res.status(404).json({message: 'No reviews found for this restaurant'});
        res.json({overallRating: overallRating[0].overallRating});
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};

const getRestaurantFoodOverallRating = async (req, res) => {
    try {
        const { restaurantName, foodName } = req.body;
        if (!restaurantName || !foodName) return res.status(400).json({message: 'restaurantName and foodName are required'});
        const aggregatePipeline = [
            {
                $match: {
                    restaurantName, foodName
                }
            },
            {
                $group: {
                    _id: null,
                    overallRating: { $avg: "$rating" }
                }
            }
        ];
        const overallRating = await Reviews.aggregate(aggregatePipeline);
        if(!overallRating.length) return res.status(404).json({message: 'No reviews found for this food'});
        res.json({overallRating: overallRating[0].overallRating});
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};

const getRestaurantFoodReview = async (req, res) => {
    try {
        const { restaurantName, foodName } = req.body;
        if (!restaurantName || !foodName) return res.status(400).json({message: 'restaurantName and foodName are required'});
        const reviews = await Reviews.find({ restaurantName, foodName }).select('customerName review rating');
        if(!reviews.length) return res.status(404).json({message: 'No reviews found for this food'});
        res.json({reviews});
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};

const getTopRestaurant = async (req, res) => {
    try {
        const aggregatePipeline = [
            {
                $group: {
                    _id: "$restaurantName",
                    overallRating: { $avg: "$rating" }
                }
            },
            {
                $sort: { overallRating: -1 }
            },
            {
                $limit: 1
            }
        ];
        const topRestaurant = await Reviews.aggregate(aggregatePipeline);
        if(!topRestaurant.length) return res.status(404).json({message: 'No reviews found'});
        res.json({topRestaurant});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { addUpdateMenu, deleteMenu, addReview, updateReview, deleteReview, getRestaurantOverallRating, getRestaurantFoodOverallRating, getRestaurantFoodReview, getTopRestaurant }