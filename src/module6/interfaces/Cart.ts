import { ProductEntity } from './Product';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
};

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
};

export interface CartData {
  id: string;
  items: CartItemEntity[];
}

export interface CartResponse {
  cart: {
    id: string;
    items: CartItemEntity[];
  },
  total: number;
}
