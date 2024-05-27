import express from 'express';
import { ProductController } from './ProductController';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAllProducts);
productRouter.post('/', ProductController.createProduct);
productRouter.get('/:productId', ProductController.getProductById);

export default productRouter;
