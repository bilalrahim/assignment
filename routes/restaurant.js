import express from 'express';
import { addReview, addUpdateMenu, deleteMenu, deleteReview, getRestaurantFoodOverallRating, getRestaurantFoodReview, getRestaurantOverallRating, getTopRestaurant, updatReview } from '../controllers/restaurant.js';

const router = express.Router();

router.post('/add-update-menu', addUpdateMenu);
router.delete('/delete-menu', deleteMenu);

router.post('/add-review', addReview)
router.put('/update-review', updatReview);
router.delete('/delete-review', deleteReview)

router.get('/restaurant-overall-rating', getRestaurantOverallRating)
router.get('/restaurant-food-overall-rating', getRestaurantFoodOverallRating)

router.get('/restaurant-food-reviews', getRestaurantFoodReview)

router.get('/top-restaurant', getTopRestaurant)

export default router;
