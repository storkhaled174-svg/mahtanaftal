"use client";

import React from "react";
import NaftalBrandHeader from "@/frontend/components/CustomerLogin/NaftalBrandHeader";
import CustomerAuthCard from "@/frontend/components/CustomerLogin/CustomerAuthCard";
import InstitutionalTrustSection from "@/frontend/components/CustomerLogin/InstitutionalTrustSection";
export default function CustomerLoginPage() {
  return <div dir="rtl" className="min-h-screen w-full bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden font-body">
      {/* Background Subtle Sovereign Glow Gradients (Theme Token compliant) */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(250,235,26,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(20,48,103,0.25)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Naftal Brand Identity Header */}
      <NaftalBrandHeader />

      {/* Centerpiece Content Area */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center relative z-10">
        {/* Main Sovereign Authentication Centerpiece */}
        <CustomerAuthCard />

        {/* Supporting Institutional Trust & Brands Section */}
        <InstitutionalTrustSection />
      </main>
    </div>;
}
