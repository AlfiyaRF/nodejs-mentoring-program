import { v4 as uuidv4 } from 'uuid';
import { ProductService } from './ProductService';
import { CartResponse } from '../interfaces/Cart';
import { ProductRequestEntity } from '../interfaces/Product';
import { OrderEntity, ORDER_STATUS } from '../interfaces/Order';
import { CustomError } from '../interfaces/Error';
import { CartRepository } from '../repositories/CartRepository';
import { getCartData, getCartItems, getCartTotal } from '../common/helpers/cartServiceHelper';

export class CartService {
  getOrCreateCart(userId: string): CartResponse {
    let cart = CartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = CartRepository.createCart(userId);
    }
    return getCartData(cart);
  }

  updateCart(userId: string, product: ProductRequestEntity): CartResponse | CustomError {
    const cart = CartRepository.getCartByUserId(userId);
    if (!cart) {
      throw { message: 'Cart was not found' };
    }
    const productData = ProductService.getProductById(product.productId);
    if (!productData) {
      throw { message: 'Product was not found' };
    }
    const productForCart = {
      count: product.count,
      product: productData
    };
    const updatedCart = CartRepository.updateCart(userId, cart, productForCart);
    return getCartData(updatedCart);
  }

  deleteCart (userId: string): Boolean {
    const cart = CartRepository.getCartByUserId(userId);
    if (!cart) return false;
    return CartRepository.deleteCart(userId, cart);
  }

  getOrder(userId: string): OrderEntity | undefined {
    const cart = CartRepository.getCartByUserId(userId);
    if (!cart) return undefined;
    const newOrder: OrderEntity = {
      id: uuidv4(),
      userId: cart.userId,
      cartId: cart.id,
      items: getCartItems(cart.items),
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
      total: getCartTotal(cart.items)
    };
    return newOrder;
  }
}
