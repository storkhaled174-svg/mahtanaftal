"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogIn, ShieldAlert } from "lucide-react";
import { AdminLogin } from "@/backend/route-params";
export default function RegisterCardFooter() {
  const router = useRouter();
  return <div className="pt-4 border-t border-border/70 text-center space-y-3" data-api-unique-id='registercardfooter-ra7ec29b1094a9177-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>
      {/* Return to Admin Login Link */}
      <div className="flex items-center justify-center gap-2 text-xs font-body text-muted-foreground" data-api-unique-id='registercardfooter-r3bc193eb163d1d6f-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>
        <span data-api-unique-id='registercardfooter-rbb7658edb5fad16a-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>تمتلك حساب مشرف معتمد مسبقاً؟</span>
        <button type="button" onClick={() => AdminLogin.navigateTo(router)} className="text-primary hover:underline font-semibold font-header flex items-center gap-1 transition-colors cursor-pointer bg-transparent border-none p-0" title="الانتقال إلى تسجيل الدخول الإداري" data-api-unique-id='registercardfooter-r035a2d19c2587ea3-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>
          <LogIn className="h-3.5 w-3.5" data-api-unique-id='registercardfooter-r199a0f20a130245e-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter' />
          <span data-api-unique-id='registercardfooter-r3547f61be460b0c9-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>تسجيل الدخول للإدارة</span>
        </button>
      </div>

      {/* Security Audit Badge & Footnote */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/80 font-mono" data-api-unique-id='registercardfooter-re6790e351c8c455a-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>
        <ShieldAlert className="h-3 w-3 text-warning" data-api-unique-id='registercardfooter-r81741458aeec10b0-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter' />
        <span data-api-unique-id='registercardfooter-r2c5c83c83f88d2b9-s3155497515' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterCardFooter'>نظام التدقيق الرقمي ومراقبة النشاط الإداري لنفطال © 2026</span>
      </div>
    </div>;
}