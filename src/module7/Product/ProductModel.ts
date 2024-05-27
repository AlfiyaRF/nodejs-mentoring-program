import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from './ProductInterface';

export const ProductSchema: Schema = new Schema<ProductEntity>({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  }
});

const Product = model<ProductEntity>('Product', ProductSchema);

export default Product;
