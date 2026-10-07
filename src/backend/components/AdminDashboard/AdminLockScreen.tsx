import React from "react";
import { Lock, Key, Eye, EyeOff, ShieldCheck, ShieldAlert, Unlock } from "lucide-react";
interface AdminLockScreenProps {
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  passwordError: string;
  setPasswordError: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  isVerifying: boolean;
  onUnlock: (e?: React.FormEvent) => void;
}
export default function AdminLockScreen({
  passwordInput,
  setPasswordInput,
  passwordError,
  setPasswordError,
  showPassword,
  setShowPassword,
  isVerifying,
  onUnlock
}: AdminLockScreenProps) {
  return <div dir="rtl" className="w-full max-w-full min-w-0 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-muted/20 font-body" data-api-unique-id='adminlockscreen-red8575c853de8f88-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
      <div className="w-full max-w-md bg-card text-card-foreground border border-border shadow-xl rounded-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200" data-api-unique-id='adminlockscreen-ra3bb2d853fda17eb-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
        {/* Sovereign Blue Header */}
        <div className="bg-[#143067] text-white p-6 flex flex-col items-center text-center relative" data-api-unique-id='adminlockscreen-r0598a0734a3b3ba1-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-3 text-[#FAEB1A] shadow-inner" data-api-unique-id='adminlockscreen-rbd02477ca1915f29-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            <Lock className="w-7 h-7" data-api-unique-id='adminlockscreen-r1602af8fb30ff834-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
          </div>
          <h1 className="text-xl font-bold font-header tracking-tight" data-api-unique-id='adminlockscreen-r776bb5f0390368b0-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>قفل أمان لوحة إدارة الطلبيات</h1>
          <p className="text-xs text-blue-100/80 mt-1 max-w-xs" data-api-unique-id='adminlockscreen-rc9453e0f1ca4924a-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            منصة نفطال الرسمية لتسيير طلبيات حجز إطارات المركبات
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-medium text-[#FAEB1A] border border-white/10" data-api-unique-id='adminlockscreen-rba380a976004aab4-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            <ShieldCheck className="w-3.5 h-3.5" data-api-unique-id='adminlockscreen-r2645ffa12336e8e5-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
            <span data-api-unique-id='adminlockscreen-r9172242ad40fb8a0-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>مساحة وصول مؤمنة ومعتمدة</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={onUnlock} className="p-6 space-y-5" data-api-unique-id='adminlockscreen-r37226ae1d1f12cde-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
          <div className="space-y-1.5" data-api-unique-id='adminlockscreen-r8a26ce9cd2c8a8aa-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            <label className="text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='adminlockscreen-re64d303ed6f73ca3-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
              <span className="flex items-center gap-1" data-api-unique-id='adminlockscreen-r65eb5f544e52fe1f-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
                <Key className="w-3.5 h-3.5 text-primary" data-api-unique-id='adminlockscreen-r69e1ccbe3a3959d6-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
                كلمة سر الإدارة (الرمز الأمني):
              </span>
              <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='adminlockscreen-r1cde40f5f14cd699-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
                افتراضي: bach na9ch / naftal2026
              </span>
            </label>

            <div className="relative" data-api-unique-id='adminlockscreen-rdc5083032dc1c0e6-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
              <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={e => {
              setPasswordInput(e.target.value);
              if (passwordError) setPasswordError("");
            }} placeholder="أدخل كلمة السر لفتح اللوحة..." className="w-full h-11 px-3.5 pl-10 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono" autoFocus data-api-unique-id='adminlockscreen-ra1dc472ed334a605-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer" title={showPassword ? "إخفاء" : "إظهار"} data-api-unique-id='adminlockscreen-r89931c86c7d6f715-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
                {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='adminlockscreen-r9004c272fe63643a-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' /> : <Eye className="w-4 h-4" data-api-unique-id='adminlockscreen-r18a8aac7ac1daae5-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />}
              </button>
            </div>

            {passwordError && <div className="flex items-center gap-1.5 text-xs text-destructive pt-1" data-api-unique-id='adminlockscreen-re5f59b5efb8f5ecd-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" data-api-unique-id='adminlockscreen-r587ca8e1e004dc9a-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
                <span data-api-unique-id='adminlockscreen-re8a224047fc3d0c2-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>{passwordError}</span>
              </div>}
          </div>

          <button type="submit" disabled={isVerifying || !passwordInput.trim()} className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" data-api-unique-id='adminlockscreen-reea4dbfc07bd314c-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            {isVerifying ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" data-api-unique-id='adminlockscreen-r6b8f9a05bf6c4373-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' /> : <>
                <Unlock className="w-4 h-4" data-api-unique-id='adminlockscreen-r2742dc76b197575e-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen' />
                <span data-api-unique-id='adminlockscreen-r8984940cd382e4a2-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>تأكيد الرمز وفك القفل</span>
              </>}
          </button>

          <div className="pt-2 border-t border-border/60 text-center" data-api-unique-id='adminlockscreen-r8c09323ff29dca75-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
            <p className="text-[11px] text-muted-foreground leading-relaxed" data-api-unique-id='adminlockscreen-r26983d584de3fb34-s2685343867' data-api-unique-page-name='src/backend/components/AdminDashboard/AdminLockScreen'>
              هذا القفل مخصص لحماية بيانات الزبائن وطلبيات الإطارات الوطنية. إذا واجهتك مشكلة، تواصل مع المشرف العام.
            </p>
          </div>
        </form>
      </div>
    </div>;
}