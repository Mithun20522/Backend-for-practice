import express from 'express';
import { create, deleteProduct, getAllProducts, getProduct, update } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/create',create);
productRouter.get('/getproducts',getAllProducts);
productRouter.get('/getproduct/:id',getProduct);
productRouter.patch('/update/:id',update);
productRouter.delete('/delete/:id',deleteProduct);

export default productRouter;