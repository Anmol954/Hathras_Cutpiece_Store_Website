export type ViewKey =
  | "home"
  | "shop"
  | "product"
  | "category"
  | "about"
  | "gallery"
  | "offers"
  | "blog"
  | "account"
  | "admin"
  | "contact"
  | "track-order"
  | "wishlist";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  mrp: number;
  unit: string; // per meter / per piece
  fabric: string;
  color: string;
  colorHex: string;
  occasion: string[];
  season: string;
  gender: "Men" | "Women" | "Kids" | "Unisex";
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFestival?: boolean;
  isWedding?: boolean;
  images: string[];
  description: string;
  fabricDetails: string;
  care: string;
  width: string;
  weight: string;
  origin: string;
  tags: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  product: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

// ===== Categories =====
export const categories: Category[] = [
  { slug: "cotton", name: "Cotton", description: "Breathable, premium cotton fabrics for everyday elegance", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80", count: 248, icon: "🌿" },
  { slug: "silk", name: "Silk", description: "Luxurious silk weaves for festivals & weddings", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80", count: 156, icon: "✨" },
  { slug: "linen", name: "Linen", description: "Crisp, cool linens for refined summer looks", image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&q=80", count: 92, icon: "🍃" },
  { slug: "rayon", name: "Rayon", description: "Soft, fluid rayon for everyday comfort", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80", count: 134, icon: "💫" },
  { slug: "suit-material", name: "Suit Material", description: "Ready-to-stitch suit pieces & dupattas", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80", count: 320, icon: "👔" },
  { slug: "shirting", name: "Shirting", description: "Premium shirting fabrics for tailored shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80", count: 187, icon: "👕" },
  { slug: "pant-fabric", name: "Pant Fabric", description: "Trousers & formal pant fabrics", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80", count: 89, icon: "👖" },
  { slug: "ladies", name: "Ladies Collection", description: "Curated fabrics for women's wear", image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=80", count: 215, icon: "👗" },
  { slug: "kids", name: "Kids Collection", description: "Soft, playful fabrics for little ones", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80", count: 76, icon: "🧸" },
  { slug: "wedding", name: "Wedding Collection", description: "Bridal & groom fabrics for the big day", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", count: 142, icon: "💍" },
  { slug: "winter", name: "Winter Collection", description: "Wool, velvet & warm blends", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", count: 108, icon: "❄️" },
  { slug: "summer", name: "Summer Collection", description: "Lightweight, airy fabrics for hot days", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80", count: 167, icon: "☀️" },
  { slug: "festival", name: "Festival Collection", description: "Vibrant festive weaves for every celebration", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", count: 189, icon: "🪔" },
  { slug: "school-uniform", name: "School Uniform", description: "Durable uniform fabrics for schools", image: "https://images.unsplash.com/photo-1503920266-1a8ed325a5ed?w=800&q=80", count: 64, icon: "🎒" },
  { slug: "office-wear", name: "Office Wear", description: "Smart, formal fabrics for workwear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", count: 95, icon: "💼" },
  { slug: "designer", name: "Designer Fabric", description: "Exclusive, limited-edition designer weaves", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80", count: 78, icon: "👑" },
  { slug: "printed", name: "Printed Fabric", description: "Trendy printed & patterned materials", image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&q=80", count: 203, icon: "🎨" },
  { slug: "plain", name: "Plain Fabric", description: "Solid-colour versatile basics", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80", count: 178, icon: "⬜" },
  { slug: "embroidery", name: "Embroidery Collection", description: "Hand & machine embroidered beauties", image: "https://images.unsplash.com/photo-1599391448663-90451a97a0fe?w=800&q=80", count: 124, icon: "🪡" },
  { slug: "curtain", name: "Curtain Cloth", description: "Sheer, blackout & decorative drapes", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", count: 87, icon: "🪟" },
  { slug: "sofa", name: "Sofa Fabric", description: "Upholstery-grade sofa & chair fabrics", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", count: 56, icon: "🛋️" },
  { slug: "bedsheets", name: "Bedsheets", description: "Crisp bedsheets & bedding fabrics", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", count: 112, icon: "🛏️" },
  { slug: "home-furnishing", name: "Home Furnishing", description: "Cushions, runners & home textiles", image: "https://images.unsplash.com/photo-1584346133934-2a8aaa9c7c2c?w=800&q=80", count: 134, icon: "🏠" },
  { slug: "accessories", name: "Accessories", description: "Buttons, laces, zips & sewing extras", image: "https://images.unsplash.com/photo-1452860606245-08befc9ff709?w=800&q=80", count: 98, icon: "🧵" },
];

// ===== Image pool (royalty-free Unsplash) =====
const IMG = {
  silk1: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=900&q=80",
  silk2: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900&q=80",
  silk3: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
  silk4: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
  cotton1: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=900&q=80",
  cotton2: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900&q=80",
  cotton3: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
  linen1: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=900&q=80",
  linen2: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=80",
  wedding1: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
  wedding2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
  wedding3: "https://images.unsplash.com/photo-1599391448663-90451a97a0fe?w=900&q=80",
  festive1: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
  festive2: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900&q=80",
  shirting1: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=80",
  shirting2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80",
  ladies1: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=900&q=80",
  ladies2: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=80",
  designer1: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
  designer2: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=900&q=80",
  printed1: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=900&q=80",
  printed2: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
  embroidery1: "https://images.unsplash.com/photo-1599391448663-90451a97a0fe?w=900&q=80",
  embroidery2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
};

const FABRICS = ["Pure Silk", "Cotton Silk", "Linen", "Rayon", "Pure Cotton", "Georgette", "Chiffon", "Velvet", "Brocade", "Crepe"];
const OCCASIONS = ["Wedding", "Festival", "Casual", "Office", "Party", "Pooja", "Daily", "Corporate"];
const COLORS = [
  { name: "Crimson Red", hex: "#9b1c2e" },
  { name: "Royal Gold", hex: "#d4af37" },
  { name: "Ivory", hex: "#f4e4bc" },
  { name: "Emerald", hex: "#0f5132" },
  { name: "Sapphire", hex: "#1e3a5f" },
  { name: "Maroon", hex: "#5c0a1c" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Rose Pink", hex: "#c73659" },
  { name: "Peacock", hex: "#0e7c7b" },
  { name: "Mustard", hex: "#c79a2a" },
  { name: "Cream", hex: "#f3e5d0" },
  { name: "Lavender", hex: "#8b6db5" },
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

// ===== Generate products =====
function genProducts(): Product[] {
  const items: Product[] = [];
  const seedNames = [
    "Banarasi Silk", "Kanjivaram Saree Fabric", "Chanderi Cotton", "Pure Linen Suit", "Rayon Kurta Material",
    "Embroidered Bridal Silk", "Designer Wedding Lehenga Fabric", "Festive Banarasi Brocade", "Premium Shirting Cotton",
    "Formal Pant Fabric", "Velvet Winter Shawl", "Printed Georgette", "Chiffon Saree Fabric", "Soft Cotton Suit",
    "Tussar Silk Material", "Cotton Silk Blend", "Pure Mulberry Silk", "Designer Embroidered Suit",
    "Plain Cotton Shirting", "Printed Rayon Fabric", "Linen Cotton Blend", "Jacquard Wedding Fabric",
    "Designer Lehenga Material", "Pure Cotton Bed Sheet", "Embroidered Dupatta", "Velvet Curtain Fabric",
    "Silk Brocade Material", "Festive Printed Cotton", "Premium Wool Blend", "Cotton School Uniform",
    "Office Formal Shirting", "Casual Cotton Material", "Bridal Red Silk", "Royal Blue Wedding Fabric",
    "Gold Zari Work Silk", "Pure White Cotton", "Pink Chiffon Material", "Yellow Festive Fabric",
    "Green Embroidered Suit", "Maroon Wedding Silk", "Pastel Linen Material", "Designer Cotton Print",
    "Silk Cotton Saree Fabric", "Printed Suit Material", "Plain Rayon Fabric", "Embroidered Kurti Material",
    "Premium Tussar Silk", "Festive Bandhani Print", "Wedding Velvet Fabric", "Casual Linen Blend",
    "Cotton Casual Wear", "Silk Party Wear", "Office Cotton Shirting", "Designer Wedding Suit",
    "Printed Georgette Material", "Pure Crepe Fabric", "Festive Silk Cotton", "Embroidered Wedding Fabric",
    "Premium Cotton Bed Sheet", "Curtain Sheer Fabric", "Cushion Cover Fabric", "Velvet Sofa Upholstery",
  ];

  seedNames.forEach((base, i) => {
    const cat = categories[i % categories.length];
    const color = pick(COLORS, i);
    const fabric = pick(FABRICS, i);
    const isWedding = cat.slug === "wedding" || i % 7 === 0;
    const isFestival = cat.slug === "festival" || i % 5 === 0;
    const isNew = i % 4 === 0;
    const isBest = i % 6 === 0;
    const isTrend = i % 3 === 0;
    const price = 240 + (i * 47) % 4800;
    const mrp = Math.round(price * (1.15 + (i % 5) * 0.07));
    const imgPool = [
      pick(Object.values(IMG), i),
      pick(Object.values(IMG), i + 3),
      pick(Object.values(IMG), i + 7),
      pick(Object.values(IMG), i + 11),
    ];
    items.push({
      id: `P${1000 + i}`,
      name: base,
      slug: base.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: cat.name,
      categorySlug: cat.slug,
      price,
      mrp,
      unit: i % 3 === 0 ? "per piece" : "per meter",
      fabric,
      color: color.name,
      colorHex: color.hex,
      occasion: [pick(OCCASIONS, i), pick(OCCASIONS, i + 2)],
      season: i % 2 === 0 ? "All Season" : i % 3 === 0 ? "Summer" : "Winter",
      gender: cat.slug === "ladies" || cat.slug === "wedding" ? "Women" : cat.slug === "kids" ? "Kids" : i % 2 === 0 ? "Men" : "Unisex",
      brand: i % 4 === 0 ? "Hathras Signature" : i % 3 === 0 ? "Royal Weaves" : i % 2 === 0 ? "Heritage Looms" : "Studio Cutpiece",
      rating: 4 + ((i * 7) % 10) / 10,
      reviewCount: 12 + (i * 23) % 480,
      stock: 5 + (i * 11) % 180,
      isNew,
      isBestSeller: isBest,
      isTrending: isTrend,
      isFestival,
      isWedding,
      images: imgPool,
      description: `${base} crafted with premium ${fabric.toLowerCase()} for ${cat.name.toLowerCase()}. Sourced directly from master weavers, this fabric offers exceptional drape, breathability, and a luxurious hand-feel perfect for ${pick(OCCASIONS, i).toLowerCase()} occasions.`,
      fabricDetails: `100% ${fabric}. GSM: ${120 + (i * 13) % 180}. Width: ${pick(["44 inch", "56 inch", "58 inch", "60 inch"], i)}. Thread count: ${80 + (i * 7) % 200}.`,
      care: "Dry clean recommended for first wash. Gentle hand wash in cold water with mild detergent. Do not bleach. Iron at medium temperature.",
      width: pick(["44 inch", "56 inch", "58 inch", "60 inch"], i),
      weight: `${120 + (i * 13) % 180} GSM`,
      origin: pick(["Banaras", "Kanchipuram", "Chanderi", "Surat", "Jaipur", "Lucknow"], i),
      tags: [fabric.toLowerCase(), cat.slug, color.name.toLowerCase(), pick(OCCASIONS, i).toLowerCase()],
    });
  });
  return items;
}

export const products: Product[] = genProducts();

// ===== Testimonials =====
export const testimonials: Testimonial[] = [
  { id: "T1", name: "Anjali Sharma", location: "Moradabad, UP", rating: 5, text: "The Banarasi silk I bought for my wedding was absolute perfection. The colour, the weave, the drape — everything felt royal. The owner personally helped me choose. Will recommend to every bride!", avatar: "https://i.pravatar.cc/120?img=47", product: "Banarasi Silk" },
  { id: "T2", name: "Rahul Verma", location: "Bareilly, UP", rating: 5, text: "Been buying shirting fabric here for 6 years. The quality is consistently premium and prices are honest. Their cotton breathes beautifully in summer. Best cutpiece store in the region.", avatar: "https://i.pravatar.cc/120?img=12", product: "Premium Shirting Cotton" },
  { id: "T3", name: "Fatima Khan", location: "Sambhal, UP", rating: 5, text: "Found the exact embroidery fabric I wanted for Eid. The collection is unmatched and the staff understood my requirements perfectly. Online ordering was smooth too.", avatar: "https://i.pravatar.cc/120?img=32", product: "Embroidery Collection" },
  { id: "T4", name: "Vikram Singh", location: "Aligarh, UP", rating: 5, text: "Bought bulk suit material for my boutique. Got an excellent wholesale rate and the entire order was ready in 2 days. Quality checked each piece — all flawless. Highly professional team.", avatar: "https://i.pravatar.cc/120?img=15", product: "Suit Material" },
  { id: "T5", name: "Priya Gupta", location: "Chandausi, UP", rating: 5, text: "Their wedding collection made my sister's bridal shopping so special. So many designer options under one roof. The fabric calculator helped estimate exactly how much we needed. Saved money!", avatar: "https://i.pravatar.cc/120?img=23", product: "Wedding Collection" },
  { id: "T6", name: "Mohammed Yusuf", location: "Hathras, UP", rating: 5, text: "The WhatsApp ordering is super convenient — sent a photo, got options in 10 minutes, paid via UPI, fabric delivered next day. Genuine shop, genuine people. Trusted for years.", avatar: "https://i.pravatar.cc/120?img=8", product: "Cotton Suit Material" },
  { id: "T7", name: "Sneha Reddy", location: "Delhi", rating: 5, text: "Visited during festive season. Their Diwali collection is gorgeous — gold zari work, vibrant colours. Got a custom stitched kurta too. Beautifully done. Worth the trip from Delhi!", avatar: "https://i.pravatar.cc/120?img=44", product: "Festival Collection" },
  { id: "T8", name: "Arjun Mehta", location: "Noida, UP", rating: 5, text: "Ordered linen online for office shirts. Photos were accurate, fabric feels premium, packaging was luxurious. Got a handwritten thank-you note. Felt like couture service at fabric-store prices.", avatar: "https://i.pravatar.cc/120?img=33", product: "Linen" },
];

// ===== FAQs =====
export const faqs: FAQItem[] = [
  { q: "Do you offer home delivery outside Chandausi?", a: "Yes! We ship pan-India via trusted courier partners. Orders above ₹2,000 ship free. Standard delivery takes 3-7 business days; express delivery available at checkout for next-day in major cities." },
  { q: "Can I order custom lengths of fabric?", a: "Absolutely. Most fabrics are sold per meter — just enter your required length at checkout. For bulk orders (above 50 meters) or boutique requirements, use the Bulk Order Request form for special wholesale pricing." },
  { q: "Do you provide custom stitching services?", a: "Yes, we offer custom tailoring for kurtas, shirts, suits, and ladies wear through partner master tailors. Mention your measurements at checkout or use the Custom Stitching Request form. Typical turnaround is 7-10 days." },
  { q: "What payment methods do you accept?", a: "We accept Razorpay-secured payments including UPI (Google Pay, PhonePe, Paytm), all major credit/debit cards, net banking, and Cash on Delivery for orders below ₹10,000 within Chandausi & nearby areas." },
  { q: "Are your fabrics genuine and quality-checked?", a: "Every fabric is sourced directly from registered weavers and mills. Each piece is hand-inspected for weave quality, colour-fastness, and defects before dispatch. We provide a 7-day easy return if you're not satisfied." },
  { q: "Do you offer GST billing for businesses?", a: "Yes, we provide proper GST invoices for all orders. For business/bulk orders, share your GST details at checkout or contact us for B2B invoicing. Our GSTIN is printed on every invoice." },
  { q: "Can I request a fabric sample before buying?", a: "Yes! Use the 'Request Sample' button on any product page. Sample swatches (10×10 cm) are sent for ₹50 each (refundable on your next order above ₹1,000). Perfect for matching colours before committing." },
  { q: "How do I track my order?", a: "Once dispatched, you'll receive a tracking link via SMS & WhatsApp. You can also use the 'Track Order' page with your order ID. Live updates are provided at each stage — processing, packed, shipped, out for delivery." },
  { q: "Do you offer festival or seasonal discounts?", a: "Yes! We run major sales during Diwali, Eid, Wedding Season, End-of-Season, and Republic/Independence Day weekends. Subscribe to our newsletter or follow us on Instagram for early-bird coupon codes." },
  { q: "Can I book a video shopping session?", a: "Absolutely! For remote customers, we offer free 30-minute video calls where our stylist shows fabrics live, discusses your needs, and helps you choose. Use the 'Book Video Call' button to schedule." },
];

// ===== Blogs =====
export const blogPosts: BlogPost[] = [
  { id: "B1", title: "Caring for Banarasi Silk: A Complete Guide", excerpt: "Banarasi silk is an heirloom. Learn how to store, wash, and preserve its sheen for generations.", content: "Banarasi silk is woven with real gold or silver zari threads that require special care. Always dry clean for the first wash. Store in muslin cloth, never plastic. Rotate the fold every 3 months to prevent creases from setting. Avoid direct sunlight when drying. Iron on low heat with a cotton cloth between the iron and silk. With proper care, your Banarasi will look new for decades and even generations — many families pass these down as heirlooms.", category: "Fabric Care", author: "Hathras Team", date: "2025-08-14", readTime: "6 min", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=900&q=80", tags: ["silk", "care", "banarasi"] },
  { id: "B2", title: "Wedding Fashion 2025: Colours & Trends to Watch", excerpt: "From dusty rose to deep emerald — discover the colours ruling Indian weddings this year.", content: "2025 weddings are leaning into jewel tones — emerald green, sapphire blue, deep wine — paired with gold zari. Pastels remain popular for daytime functions. Dual-tone fabrics that shift colour in different lighting are the season's standout. Grooms are embracing ivory and gold over conventional maroon. Lehengas are getting lighter and more fluid, moving away from stiff silhouettes. Pair a Banarasi dupatta with a simpler outfit for an instant luxe upgrade.", category: "Wedding Fashion", author: "Hathras Team", date: "2025-09-02", readTime: "8 min", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80", tags: ["wedding", "trends", "2025"] },
  { id: "B3", title: "How to Choose the Right Cotton for Summer", excerpt: "Not all cotton is created equal. Here's how to pick the breeziest fabric for Indian summers.", content: "Look for cotton that's breathable, lightweight (under 120 GSM), and has a loose weave. Pure cotton wrinkles easily but breathes best. Cotton blends with 5-10% polyester resist wrinkles. Poplin weave is smooth and crisp; mulmul (muslin) is feather-light. For Indian summers, avoid synthetic blends above 30%. Check fabric transparency by holding it up to light — too sheer means you'll need lining. Pre-shrink cotton by washing before stitching.", category: "Fashion Tips", author: "Hathras Team", date: "2025-07-20", readTime: "5 min", image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=900&q=80", tags: ["cotton", "summer", "tips"] },
  { id: "B4", title: "Colour Psychology: What Your Outfit Says", excerpt: "Colours influence mood, perception, and even how others respond to you. Here's the science.", content: "Red signals confidence and passion — perfect for parties and festivals. Blue conveys trust and calm — ideal for office wear. Yellow radiates optimism and warmth — great for daytime. Green represents growth and balance — versatile across occasions. Black projects authority and elegance — universally flattering. White symbolises purity and freshness — perfect for poojas. Choose colours that complement your skin undertone: warm undertones suit earthy reds, oranges, golds; cool undertones shine in blues, purples, emerald greens.", category: "Color Guides", author: "Hathras Team", date: "2025-06-15", readTime: "7 min", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80", tags: ["colors", "psychology", "style"] },
  { id: "B5", title: "Latest Fabric Trends: What's New in 2025", excerpt: "Sustainable fabrics, dual-tone weaves, and a return to handloom. Here's what's trending.", content: "2025 is the year of conscious luxury. Handloom fabrics are seeing a massive revival — customers want authenticity and story. Tencel and modal (made from wood pulp) are the new sustainable darlings. Dual-tone fabrics that shift between two colours are everywhere. Embroidery is going tonal — same colour but different textures. Block-printed geometric patterns are replacing florals. Vintage Banarasi revival pieces are collector's items. We're stocking all of these — visit our Designer Collection.", category: "Latest Trends", author: "Hathras Team", date: "2025-10-01", readTime: "6 min", image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=900&q=80", tags: ["trends", "2025", "handloom"] },
  { id: "B6", title: "Festival Outfit Ideas: Diwali to Eid Style Guide", excerpt: "Curated outfit ideas for every Indian festival — from casual family pujas to grand celebrations.", content: "Diwali: Choose gold zari silk or velvet — rich textures match the festive mood. Pair with traditional jewellery. Eid: Pastel georgettes with silver embroidery are elegant. Karwa Chauth: Red or maroon Banarasi is auspicious. Holi: White cotton that you don't mind getting coloured! Raksha Bandhan: Comfortable cotton suits for family time. Pongal/Sankranti: Sunflower yellow or maroon silk. Bhai Dooj: Pastel suits or kurtas. Each festival has its colour story — let the occasion guide your choice.", category: "Fashion Tips", author: "Hathras Team", date: "2025-08-28", readTime: "9 min", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80", tags: ["festival", "diwali", "eid"] },
];

// ===== Brands =====
export const brands = [
  { name: "Hathras Signature", logo: "HS" },
  { name: "Royal Weaves", logo: "RW" },
  { name: "Heritage Looms", logo: "HL" },
  { name: "Studio Cutpiece", logo: "SC" },
  { name: "Banarasi Co.", logo: "BC" },
  { name: "Mughal Threads", logo: "MT" },
];

// ===== Instagram posts =====
export const instagramPosts = [
  "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80",
  "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  "https://images.unsplash.com/photo-1599391448663-90451a97a0fe?w=600&q=80",
];

// ===== Store gallery =====
export const storeGallery = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=80",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80",
];

// ===== Why choose us =====
export const whyChooseUs = [
  { icon: "Award", title: "40+ Years of Trust", text: "Serving Chandausi since 1985 with three generations of textile expertise and unwavering quality commitment." },
  { icon: "Truck", title: "Pan-India Delivery", text: "Free shipping on orders above ₹2,000. Express delivery available. Carefully packed and tracked end-to-end." },
  { icon: "ShieldCheck", title: "Authentic Fabrics", text: "Direct sourcing from weavers & mills. Every piece hand-checked for quality. 7-day easy returns, no questions asked." },
  { icon: "BadgeIndianRupee", title: "Best Wholesale Rates", text: "Honest, transparent pricing. Bulk discounts for boutiques, tailors, schools, and institutions. GST invoicing." },
  { icon: "Headphones", title: "Personal Styling", text: "Free video shopping sessions. Fabric swatches on request. Our team helps you choose the perfect fabric." },
  { icon: "Leaf", title: "Sustainable Sourcing", text: "We support handloom weavers, use recycled packaging, and prefer natural fibres. Fashion that respects the planet." },
];

// ===== Stats =====
export const stats = [
  { label: "Years of Trust", value: 40, suffix: "+" },
  { label: "Happy Customers", value: 50000, suffix: "+" },
  { label: "Fabric Varieties", value: 2500, suffix: "+" },
  { label: "Cities Served", value: 320, suffix: "+" },
  { label: "Master Weavers", value: 180, suffix: "+" },
  { label: "Avg Rating", value: 4.8, suffix: "/5", decimals: 1 },
];

// ===== Offers =====
export const offers = [
  { title: "Diwali Dhamaka Sale", discount: "UP TO 40% OFF", description: "Festive silks, wedding collection & designer fabrics at unbeatable prices. Free gold-gift wrapping above ₹5,000.", code: "DIWALI40", expiry: "Nov 12, 2025", color: "from-amber-500 to-red-600" },
  { title: "Wedding Season Special", discount: "FLAT 25% OFF", description: "Bridal silks, groom sherwanis & family collection. Free custom stitching on orders above ₹10,000.", code: "WEDDING25", expiry: "Dec 31, 2025", color: "from-rose-500 to-pink-700" },
  { title: "New User Bonus", discount: "₹500 OFF", description: "First-time customers get ₹500 off on orders above ₹2,000. Welcome to the Hathras family!", code: "WELCOME500", expiry: "No expiry", color: "from-emerald-500 to-teal-700" },
  { title: "Bulk Order Discount", discount: "UP TO 35% OFF", description: "Boutiques, tailors & retailers — special wholesale rates on bulk orders above 50 meters.", code: "BULK35", expiry: "Always on", color: "from-blue-500 to-indigo-700" },
];

// ===== Trust badges =====
export const trustBadges = [
  { icon: "ShieldCheck", text: "Secure Payments" },
  { icon: "Truck", text: "Fast Delivery" },
  { icon: "RefreshCw", text: "7-Day Returns" },
  { icon: "Phone", text: "24/7 Support" },
  { icon: "Award", text: "Genuine Products" },
  { icon: "BadgeIndianRupee", text: "Best Prices" },
];
