import express from 'express';
import { CartController } from './CartController';

const cartRouter = express.Router();

cartRouter.get('/', CartController.getCart);
cartRouter.put('/', CartController.updateCart);
cartRouter.post('/checkout', CartController.createOrder);
cartRouter.delete('/', CartController.deleteCart);

export default cartRouter;
