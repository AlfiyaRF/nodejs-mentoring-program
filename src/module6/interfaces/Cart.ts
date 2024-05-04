import { ProductEntity } from './Product';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
};

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
};

export interface CartResponse {
  cart: {
    id: string; // uuid
    items: CartItemEntity[];
  },
  total: number;
}
