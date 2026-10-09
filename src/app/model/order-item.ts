export interface OrderItem {
  id?: number;
  orderId?: number;
  productId?: number;
  productName?: string;
  imageUrl?: string;
  quantity: number;
  uom?: string;
  price: number;
  status?: string;
}
