import React from "react";
import { KeyRound, LogOut } from "lucide-react";
interface AdminSecurityBarProps {
  onOpenUpdatePassword: () => void;
  onLockAndExit: () => void;
}
export default function AdminSecurityBar({
  onOpenUpdatePassword,
  onLockAndExit
}: AdminSecurityBarProps) {
  return <div className="w-full bg-card border border-border rounded-xl p-3 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs" data-api-unique-id='adminsecuritybar-r8004952788e9fc11-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground" data-api-unique-id='adminsecuritybar-ra66268d4f4d3a46b-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" data-api-unique-id='adminsecuritybar-r885a32747be32f49-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar' />
        <span className="font-semibold text-primary" data-api-unique-id='adminsecuritybar-r2c469c16166dd4bf-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>لوحة التحكم التشغيلية نشطة ومؤمنة</span>
        <span className="text-muted-foreground hidden sm:inline" data-api-unique-id='adminsecuritybar-r9742204235387248-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>|</span>
        <span className="text-muted-foreground text-xs hidden sm:inline" data-api-unique-id='adminsecuritybar-rca85419eae5d3e74-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>تمت المصادقة بنجاح</span>
      </div>

      <div className="flex items-center gap-2" data-api-unique-id='adminsecuritybar-r552794f7800591cc-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>
        <button type="button" onClick={onOpenUpdatePassword} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-muted text-xs font-medium text-secondary-foreground transition-colors cursor-pointer" data-api-unique-id='adminsecuritybar-r4e6135241e0cfbfe-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>
          <KeyRound className="w-3.5 h-3.5 text-primary" data-api-unique-id='adminsecuritybar-r68928ab472738b25-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar' />
          <span data-api-unique-id='adminsecuritybar-r6fb89346615890e3-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>تحديث كلمة سر لوحة التحكم</span>
        </button>

        <button type="button" onClick={onLockAndExit} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/10 hover:bg-destructive/20 text-xs font-medium text-destructive transition-colors cursor-pointer" data-api-unique-id='adminsecuritybar-rce482a6fd9c55b05-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>
          <LogOut className="w-3.5 h-3.5" data-api-unique-id='adminsecuritybar-re195f699fc665b76-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar' />
          <span data-api-unique-id='adminsecuritybar-r410a3b04c3f7f4fc-s3101309285' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminSecurityBar'>قفل وخروج 🔒</span>
        </button>
      </div>
    </div>;
}