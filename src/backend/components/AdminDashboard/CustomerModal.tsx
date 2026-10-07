"use client";

import React, { useState } from "react";
import { ShieldCheck, CreditCard, User, Lock, Copy, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { OrderItem } from "@/backend/types/AdminDashboard";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
interface CustomerModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function CustomerModal({
  order,
  isOpen,
  onClose
}: CustomerModalProps) {
  const [revealDahabia, setRevealDahabia] = useState(false);
  const [revealNin, setRevealNin] = useState(false);
  if (!order) return null;

  // Format Dahabia with space separation: 6280 XXXX XXXX XXXX (18 digits)
  const formatDahabia = (num: string) => {
    const clean = (num || "").replace(/\s+/g, "");
    if (!revealDahabia) {
      return `${clean.slice(0, 4)} •••• •••• •••• ${clean.slice(-2)}`;
    }
    return clean.replace(/(\d{4})/g, "$1 ").trim() || num;
  };
  const formatNin = (num: string) => {
    const clean = num || "";
    if (!revealNin) {
      return `${clean.slice(0, 4)} •••••••• ${clean.slice(-4)}`;
    }
    return clean;
  };
  const formatRegisteredDate = (date?: Date | string | null) => {
    if (!date) return "غير متوفر";
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return typeof date === "string" ? date : "غير متوفر";
      return d.toLocaleString("ar-DZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "غير متوفر";
    }
  };
  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(`تم نسخ ${label} بنجاح إلى الحافظة`);
    }
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='customermodal-r965d6bb3788d1ea9-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg bg-card text-card-foreground border-border" data-api-unique-id='customermodal-r9a36d8810a9d0284-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
        <DialogHeader data-api-unique-id='customermodal-r99eb42661e9feeba-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
          <div className="flex items-center gap-2" data-api-unique-id='customermodal-r7bc5e897d78ee03d-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 border border-primary/30 text-primary" data-api-unique-id='customermodal-r64caca348f145a54-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <ShieldCheck className="h-5 w-5" data-api-unique-id='customermodal-r935373c977c229c9-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
            </div>
            <div data-api-unique-id='customermodal-r6f5d81e97cc9f0bf-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='customermodal-r4cf4d33ec17a5535-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                بطاقة التحقق السيادي وبيانات الهوية والدفع المشفرة
              </DialogTitle>
              <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='customermodal-r5e8703f47e8bb04b-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                الرقم المرجعي للطلب: {order.orderNumber}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 text-xs pt-1" data-api-unique-id='customermodal-r06e3f890e9e3c7bc-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
          {/* Security & RLS Protocol Notice */}
          <div className="flex items-start gap-2.5 rounded-lg border border-primary/30 bg-primary/5 p-3 text-primary" data-api-unique-id='customermodal-r071ab1353a14ff41-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            <Lock className="h-4 w-4 shrink-0 mt-0.5" data-api-unique-id='customermodal-rf249b44a0efd2766-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
            <div className="space-y-0.5" data-api-unique-id='customermodal-rcf0e198a0fde93a5-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <p className="font-bold text-foreground" data-api-unique-id='customermodal-r12a5f78d8ef1903d-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                سجل محمي تحت بروتوكول السرية المصرفية والتعريف الوطني البيومتري
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed" data-api-unique-id='customermodal-ra1918f12ad6f4fde-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                يتم تسجيل كل عملية كشف لأرقام بطاقة الذهبية (18 خانة) وبطاقة التعريف لأغراض التدقيق والمطابقة التشغيلية مع نفطال وبريد الجزائر.
              </p>
            </div>
          </div>

          {/* Section 1: Customer Info */}
          <div className="rounded-lg border border-border bg-background p-3.5 space-y-2.5" data-api-unique-id='customermodal-rc732d488621dbd28-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            <h3 className="font-bold text-foreground flex items-center gap-1.5 border-b border-border/60 pb-1.5" data-api-unique-id='customermodal-ra427efa626155a61-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <User className="h-3.5 w-3.5 text-primary" data-api-unique-id='customermodal-r1602612425afced7-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
              <span data-api-unique-id='customermodal-r527654de054e70f2-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>البيانات الشخصية وعناوين التسليم</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-api-unique-id='customermodal-r3e2a0e47a07ea3e3-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <div data-api-unique-id='customermodal-r2f7c3e7c25111bf0-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-r46a0423f266bfa06-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>الاسم واللقب:</span>
                <span className="font-semibold text-foreground text-xs" data-api-unique-id='customermodal-rf85545f21a66caa3-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>{order.customerName}</span>
              </div>

              <div data-api-unique-id='customermodal-r65cea925f0df6056-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-r0ec71882fc519191-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>تاريخ ووقت التسجيل:</span>
                <span className="font-mono text-foreground text-xs" data-api-unique-id='customermodal-r3cbafc402f63bfd2-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  {formatRegisteredDate(order.createdAt)}
                </span>
              </div>

              <div data-api-unique-id='customermodal-r5173e89da5f4ad75-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-r300d3157416f4872-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>رقم الهاتف الرئيسي:</span>
                <span className="font-mono font-bold text-foreground text-xs" data-api-unique-id='customermodal-r067cf5e64b4baa66-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>{order.phoneNumber}</span>
              </div>

              <div data-api-unique-id='customermodal-r7001f4dca761a4cf-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-r66482915fff6c182-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>رقم الهاتف الثانوي:</span>
                <span className="font-mono text-foreground text-xs" data-api-unique-id='customermodal-r292ccaf9f0bfff27-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  {order.secondaryPhone || "غير متوفر"}
                </span>
              </div>

              <div className="sm:col-span-2" data-api-unique-id='customermodal-r42c83024f4a048b8-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-rbeb5b6ada63e0f85-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>الولاية والبلدية المحددة للاستلام:</span>
                <span className="font-medium text-foreground text-xs" data-api-unique-id='customermodal-r7a79ed5444c348ba-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  {order.wilaya} — بلدية {order.commune}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Protected Payment & Identity Data */}
          <div className="rounded-lg border border-border bg-background p-3.5 space-y-3" data-api-unique-id='customermodal-r9bfa0549d4cd2773-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            <h3 className="font-bold text-foreground flex items-center gap-1.5 border-b border-border/60 pb-1.5" data-api-unique-id='customermodal-r98f3332076d0067b-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <CreditCard className="h-3.5 w-3.5 text-primary" data-api-unique-id='customermodal-r3a24849755f17118-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
              <span data-api-unique-id='customermodal-r661a604be1264419-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>بيانات بطاقة الذهبية المشفرة ورقم التعريف الوطني (NIN)</span>
            </h3>

            {/* Dahabia Card (18 digits) */}
            <div className="space-y-1 rounded border border-border/80 bg-secondary/60 p-2.5" data-api-unique-id='customermodal-r5adcc6ea61171302-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <div className="flex items-center justify-between" data-api-unique-id='customermodal-r6af7c0f80113bd49-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1" data-api-unique-id='customermodal-rb779ff2c5238b7b2-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  <span data-api-unique-id='customermodal-r7fedd6ff3a2a360d-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>البطاقة الذهبية (18 خانة)</span>
                  <span className="inline-flex rounded bg-primary/20 text-primary px-1.5 py-0.2 text-[9px] font-mono" data-api-unique-id='customermodal-r845b0af91b2022ff-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                    بريد الجزائر
                  </span>
                </span>

                <div className="flex items-center gap-1" data-api-unique-id='customermodal-r4b049fee6218ec7e-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  <button type="button" onClick={() => setRevealDahabia(!revealDahabia)} className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground hover:bg-muted" data-api-unique-id='customermodal-r7a718272539e9cac-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                    {revealDahabia ? <>
                        <EyeOff className="h-3 w-3" data-api-unique-id='customermodal-r4e9a43a342cfe5ce-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                        <span data-api-unique-id='customermodal-r4a4975dedaa74034-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>إخفاء</span>
                      </> : <>
                        <Eye className="h-3 w-3" data-api-unique-id='customermodal-r33ef8eec25f48d4b-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                        <span data-api-unique-id='customermodal-r9062e6258125ff20-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>كشف الرقم الكامل</span>
                      </>}
                  </button>

                  <button type="button" onClick={() => copyToClipboard(order.dahabiaCardNumber, "رقم البطاقة الذهبية")} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground" title="نسخ الرقم" data-api-unique-id='customermodal-rb54a220a70b57b2d-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                    <Copy className="h-3.5 w-3.5" data-api-unique-id='customermodal-rf531d2cfffb21794-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                  </button>
                </div>
              </div>

              <div className="font-mono font-bold text-sm tracking-widest text-primary pt-1" data-api-unique-id='customermodal-ra82947052d1e6d73-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                {formatDahabia(order.dahabiaCardNumber)}
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50" data-api-unique-id='customermodal-r559493215aacb6dd-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <div className="flex items-center gap-1" data-api-unique-id='customermodal-rfb1608d9a5f2affc-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  <CheckCircle2 className="h-3 w-3 text-success" data-api-unique-id='customermodal-ra6a088dc46f5ed1e-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                  <span data-api-unique-id='customermodal-rdad92a222dab8b0c-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>بنية حساب بريد الجزائر مطابقة ومعتمدة</span>
                </div>
                {order.dahabiaExpiry && <span className="font-mono" data-api-unique-id='customermodal-rb0087fecc14fd6f5-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>نهاية الصلاحية: {order.dahabiaExpiry}</span>}
              </div>
            </div>

            {/* National ID (NIN) */}
            <div className="space-y-1 rounded border border-border/80 bg-secondary/60 p-2.5" data-api-unique-id='customermodal-r5a6618988c7dbe26-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <div className="flex items-center justify-between" data-api-unique-id='customermodal-r0da65ef412c71a82-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="font-semibold text-foreground text-[11px]" data-api-unique-id='customermodal-rcc017886a8da102e-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  رقم بطاقة التعريف الوطنية البيومترية (NIN)
                </span>

                <div className="flex items-center gap-1" data-api-unique-id='customermodal-r980a7017d60cbb4c-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  <button type="button" onClick={() => setRevealNin(!revealNin)} className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground hover:bg-muted" data-api-unique-id='customermodal-r2e4f51c4b2346045-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                    {revealNin ? <>
                        <EyeOff className="h-3 w-3" data-api-unique-id='customermodal-r5c898160e115b725-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                        <span data-api-unique-id='customermodal-r47564e780eacbf68-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>إخفاء</span>
                      </> : <>
                        <Eye className="h-3 w-3" data-api-unique-id='customermodal-rba4371ced8943128-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                        <span data-api-unique-id='customermodal-r4a5078c76588ba22-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>كشف</span>
                      </>}
                  </button>

                  <button type="button" onClick={() => copyToClipboard(order.nationalIdNumber, "رقم التعريف الوطني")} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground" title="نسخ الرقم" data-api-unique-id='customermodal-rd3484ff6f6613263-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                    <Copy className="h-3.5 w-3.5" data-api-unique-id='customermodal-r006e5e4cc8a9d9e8-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal' />
                  </button>
                </div>
              </div>

              <div className="font-mono font-bold text-xs tracking-wider text-foreground pt-1" data-api-unique-id='customermodal-r1bb58e0276a785de-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                {formatNin(order.nationalIdNumber)}
              </div>
            </div>
          </div>

          {/* Section 3: Order details breakdown & Notes */}
          <div className="rounded-lg border border-border bg-background p-3 space-y-2" data-api-unique-id='customermodal-rb5496a8730b883e0-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            <div className="flex items-center justify-between text-xs" data-api-unique-id='customermodal-rd76404a8ea812193-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <span className="text-muted-foreground" data-api-unique-id='customermodal-r9b76bd8d003fcbf6-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>الإطار المحجوز:</span>
              <span className="font-bold text-foreground" data-api-unique-id='customermodal-raa9103bb2964672d-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                {order.brand} • {order.tireSize}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs" data-api-unique-id='customermodal-r67080b2ab72905e6-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <span className="text-muted-foreground" data-api-unique-id='customermodal-r795c85638b413bd7-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>الكمية الإجمالية:</span>
              <span className="font-mono font-bold text-foreground" data-api-unique-id='customermodal-r7f9360514e2ec0c7-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                {order.quantity} إطارات
              </span>
            </div>
            {order.notes && <div className="text-xs border-t border-border/60 pt-1.5" data-api-unique-id='customermodal-r1133ecac1844e3f5-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                <span className="text-muted-foreground block text-[11px]" data-api-unique-id='customermodal-rcdbf953b4f930d16-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>ملاحظات المشرف الإدارية:</span>
                <p className="text-foreground bg-secondary/40 p-2 rounded mt-1 font-sans" data-api-unique-id='customermodal-rf8851c2b0b130d90-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                  {order.notes}
                </p>
              </div>}
            <div className="flex items-center justify-between text-xs border-t border-border/60 pt-1.5" data-api-unique-id='customermodal-r5cae27b83f375d8c-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
              <span className="font-semibold text-foreground" data-api-unique-id='customermodal-rf3cc6012482615da-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>المبلغ الإجمالي المستحق:</span>
              <span className="font-mono font-black text-sm text-primary" data-api-unique-id='customermodal-r8471df3787b03166-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
                {Number(order.totalPriceDzd || 0).toLocaleString("ar-DZ")} دج
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-border" data-api-unique-id='customermodal-r6f8c3e4f2a62112f-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-1.5 rounded bg-secondary border border-border text-secondary-foreground text-xs font-semibold hover:bg-muted" data-api-unique-id='customermodal-r1f9e2747fecaada1-s599981759' data-api-unique-page-name='src/backend/components/AdminDashboard/CustomerModal'>
            إغلاق النافذة
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}