"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PortalHeader from "@/frontend/components/CustomerRegister/PortalHeader";
import SovereignRulesPanel from "@/frontend/components/CustomerRegister/SovereignRulesPanel";
import RegisterForm from "@/frontend/components/CustomerRegister/RegisterForm";
import PortalFooter from "@/frontend/components/CustomerRegister/PortalFooter";
import { CustomerRegisterFormData, FormValidationErrors } from "@/frontend/types/CustomerRegister";
import { registerCustomer } from "@/frontend/actions/CustomerRegister";
import { CustomerLogin } from "@/frontend/route-params";
export default function CustomerRegisterPage() {
  const router = useRouter();

  // Initial Form State
  const [formData, setFormData] = useState<CustomerRegisterFormData>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nationalIdNumber: "",
    acceptTerms: true
  });
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (field: keyof CustomerRegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear field-level error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = {
          ...prev
        };
        delete next[field];
        return next;
      });
    }
  };
  const validateForm = (): boolean => {
    const newErrors: FormValidationErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "يرجى إدخال الاسم واللقب الكامل";
    } else if (formData.fullName.trim().length < 4) {
      newErrors.fullName = "الاسم واللقب يجب أن يحتوي على 4 أحرف على الأقل";
    }
    if (!formData.username.trim()) {
      newErrors.username = "يرجى تحديد اسم مستخدم أو معرف دخول";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "اسم المستخدم يجب أن لا يقل عن 3 أحرف";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "يرجى إدخال رقم الهاتف الرئيسي";
    } else {
      const cleanPhone = formData.phoneNumber.replace(/\s+/g, "");
      const dzPhoneRegex = /^(05|06|07|\+2135|\+2136|\+2137|2135|2136|2137)[0-9]{8}$/;
      if (!dzPhoneRegex.test(cleanPhone)) {
        newErrors.phoneNumber = "رقم هاتف جزائري غير صالح (يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام)";
      }
    }
    if (!formData.nationalIdNumber.trim()) {
      newErrors.nationalIdNumber = "يرجى إدخال رقم بطاقة التعريف الوطنية البيومترية (NIN)";
    } else {
      const cleanNin = formData.nationalIdNumber.replace(/\D/g, "");
      if (cleanNin.length !== 18) {
        newErrors.nationalIdNumber = `رقم التعريف الوطني البيومتري يجب أن يتكون من 18 رقماً بالضبط (المكتوب حالياً: ${cleanNin.length})`;
      }
    }
    if (!formData.password) {
      newErrors.password = "يرجى إدخال كلمة المرور";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "يجب الإقرار بصحة البيانات للمتابعة";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("يرجى تصحيح أخطاء النموذج المدخلة للمتابعة");
      return;
    }
    setIsSubmitting(true);
    try {
      await registerCustomer({
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        nationalIdNumber: formData.nationalIdNumber
      });
      toast.success("تم إنشاء وتوثيق حساب الزبون بنجاح! جاري التوجيه لصفحة تسجيل الدخول...");

      // Navigate directly to CustomerLogin (F03)
      CustomerLogin.navigateTo(router);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "تعذر إتمام عملية التسجيل حالياً، يرجى المحاولة لاحقاً";
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div dir="rtl" className="min-h-screen flex flex-col justify-between bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      {/* 1. Header with Sovereign Naftal Branding */}
      <PortalHeader />

      {/* 2. Main Double-Wing Sovereign Workspace */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Wing (40%): Sovereign Rules & National Quota Panel */}
          <div className="lg:col-span-5 w-full min-w-0">
            <SovereignRulesPanel />
          </div>

          {/* Right Wing (60%): High-Precision Customer Registration Core Workbench */}
          <div className="lg:col-span-7 w-full min-w-0">
            <RegisterForm formData={formData} errors={errors} isSubmitting={isSubmitting} onInputChange={handleInputChange} onSubmit={handleSubmit} />
          </div>
        </div>
      </main>

      {/* 3. Official Sovereign Footer */}
      <PortalFooter />
    </div>;
}
