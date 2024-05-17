import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity, CartResponse } from '../interfaces/Cart';
import { ProductEntity } from '../interfaces/Product';
import { OrderEntity, ORDER_STATUS } from '../interfaces/Order';
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

  static getCart(userId: string): CartEntity {
    const carts = CartRepository.getAllCarts();
    let cart: CartEntity | undefined = carts.find(cart => cart.userId === userId);
    if (!cart) {
      cart = CartRepository.createCart(userId);
    }
    return cart;
  }

  static getCartTotal(cartItems: CartItemEntity[]): number {
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

  static getCartByUserId(userId: string): CartResponse {
    const cart = CartRepository.getCart(userId);
    const cartData = {
      cart: {
        id: cart.id,
        items: cart.items
      },
      total: CartRepository.getCartTotal(cart.items)
    };
    return cartData;
  }

  static updateCart(userId: string, product: CartItemEntity): CartResponse {
    const cart = CartRepository.getCart(userId);
    if (!cart) {
      const error = {
        status: 404,
        message: 'Cart was not found'
      };
      throw error;
    }
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

    const cartData = {
      cart: {
        id: cart.id,
        items: updatedItems
      },
      total: CartRepository.getCartTotal(updatedItems)
    };

    return cartData;
  }

  static deleteCart(userId: string): Boolean {
    let deleted = false;
    const cart = CartRepository.getCart(userId);
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

  static getCartItems (items: CartItemEntity[]): CartItemEntity[] {
    return items.map(item => ({
      product: {...item.product},
      count: item.count
    }));
  }

  static getOrder(userId: string): OrderEntity | undefined {
    const cart = CartRepository.getCart(userId);
    if (cart && !cart.isDeleted) {
      const newOrder: OrderEntity = {
        id: uuidv4(),
        userId: cart.userId,
        cartId: cart.id,
        items: CartRepository.getCartItems(cart.items),
        payment: {
          type: "paypal",
          address: "London",
          creditCard: "1234-1234-1234-1234"
        },
        delivery: {
          type: "post",
          address: "London"
        },
        comments: "",
        status: ORDER_STATUS.CREATED,
        total: CartRepository.getCartTotal(cart.items)
      };
      return newOrder;
    }
    return;
  }
}