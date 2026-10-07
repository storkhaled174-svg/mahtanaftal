"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Home } from "lucide-react";
import { HomePage } from "@/frontend/route-params";
export default function NaftalBrandHeader() {
  const router = useRouter();
  return <header className="w-full border-b border-border/60 bg-card/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between" data-api-unique-id='naftalbrandheader-r63250c03f215c986-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
      {/* Right side in RTL: Official Brand Logo & Identity */}
      <div className="flex items-center gap-3 sm:gap-4" data-api-unique-id='naftalbrandheader-r9350a5052de95fab-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
        <button type="button" onClick={() => HomePage.navigateTo(router)} className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1 text-right" aria-label="العودة إلى الصفحة الرئيسية لمنصة نفطال محطتي" data-api-unique-id='naftalbrandheader-re1f8e83704f7c8af-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
          {/* Stylized Naftal Geometric Emblem */}
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-gold border border-accent" data-api-unique-id='naftalbrandheader-r933c4d52322ae0df-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
            <span className="font-display font-black text-xl text-primary-foreground tracking-tighter" data-api-unique-id='naftalbrandheader-ra1a7280e268fef81-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
              N
            </span>
          </div>

          <div className="flex flex-col" data-api-unique-id='naftalbrandheader-r128a1d5390db91dc-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
            <div className="flex items-center gap-2" data-api-unique-id='naftalbrandheader-r9a32fed88e9edfe6-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
              <span className="font-display font-extrabold text-lg sm:text-xl text-foreground tracking-tight group-hover:text-primary transition-colors" data-api-unique-id='naftalbrandheader-r0c8dcc4fda99359a-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
                نفطال محطتي
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-header font-bold bg-primary text-primary-foreground" data-api-unique-id='naftalbrandheader-r01ee9ec682956e53-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
                المنصة الوطنية
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-body" data-api-unique-id='naftalbrandheader-r0026929f62aa2b5e-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
              بوابة حجز إطارات المركبات الرسمية • 58 ولاية
            </span>
          </div>
        </button>
      </div>

      {/* Left side in RTL: Quick Nav and Institutional Assurance */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs font-header" data-api-unique-id='naftalbrandheader-rdbf73cbeb238c915-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-muted-foreground border border-border/70" data-api-unique-id='naftalbrandheader-r20471ac333b26250-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
          <ShieldCheck className="w-4 h-4 text-primary" data-api-unique-id='naftalbrandheader-rec77ad1b6d8932ab-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader' />
          <span data-api-unique-id='naftalbrandheader-r6c73d3d7ffef45ec-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>فضاء مواطن معتمد ومشفّر</span>
        </div>

        <button type="button" onClick={() => HomePage.navigateTo(router)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='naftalbrandheader-rb4d17f1714d22e8b-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>
          <Home className="w-3.5 h-3.5 text-primary" data-api-unique-id='naftalbrandheader-r5ae4769d7b12b074-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader' />
          <span className="hidden sm:inline" data-api-unique-id='naftalbrandheader-r94578021d6fcc51d-s1860427655' data-api-unique-page-name='src/frontend/components/CustomerLogin/NaftalBrandHeader'>الرئيسية</span>
        </button>
      </div>
    </header>;
}