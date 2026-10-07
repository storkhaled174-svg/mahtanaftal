"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, CreditCard, Lock, Eye, EyeOff, UserCheck, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { CustomerRegisterFormData, FormValidationErrors, PhoneCarrier } from "@/frontend/types/CustomerRegister";
import { CustomerLogin } from "@/frontend/route-params";
interface RegisterFormProps {
  formData: CustomerRegisterFormData;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  onInputChange: (field: keyof CustomerRegisterFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}
export default function RegisterForm({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit
}: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Detect Algerian carrier from prefix (05: Ooredoo, 06: Mobilis, 07: Djezzy)
  const getCarrier = (phone: string): PhoneCarrier => {
    const clean = phone.trim().replace(/\s+/g, "");
    if (clean.startsWith("06") || clean.startsWith("+2136") || clean.startsWith("2136")) return "mobilis";
    if (clean.startsWith("07") || clean.startsWith("+2137") || clean.startsWith("2137")) return "djezzy";
    if (clean.startsWith("05") || clean.startsWith("+2135") || clean.startsWith("2135")) return "ooredoo";
    return "unknown";
  };
  const carrier = getCarrier(formData.phoneNumber);
  const getCarrierBadge = (c: PhoneCarrier) => {
    switch (c) {
      case "mobilis":
        return {
          name: "موبيليس 06 (Mobilis)",
          color: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
        };
      case "djezzy":
        return {
          name: "جازي 07 (Djezzy)",
          color: "text-red-400 bg-red-950/40 border-red-800"
        };
      case "ooredoo":
        return {
          name: "أوريدو 05 (Ooredoo)",
          color: "text-amber-400 bg-amber-950/40 border-amber-800"
        };
      default:
        return null;
    }
  };
  const carrierInfo = getCarrierBadge(carrier);

  // NIN formatting & length calculation (Standard Algerian NIN has 18 digits)
  const ninLength = formData.nationalIdNumber.replace(/\D/g, "").length;
  return <div data-controller-name="نموذج تسجيل حساب زبون جديد" className="relative rounded-2xl border-2 border-primary/40 bg-card p-6 sm:p-8 shadow-card overflow-hidden" data-api-unique-id='registerform-r349bee64f3e1132b-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
      {/* Subtle Golden Glow Element */}
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" data-api-unique-id='registerform-rca213e103e26a4fb-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />

      <form onSubmit={onSubmit} className="space-y-6 relative" data-api-unique-id='registerform-r170b52943c91bea7-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
        {/* Form Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4" data-api-unique-id='registerform-r25155eee041e47ac-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <div className="space-y-1" data-api-unique-id='registerform-rfed6652c50c01870-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <div className="flex items-center gap-2" data-api-unique-id='registerform-r1d39540d071663e0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <h2 className="font-header text-xl sm:text-2xl font-bold text-foreground" data-api-unique-id='registerform-r052669fb0360a39f-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                إنشاء حساب زبون جديد
              </h2>
              <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-header font-bold" data-api-unique-id='registerform-rafebbd751ffaf2e0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                صفة زبون
              </span>
            </div>
            <p className="font-body text-xs text-muted-foreground" data-api-unique-id='registerform-r43ca3beef51de835-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              يرجى ملء الحقول التالية بدقة وفقاً لوثائق الهوية الرسمية
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-body text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md" data-api-unique-id='registerform-r8e0b518eb0ad9d02-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='registerform-re6100e1aa4b33a46-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r4b9557a4b230217b-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>تسجيل مشفر ومحمي</span>
          </div>
        </div>

        {/* Global Error Banner if any */}
        {errors.general && <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-xs font-body text-destructive" data-api-unique-id='registerform-rb391ad91cc3ce9f2-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <AlertCircle className="h-4 w-4 shrink-0" data-api-unique-id='registerform-r88e8c1d0785ab4e4-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r726300c9789bcfb5-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.general}</span>
          </div>}

        {/* 1. Full Name (full_name) */}
        <div className="space-y-1.5" data-api-unique-id='registerform-rce64c53cd8e6e7b7-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <label className="flex items-center justify-between text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-r8765340d8da82b4c-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-r39138d9824412a97-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <User className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-rc0b125c2a02389cd-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r870511f6ca34b397-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>الاسم واللقب الكامل</span>
              <span className="text-primary" data-api-unique-id='registerform-r5be66930434df233-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registerform-r3238bb7cdb79db28-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>كما هو مدون في بطاقة التعريف</span>
          </label>
          <div className="relative" data-api-unique-id='registerform-r7f15c6c629381e16-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <input type="text" name="fullName" value={formData.fullName} onChange={e => onInputChange("fullName", e.target.value)} placeholder="مثال: محمد بن عيسى" className={`w-full rounded-md border bg-input px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.fullName ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-rd4d414e47b4de292-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
          </div>
          {errors.fullName && <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-r2489a95a1a7db562-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r6cc93c48a928e102-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-raebae6b7a142b70d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.fullName}</span>
            </p>}
        </div>

