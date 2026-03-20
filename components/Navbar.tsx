"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

type NavLink = {
  label: string;
  href: string;
};

type ProductCategory = {
  title: string;
  icon: string;
  links: NavLink[];
};

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: "Shop by Category",
    icon: "🧭",
    links: [
      { label: "All Products", href: "/" },
      { label: "Electronics", href: "/?category=Electronics" },
      { label: "Clothing", href: "/?category=Clothing" },
      { label: "Home", href: "/?category=Home" },
      { label: "Books", href: "/?category=Books" },
    ],
  },
  {
    title: "Curations",
    icon: "✨",
    links: [
      { label: "Best Sellers", href: "/search?q=best%20sellers" },
      { label: "New Arrivals", href: "/search?q=new" },
      { label: "Gift Ideas", href: "/search?q=gift" },
      { label: "Under $50", href: "/search?q=under%2050" },
    ],
  },
  {
    title: "Collections",
    icon: "🧩",
    links: [
      { label: "For Work", href: "/search?q=work" },
      { label: "For Home", href: "/search?q=home" },
      { label: "For Travel", href: "/search?q=travel" },
      { label: "Essentials", href: "/search?q=essentials" },
    ],
  },
];

const POPULAR_SEARCHES = ["Headphones", "Sneakers", "Desk lamp", "Cookware", "Books"];
const RECENT_KEY = "shopclone_recent_searches_v1";

function getInitials(name?: string | null) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  const first = parts[0]?.[0] ?? "U";
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + second).toUpperCase();
}

function safeReadRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string").slice(0, 8);
  } catch {
    return [];
  }
}

function safeWriteRecent(items: string[]) {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, 8)));
  } catch {
    // ignore
  }
}

