"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, X, Star, ChevronDown, Check, Grid2x2, LayoutGrid,
  Home as HomeIcon, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { useStore, type FilterState } from "@/lib/store";
import { products, categories } from "@/lib/data";
import { ProductCard } from "./product-card";
import { SectionHeader, Reveal } from "./shared";
import { cn } from "@/lib/utils";

const FABRICS = ["Pure Silk", "Cotton Silk", "Linen", "Rayon", "Pure Cotton", "Georgette", "Chiffon", "Velvet", "Brocade", "Crepe"];
const OCCASIONS = ["Wedding", "Festival", "Casual", "Office", "Party", "Pooja", "Daily"];
const COLORS = ["Crimson Red", "Royal Gold", "Ivory", "Emerald", "Sapphire", "Maroon", "Black", "Rose Pink", "Peacock", "Mustard", "Cream"];
const GENDERS = ["Men", "Women", "Kids", "Unisex"];
const SEASONS = ["All Season", "Summer", "Winter"];

export function ShopView({ categorySlug }: { categorySlug?: string | null }) {
  const { filters, setFilter, resetFilters, goHome, goToCategory } = useStore();
  const [showFilters, setShowFilters] = React.useState(false);
  const [gridCols, setGridCols] = React.useState<2 | 4>(4);

  const activeCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : filters.category
    ? categories.find((c) => c.slug === filters.category)
    : null;

  const filtered = React.useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter((p) => p.categorySlug === activeCategory.slug);
    }
    if (filters.fabric.length > 0) result = result.filter((p) => filters.fabric.includes(p.fabric));
    if (filters.color.length > 0) result = result.filter((p) => filters.color.includes(p.color));
    if (filters.occasion.length > 0) result = result.filter((p) => p.occasion.some((o) => filters.occasion.includes(o)));
    if (filters.gender.length > 0) result = result.filter((p) => filters.gender.includes(p.gender));
    if (filters.season.length > 0) result = result.filter((p) => filters.season.includes(p.season));
    if (filters.inStock) result = result.filter((p) => p.stock > 0);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    switch (filters.sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [activeCategory, filters]);

  const toggleArrayFilter = (key: "fabric" | "color" | "occasion" | "gender" | "season", value: string) => {
    const current = filters[key] as string[];
    setFilter(key, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const activeFilterCount =
    filters.fabric.length + filters.color.length + filters.occasion.length + filters.gender.length + filters.season.length +
    (filters.inStock ? 1 : 0) + (filters.priceMin > 0 || filters.priceMax < 5000 ? 1 : 0);

  const filterProps: FilterContentProps = {
    filters,
    toggleArrayFilter,
    setFilter,
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={goHome} className="hover:text-foreground flex items-center gap-1">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">Shop</span>
          {activeCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">{activeCategory.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        {activeCategory ? (
          <div className="relative overflow-hidden rounded-3xl h-48 sm:h-64 mb-8">
            <img src={activeCategory.image} alt={activeCategory.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
            <div className="relative h-full flex flex-col justify-center p-8 text-white">
              <div className="text-4xl mb-2">{activeCategory.icon}</div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{activeCategory.name}</h1>
              <p className="text-sm sm:text-base text-white/80 mt-1 max-w-xl">{activeCategory.description}</p>
              <div className="mt-2 text-xs text-[var(--gold)]">{activeCategory.count} products available</div>
            </div>
          </div>
        ) : (
          <SectionHeader
            eyebrow="Premium Collection"
            title={<>Shop All <span className="gradient-text-gold">Fabrics</span></>}
            subtitle={`${products.length} premium fabrics handpicked for you. Filter, sort, and discover your perfect match.`}
          />
        )}
      </div>

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-[var(--gold-dark)] text-white">{activeFilterCount}</Badge>
              )}
            </button>
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {products.length} products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 border border-border rounded-full p-1">
              <button
                onClick={() => setGridCols(4)}
                className={cn("p-1.5 rounded-full transition-colors", gridCols === 4 ? "bg-accent" : "")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={cn("p-1.5 rounded-full transition-colors", gridCols === 2 ? "bg-accent" : "")}
              >
                <Grid2x2 className="w-4 h-4" />
              </button>
            </div>

            <Select value={filters.sortBy} onValueChange={(v) => setFilter("sortBy", v as any)}>
              <SelectTrigger className="w-44 h-10 rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {filters.fabric.map((v) => (
              <FilterChip key={`f-${v}`} label={v} onRemove={() => toggleArrayFilter("fabric", v)} />
            ))}
            {filters.color.map((v) => (
              <FilterChip key={`c-${v}`} label={v} onRemove={() => toggleArrayFilter("color", v)} />
            ))}
            {filters.occasion.map((v) => (
              <FilterChip key={`o-${v}`} label={v} onRemove={() => toggleArrayFilter("occasion", v)} />
            ))}
            {filters.gender.map((v) => (
              <FilterChip key={`g-${v}`} label={v} onRemove={() => toggleArrayFilter("gender", v)} />
            ))}
            {filters.season.map((v) => (
              <FilterChip key={`s-${v}`} label={v} onRemove={() => toggleArrayFilter("season", v)} />
            ))}
            {filters.inStock && <FilterChip label="In Stock" onRemove={() => setFilter("inStock", false)} />}
            <button onClick={resetFilters} className="text-xs text-red-500 hover:underline ml-2">
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-xs text-red-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>
              <FilterContent {...filterProps} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-semibold mb-2">No products match your filters</h3>
                <p className="text-sm text-muted-foreground mb-4">Try removing some filters or expanding your price range.</p>
                <Button onClick={resetFilters} variant="outline">Clear All Filters</Button>
              </div>
            ) : (
              <div className={cn(
                "grid gap-3 sm:gap-5",
                gridCols === 4 ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
              )}>
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Filters
              {activeFilterCount > 0 && <Badge>{activeFilterCount} active</Badge>}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
            <div className="mt-6 flex gap-3">
              <Button onClick={resetFilters} variant="outline" className="flex-1">Clear All</Button>
              <Button onClick={() => setShowFilters(false)} className="btn-luxe flex-1">
                Show {filtered.length} Results
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3 flex items-center justify-between">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onChange}>
      <Checkbox checked={checked} onCheckedChange={onChange} id={label} />
      <Label htmlFor={label} className="text-sm font-normal cursor-pointer flex-1">
        {label}
      </Label>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="secondary" className="px-3 py-1 gap-1.5">
      {label}
      <button onClick={onRemove} className="hover:text-red-500">
        <X className="w-3 h-3" />
      </button>
    </Badge>
  );
}

