"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileCall } from "@/components/StickyMobileCall";
import { CartProvider } from "@/components/CartProvider";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const minimal =
    pathname?.startsWith("/admin") === true || pathname === "/login" || pathname?.startsWith("/login/") === true;

  if (minimal) {
    return <>{children}</>;
  }

  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />
      <CartProvider>
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        <main className="relative z-10 flex-1 pb-40 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCall />
      </CartProvider>
    </>
  );
}
