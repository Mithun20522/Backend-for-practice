import express from 'express';
import { create, getAllProducts, getProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/create',create);
productRouter.get('/getproducts',getAllProducts);
productRouter.get('/getproduct/:id',getProduct);

export default productRouter;