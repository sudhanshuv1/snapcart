"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const handleAdd = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addToCart, product, isAuthenticated, router]);

  const handleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [wishlisted, addToWishlist, removeFromWishlist, product, isAuthenticated, router]);

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlist();
            }}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className={`h-5 w-5 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-gray-900 mt-auto">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleAdd}
          disabled={added}
          className={`w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
            added
              ? "bg-green-500 text-white cursor-default"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {added ? "Added \u2713" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
