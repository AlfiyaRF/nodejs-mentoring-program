import { ProductEntity } from '../interfaces/Product';
import { products } from '../models/productData';

export class ProductRepository {
  static getAllProducts(): ProductEntity[] {
    return products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }));
  }

  static getProductById(id: string): ProductEntity | undefined {
    const products = ProductRepository.getAllProducts();
    const product = products.find(product => product.id === id);
    return product;
  }
}
