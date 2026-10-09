export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  uom: string;
  availableStocks: number;
  image?: string;
  imageUrl?: string;
  status: string;
}
