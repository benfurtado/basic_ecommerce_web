'use client';

import { useCartStore } from '@/store';
import Link from 'next/link';
import CartItem from '@/components/CartItem';
import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const itemsWithImages = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, image: product?.image };
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {itemsWithImages.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${getTotal().toFixed(2)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

