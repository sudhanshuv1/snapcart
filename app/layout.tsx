import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { OurguideToolsRegistrar } from "@/components/OurguideToolsRegistrar";

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
  title: {
    default: "ShopClone",
    template: "%s | ShopClone",
  },
  description: "Your one-stop online shop",
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
        <AuthProvider>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <OurguideToolsRegistrar />
          </AppProvider>
        </AuthProvider>
        <Script 
          src="/ourguide-b2b-widget.iife.js"
          data-api-url="https://ourguide-b2-b.vercel.app"
          data-product-id="prod_ba70c68d-5282-4da1-ba99-c46daddf4fa3"
          data-agent-name="Assistant"
        ></Script>
      </body>
    </html>
  );
}
