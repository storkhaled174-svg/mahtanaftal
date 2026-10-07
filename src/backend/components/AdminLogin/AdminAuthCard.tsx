"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, KeyRound, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { loginAdmin } from "@/backend/actions/AdminLogin";
import { AdminLoginFormState } from "@/backend/types/AdminLogin";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminDashboard, AdminRegister } from "@/backend/route-params";
interface AdminAuthCardProps {
  onSubmitLogin?: (data: AdminLoginFormState) => Promise<void>;
  onNavigateToRegister?: () => void;
  isLoading?: boolean;
}
export default function AdminAuthCard({
  onSubmitLogin,
  onNavigateToRegister,
  isLoading = false
}: AdminAuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    set
  } = useAdminSession();
  const [formData, setFormData] = useState<AdminLoginFormState>({
    usernameOrPhone: "",
    passwordHash: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const activeLoading = isLoading || submitting;
  const validate = () => {
    const errors: {
      [key: string]: string;
    } = {};
    if (!formData.usernameOrPhone.trim()) {
      errors.usernameOrPhone = "يرجى إدخال معرف المشرف أو رقم الهاتف المهني";
    }
    if (!formData.passwordHash) {
      errors.passwordHash = "يرجى إدخال كلمة المرور المعتمدة";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة للمصادقة الإدارية");
      return;
    }
    setSubmitting(true);
    try {
      const result = await loginAdmin({
        usernameOrPhone: formData.usernameOrPhone.trim(),
        password: formData.passwordHash
      });
      set({
        token: result.token,
        user_id: result.user.id,
        username: result.user.username,
        role: "ADMIN"
      });
      toast.success("تم تسجيل الدخول بنجاح");
      if (onSubmitLogin) {
        await onSubmitLogin(formData);
      }
      const redirect = searchParams.get("redirect");
      if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
        router.push(redirect);
      } else {
        AdminDashboard.navigateTo(router);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "تعذر التحقق من بيانات الاعتماد الإدارية";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  const handleRegisterClick = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      AdminRegister.navigateTo(router);
    }
  };
  return <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" data-api-unique-id='adminauthcard-r3c5f27b7fc035d36-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
      {/* Account / Username or Phone Field */}
      <div className="flex flex-col gap-1.5 text-right" data-api-unique-id='adminauthcard-r83b3fc285295cab4-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
        <label htmlFor="admin-account-input" className="text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='adminauthcard-r995ca969e114d677-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
          <span data-api-unique-id='adminauthcard-ra19fd7f9a4e4182c-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>معرف المشرف أو الهاتف المهني</span>
          <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='adminauthcard-redb694347a49dd2d-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>معتمد رسمياً</span>
        </label>
        <div className="relative flex items-center" data-api-unique-id='adminauthcard-r9eb5e053c8f45148-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
          <input id="admin-account-input" data-auto="account" type="text" disabled={activeLoading} value={formData.usernameOrPhone} onChange={e => {
          setFormData(prev => ({
            ...prev,
            usernameOrPhone: e.target.value
          }));
          if (fieldErrors.usernameOrPhone) {
            setFieldErrors(prev => ({
              ...prev,
              usernameOrPhone: ""
            }));
          }
        }} placeholder="أدخل اسم المستخدم أو رقم الهاتف المهني" className={`w-full h-11 px-3.5 pr-10 text-sm rounded-lg bg-input text-foreground border transition-colors outline-none focus:ring-2 focus:ring-ring focus:border-primary disabled:opacity-50 disabled:pointer-events-none ${fieldErrors.usernameOrPhone ? "border-destructive" : "border-border"}`} dir="auto" data-api-unique-id='adminauthcard-rd7c3460bab474eb0-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='adminauthcard-rbe85b6d89fa9bf91-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
            <User className="w-4 h-4" data-api-unique-id='adminauthcard-r4ef774a98f4c8deb-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          </div>
        </div>
        {fieldErrors.usernameOrPhone && <div className="flex items-center gap-1.5 text-xs text-destructive mt-0.5" data-api-unique-id='adminauthcard-ra43b52b8464ffe9d-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
            <AlertCircle className="w-3.5 h-3.5 shrink-0" data-api-unique-id='adminauthcard-r86292e28c9b4868c-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
            <span data-api-unique-id='adminauthcard-r637bc4d4b22fa72f-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>{fieldErrors.usernameOrPhone}</span>
          </div>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1.5 text-right" data-api-unique-id='adminauthcard-rf3e447dc7219b02f-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
        <label htmlFor="admin-password-input" className="text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='adminauthcard-r22c6b4284d4c3e9b-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
          <span data-api-unique-id='adminauthcard-r4c99ad1e518f10ed-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>كلمة المرور المشفرة</span>
          <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='adminauthcard-r8417eb6efc5d7ae8-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>بروتوكول RLS</span>
        </label>
        <div className="relative flex items-center" data-api-unique-id='adminauthcard-rb17a2c4a6f214bb0-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
          <input id="admin-password-input" data-auto="password" type={showPassword ? "text" : "password"} disabled={activeLoading} value={formData.passwordHash} onChange={e => {
          setFormData(prev => ({
            ...prev,
            passwordHash: e.target.value
          }));
          if (fieldErrors.passwordHash) {
            setFieldErrors(prev => ({
              ...prev,
              passwordHash: ""
            }));
          }
        }} placeholder="أدخل كلمة المرور الخاصة بحساب المشرف" className={`w-full h-11 px-10 pr-10 text-sm rounded-lg bg-input text-foreground border transition-colors outline-none focus:ring-2 focus:ring-ring focus:border-primary disabled:opacity-50 disabled:pointer-events-none ${fieldErrors.passwordHash ? "border-destructive" : "border-border"}`} dir="ltr" data-api-unique-id='adminauthcard-rc5913f517cfa69ab-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='adminauthcard-rf23d4b0c1d95b8be-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
            <KeyRound className="w-4 h-4" data-api-unique-id='adminauthcard-ree9bc1d0810d20b9-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          </div>
          <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} data-api-unique-id='adminauthcard-rc2ce244b5945f859-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
            {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='adminauthcard-r0958287416b3f34a-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' /> : <Eye className="w-4 h-4" data-api-unique-id='adminauthcard-ra4b2aefee67e340c-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />}
          </button>
        </div>
        {fieldErrors.passwordHash && <div className="flex items-center gap-1.5 text-xs text-destructive mt-0.5" data-api-unique-id='adminauthcard-r22f0c23458004f58-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
            <AlertCircle className="w-3.5 h-3.5 shrink-0" data-api-unique-id='adminauthcard-r887290c4f28e2d08-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
            <span data-api-unique-id='adminauthcard-rcf604297e9471b89-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>{fieldErrors.passwordHash}</span>
          </div>}
      </div>

      {/* Submit Button */}
      <button type="submit" data-auto="submit" disabled={activeLoading} className="w-full h-11 mt-2 rounded-lg font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer" data-api-unique-id='adminauthcard-r5bdcb7fd26d190d9-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
        {activeLoading ? <>
            <Loader2 className="w-4 h-4 animate-spin" data-api-unique-id='adminauthcard-rff14779d1c41f7d6-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
            <span data-api-unique-id='adminauthcard-rb7dbcf8aec6dbc22-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>جاري التحقق من الصلاحيات الإدارية...</span>
          </> : <>
            <span data-api-unique-id='adminauthcard-r67dbcc16acbf3b56-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>تسجيل الدخول إلى لوحة التحكم</span>
            <ArrowLeft className="w-4 h-4" data-api-unique-id='adminauthcard-rf855ffd4c842da97-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          </>}
      </button>

      {/* Navigation Link to Register New Supervisor Account [B03] */}
      <div className="pt-3 border-t border-border/60 flex flex-col items-center gap-2" data-api-unique-id='adminauthcard-r426df21b7d2581d3-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
        <button type="button" onClick={handleRegisterClick} disabled={activeLoading} className="text-xs font-medium text-primary hover:underline transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-2 py-1" data-api-unique-id='adminauthcard-r04c3dd030b10630b-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>
          <UserPlus className="w-3.5 h-3.5 text-primary" data-api-unique-id='adminauthcard-r63e4fcb558967ff1-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard' />
          <span data-api-unique-id='adminauthcard-r15ce28390d201859-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>طلب اعتماد حساب مشرف جديد</span>
          <span className="text-muted-foreground text-[11px]" data-api-unique-id='adminauthcard-r3c214cc11c16b328-s2267693204' data-api-unique-page-name='src/backend/components/AdminLogin/AdminAuthCard'>(استمارة التسجيل الإداري)</span>
        </button>
      </div>
    </form>;
}