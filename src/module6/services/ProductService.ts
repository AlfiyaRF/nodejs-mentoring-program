import { ProductEntity } from '../interfaces/Product';
import { products } from '../models/productData';

export class ProductService {
  static getAllProducts(): ProductEntity[] {
    return products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }));
  }

  static getProductById(productId: string): ProductEntity | undefined {
    const products = ProductService.getAllProducts();
    const product = products.find(product => product.id === productId);
    return product;
  }
}