import Restaurant from "../models/restaurant.js"

const addMenu = async (req, res) => {

    // Finds a restaurant in DB.
    // If exists updates its menu.
    // Else creates a new restaurant.

    try {
        const {restaurantName, menu} = req.body;
        const filter = { restaurantName };
        const update = { menu };
        await Restaurant.findOneAndUpdate(filter, update, { upsert: true });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update menu" });
    }
};


export { addMenu }