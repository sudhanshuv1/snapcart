import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/?category=Electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/?category=Clothing" className="hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/?category=Home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?category=Books" className="hover:text-white transition-colors">
                  Books
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Your Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Your Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/help?tab=returns" className="hover:text-white transition-colors">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/help?tab=shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          &copy; 2026 ShopClone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
