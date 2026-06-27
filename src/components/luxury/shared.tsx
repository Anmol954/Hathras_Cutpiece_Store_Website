"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center ? "text-center" : "text-left", "max-w-3xl", center && "mx-auto", className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--gold-dark)] font-medium mb-3 flex items-center gap-2 justify-center"
        >
          <span className="w-8 h-px bg-[var(--gold)]" />
          {eyebrow}
          <span className="w-8 h-px bg-[var(--gold)]" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-muted-foreground font-serif italic"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString("en-IN");
  });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, duration, motionValue]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden py-4 border-y border-border bg-gradient-to-r from-[var(--crimson-dark)]/10 to-[var(--gold-dark)]/10">
      <div className="marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-display text-lg sm:text-xl font-medium text-foreground/80">
            <span className="text-[var(--gold)]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CTAButton({
  children,
  onClick,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "gold" | "outline";
  className?: string;
}) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105";
  const variants = {
    primary: "btn-luxe",
    gold: "btn-gold",
    outline: "border-2 border-foreground hover:bg-foreground hover:text-background",
  };
  return (
    <button onClick={onClick} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
