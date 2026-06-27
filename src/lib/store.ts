"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ViewKey, Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  length?: number;
}

export interface FilterState {
  category: string | null;
  fabric: string[];
  color: string[];
  occasion: string[];
  season: string[];
  gender: string[];
  priceMin: number;
  priceMax: number;
  inStock: boolean;
  sortBy: "popular" | "newest" | "price-low" | "price-high" | "rating";
  search: string;
}

interface StoreState {
  // Routing
  view: ViewKey;
  selectedProductId: string | null;
  selectedCategorySlug: string | null;
  breadcrumb: string[];
  goHome: () => void;
  goToProduct: (id: string) => void;
  goToCategory: (slug: string) => void;
  goTo: (view: ViewKey) => void;

  // UI overlays
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setWishlistOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, qty?: number, length?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Recently viewed
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  // Compare
  compare: string[];
  toggleCompare: (productId: string) => void;

  // Filters
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Loading
  isPageLoading: boolean;
  setPageLoading: (v: boolean) => void;

  // Toast/notifications
  notifications: { id: string; type: "success" | "info" | "error"; message: string }[];
  notify: (type: "success" | "info" | "error", message: string) => void;
  dismissNotification: (id: string) => void;

  // Theme
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  language: "en" | "hi";
  setLanguage: (l: "en" | "hi") => void;

  // Auth (mock)
  user: { name: string; email: string } | null;
  login: (email: string) => void;
  logout: () => void;

  // Coupon
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const defaultFilters: FilterState = {
  category: null,
  fabric: [],
  color: [],
  occasion: [],
  season: [],
  gender: [],
  priceMin: 0,
  priceMax: 5000,
  inStock: false,
  sortBy: "popular",
  search: "",
};

const COUPONS: Record<string, number> = {
  DIWALI40: 0.4,
  WEDDING25: 0.25,
  WELCOME500: 0,
  BULK35: 0.35,
  HATHRAS10: 0.1,
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Routing
      view: "home",
      selectedProductId: null,
      selectedCategorySlug: null,
      breadcrumb: ["Home"],
      goHome: () =>
        set({ view: "home", selectedProductId: null, selectedCategorySlug: null, breadcrumb: ["Home"], isPageLoading: true }),
      goToProduct: (id) =>
        set({
          view: "product",
          selectedProductId: id,
          breadcrumb: ["Home", "Shop", "Product"],
          isPageLoading: true,
          recentlyViewed: [id, ...get().recentlyViewed.filter((p) => p !== id)].slice(0, 8),
        }),
      goToCategory: (slug) =>
        set({
          view: "category",
          selectedCategorySlug: slug,
          breadcrumb: ["Home", "Categories", slug],
          isPageLoading: true,
          filters: { ...defaultFilters, category: slug },
        }),
      goTo: (view) =>
        set({ view, selectedProductId: null, isPageLoading: true, breadcrumb: ["Home", view] }),

      // UI overlays
      cartOpen: false,
      wishlistOpen: false,
      searchOpen: false,
      menuOpen: false,
      setCartOpen: (v) => set({ cartOpen: v }),
      setWishlistOpen: (v) => set({ wishlistOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      setMenuOpen: (v) => set({ menuOpen: v }),

      // Cart
      cart: [],
      addToCart: (product, qty = 1, length) => {
        set((state) => {
          const existing = state.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + qty, length: length ?? i.length }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: qty, length }] };
        });
        get().notify("success", `${product.name} added to cart`);
      },
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((i) => i.product.id !== productId) })),
      updateQty: (productId, qty) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),
      clearCart: () => set({ cart: [], appliedCoupon: null }),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: () => {
        const subtotal = get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const coupon = get().appliedCoupon;
        if (coupon) {
          if (coupon.code === "WELCOME500") return Math.max(0, subtotal - 500);
          return subtotal * (1 - coupon.discount);
        }
        return subtotal;
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const isWish = get().wishlist.includes(productId);
        set((state) => ({
          wishlist: isWish
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }));
        get().notify(isWish ? "info" : "success", isWish ? "Removed from wishlist" : "Added to wishlist");
      },
      isWishlisted: (productId) => get().wishlist.includes(productId),

      // Recently viewed
      recentlyViewed: [],
      addRecentlyViewed: (productId) =>
        set((state) => ({
          recentlyViewed: [productId, ...state.recentlyViewed.filter((p) => p !== productId)].slice(0, 8),
        })),

      // Compare
      compare: [],
      toggleCompare: (productId) =>
        set((state) => ({
          compare:
            state.compare.includes(productId)
              ? state.compare.filter((id) => id !== productId)
              : state.compare.length < 4
              ? [...state.compare, productId]
              : state.compare,
        })),

      // Filters
      filters: defaultFilters,
      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Loading
      isPageLoading: false,
      setPageLoading: (v) => set({ isPageLoading: v }),

      // Notifications
      notifications: [],
      notify: (type, message) => {
        const id = Math.random().toString(36).slice(2);
        set((state) => ({ notifications: [...state.notifications, { id, type, message }] }));
        setTimeout(() => {
          set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
        }, 3500);
      },
      dismissNotification: (id) =>
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),

      // Theme prefs
      currency: "INR",
      setCurrency: (c) => set({ currency: c }),
      language: "en",
      setLanguage: (l) => set({ language: l }),

      // Auth
      user: null,
      login: (email) => set({ user: { name: email.split("@")[0], email } }),
      logout: () => set({ user: null }),

      // Coupon
      appliedCoupon: null,
      applyCoupon: (code) => {
        const upper = code.toUpperCase();
        if (COUPONS[upper] !== undefined) {
          set({ appliedCoupon: { code: upper, discount: COUPONS[upper] } });
          get().notify("success", `Coupon ${upper} applied!`);
          return true;
        }
        get().notify("error", "Invalid coupon code");
        return false;
      },
      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    {
      name: "hathras-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        compare: state.compare,
        currency: state.currency,
        language: state.language,
        user: state.user,
      }),
    }
  )
);

// Helper to format price
export function formatPrice(amount: number, currency: "INR" | "USD" = "INR"): string {
  if (currency === "USD") {
    return `$${(amount / 83).toFixed(2)}`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}
