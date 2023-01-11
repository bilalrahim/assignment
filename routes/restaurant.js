import express from 'express';
import { addUpdateMenu, deleteMenu } from '../controllers/restaurant.js';

const router = express.Router();

router.post('/add-update-menu', addUpdateMenu);
router.delete('/delete-menu', deleteMenu)

export default router;
