import { ProductService } from '../Product/ProductService';
import { CartResponse } from './CartInterface';
import { ProductRequestEntity } from '../Product/ProductInterface';
import { OrderEntity } from '../Order/OrderInterface';
import { CustomError } from '../Error/ErrorInterface';
import { CartRepository } from './CartRepository';
import { getCartForResponse } from '../common/helpers/cartHelper';

export class CartService {
  static async getOrCreateCart(userId: string): Promise<CartResponse> {
    let cart = await CartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await CartRepository.createCart(userId);
    }
    return getCartForResponse(cart);
  }

  static async updateCart(userId: string, product: ProductRequestEntity): Promise<CartResponse | undefined | CustomError> {
    const productData = await ProductService.getProductById(product.productId);
    if (!productData) {
      throw { message: 'Product was not found' };
    }
    const productForCart = {
      count: product.count,
      product: productData
    };
    const cartUpdated = await CartRepository.updateCart(userId, productForCart);
    if (cartUpdated) {
      const cart = await CartRepository.getCartByUserId(userId);
      if (!cart) {
        throw { message: 'Cart was not found' };
      }
      return getCartForResponse(cart);
    }
    throw Error;
  }

  static async deleteCart (userId: string): Promise<Boolean> {
    return await CartRepository.deleteCart(userId);
  }

  static async getOrder(userId: string): Promise<OrderEntity | undefined> {
    const order = await CartRepository.getOrder(userId);
    return order;
  }
}
