"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStore, formatPrice } from "@/lib/store";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const { addToCart, toggleWishlist, isWishlisted, goToProduct, currency } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = React.useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      onClick={() => goToProduct(product.id)}
      className="group relative bg-card rounded-2xl overflow-hidden cursor-pointer card-glow ring-1 ring-border/50 hover:ring-[var(--gold)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Second image fade-in on hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge className="bg-[var(--gold-dark)] text-white hover:bg-[var(--gold-dark)] text-[10px] tracking-wider">
              NEW
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-[var(--crimson)] text-white hover:bg-[var(--crimson)] text-[10px] tracking-wider">
              -{discount}%
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-foreground text-background hover:bg-foreground text-[10px] tracking-wider">
              BESTSELLER
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWish}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 glass-strong",
            wishlisted ? "text-[var(--crimson)]" : "text-foreground hover:text-[var(--crimson)]"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("w-4 h-4", wishlisted && "fill-current heart-pop")} />
        </button>

        {/* Hover quick actions */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all",
                added ? "bg-green-500 text-white" : "bg-white text-black hover:bg-[var(--gold)]"
              )}
            >
              {added ? <><Check className="w-3.5 h-3.5" /> Added</> : <><ShoppingBag className="w-3.5 h-3.5" /> Add to Cart</>}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToProduct(product.id); }}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/90 text-black hover:bg-[var(--gold)] transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-white text-black text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</span>
          <div className="flex items-center gap-0.5 text-xs">
            <Star className="w-3 h-3 fill-[var(--gold)] text-[var(--gold)]" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-[var(--gold-dark)] transition-colors">
          {product.name}
        </h3>

        <div className="mt-1 text-xs text-muted-foreground">
          {product.fabric} · {product.color}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price, currency)}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.mrp, currency)}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground ml-auto">{product.unit}</span>
        </div>

        {/* Color swatch */}
        <div className="mt-3 flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded-full ring-1 ring-border"
            style={{ backgroundColor: product.colorHex }}
          />
          <span className="text-[10px] text-muted-foreground">{product.color}</span>
          {product.stock < 20 && product.stock > 0 && (
            <span className="text-[10px] text-orange-500 ml-auto">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
