import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity } from '../interfaces/Cart';
import { ProductEntity } from '../interfaces/Product';
import { carts as cartData } from '../models/cartData';

let carts = cartData;

export interface CartItemEntityWithUndefined {
  product: ProductEntity | undefined;
  count: number;
};

export class CartRepository {
  static getAllCarts(): CartEntity[] {
    return carts.map(cart => ({
      id: cart.id,
      userId: cart.userId,
      isDeleted: cart.isDeleted,
      items: cart.items.map(item => ({
        count: item.count,
        product: {
          id: item.product.id,
          title: item.product.title,
          description: item.product.description,
          price: item.product.price
        },
      })),
    }));
  }

  static createCart(userId: string): CartEntity {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    };
    carts.push(newCart);
    return newCart;
  }

  static getCartByUserId(userId: string): CartEntity | undefined {
    const carts = CartRepository.getAllCarts();
    const cart: CartEntity | undefined = carts.find(cart => cart.userId === userId);
    if (!cart) return undefined;
    return cart;
  }

  static updateCart(userId: string, cart: CartEntity, product: CartItemEntity): CartEntity {
    const updatedItems = cart.items.reduce((acc, item) => {
      if (product && product.product && item.product && item.product.id !== product.product.id) {
        acc.push(item);
      }
      return acc;
    }, [{
      product: (product && product.product) || undefined,
      count:(product && product.count) || 0
    }])
      .filter(item => +(item.count || 0) !== 0);

    for (let i = 0; i < carts.length; i++) {
      if (carts[i].userId === userId) {
        carts[i].items = updatedItems;
      }
    }
    cart.items = updatedItems;
    return cart;
  }

  static deleteCart(userId: string, cart: CartEntity): Boolean {
    let deleted = false;
    if (cart && !cart.isDeleted) {
      cart.items = [];
      cart.isDeleted = true;
      deleted = true;
    }
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].userId === userId) {
        carts[i].isDeleted = true;
      }
    }
    return deleted;
  }
}