"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { Navbar } from "@/components/luxury/navbar";
import { Hero } from "@/components/luxury/hero";
import { Footer } from "@/components/luxury/footer";
import { HomeView } from "@/components/luxury/home-view";
import { ShopView } from "@/components/luxury/shop-view";
import { ProductDetailView } from "@/components/luxury/product-detail-view";
import {
  AboutView, GalleryView, OffersView, BlogView, AccountView, AdminView,
  ContactView, TrackOrderView,
} from "@/components/luxury/other-views";
import { CartDrawer, WishlistDrawer, SearchOverlay } from "@/components/luxury/drawers";
import { FloatingActions, Notifications, PageLoader } from "@/components/luxury/floating-actions";

export default function Home() {
  const {
    view, selectedProductId, selectedCategorySlug,
  } = useStore();

  // Scroll to top on view change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedProductId]);

  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <>
            <Hero />
            <HomeView />
          </>
        );
      case "shop":
        return <ShopView />;
      case "category":
        return <ShopView categorySlug={selectedCategorySlug} />;
      case "product":
        return selectedProductId ? <ProductDetailView productId={selectedProductId} /> : <ShopView />;
      case "about":
        return <AboutView />;
      case "gallery":
        return <GalleryView />;
      case "offers":
        return <OffersView />;
      case "blog":
        return <BlogView />;
      case "account":
        return <AccountView />;
      case "admin":
        return <AdminView />;
      case "contact":
        return <ContactView />;
      case "track-order":
        return <TrackOrderView />;
      default:
        return (
          <>
            <Hero />
            <HomeView />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (selectedProductId || "") + (selectedCategorySlug || "")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <FloatingActions />
      <Notifications />
      <PageLoader />
    </div>
  );
}