type FilterArrayKey = "fabric" | "color" | "occasion" | "gender" | "season";

interface FilterContentProps {
  filters: FilterState;
  toggleArrayFilter: (key: FilterArrayKey, value: string) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

function FilterContent({ filters, toggleArrayFilter, setFilter }: FilterContentProps) {
  return (
    <div className="space-y-6">
      <FilterGroup title="Fabric">
        {FABRICS.map((f) => (
          <CheckRow
            key={f}
            checked={filters.fabric.includes(f)}
            onChange={() => toggleArrayFilter("fabric", f)}
            label={f}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="grid grid-cols-2 gap-2">
          {COLORS.map((c) => (
            <CheckRow
              key={c}
              checked={filters.color.includes(c)}
              onChange={() => toggleArrayFilter("color", c)}
              label={c}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Occasion">
        <div className="grid grid-cols-2 gap-2">
          {OCCASIONS.map((o) => (
            <CheckRow
              key={o}
              checked={filters.occasion.includes(o)}
              onChange={() => toggleArrayFilter("occasion", o)}
              label={o}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Gender">
        {GENDERS.map((g) => (
          <CheckRow
            key={g}
            checked={filters.gender.includes(g)}
            onChange={() => toggleArrayFilter("gender", g)}
            label={g}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Season">
        {SEASONS.map((s) => (
          <CheckRow
            key={s}
            checked={filters.season.includes(s)}
            onChange={() => toggleArrayFilter("season", s)}
            label={s}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        <div className="px-2">
          <div className="flex justify-between text-xs mb-3">
            <span>₹{filters.priceMin}</span>
            <span>₹{filters.priceMax}+</span>
          </div>
          <Slider
            min={0}
            max={5000}
            step={100}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={([min, max]) => {
              setFilter("priceMin", min);
              setFilter("priceMax", max);
            }}
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckRow
          checked={filters.inStock}
          onChange={() => setFilter("inStock", !filters.inStock)}
          label="In Stock Only"
        />
      </FilterGroup>
    </div>
  );
}
