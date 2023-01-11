import Restaurant from "../models/restaurant.js"

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
        await Restaurant.deleteOne(filter);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete menu" });
    }
}

export { addUpdateMenu, deleteMenu }