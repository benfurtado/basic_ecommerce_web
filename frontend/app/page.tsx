'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import DealCard from '@/components/DealCard';
import DailyBestSellCard from '@/components/DailyBestSellCard';
import { useCartStore } from '@/store';
import Image from 'next/image';

function HomePageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addItem = useCartStore((state) => state.addItem);
  const orderSuccess = searchParams.get('order');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', 'Milks & Dairies', 'Coffes & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {orderSuccess === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Order placed successfully! Check your email for confirmation.
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gray-100 relative overflow-hidden py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                100% Organic Vegetables
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                The best way to stuff your wallet.
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis beatae consequuntur.
              </p>
              {/* Email Subscription */}
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                  alt="Fresh vegetables"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-amber-50 rounded-lg p-6 flex items-center justify-between relative overflow-hidden">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Everyday Fresh & Clean with Our Products.
                </h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="relative w-32 h-32">
                <Image
                  src="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=300"
                  alt="Onions"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-pink-50 rounded-lg p-6 flex items-center justify-between relative overflow-hidden">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Make your Breakfast Healthy and Easy.
                </h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="relative w-32 h-32">
                <Image
                  src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300"
                  alt="Juice and strawberries"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between relative overflow-hidden">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  The best Organic Products Online.
                </h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="relative w-32 h-32">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300"
                  alt="Vegetable basket"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Popular Products</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} badge={index % 4 === 0 ? 'Hot' : index % 4 === 1 ? 'Sale' : index % 4 === 2 ? 'New' : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Daily Best Sells Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Daily Best Sells</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Promotional Banner */}
            <div className="lg:col-span-1 relative h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800"
                alt="Bring nature into your home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8">
                <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Bring nature into your home
                </h3>
                <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors font-semibold">
                  Shop Now+
                </button>
              </div>
            </div>

            {/* Product Listings */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product, index) => {
                const badges = ['Save 35%', 'Sale', 'Best sale', 'Save 15%'];
                const badgeColors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500'];
                return (
                  <DailyBestSellCard
                    key={product.id}
                    product={product}
                    badge={badges[index]}
                    badgeColor={badgeColors[index]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deals Of The Day Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Deals Of The Day</h2>
            <Link href="/" className="text-red-600 hover:text-red-700 font-medium">
              All Deals &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <DealCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Promotional Banner */}
      <section className="py-16 bg-green-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Stay home & get your daily needs from our shop
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Start You'r Daily Shopping with Nest Mart
              </p>
              <div className="flex gap-2 max-w-md">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800"
                alt="Delivery person"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="text-center">Loading...</div></div>}>
      <HomePageContent />
    </Suspense>
  );
}
