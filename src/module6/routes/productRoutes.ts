import express from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = express.Router();

productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:productId', ProductController.getProductById);

export default productRouter;
