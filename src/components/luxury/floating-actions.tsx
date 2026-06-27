"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useStore } from "@/lib/store";

export function FloatingActions() {
  const [show, setShow] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 inset-x-0 h-1 z-[60] origin-left bg-gradient-to-r from-[var(--crimson-dark)] via-[var(--gold)] to-[var(--gold-light)]"
      />

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <AnimatePresence>
          {show && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full glass-strong shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Phone */}
        <motion.a
          href="tel:+919876543210"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/919876543210?text=Hi%20Hathras%20Cutpiece%2C%20I%20would%20like%20to%20enquire%20about%20fabrics"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center pulse-glow"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      </div>
    </>
  );
}

export function Notifications() {
  const { notifications, dismissNotification } = useStore();

  return (
    <div className="fixed top-20 right-4 z-[70] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            onClick={() => dismissNotification(n.id)}
            className={`px-4 py-3 rounded-lg shadow-lg cursor-pointer glass-strong border-l-4 ${
              n.type === "success"
                ? "border-green-500"
                : n.type === "error"
                ? "border-red-500"
                : "border-blue-500"
            }`}
          >
            <p className="text-sm font-medium">{n.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function PageLoader() {
  const { isPageLoading, setPageLoading } = useStore();

  React.useEffect(() => {
    if (isPageLoading) {
      const t = setTimeout(() => setPageLoading(false), 700);
      return () => clearTimeout(t);
    }
  }, [isPageLoading, setPageLoading]);

  return (
    <AnimatePresence>
      {isPageLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-accent border-t-[var(--gold)]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-sm tracking-widest uppercase text-muted-foreground"
            >
              Hathras Cutpiece
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
