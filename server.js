import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;


mongoose.connect(MONGO_DB_URL)
.then(() => {console.log('MongoDB connected');
}).catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});