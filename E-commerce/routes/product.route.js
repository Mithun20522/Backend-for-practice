import express from 'express';
import { create, getAllProducts } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/create',create);
productRouter.get('/getproducts',getAllProducts);

export default productRouter;