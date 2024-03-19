import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import UserRouter from './E-commerce/routes/user.route.js';
import productRouter from './E-commerce/routes/product.route.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookies());

const PORT = process.env.PORT || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;


mongoose.connect(MONGO_DB_URL)
.then(() => {console.log('MongoDB connected');
}).catch((err) => console.log(err));


app.use('/api/user',UserRouter);
app.use('/api/product',productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});