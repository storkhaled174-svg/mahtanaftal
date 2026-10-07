"use client";

import React from "react";
import { ShieldCheck, Cpu, Database } from "lucide-react";
export default function AdminSecurityFooter() {
  return <div className="w-full pt-4 border-t border-border flex flex-col gap-2.5 text-center" data-api-unique-id='adminsecurityfooter-rec45d4e2a1ac3835-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
      {/* Encryption & Protocol Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground font-body" data-api-unique-id='adminsecurityfooter-r07722b7702b6b0b1-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
        <div className="flex items-center gap-1.5" data-api-unique-id='adminsecurityfooter-ra02dc3a599c3e850-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
          <Cpu className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='adminsecurityfooter-r68135f71ed5a0bd0-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter' />
          <span data-api-unique-id='adminsecurityfooter-ra96f22792619e099-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>تشفير سيادي SHA-256</span>
        </div>
        <span className="text-border" data-api-unique-id='adminsecurityfooter-re92d6c04c7585604-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>•</span>
        <div className="flex items-center gap-1.5" data-api-unique-id='adminsecurityfooter-r9f4efd9357631116-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
          <Database className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='adminsecurityfooter-r7478abf6e04fdbc9-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter' />
          <span data-api-unique-id='adminsecurityfooter-r5c7ec293f7b972b0-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>قاعدة بيانات المخزون الوطني</span>
        </div>
        <span className="text-border" data-api-unique-id='adminsecurityfooter-rd1e959c46e756b39-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>•</span>
        <div className="flex items-center gap-1.5" data-api-unique-id='adminsecurityfooter-r3cbac4b766cb5e57-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='adminsecurityfooter-racf1b4ac3da818b4-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter' />
          <span data-api-unique-id='adminsecurityfooter-r373010a526d9f494-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>تغطية 58 ولاية</span>
        </div>
      </div>

      {/* Official Footnote */}
      <p className="text-[10px] text-muted-foreground" data-api-unique-id='adminsecurityfooter-ra5fe690710f74c09-s2008270160' data-api-unique-page-name='src/backend/components/AdminLogin/AdminSecurityFooter'>
        جميع العمليات والولوج مسجلة ومراقبة أمنياً وفق بروتوكول مؤسسة نفطال الجزائرية
      </p>
    </div>;
}