import express from 'express';
import { CartController } from '../controllers/CartController';

const cartRouter = express.Router();

cartRouter.get('/', CartController.getCart);
cartRouter.post('/checkout', CartController.createOrder);
cartRouter.put('/', CartController.updateCart);
cartRouter.delete('/', CartController.deleteCart);

export default cartRouter;
