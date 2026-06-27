"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { goTo, goToCategory } = useStore();

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#fb923c] dark:from-[#1a0f0a] dark:via-[#2a1208] dark:to-[#3d1810]"
      />
      {/* Animated overlay */}
      <div className="absolute inset-0 animated-gradient-bg opacity-20 dark:opacity-30" />

      {/* Floating decorative shapes */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 80 + i * 30,
              height: 80 + i * 30,
              left: `${10 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
              background: i % 2 === 0
                ? "radial-gradient(circle, rgba(212,175,55,0.4), transparent 70%)"
                : "radial-gradient(circle, rgba(155,28,46,0.3), transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Particles */}
      <Particles count={40} />

      {/* Floating fabric images */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.img
          src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&q=80"
          alt=""
          className="absolute top-20 right-[8%] w-44 h-56 object-cover rounded-2xl shadow-2xl ring-4 ring-white/30"
          animate={{ y: [0, -20, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80"
          alt=""
          className="absolute bottom-32 left-[6%] w-40 h-52 object-cover rounded-2xl shadow-2xl ring-4 ring-white/30"
          animate={{ y: [0, 25, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80"
          alt=""
          className="absolute top-1/2 right-[15%] w-32 h-40 object-cover rounded-2xl shadow-2xl ring-4 ring-white/30"
          animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
        >
          <Sparkles className="w-4 h-4 text-[var(--gold-dark)]" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Premium Textiles · Since 1985 · Chandausi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
        >
          <span className="block">The Art of</span>
          <span className="block gradient-text-luxe mt-2">Luxurious Fabrics</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-foreground/80 font-serif italic"
        >
          Handcrafted silks, premium cottons, wedding finery & designer weaves —
          curated for those who refuse to settle for ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => goTo("shop")}
            className="btn-luxe group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold uppercase tracking-wider"
          >
            <ShoppingBag className="w-5 h-5" />
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => goToCategory("wedding")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold uppercase tracking-wider glass-strong hover:scale-105 transition-transform"
          >
            Wedding Collection
          </button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-12 flex items-center justify-center gap-6 sm:gap-10 flex-wrap"
        >
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "2500+", label: "Fabric Varieties" },
            { num: "40+", label: "Years of Trust" },
            { num: "4.8★", label: "Customer Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text-gold">{stat.num}</div>
              <div className="text-xs text-foreground/70 mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-foreground/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-4 bg-[var(--gold)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Particles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = React.useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--gold)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
