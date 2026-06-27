"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, ChevronDown,
  Globe, Sparkles, MapPin, Phone,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showTopBar, setShowTopBar] = React.useState(true);

  const {
    cartCount, wishlist, setCartOpen, setWishlistOpen, setSearchOpen,
    setMenuOpen, goTo, goHome, goToCategory, user,
  } = useStore();

  React.useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setShowTopBar(y < 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const popularCats = categories.slice(0, 12);

  return (
    <>
      {/* Announcement bar */}
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gradient-to-r from-crimson via-[var(--crimson)] to-[var(--gold-dark)] text-white text-xs sm:text-sm"
            style={{ background: "linear-gradient(90deg, var(--crimson-dark), var(--crimson), var(--gold-dark))" }}
          >
            <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-6 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Diwali Dhamaka Sale: Up to 40% OFF — Code DIWALI40
              </span>
              <span className="hidden md:flex items-center gap-1.5 opacity-90">
                <Phone className="w-3.5 h-3.5" /> +91 98765 43210
              </span>
              <span className="hidden lg:flex items-center gap-1.5 opacity-90">
                <MapPin className="w-3.5 h-3.5" /> Chandausi, Uttar Pradesh
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong nav-scrolled py-2" : "bg-transparent py-3"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={goHome}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Hathras Cutpiece Home"
            >
              <div className="relative w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] shadow-lg overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="font-display text-xl font-bold text-white tracking-tight">H</span>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-tight text-foreground">
                  Hathras Cutpiece
                </span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-0.5">
                  Cloth Centre · Est. 1985
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <button
                    onClick={goHome}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Home
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[640px] grid-cols-3 gap-1 p-4">
                      {popularCats.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => goToCategory(cat.slug)}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors text-left group"
                        >
                          <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 ring-1 ring-border">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate group-hover:text-[var(--gold-dark)] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{cat.count} items</div>
                          </div>
                        </button>
                      ))}
                      <button
                        onClick={() => goTo("shop")}
                        className="col-span-3 mt-2 py-2.5 rounded-lg bg-gradient-to-r from-[var(--crimson-dark)] to-[var(--crimson)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        View All Categories →
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => goTo("shop")}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Shop
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => goTo("offers")}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Offers
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => goTo("blog")}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Blog
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => goTo("about")}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    About
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => goTo("contact")}
                    className="px-3 py-2 text-sm font-medium hover:text-[var(--gold-dark)] transition-colors"
                  >
                    Contact
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-accent transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setWishlistOpen(true)}
                className="p-2.5 rounded-full hover:bg-accent transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] bg-[var(--crimson)] text-white">
                    {wishlist.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2.5 rounded-full hover:bg-accent transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount() > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] bg-[var(--gold-dark)] text-white animate-pulse">
                    {cartCount()}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => goTo("account")}
                className="p-2.5 rounded-full hover:bg-accent transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-full hover:bg-accent transition-colors hidden sm:block"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}

              <button
                onClick={() => setMenuOpen(true)}
                className="p-2.5 rounded-full hover:bg-accent transition-colors lg:hidden"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  const { menuOpen, setMenuOpen, goTo, goHome, goToCategory } = useStore();
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-card shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-display text-lg font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-accent">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <button
                onClick={() => { goHome(); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-accent font-medium"
              >
                Home
              </button>
              <button
                onClick={() => { goTo("shop"); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-accent font-medium"
              >
                Shop All
              </button>
              <div className="mt-2 mb-2 text-xs uppercase tracking-wider text-muted-foreground px-4">Categories</div>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {categories.slice(0, 12).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => { goToCategory(cat.slug); setMenuOpen(false); }}
                    className="px-3 py-2 text-sm rounded-lg hover:bg-accent text-left"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="mt-2 border-t pt-2">
                {["offers", "blog", "about", "gallery", "account", "track-order", "admin", "contact"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { goTo(v as any); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-accent capitalize font-medium"
                  >
                    {v.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
