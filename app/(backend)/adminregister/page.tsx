"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import SecurityNoticeBanner from "@/backend/components/AdminRegister/SecurityNoticeBanner";
import RegisterCardHeader from "@/backend/components/AdminRegister/RegisterCardHeader";
import RegisterForm from "@/backend/components/AdminRegister/RegisterForm";
import RegisterCardFooter from "@/backend/components/AdminRegister/RegisterCardFooter";
import { registerAdmin } from "@/backend/actions/AdminRegister";
import { AdminRegisterFormData, FormValidationErrors } from "@/backend/types/AdminRegister";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminLogin } from "@/backend/route-params";
export default function AdminRegisterPage() {
  const router = useRouter();
  const {
    set
  } = useAdminSession();
  const [formData, setFormData] = useState<AdminRegisterFormData>({
    fullName: "",
    username: "",
    phoneNumber: "",
    passwordHash: "",
    confirmPassword: "",
    role: "ADMIN",
    agreeToSecurityCharter: true
  });
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleFieldChange = (field: keyof AdminRegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field as keyof FormValidationErrors] || errors.general) {
      setErrors(prev => {
        const next = {
          ...prev
        };
        delete next[field as keyof FormValidationErrors];
        delete next.general;
        return next;
      });
    }
  };
  const validate = (): boolean => {
    const newErrors: FormValidationErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "يرجى إدخال الاسم واللقب الكامل للمشرف";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "الاسم يجب أن يحتوي على 3 أحرف على الأقل";
    }
    if (!formData.username.trim()) {
      newErrors.username = "يرجى إدخال اسم المستخدم المعتمد";
    } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(formData.username.trim())) {
      newErrors.username = "اسم المستخدم يجب أن يتكون من 3-30 حرفاً إنجليزياً أو أرقام بدون مسافات";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "يرجى إدخال رقم الهاتف للتواصل";
    } else if (!/^(05|06|07|02|03|04)[0-9]{8}$/.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      newErrors.phoneNumber = "يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0661234567)";
    }
    if (!formData.passwordHash) {
      newErrors.passwordHash = "يرجى إدخال كلمة المرور";
    } else if (formData.passwordHash.length < 8) {
      newErrors.passwordHash = "كلمة المرور يجب ألا تقل عن 8 خانات";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (formData.passwordHash !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }
    if (!formData.agreeToSecurityCharter) {
      newErrors.agreeToSecurityCharter = "يجب الموافقة على ميثاق أمن وسرية المعلومات للمتابعة";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("يرجى مراجعة وتصحيح الحقول المطلوبة في النموذج");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerAdmin({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        password: formData.passwordHash
      });
      set({
        token: result.token,
        user_id: result.id,
        username: result.username,
        role: "ADMIN"
      });
      setIsSuccess(true);
      toast.success("تم إنشاء حساب المشرف الإداري بنجاح! جاري التحويل لصفحة تسجيل الدخول...");
      setTimeout(() => {
        AdminLogin.navigateTo(router);
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء تسجيل المشرف الإداري";
      toast.error(message);
      setErrors(prev => ({
        ...prev,
        general: message
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div dir="rtl" className="w-full max-w-full min-w-0 p-4 lg:p-6 min-h-dvh flex flex-col items-center justify-center bg-background text-foreground relative overflow-x-hidden font-body">
      {/* Background Subtle Industrial / Grid Glow Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1f3563_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Security Scope Banner */}
      <SecurityNoticeBanner />

      {/* Main Single-Canvas Security Authentication Card Container */}
      <main data-controller-name="تسجيل حساب مشرف جديد" className="w-full max-w-[580px] rounded-xl border border-border bg-card text-card-foreground shadow-2xl p-5 sm:p-7 relative z-10 space-y-5">
        {isSuccess ? <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto text-success">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-foreground font-display">
                تم تسجيل المشرف الإداري بنجاح
              </h2>
              <p className="text-xs text-muted-foreground font-body max-w-sm mx-auto">
                تم حفظ بيانات المشرف <span className="text-primary font-semibold font-mono">{formData.username}</span> بصلاحية <span className="font-bold">ADMIN</span> في منظومة نفطال المركزية.
              </p>
            </div>
            <div className="pt-3 text-xs text-muted-foreground font-mono flex items-center justify-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-ping" />
              <span>جاري التوجيه إلى بوابة تسجيل الدخول الإدارية (B02)...</span>
            </div>
          </div> : <>
            {/* Card Header & Brand Identity */}
            <RegisterCardHeader />

            {/* Registration Form with Real-time Validations */}
            <RegisterForm formData={formData} errors={errors} isSubmitting={isSubmitting} onChange={handleFieldChange} onSubmit={handleSubmit} />

            {/* Footer with Return-to-login and audit watermark */}
            <RegisterCardFooter />
          </>}
      </main>

      {/* Bottom Subtle Regulatory Watermark */}
      <footer className="mt-4 text-center text-[11px] text-muted-foreground/60 font-body">
        الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الطاقة والمناجم — شركة نفطال ش.ذ.أ
      </footer>
    </div>;
}
