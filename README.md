# Hathras Cutpiece Cloth Centre — Luxury E-Commerce Website

Premium, responsive luxury clothing e-commerce website built for Hathras Cutpiece Cloth Centre, Chandausi, Uttar Pradesh, India.

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion
- **State**: Zustand (with persistence)
- **Database**: Prisma ORM (SQLite client — swap to MongoDB/Postgres for production)
- **Auth**: NextAuth.js v4 (ready to wire)
- **Icons**: Lucide React
- **Fonts**: Playfair Display + Inter + Cormorant Garamond (Google Fonts)

## Quick Start

```bash
# 1. Install dependencies
bun install
# or: npm install / pnpm install

# 2. Set up the database (optional — site works with mock data)
bun run db:push

# 3. Run the dev server
bun run dev

# 4. Open http://localhost:3000
```

## Build for Production

```bash
bun run build
bun run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, theme, SEO, JSON-LD schema
│   ├── page.tsx            # View router with AnimatePresence transitions
│   └── globals.css         # Luxury palette + 20+ animations
├── components/
│   ├── luxury/
│   │   ├── navbar.tsx              # Sticky glassmorphic nav with mega-menu
│   │   ├── hero.tsx                # Parallax hero with particles
│   │   ├── footer.tsx              # Wave footer with newsletter
│   │   ├── product-card.tsx        # Hover lift + glow product card
│   │   ├── home-view.tsx           # 12 home sections
│   │   ├── shop-view.tsx           # Shop with filters
│   │   ├── product-detail-view.tsx # Product page with zoom gallery
│   │   ├── other-views.tsx         # About/Gallery/Offers/Blog/Account/Admin/Contact/TrackOrder
│   │   ├── drawers.tsx             # Cart, Wishlist, Search overlay
│   │   ├── floating-actions.tsx    # WhatsApp, back-to-top, scroll progress
│   │   ├── shared.tsx              # SectionHeader, AnimatedCounter, etc.
│   │   └── theme-provider.tsx
│   └── ui/                 # shadcn/ui components (50+)
└── lib/
    ├── data.ts             # 60 products, 24 categories, testimonials, blogs, FAQs
    ├── store.ts            # Zustand store (cart, wishlist, filters, coupons)
    └── utils.ts            # cn() helper
```

## Features

### Pages (12)
- Home, Shop, Product Detail, Category, About, Gallery, Offers, Blog, Account, Admin, Contact, Track Order

### E-Commerce
- Cart with coupon system (try `DIWALI40`, `WEDDING25`, `WELCOME500`, `BULK35`, `HATHRAS10`)
- Wishlist (persisted)
- Recently viewed
- WhatsApp one-click ordering
- Search overlay with live results
- Advanced filters (fabric, color, occasion, gender, season, price, in-stock)

### Design
- Red / White / Gold / Black luxury palette
- Glassmorphism throughout
- Dark mode (next-themes)
- Mobile-first responsive
- Animated counters, parallax, particles
- 20+ keyframe animations

### SEO
- ClothingStore JSON-LD structured data
- OpenGraph + Twitter cards
- Semantic HTML
- Optimized metadata

## Coupon Codes (Demo)
| Code | Discount |
|------|----------|
| DIWALI40 | 40% off |
| WEDDING25 | 25% off |
| WELCOME500 | ₹500 off |
| BULK35 | 35% off |
| HATHRAS10 | 10% off |

## Customization
- **Products**: Edit `src/lib/data.ts`
- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Coupons**: Edit `COUPONS` map in `src/lib/store.ts`
- **Business info**: Update address/phone in footer, contact, and schema in `layout.tsx`

## Production Notes
- Replace mock data with real Prisma queries
- Wire Razorpay payment gateway (server-side webhook)
- Add Google Maps API key for Directions
- Upload real product images to Cloudinary
- Configure NextAuth providers (Google, email/OTP)
- Add reCAPTCHA + rate limiting for forms

## License
© Hathras Cutpiece Cloth Centre. All rights reserved.
