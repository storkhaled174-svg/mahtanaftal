"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, Save, Package, CreditCard, Truck, ShieldCheck, AlertCircle } from "lucide-react";
import { PlatformFaq, FaqCategory, FaqFormData } from "@/backend/types/AdminContentSupport";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  faqToEdit?: PlatformFaq | null;
  onSave: (data: FaqFormData, id?: string) => void;
}
const CATEGORY_OPTIONS: {
  value: FaqCategory;
  label: string;
  desc: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}[] = [{
  value: "ORDERS",
  label: "طلبيات الإطارات (ORDERS)",
  desc: "إجراءات اختيار القياسات وعلامات Continental و Iris وحجز الحصص",
  icon: Package
}, {
  value: "PAYMENT",
  label: "الدفع بالبطاقة الذهبية (PAYMENT)",
  desc: "عمليات الدفع الإلكتروني عبر بطاقة الذهبية وبطاقات CIB والتحقق من الرصيد",
  icon: CreditCard
}, {
  value: "DELIVERY",
  label: "الاستلام بالمحطات (DELIVERY)",
  desc: "مواعيد وجداول استلام الإطارات من محطات نفطال المختارة بالولايات",
  icon: Truck
}, {
  value: "WARRANTY",
  label: "الضمان وما بعد البيع (WARRANTY)",
  desc: "شهادات الضمان وخدمات الفحص والتركيب والاستبدال في شبكة نفطال",
  icon: ShieldCheck
}];
export const FaqFormModal: React.FC<FaqFormModalProps> = ({
  isOpen,
  onClose,
  faqToEdit,
  onSave
}) => {
  const [formData, setFormData] = useState<FaqFormData>({
    question: "",
    answer: "",
    category: "ORDERS",
    isActive: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (faqToEdit) {
      setFormData({
        question: faqToEdit.question,
        answer: faqToEdit.answer,
        category: faqToEdit.category,
        isActive: faqToEdit.isActive
      });
    } else {
      setFormData({
        question: "",
        answer: "",
        category: "ORDERS",
        isActive: true
      });
    }
    setErrors({});
  }, [faqToEdit, isOpen]);
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.question.trim()) {
      newErrors.question = "يرجى كتابة نص السؤال الموجه للزبائن";
    } else if (formData.question.trim().length < 5) {
      newErrors.question = "نص السؤال يجب أن يحتوي على 5 أحرف على الأقل";
    }
    if (!formData.answer.trim()) {
      newErrors.answer = "يرجى كتابة نص الإجابة الرسمية التوضيحية";
    } else if (formData.answer.trim().length < 10) {
      newErrors.answer = "نص الإجابة يجب أن يكون واضحاً ومفصلاً (10 أحرف كحد أدنى)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData, faqToEdit?.id);
    }
  };
  const categoryLabels: Record<FaqCategory, string> = {
    ORDERS: "طلبيات الإطارات (ORDERS)",
    PAYMENT: "الدفع بالبطاقة الذهبية (PAYMENT)",
    DELIVERY: "الاستلام بالمحطات (DELIVERY)",
    WARRANTY: "الضمان وما بعد البيع (WARRANTY)"
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='faqformmodal-rf6d0ba002e6bd6a4-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-xl border-border bg-card text-card-foreground p-6 shadow-card" data-api-unique-id='faqformmodal-rb3a14f2fee46d1c1-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
        <DialogHeader className="text-right" data-api-unique-id='faqformmodal-rad02a3a752787931-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
          <div className="flex items-center gap-2.5" data-api-unique-id='faqformmodal-rf14a1aa88968e1c9-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground" data-api-unique-id='faqformmodal-r32143595db730fbe-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <HelpCircle className="h-5 w-5" data-api-unique-id='faqformmodal-r6325ec379d372a6c-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
            </div>
            <div data-api-unique-id='faqformmodal-r1cb56b281e041e5c-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='faqformmodal-r29bfa31bbb1168f7-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                {faqToEdit ? "تعديل السؤال الشائع المعتمد" : "تسجيل سؤال شائع جديد في المنصة"}
              </DialogTitle>
              <DialogDescription className="font-body text-xs text-muted-foreground" data-api-unique-id='faqformmodal-r90fae9643f0f6802-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                البيانات المدخلة تظهر مباشرة للمواطنين في مركز مساعدة منصة نفطال محطتي فور الحفظ
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4" data-api-unique-id='faqformmodal-rd4956602a5529776-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
          {/* Question Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='faqformmodal-rd9c0bbeeeda1ab4e-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <label className="font-header text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='faqformmodal-r2e22f126071f968b-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <span data-api-unique-id='faqformmodal-racbb9bb12f62ee04-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>نص السؤال الشائع الموجه للزبائن (Question) <span className="text-destructive" data-api-unique-id='faqformmodal-r207e107be101d170-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>*</span></span>
              <span className="text-[10px] text-muted-foreground" data-api-unique-id='faqformmodal-r9a2e91268fb49e04-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>{formData.question.length} حرف</span>
            </label>
            <input type="text" value={formData.question} onChange={e => setFormData({
            ...formData,
            question: e.target.value
          })} placeholder="مثال: كيف يمكنني حجز موعد استلام الإطارات من المحطة؟" className={`h-9 w-full rounded-lg border bg-input px-3 font-body text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.question ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`} data-api-unique-id='faqformmodal-r28eeed0f8627a841-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
            {errors.question && <span className="flex items-center gap-1 text-[11px] font-medium text-destructive" data-api-unique-id='faqformmodal-r73654a7f3f3f8657-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                <AlertCircle className="h-3 w-3" data-api-unique-id='faqformmodal-r2c2cfad43995d6e7-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
                {errors.question}
              </span>}
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='faqformmodal-r69ac3c34409a7306-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <label className="font-header text-xs font-semibold text-foreground" data-api-unique-id='faqformmodal-r6facb9f469f73a1b-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              تصنيف السؤال الإداري (Category) <span className="text-destructive" data-api-unique-id='faqformmodal-r0b51df73e0f0b0e4-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>*</span>
            </label>
            <Select value={formData.category} onValueChange={val => setFormData({
            ...formData,
            category: val as FaqCategory
          })} data-api-unique-id='faqformmodal-r14f2f76badc1c728-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <SelectTrigger className="h-9 w-full border-border bg-input font-body text-xs text-foreground" data-api-unique-id='faqformmodal-rcd469c27ad581888-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                <SelectValue placeholder="اختر التصنيف المعتمد" data-api-unique-id='faqformmodal-r8a4c6bae40d8e69b-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                  {categoryLabels[formData.category]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="border-border bg-popover text-popover-foreground" data-api-unique-id='faqformmodal-r48b1d6e5d5486159-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                {CATEGORY_OPTIONS.map((opt, index) => {
                const Icon = opt.icon;
                return <SelectItem key={opt.value} value={opt.value} data-api-unique-id='faqformmodal-r41149b52f5b0e838-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1'>
                      <div className="flex items-center gap-2 text-right" data-api-unique-id='faqformmodal-rd458043a0e6ad40e-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1'>
                        <Icon className="h-3.5 w-3.5 text-primary" data-api-bind-info={`CATEGORY_OPTIONS-${index}-icon`} data-api-map-var-name='opt' data-api-unique-id='faqformmodal-r9a6678a5076769a1-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1' />
                        <div data-api-unique-id='faqformmodal-re3bffd86fe3c5c30-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1'>
                          <p className="font-header text-xs font-semibold" data-api-unique-id='faqformmodal-r9c2368a5c084c4cf-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1' data-api-bind-info={`CATEGORY_OPTIONS-${index}-label`} data-api-map-var-name='opt'>{opt.label}</p>
                          <p className="text-[10px] text-muted-foreground" data-api-unique-id='faqformmodal-r0434c74e1263e39e-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' data-api-in-loop='1' data-api-bind-info={`CATEGORY_OPTIONS-${index}-desc`} data-api-map-var-name='opt'>{opt.desc}</p>
                        </div>
                      </div>
                    </SelectItem>;
              })}
              </SelectContent>
            </Select>
          </div>

          {/* Answer Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='faqformmodal-rdd417629ec8f223c-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <label className="font-header text-xs font-semibold text-foreground flex items-center justify-between" data-api-unique-id='faqformmodal-r6407382060a506ff-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <span data-api-unique-id='faqformmodal-r8896d29bf05336b8-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>نص الإجابة التوضيحية الرسمية (Answer) <span className="text-destructive" data-api-unique-id='faqformmodal-re78d2e14332fec4d-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>*</span></span>
              <span className="text-[10px] text-muted-foreground" data-api-unique-id='faqformmodal-r362b5bac3a8bfc30-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>{formData.answer.length} حرف</span>
            </label>
            <textarea rows={4} value={formData.answer} onChange={e => setFormData({
            ...formData,
            answer: e.target.value
          })} placeholder="اكتب الإجابة الرسمية الواضحة والإجراءات المتبعة من شركة نفطال بالتفصيل..." className={`w-full rounded-lg border bg-input p-3 font-body text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.answer ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`} data-api-unique-id='faqformmodal-r8605801eda159c6a-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
            {errors.answer && <span className="flex items-center gap-1 text-[11px] font-medium text-destructive" data-api-unique-id='faqformmodal-r6b6995f03caaea00-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                <AlertCircle className="h-3 w-3" data-api-unique-id='faqformmodal-r5ca59cdeb0b92633-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
                {errors.answer}
              </span>}
          </div>

          {/* Is Active Switch / Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3" data-api-unique-id='faqformmodal-rbcd5157e74245c22-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <div className="flex flex-col" data-api-unique-id='faqformmodal-r4e77c20a982a4f37-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <span className="font-header text-xs font-bold text-foreground" data-api-unique-id='faqformmodal-rfa3e2278ccbca310-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                حالة تفعيل السؤال (is_active)
              </span>
              <span className="font-body text-[11px] text-muted-foreground" data-api-unique-id='faqformmodal-r085f759c142eff2b-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
                عند التفعيل، يظهر السؤال فوراً في البوابة الإلكترونية للمواطنين والزبائن
              </span>
            </div>

            <button type="button" onClick={() => setFormData({
            ...formData,
            isActive: !formData.isActive
          })} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formData.isActive ? "bg-success" : "bg-muted"}`} data-api-unique-id='faqformmodal-rd4848dd13cffed3d-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.isActive ? "translate-x-0" : "-translate-x-5"}`} data-api-unique-id='faqformmodal-r5cc9cb4798ccaf87-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
            </button>
          </div>

          {/* Modal Footer with Actions */}
          <DialogFooter className="mt-2 flex items-center justify-end gap-2 sm:gap-2" data-api-unique-id='faqformmodal-r865eabaac68076c5-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
            <button type="button" onClick={onClose} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted px-4 font-header text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='faqformmodal-r5ad99ce910f86b59-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              إلغاء
            </button>
            <button type="submit" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-header text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-primary/80" data-api-unique-id='faqformmodal-r97b415a014f72a44-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>
              <Save className="h-4 w-4" data-api-unique-id='faqformmodal-rcddc360207260d4b-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal' />
              <span data-api-unique-id='faqformmodal-re05cbfb0d7c5784f-s1459757967' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFormModal'>{faqToEdit ? "تحديث السؤال الشائع" : "حفظ ونشر السؤال"}</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>;
};
export default FaqFormModal;