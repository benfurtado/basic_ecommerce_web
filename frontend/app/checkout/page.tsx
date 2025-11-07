'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/store';
import { authAPI, ordersAPI } from '@/lib/api';
import { productsAPI } from '@/lib/api';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearCart = useCartStore((state) => state.clearCart);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'checkout'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  
  // Delivery and Payment
  const [deliveryMethod, setDeliveryMethod] = useState('free');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (user) {
      setStep('checkout');
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsAPI.getAll();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authAPI.sendOTP(email);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await authAPI.verifyOTP(email, otp);
      if (result.success) {
        setUser(result.user);
        setStep('checkout');
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;

    setLoading(true);
    setError('');
    try {
      await ordersAPI.create({
        userId: user.id,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotal(),
      });

      clearCart();
      router.push('/?order=success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const deliveryCharges = deliveryMethod === 'free' ? 0 : 5;
  const subTotal = getTotal();
  const totalAmount = subTotal + deliveryCharges;

  const itemsWithImages = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, image: product?.image };
  });

  return (
    <div className="min-h-screen bg-white py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left Column - Summary and Methods */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Summary Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sub-Total</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>${deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-semibold text-lg pt-3 border-t">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Product Listings */}
              <div className="space-y-3 md:space-y-4">
                {itemsWithImages.map((item) => (
                  <div key={item.productId} className="flex items-center gap-2 md:gap-4 p-2 md:p-3 bg-gray-50 rounded">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.png'}
                        alt={item.productName}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-xs md:text-sm mb-1 truncate">{item.productName}</h4>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-yellow-400">
                          {[...Array(3)].map((_, i) => (
                            <svg key={i} className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">3.5</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-green-600 font-semibold text-xs md:text-sm">${Number(item.price).toFixed(2)}</span>
                        <span className="text-gray-400 text-xs line-through">${(Number(item.price) * 1.025).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Method Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Delivery Method</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-4">Please select the preferred shipping method to use on this order.</p>
              <div className="space-y-3">
                <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 border border-gray-200 rounded cursor-pointer hover:border-red-600">
                  <input
                    type="radio"
                    name="delivery"
                    value="free"
                    checked={deliveryMethod === 'free'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-gray-900 text-sm md:text-base">Free Shipping</span>
                    <span className="text-gray-600 ml-1 md:ml-2 text-xs md:text-sm">(Rate - $0.00)</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 border border-gray-200 rounded cursor-pointer hover:border-red-600">
                  <input
                    type="radio"
                    name="delivery"
                    value="flat"
                    checked={deliveryMethod === 'flat'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-gray-900 text-sm md:text-base">Flat Rate</span>
                    <span className="text-gray-600 ml-1 md:ml-2 text-xs md:text-sm">(Rate - $5.00)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Payment Method</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-4">Please select the preferred payment method to use on this order.</p>
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 border border-gray-200 rounded cursor-pointer hover:border-red-600">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 flex-shrink-0"
                  />
                  <span className="font-medium text-gray-900 text-sm md:text-base">Cash On Delivery</span>
                </label>
                <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 border border-gray-200 rounded cursor-pointer hover:border-red-600">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 flex-shrink-0"
                  />
                  <span className="font-medium text-gray-900 text-sm md:text-base">UPI</span>
                </label>
                <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 border border-gray-200 rounded cursor-pointer hover:border-red-600">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 flex-shrink-0"
                  />
                  <span className="font-medium text-gray-900 text-sm md:text-base">Bank Transfer</span>
                </label>
              </div>

              {/* Payment Logos */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {['Visa', 'PayPal', 'Skrill', 'Maestro', 'Visa Electron'].map((method) => (
                    <div key={method} className="w-12 h-8 md:w-16 md:h-10 bg-gray-100 rounded flex items-center justify-center text-[10px] md:text-xs text-gray-600 font-medium">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer and Billing */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Customer Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Customer</h2>
              <p className="text-gray-600 text-xs md:text-sm mb-4">Checkout Options</p>
              
              {step === 'email' && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter your OTP"
                      required
                      maxLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </form>
              )}

              {step === 'checkout' && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Logged in as: {email}</p>
                  <button
                    onClick={() => {
                      setUser(null);
                      setStep('email');
                    }}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Change Account
                  </button>
                </div>
              )}
            </div>

            {/* Billing Details Section */}
            {step === 'checkout' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Billing Details</h2>
                <p className="text-gray-600 text-xs md:text-sm mb-4">Checkout Options</p>
                
                <div className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address Line 1"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  {/* City and Post Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">City</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Post Code</label>
                      <input
                        type="text"
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        placeholder="Post Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Country and Region */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Country</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Region State</label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Region/State</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                        <option value="Florida">Florida</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Place Order Button */}
        {step === 'checkout' && (
          <div className="mt-6 md:mt-8 flex justify-end">
            <button
              onClick={handlePlaceOrder}
              disabled={loading || !firstName || !lastName || !address}
              className="w-full sm:w-auto bg-red-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm md:text-base"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