        {/* 2. Username / Login Identifier (username) */}
        <div className="space-y-1.5" data-api-unique-id='registerform-r41ec898eae9697a1-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <label className="flex items-center justify-between text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-r825762fa9dda625d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-r65c8c32aa6c7f8de-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <UserCheck className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r26a7c7e1a71c4d7d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r1fc53d511211939f-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>اسم المستخدم أو المعرف الفريد</span>
              <span className="text-primary" data-api-unique-id='registerform-r7f23d903f568442c-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='registerform-re7e29a2a98ddb972-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>يُستخدم للدخول إلى المنصة</span>
          </label>
          <div className="relative" data-api-unique-id='registerform-rf6fb58698467fe46-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <input type="text" name="username" value={formData.username} onChange={e => onInputChange("username", e.target.value)} placeholder="مثال: mohamed_dz2025 أو رقم الهاتف" dir="ltr" className={`w-full rounded-md border bg-input px-3.5 py-2.5 text-sm font-body text-left text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.username ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-r897eb1efc254f1ca-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
          </div>
          {errors.username ? <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-r900a72220fd4f1f6-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r5adec77e2ca7a4a2-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-rc2b9c4a7e164afd6-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.username}</span>
            </p> : <p className="text-[11px] font-body text-muted-foreground" data-api-unique-id='registerform-rab829a091a8bea29-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              يمكنك استخدام بريد إلكتروني، اسم مستخدم لاتيني، أو رقم هاتفك كمعرف دخول.
            </p>}
        </div>

        {/* 3. Phone Number (phone_number) with Operator Auto-Detection */}
        <div className="space-y-1.5" data-api-unique-id='registerform-r23210222c1a20423-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <div className="flex items-center justify-between text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-r1dac43dec947b855-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-r1ba90f0c131ae10e-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <Phone className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-rd01a6284361f2a1c-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r2efb0277fbefa2f4-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>رقم الهاتف الرئيسي</span>
              <span className="text-primary" data-api-unique-id='registerform-r7a34fc41d04856d4-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </span>
            {carrierInfo && <span className={`rounded border px-2 py-0.5 text-[10px] font-header font-bold transition-all ${carrierInfo.color}`} data-api-unique-id='registerform-rc96dc37a31d0b62d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                {carrierInfo.name}
              </span>}
          </div>
          <div className="relative" data-api-unique-id='registerform-rf87fff1a6cd26272-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={e => onInputChange("phoneNumber", e.target.value)} placeholder="06XXXXXXXX أو 05XXXXXXXX أو 07XXXXXXXX" dir="ltr" className={`w-full rounded-md border bg-input px-3.5 py-2.5 text-sm font-body text-left text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.phoneNumber ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-r7e009405f9c840ff-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
          </div>
          {errors.phoneNumber && <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-rce514f3021923908-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r481ab39acdce425c-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-ra20f400d6e38a51a-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.phoneNumber}</span>
            </p>}
        </div>

        {/* 4. National ID Number (national_id_number / NIN) */}
        <div className="space-y-1.5" data-api-unique-id='registerform-r232d3aba6a5e3a2e-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <div className="flex items-center justify-between text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-r76818f6ab5ba2294-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-rbdd28a32aca73574-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <CreditCard className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r6db438a1078076a0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-rce371cbd911cc423-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>رقم التعريف الوطني البيومتري (NIN)</span>
              <span className="text-primary" data-api-unique-id='registerform-r5736f6bfa218dc5b-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </span>
            <span className={`text-[11px] font-mono font-bold ${ninLength === 18 ? "text-emerald-400" : "text-muted-foreground"}`} data-api-unique-id='registerform-r664bd48b7cb2a451-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              {ninLength} / 18 رقم
            </span>
          </div>
          <div className="relative" data-api-unique-id='registerform-rb18584d0882f9d6d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <input type="text" name="nationalIdNumber" value={formData.nationalIdNumber} maxLength={18} onChange={e => {
            const val = e.target.value.replace(/\D/g, "");
            onInputChange("nationalIdNumber", val);
          }} placeholder="18 رقماً الموجودة على بطاقة التعريف الوطنية البيومترية" dir="ltr" className={`w-full rounded-md border bg-input px-3.5 py-2.5 text-sm font-body text-left font-mono tracking-wider text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.nationalIdNumber ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-r92bd66d142edac59-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
          </div>
          {errors.nationalIdNumber ? <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-rc8135b32cad92992-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r22e04e95c48c5754-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-raf6d51f9f2bb5e70-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.nationalIdNumber}</span>
            </p> : <p className="text-[11px] font-body text-muted-foreground" data-api-unique-id='registerform-ra67a00120f97d7e0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              يُشترط رقم التعريف الوطني لمطابقة حصة الاستفادة ومنع الازدواجية في نظام التوزيع.
            </p>}
        </div>

        {/* 5. Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-api-unique-id='registerform-rf619b18d2ddb4e04-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          {/* Password */}
          <div className="space-y-1.5" data-api-unique-id='registerform-r7a8456b1fc1f0b1a-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <label className="flex items-center gap-1.5 text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-r8f811ea1cff010ae-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <Lock className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-rc36b495d45f7bfc3-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r0f1a22ac590d8346-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>كلمة المرور</span>
              <span className="text-primary" data-api-unique-id='registerform-r6843bed51b60c0de-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </label>
            <div className="relative" data-api-unique-id='registerform-rec05dc86b161eca8-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={e => onInputChange("password", e.target.value)} placeholder="••••••••" dir="ltr" className={`w-full rounded-md border bg-input px-3.5 py-2.5 pl-10 text-sm font-body text-left text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.password ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-r31c6d247d8476490-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} data-api-unique-id='registerform-r56e4270f783bc127-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-r66bb283f93a9ff42-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-redc50f87a942d14d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />}
              </button>
            </div>
            {errors.password && <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-r4df453ad57b2f83e-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r1c70fa222da30546-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
                <span data-api-unique-id='registerform-rb9cba7e762faced9-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.password}</span>
              </p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5" data-api-unique-id='registerform-r082705a1ce6ce135-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <label className="flex items-center gap-1.5 text-xs font-header font-semibold text-foreground" data-api-unique-id='registerform-rc80b59d3058e6aa7-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <Lock className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r40623f56a247687a-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r714b3730f0f91f38-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>تأكيد كلمة المرور</span>
              <span className="text-primary" data-api-unique-id='registerform-rc2c3ce5257548b1e-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>*</span>
            </label>
            <div className="relative" data-api-unique-id='registerform-r2ea77dee99f81699-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={e => onInputChange("confirmPassword", e.target.value)} placeholder="••••••••" dir="ltr" className={`w-full rounded-md border bg-input px-3.5 py-2.5 pl-10 text-sm font-body text-left text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.confirmPassword ? "border-destructive ring-1 ring-destructive" : "border-border"}`} data-api-unique-id='registerform-r7bbdee7e665ee9ef-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none" aria-label={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"} data-api-unique-id='registerform-r6c54a2670bb856a0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                {showConfirmPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-r3ffa660317c2a504-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-r9445e9fb0cff92a6-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />}
              </button>
            </div>
            {errors.confirmPassword && <p className="flex items-center gap-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-r0532379b43d7b0f3-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r13f7c2133620955d-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
                <span data-api-unique-id='registerform-r1ed9e4a885771432-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.confirmPassword}</span>
              </p>}
          </div>
        </div>

        {/* Terms and conditions statement */}
        <div className="pt-2" data-api-unique-id='registerform-r2def4ade069c6832-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <label className="flex items-start gap-2.5 cursor-pointer text-xs font-body text-muted-foreground" data-api-unique-id='registerform-r4188c9d35fb32843-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <input type="checkbox" checked={formData.acceptTerms} onChange={e => onInputChange("acceptTerms", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border bg-input text-primary focus:ring-ring focus:ring-offset-background" data-api-unique-id='registerform-r7a7053ef5fd5fa32-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r0401e4521bf1b241-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
              أقر بصحة البيانات المصرح بها وبأنني مؤهل للاستفادة من حصص الإطارات وفق شروط وزارة الطاقة وشركة نفطال.
            </span>
          </label>
          {errors.acceptTerms && <p className="mt-1 text-[11px] font-body text-destructive" data-api-unique-id='registerform-rc71349589cba4a49-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>{errors.acceptTerms}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2" data-api-unique-id='registerform-r471172bd0d9bf654-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-primary text-primary-foreground font-header font-bold px-8 py-3.5 hover:bg-accent transition-all duration-200 shadow-gold active:scale-[0.99] flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:pointer-events-none" data-api-unique-id='registerform-r6bf6af45591d0866-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            {isSubmitting ? <div className="flex items-center gap-2" data-api-unique-id='registerform-r5eb12cd2e0c4e8e6-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" data-api-unique-id='registerform-red816bd581bb2e00-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
                <span data-api-unique-id='registerform-ra08bd7c5f90cba1a-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>جاري معالجة وتوثيق الحساب...</span>
              </div> : <>
                <span data-api-unique-id='registerform-r938593e2be8aad58-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>إنشاء حساب زبون جديد</span>
                <ArrowRight className="h-4 w-4 rotate-180" data-api-unique-id='registerform-rad98edbe6fabefc0-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
              </>}
          </button>
        </div>

        {/* In-Card Login Redirection Guide */}
        <div className="rounded-xl border border-border/70 bg-muted/50 p-4 text-center" data-api-unique-id='registerform-rd1e73251ed3ff1c1-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
          <p className="font-body text-xs text-muted-foreground mb-1.5" data-api-unique-id='registerform-r7c88f2dc074314ad-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            هل تملك حساباً مفعلاً ومسجلاً بالفعل في البوابة؟
          </p>
          <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="inline-flex items-center gap-1.5 font-header text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-0.5 cursor-pointer" data-api-unique-id='registerform-r43ca04d5b26cca78-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>
            <span data-api-unique-id='registerform-r7972c04708a48048-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm'>لديك حساب بالفعل؟ تسجيل الدخول</span>
            <Sparkles className="h-3.5 w-3.5" data-api-unique-id='registerform-r09e371a398b903d4-s1245288046' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterForm' />
          </button>
        </div>
      </form>
    </div>;
}