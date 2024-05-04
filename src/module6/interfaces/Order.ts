import { CartItemEntity } from './Cart';

export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
};

export interface OrderEntity {
  id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
};
