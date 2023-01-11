import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/restaurant.js';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

const dbUrl = process.env.DB_URL;

const connectToDb = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
};

const startServer = async () => {
    const port = process.env.PORT;
    await connectToDb();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

startServer();
