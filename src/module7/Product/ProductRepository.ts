import { v4 as uuidv4 } from 'uuid';
import { ProductEntity, NewProductEntity } from './ProductInterface';
import { getProductEntities} from '../common/helpers/productHelper';
import Product from './ProductModel';

export class ProductRepository {
  static async getAllProducts(): Promise<ProductEntity[]> {
    const response = await Product.find();
    const users = response.map(getProductEntities);
    return users;
  };

  static async createProducts(product: NewProductEntity): Promise<ProductEntity> {
    const newProduct = new Product({
      id: uuidv4(),
      title: product.title,
      price: product.price,
      description: product.description
    });
    const response = await newProduct.save();
    return getProductEntities(response);
  };

  static async getProductById(id: string): Promise<ProductEntity | undefined> {
    const response = await Product.findOne({id});
    if (response) {
      return getProductEntities(response);
    }
    return undefined;
  }
}
