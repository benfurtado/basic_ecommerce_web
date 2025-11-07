'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store';
import Image from 'next/image';

interface DailyBestSellCardProps {
  product: Product;
  badge?: string;
  badgeColor?: string;
}

export default function DailyBestSellCard({ product, badge, badgeColor = 'bg-green-500' }: DailyBestSellCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: Number(product.price),
    });
  };

  // Calculate original price (3% more for discount display)
  const originalPrice = (Number(product.price) * 1.03).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Badge - Top Left with pointed right edge */}
      {badge && (
        <div className={`absolute top-3 left-0 ${badgeColor} text-white px-3 py-1 text-xs font-semibold z-10`} style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)' }}>
          {badge}
        </div>
      )}

      {/* Navigation Arrow - Left side */}
      <button className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-gray-200 bg-opacity-80 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Product Image Section */}
      <div className="relative h-48 w-full bg-white flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Information Section */}
      <div className="p-4">
        {/* Brand Name */}
        <p className="text-gray-400 text-xs mb-1">Hodo Foods</p>
        
        {/* Product Title */}
        <h3 className="text-gray-900 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-400 text-xs">(4.0)</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-600 font-bold text-lg">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ${originalPrice}
          </span>
        </div>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

