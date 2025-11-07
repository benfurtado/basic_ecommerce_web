'use client';

import { useCartStore } from '@/store';
import { Product } from '@/types';
import Image from 'next/image';

export default function CartItem({ item }: { item: any }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="relative w-20 h-20">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.productName}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.productName}</h3>
        <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <div className="text-lg font-semibold w-24 text-right">
        ${(Number(item.price) * item.quantity).toFixed(2)}
      </div>
      <button
        onClick={() => removeItem(item.productId)}
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  );
}

