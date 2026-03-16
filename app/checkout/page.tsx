"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import RequireAuth from "@/components/RequireAuth";

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}

function CheckoutContent() {
  const { items, cartTotal, cartCount, placeOrder } = useApp();
  const { user } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Add some items before checking out.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  async function handlePlaceOrder() {
    setPlacing(true);
    try {
      const orderId = await placeOrder(items, cartTotal);
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch {
      setPlacing(false);
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-10">
        {/* Left — Form sections */}
        <div className="space-y-8">
          {/* Shipping address */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name ?? ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-gray-50"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={user?.address?.street ?? ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={user?.address?.city ?? ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={user?.address?.state ?? ""}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={user?.address?.zipCode ?? ""}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-gray-50"
                  />
                </div>
              </div>
            </div>
            {!user?.address?.street && (
              <p className="text-sm text-gray-500 mt-3">
                <Link href="/account" className="text-blue-600 hover:underline">
                  Add your shipping address
                </Link>{" "}
                in account settings.
              </p>
            )}
          </section>

          {/* Payment method */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Method
            </h2>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="flex-shrink-0 w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Visa ending in 1234
                </p>
                <p className="text-xs text-gray-500">Expires 12/2027</p>
              </div>
              <svg
                className="ml-auto w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </section>

          {/* Place order button — visible on mobile below the form, hidden on lg */}
          <div className="lg:hidden">
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all text-base disabled:opacity-60"
            >
              {placing ? "Processing..." : "Place Your Order"}
            </button>
          </div>
        </div>

        {/* Right — Order summary */}
        <div className="lg:self-start">
          <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <ul className="divide-y divide-gray-100 mb-4 max-h-72 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-3">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900 line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">Qty: {quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({cartCount})</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Order Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place order button — visible on lg, hidden on mobile */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="hidden lg:block w-full mt-6 bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all text-base disabled:opacity-60"
            >
              {placing ? "Processing..." : "Place Your Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
