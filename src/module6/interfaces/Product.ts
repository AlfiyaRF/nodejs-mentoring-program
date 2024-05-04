export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
};

export interface ProductRequest {
  productId: string; // uuid,
  count: number;
}
