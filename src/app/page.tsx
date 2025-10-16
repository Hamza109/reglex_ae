"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import Footer from "@/components/Footers/Footer";
import ContactDialog from "@/components/ContactDialog";

// Section components (lazy where appropriate)
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: true });
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});
const ReglexEdge = dynamic(() => import("@/components/sections/ReglexEdge"), {
  ssr: false,
});
const FoundingInsight = dynamic(
  () => import("@/components/sections/FoundingInsight"),
  { ssr: false }
);
const FounderProfile = dynamic(
  () => import("@/components/sections/FounderProfile"),
  { ssr: false }
);
const AdvisoryPortfolio = dynamic(
  () => import("@/components/sections/AdvisoryPortfolio"),
  { ssr: false }
);
const Cta = dynamic(() => import("@/components/sections/Cta"), { ssr: false });

export default function Home() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);
  }, []);

  // Always force scroll to top on initial mount (even if URL has a hash)
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const id = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
    return () => window.clearTimeout(id);
  }, [mounted]);

  // Auto-open contact dialog after ~3.5s on first visit
  useEffect(() => {
    if (!mounted) return;
    const timer = window.setTimeout(() => setIsContactDialogOpen(true), 3500);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className='bg-white'>
        <IndexNavbar fixed />
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto'></div>
            <p className='mt-4 text-slate-600'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white overflow-x-hidden'>
      <IndexNavbar fixed onOpenContact={() => setIsContactDialogOpen(true)} />

      <Hero />
      <About />
      <ReglexEdge />
      <FoundingInsight />
      {/* <FounderProfile /> */}
      <AdvisoryPortfolio />

      <Footer onOpenContact={() => setIsContactDialogOpen(true)} />

      <ContactDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      />
    </div>
  );
}
