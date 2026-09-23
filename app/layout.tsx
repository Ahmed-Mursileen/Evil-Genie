import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Rubik_Spray_Paint } from "next/font/google";
import "./globals.css";

const spray = Rubik_Spray_Paint({
  variable: "--font-spray",
  weight: "400",
  subsets: ["latin"],
});

const painted = Barlow_Condensed({
  variable: "--font-painted",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "Evil Genie · Har murad poori",
  description: "Write your wish on the wall. It will be granted. Qeemat baad mein.",
  openGraph: {
    title: "Evil Genie",
    description: "Write your wish on the wall. It will be granted. Qeemat baad mein.",
    images: ["/api/og"],
  },
};

export const viewport: Viewport = {
  themeColor: "#15101d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spray.variable} ${painted.variable}`}>
      <head>
        {/* Only the glyphs of the Urdu headline are downloaded, via Google Fonts' text subsetting. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@700&display=swap&text=${encodeURIComponent("ہر مراد پوری")}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
