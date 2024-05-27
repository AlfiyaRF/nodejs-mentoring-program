import { v4 as uuidv4 } from 'uuid';
import { CartItemEntity, CartForResponse } from './CartInterface';
import { OrderEntity, ORDER_STATUS } from '../Order/OrderInterface';
import { getItemsForCart, getCartEntities, getCartTotal } from '../common/helpers/cartHelper';
import Cart from './CartModel';

export class CartRepository {
  static async getCartByUserId(userId: string): Promise<CartForResponse | undefined> {
    const response = await Cart.findOne({userId});
    if (response) {
      return getCartEntities(response);
    }
    return undefined;
  }

  static async createCart(userId: string): Promise<CartForResponse> {
    const newCart = new Cart({
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    });
    const response = await newCart.save();
    return getCartEntities(response);
  }

  static async updateCart(userId: string, product: CartItemEntity): Promise<boolean> {
    try {
      const response = await Cart.updateOne({ userId }, {$set: {items: [product]}});
      const { acknowledged, modifiedCount } = response;
      if (acknowledged && modifiedCount === 1) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  static async deleteCart(userId: string): Promise<Boolean> {
    const response = await Cart.deleteOne({userId});
    const { acknowledged, deletedCount } = response;
    if (acknowledged && deletedCount === 1) {
      return true;
    }
    return false;
  }

  static async getOrder(userId: string): Promise<OrderEntity | undefined> {
    const cart = await Cart.findOne({userId});
    if (cart && !cart.isDeleted) {
      const newOrder: OrderEntity = {
        id: uuidv4(),
        userId: cart.userId,
        cartId: cart.id,
        items: cart.items.map(getItemsForCart),
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
    return;
  }
}
