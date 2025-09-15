import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ProMerchants - Scale Your E-commerce Business 10x Faster",
  description: "The most powerful e-commerce platform with AI-powered automation, enterprise-grade security, and lightning-fast performance. Start your 30-day free trial today.",
  keywords: "e-commerce platform, online store, AI-powered, conversion optimization, performance, security, scalability",
  authors: [{ name: "ProMerchants Team" }],
  creator: "ProMerchants",
  publisher: "ProMerchants",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promerchants.com",
    title: "ProMerchants - Scale Your E-commerce Business 10x Faster",
    description: "The most powerful e-commerce platform with AI-powered automation, enterprise-grade security, and lightning-fast performance.",
    siteName: "ProMerchants",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProMerchants - Scale Your E-commerce Business 10x Faster",
    description: "The most powerful e-commerce platform with AI-powered automation, enterprise-grade security, and lightning-fast performance.",
    creator: "@promerchants",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
