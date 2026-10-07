"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CustomerLogin } from "@/frontend/route-params";
export default function PortalFooter() {
  const router = useRouter();
  return <footer className="w-full border-t border-border/60 bg-card/80 mt-12 py-8" data-api-unique-id='portalfooter-rec951663ed48ae0c-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='portalfooter-r83bc0518a1102dd4-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right" data-api-unique-id='portalfooter-r48e4e51517d7c6b6-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
          {/* Official Entity Statement */}
          <div className="space-y-1" data-api-unique-id='portalfooter-rd4a8832d98d6205e-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
            <p className="font-header text-xs font-bold text-foreground" data-api-unique-id='portalfooter-r0f8916e1e1a939ad-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
              الجمهورية الجزائرية الديمقراطية الشعبية — شركة نفطال ش.ذ.م.م (فرع سوناطراك)
            </p>
            <p className="font-body text-[11px] text-muted-foreground" data-api-unique-id='portalfooter-rce9d1a3774ba2f73-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
              المنصة الرقمية الوطنية المعتمدة لتوزيع إطارات السيارات للمواطنين • جميع الحقوق محفوظة © {new Date().getFullYear()}
            </p>
          </div>

          {/* Quick Support & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-body text-muted-foreground" data-api-unique-id='portalfooter-r2247acb4a95e0e00-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
            <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1" data-api-unique-id='portalfooter-rf090337b294c81f2-s2037991559' data-api-unique-page-name='src/frontend/components/CustomerRegister/PortalFooter'>
              دخول الزبون
            </button>
          </div>
        </div>
      </div>
    </footer>;
}