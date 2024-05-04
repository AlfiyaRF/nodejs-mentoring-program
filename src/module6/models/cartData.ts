import { CartItemEntity, CartEntity } from '../interfaces/Cart';
import { products } from './productData';

const cartItem: CartItemEntity = {
  product: products[0],
  count: 2,
};

export const carts: CartEntity[] = [{
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItem],
}];
