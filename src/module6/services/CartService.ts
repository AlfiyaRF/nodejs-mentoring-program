import { ProductService } from './ProductService';
import { CartResponse } from '../interfaces/Cart';
import { ProductRequestEntity } from '../interfaces/Product';
import { OrderEntity } from '../interfaces/Order';
import { CustomError } from '../interfaces/Error';

import { CartRepository } from '../repositories/CartRepository';

export class CartService {

  getCartByUserId(userId: string): CartResponse {
    return CartRepository.getCartByUserId(userId);
  }

  updateCart(userId: string, product: ProductRequestEntity): CartResponse | CustomError {
    const productData = ProductService.getProductById(product.productId);
    if (!productData) {
      const error = {
        status: 404,
        message: 'Product was not found'
      };
      throw error;
    }
    const productForCart = {
      count: product.count,
      product: productData
    };
    return CartRepository.updateCart(userId, productForCart);
  }

  deleteCart (userId: string): Boolean {
    return CartRepository.deleteCart(userId);
  }

  getOrder(userId: string): OrderEntity | undefined {
    return CartRepository.getOrder(userId);
  }
}
