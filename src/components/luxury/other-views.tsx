"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Award, Users, Truck, Star, Quote, Calendar, Clock,
  MapPin, Phone, Mail, Send, Sparkles, Tag, Copy, Check, Eye,
  Heart, ShoppingBag, Package, TrendingUp, DollarSign, User, Settings,
  Bell, Search, Filter, Plus, Edit, Trash2, MoreVertical, Download,
  ChevronRight, Home as HomeIcon, LogOut, LayoutDashboard, Boxes,
  ClipboardList, Tags, BarChart3, Image as ImageIcon, MessageSquare,
  CreditCard, ShieldCheck, Zap, Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Avatar, AvatarFallback, AvatarImage,
} from "@/components/ui/avatar";
import { useStore, formatPrice } from "@/lib/store";
import {
  products, categories, blogPosts, offers, storeGallery, testimonials,
  faqs,
} from "@/lib/data";
import { SectionHeader, Reveal, AnimatedCounter, CTAButton } from "./shared";
import { ProductCard } from "./product-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ============ ABOUT ============
export function AboutView() {
  const { goTo, goHome } = useStore();
  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "About Us"]} onHome={goHome} />

        {/* Hero */}
        <div className="relative mt-8 rounded-3xl overflow-hidden h-80 sm:h-96">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="relative h-full flex flex-col justify-center p-8 sm:p-12 text-white max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-3">Est. 1985 · Chandausi</div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              A Legacy Woven in <span className="gradient-text-gold">Every Thread</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-serif italic">
              Three generations. One unwavering commitment to authentic, premium textiles.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold-dark)] mb-3">Our Story</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                From a Small Shop to a <span className="gradient-text-crimson">Regional Icon</span>
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  In 1985, Mr. Mohd. Ishaq Khan opened a modest 200-square-foot cutpiece shop in the bustling main market of Chandausi, Uttar Pradesh. With just ₹5,000 borrowed from his father and a deep love for textiles, he began sourcing fabrics directly from weavers in Banaras, Kanchipuram, and Chanderi — cutting out middlemen to offer honest prices to local families.
                </p>
                <p>
                  What started as a one-man shop soon became a household name across western Uttar Pradesh. Brides from Moradabad, boutiques from Bareilly, and tailors from Aligarh all made the pilgrimage to Chandausi for the unmatched quality and personal service. By 2005, his sons joined the business, expanding into wedding collections, designer weaves, and bulk supply for boutiques.
                </p>
                <p>
                  Today, in our fourth decade, Hathras Cutpiece Cloth Centre is led by the third generation — bringing the same old-world craftsmanship online with modern convenience. We ship pan-India, source from over 180 master weavers, and remain a family-run business where every customer is treated as our guest. Our promise remains unchanged: <strong className="text-foreground">authentic fabrics, honest prices, and service that feels personal.</strong>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=80" alt="Store" className="rounded-3xl shadow-luxe w-full" />
              <div className="absolute -bottom-6 -left-6 glass-strong p-5 rounded-2xl">
                <div className="font-display text-3xl font-bold gradient-text-gold">40+</div>
                <div className="text-xs text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Vision / Mission */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Our Vision", text: "To be India's most trusted name for premium fabrics — where every customer, whether a bride in Delhi or a boutique in Moradabad, experiences the same warmth, quality, and craftsmanship that has defined us since 1985.", icon: "🎯" },
            { title: "Our Mission", text: "To support master weavers, preserve India's textile heritage, and make authentic, high-quality fabrics accessible to every household — at honest prices, with personal service, and through both our physical store and online presence.", icon: "🌿" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="p-8 h-full bg-gradient-to-br from-card to-accent/30 border-border">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-20">
          <SectionHeader
            eyebrow="Milestones"
            title={<>Our <span className="gradient-text-gold">Journey</span></>}
            subtitle="Four decades of milestones, milestones of trust."
          />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: "1985", event: "Founded", text: "Mr. Ishaq Khan opens first shop in Chandausi main market" },
              { year: "1998", event: "1 lakh customers", text: "Crossed 100,000 happy customers across western UP" },
              { year: "2010", event: "Wholesale expansion", text: "Started supplying to boutiques, tailors & schools" },
              { year: "2020", event: "Going online", text: "Launched online store with pan-India shipping" },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-card border border-border">
                  <div className="font-display text-3xl font-bold gradient-text-crimson">{m.year}</div>
                  <div className="text-sm font-semibold mt-2">{m.event}</div>
                  <div className="text-xs text-muted-foreground mt-2">{m.text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center p-12 rounded-3xl bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] text-white">
          <h2 className="font-display text-3xl font-bold">Visit Our Store</h2>
          <p className="mt-2 text-white/80">Experience the warmth of Hathras in person.</p>
          <button onClick={() => goTo("contact")} className="mt-6 btn-gold">
            Get Directions <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ GALLERY ============
