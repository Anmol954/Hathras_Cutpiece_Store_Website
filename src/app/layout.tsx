import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/luxury/theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hathras Cutpiece Cloth Centre | Premium Fabrics & Textiles in Chandausi",
  description:
    "Discover premium fabrics, silk, cotton, linen, wedding collections & designer textiles at Hathras Cutpiece Cloth Centre, Chandausi, Uttar Pradesh. Quality you can trust since 1985.",
  keywords: [
    "Hathras Cutpiece",
    "Chandausi cloth centre",
    "fabric store Uttar Pradesh",
    "silk fabric India",
    "wedding collection fabric",
    "suit material Chandausi",
    "premium textiles India",
    "cotton fabric wholesale",
  ],
  authors: [{ name: "Hathras Cutpiece Cloth Centre" }],
  creator: "Hathras Cutpiece Cloth Centre",
  metadataBase: new URL("https://hathrascutpiece.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hathras Cutpiece Cloth Centre | Premium Fabrics & Textiles",
    description:
      "Premium fabrics, wedding collections, designer textiles in Chandausi, UP. Quality you can trust since 1985.",
    url: "https://hathrascutpiece.com",
    siteName: "Hathras Cutpiece Cloth Centre",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hathras Cutpiece Cloth Centre",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hathras Cutpiece Cloth Centre | Premium Fabrics",
    description:
      "Premium fabrics, wedding collections, designer textiles in Chandausi, UP.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "shopping",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Hathras Cutpiece Cloth Centre",
  description:
    "Premium fabrics and textiles store in Chandausi, Uttar Pradesh, India.",
  image: "https://hathrascutpiece.com/og-image.jpg",
  "@id": "https://hathrascutpiece.com",
  url: "https://hathrascutpiece.com",
  telephone: "+91-9876543210",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Market, Chandausi",
    addressLocality: "Chandausi",
    addressRegion: "Uttar Pradesh",
    postalCode: "244411",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.4539,
    longitude: 78.787,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1247",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
