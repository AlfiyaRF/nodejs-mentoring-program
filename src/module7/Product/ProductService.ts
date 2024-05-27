import { ProductEntity, NewProductEntity } from './ProductInterface';
import { ProductRepository } from './ProductRepository';

export class ProductService {
  static getAllProducts(): Promise<ProductEntity[]> {
    return ProductRepository.getAllProducts();
  }

  static createProduct(product: NewProductEntity): Promise<ProductEntity> {
    return ProductRepository.createProducts(product);
  }

  static getProductById(id: string): Promise<ProductEntity | undefined> {
    return ProductRepository.getProductById(id);
  }
}
