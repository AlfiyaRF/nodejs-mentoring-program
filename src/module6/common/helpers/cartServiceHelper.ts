import { CartEntity, CartData, CartResponse, CartItemEntity } from '../../interfaces/Cart';

export function getCartTotal(items: CartItemEntity[]): number {
  const total = items.reduce((acc: number, item: CartItemEntity) => {
    const {product, count} = item;
    if (product && count) {
      const {price} = product;
      acc += (price * count);
    }
    return acc;
  }, 0);
  return total;
}

export function getCartEntities(cart: CartEntity): CartData {
  return {
    id: cart.id,
    items: cart.items
  };
}

export function getCartData(cart: CartEntity): CartResponse {
  return {
    cart: getCartEntities(cart),
    total: getCartTotal(cart.items)
  }
}

export function getCartItems (items: CartItemEntity[]): CartItemEntity[] {
  return items.map(item => ({
    product: {...item.product},
    count: item.count
  }));
}
