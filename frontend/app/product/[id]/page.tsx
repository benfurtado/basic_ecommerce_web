'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product } from '@/types';
import { useCartStore } from '@/store';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { productsAPI } from '@/lib/api';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('20kg');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const addItem = useCartStore((state) => state.addItem);

  // Fetch product and related products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, allProducts] = await Promise.all([
          productsAPI.getById(productId),
          productsAPI.getAll(),
        ]);
        setProduct(productData);
        // Get related products (exclude current product)
        setRelatedProducts(allProducts.filter(p => p.id !== productId).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      price: Number(product.price),
    });
  };

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  const originalPrice = (Number(product.price) * 1.03).toFixed(2);
  const sizeOptions = ['20kg', '60kg', '120kg', '200kg'];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Product Category */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Category</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-gray-600 hover:text-red-600 cursor-pointer">
                  <span>Juice & Drinks</span>
                  <span className="text-gray-400">[20]</span>
                </li>
                <li className="flex items-center justify-between text-gray-600 hover:text-red-600 cursor-pointer">
                  <span>Dairy & Milk</span>
                  <span className="text-gray-400">[54]</span>
                </li>
                <li className="flex items-center justify-between text-gray-600 hover:text-red-600 cursor-pointer">
                  <span>Snack & Spice</span>
                  <span className="text-gray-400">[64]</span>
                </li>
              </ul>
            </div>

            {/* Filter By Price */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filter By Price</h3>
              <div className="mb-4">
                <input
                  type="range"
                  min="20"
                  max="250"
                  defaultValue="20"
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$20</span>
                  <span>$250</span>
                </div>
              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Filter
              </button>
            </div>

            {/* Products Tags */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Products Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Vegetables', 'Juice', 'Food', 'Dry Fruits', 'Snacks'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-red-600 hover:text-white transition-colors text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Product Details */}
          <div className="lg:col-span-3">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Short Description */}
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minus error doloribus saepe natus?
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-red-600">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">(75 Review)</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Image */}
              <div className="relative h-96 bg-white rounded-lg border border-gray-200 p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <div>
                {/* Product Specifications */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Product Specifications</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand:</span>
                      <span className="text-gray-900 font-medium">ESTA BETTERU CO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flavour:</span>
                      <span className="text-gray-900 font-medium">Super Saver Pack</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diet Type:</span>
                      <span className="text-gray-900 font-medium">Vegetarian</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="text-gray-900 font-medium">200 Grams</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speciality:</span>
                      <span className="text-gray-900 font-medium">Gluten Free, Sugar Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Info:</span>
                      <span className="text-gray-900 font-medium">Egg Free, Allergen-Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="text-gray-900 font-medium">1</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-bold text-3xl">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-lg line-through">
                      ${originalPrice}
                    </span>
                  </div>
                </div>

                {/* Size Options */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Size/Weight:</h4>
                  <div className="flex gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border-2 transition-colors ${
                          selectedSize === size
                            ? 'border-red-600 bg-red-50 text-red-600'
                            : 'border-gray-300 text-gray-700 hover:border-red-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-0 focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Information Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200 mb-4">
                {['Description', 'Information', 'Review'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-red-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 text-gray-600">
                {activeTab === 'Description' && (
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                )}
                {activeTab === 'Information' && (
                  <p>Product information details...</p>
                )}
                {activeTab === 'Review' && (
                  <p>Customer reviews...</p>
                )}
              </div>
            </div>

            {/* Packaging & Delivery */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Packaging & Delivery</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Products Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Products</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                badge={index % 4 === 0 ? 'Hot' : index % 4 === 1 ? 'Sale' : index % 4 === 2 ? 'New' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-lg z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

