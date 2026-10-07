"use client";

import React from "react";
import { ShieldCheck, Lock, Building2 } from "lucide-react";
export default function AdminSecurityHeader() {
  return <div className="flex flex-col items-center text-center gap-3" data-api-unique-id='adminsecurityheader-r084d7c9e5b2a2417-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
      {/* Naftal Brand Icon & Emblem */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary border border-border shadow-sm" data-api-unique-id='adminsecurityheader-r0abb1b76e2229d4a-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card" data-api-unique-id='adminsecurityheader-rcd58b2e1af145094-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader' />
        <Building2 className="w-8 h-8 text-primary" data-api-unique-id='adminsecurityheader-r37583884c13e1d22-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader' />
      </div>

      {/* Brand Title and Portal Identity */}
      <div className="space-y-1" data-api-unique-id='adminsecurityheader-rbb3d3a8784168cea-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
        <div className="flex items-center justify-center gap-2" data-api-unique-id='adminsecurityheader-r3c93b70e52c8f6e7-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20" data-api-unique-id='adminsecurityheader-r1a810a5678c13bd7-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
            نفطال محطتي — البوابة السيادية
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display" data-api-unique-id='adminsecurityheader-ra2bc34b5ae5a3ced-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
          بوابة الإدارة المركزية والرقابة السيادية
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-body max-w-sm" data-api-unique-id='adminsecurityheader-rf153b2d4f282f9d3-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
          محطة التحقق الأمني الموحدة لمشرفي توزيع الإطارات الوطنية ومتابعة المخزون عبر 58 ولاية
        </p>
      </div>

      {/* Sovereignty Security Badge */}
      <div className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-muted border border-border text-xs text-muted-foreground text-right" data-api-unique-id='adminsecurityheader-r3d2601900663bfa7-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
        <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='adminsecurityheader-rbb5a23c806dcd0ea-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader' />
        <span className="flex-1 font-body" data-api-unique-id='adminsecurityheader-rb89077e9659a3224-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader'>
          الولوج مقصور حصرياً على مسؤولي المراكز والمشرفين المعتمدين لعلامتي Continental و Iris
        </span>
        <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" data-api-unique-id='adminsecurityheader-r93a09202a1e45736-s3671378023' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityHeader' />
      </div>
    </div>;
}