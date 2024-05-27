import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity } from './CartInterface';
import { ProductSchema } from '../Product/ProductModel';

const CartItemSchema: Schema = new Schema<CartItemEntity>({
  product: {
    type: ProductSchema,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    unique: false,
  }
});

const CartSchema: Schema = new Schema<CartEntity>({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    unique: false,
  },
  items: {
    type: [CartItemSchema],
    required: false,
    unique: false,
  }
});

const Cart = model<CartEntity>('Cart', CartSchema);

export default Cart;
