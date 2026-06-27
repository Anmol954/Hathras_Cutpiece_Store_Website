"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Star, Quote, ChevronDown, MapPin, Phone, Clock, Mail,
  Award, Truck, ShieldCheck, BadgeIndianRupee, Headphones, Leaf,
  Instagram, Facebook, Youtube, Send, Sparkles, Calendar, Scissors,
  Calculator, Video, Package, Gift, Users,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import {
  products, categories, testimonials, faqs, blogPosts, brands,
  instagramPosts, storeGallery, whyChooseUs, stats, offers,
} from "@/lib/data";
import { ProductCard } from "./product-card";
import { SectionHeader, AnimatedCounter, Marquee, Reveal, CTAButton } from "./shared";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Truck, ShieldCheck, BadgeIndianRupee, Headphones, Leaf,
};

export function HomeView() {
  const { goTo, goToCategory } = useStore();
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 8);
  const weddingProducts = products.filter((p) => p.isWedding).slice(0, 4);
  const festivalProducts = products.filter((p) => p.isFestival).slice(0, 4);

  return (
    <>
      {/* Marquee */}
      <Marquee items={[
        "Premium Banarasi Silk",
        "Handcrafted Wedding Collection",
        "Authentic Cotton Weaves",
        "Designer Embroidery",
        "Festival Specials",
        "Since 1985",
      ]} />

      {/* Categories Grid */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Shop by Category"
            title={<>Discover Our <span className="gradient-text-gold">Curated Collections</span></>}
            subtitle="From everyday cottons to heirloom silks — every fabric tells a story of craft and tradition."
          />

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.slice(0, 12).map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 4) * 0.08}>
                <button
                  onClick={() => goToCategory(cat.slug)}
                  className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden card-lift block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-left text-white">
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{cat.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-80">{cat.count} items</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <CTAButton onClick={() => goTo("shop")} variant="outline">
              View All 24 Categories <ArrowRight className="w-4 h-4" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductSection
        eyebrow="Just In"
        title={<>New <span className="gradient-text-crimson">Arrivals</span></>}
        subtitle="Fresh off the loom — the latest additions to our premium collection."
        products={newArrivals}
        cta={() => goTo("shop")}
      />

      {/* Banner: Festival Collection */}
      <BannerCTA
        title="Festival Collection 2025"
        subtitle="Vibrant silks, gold zari, and festive weaves for Diwali, Eid & every celebration."
        bgImage="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80"
        cta={() => goToCategory("festival")}
        ctaLabel="Explore Festive Edit"
        align="left"
      />

      {/* Best Sellers */}
      <ProductSection
        eyebrow="Customer Favourites"
        title={<>Best <span className="gradient-text-gold">Sellers</span></>}
        subtitle="The fabrics our customers can't stop loving — tried, tested, and treasured."
        products={bestSellers}
        cta={() => goTo("shop")}
      />

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-[var(--cream)] dark:to-[#0f0a08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Why Hathras"
            title={<>The Hathras <span className="gradient-text-gold">Difference</span></>}
            subtitle="Four decades of trust, craftsmanship, and unwavering commitment to quality."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <Reveal key={i} delay={(i % 3) * 0.1}>
                  <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-[var(--gold)] transition-all hover:shadow-luxe">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 p-8 rounded-3xl glass-strong">
            {stats.map((s, i) => (
              <Reveal key={i} delay={(i % 6) * 0.06}>
                <div className="text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold gradient-text-crimson">
                    <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Collection */}
      <ProductSection
        eyebrow="Bridal Edit"
        title={<>Wedding <span className="gradient-text-gold">Collection</span></>}
        subtitle="Heirloom-worthy silks and designer weaves for the most special day of your life."
        products={weddingProducts}
        cta={() => goToCategory("wedding")}
      />

      {/* Festival Products */}
      <ProductSection
        eyebrow="Festive Edit"
        title={<>Festival <span className="gradient-text-crimson">Specials</span></>}
        subtitle="Vibrant, joyous fabrics that celebrate every Indian festival in style."
        products={festivalProducts}
        cta={() => goToCategory("festival")}
        bg="bg-muted/30"
      />

      {/* Trending */}
      <ProductSection
        eyebrow="Hot Right Now"
        title={<>Trending <span className="gradient-text-gold">Fabrics</span></>}
        subtitle="What everyone's adding to cart this week."
        products={trending}
        cta={() => goTo("shop")}
      />

      {/* Premium Add-ons */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Premium Services"
            title={<>Beyond <span className="gradient-text-gold">Just Fabric</span></>}
            subtitle="Thoughtful services designed to make your fabric shopping effortless."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calculator, title: "Fabric Calculator", text: "Estimate exact cloth needed for any garment type — no wastage, no shortage.", action: "Calculate" },
              { icon: Video, title: "Book Video Shopping", text: "Live video call with our stylist. See fabrics up close from the comfort of home.", action: "Book Call" },
              { icon: Scissors, title: "Custom Stitching", text: "Get your fabric tailored by master tailors. Perfect fit, premium finishing.", action: "Request" },
              { icon: Package, title: "Bulk Order Inquiry", text: "Special wholesale rates for boutiques, tailors, schools & institutions.", action: "Get Quote" },
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 4) * 0.08}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-[var(--gold)] transition-all card-lift">
                  <div className="w-12 h-12 rounded-xl bg-accent group-hover:bg-[var(--gold)] flex items-center justify-center mb-4 transition-colors">
                    <item.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.text}</p>
                  <button
                    onClick={() => toast.info(`${item.action} coming soon!`, { description: "Our team will reach out shortly." })}
                    className="text-xs font-semibold text-[var(--gold-dark)] hover:text-[var(--crimson)] flex items-center gap-1"
                  >
                    {item.action} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Instagram Gallery */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-[var(--cream)] dark:to-[#0f0a08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="@hathrascutpiece"
            title={<>Follow Our <span className="gradient-text-gold">Instagram</span></>}
            subtitle="Real customers, real fabrics, real stories. Tag us to be featured!"
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {instagramPosts.map((img, i) => (
              <Reveal key={i} delay={(i % 4) * 0.08}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-xl overflow-hidden block"
                >
                  <img src={img} alt={`Instagram post ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Journal"
            title={<>From Our <span className="gradient-text-gold">Blog</span></>}
            subtitle="Fabric care tips, fashion trends, and stories from the world of textiles."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <button
                  onClick={() => goTo("blog")}
                  className="group text-left w-full"
                >
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
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}

function ProductSection({
  eyebrow, title, subtitle, products: items, cta, bg,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  products: typeof products;
  cta: () => void;
  bg?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${bg || ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} center={false} />
          <button
            onClick={cta}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--gold-dark)] hover:text-[var(--crimson)] transition-colors shrink-0"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <CTAButton onClick={cta} variant="outline">View All <ArrowRight className="w-4 h-4" /></CTAButton>
        </div>
      </div>
    </section>
  );
}

function BannerCTA({
  title, subtitle, bgImage, cta, ctaLabel, align = "center",
}: {
  title: string;
  subtitle: string;
  bgImage: string;
  cta: () => void;
  ctaLabel: string;
  align?: "center" | "left";
}) {
  return (
    <section className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      </div>

      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 ${align === "center" ? "text-center" : "text-left"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs mb-4">
            <Sparkles className="w-3 h-3 text-[var(--gold)]" /> Limited Edition
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 font-serif italic">{subtitle}</p>
          <div className="mt-8">
            <button onClick={cta} className="btn-gold inline-flex items-center gap-2">
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[var(--gold)]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[var(--crimson)]/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--gold)] font-medium mb-3">
            What Customers Say
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Loved by <span className="gradient-text-gold">50,000+</span> Families
          </h2>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                scale: i === active ? 1 : 0.95,
                y: i === active ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 ${i === active ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="text-center max-w-3xl mx-auto">
                <Quote className="w-12 h-12 mx-auto text-[var(--gold)] mb-6 opacity-60" />
                <p className="font-serif text-xl sm:text-2xl leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className={`w-4 h-4 ${s < t.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-white/30"}`} />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--gold)]" />
                  <div className="text-left">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-white/70">{t.location} · Bought {t.product}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-[var(--gold)]" : "w-2 bg-white/30"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Got Questions?"
          title={<>Frequently Asked <span className="gradient-text-gold">Questions</span></>}
          subtitle="Everything you need to know about shopping with Hathras Cutpiece Cloth Centre."
        />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-display text-base sm:text-lg hover:text-[var(--gold-dark)] hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent!", {
      description: "Our team will reach out within 24 hours. Thank you!",
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-b from-background to-[var(--cream)] dark:to-[#0f0a08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Visit or Reach Us"
          title={<>Get in <span className="gradient-text-gold">Touch</span></>}
          subtitle="We'd love to hear from you — whether it's a question, custom order, or just to say hello."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info + Map */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: MapPin, title: "Visit Us", lines: ["Main Market, Chandausi,", "Sambhal, Uttar Pradesh 244411"] },
                { Icon: Phone, title: "Call / WhatsApp", lines: ["+91 98765 43210", "+91 12345 67890"] },
                { Icon: Mail, title: "Email", lines: ["hello@hathrascutpiece.com", "orders@hathrascutpiece.com"] },
                { Icon: Clock, title: "Business Hours", lines: ["Mon–Sat: 9 AM – 9 PM", "Sunday: 10 AM – 6 PM"] },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="p-5 rounded-2xl bg-card border border-border hover:border-[var(--gold)] transition-colors h-full">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--crimson-dark)] to-[var(--gold-dark)] flex items-center justify-center text-white mb-3">
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Map */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border h-64 bg-card">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.78%2C28.44%2C78.80%2C28.47&layer=mapnik&marker=28.4539%2C78.787"
                  className="w-full h-full"
                  loading="lazy"
                  title="Hathras Cutpiece Location"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-display text-xl font-semibold mb-2">Send us a message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone</label>
                  <Input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 ..."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <Textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              <Button type="submit" className="btn-luxe w-full">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
