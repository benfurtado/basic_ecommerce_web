'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null;
  }

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname.startsWith('/product/')) return 'Product';
    if (pathname === '/cart') return 'Cart';
    if (pathname === '/checkout') return 'Checkout';
    if (pathname === '/login') return 'Login';
    return 'Page';
  };

  const getBreadcrumbPath = () => {
    if (pathname.startsWith('/product/')) return 'Home - Product';
    if (pathname === '/cart') return 'Home - Cart';
    if (pathname === '/checkout') return 'Home - Checkout';
    if (pathname === '/login') return 'Home - Login';
    return 'Home';
  };

  return (
    <>
      {/* Thin white strip */}
      <div className="h-px bg-white"></div>
      {/* Thin blue strip with gradient */}
      <div className="h-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
      {/* Red banner */}
      <div className="bg-red-600 text-white py-3 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="font-semibold text-base">{getPageTitle()}</span>
          <div className="text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            {pathname !== '/' && (
              <>
                {' - '}
                <span>{getPageTitle()}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

