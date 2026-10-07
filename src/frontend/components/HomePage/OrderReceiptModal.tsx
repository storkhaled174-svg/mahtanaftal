"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { OrderReceipt } from "@/frontend/types/HomePage";
import { OrderTracking } from "@/frontend/route-params";
import { CheckCircle2, Printer, RefreshCw, ShieldCheck, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface OrderReceiptModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
  onNewOrder: () => void;
}
export default function OrderReceiptModal({
  receipt,
  onClose,
  onNewOrder
}: OrderReceiptModalProps) {
  const router = useRouter();
  if (!receipt) return null;
  const handlePrint = () => {
    window.print();
  };
  const handleCopyCode = () => {
    if (receipt) {
      navigator.clipboard.writeText(receipt.orderNumber);
      toast.success("تم نسخ الرقم المرجعي للطلبية: " + receipt.orderNumber);
    }
  };
  const handleTrackOrder = () => {
    if (receipt) {
      OrderTracking.navigateTo(router, {
        orderNumber: receipt.orderNumber
      });
    }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm" data-api-unique-id='orderreceiptmodal-r14056ad0ba80c7ad-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
      <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-primary/40 bg-card p-6 text-card-foreground shadow-2xl sm:p-8" data-api-unique-id='orderreceiptmodal-ra8163a05c4e3921c-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
        
        {/* Top Official Banner */}
        <div className="border-b border-border pb-6 text-center" data-api-unique-id='orderreceiptmodal-rdea3a98a885767ad-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success ring-4 ring-success/20" data-api-unique-id='orderreceiptmodal-r81e2c7ca88de80de-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <CheckCircle2 className="h-8 w-8" data-api-unique-id='orderreceiptmodal-r6f953e868a61675a-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
          </div>
          <span className="mb-2 inline-block rounded-full bg-success/10 px-3 py-1 font-header text-xs font-bold text-success" data-api-unique-id='orderreceiptmodal-r79258761a70f0145-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            تم تسجيل طلبك بنجاح — حالة أولية: NEW
          </span>
          <h3 className="font-header text-2xl font-bold text-foreground" data-api-unique-id='orderreceiptmodal-r40ed1ea66970ff73-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            وصل تسجيل طلبية إطارات نفطال
          </h3>
          <p className="mt-1 font-body text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r8f0db8ae565b1880-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            الجمهورية الجزائرية الديمقراطية الشعبية — شركة نفطال ش.ذ.م.م
          </p>
        </div>

        {/* Order Identifier & Code */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-primary/30 bg-secondary p-4 text-secondary-foreground sm:flex-row" data-api-unique-id='orderreceiptmodal-r400a5e69f5ee87f2-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <div className="text-right" data-api-unique-id='orderreceiptmodal-r4eb9da0aedb3f0e2-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <div className="font-body text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r7534700ebf6d9862-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              رقم الطلبية المرجعي السيادي الموحد
            </div>
            <div className="font-mono text-2xl font-black tracking-wider text-primary" data-api-unique-id='orderreceiptmodal-ree6dce9ca5e0b28d-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              {receipt.orderNumber}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='orderreceiptmodal-ra313b3e319a73b0f-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <Button onClick={handleCopyCode} variant="outline" size="sm" className="border-border bg-card text-xs text-card-foreground hover:bg-muted" data-api-unique-id='orderreceiptmodal-r2dc5b7a03478de11-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              <Share2 className="ml-1.5 h-3.5 w-3.5" data-api-unique-id='orderreceiptmodal-rfc2bf476aa321fae-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
              نسخ الرمز
            </Button>
            <Button onClick={handlePrint} size="sm" className="bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90" data-api-unique-id='orderreceiptmodal-rbf424cb08decbdfb-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              <Printer className="ml-1.5 h-3.5 w-3.5" data-api-unique-id='orderreceiptmodal-r46d70592c28476ce-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
              طباعة الوصل
            </Button>
          </div>
        </div>

        {/* Receipt Key Metrics Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 font-body text-sm sm:grid-cols-2" data-api-unique-id='orderreceiptmodal-r48b37a707421e8d8-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r2c19775942a80dae-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-rcb663a9f6174a94f-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>الاسم واللقب:</span>
            <div className="font-bold text-foreground" data-api-unique-id='orderreceiptmodal-r5e15f36c578afda4-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.fullName}</div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r72bf78b7fd5fefeb-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-rfa4a2cb5473560ad-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>تاريخ ووقت التسجيل:</span>
            <div className="font-mono font-bold text-foreground" data-api-unique-id='orderreceiptmodal-r3488a23cfee2076f-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.registrationDate}</div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r272499aec603ad41-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r2371a94bb47cdd55-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>ولاية وبلدية الاستلام:</span>
            <div className="font-bold text-foreground" data-api-unique-id='orderreceiptmodal-r0ae2d29849b55dd0-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.wilayaName} ({receipt.commune})</div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-ra76296db68ebd7b1-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-rb5dc8fd9eeea37b9-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>أرقام التواصل المسجلة:</span>
            <div className="font-mono font-bold text-foreground" dir="ltr" data-api-unique-id='orderreceiptmodal-ree5dd20a47bbbc6d-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              {receipt.primaryPhone} / {receipt.secondaryPhone}
            </div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-rb3501d3f999136ae-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-raf71c8d08e4e8f11-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>العلامة والمقاس المختار:</span>
            <div className="font-mono font-bold text-foreground" data-api-unique-id='orderreceiptmodal-r5deb8fc81bc55083-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              {receipt.brand === "continental" ? "Continental" : "Iris"} — {receipt.dimension}
            </div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r263bcdc9b6d4f000-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r67e37a0cdee8c29f-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>الكمية والمبلغ الإجمالي:</span>
            <div className="font-bold text-foreground" data-api-unique-id='orderreceiptmodal-rb5f7dd01e9245446-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              {receipt.quantity} {receipt.quantity === 1 ? "إطار" : receipt.quantity === 2 ? "إطاران" : "إطارات"} — <span className="font-mono text-primary font-black" data-api-unique-id='orderreceiptmodal-r2af17640a8d88dee-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.totalPriceDzd.toLocaleString()} دج</span>
            </div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r337d5478c69e92ca-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-rec5afea8540a71a6-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>رقم بطاقة التعريف الوطنية (المشفر):</span>
            <div className="font-mono font-bold text-foreground" dir="ltr" data-api-unique-id='orderreceiptmodal-raea596e6a774396a-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.nidMasked}</div>
          </div>

          <div className="space-y-1 rounded-lg border border-border bg-background p-3.5 text-right" data-api-unique-id='orderreceiptmodal-r734c35bfdf0a28da-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r8e4409d91ba49ea4-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>البطاقة الذهبية المسجلة (18 رقماً):</span>
            <div className="font-mono font-bold text-foreground" dir="ltr" data-api-unique-id='orderreceiptmodal-rd8a0546418ca7936-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>{receipt.edahabiaMasked}</div>
          </div>
        </div>

        {/* Notice Box */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-border bg-secondary p-4 text-secondary-foreground text-right" data-api-unique-id='orderreceiptmodal-r6fd8a8d94c0390c6-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <div data-api-unique-id='orderreceiptmodal-rc2effcfcb64aab80-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-r7cb3241589b1f13d-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>حالة الحصة والتخصيص:</span>
            <div className="font-body text-xs font-semibold text-foreground" data-api-unique-id='orderreceiptmodal-re31396a829293416-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>تم تثبيت الحجز وتأكيد الحصة بنجاح بالمحطة</div>
          </div>
          <div className="text-left font-body text-xs text-muted-foreground" data-api-unique-id='orderreceiptmodal-rb14e2788d10bcada-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            الدفع والاستلام بمحطة نفطال
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 flex items-start gap-2 rounded-lg bg-info/10 p-3.5 font-body text-xs leading-relaxed text-foreground text-right" data-api-unique-id='orderreceiptmodal-r57e688780e85e355-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-info" data-api-unique-id='orderreceiptmodal-re57461fb6a3a0131-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
          <span data-api-unique-id='orderreceiptmodal-r657fbae057c1b430-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            يرجى الاحتفاظ بالرقم المرجعي الموحد <strong data-api-unique-id='orderreceiptmodal-r4c2e1bf63e744b8e-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>({receipt.orderNumber})</strong> وتقديم بطاقة التعريف الوطنية الأصلية والبطاقة الذهبية عند الاستلام في محطة نفطال المعينة في ولايتكم.
          </span>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-4 sm:flex-row" data-api-unique-id='orderreceiptmodal-rd3a2c9251c161903-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
          <Button onClick={handleTrackOrder} variant="outline" className="w-full border-border bg-secondary text-secondary-foreground hover:bg-muted sm:w-auto" data-api-unique-id='orderreceiptmodal-r8bd3162b122d22a5-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <ExternalLink className="ml-2 h-4 w-4 text-primary" data-api-unique-id='orderreceiptmodal-rc1666264ba1859e4-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
            تتبع الطلبية والوصل (F02)
          </Button>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row" data-api-unique-id='orderreceiptmodal-r8955abaf877f16d6-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
            <Button onClick={onNewOrder} variant="outline" className="w-full border-border bg-card text-card-foreground hover:bg-muted sm:w-auto" data-api-unique-id='orderreceiptmodal-r50b9e570d698290c-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              <RefreshCw className="ml-2 h-4 w-4" data-api-unique-id='orderreceiptmodal-r080f382437737f6c-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal' />
              تسجيل طلبية جديدة
            </Button>
            <Button onClick={onClose} className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90 sm:w-auto" data-api-unique-id='orderreceiptmodal-rf53d2bf751ac1006-s1475221654' data-api-unique-page-name='src/frontend/components/HomePage/OrderReceiptModal'>
              إغلاق الوصل
            </Button>
          </div>
        </div>

      </div>
    </div>;
}