"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, AlertCircle, User, Eye, EyeOff, Shield, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { loginCustomer } from "@/frontend/actions/CustomerLogin";
import { useUserSession } from "@/tools/FrontendSession";
import { HomePage, CustomerRegister } from "@/frontend/route-params";
export default function CustomerAuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    set
  } = useUserSession();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmedUsername = formData.username.trim();
    if (!trimmedUsername) {
      setErrorMsg("يرجى إدخال اسم المستخدم أو رقم الهاتف المسجل");
      toast.error("يرجى إدخال اسم المستخدم أو رقم الهاتف");
      return;
    }
    if (!formData.password) {
      setErrorMsg("يرجى إدخال كلمة المرور للمتابعة");
      toast.error("يرجى إدخال كلمة المرور");
      return;
    }
    setIsLoading(true);
    try {
      const result = await loginCustomer({
        username: trimmedUsername,
        password: formData.password
      });
      set({
        token: result.token,
        user_id: result.userId,
        username: result.username,
        role: "CUSTOMER"
      });
      toast.success("تم التحقق بنجاح، جاري التوجيه...");
      const redirectParam = searchParams.get("redirect");
      if (redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//") && !redirectParam.includes("\\")) {
        router.push(redirectParam);
      } else {
        HomePage.navigateTo(router);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "فشل تسجيل الدخول، يرجى المحاولة لاحقاً";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return <div data-controller-name="استمارة تسجيل دخول الزبون" className="w-full max-w-[460px] mx-auto bg-card text-card-foreground border-2 border-border/90 rounded-xl shadow-card p-6 sm:p-8 relative overflow-hidden" data-api-unique-id='customerauthcard-rddf2416d4663f3ec-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
      {/* Golden Accent Glow Line on Top of Card */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-accent" data-api-unique-id='customerauthcard-r802ab8938fc7c23e-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />

      {/* Institutional Card Header */}
      <div className="text-center space-y-2 mb-6 sm:mb-7" data-api-unique-id='customerauthcard-r083a3e4480f1558f-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary mb-1 border border-border" data-api-unique-id='customerauthcard-r47d97472a6c2873a-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <KeyRound className="w-6 h-6 text-primary" data-api-unique-id='customerauthcard-r364af95c730d6103-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
        </div>
        <h1 className="font-header font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight" data-api-unique-id='customerauthcard-rbcf0c346974f854e-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          دخول فضاء الزبون
        </h1>
        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm mx-auto" data-api-unique-id='customerauthcard-reeef098b56fcbd0d-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          سجل دخولك لمتابعة حصصك وحجوزات إطارات المركبات المعتمدة
        </p>
      </div>

      {/* Error Alert Box if any */}
      {errorMsg && <div className="mb-5 p-3.5 rounded-lg bg-destructive/10 border border-destructive/40 text-foreground flex items-start gap-2.5 text-xs font-body animate-in fade-in duration-200" data-api-unique-id='customerauthcard-rfc6b2d6e90a6e6c1-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" data-api-unique-id='customerauthcard-rb952a93fef7c18f9-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
          <span className="leading-snug" data-api-unique-id='customerauthcard-r5a887a3a8180afda-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>{errorMsg}</span>
        </div>}

      {/* Certified Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" data-api-unique-id='customerauthcard-rfd9d083d57c79bac-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
        {/* Account Field (Username or Phone) */}
        <div className="space-y-2 text-right" data-api-unique-id='customerauthcard-r82b612d496dbe6b6-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <Label htmlFor="customer-username" className="text-xs font-header font-semibold text-foreground flex items-center justify-between" data-api-unique-id='customerauthcard-rc93f599a4b652eaa-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            <span data-api-unique-id='customerauthcard-r69d5714ce5324146-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>اسم المستخدم أو رقم الهاتف</span>
            <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='customerauthcard-ra835ffe108168d09-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
              صيغة جزائرية (05/06/07)
            </span>
          </Label>
          <div className="relative" data-api-unique-id='customerauthcard-r7fb95a75e3a41282-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            <Input id="customer-username" type="text" dir="ltr" data-auto="account" required value={formData.username} onChange={e => setFormData({
            ...formData,
            username: e.target.value
          })} placeholder="05XXXXXXXX / username" className="w-full bg-input text-foreground border-border rounded-md px-4 py-2.5 pl-10 text-left font-body text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent placeholder:text-muted-foreground/60 transition-all" data-api-unique-id='customerauthcard-radd3b4be6e764f5d-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='customerauthcard-r42a48cfbbbf8a8d4-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
              <User className="w-4 h-4" data-api-unique-id='customerauthcard-rda5de19a61be9c7c-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2 text-right" data-api-unique-id='customerauthcard-r8bb3ca6073d54c88-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <div className="flex items-center justify-between" data-api-unique-id='customerauthcard-r4e4e3539168c3931-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            <Label htmlFor="customer-password" className="text-xs font-header font-semibold text-foreground" data-api-unique-id='customerauthcard-rab35e4ae951aed68-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
              كلمة المرور
            </Label>
            <span className="text-[11px] text-muted-foreground font-normal" data-api-unique-id='customerauthcard-rf6c7104a64f81483-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
              حساب مشفّر وآمن
            </span>
          </div>
          <div className="relative" data-api-unique-id='customerauthcard-r55bd275f5e7a1d0b-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            <Input id="customer-password" type={showPassword ? "text" : "password"} dir="ltr" data-auto="password" required value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} placeholder="••••••••••••" className="w-full bg-input text-foreground border-border rounded-md px-4 py-2.5 pl-10 text-left font-body text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent placeholder:text-muted-foreground/60 transition-all" data-api-unique-id='customerauthcard-rdb3b3cda5efafa65-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} data-api-unique-id='customerauthcard-re8ff6318b199cf16-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
              {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='customerauthcard-rd3f750dabe0586d9-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' /> : <Eye className="w-4 h-4" data-api-unique-id='customerauthcard-r00a0d9f564206128-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />}
            </button>
          </div>
        </div>

        {/* Form Meta Row: Role indication notice & Security Assurance */}
        <div className="flex items-center justify-between text-xs font-body pt-1" data-api-unique-id='customerauthcard-r8315f697038f057c-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <div className="flex items-center gap-1.5 text-muted-foreground" data-api-unique-id='customerauthcard-r3d43688c74c22690-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            <Shield className="w-3.5 h-3.5 text-primary shrink-0" data-api-unique-id='customerauthcard-r642101ed8c2ba6fe-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
            <span data-api-unique-id='customerauthcard-re4749be2fa2dcc94-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>فضاء زبون طالب للإطارات</span>
          </div>
          <span className="text-[11px] text-primary/90 font-header font-semibold" data-api-unique-id='customerauthcard-r4edf7e437bdd7748-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            نظام التوزيع الوطني
          </span>
        </div>

        {/* Submit Action Button */}
        <div className="pt-2" data-api-unique-id='customerauthcard-rfef986d519670d2b-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <Button type="submit" data-auto="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground font-header font-bold py-3.5 px-6 rounded-md hover:bg-accent transition-all duration-200 shadow-gold active:scale-[0.98] flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:pointer-events-none cursor-pointer" data-api-unique-id='customerauthcard-rb7988a921c68b679-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            {isLoading ? <div className="flex items-center gap-2" data-api-unique-id='customerauthcard-rf008752b684236a6-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" data-api-unique-id='customerauthcard-r74de19c6ab1fc7f7-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
                <span data-api-unique-id='customerauthcard-rea9774e8b83197bc-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>جاري التحقق من الهوية...</span>
              </div> : <>
                <span data-api-unique-id='customerauthcard-r3acf33c191b1e118-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>تأكيد تسجيل الدخول</span>
                <ArrowLeft className="w-4 h-4 text-primary-foreground shrink-0" data-api-unique-id='customerauthcard-rc02f481693656d40-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
              </>}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-6" data-api-unique-id='customerauthcard-r5fe5ef22afaed2b7-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
        <div className="absolute inset-0 flex items-center" data-api-unique-id='customerauthcard-r4c984d1b0e54aeaf-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <div className="w-full border-t border-border/80" data-api-unique-id='customerauthcard-r8d7596ed4868a6db-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
        </div>
        <div className="relative flex justify-center text-xs" data-api-unique-id='customerauthcard-rc856370365d981ee-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <span className="bg-card px-3 text-muted-foreground font-body" data-api-unique-id='customerauthcard-ref4ec26fa0f55382-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
            ليس لديك حساب زبون بعد؟
          </span>
        </div>
      </div>

      {/* Registration Callout: Direct link to [F04] */}
      <div className="text-center" data-api-unique-id='customerauthcard-r8f5a8504a0a41005-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
        <button type="button" onClick={() => CustomerRegister.navigateTo(router)} className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-secondary text-secondary-foreground border border-border/90 hover:bg-muted font-header font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" data-api-unique-id='customerauthcard-rfe2fd8ffaaecc669-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          <span data-api-unique-id='customerauthcard-r3b920ff16e3fd0bb-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>إنشاء حساب زبون جديد في المنصة</span>
          <Sparkles className="w-4 h-4 text-primary" data-api-unique-id='customerauthcard-r67fd8052b4fddd96-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard' />
        </button>
        <p className="mt-2 text-[11px] text-muted-foreground font-body" data-api-unique-id='customerauthcard-re5dd848f3ebe03ab-s1010243672' data-api-unique-page-name='src/frontend/components/CustomerLogin/CustomerAuthCard'>
          التسجيل يتيح لك حجز حصص الإطارات المعتمدة عبر ولايتك مباشرة
        </p>
      </div>
    </div>;
}