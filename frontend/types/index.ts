export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  email: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

