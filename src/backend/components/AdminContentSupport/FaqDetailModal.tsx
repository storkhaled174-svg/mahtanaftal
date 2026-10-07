"use client";

import React from "react";
import { Package, CreditCard, Truck, ShieldCheck, CheckCircle2, XCircle, Clock, Edit3, FileText } from "lucide-react";
import { PlatformFaq, FaqCategory } from "@/backend/types/AdminContentSupport";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
interface FaqDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq: PlatformFaq | null;
  onEdit: (faq: PlatformFaq) => void;
  onToggleActive: (id: string, currentState: boolean) => void;
}
const CATEGORY_MAP: Record<FaqCategory, {
  label: string;
  bgClass: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}> = {
  ORDERS: {
    label: "طلبيات الإطارات (ORDERS)",
    bgClass: "bg-secondary text-secondary-foreground",
    icon: Package
  },
  PAYMENT: {
    label: "الدفع بالبطاقة الذهبية (PAYMENT)",
    bgClass: "bg-warning text-warning-foreground",
    icon: CreditCard
  },
  DELIVERY: {
    label: "الاستلام بالمحطات (DELIVERY)",
    bgClass: "bg-success text-success-foreground",
    icon: Truck
  },
  WARRANTY: {
    label: "الضمان وما بعد البيع (WARRANTY)",
    bgClass: "bg-info text-info-foreground",
    icon: ShieldCheck
  }
};
const formatDate = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ar-DZ", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
export const FaqDetailModal: React.FC<FaqDetailModalProps> = ({
  isOpen,
  onClose,
  faq,
  onEdit,
  onToggleActive
}) => {
  if (!faq) return null;
  const cat = CATEGORY_MAP[faq.category] || CATEGORY_MAP.ORDERS;
  const Icon = cat.icon;
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='faqdetailmodal-r167c72fb545c0ad5-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-xl border-border bg-card text-card-foreground p-6 shadow-card" data-api-unique-id='faqdetailmodal-r882f1f8ba983d148-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
        <DialogHeader className="text-right" data-api-unique-id='faqdetailmodal-r404d8230351503c0-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
          <div className="flex items-center justify-between gap-3" data-api-unique-id='faqdetailmodal-r08feae62eb7c53f6-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
            <div className="flex items-center gap-2.5" data-api-unique-id='faqdetailmodal-rc94f9c4525f70d8f-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground" data-api-unique-id='faqdetailmodal-r16555a2917b86859-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                <FileText className="h-5 w-5" data-api-unique-id='faqdetailmodal-r2fd53e4c7e3bff78-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
              </div>
              <div data-api-unique-id='faqdetailmodal-rcb0408b788ee757e-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='faqdetailmodal-r5add19491639a399-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                  تفاصيل السؤال الشائع المعتمد
                </DialogTitle>
                <DialogDescription className="font-mono text-[11px] text-muted-foreground" data-api-unique-id='faqdetailmodal-r4201a22a27b0db8b-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                  معرّف السجل: {faq.id}
                </DialogDescription>
              </div>
            </div>

            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cat.bgClass}`} data-api-unique-id='faqdetailmodal-rc52307fc3e926474-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              <Icon className="h-3.5 w-3.5" data-api-unique-id='faqdetailmodal-rb8965894e2620181-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
              <span data-api-unique-id='faqdetailmodal-r20cedd98401e9d9d-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>{cat.label}</span>
            </span>
          </div>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4" data-api-unique-id='faqdetailmodal-ra1643263547086aa-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
          {/* Question Box */}
          <div className="rounded-xl border border-border bg-input p-4" data-api-unique-id='faqdetailmodal-rfc4b98ef9aa6b59b-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
            <span className="block font-header text-xs font-semibold text-primary" data-api-unique-id='faqdetailmodal-ra9ee16255522adae-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>السؤال الموجه للزبائن:</span>
            <p className="mt-1.5 font-header text-sm font-bold leading-relaxed text-foreground" data-api-unique-id='faqdetailmodal-r5700dfcb3295c574-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              {faq.question}
            </p>
          </div>

          {/* Official Answer Box */}
          <div className="rounded-xl border border-border bg-muted/40 p-4" data-api-unique-id='faqdetailmodal-r35afc2e92927f976-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
            <span className="block font-header text-xs font-semibold text-muted-foreground" data-api-unique-id='faqdetailmodal-r82a7927aa1a7e3b5-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              نص الإجابة التوضيحية الرسمية من شركة نفطال:
            </span>
            <p className="mt-2 font-body text-xs leading-relaxed text-foreground whitespace-pre-line" data-api-unique-id='faqdetailmodal-rab5b557ecef11e84-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              {faq.answer}
            </p>
          </div>

          {/* Meta & System Parameters */}
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-xs" data-api-unique-id='faqdetailmodal-r7ab154cf4bae03f7-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
            <div data-api-unique-id='faqdetailmodal-re426c9d4e986e6dd-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='faqdetailmodal-r5ebdc086be2c0077-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>حالة العرض في المنصة:</span>
              <div className="mt-1 flex items-center gap-1.5" data-api-unique-id='faqdetailmodal-r5d68f30ee94a4116-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                {faq.isActive ? <span className="inline-flex items-center gap-1 font-semibold text-success" data-api-unique-id='faqdetailmodal-rca312066223d7702-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                    <CheckCircle2 className="h-4 w-4" data-api-unique-id='faqdetailmodal-r495614b517067c3b-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
                    مفعل وظاهر للمواطنين
                  </span> : <span className="inline-flex items-center gap-1 font-semibold text-muted-foreground" data-api-unique-id='faqdetailmodal-r030f652f6a9c748f-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                    <XCircle className="h-4 w-4" data-api-unique-id='faqdetailmodal-r2029d74fd0dd279b-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
                    معطل / غير ظاهر
                  </span>}
              </div>
            </div>

            <div data-api-unique-id='faqdetailmodal-r61233f9f29938ca6-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='faqdetailmodal-rb2dcb731abe1e235-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>تاريخ آخر اعتماد:</span>
              <div className="mt-1 flex items-center gap-1 font-mono text-xs text-foreground" data-api-unique-id='faqdetailmodal-rb3d199ad203c2fc3-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                <Clock className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='faqdetailmodal-rdaa703ad67c6fae8-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
                <span data-api-unique-id='faqdetailmodal-r7528f1800d9866bb-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>{formatDate(faq.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3" data-api-unique-id='faqdetailmodal-r77d41bc1c972992b-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
            <button type="button" onClick={() => onToggleActive(faq.id, faq.isActive)} className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 font-header text-xs font-medium transition-colors ${faq.isActive ? "border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20" : "border border-success/30 bg-success/10 text-success hover:bg-success/20"}`} data-api-unique-id='faqdetailmodal-r6556f6e3b29aa564-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              {faq.isActive ? "تعطيل السؤال" : "تفعيل ونشر السؤال"}
            </button>

            <div className="flex items-center gap-2" data-api-unique-id='faqdetailmodal-r6f7347a36fabe677-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
              <button type="button" onClick={onClose} className="inline-flex h-8 items-center rounded-lg border border-border bg-muted px-3 font-header text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-secondary-foreground" data-api-unique-id='faqdetailmodal-rf4d1406fa58b9841-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                إغلاق
              </button>
              <button type="button" onClick={() => {
              onClose();
              onEdit(faq);
            }} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 font-header text-xs font-bold text-primary-foreground hover:bg-primary/90" data-api-unique-id='faqdetailmodal-r51173a6ddc47fe72-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>
                <Edit3 className="h-3.5 w-3.5" data-api-unique-id='faqdetailmodal-r3dec6a1b7f000b62-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal' />
                <span data-api-unique-id='faqdetailmodal-rc8ac6e31e65ceeee-s379108271' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDetailModal'>فتح نموذج التعديل</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default FaqDetailModal;