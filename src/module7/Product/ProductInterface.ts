export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
};

export interface NewProductEntity {
  title: string;
  description: string;
  price: number;
};

export interface ProductRequestEntity {
  productId: string;
  count: number;
}

export interface ProductForCartEntity {
  product: ProductEntity | undefined;
  count: number;
}
