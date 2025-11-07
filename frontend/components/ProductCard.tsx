'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  badge?: 'Hot' | 'Sale' | 'New';
}

export default function ProductCard({ product, badge }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: Number(product.price),
    });
  };

  const getBadgeStyle = () => {
    switch (badge) {
      case 'Hot':
        return 'bg-[#FF577F]';
      case 'Sale':
        return 'bg-blue-500';
      case 'New':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  // Calculate original price (3% more for discount display)
  const originalPrice = (Number(product.price) * 1.03).toFixed(2);

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Image Section */}
        <div className="relative h-64 w-full bg-white">
          {badge && (
            <div className={`absolute top-3 left-3 ${getBadgeStyle()} text-white px-3 py-1 rounded-tl-lg rounded-br-lg text-xs font-semibold z-10`}>
              {badge}
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Product Information Section */}
        <div className="p-4">
          {/* Category */}
          <p className="text-gray-400 text-xs mb-1">Snack</p>
          
          {/* Product Name */}
          <h3 className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 text-xs">(4.0)</span>
          </div>
          
          {/* Seller/Brand */}
          <p className="text-gray-600 text-xs mb-3">
            By <span className="text-[#FF6B6B]">NestFood</span>
          </p>

          {/* Price and Add to Cart Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#28B585] font-bold text-lg">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-[#A0A0A0] text-sm line-through">
                ${originalPrice}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#FF5757] text-white px-4 py-2 rounded-lg hover:bg-[#FF4444] transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
