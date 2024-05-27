import { ProductEntity } from '../../Product/ProductInterface';

export const getProductEntities = (product: ProductEntity): ProductEntity => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price
  }
}
