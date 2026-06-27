"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Heart, ShoppingBag, Minus, Plus, Truck, RefreshCw, ShieldCheck,
  Check, ChevronRight, Home as HomeIcon, Share2, Ruler, MessageCircle,
  Award, Sparkles, Eye, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore, formatPrice } from "@/lib/store";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";
import { SectionHeader, Reveal } from "./shared";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductDetailView({ productId }: { productId: string }) {
  const {
    addToCart, toggleWishlist, isWishlisted, goHome, goTo, goToCategory,
    recentlyViewed, currency, setCartOpen,
  } = useStore();

  const product = products.find((p) => p.id === productId);
  const [activeImg, setActiveImg] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [zoom, setZoom] = React.useState(false);
  const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold">Product not found</h2>
          <Button onClick={goHome} className="mt-4">Back to Home</Button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const similar = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const recent = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as typeof products;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    toast.success("Proceeding to checkout...", { description: "Redirecting to secure Razorpay payment." });
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <button onClick={goHome} className="hover:text-foreground flex items-center gap-1">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => goToCategory(product.categorySlug)} className="hover:text-foreground">
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={zoom ? {
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: "scale(2)",
                  } : undefined}
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-[var(--gold-dark)] text-white">NEW</Badge>}
                {discount > 0 && <Badge className="bg-[var(--crimson)] text-white">-{discount}%</Badge>}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs flex items-center gap-1.5">
                <ZoomIn className="w-3 h-3" /> Hover to zoom
              </div>

              {/* Share */}
              <button
                onClick={() => toast.success("Link copied!", { description: "Share this product with friends." })}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    activeImg === i ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/30" : "border-border hover:border-[var(--gold)]/50"
                  )}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* 360 view promo */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { Icon: Eye, label: "360° View", action: () => toast.info("360° view", { description: "Interactive 360° view launching soon." }) },
                { Icon: MessageCircle, label: "Ask on WhatsApp", action: () => window.open("https://wa.me/919876543210") },
                { Icon: Ruler, label: "Fabric Calculator", action: () => toast.info("Fabric Calculator", { description: "How much fabric do you need? Calculator coming soon." }) },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-[var(--gold)] hover:bg-accent/50 transition-all text-xs"
                >
                  <item.Icon className="w-4 h-4 text-[var(--gold-dark)]" />
                  <span className="font-medium text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[var(--gold-dark)] font-medium">{product.brand}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{product.origin}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground/40"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold gradient-text-crimson">
                {formatPrice(product.price, currency)}
              </span>
              {product.mrp > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.mrp, currency)}
                </span>
              )}
              {discount > 0 && (
                <Badge className="bg-green-500 text-white">SAVE {discount}%</Badge>
              )}
              <span className="text-sm text-muted-foreground ml-auto">{product.unit}</span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Inclusive of all taxes. Free shipping above ₹2,000.
            </p>

            {/* Quick details */}
            <div className="mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-accent/40">
              {[
                { label: "Fabric", value: product.fabric },
                { label: "Color", value: product.color },
                { label: "Width", value: product.width },
                { label: "Weight", value: product.weight },
                { label: "Season", value: product.season },
                { label: "Origin", value: product.origin },
              ].map((d) => (
                <div key={d.label}>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{d.label}</div>
                  <div className="text-sm font-medium">{d.value}</div>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              {product.stock > 20 ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-muted-foreground">— Ready to ship</span>
                </>
              ) : product.stock > 0 ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-orange-600 font-medium">Only {product.stock} left!</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1 bg-card rounded-full border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                  wishlisted ? "text-[var(--crimson)] border-[var(--crimson)] bg-[var(--crimson)]/5" : "hover:bg-accent"
                )}
              >
                <Heart className={cn("w-5 h-5", wishlisted && "fill-current")} />
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAddToCart} className="btn-luxe flex-1 h-12">
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </Button>
              <Button onClick={handleBuyNow} className="btn-gold flex-1 h-12">
                Buy Now
              </Button>
            </div>

            {/* WhatsApp order */}
            <a
              href={`https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${product.id})%20priced%20at%20₹${product.price}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" /> Order via WhatsApp
            </a>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { Icon: Truck, label: "Free Shipping", sub: "Above ₹2,000" },
                { Icon: RefreshCw, label: "7-Day Returns", sub: "No questions" },
                { Icon: ShieldCheck, label: "Secure Payment", sub: "Razorpay" },
                { Icon: Award, label: "Authentic Fabric", sub: "Quality checked" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1 p-3 rounded-lg bg-card border border-border">
                  <item.Icon className="w-5 h-5 text-[var(--gold-dark)]" />
                  <div className="text-xs font-medium">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {["details", "fabric-care", "reviews", "shipping"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--gold)] data-[state=active]:bg-transparent px-6 py-3 font-display text-base capitalize"
                >
                  {t.replace("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="prose prose-sm sm:prose-base max-w-3xl">
                <p className="text-base text-foreground/80 leading-relaxed">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Fabric", value: product.fabric },
                    { label: "Color", value: product.color },
                    { label: "Width", value: product.width },
                    { label: "Weight", value: product.weight },
                    { label: "Origin", value: product.origin },
                    { label: "Brand", value: product.brand },
                    { label: "Gender", value: product.gender },
                    { label: "Season", value: product.season },
                    { label: "Occasion", value: product.occasion.join(", ") },
                  ].map((d, i) => (
                    <div key={i} className="p-3 rounded-lg bg-accent/40">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{d.label}</div>
                      <div className="text-sm font-medium mt-0.5">{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fabric-care" className="mt-6">
              <div className="max-w-3xl space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Fabric Details</h4>
                  <p className="text-sm text-muted-foreground">{product.fabricDetails}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <p className="text-sm text-muted-foreground">{product.care}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8 p-6 rounded-xl bg-accent/40">
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text-gold">{product.rating}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground/40")} />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{product.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3">{star}</span>
                        <Star className="w-3 h-3 fill-[var(--gold)] text-[var(--gold)]" />
                        <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--gold)]"
                            style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : 1}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {[
                  { name: "Anjali S.", rating: 5, date: "2 weeks ago", text: "Stunning quality! The colour is exactly as shown. Drapes beautifully and feels premium. Will buy again." },
                  { name: "Rahul V.", rating: 5, date: "1 month ago", text: "Bought this for my mother's birthday. She loved it. Packaging was excellent and delivery was quick." },
                  { name: "Fatima K.", rating: 4, date: "1 month ago", text: "Good fabric, slightly different shade in person but still lovely. Customer service was helpful." },
                ].map((r, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="p-5 rounded-xl border border-border mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center text-white font-medium">
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{r.name}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[...Array(5)].map((_, s) => (
                                <Star key={s} className={cn("w-3 h-3", s < r.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground/40")} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="max-w-3xl space-y-4">
                <div className="p-5 rounded-xl bg-accent/40">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[var(--gold-dark)]" /> Shipping Information
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We ship pan-India via BlueDart, Delhivery, and DTDC. Orders are processed within 24 hours and typically delivered in 3-7 business days. Free shipping on orders above ₹2,000. Express delivery available at checkout for next-day delivery in major cities.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-accent/40">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[var(--gold-dark)]" /> Returns & Exchanges
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Easy 7-day returns. If you're not satisfied with your purchase, contact us within 7 days of delivery for a full refund or exchange. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-accent/40">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--gold-dark)]" /> Payment Security
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    All payments are processed through Razorpay's secure gateway. We accept UPI, all major credit/debit cards, net banking, and wallets. Cash on Delivery available for orders below ₹10,000 within Chandausi & nearby areas.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div className="mt-20">
            <SectionHeader
              eyebrow="You May Also Like"
              title={<>Similar <span className="gradient-text-gold">Products</span></>}
              center={false}
            />
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {similar.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Recently viewed */}
        {recent.length > 0 && (
          <div className="mt-20">
            <SectionHeader
              eyebrow="Pick Up Where You Left Off"
              title={<>Recently <span className="gradient-text-crimson">Viewed</span></>}
              center={false}
            />
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {recent.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
