import axios from 'axios';
import { Product, Order } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  sendOTP: async (email: string) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  },
  verifyOTP: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },
  getUser: async (email: string) => {
    const response = await api.get(`/auth/user/${email}`);
    return response.data;
  },
};

export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const ordersAPI = {
  create: async (orderData: {
    userId: number;
    items: Array<{
      productId: number;
      productName: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
  }): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getUserOrders: async (userId: number): Promise<Order[]> => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },
};