export default function Navbar() {
  const { cartCount } = useApp();
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const previousCartCountRef = useRef(cartCount);

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    // Keep recent searches small + de-duped (used by the search dropdown)
    setRecentSearches((prev) => {
      const next = [q, ...prev.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 8);
      safeWriteRecent(next);
      return next;
    });
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    desktopSearchInputRef.current?.blur();
    mobileSearchInputRef.current?.blur();
  }

  function blurSearchInputs() {
    desktopSearchInputRef.current?.blur();
    mobileSearchInputRef.current?.blur();
  }

  function scheduleSearchClose() {
    // Defer blur handling so clicks on suggestions can be processed
    window.setTimeout(() => {
      const active = document.activeElement;
      const inDesktop = !!(searchWrapRef.current && active && searchWrapRef.current.contains(active));
      const inMobile = !!(mobileSearchWrapRef.current && active && mobileSearchWrapRef.current.contains(active));
      if (inDesktop || inMobile) return;
      setIsSearchOpen(false);
    }, 0);
  }

  const suggestedSearches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const base = recentSearches.length > 0 ? recentSearches : POPULAR_SEARCHES;
    if (!q) return base.slice(0, 6);
    const filtered = base.filter((s) => s.toLowerCase().includes(q));
    const popularFallback = POPULAR_SEARCHES.filter((s) => s.toLowerCase().includes(q));
    return Array.from(new Set([...filtered, ...popularFallback])).slice(0, 6);
  }, [searchQuery, recentSearches]);

  useEffect(() => {
    // Hydrate recent searches for the dropdown
    setRecentSearches(safeReadRecent());
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Badge pop animation whenever cart count changes
    if (previousCartCountRef.current !== cartCount) {
      previousCartCountRef.current = cartCount;
      if (cartCount > 0) {
        setBadgeBump(false);
        const id = window.setTimeout(() => setBadgeBump(true), 10);
        const id2 = window.setTimeout(() => setBadgeBump(false), 480);
        return () => {
          window.clearTimeout(id);
          window.clearTimeout(id2);
        };
      }
    }
  }, [cartCount]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setIsSearchOpen(false);
      setIsProductsOpen(false);
      setIsUserMenuOpen(false);
      setIsMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;

      // Click-outside for user menu
      if (isUserMenuOpen && userMenuRef.current && target && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }

      // Click-outside for products mega menu (allows clicking elsewhere to close)
      // Note: we keep hover behavior too; this is a safety net.
      if (isProductsOpen) {
        const mega = document.getElementById("nav-products-mega");
        const trigger = document.getElementById("nav-products-trigger");
        if (target && mega && trigger && !mega.contains(target) && !trigger.contains(target)) {
          setIsProductsOpen(false);
        }
      }
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isProductsOpen, isUserMenuOpen]);

  useEffect(() => {
    // Prevent background scroll when the mobile menu is open
    if (!isMobileOpen) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [isMobileOpen]);

  function closeAllMenus() {
    setIsProductsOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileOpen(false);
    setIsMobileProductsOpen(false);
  }

  return (
    <>
      {/* Search overlay sits above page content but below the navbar (z-40 vs nav z-50). */}
      <div
        aria-hidden="true"
        className={
          isSearchOpen
            ? "fixed inset-0 z-40 bg-black/45 opacity-100 transition-opacity duration-200"
            : "pointer-events-none fixed inset-0 z-40 bg-black/45 opacity-0 transition-opacity duration-200"
        }
        onClick={() => {
          setIsSearchOpen(false);
          blurSearchInputs();
        }}
      />

      <header
        className={`${inter.className} sticky top-0 z-50 border-b border-black/5 backdrop-blur-xl transition-all duration-200 bg-gradient-to-b ${
          scrolled
            ? "from-white/95 via-white/90 to-slate-50/85 shadow-sm"
            : "from-white/80 via-white/70 to-slate-50/60"
        }`}
      >
        <div className="flex h-16 w-full items-center gap-3 px-4 sm:px-6 lg:px-8 2xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeAllMenus}
            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[15px] font-semibold tracking-tight text-gray-900 transition-colors duration-200 hover:text-gray-950"
            aria-label="SnapCart Home"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-black/10 bg-white/70 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
              <svg
                className="h-4 w-4 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 7h12l-1 14H7L6 7zm3 0a3 3 0 016 0"
                />
              </svg>
            </span>
            <span className="hidden sm:inline leading-none">
              Snap<span className="text-gray-500">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            <Link
              href="/"
              onClick={closeAllMenus}
              className="inline-flex items-center rounded-xl px-2.5 py-2 text-[13px] xl:text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Home
            </Link>

            {/* Products with Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                id="nav-products-trigger"
                type="button"
                className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-[13px] xl:text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                aria-haspopup="menu"
                aria-expanded={isProductsOpen}
                onFocus={() => setIsProductsOpen(true)}
                onClick={() => setIsProductsOpen((v) => !v)}
              >
                Products
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id="nav-products-mega"
                role="menu"
                aria-label="Products"
                className={
                  isProductsOpen
                    ? "pointer-events-auto absolute left-0 top-[calc(100%+0.65rem)] w-[min(44rem,calc(100vw-2rem))] origin-top translate-y-0 rounded-2xl border border-black/10 bg-white/80 p-4 lg:p-5 opacity-100 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                    : "pointer-events-none absolute left-0 top-[calc(100%+0.65rem)] w-[min(44rem,calc(100vw-2rem))] origin-top -translate-y-2 rounded-2xl border border-black/10 bg-white/80 p-4 lg:p-5 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                }
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <div key={cat.title} className="min-w-0">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-sm">{cat.icon}</span>
                        <p className="text-sm font-semibold text-gray-900">{cat.title}</p>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={closeAllMenus}
                              className="block rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-black/5 bg-white/60 px-4 py-3">
                  <p className="text-sm text-gray-600">
                    Explore curated picks and categories.
                  </p>
                  <Link
                    href="/"
                    onClick={closeAllMenus}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                  >
                    Browse all
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/search?q=deal"
              onClick={closeAllMenus}
              className="inline-flex items-center rounded-xl px-2.5 py-2 text-[13px] xl:text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Deals
            </Link>
            <Link
              href="/help"
              onClick={closeAllMenus}
              className="inline-flex items-center rounded-xl px-2.5 py-2 text-[13px] xl:text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/help?tab=contact"
              onClick={closeAllMenus}
              className="inline-flex items-center rounded-xl px-2.5 py-2 text-[13px] xl:text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div
              ref={searchWrapRef}
              className={`relative max-w-full transition-[width] duration-200 ease-in-out ${
                isSearchOpen ? "w-[20rem] xl:w-[28rem] 2xl:w-[36rem]" : "w-[14rem] xl:w-[20rem] 2xl:w-[26rem]"
              }`}
            >
              <form onSubmit={handleSearch} className="w-full">
                <div
                  className={`relative flex items-center rounded-xl border bg-white/70 px-3 py-2 shadow-sm backdrop-blur transition-all duration-200 ${
                    isSearchOpen
                      ? "border-gray-900/20 ring-2 ring-gray-900/10"
                      : "border-black/10"
                  }`}
                >
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <input
                    ref={desktopSearchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={scheduleSearchClose}
                    type="text"
                    placeholder="Search products…"
                    className={
                      "ml-2 w-full bg-transparent text-[15px] text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    }
                    aria-label="Search products"
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    className={
                      "ml-2 hidden rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900 sm:inline-flex"
                    }
                    title="Search"
                  >
                    Enter
                  </button>
                </div>
              </form>

              {/* Suggestions dropdown */}
              <div
                className={
                  isSearchOpen
                    ? "pointer-events-auto absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[60] translate-y-0 rounded-2xl border border-black/10 bg-white/85 opacity-100 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                    : "pointer-events-none absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[60] -translate-y-2 rounded-2xl border border-black/10 bg-white/85 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                }
                role="listbox"
                aria-label="Search suggestions"
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-xs font-medium text-gray-600">
                    {recentSearches.length > 0 ? "Recent" : "Popular"}
                  </p>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      className="text-xs font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setRecentSearches([]);
                        safeWriteRecent([]);
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <ul className="max-h-72 overflow-auto p-1">
                  {suggestedSearches.length === 0 ? (
                    <li className="px-3 py-3 text-sm text-gray-600">No suggestions.</li>
                  ) : (
                    suggestedSearches.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                          onMouseDown={(e) => {
                            // Prevent the input from losing focus before we navigate
                            e.preventDefault();
                          }}
                          onClick={() => {
                            setSearchQuery(s);
                            setIsSearchOpen(false);
                            router.push(`/search?q=${encodeURIComponent(s)}`);
                          }}
                        >
                          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="truncate">{s}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* Mobile: Search + Menu */}
            <button
              type="button"
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-black/10 bg-white/55 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-white/85 hover:text-gray-900 lg:hidden"
              title="Search"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileOpen(true);
                setIsMobileProductsOpen(false);
                window.setTimeout(() => mobileSearchInputRef.current?.focus(), 0);
              }}
            >
              <span className="sr-only">Search</span>
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={closeAllMenus}
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-black/10 bg-white/55 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-white/85 hover:text-gray-900"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={closeAllMenus}
              className="relative inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-black/10 bg-white/55 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-white/85 hover:text-gray-900"
              title="Cart"
              aria-label="Cart"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span
                  className={`absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gray-900 px-1 text-[11px] font-semibold text-white ${
                    badgeBump ? "animate-badge-pop" : ""
                  }`}
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth area */}
            {loading ? null : isAuthenticated ? (
              <div ref={userMenuRef} className="relative hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-2 py-1.5 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-white"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                    {getInitials(user?.name)}
                  </span>
                  <span className="hidden max-w-32 truncate sm:inline">{user?.name}</span>
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  role="menu"
                  aria-label="User menu"
                  className={
                    isUserMenuOpen
                      ? "pointer-events-auto absolute right-0 top-[calc(100%+0.6rem)] z-[60] min-w-48 translate-y-0 rounded-2xl border border-black/10 bg-white/90 p-2 opacity-100 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                      : "pointer-events-none absolute right-0 top-[calc(100%+0.6rem)] z-[60] min-w-48 -translate-y-2 rounded-2xl border border-black/10 bg-white/90 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                  }
                >
                  <Link
                    href="/orders"
                    onClick={closeAllMenus}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/account"
                    onClick={closeAllMenus}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/account"
                    onClick={closeAllMenus}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                  >
                    Settings
                  </Link>
                  <div className="my-1 h-px bg-black/5" />
                  <button
                    type="button"
                    onClick={() => {
                      closeAllMenus();
                      handleSignOut();
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/signin"
                  onClick={closeAllMenus}
                  className="rounded-lg border border-black/10 bg-white/40 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-white/70"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeAllMenus}
                  className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              type="button"
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-black/10 bg-white/55 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-white/85 hover:text-gray-900 lg:hidden"
              title={isMobileOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setIsMobileOpen((v) => !v);
                setIsSearchOpen(false);
              }}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={
            isMobileOpen
              ? "pointer-events-auto absolute left-0 right-0 top-full z-[55] max-h-[calc(100vh-4rem)] translate-y-0 overflow-y-auto overscroll-contain border-b border-black/10 bg-white/85 opacity-100 shadow-lg backdrop-blur-xl transition-all duration-200 ease-in-out"
              : "pointer-events-none absolute left-0 right-0 top-full z-[55] max-h-[calc(100vh-4rem)] -translate-y-2 overflow-y-auto border-b border-black/10 bg-white/85 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-200 ease-in-out"
          }
        >
          <div className="space-y-1 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {/* Mobile search lives in the menu panel (full functionality + overlay). */}
            <div ref={mobileSearchWrapRef} className="pb-2">
              <form onSubmit={handleSearch} className="w-full">
                <div
                  className={`relative flex items-center rounded-xl border bg-white/70 px-3 py-2 shadow-sm backdrop-blur transition-all duration-200 ${
                    isSearchOpen
                      ? "border-gray-900/20 ring-2 ring-gray-900/10"
                      : "border-black/10"
                  }`}
                >
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={mobileSearchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={scheduleSearchClose}
                    type="text"
                    placeholder="Search products…"
                    className="ml-2 w-full bg-transparent text-[15px] text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    aria-label="Search products"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="ml-2 inline-flex rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                    title="Search"
                  >
                    Go
                  </button>
                </div>
              </form>

              <div
                className={
                  isSearchOpen
                    ? "pointer-events-auto relative mt-2 translate-y-0 rounded-2xl border border-black/10 bg-white/85 opacity-100 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                    : "pointer-events-none relative mt-2 -translate-y-2 rounded-2xl border border-black/10 bg-white/85 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 ease-in-out"
                }
                role="listbox"
                aria-label="Search suggestions"
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-xs font-medium text-gray-600">
                    {recentSearches.length > 0 ? "Recent" : "Popular"}
                  </p>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      className="text-xs font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setRecentSearches([]);
                        safeWriteRecent([]);
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <ul className="max-h-56 overflow-auto p-1">
                  {suggestedSearches.length === 0 ? (
                    <li className="px-3 py-3 text-sm text-gray-600">No suggestions.</li>
                  ) : (
                    suggestedSearches.map((s) => (
                      <li key={`m-${s}`}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSearchQuery(s);
                            setIsSearchOpen(false);
                            router.push(`/search?q=${encodeURIComponent(s)}`);
                          }}
                        >
                          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="truncate">{s}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <Link
              href="/"
              onClick={closeAllMenus}
              className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Home
            </Link>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
              onClick={() => setIsMobileProductsOpen((v) => !v)}
              aria-expanded={isMobileProductsOpen}
            >
              <span>Products</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${isMobileProductsOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={
                isMobileProductsOpen
                  ? "grid grid-cols-2 gap-2 px-2 pb-2 pt-1"
                  : "hidden"
              }
            >
              {PRODUCT_CATEGORIES.flatMap((c) => c.links).slice(0, 8).map((l) => (
                <Link
                  key={`${l.href}-${l.label}`}
                  href={l.href}
                  onClick={closeAllMenus}
                  className="rounded-lg border border-black/5 bg-white/60 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              href="/search?q=deal"
              onClick={closeAllMenus}
              className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Deals
            </Link>
            <Link
              href="/help"
              onClick={closeAllMenus}
              className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/help?tab=contact"
              onClick={closeAllMenus}
              className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
            >
              Contact
            </Link>

            <div className="mt-2 h-px bg-black/5" />

            {loading ? null : isAuthenticated ? (
              <>
                <Link
                  href="/orders"
                  onClick={closeAllMenus}
                  className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                >
                  My Orders
                </Link>
                <Link
                  href="/account"
                  onClick={closeAllMenus}
                  className="flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeAllMenus();
                    handleSignOut();
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-black/5 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/signin"
                  onClick={closeAllMenus}
                  className="rounded-lg border border-black/10 bg-white/50 px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeAllMenus}
                  className="rounded-lg bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Component-scoped CSS: keyframes + a few semantic utility classes (keeps logic readable). */}
      <style jsx global>{`
        @keyframes badge-pop {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.18);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-badge-pop {
          animation: badge-pop 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </>
  );
}
