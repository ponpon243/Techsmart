import { OrderItem } from './order-item';

export interface Order {
  id?: number;
  customerId?: number;
  customerName?: string;
  dateOrdered?: Date | string;
  dateUpdated?: Date | string;
  orderStatus?: string;
  items?: OrderItem[];
  totalAmount?: number;
}
