"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Sparkles, Building2 } from "lucide-react";
import { CustomerLogin } from "@/frontend/route-params";
export default function PortalHeader() {
  const router = useRouter();
  return <header className="w-full border-b border-border/60 bg-card/60 backdrop-blur-md" data-api-unique-id='portalheader-rc44c024d81fdb7de-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5" data-api-unique-id='portalheader-r54f97f2135fd1d1d-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
        <div className="flex flex-wrap items-center justify-between gap-4" data-api-unique-id='portalheader-ra182db3e9a7d0ea9-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
          {/* Brand & Sovereign Emblem */}
          <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1" data-api-unique-id='portalheader-r0c670db30727da32-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
            {/* Geometric Official Naftal Badge */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-gold font-display font-black text-xl tracking-wider" data-api-unique-id='portalheader-r7028f688dd9e6915-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
              <span data-api-unique-id='portalheader-rd9b1e70d783eea31-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>ن</span>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[9px] font-bold border border-primary" data-api-unique-id='portalheader-r0a28b54b4f965cc1-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
                ★
              </div>
            </div>

            <div className="flex flex-col" data-api-unique-id='portalheader-rfd4ec24cabc8799b-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
              <div className="flex items-center gap-2" data-api-unique-id='portalheader-rf289e032d361acc7-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
                <span className="font-display text-lg font-bold tracking-tight text-foreground" data-api-unique-id='portalheader-r57920889ed8273a0-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
                  نفطال محطتي
                </span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-header font-bold text-primary border border-primary/20" data-api-unique-id='portalheader-r0e2230be793a4ae9-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
                  NAFTAL MHATATI
                </span>
              </div>
              <span className="font-body text-xs text-muted-foreground flex items-center gap-1.5" data-api-unique-id='portalheader-r7d0abb2e40b49056-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
                <Building2 className="h-3 w-3 text-primary" data-api-unique-id='portalheader-r578336052f4ac1db-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader' />
                المنصة الوطنية لتوزيع الإطارات المعتمدة • فرع سوناطراك
              </span>
            </div>
          </Link>

          {/* National Digital Emblem & Login Quick Access */}
          <div className="flex items-center gap-3" data-api-unique-id='portalheader-rd1a8040a531fc401-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs text-muted-foreground font-body" data-api-unique-id='portalheader-rbf48cf6184df0c6f-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
              <Shield className="h-3.5 w-3.5 text-primary" data-api-unique-id='portalheader-r11672747d92b8c70-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader' />
              <span data-api-unique-id='portalheader-rf100a23d0c5f2b34-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>بوابة المعاملات الحكومية المؤمنة</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" data-api-unique-id='portalheader-r92dd7568b01de0b5-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader' />
            </div>

            {/* Quick Link to Login */}
            <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary text-secondary-foreground px-3.5 py-1.5 text-xs font-header font-semibold hover:bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" data-api-unique-id='portalheader-rc7573c3fee721f83-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>
              <span data-api-unique-id='portalheader-r0576c972e8d0220a-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader'>دخول الزبون</span>
              <Sparkles className="h-3 w-3 text-primary" data-api-unique-id='portalheader-rd655d48796657a0a-s1357179639' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalHeader' />
            </button>
          </div>
        </div>
      </div>
    </header>;
}