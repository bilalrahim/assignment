import express from "express";
import {config} from 'dotenv'
import router from "./routes/restaurant.js";
config()

const app=express()
app.use(express.json()); // Parses json payload in the request body
app.use(express.urlencoded({ extended: true })); // Parses url encoded payload in the request body
app.use('/api', router);


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})