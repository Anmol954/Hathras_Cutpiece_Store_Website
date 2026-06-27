"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, ShoppingBag, Trash2, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { products as allProducts, categories as allCategories } from "@/lib/data";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    cartOpen, setCartOpen, cart, updateQty, removeFromCart, cartTotal,
    appliedCoupon, applyCoupon, removeCoupon, clearCart, currency, goTo,
  } = useStore();
  const [coupon, setCoupon] = React.useState("");
  const [checkingOut, setCheckingOut] = React.useState(false);

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discount = subtotal - cartTotal();
  const shipping = cartTotal() > 2000 || cartTotal() === 0 ? 0 : 99;

  const checkout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      clearCart();
      setCartOpen(false);
      toast.success("Order Placed! 🎉", {
        description: "Order #HC" + Math.floor(Math.random() * 90000 + 10000) + " confirmed. Track it from My Account.",
      });
    }, 2200);
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 py-4 border-b bg-gradient-to-r from-[var(--crimson-dark)] to-[var(--gold-dark)] text-white">
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({cart.length})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">Discover our premium fabrics and start your luxury journey.</p>
            </div>
            <Button
              onClick={() => { setCartOpen(false); goTo("shop"); }}
              className="btn-luxe"
            >
              Explore Collection <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-3 p-3 rounded-xl bg-accent/50"
                >
                  <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium line-clamp-2">{item.product.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.product.fabric} · {item.product.color}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-card rounded-full border">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-accent"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-accent"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-red-500 flex items-center justify-center gap-1 py-2"
              >
                <Trash2 className="w-3 h-3" /> Clear cart
              </button>
            </div>

            {/* Coupon */}
            <div className="px-4 py-3 border-t bg-accent/30">
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-green-600">
                    <Tag className="w-4 h-4" /> Coupon {appliedCoupon.code} applied
                  </span>
                  <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code (try DIWALI40)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { if (applyCoupon(coupon)) setCoupon(""); }}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            {/* Summary */}
            <SheetFooter className="border-t">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>−{formatPrice(discount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping, currency)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="gradient-text-crimson">{formatPrice(cartTotal() + shipping, currency)}</span>
                </div>
              </div>
              <Button
                onClick={checkout}
                disabled={checkingOut}
                className="btn-luxe w-full"
              >
                {checkingOut ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Secure Checkout
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" /> Razorpay-secured · UPI · Cards · COD
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart, goTo, goToProduct, currency } = useStore();
  const items = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 py-4 border-b bg-gradient-to-r from-[var(--gold-dark)] to-[var(--crimson)] text-white">
          <SheetTitle className="text-white">My Wishlist ({items.length})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl">💝</div>
            <div>
              <h3 className="font-display text-lg font-semibold">No favourites yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Tap the heart icon on any product to save it here.</p>
            </div>
            <Button onClick={() => { setWishlistOpen(false); goTo("shop"); }} className="btn-gold">
              Discover Fabrics
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-3 p-3 rounded-xl bg-accent/50"
              >
                <div
                  className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-muted cursor-pointer"
                  onClick={() => { setWishlistOpen(false); goToProduct(product.id); }}
                >
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
                    <button onClick={() => toggleWishlist(product.id)} className="text-red-500 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{product.fabric} · {product.color}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold">{formatPrice(product.price, currency)}</span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product, 1)}
                      className="btn-luxe h-8 text-xs"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, goToProduct, goTo, goToCategory } = useStore();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [searchOpen]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    ).slice(0, 8);
  }, [query]);

  const matchedCats = React.useMemo(() => {
    if (!query.trim()) return [];
    return allCategories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  }, [query]);

  const recentSearches = ["Banarasi Silk", "Cotton Suit", "Wedding Red", "Linen Shirt"];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fabrics, categories, colors..."
                className="flex-1 bg-transparent text-base focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query) {
                    setSearchOpen(false);
                    goTo("shop");
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 rounded-full hover:bg-accent">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!query && (
                <div className="p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recent</div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-full bg-accent text-sm hover:bg-accent/80"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedCats.length > 0 && (
                <div className="p-2">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-1">Categories</div>
                  {matchedCats.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => { setSearchOpen(false); goToCategory(c.slug); }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent text-left"
                    >
                      <img src={c.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.count} items</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && matchedCats.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="text-3xl mb-2">🔍</div>
                  No results for "{query}". Try a different keyword.
                </div>
              )}

              {results.length > 0 && (
                <div className="p-2">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-1">Products</div>
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setSearchOpen(false); goToProduct(p.id); }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent text-left"
                    >
                      <img src={p.images[0]} alt="" className="w-12 h-14 rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.fabric} · {p.color}</div>
                      </div>
                      <div className="text-sm font-bold">₹{p.price}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
