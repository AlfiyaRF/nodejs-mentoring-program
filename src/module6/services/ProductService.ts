import { ProductEntity } from '../interfaces/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  static getAllProducts(): ProductEntity[] {
    return ProductRepository.getAllProducts();
  }

  static getProductById(id: string): ProductEntity | undefined {
    return ProductRepository.getProductById(id);
  }
}
