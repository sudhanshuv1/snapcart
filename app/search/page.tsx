"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ProductFilters, { ProductFiltersState } from "@/components/ProductFilters";
import { apiGet } from "@/lib/api";

const DEFAULT_CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Books"];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "All";
  const category = DEFAULT_CATEGORIES.includes(categoryParam) ? categoryParam : "All";

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<ProductFiltersState>({
    category,
    priceMin: 0,
    priceMax: 0,
    minRating: 0,
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    async function search() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("q", query);
        if (category !== "All") params.set("category", category);

        const data = await apiGet<{ products: Product[] }>(`/api/products?${params.toString()}`);
        setResults(data.products);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    setFilters((prev) => ({ ...prev, category, priceMin: 0, priceMax: 0 }));
    search();
  }, [category, query]);

  const priceBounds = useMemo(() => {
    if (results.length === 0) return { min: 0, max: 0 };
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const p of results) {
      min = Math.min(min, p.price);
      max = Math.max(max, p.price);
    }
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [results]);

  useEffect(() => {
    if (results.length === 0) return;
    setFilters((prev) => {
      const nextMin = prev.priceMin === 0 ? priceBounds.min : Math.max(priceBounds.min, prev.priceMin);
      const nextMax = prev.priceMax === 0 ? priceBounds.max : Math.min(priceBounds.max, prev.priceMax);
      return {
        ...prev,
        priceMin: Math.min(nextMin, nextMax),
        priceMax: Math.max(nextMin, nextMax),
      };
    });
  }, [priceBounds.max, priceBounds.min, results.length]);

  const shownResults = useMemo(() => {
    if (loading) return [] as Product[];
    const effectiveMin = filters.priceMin === 0 ? priceBounds.min : filters.priceMin;
    const effectiveMax = filters.priceMax === 0 ? priceBounds.max : filters.priceMax;
    return results.filter((p) => {
      const priceOk = p.price >= effectiveMin && p.price <= effectiveMax;
      const ratingOk = filters.minRating === 0 ? true : (p.avgRating ?? 0) >= filters.minRating;
      return priceOk && ratingOk;
    });
  }, [filters.minRating, filters.priceMax, filters.priceMin, loading, priceBounds.max, priceBounds.min, results]);

  function pushCategory(nextCategory: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory === "All") params.delete("category");
    else params.set("category", nextCategory);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  }

  function handleFiltersChange(next: ProductFiltersState) {
    if (next.category !== filters.category) {
      pushCategory(next.category);
      return;
    }
    setFilters(next);
  }

  function handleReset() {
    pushCategory("All");
    setFilters({ category: "All", priceMin: priceBounds.min, priceMax: priceBounds.max, minRating: 0 });
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      {query.trim() ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Search Results
            </h1>
            {!loading && (
              <p className="text-sm text-gray-500">
                {shownResults.length} {shownResults.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
            <aside className="lg:sticky lg:top-20">
              <ProductFilters
                categories={DEFAULT_CATEGORIES}
                state={{
                  ...filters,
                  priceMin: filters.priceMin === 0 ? priceBounds.min : filters.priceMin,
                  priceMax: filters.priceMax === 0 ? priceBounds.max : filters.priceMax,
                }}
                priceBounds={priceBounds}
                counts={!loading ? { total: results.length, shown: shownResults.length } : undefined}
                onChange={handleFiltersChange}
                onReset={handleReset}
              />
            </aside>

            <section>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : shownResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                  {shownResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-10 text-center">
                  <h2 className="text-lg font-semibold text-gray-900">No matches</h2>
                  <p className="text-sm text-gray-500 mt-2">Try widening your filters.</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-950 transition-colors"
                  >
                    Reset filters
                  </button>

                  <div className="mt-8">
                    <Link
                      href="/"
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      Browse All Products
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Products</h1>
          <p className="text-gray-500">Use the search bar above to find products.</p>
        </div>
      )}
    </div>
  );
}
