"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail, Clock,
  Send, ShieldCheck, Truck, RefreshCw, Award, BadgeIndianRupee,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Truck, RefreshCw, Award, BadgeIndianRupee,
};

export function Footer() {
  const { goTo, goToCategory } = useStore();
  const [email, setEmail] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed!", {
      description: "Welcome to the Hathras family. Check your inbox for a 10% off coupon.",
    });
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-[var(--cream)] dark:to-[#0f0a08] border-t border-border mt-20">
      {/* Wave divider */}
      <div className="absolute top-0 inset-x-0 -translate-y-full overflow-hidden h-16 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="w-[200%] h-full wave-anim text-background dark:text-[#0f0a08]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Trust badges row */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Secure Payments", text: "Razorpay protected" },
              { icon: Truck, title: "Free Shipping", text: "On orders above ₹2,000" },
              { icon: RefreshCw, title: "7-Day Returns", text: "Easy & hassle-free" },
              { icon: Award, title: "40+ Years", text: "Trusted since 1985" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center text-white shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)]">
                <span className="font-display text-xl font-bold text-white">H</span>
              </div>
              <div>
                <div className="font-display text-base font-bold">Hathras Cutpiece</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cloth Centre</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Premium fabrics, wedding collections & designer textiles — serving Chandausi, Uttar Pradesh
              and shipping pan-India since 1985. Three generations of textile expertise.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-500" },
                { Icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
                { Icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-600" },
                { Icon: Twitter, href: "https://twitter.com", color: "hover:bg-sky-500" },
              ].map(({ Icon, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center bg-accent text-foreground transition-colors ${color} hover:text-white`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", view: "about" },
                { label: "Shop All", view: "shop" },
                { label: "Offers & Coupons", view: "offers" },
                { label: "Track Your Order", view: "track-order" },
                { label: "Blog & Guides", view: "blog" },
                { label: "Gallery", view: "gallery" },
                { label: "Contact Us", view: "contact" },
                { label: "My Account", view: "account" },
                { label: "Admin Dashboard", view: "admin" },
              ].map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => goTo(link.view as any)}
                    className="text-muted-foreground hover:text-[var(--gold-dark)] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {["silk", "wedding", "cotton", "festival", "suit-material", "shirting", "designer", "embroidery"].map((slug) => (
                <li key={slug}>
                  <button
                    onClick={() => goToCategory(slug)}
                    className="text-muted-foreground hover:text-[var(--gold-dark)] transition-colors capitalize text-left"
                  >
                    {slug.replace("-", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Stay in Touch</h4>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--gold-dark)] shrink-0" />
                <span className="text-muted-foreground">
                  Main Market, Chandausi,<br />Sambhal, Uttar Pradesh 244411
                </span>
              </div>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4 text-[var(--gold-dark)]" /> +91 98765 43210
              </a>
              <a href="mailto:hello@hathrascutpiece.com" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground">
                <Mail className="w-4 h-4 text-[var(--gold-dark)]" /> hello@hathrascutpiece.com
              </a>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--gold-dark)] shrink-0" />
                <span className="text-muted-foreground">
                  Mon–Sat: 9:00 AM – 9:00 PM<br />Sunday: 10:00 AM – 6:00 PM
                </span>
              </div>
            </div>

            <form onSubmit={submit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe for offers..."
                className="w-full pl-4 pr-12 py-2.5 rounded-full bg-accent text-sm border border-border focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] text-white flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground mr-2">We Accept:</span>
            {["Razorpay", "UPI", "GPay", "PhonePe", "Paytm", "Visa", "Mastercard", "RuPay", "COD"].map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 rounded-md bg-accent text-[10px] font-medium border border-border"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hathras Cutpiece Cloth Centre. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
