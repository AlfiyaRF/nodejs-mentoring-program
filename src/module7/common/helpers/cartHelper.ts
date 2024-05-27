import { CartResponse, CartEntity, CartItemEntity, CartForResponse } from '../../Cart/CartInterface';
import { getProductEntities} from './productHelper';

export function getCartTotal(cartItems: CartItemEntity[]): number {
  const total = cartItems.reduce((acc: number, item: CartItemEntity) => {
    const {product, count} = item;
    if (product && count) {
      const {price} = product;
      acc += (price * count);
    }
    return acc;
  }, 0);
  return total;
}

export function getCartForResponse(cartValue: CartForResponse): CartResponse {
  const cart = {
    cart: cartValue,
    total: getCartTotal(cartValue.items)
  };
  return cart;
}

export function getItemsForCart(item: CartItemEntity): CartItemEntity {
  return {
    product: getProductEntities(item.product),
    count: item.count
  };
}

export function getCartEntities(cart: CartEntity): CartForResponse {
  return {
    id: cart.id,
    items: cart.items.map(getItemsForCart)
  };
}
