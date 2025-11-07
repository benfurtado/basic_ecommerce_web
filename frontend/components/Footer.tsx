'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Value Propositions Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Best prices & offers */}
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Best prices & offers</h4>
                <p className="text-sm text-gray-600">Orders $50 or more</p>
              </div>
            </div>

            {/* Free delivery */}
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Free delivery</h4>
                <p className="text-sm text-gray-600">24/7 amazing services</p>
              </div>
            </div>

            {/* Great daily deal */}
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Great daily deal</h4>
                <p className="text-sm text-gray-600">When you sign up</p>
              </div>
            </div>

            {/* Wide assortment */}
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Wide assortment</h4>
                <p className="text-sm text-gray-600">Mega Discounts</p>
              </div>
            </div>

            {/* Easy returns */}
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Easy returns</h4>
                <p className="text-sm text-gray-600">Within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Foodzy Branding & Contact */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-brown-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 01.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Foodzy</h3>
                <p className="text-xs text-gray-500">A Treasure of Tastes</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              FoodTrove is the biggest market of grocery products. Get your daily needs from our store.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-gray-600">
                  51 Green St.Huntington chalo beach ontario, NY 11746 KY 4783, USA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600">example@email.com</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-sm text-gray-600">+81 123 4567890</p>
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Delivery information
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Category Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Category</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/dairy" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Dairy & Bakery
                </Link>
              </li>
              <li>
                <Link href="/category/fruits" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Fruits & Vegetable
                </Link>
              </li>
              <li>
                <Link href="/category/snacks" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Snack & Spice
                </Link>
              </li>
              <li>
                <Link href="/category/drinks" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Juice & Drinks
                </Link>
              </li>
              <li>
                <Link href="/category/meat" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Chicken & Meat
                </Link>
              </li>
              <li>
                <Link href="/category/fastfood" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Fast Food
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Subscribe Our Newsletter</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Search here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.624 0 12-5.373 12-12S18.624 0 12 0z" />
                </svg>
              </a>
            </div>

            {/* Product Images */}
            <div className="grid grid-cols-5 gap-2">
              <div className="relative h-16 w-full rounded overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-2c027eb42e0c?w=100"
                  alt="Product 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-16 w-full rounded overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100"
                  alt="Product 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-16 w-full rounded overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=100"
                  alt="Product 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-16 w-full rounded overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100"
                  alt="Product 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-16 w-full rounded overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100"
                  alt="Product 5"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 <span className="text-green-600 font-semibold">foodzy</span>, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

