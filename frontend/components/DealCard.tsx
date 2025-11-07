'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store';
import Image from 'next/image';

interface DealCardProps {
  product: Product;
}

export default function DealCard({ product }: DealCardProps) {
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
  const originalPrice = (Number(product.price) * 1.1).toFixed(2);

  return (
    <div className="relative rounded-lg overflow-hidden h-96">
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 h-3/4 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
      </div>

      {/* White Content Box Overlaid on Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-white rounded-2xl p-4">
          {/* Product Name */}
          <h3 className="text-gray-900 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 text-xs">(4.0)</span>
          </div>
          
          {/* Brand/Seller */}
          <p className="text-green-500 text-xs mb-3">
            By NestFood
          </p>

          {/* Price and Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-gray-400 text-sm line-through">
                ${originalPrice}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

