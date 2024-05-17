export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
};

export interface ProductRequestEntity {
  productId: string; // uuid,
  count: number;
}

export interface ProductForCartEntity {
  product: ProductEntity | undefined;
  count: number;
}