export function GalleryView() {
  const { goHome } = useStore();
  const [active, setActive] = React.useState(0);
  const [filter, setFilter] = React.useState<"all" | "store" | "customers" | "festivals">("all");

  const images = [
    ...storeGallery.slice(0, 4).map((src, i) => ({ src, cat: "store" as const, caption: `Store View ${i + 1}` })),
    ...storeGallery.slice(4, 6).map((src, i) => ({ src, cat: "festivals" as const, caption: `Festival Decor ${i + 1}` })),
    ...storeGallery.slice(6).map((src, i) => ({ src, cat: "customers" as const, caption: `Customer Photo ${i + 1}` })),
  ];
  const filtered = filter === "all" ? images : images.filter((img) => img.cat === filter);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Gallery"]} onHome={goHome} />
        <div className="mt-8">
          <SectionHeader
            eyebrow="Visual Stories"
            title={<>Our <span className="gradient-text-gold">Gallery</span></>}
            subtitle="Step inside our store, see our festive decor, and meet our beautiful customers."
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {(["all", "store", "customers", "festivals"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all",
                filter === f ? "btn-luxe" : "bg-card border border-border hover:bg-accent"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((img, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <button
                onClick={() => setActive(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden block w-full"
              >
                <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-4">
                  <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    {img.caption}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Lightbox */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`fixed inset-0 z-[90] bg-black/95 flex items-center justify-center p-4 ${active === -1 ? "pointer-events-none opacity-0" : ""}`}
          onClick={() => setActive(-1)}
          style={{ display: active === -1 ? "none" : "flex" }}
        >
          <img src={filtered[active]?.src} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
        </motion.div>
      </div>
    </div>
  );
}

// ============ OFFERS ============
export function OffersView() {
  const { goHome, applyCoupon } = useStore();
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    applyCoupon(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Offers"]} onHome={goHome} />
        <div className="mt-8">
          <SectionHeader
            eyebrow="Save Big"
            title={<>Exclusive <span className="gradient-text-crimson">Offers & Coupons</span></>}
            subtitle="Handpicked deals on our premium collection. Limited-time only — grab them before they're gone."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1}>
              <div className={cn("relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br text-white", offer.color)}>
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-black/10 blur-2xl" />
                <div className="relative">
                  <Badge className="bg-white/20 text-white border-0 mb-3">Limited Time</Badge>
                  <h3 className="font-display text-2xl font-bold mb-1">{offer.title}</h3>
                  <div className="text-4xl font-display font-bold mb-3">{offer.discount}</div>
                  <p className="text-sm text-white/90 mb-6">{offer.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-between">
                      <code className="text-sm font-mono font-semibold tracking-wider">{offer.code}</code>
                      <button
                        onClick={() => copy(offer.code)}
                        className="text-xs font-semibold flex items-center gap-1 hover:underline"
                      >
                        {copied === offer.code ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/70">Valid till: {offer.expiry}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Referral Program */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--crimson-dark)] to-[var(--gold-dark)] text-white text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h2 className="font-display text-3xl font-bold">Refer & Earn ₹500</h2>
          <p className="mt-2 text-white/80 max-w-xl mx-auto">
            Refer a friend and you both get ₹500 off on your next order above ₹2,000. No limit on referrals — earn unlimited rewards!
          </p>
          <Button className="mt-6 bg-white text-[var(--crimson-dark)] hover:bg-white/90">
            <Sparkles className="w-4 h-4" /> Start Referring
          </Button>
        </div>

        {/* Loyalty */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: "Silver", points: "0-999", perk: "5% off on all orders", color: "from-gray-400 to-gray-600" },
            { tier: "Gold", points: "1000-4999", perk: "10% off + free shipping", color: "from-[var(--gold-dark)] to-[var(--gold)]" },
            { tier: "Platinum", points: "5000+", perk: "15% off + priority + samples", color: "from-purple-500 to-pink-600" },
          ].map((tier, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={cn("rounded-3xl p-6 bg-gradient-to-br text-white", tier.color)}>
                <div className="text-xs uppercase tracking-wider opacity-80">Loyalty Tier</div>
                <h3 className="font-display text-2xl font-bold mt-1">{tier.tier}</h3>
                <div className="text-sm opacity-90 mt-1">{tier.points} points</div>
                <div className="mt-4 text-sm font-medium">{tier.perk}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ BLOG ============
export function BlogView() {
  const { goHome } = useStore();
  const [category, setCategory] = React.useState("All");
  const cats = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const filtered = category === "All" ? blogPosts : blogPosts.filter((p) => p.category === category);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Blog"]} onHome={goHome} />
        <div className="mt-8">
          <SectionHeader
            eyebrow="Journal"
            title={<>Fabric Stories & <span className="gradient-text-gold">Fashion Guides</span></>}
            subtitle="Expert tips on fabric care, wedding fashion, colour trends, and timeless textile wisdom."
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                category === c ? "btn-luxe" : "bg-card border border-border hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {category === "All" && filtered[0] && (
          <Reveal>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden img-zoom">
                <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover" />
              </div>
              <div>
                <Badge className="bg-[var(--gold-dark)] text-white mb-3">Featured</Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                  {filtered[0].title}
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{filtered[0].excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {filtered[0].author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {filtered[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {filtered[0].readTime}</span>
                </div>
                <Button className="mt-6 btn-luxe">
                  Read More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(category === "All" ? 1 : 0).map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.1}>
              <article className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 img-zoom">
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="text-[var(--gold-dark)] font-medium">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-[var(--gold-dark)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 text-xs text-muted-foreground">{post.date}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ACCOUNT ============
export function AccountView() {
  const { goHome, user, login, logout, wishlist, recentlyViewed, currency } = useStore();
  const [email, setEmail] = React.useState("");
  const [mode, setMode] = React.useState<"login" | "register">("login");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md p-8 rounded-3xl bg-card border border-border shadow-luxe">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center mb-3">
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to track orders & manage wishlist" : "Join the Hathras family today"}
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); login(email || "guest@hathras.com"); toast.success("Signed in successfully!"); }}
            className="space-y-4"
          >
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <Input placeholder="Your name" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="btn-luxe w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => { login("google@user.com"); toast.success("Signed in with Google"); }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button variant="outline" onClick={() => toast.info("OTP sent!", { description: "Enter the OTP sent to your phone." })}>
              <Phone className="w-4 h-4" /> OTP
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-[var(--gold-dark)] font-semibold hover:underline">
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const recentProducts = recentlyViewed.map((id) => products.find((p) => p.id === id)).filter(Boolean).slice(0, 4) as typeof products;

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "My Account"]} onHome={goHome} />

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-2 ring-[var(--gold)]">
              <AvatarFallback className="bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] text-white text-xl">
                {user.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl font-bold">Hello, {user.name}!</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => { logout(); toast.info("Signed out"); }}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders" className="mt-10">
          <TabsList className="w-full justify-start overflow-x-auto border-b rounded-none h-auto p-0 bg-transparent">
            {[
              { v: "orders", l: "My Orders", I: Package },
              { v: "wishlist", l: "Wishlist", I: Heart },
              { v: "addresses", l: "Addresses", I: MapPin },
              { v: "invoices", l: "Invoices", I: Download },
              { v: "settings", l: "Settings", I: Settings },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--gold)] data-[state=active]:bg-transparent px-5 py-3 font-medium flex items-center gap-2"
              >
                <t.I className="w-4 h-4" /> {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="grid gap-3">
              {[
                { id: "HC48291", date: "Jun 12, 2025", total: 3850, status: "Delivered", items: 3 },
                { id: "HC47102", date: "May 28, 2025", total: 1240, status: "Delivered", items: 1 },
                { id: "HC46885", date: "May 14, 2025", total: 6780, status: "In Transit", items: 4 },
                { id: "HC45921", date: "Apr 30, 2025", total: 2150, status: "Processing", items: 2 },
              ].map((order) => (
                <Card key={order.id} className="p-5 flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Package className="w-5 h-5 text-[var(--gold-dark)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">Order #{order.id}</div>
                    <div className="text-xs text-muted-foreground">{order.date} · {order.items} items</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(order.total, currency)}</div>
                    <Badge className={cn(
                      "mt-1",
                      order.status === "Delivered" && "bg-green-500 text-white",
                      order.status === "In Transit" && "bg-blue-500 text-white",
                      order.status === "Processing" && "bg-orange-500 text-white",
                    )}>{order.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Order details", { description: `Order #${order.id} details loaded.` })}>
                    View
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">💝</div>
                <h3 className="font-display text-xl font-semibold">Your wishlist is empty</h3>
                <p className="text-sm text-muted-foreground mt-2">Tap the heart icon on any product to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {wishlistedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Home", name: user.name, line: "123 Gandhi Nagar, Chandausi", city: "Sambhal, UP 244411", phone: "+91 98765 43210" },
                { label: "Office", name: user.name, line: "45 Market Road, Civil Lines", city: "Moradabad, UP 244001", phone: "+91 98765 43210" },
              ].map((addr, i) => (
                <Card key={i} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-[var(--gold-dark)] text-white">{addr.label}</Badge>
                    <Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" /></Button>
                  </div>
                  <div className="font-semibold">{addr.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{addr.line}</div>
                  <div className="text-sm text-muted-foreground">{addr.city}</div>
                  <div className="text-sm text-muted-foreground mt-1">📞 {addr.phone}</div>
                </Card>
              ))}
              <Card className="p-5 border-dashed border-2 flex items-center justify-center min-h-[180px] cursor-pointer hover:bg-accent/50">
                <div className="text-center">
                  <Plus className="w-8 h-8 mx-auto text-muted-foreground" />
                  <div className="text-sm font-medium mt-2">Add New Address</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <div className="grid gap-3">
              {[
                { id: "INV-2025-48291", order: "HC48291", amount: 3850, gst: "09AABCH1234M1Z5" },
                { id: "INV-2025-47102", order: "HC47102", amount: 1240, gst: "09AABCH1234M1Z5" },
                { id: "INV-2025-46885", order: "HC46885", amount: 6780, gst: "09AABCH1234M1Z5" },
              ].map((inv) => (
                <Card key={inv.id} className="p-5 flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Download className="w-5 h-5 text-[var(--gold-dark)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{inv.id}</div>
                    <div className="text-xs text-muted-foreground">Order {inv.order} · GSTIN: {inv.gst}</div>
                  </div>
                  <div className="font-bold">{formatPrice(inv.amount, currency)}</div>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Invoice downloaded")}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6 max-w-2xl">
              <h3 className="font-display text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input defaultValue={user.name} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input type="email" defaultValue={user.email} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/40">
                  <div>
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-xs text-muted-foreground">Offers, order updates</div>
                  </div>
                  <Button variant="outline" size="sm">On</Button>
                </div>
                <Button className="btn-luxe">Save Changes</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============ ADMIN ============
export function AdminView() {
  const { goHome } = useStore();

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Admin Dashboard"]} onHome={goHome} />

        <div className="mt-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Admin. Here's your store overview.</p>
          </div>
          <Badge className="bg-green-500 text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-1.5" /> Live
          </Badge>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "₹4,82,910", change: "+18.2%", Icon: DollarSign, color: "from-emerald-500 to-teal-600" },
            { label: "Orders Today", value: "47", change: "+12%", Icon: ShoppingBag, color: "from-blue-500 to-indigo-600" },
            { label: "Products", value: "2,547", change: "+24 new", Icon: Boxes, color: "from-[var(--crimson)] to-[var(--gold-dark)]" },
            { label: "Customers", value: "8,329", change: "+156", Icon: Users, color: "from-purple-500 to-pink-600" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", stat.color)}>
                    <stat.Icon className="w-5 h-5" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">{stat.change}</Badge>
                </div>
                <div className="font-display text-2xl font-bold mt-3">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Charts placeholder + recent orders */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">Sales Analytics</h3>
              <Select className="w-32">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </Select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 50, 75, 60, 90, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[var(--crimson-dark)] to-[var(--gold)]"
                  />
                  <span className="text-xs text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Top Categories</h3>
            <div className="space-y-3">
              {categories.slice(0, 5).map((cat, i) => {
                const pct = 90 - i * 15;
                return (
                  <div key={cat.slug}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[var(--crimson)] to-[var(--gold)]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent orders table */}
        <Card className="mt-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Recent Orders</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-3.5 h-3.5" /> Filter
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "HC48291", customer: "Anjali Sharma", date: "Jun 12", items: 3, total: "₹3,850", status: "Delivered" },
                { id: "HC48290", customer: "Rahul Verma", date: "Jun 12", items: 1, total: "₹1,240", status: "Shipped" },
                { id: "HC48289", customer: "Fatima Khan", date: "Jun 11", items: 5, total: "₹6,780", status: "Processing" },
                { id: "HC48288", customer: "Vikram Singh", date: "Jun 11", items: 2, total: "₹2,150", status: "Pending" },
                { id: "HC48287", customer: "Priya Gupta", date: "Jun 10", items: 4, total: "₹4,920", status: "Delivered" },
              ].map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-semibold">{order.total}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-white",
                      order.status === "Delivered" && "bg-green-500",
                      order.status === "Shipped" && "bg-blue-500",
                      order.status === "Processing" && "bg-orange-500",
                      order.status === "Pending" && "bg-red-500",
                    )}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Add Product", Icon: Plus, color: "from-emerald-500 to-teal-600" },
            { label: "Manage Banners", Icon: ImageIcon, color: "from-purple-500 to-pink-600" },
            { label: "Create Coupon", Icon: Tag, color: "from-blue-500 to-indigo-600" },
            { label: "View Reviews", Icon: MessageSquare, color: "from-[var(--crimson)] to-[var(--gold-dark)]" },
          ].map((action, i) => (
            <Card key={i} className="p-5 cursor-pointer hover:shadow-luxe transition-shadow">
              <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3", action.color)}>
                <action.Icon className="w-5 h-5" />
              </div>
              <div className="font-semibold">{action.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Click to manage</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Select({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <select className={cn("h-9 px-3 rounded-lg bg-card border border-border text-sm", className)}>
      {children}
    </select>
  );
}

// ============ CONTACT ============
export function ContactView() {
  const { goHome } = useStore();
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent!", { description: "We'll respond within 24 hours." });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Contact"]} onHome={goHome} />
        <div className="mt-8">
          <SectionHeader
            eyebrow="We're Here to Help"
            title={<>Get in <span className="gradient-text-gold">Touch</span></>}
            subtitle="Whether it's a product question, custom order, or feedback — we'd love to hear from you."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { Icon: MapPin, title: "Visit Our Store", lines: ["Main Market, Chandausi", "Sambhal, Uttar Pradesh 244411", "Open: Mon-Sat 9AM-9PM"] },
              { Icon: Phone, title: "Call / WhatsApp", lines: ["+91 98765 43210", "+91 12345 67890", "Available 9 AM - 9 PM"] },
              { Icon: Mail, title: "Email Us", lines: ["hello@hathrascutpiece.com", "orders@hathrascutpiece.com", "Response within 24 hours"] },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Card className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center text-white shrink-0">
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <Card className="p-0 overflow-hidden h-64">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.78%2C28.44%2C78.80%2C28.47&layer=mapnik&marker=28.4539%2C78.787"
                  className="w-full h-full"
                  loading="lazy"
                  title="Hathras Cutpiece Location"
                />
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card className="p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold mb-4">Send a Message</h3>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                    <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subject</label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." />
                </div>
                <Button type="submit" className="btn-luxe w-full">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ============ TRACK ORDER ============
export function TrackOrderView() {
  const { goHome } = useStore();
  const [orderId, setOrderId] = React.useState("");
  const [tracked, setTracked] = React.useState(false);

  const steps = [
    { label: "Order Placed", date: "Jun 10, 9:30 AM", done: true },
    { label: "Order Confirmed", date: "Jun 10, 11:45 AM", done: true },
    { label: "Packed", date: "Jun 11, 2:15 PM", done: true },
    { label: "Shipped", date: "Jun 11, 6:30 PM", done: true },
    { label: "Out for Delivery", date: "Jun 13, 8:00 AM", done: false, active: true },
    { label: "Delivered", date: "Expected by 7:00 PM", done: false },
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumb items={["Home", "Track Order"]} onHome={goHome} />
        <div className="mt-8">
          <SectionHeader
            eyebrow="Order Tracking"
            title={<>Track Your <span className="gradient-text-gold">Order</span></>}
            subtitle="Enter your order ID to see real-time status and delivery updates."
          />
        </div>

        <div className="mt-8 flex gap-3">
          <Input
            placeholder="e.g. HC48291"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="h-12"
          />
          <Button className="btn-luxe h-12 px-8" onClick={() => { if (orderId) { setTracked(true); toast.success("Order found!"); } }}>
            <Search className="w-4 h-4" /> Track
          </Button>
        </div>

        {tracked && (
          <Reveal>
            <Card className="mt-8 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <div className="text-sm text-muted-foreground">Order ID</div>
                  <div className="font-display text-xl font-bold">{orderId || "HC48291"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expected Delivery</div>
                  <div className="font-semibold">Jun 13, 2025 by 7:00 PM</div>
                </div>
                <Badge className="bg-blue-500 text-white">In Transit</Badge>
              </div>

              <div className="relative">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4 pb-8 last:pb-0 relative">
                    {i < steps.length - 1 && (
                      <div className={cn(
                        "absolute left-4 top-8 bottom-0 w-0.5",
                        step.done ? "bg-green-500" : "bg-border"
                      )} />
                    )}
                    <div className={cn(
                      "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4 ring-background",
                      step.done ? "bg-green-500 text-white" : step.active ? "bg-blue-500 text-white animate-pulse" : "bg-accent text-muted-foreground"
                    )}>
                      {step.done ? <Check className="w-4 h-4" /> : step.active ? <Truck className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <div className={cn("font-semibold", !step.done && !step.active && "text-muted-foreground")}>
                        {step.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-accent/40 flex items-center gap-3">
                <Truck className="w-5 h-5 text-[var(--gold-dark)] shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Out for delivery</div>
                  <div className="text-muted-foreground">Your order is on the way! Courier: BlueDart, AWB: BD783920183</div>
                </div>
              </div>
            </Card>
          </Reveal>
        )}
      </div>
    </div>
  );
}

// ============ BREADCRUMB ============
function Breadcrumb({ items, onHome }: { items: string[]; onHome: () => void }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
      <button onClick={onHome} className="hover:text-foreground flex items-center gap-1">
        <HomeIcon className="w-3.5 h-3.5" /> Home
      </button>
      {items.slice(1).map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className={cn(i === items.length - 2 && "text-foreground")}>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
