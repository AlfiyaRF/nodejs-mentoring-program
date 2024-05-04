import { v4 as uuidv4 } from 'uuid';
import { ProductService } from './ProductService';
import { CartEntity, CartItemEntity, CartResponse } from '../interfaces/Cart';
import { ProductRequest } from '../interfaces/Product';
import { OrderEntity, ORDER_STATUS } from '../interfaces/Order';
import { CustomError } from '../interfaces/Error';
import { carts as cartData } from '../models/cartData';

let carts = cartData;

export class CartService {
  static getAllCarts(): CartEntity[] {
    const cartsData = carts.map(cart => ({
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
    return cartsData;
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

  static getCart(userId: string): CartEntity {
    const carts = CartService.getAllCarts();
    let cart: CartEntity | undefined = carts.find(cart => cart.userId === userId);
    if (!cart) {
      cart = CartService.createCart(userId);
    }
    return cart;
  }

  static getCartByUserId(userId: string): CartResponse {
    const cart = CartService.getCart(userId);
    const cartData = {
      cart: {
        id: cart.id,
        items: cart.items
      },
      total: CartService.getCartTotal(cart.items)
    };
    return cartData;
  }

  static updateCart(userId: string, product: ProductRequest): CartResponse | CustomError {
    const cart = CartService.getCart(userId);
    if (!cart) {
      const error = {
        status: 404,
        message: 'Cart was not found'
      };
      throw error;
    }
    const productData = ProductService.getProductById(product.productId);
    if (!productData) {
      const error = {
        status: 404,
        message: 'Product was not found'
      };
      throw error;
    }
    const updatedItems = cart.items.reduce((acc: CartItemEntity[], item: CartItemEntity) => {
      if (item.product.id !== product.productId) {
        acc.push(item);
      }
      return acc;
    }, [{
      product: productData,
      count: product.count
    }])
      .filter(item => +item.count !== 0);
    
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
      total: CartService.getCartTotal(updatedItems)
    };

    return cartData;
  }

  static deleteCart (userId: string): Boolean {
    let deleted = false;
    const cart = CartService.getCart(userId);
    if (cart) {
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

  static getOrder(uderId: string): OrderEntity | undefined {
    const cart = CartService.getCart(uderId);
    if (cart && !cart.isDeleted) {
      const newOrder: OrderEntity = {
        id: uuidv4(),
        userId: cart.userId,
        cartId: cart.id,
        items: CartService.getCartItems(cart.items),
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
        total: CartService.getCartTotal(cart.items)
      };
      return newOrder;
    }
    return;
  }
}