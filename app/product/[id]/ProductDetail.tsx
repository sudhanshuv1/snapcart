"use client";

import { useState, useCallback, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import Toast from "@/components/Toast";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const px = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${px} ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

function ClickableStarRating({ rating, onRate }: { rating: number; onRate: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onRate(star)} className="p-0.5">
          <svg
            className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            fill={star <= rating ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, placeOrder, addToWishlist, removeFromWishlist, isInWishlist, getProductReviews, addReview, fetchProductReviews } = useApp();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [added, setAdded] = useState(false);

  // Fetch reviews from API when product loads
  useEffect(() => {
    fetchProductReviews(product.id);
  }, [product.id, fetchProductReviews]);

  const wishlisted = isInWishlist(product.id);
  const productReviews = getProductReviews(product.id);
  const avgRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    addToCart(product, quantity);
    setToastMessage(`Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart`);
    setToastVisible(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addToCart, product, quantity, isAuthenticated, router]);

  const handleBuyNow = useCallback(async () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    const items = [{ product, quantity }];
    const total = product.price * quantity;
    try {
      await placeOrder(items, total);
      router.push("/orders");
    } catch {
      // Error handled in context
    }
  }, [product, quantity, placeOrder, router, isAuthenticated]);

  const handleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    if (wishlisted) {
      removeFromWishlist(product.id);
      setToastMessage("Removed from wishlist");
    } else {
      addToWishlist(product);
      setToastMessage("Added to wishlist");
    }
    setToastVisible(true);
  }, [wishlisted, addToWishlist, removeFromWishlist, product, isAuthenticated, router]);

  function handleReviewSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!reviewTitle.trim()) next.title = "Title is required";
    if (!reviewBody.trim()) next.body = "Review body is required";
    setReviewErrors(next);
    if (Object.keys(next).length > 0) return;

    addReview({
      productId: product.id,
      userName: user?.name ?? "Anonymous",
      rating: reviewRating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
    });
    setReviewTitle("");
    setReviewBody("");
    setReviewRating(5);
    setShowReviewForm(false);
    setToastMessage("Review submitted!");
    setToastVisible(true);
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 overflow-x-auto">
        <ol className="flex items-center gap-2 text-gray-500 whitespace-nowrap">
          <li>
            <Link href="/" className="hover:text-gray-900 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/?category=${product.category}`} className="hover:text-gray-900 hover:underline">
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 truncate max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Left — Product image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right — Product info */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>

          {/* Rating summary */}
          {productReviews.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({productReviews.length} {productReviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-green-700">In Stock</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <hr className="mb-6" />

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-5 py-2 text-center font-medium text-gray-900 min-w-[3rem] border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 sm:min-w-[140px] font-semibold py-3 px-6 rounded-lg transition-colors text-base ${
                added
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              }`}
            >
              {added ? "Added \u2713" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 sm:min-w-[140px] bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg transition-all text-base"
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlist}
              className={`w-full border font-medium py-3 px-6 rounded-lg transition-colors text-base flex items-center justify-center gap-2 ${
                wishlisted
                  ? "border-red-300 text-red-600 hover:bg-red-50"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`h-5 w-5 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlisted ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Extra info */}
          <div className="mt-8 space-y-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16 border-t border-gray-200 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Customer Reviews
            {productReviews.length > 0 && (
              <span className="text-base font-normal text-gray-500 ml-2">({productReviews.length})</span>
            )}
          </h2>
          {isAuthenticated && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review form */}
        {showReviewForm && (
          <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
                <ClickableStarRating rating={reviewRating} onRate={setReviewRating} />
              </div>
              <div>
                <label htmlFor="review-title" className="block text-sm font-medium text-gray-900 mb-1">
                  Title
                </label>
                <input
                  id="review-title"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => {
                    setReviewTitle(e.target.value);
                    if (reviewErrors.title) setReviewErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    reviewErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Summarize your experience"
                />
                {reviewErrors.title && (
                  <p className="text-xs text-red-600 mt-1">{reviewErrors.title}</p>
                )}
              </div>
              <div>
                <label htmlFor="review-body" className="block text-sm font-medium text-gray-900 mb-1">
                  Review
                </label>
                <textarea
                  id="review-body"
                  rows={4}
                  value={reviewBody}
                  onChange={(e) => {
                    setReviewBody(e.target.value);
                    if (reviewErrors.body) setReviewErrors((prev) => ({ ...prev, body: "" }));
                  }}
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y ${
                    reviewErrors.body ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="What did you like or dislike about this product?"
                />
                {reviewErrors.body && (
                  <p className="text-xs text-red-600 mt-1">{reviewErrors.body}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98] text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewErrors({});
                  }}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Review list */}
        {productReviews.length > 0 ? (
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm font-semibold text-gray-900">{review.title}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  By {review.userName} on {new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-3">No reviews yet. Be the first to review this product!</p>
            {!isAuthenticated && (
              <Link href="/signin" className="text-sm text-blue-600 hover:underline font-medium">
                Sign in to write a review
              </Link>
            )}
          </div>
        )}
      </section>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
