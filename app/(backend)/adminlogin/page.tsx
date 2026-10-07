"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AdminRegister } from "@/backend/route-params";
import AdminSecurityHeader from "@/backend/components/AdminLogin/AdminSecurityHeader";
import AdminAuthCard from "@/backend/components/AdminLogin/AdminAuthCard";
import AdminSecurityFooter from "@/backend/components/AdminLogin/AdminSecurityFooter";
export default function AdminLoginPage() {
  const router = useRouter();
  const handleNavigateToRegister = () => {
    AdminRegister.navigateTo(router);
  };
  return <div dir="rtl" className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle sovereign background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main sovereign authentication vault card */}
      <div data-controller-name="بوابة تسجيل الدخول الإداري" className="w-full max-w-[460px] bg-card text-card-foreground rounded-xl border border-border p-6 sm:p-8 shadow-card flex flex-col gap-6 relative z-10">
        {/* Header with official branding and security alerts */}
        <AdminSecurityHeader />

        {/* Core Administrative Authentication Form */}
        <AdminAuthCard onNavigateToRegister={handleNavigateToRegister} />

        {/* Security & national inventory protocol footer */}
        <AdminSecurityFooter />
      </div>
    </div>;
}
