import express from 'express'
import { addMenu } from '../controller/restaurant.js'

const router = express.Router()

router.post('/new-menu', addMenu)

export default router 
