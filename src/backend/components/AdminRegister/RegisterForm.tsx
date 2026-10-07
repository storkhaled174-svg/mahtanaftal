"use client";

import React, { useState, useMemo } from "react";
import { User, AtSign, Phone, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, Check } from "lucide-react";
import { AdminRegisterFormData, FormValidationErrors, PasswordStrength } from "@/backend/types/AdminRegister";
interface RegisterFormProps {
  formData: AdminRegisterFormData;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  onChange: (field: keyof AdminRegisterFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}
export default function RegisterForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onSubmit
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Compute Password Strength
  const passwordStrength: PasswordStrength = useMemo(() => {
    const pwd = formData.passwordHash || "";
    if (!pwd) {
      return {
        score: 0,
        label: "غير محدد",
        feedback: [],
        colorClass: "bg-muted"
      };
    }
    let score = 0;
    const feedback: string[] = [];
    if (pwd.length >= 8) {
      score += 1;
    } else {
      feedback.push("يجب أن تكون 8 أحرف على الأقل");
    }
    if (/[A-Z]/.test(pwd) || /[a-z]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push("تحتوي على حروف لاتينية");
    }
    if (/[0-9]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push("تحتوي على أرقام");
    }
    if (/[^A-Za-z0-9]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push("تحتوي على رموز خاصة (!@#$)");
    }
    let label = "ضعيفة جداً";
    let colorClass = "bg-destructive";
    if (score === 2) {
      label = "متوسطة";
      colorClass = "bg-warning";
    } else if (score === 3) {
      label = "جيدة";
      colorClass = "bg-chart-2";
    } else if (score >= 4) {
      label = "قوية ومطابقة للمعايير الإدارية";
      colorClass = "bg-success";
    }
    return {
      score,
      label,
      feedback,
      colorClass
    };
  }, [formData.passwordHash]);
  const passwordsMatch = formData.passwordHash && formData.confirmPassword && formData.passwordHash === formData.confirmPassword;
  /* Extracted array: _items */
  const _items = [1, 2, 3, 4];
  return <form onSubmit={onSubmit} className="space-y-4 pt-4 text-right" noValidate data-api-unique-id='registerform-r539a60bf90adbad5-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
      {/* General Error Banner if any */}
      {errors.general && <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 flex items-start gap-2.5 text-xs text-foreground" data-api-unique-id='registerform-rc5496168c28c85c0-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" data-api-unique-id='registerform-rbce3038ffdb8798f-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <div className="min-w-0 flex-1 font-body" data-api-unique-id='registerform-r75c8c52853d8811a-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.general}</div>
        </div>}

      {/* Row 1: Full Name */}
      <div className="space-y-1.5" data-api-unique-id='registerform-rfe1f1aac5f022d74-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <label className="text-xs font-semibold text-foreground font-header flex items-center justify-between" data-api-unique-id='registerform-r46f58ada81ebfe68-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <span className="flex items-center gap-1.5" data-api-unique-id='registerform-r991ce4df1f0064c4-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <User className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r9122dddcb1cbf320-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r81414291f27842c1-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>الاسم واللقب الكامل</span>
            <span className="text-destructive" data-api-unique-id='registerform-r7a5c99c114cc1f94-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>*</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-mono" data-api-unique-id='registerform-r37e6ba4de1598d8b-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>full_name</span>
        </label>
        <div className="relative" data-api-unique-id='registerform-r04f01aef321a55ef-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <input type="text" required value={formData.fullName} onChange={e => onChange("fullName", e.target.value)} placeholder="مثال: كريم بن زيمة" className={`w-full h-10 px-3 pr-9 rounded-md bg-input border ${errors.fullName ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"} text-foreground text-xs font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`} data-api-unique-id='registerform-re9b4ef348421ba22-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='registerform-r862993e3240226ae-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
        </div>
        {errors.fullName && <p className="text-[11px] text-destructive flex items-center gap-1 font-body" data-api-unique-id='registerform-r3b52498be5a308d5-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r7e0ffe0739d3513c-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r3e64290dfbe11748-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.fullName}</span>
          </p>}
      </div>

      {/* Row 2: Two Columns on sm screens - Username & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" data-api-unique-id='registerform-rfe87d9dd075a9a95-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        {/* Username */}
        <div className="space-y-1.5" data-api-unique-id='registerform-rd9807aa1abb31e9f-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label className="text-xs font-semibold text-foreground font-header flex items-center justify-between" data-api-unique-id='registerform-r59cdee5de329b438-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-r4fc45c96c8980e51-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <AtSign className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r303215bcb6db0955-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r6d35784e3a9e6f47-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>اسم المستخدم المعتمد</span>
              <span className="text-destructive" data-api-unique-id='registerform-rf964bf81a8fb1a61-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>*</span>
            </span>
          </label>
          <div className="relative" data-api-unique-id='registerform-r01d8c06f9b9ce0f9-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <input type="text" required value={formData.username} onChange={e => onChange("username", e.target.value)} placeholder="admin_naftal_dz" dir="ltr" className={`w-full h-10 px-3 pl-9 rounded-md bg-input border ${errors.username ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"} text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`} data-api-unique-id='registerform-r46275ebe97e290f5-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='registerform-r1f6a16b46c3c675b-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          {errors.username ? <p className="text-[11px] text-destructive flex items-center gap-1 font-body" data-api-unique-id='registerform-r2d97213d2ec3c3b4-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-re36128c0cabd3563-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-rab19350ec1143cb2-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.username}</span>
            </p> : <p className="text-[10px] text-muted-foreground font-body" data-api-unique-id='registerform-r22eb33638e5d6066-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              معرّف وحيد لتسجيل الدخول
            </p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5" data-api-unique-id='registerform-rb3a8a4bf909ecf41-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label className="text-xs font-semibold text-foreground font-header flex items-center justify-between" data-api-unique-id='registerform-rf6f0f003408436e8-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-ra02d659ae390ccb1-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <Phone className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r68c28de8189e97dc-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r2527a598f9879ede-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>رقم الهاتف للتواصل</span>
              <span className="text-destructive" data-api-unique-id='registerform-r4eba7fda3c274ef9-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>*</span>
            </span>
          </label>
          <div className="relative" data-api-unique-id='registerform-r7c41e36ecc9a3d4a-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <input type="tel" required value={formData.phoneNumber} onChange={e => onChange("phoneNumber", e.target.value)} placeholder="0661234567" dir="ltr" className={`w-full h-10 px-3 pl-9 rounded-md bg-input border ${errors.phoneNumber ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"} text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`} data-api-unique-id='registerform-rc67192cb2d04e38f-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='registerform-r4e873f821732917b-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          {errors.phoneNumber && <p className="text-[11px] text-destructive flex items-center gap-1 font-body" data-api-unique-id='registerform-r2cceaaa30e9ebde8-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r0550c8b26810373a-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r1515f460df2e64f3-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.phoneNumber}</span>
            </p>}
        </div>
      </div>

      {/* Row 3: Password and Confirm Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" data-api-unique-id='registerform-r9e0dfc485797e996-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        {/* Password */}
        <div className="space-y-1.5" data-api-unique-id='registerform-r9a5f748622cd2759-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label className="text-xs font-semibold text-foreground font-header flex items-center justify-between" data-api-unique-id='registerform-r092313e646e9d412-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-rdde234471dba3283-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <Lock className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-rcf40698929188ef1-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-ra851ed85fa4e66d2-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>كلمة المرور</span>
              <span className="text-destructive" data-api-unique-id='registerform-r3ee20e2038466616-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>*</span>
            </span>
          </label>
          <div className="relative" data-api-unique-id='registerform-r8b3fa64b413107a7-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <input type={showPassword ? "text" : "password"} required value={formData.passwordHash} onChange={e => onChange("passwordHash", e.target.value)} placeholder="••••••••••••" dir="ltr" className={`w-full h-10 px-3 pl-9 rounded-md bg-input border ${errors.passwordHash ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"} text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`} data-api-unique-id='registerform-r3a4c5037c059f307-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors" title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} data-api-unique-id='registerform-rd3cfeff45ec9e3ba-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-r7645b6adf6d11ece-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-r7462687d178f723e-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5" data-api-unique-id='registerform-r883a38bfee965018-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label className="text-xs font-semibold text-foreground font-header flex items-center justify-between" data-api-unique-id='registerform-r7ff7176c7b869605-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="flex items-center gap-1.5" data-api-unique-id='registerform-re1a21991eb94d76d-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <Lock className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerform-r9ffd8711efe08a4c-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r4685713e768a7882-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>تأكيد كلمة المرور</span>
              <span className="text-destructive" data-api-unique-id='registerform-r2383e23c5f03cea3-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>*</span>
            </span>
          </label>
          <div className="relative" data-api-unique-id='registerform-rd3eb8a3451b45cad-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <input type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={e => onChange("confirmPassword", e.target.value)} placeholder="••••••••••••" dir="ltr" className={`w-full h-10 px-3 pl-9 rounded-md bg-input border ${errors.confirmPassword ? "border-destructive focus:ring-destructive" : "border-border focus:border-primary"} text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`} data-api-unique-id='registerform-r1890789f725faf8a-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors" title={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"} data-api-unique-id='registerform-rc43388b4ef6c9b70-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              {showConfirmPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-re93c681e04665ec0-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-rcc14c811e633cde5-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Password Strength Indicator & Match feedback */}
      {formData.passwordHash && <div className="rounded-md bg-secondary/30 border border-border p-2.5 space-y-2" data-api-unique-id='registerform-r2390555973e714aa-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <div className="flex items-center justify-between text-[11px]" data-api-unique-id='registerform-r2f84f989500cda98-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <span className="text-muted-foreground font-body" data-api-unique-id='registerform-r7df7ce4a7493fe7d-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>قوة كلمة المرور:</span>
            <span className="font-semibold text-foreground font-body" data-api-unique-id='registerform-re00c9be859458302-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              {passwordStrength.label}
            </span>
          </div>
          {/* Strength Bars */}
          <div className="grid grid-cols-4 gap-1.5 h-1.5" data-api-unique-id='registerform-rfd8eed2624344662-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            {_items.map((step, index) => <div key={step} className={`h-full rounded-full transition-all duration-300 ${step <= passwordStrength.score ? passwordStrength.colorClass : "bg-muted"}`} data-api-unique-id='registerform-ree8a61647717d3d7-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' data-api-in-loop='1' />)}
          </div>

          {/* Match validation pill */}
          {formData.confirmPassword && <div className="flex items-center gap-1.5 text-[11px] pt-1" data-api-unique-id='registerform-r35499aea6d45a6fb-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              {passwordsMatch ? <span className="text-success flex items-center gap-1 font-medium font-body" data-api-unique-id='registerform-r6d570a2fbad5f79b-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
                  <Check className="h-3.5 w-3.5" data-api-unique-id='registerform-r2b2d63774d4fd2a0-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
                  كلمتا المرور متطابقتان
                </span> : <span className="text-destructive flex items-center gap-1 font-medium font-body" data-api-unique-id='registerform-raff4e6bc67b83b90-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
                  <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='registerform-r2fe97cce3035c181-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
                  كلمتا المرور غير متطابقتين
                </span>}
            </div>}
        </div>}

      {errors.passwordHash && <p className="text-[11px] text-destructive flex items-center gap-1 font-body" data-api-unique-id='registerform-r12c0b7c466311f27-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r9d3c9fe17d018e4b-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <span data-api-unique-id='registerform-r4b663fd71c525716-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.passwordHash}</span>
        </p>}

      {errors.confirmPassword && <p className="text-[11px] text-destructive flex items-center gap-1 font-body" data-api-unique-id='registerform-r4ef887c8a861520f-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-r9cfb4f2f428e0aa3-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <span data-api-unique-id='registerform-r2215516cba73ab68-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.confirmPassword}</span>
        </p>}

      {/* Security Agreement Checkbox */}
      <div className="pt-1" data-api-unique-id='registerform-r42dd197e0791c6f9-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <label className="flex items-start gap-2.5 cursor-pointer select-none group" data-api-unique-id='registerform-r6ae90a535630da30-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <input type="checkbox" checked={formData.agreeToSecurityCharter} onChange={e => onChange("agreeToSecurityCharter", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border bg-input text-primary focus:ring-ring focus:ring-offset-background" data-api-unique-id='registerform-rd31bb571150ba5a6-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <div className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors font-body leading-relaxed" data-api-unique-id='registerform-rcf474b4b4806fc50-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            أقر بصفتي مسؤولاً إدارياً بالالتزام بميثاق أمن المعلومات وسرية بيانات طلبيات المواطنين والبطاقة الذهبية لشركة نفطال.
          </div>
        </label>
        {errors.agreeToSecurityCharter && <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-body" data-api-unique-id='registerform-rbaa7b6e8b7ba0735-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <AlertCircle className="h-3 w-3 shrink-0" data-api-unique-id='registerform-rc0638fcd8a1ded2e-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r6bd096f4809e903a-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{errors.agreeToSecurityCharter}</span>
          </p>}
      </div>

      {/* Main Submit Button */}
      <div className="pt-2" data-api-unique-id='registerform-r80e5437bc44787c0-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-md bg-primary text-primary-foreground font-header font-bold text-sm hover:bg-primary/90 active:bg-primary/80 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='registerform-r0e5a4ee872bbea56-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          {isSubmitting ? <>
              <Loader2 className="h-4 w-4 animate-spin" data-api-unique-id='registerform-r4ee5e89ee39b8fc6-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <span data-api-unique-id='registerform-r08bb1369864ac45c-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>جاري التحقق وتثبيت الحساب الإداري...</span>
            </> : <>
              <span data-api-unique-id='registerform-rcd119327bf8aadc2-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>إنشاء وتثبيت حساب المشرف الإداري</span>
              <ArrowLeft className="h-4 w-4" data-api-unique-id='registerform-rb68d09d00a8d33a8-s2051585189' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            </>}
        </button>
      </div>
    </form>;
}