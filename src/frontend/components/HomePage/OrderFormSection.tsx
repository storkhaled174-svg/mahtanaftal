"use client";

import React, { useState, useRef } from "react";
import { TireSizeOption, OrderFormData, WilayaItem, OrderReceipt, CreateOrderInput } from "@/frontend/types/HomePage";
import { createTireOrder } from "@/frontend/actions/HomePage";
import { CreditCard, Phone, User, MapPin, AlertCircle, FileCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
interface OrderFormSectionProps {
  formData: OrderFormData;
  onFormChange: (updated: Partial<OrderFormData>) => void;
  sizeOptions: TireSizeOption[];
  wilayas: WilayaItem[];
  onSubmitSuccess: (receipt: OrderReceipt) => void;
}
export default function OrderFormSection({
  formData,
  onFormChange,
  sizeOptions,
  wilayas,
  onSubmitSuccess
}: OrderFormSectionProps) {
  const submitting = useRef(false);
  const submissionKey = useRef('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected wilaya communes
  const currentWilaya = wilayas.find(w => w.code === formData.wilayaCode);
  const availableCommunes = currentWilaya ? currentWilaya.communes : [];

  // Current selected tire
  const currentTire = sizeOptions.find(s => s.id === formData.selectedSizeId);
  const unitPrice = currentTire ? currentTire.priceDzd : 0;
  const totalPrice = unitPrice * formData.quantity;

  // Filter sizes for the selected brand
  const brandSizes = sizeOptions.filter(s => s.brand === formData.brand);

  // Algerian phone validation (05, 06, 07 prefixes, 10 digits)
  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/\s+/g, "");
    return /^(05|06|07)[0-9]{8}$/.test(clean);
  };

  // Edahabia validation (exactly 8 digits)
  const edahabiaClean = formData.edahabiaNumber.replace(/\D/g, "");
  const edahabiaCount = edahabiaClean.length;
  const handlePhoneChange = (field: "primaryPhone" | "secondaryPhone", val: string) => {
    const clean = val.replace(/[^\d\s]/g, "");
    onFormChange({
      [field]: clean
    });
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  const handleEdahabiaChange = (val: string) => {
    if (!/^[0-9]{0,8}$/.test(val)) {
      setErrors(prev => ({ ...prev, edahabiaNumber: 'أدخل آخر 8 أرقام فقط، ولا تدخل رقم البطاقة الكامل' }));
      return;
    }
    const clean = val;
    onFormChange({
      edahabiaNumber: clean
    });
    if (errors.edahabiaNumber) {
      setErrors(prev => ({
        ...prev,
        edahabiaNumber: ""
      }));
    }
  };
  const handleExpiryChange = (val: string) => {
    let clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) {
      clean = clean.slice(0, 2) + "/" + clean.slice(2, 4);
    }
    onFormChange({
      edahabiaExpiry: clean
    });
    if (errors.edahabiaExpiry) {
      setErrors(prev => ({
        ...prev,
        edahabiaExpiry: ""
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "يرجى إدخال الاسم واللقب الكامل بصورة صحيحة";
    }
    if (!formData.primaryPhone.trim() || !validatePhone(formData.primaryPhone)) {
      newErrors.primaryPhone = "رقم الهاتف الأول إجباري ويجب أن يتكون من 10 أرقام ويبدأ بـ 05، 06، أو 07";
    }
    if (!formData.secondaryPhone.trim() || !validatePhone(formData.secondaryPhone)) {
      newErrors.secondaryPhone = "رقم الهاتف الثاني إجباري للتحقق ويجب أن يبدأ بـ 05، 06، أو 07";
    } else if (formData.secondaryPhone.replace(/\s+/g, "") === formData.primaryPhone.replace(/\s+/g, "")) {
      newErrors.secondaryPhone = "يجب أن يكون رقم الهاتف الثاني مختلفاً عن رقم الهاتف الأول";
    }
    if (!formData.wilayaCode) {
      newErrors.wilayaCode = "يرجى اختيار ولاية الاستلام";
    }
    if (!formData.commune) {
      newErrors.commune = "يرجى اختيار بلدية الاستلام";
    }
    if (!formData.selectedSizeId) {
      newErrors.selectedSizeId = "يرجى اختيار مقاس الإطار المعتمد";
    }
    if (!/^[0-9]{9,18}$/.test(formData.nidNumber.trim())) {
      newErrors.nidNumber = "رقم بطاقة التعريف الوطنية البيومترية إجباري وصحيح (9-18 رقماً)";
    }
    if (!/^[0-9]{8}$/.test(formData.edahabiaNumber)) {
      newErrors.edahabiaNumber = `رقم البطاقة الذهبية يجب أن يتكون من 8 أرقام أخيرة تماماً (الحالي: ${edahabiaCount})`;
    }
    if (!formData.edahabiaExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.edahabiaExpiry)) {
      newErrors.edahabiaExpiry = "تاريخ نهاية الصلاحية إجباري بصيغة MM/YY (مثال: 08/28)";
    }
    if (!formData.registrationDate) {
      newErrors.registrationDate = "تاريخ التسجيل إجباري";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    setSubmissionMessage('');
    if (!validateForm()) {
      toast.error("يرجى تصحيح الأخطاء واستكمال كافة الحقول الإجبارية");
      return;
    }
    if (!currentTire) {
      toast.error("يرجى اختيار مقاس العجلة المعتمد");
      return;
    }
    submitting.current = true;
    if (!submissionKey.current) submissionKey.current = crypto.randomUUID();
    setIsSubmitting(true);
    try {
      const input: CreateOrderInput = {
        submissionKey: submissionKey.current,
        customerName: formData.fullName.trim(),
        phoneNumber: formData.primaryPhone.replace(/\s+/g, ""),
        secondaryPhone: formData.secondaryPhone.replace(/\s+/g, ""),
        wilayaCode: formData.wilayaCode,
        commune: formData.commune.trim(),
        brand: formData.brand === "continental" ? "CONTINENTAL" : "IRIS",
        tireSize: currentTire.dimension,
        quantity: formData.quantity,
        nationalIdNumber: formData.nidNumber.trim(),
        dahabiaCardNumber: edahabiaClean,
        dahabiaExpiry: formData.edahabiaExpiry.trim(),
        registrationDate: formData.registrationDate ? new Date(formData.registrationDate) : undefined
      };
      const receipt = await createTireOrder(input);
      toast.success("تم تأكيد وتسجيل الطلبية الرسمية بنجاح!");
      setSubmissionMessage('تم حفظ التسجيل بنجاح');
      submissionKey.current = '';
      onSubmitSuccess(receipt);
    } catch (err) {
      const message = err instanceof Error ? err.message : "حدث خطأ أثناء معالجة وتثبيت الطلبية";
      setSubmissionMessage(message);
      toast.error(message);
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };
  return <section id="order-section" data-controller-name="استمارة تسجيل الطلبية الرسمية" className="w-full border-b border-border bg-card py-8 text-card-foreground sm:py-10" data-api-unique-id='orderformsection-r9d7e1e5ee0d5c3f4-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='orderformsection-rdd42988a310f3248-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
        
        <p role="status" aria-live="polite" className="text-center text-sm">{submissionMessage}</p>
        {/* Section Header */}
        <div className="mx-auto mb-6 max-w-3xl text-center" data-api-unique-id='orderformsection-r39b8dc05ff0fcbe7-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-secondary px-4 py-1 text-xs font-bold text-primary" data-api-unique-id='orderformsection-rb94f990953297f14-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
            <FileCheck className="h-4 w-4" data-api-unique-id='orderformsection-rd20780ebeaca99de-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
            <span data-api-unique-id='orderformsection-r9be950d679486312-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>نموذج الطلب السيادي الموحد</span>
          </div>
          <h2 className="font-header text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl" data-api-unique-id='orderformsection-rfa9ceca5456d090b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
            تسجيل طلبية الإطارات
          </h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground sm:text-base" data-api-unique-id='orderformsection-r970bd546971a8c1c-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
            يرجى إدخال كافة البيانات الشخصية والتقنية بدقة متناهية. جميع الحقول إجبارية لضمان تأكيد وتخصيص الحصة الرسمية بدون وسطاء.
          </p>
        </div>

        {/* Order Chamber Container */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-primary/30 bg-background p-4 shadow-lg sm:p-6" data-api-unique-id='orderformsection-rfcf48a946490fa4d-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
          <form onSubmit={handleSubmit} className="space-y-5" data-api-unique-id='orderformsection-r31490812ba1fe536-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
            
            {/* 1. Personal & Contact Information */}
            <div className="space-y-4" data-api-unique-id='orderformsection-r81a2149ed3d07c7f-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
              <h3 className="flex items-center gap-2 border-b border-border pb-2 font-header text-lg font-bold text-foreground" data-api-unique-id='orderformsection-r7a447aca01f86693-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <User className="h-5 w-5 text-primary" data-api-unique-id='orderformsection-r8fa00b5a465cd450-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                <span data-api-unique-id='orderformsection-rba1a9f6b7cc4b12a-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>1. المعلومات الشخصية وجهات الاتصال</span>
              </h3>

              {/* Full Name */}
              <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-r614f1b25322252b6-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r9b8a748e24560113-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  الاسم واللقب الكامل <span className="text-destructive" data-api-unique-id='orderformsection-r065af35d344d73e9-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                </label>
                <Input value={formData.fullName} onChange={e => {
                onFormChange({
                  fullName: e.target.value
                });
                if (errors.fullName) setErrors(prev => ({
                  ...prev,
                  fullName: ""
                }));
              }} placeholder="مثال: محمد بلقاسم" className="h-11 border-border bg-card text-right text-foreground focus:border-primary" data-api-unique-id='orderformsection-r15c33953d0adc725-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                {errors.fullName && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r7fb462ce8eedadac-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-r03018f7fd0e5f3cc-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    {errors.fullName}
                  </p>}
              </div>

              {/* Dual Phones (05/06/07) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-api-unique-id='orderformsection-r11bb2fdfda8b335d-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-r4133ccecbefbbe48-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r7f227e691f761fd9-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    رقم الهاتف الأول (05/06/07) <span className="text-destructive" data-api-unique-id='orderformsection-rfc310f9a74dacd44-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <div className="relative" data-api-unique-id='orderformsection-r6a1f414136e95326-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <Input dir="ltr" value={formData.primaryPhone} onChange={e => handlePhoneChange("primaryPhone", e.target.value)} placeholder="06XXXXXXXX" maxLength={10} className="h-11 border-border bg-card text-left font-mono text-foreground focus:border-primary" data-api-unique-id='orderformsection-r4b7b4c409008b5ff-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    <Phone className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-muted-foreground" data-api-unique-id='orderformsection-rb50c9a0779736181-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                  </div>
                  {errors.primaryPhone && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-rb58d7bae5ac02430-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-r958626198e093364-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.primaryPhone}
                    </p>}
                </div>

                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-r613bea5285ff6438-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-rc7df93bffbbccef3-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    رقم الهاتف الثاني (إجباري 05/06/07) <span className="text-destructive" data-api-unique-id='orderformsection-re57287272808c330-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <div className="relative" data-api-unique-id='orderformsection-r96ce1026e3ec13ef-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <Input dir="ltr" value={formData.secondaryPhone} onChange={e => handlePhoneChange("secondaryPhone", e.target.value)} placeholder="05XXXXXXXX" maxLength={10} className="h-11 border-border bg-card text-left font-mono text-foreground focus:border-primary" data-api-unique-id='orderformsection-re6ceb9c3d7a169ac-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    <Phone className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-muted-foreground" data-api-unique-id='orderformsection-rd1f2660501866450-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                  </div>
                  {errors.secondaryPhone && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r9d355e3adab4967b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-r10f0e5d64fa8ff2e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.secondaryPhone}
                    </p>}
                </div>
              </div>

              {/* Wilaya & Commune */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-api-unique-id='orderformsection-rc97958f06977f086-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-rc6916cd4c53f6743-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-rdc4282543477fff1-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    ولاية الاستلام (الـ 58 ولاية) <span className="text-destructive" data-api-unique-id='orderformsection-rea5d970fa44e455b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <Select value={formData.wilayaCode} onValueChange={val => {
                  const matched = wilayas.find(w => w.code === val);
                  const defaultCommune = matched && matched.communes.length > 0 ? matched.communes[0] : "";
                  onFormChange({
                    wilayaCode: val,
                    commune: defaultCommune
                  });
                  if (errors.wilayaCode) setErrors(prev => ({
                    ...prev,
                    wilayaCode: ""
                  }));
                }} data-api-unique-id='orderformsection-rf8c4c805a7632333-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <SelectTrigger className="h-11 w-full min-w-0 border-border bg-card text-right text-foreground" data-api-unique-id='orderformsection-r074284010c598bf4-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <SelectValue placeholder="اختر ولاية الاستلام..." data-api-unique-id='orderformsection-r05461d7c9d0b8303-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 border-border bg-popover text-popover-foreground" data-api-unique-id='orderformsection-r4f97ae919dc44071-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      {wilayas.map((w, index) => <SelectItem key={w.code} value={w.code} className="text-right" data-api-unique-id='orderformsection-r603d60d2a854402f-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1' data-api-bind-info={`wilayas-${index}-code`} data-api-map-var-name='w'>
                          {w.code} - {w.nameAr}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.wilayaCode && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r329b12e24df39787-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-rc2e0d92cc269f96e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.wilayaCode}
                    </p>}
                </div>

                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-rb7c6b68c33eb110f-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r25eb835df20723f5-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    بلدية التوزيع أو الإقامة <span className="text-destructive" data-api-unique-id='orderformsection-r79a62591442cfff9-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <Select value={formData.commune} onValueChange={val => {
                  onFormChange({
                    commune: val
                  });
                  if (errors.commune) setErrors(prev => ({
                    ...prev,
                    commune: ""
                  }));
                }} disabled={!formData.wilayaCode} data-api-unique-id='orderformsection-r73526c98598d7b94-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <SelectTrigger className="h-11 w-full min-w-0 border-border bg-card text-right text-foreground disabled:opacity-50" data-api-unique-id='orderformsection-rdf7270863f180d10-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <SelectValue placeholder="اختر بلدية الإقامة أو التوزيع..." data-api-unique-id='orderformsection-r7a39ee7dc8a91787-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 border-border bg-popover text-popover-foreground" data-api-unique-id='orderformsection-rba74de962c555956-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      {availableCommunes.map((c, index) => <SelectItem key={c} value={c} className="text-right" data-api-unique-id='orderformsection-r725ce139ef4d520e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1' data-api-bind-info={`availableCommunes-${index}-$item`} data-api-map-var-name='c'>
                          {c}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.commune && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r37e35f208ea38320-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-rac5c5cfd9f0f7af1-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.commune}
                    </p>}
                </div>
              </div>
            </div>

            {/* 2. Tire Specifications & Quantity */}
            <div className="space-y-4" data-api-unique-id='orderformsection-rdf91a890fbcccb08-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
              <h3 className="flex items-center gap-2 border-b border-border pb-2 font-header text-lg font-bold text-foreground" data-api-unique-id='orderformsection-r1e88e84674f1f5e6-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <MapPin className="h-5 w-5 text-primary" data-api-unique-id='orderformsection-r27a2d80fab405361-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                <span data-api-unique-id='orderformsection-rff01d7931664c974-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>2. مواصفات الإطارات والكمية المقننة</span>
              </h3>

              {/* Brand & Size Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" data-api-unique-id='orderformsection-rb95469fda5ff4654-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-rbb0337f353aaf78e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r99c8808b254fd5a4-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    العلامة المعتمدة <span className="text-destructive" data-api-unique-id='orderformsection-r2e17fff40bd34aee-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2" data-api-unique-id='orderformsection-r175af59ee137733f-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <button type="button" onClick={() => {
                    onFormChange({
                      brand: "continental"
                    });
                    const first = sizeOptions.find(s => s.brand === "continental");
                    if (first) onFormChange({
                      selectedSizeId: first.id
                    });
                  }} className={`h-11 rounded-lg border font-bold text-sm transition-all ${formData.brand === "continental" ? "border-primary bg-primary text-primary-foreground shadow-sm ring-1 ring-primary" : "border-border bg-card text-card-foreground hover:bg-muted"}`} data-api-unique-id='orderformsection-r1c9c263ff77e8449-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      CONTINENTAL
                    </button>
                    <button type="button" onClick={() => {
                    onFormChange({
                      brand: "iris"
                    });
                    const first = sizeOptions.find(s => s.brand === "iris");
                    if (first) onFormChange({
                      selectedSizeId: first.id
                    });
                  }} className={`h-11 rounded-lg border font-bold text-sm transition-all ${formData.brand === "iris" ? "border-primary bg-primary text-primary-foreground shadow-sm ring-1 ring-primary" : "border-border bg-card text-card-foreground hover:bg-muted"}`} data-api-unique-id='orderformsection-r5053df657af4e49e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      IRIS TYRES
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-ra6887dae0a407d4b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-rb52dbe76446688c2-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    المقاس المختار (حساب فوري للسعر) <span className="text-destructive" data-api-unique-id='orderformsection-r7ca14f5ce7c1884b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <Select value={formData.selectedSizeId} onValueChange={val => {
                  onFormChange({
                    selectedSizeId: val
                  });
                  if (errors.selectedSizeId) setErrors(prev => ({
                    ...prev,
                    selectedSizeId: ""
                  }));
                }} data-api-unique-id='orderformsection-r794d4ad564fae9b9-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <SelectTrigger className="h-11 w-full min-w-0 border-border bg-card text-right text-foreground" data-api-unique-id='orderformsection-rc803ab6ac917d271-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <SelectValue placeholder="اختر المقاس..." data-api-unique-id='orderformsection-ra2b07bbe116413c4-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 border-border bg-popover text-popover-foreground" data-api-unique-id='orderformsection-r392531580916a28f-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      {brandSizes.map((s, index) => <SelectItem key={s.id} value={s.id} className="text-right font-mono" data-api-unique-id='orderformsection-r9a1b6d13ae37c982-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1' data-api-bind-info={`brandSizes-${index}-dimension`} data-api-map-var-name='s'>
                          {s.dimension} ({s.loadSpeed}) — {s.priceDzd.toLocaleString()} دج
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.selectedSizeId && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r132feceb93b49982-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-re33e5582d6e605c2-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.selectedSizeId}
                    </p>}
                </div>
              </div>

              {/* Quantity Selector: 1, 2, 3, or 4 ONLY */}
              <div className="space-y-2 text-right" data-api-unique-id='orderformsection-r1580f87ef147c8e1-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="flex items-center justify-between" data-api-unique-id='orderformsection-ra49308f41749b616-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r872ee4e4e1d444b8-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    عدد الإطارات المطلوبة (الحصة القصوى: 4 إطارات للمركبة) <span className="text-destructive" data-api-unique-id='orderformsection-rc0746f4453550121-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='orderformsection-r2a46727683c2626d-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    السعر الإجمالي: <strong className="text-primary text-sm" data-api-unique-id='orderformsection-rc6383dadcab5ef86-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>{totalPrice.toLocaleString()} دج</strong>
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3" data-api-unique-id='orderformsection-r3a49b47cea937dc5-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  {([1, 2, 3, 4] as const).map((q, index) => <button key={q} type="button" onClick={() => onFormChange({
                  quantity: q
                })} className={`flex h-11 flex-col items-center justify-center rounded-xl border text-base font-bold transition-all ${formData.quantity === q ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary" : "border-border bg-card text-card-foreground hover:border-border/80 hover:bg-muted"}`} data-api-unique-id='orderformsection-r755ab0d696628cd5-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1'>
                      <span className="font-mono text-xl" data-api-unique-id='orderformsection-r14d509fcd1fff1e3-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1' data-api-bind-info={`list-${index}-$item`} data-api-map-var-name='q'>{q}</span>
                      <span className="text-[11px] font-normal opacity-90" data-api-unique-id='orderformsection-r62a5e2e546769c85-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' data-api-in-loop='1'>
                        {q === 1 ? "إطار واحد" : q === 2 ? "إطاران" : `${q} إطارات`}
                      </span>
                    </button>)}
                </div>
              </div>
            </div>

            {/* 3. National Identity & Edahabia Security Check */}
            <div className="space-y-4" data-api-unique-id='orderformsection-r2d0c1653bb489dbf-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
              <h3 className="flex items-center gap-2 border-b border-border pb-2 font-header text-lg font-bold text-foreground" data-api-unique-id='orderformsection-rc32b92a3b8534698-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <CreditCard className="h-5 w-5 text-primary" data-api-unique-id='orderformsection-r947cd10f52e68ec1-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                <span data-api-unique-id='orderformsection-r53c99019ff5c3bf7-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>3. التحقق الأمني والبطاقة الذهبية (8 أرقام أخيرة تماماً)</span>
              </h3>

              {/* NID */}
              <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-r95079d58e877f62b-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-rce9c75c25eb203dc-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  رقم بطاقة التعريف الوطنية البيومترية (NID) <span className="text-destructive" data-api-unique-id='orderformsection-re47aa3d749320466-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                </label>
                <Input dir="ltr" value={formData.nidNumber} onChange={e => {
                onFormChange({
                  nidNumber: e.target.value.replace(/\D/g, "")
                });
                if (errors.nidNumber) setErrors(prev => ({
                  ...prev,
                  nidNumber: ""
                }));
              }} placeholder="مثال: 108392019283" className="h-11 border-border bg-card text-left font-mono text-foreground focus:border-primary" data-api-unique-id='orderformsection-r3dcb41e164bfa9cb-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                {errors.nidNumber && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-ra518603360713f7c-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-re81b0b9f547bc9d3-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    {errors.nidNumber}
                  </p>}
              </div>

              {/* Edahabia Number with Live Counter (0 / 8) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" data-api-unique-id='orderformsection-rd6f295e536aa8488-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="space-y-1.5 text-right sm:col-span-2" data-api-unique-id='orderformsection-rd2cb38475cb408b3-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <div className="flex items-center justify-between" data-api-unique-id='orderformsection-rbec214b496caa8b0-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r260837cb005c2511-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      رقم البطاقة الذهبية (8 أرقام أخيرة تماماً) <span className="text-destructive" data-api-unique-id='orderformsection-r59512b2ca1516a55-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                    </label>
                    <span className={`font-mono text-xs font-bold rounded px-2 py-0.5 ${edahabiaCount === 8 ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"}`} data-api-unique-id='orderformsection-r5e6f8d44319eec84-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      {edahabiaCount} / 8 أرقام أخيرة
                    </span>
                  </div>
                  <div className="relative" data-api-unique-id='orderformsection-r8464f0c0392994a6-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <Input dir="ltr" value={formData.edahabiaNumber} onChange={e => handleEdahabiaChange(e.target.value)} placeholder="12345678" maxLength={8} inputMode="numeric" pattern="[0-9]{8}" autoComplete="off" onPaste={e => {
                      const pasted = e.clipboardData.getData('text');
                      if (!/^[0-9]{1,8}$/.test(pasted)) {
                        e.preventDefault();
                        setErrors(prev => ({ ...prev, edahabiaNumber: 'أدخل آخر 8 أرقام فقط، ولا تلصق رقم البطاقة الكامل' }));
                      }
                    }} onBlur={() => {
                      if (!/^[0-9]{8}$/.test(formData.edahabiaNumber)) setErrors(prev => ({ ...prev, edahabiaNumber: 'أدخل آخر 8 أرقام بالضبط' }));
                    }} className="h-11 border-border bg-card text-left font-mono tracking-widest text-foreground focus:border-primary" data-api-unique-id='orderformsection-r740a10689e0469c0-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                  </div>
                  {errors.edahabiaNumber && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r4ac41325160f7a38-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-rde1a846cd2190da3-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.edahabiaNumber}
                    </p>}
                </div>

                {/* Expiry Date */}
                <div className="space-y-1.5 text-right" data-api-unique-id='orderformsection-r0d6240b2a7cf0181-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r6774a1ab9b5518aa-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    تاريخ الانتهاء (MM/YY) <span className="text-destructive" data-api-unique-id='orderformsection-rde282968ead0d189-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <Input dir="ltr" value={formData.edahabiaExpiry} onChange={e => handleExpiryChange(e.target.value)} placeholder="08/28" maxLength={5} className="h-11 border-border bg-card text-center font-mono text-foreground focus:border-primary" data-api-unique-id='orderformsection-r14fe36b4a26b4eff-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                  {errors.edahabiaExpiry && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r3525d33e58ed43d1-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                      <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-r7bafc3960828a144-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                      {errors.edahabiaExpiry}
                    </p>}
                </div>
              </div>

              {/* Registration Date Field directly under Expiry Date */}
              <div className="space-y-1.5 pt-2 text-right" data-api-unique-id='orderformsection-r0b40cd496ed3aff6-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <div className="flex items-center justify-between" data-api-unique-id='orderformsection-r68a9bc64696149e7-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  <label className="flex items-center gap-1.5 font-header text-sm font-semibold text-foreground" data-api-unique-id='orderformsection-r2c2e6e57d1bc5fca-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <Calendar className="h-4 w-4 text-primary" data-api-unique-id='orderformsection-r9205de9375986bbd-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    <span data-api-unique-id='orderformsection-r9f26bcb7d1f15d69-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>تاريخ تسجيل الطلبية</span>
                    <span className="text-destructive" data-api-unique-id='orderformsection-r5505a3c838f4a966-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>*</span>
                  </label>
                  <span className="text-xs text-muted-foreground" data-api-unique-id='orderformsection-ra5cf21e771d7fa73-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    (تاريخ الحجز المعتمد)
                  </span>
                </div>
                <Input type="date" value={formData.registrationDate} onChange={e => {
                onFormChange({
                  registrationDate: e.target.value
                });
                if (errors.registrationDate) setErrors(prev => ({
                  ...prev,
                  registrationDate: ""
                }));
              }} className="h-11 border-border bg-card text-center font-mono text-foreground" data-api-unique-id='orderformsection-r0a73eeec1fbc3f29-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                {errors.registrationDate && <p className="flex items-center gap-1 font-body text-xs text-destructive" data-api-unique-id='orderformsection-r95952e34fac24c72-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                    <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='orderformsection-r9b06d7b13b91fa9e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection' />
                    {errors.registrationDate}
                  </p>}
              </div>
            </div>

            {/* Order Confirmation Notice & Submit */}
            <div className="space-y-4 rounded-xl border border-border bg-secondary p-4 text-secondary-foreground sm:p-6" data-api-unique-id='orderformsection-r38010e7f0b7983e0-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/80 pb-3" data-api-unique-id='orderformsection-r806560f90610370e-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                <span className="font-header text-sm font-bold text-foreground" data-api-unique-id='orderformsection-rc583a82629ddab28-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  المبلغ الإجمالي المستحق عند الاستلام:
                </span>
                <span className="font-mono text-2xl font-black text-primary" data-api-unique-id='orderformsection-r752434a9f94670c8-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                  {totalPrice.toLocaleString()} دج
                </span>
              </div>

              <p className="font-body text-xs leading-relaxed text-muted-foreground text-right" data-api-unique-id='orderformsection-r3a0d1880320db7d6-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                * التسجيل عبر المنصة يمنحكم حجزا مسبقاً وتخصيصاً رسمياً لحصتكم. الدفع والاستلام يتمان مباشرة عبر محطة نفطال المعينة في الوصل وفق التعريفات الرسمية المعتمدة بالبطاقة الذهبية أو نقداً.
              </p>

              <Button type="submit" disabled={isSubmitting} className="h-11 w-full bg-primary text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50" data-api-unique-id='orderformsection-r4b860ee843368edb-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>
                {isSubmitting ? <span data-api-unique-id='orderformsection-rf92a9a9d6e955ec2-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>جاري معالجة وتثبيت الطلبية...</span> : <span data-api-unique-id='orderformsection-r493df9a2cea2f8ea-s942584081' data-api-unique-page-name='src/frontend/components/HomePage/OrderFormSection'>تأكيد وتسجيل الطلبية الرسمية</span>}
              </Button>
            </div>

          </form>
        </div>

      </div>
    </section>;
}