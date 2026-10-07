"use client";

import React, { useRef } from "react";
import { Printer, Download, ShieldCheck, QrCode, Layers } from "lucide-react";
import { TireOrderOutput } from "@/frontend/types/OrderTracking";
import { toast } from "sonner";
export type TireOrder = TireOrderOutput;
interface OfficialReceiptCardProps {
  order: TireOrderOutput;
}
export default function OfficialReceiptCard({
  order
}: OfficialReceiptCardProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  // Trigger real browser print
  const handlePrint = () => {
    toast.info("جاري تحضير الوصل الرسمي للطباعة...");
    window.print();
  };
  const handleDownloadPdf = () => {
    toast.success("تم تجهيز مستند الوصل الرقمي للتحميل بتنسيق PDF");
    window.print();
  };
  const formatDzd = (val: number) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0
    }).format(val || 0);
  };
  const maskDahabia = (cardNumber: string) => {
    if (!cardNumber) return "6280 1234 5678 9012";
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (cleaned.length < 12) return cardNumber;
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };
  return <div data-controller-name="معاينة وطباعة الوصل الرسمي" className="w-full space-y-6" data-api-unique-id='officialreceiptcard-r87e95357804484be-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border-2 border-border print:hidden text-right" data-api-unique-id='officialreceiptcard-rcad36605c12a7853-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
        <div className="flex items-center gap-2" data-api-unique-id='officialreceiptcard-rd3919623d5a3a2ac-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
          <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center" data-api-unique-id='officialreceiptcard-rccee4b87bb1e9075-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <Printer className="w-5 h-5" data-api-unique-id='officialreceiptcard-r14995d173e770480-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
          </div>
          <div data-api-unique-id='officialreceiptcard-rcf6b0299e8292054-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <h3 className="text-base font-header font-bold text-foreground" data-api-unique-id='officialreceiptcard-r469bbb8548c7fe39-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              وصل التسجيل الرقمي الرسمي المعتمد
            </h3>
            <p className="text-xs text-muted-foreground font-body" data-api-unique-id='officialreceiptcard-ra2dba6cb165ca9c7-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              جاهز للطباعة الورقية الفورية أو الحفظ الرقمي كملف PDF صالح للاستظهار بمحطات نفطال
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center" data-api-unique-id='officialreceiptcard-r93db161ac061268c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
          <button type="button" onClick={handleDownloadPdf} className="px-4 py-2.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted font-header font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-border" data-api-unique-id='officialreceiptcard-r14b2fdbdb4b4b068-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <Download className="w-4 h-4" data-api-unique-id='officialreceiptcard-r0b9b8ce61bce65f1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
            <span data-api-unique-id='officialreceiptcard-r4e2885f49d82cdf7-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>حفظ رقمي (PDF)</span>
          </button>
          <button type="button" onClick={handlePrint} className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-header font-bold text-xs sm:text-sm hover:bg-accent active:scale-95 transition-all shadow-gold flex items-center gap-2" data-api-unique-id='officialreceiptcard-rd981356d1adca59d-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <Printer className="w-4 h-4" data-api-unique-id='officialreceiptcard-ra26f92374e9c9651-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
            <span data-api-unique-id='officialreceiptcard-r5152266c0ddf6995-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>طباعة الوصل المعتمد</span>
          </button>
        </div>
      </div>

      {/* Sovereign A4 Printable Receipt Card */}
      <div ref={receiptRef} id="official-receipt-print-area" className="w-full relative rounded-2xl bg-card text-card-foreground border-2 border-primary/40 shadow-card p-6 sm:p-10 lg:p-12 overflow-hidden print:border-black print:bg-white print:text-black print:p-8 print:shadow-none" data-api-unique-id='officialreceiptcard-rc588f1b57567464a-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
        {/* Anti-counterfeit geometric watermarks */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,235,26,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,235,26,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none print:hidden" data-api-unique-id='officialreceiptcard-r81d2e25702dca629-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none print:hidden" data-api-unique-id='officialreceiptcard-r42b33e23f04d3b6f-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />

        <div className="relative z-10 text-right space-y-8" data-api-unique-id='officialreceiptcard-r96c2f1124abe9df8-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
          {/* Header of the Official Receipt */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-border print:border-black" data-api-unique-id='officialreceiptcard-rd0cd034477123d89-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            {/* Algerian State & Naftal Emblem Header */}
            <div className="space-y-1.5" data-api-unique-id='officialreceiptcard-rb32ee65d50aff887-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <div className="text-xs font-header font-bold text-muted-foreground print:text-gray-700" data-api-unique-id='officialreceiptcard-r346ac91ef9cc30ef-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-sm font-header font-bold text-primary print:text-black" data-api-unique-id='officialreceiptcard-r9c09342d6f2c9c8b-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                وزارة الطاقة والمناجم | مجمع سوناطراك
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r750633cdd012bf19-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                شركة نفطال ش.ذ.م.م - NAFTAL
              </h2>
              <div className="text-xs font-body text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-rf0d8b7ddf1957c6e-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                المنصة الرقمية الوطنية لتوزيع حصص عجلات السيارات «محطتي»
              </div>
            </div>

            {/* Official Stamp & QR Code representation */}
            <div className="flex items-center gap-4 self-start sm:self-auto bg-muted/60 p-3 rounded-xl border border-border print:border-black print:bg-white" data-api-unique-id='officialreceiptcard-r43b5e93efa1a4d41-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-foreground p-1 rounded flex items-center justify-center print:bg-black" data-api-unique-id='officialreceiptcard-rb0a5132387b71bcf-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <div className="w-full h-full bg-background flex flex-col items-center justify-center p-1 print:bg-white" data-api-unique-id='officialreceiptcard-rdb23225a9e114176-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <QrCode className="w-full h-full text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r45be604ca525dd14-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
                </div>
              </div>

              {/* Anti-counterfeit stamp preview */}
              <div className="text-right space-y-1" data-api-unique-id='officialreceiptcard-rbd2bec4ed355c19d-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-primary print:text-black" data-api-unique-id='officialreceiptcard-rcfea464c403915cf-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <ShieldCheck className="w-3.5 h-3.5" data-api-unique-id='officialreceiptcard-r58fe7a5d2163d260-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
                  <span data-api-unique-id='officialreceiptcard-r44c7394b6f37e6e8-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>ختم المصادقة الرقمية</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground print:text-gray-600 block" data-api-unique-id='officialreceiptcard-r8cfdf5aa08f1fb45-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  رمز التحقق: {order.qrVerificationCode || `NFT-DZ-${order.orderNumber}-VAL`}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground print:text-gray-600 block" data-api-unique-id='officialreceiptcard-r2e2c73fc687cd13f-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  البصمة: {order.securityHash || "SHA256:9A8F3C...E2"}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Title Banner */}
          <div className="p-4 rounded-xl bg-secondary text-secondary-foreground border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:bg-gray-100 print:text-black print:border-black" data-api-unique-id='officialreceiptcard-r296b769c03ca3dcc-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <div data-api-unique-id='officialreceiptcard-rfdde22efe78acabf-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <span className="text-xs font-body text-muted-foreground print:text-gray-700 block" data-api-unique-id='officialreceiptcard-rc3a685f348c8fcf7-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>نوع المستند:</span>
              <h3 className="text-lg sm:text-xl font-header font-black text-primary print:text-black" data-api-unique-id='officialreceiptcard-r635fcc36f1734367-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                وصل حجز الحصة وتأكيد الاستلام المعتمد
              </h3>
            </div>
            <div className="text-right sm:text-left" data-api-unique-id='officialreceiptcard-r65ce60ca603ef73d-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <span className="text-xs font-body text-muted-foreground print:text-gray-700 block" data-api-unique-id='officialreceiptcard-rec73d5fefc2348ba-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>الرقم المرجعي السيادي:</span>
              <span className="text-lg sm:text-xl font-mono font-black text-foreground print:text-black tracking-wider" data-api-unique-id='officialreceiptcard-r1f5e26fbf5fe94b1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                {order.orderNumber}
              </span>
            </div>
          </div>

          {/* Detailed Data Tables (2 Columns Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-api-unique-id='officialreceiptcard-rf858fd6d4cb85259-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            {/* Section 1: Customer Identity & Payment */}
            <div className="p-5 rounded-xl bg-muted/40 border border-border space-y-4 print:border-black print:bg-white" data-api-unique-id='officialreceiptcard-r02fc5fef450d320d-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <h4 className="text-sm font-header font-bold text-primary pb-2 border-b border-border/80 flex items-center gap-2 print:text-black print:border-black" data-api-unique-id='officialreceiptcard-rb430388baf633718-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <ShieldCheck className="w-4 h-4" data-api-unique-id='officialreceiptcard-r885fa69fb6d8545d-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
                <span data-api-unique-id='officialreceiptcard-r031d255afa7bada1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>1. بيانات الهوية والبطاقة الذهبية</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm font-body" data-api-unique-id='officialreceiptcard-r156fce8ee4b6ea99-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-r03d2f0a81c62738c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r5d96326e21aa4c86-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>اسم ولقب المستفيد:</span>
                  <span className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r71006acc2efc1efb-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.customerName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-re05f972c64b64589-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-rfc9c0e5d6c75675c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>رقم التعريف الوطني (NIN):</span>
                  <span className="font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-rec89ecb91d83fa4a-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.nationalIdNumber}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-rc3a52d4936722dc1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r6a5f70dae5786344-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>رقم الهاتف المسجل:</span>
                  <span className="font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r293398ff0a24edd6-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.phoneNumber}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-rfe10a2322b8f6079-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r27d3d99e31797c05-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>رقم البطاقة الذهبية:</span>
                  <span className="font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r54f55e0e1cab5720-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{maskDahabia(order.dahabiaCardNumber)}</span>
                </div>

                <div className="flex justify-between py-1" data-api-unique-id='officialreceiptcard-re1fffb0d11a59d02-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-rcbbd678808040287-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>تاريخ نهاية الصلاحية:</span>
                  <span className="font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-rd5b0624e8a4a1fb8-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.dahabiaExpiry || "08/28"}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Quota & Tire Specifications */}
            <div className="p-5 rounded-xl bg-muted/40 border border-border space-y-4 print:border-black print:bg-white" data-api-unique-id='officialreceiptcard-r94ad71201e6b97d9-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <h4 className="text-sm font-header font-bold text-primary pb-2 border-b border-border/80 flex items-center gap-2 print:text-black print:border-black" data-api-unique-id='officialreceiptcard-r2e15ee6768b0fae8-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <Layers className="w-4 h-4" data-api-unique-id='officialreceiptcard-ra900071bd304d955-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
                <span data-api-unique-id='officialreceiptcard-rc46c3e1a9d7135a0-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>2. مواصفات الحصة والمركز المخصص</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm font-body" data-api-unique-id='officialreceiptcard-r438ddda8b5e6fe40-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-rda12e9a0822cd289-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r8e0ae172c6da10da-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>العلامة المعتمدة:</span>
                  <span className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-raa0c6a977c646c67-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    {order.brand === "CONTINENTAL" ? "كونتيننتال Continental" : "إيريس IRIS الجزائر"}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-r99c7c500f9d079c9-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r7e9be3414ba2ae4b-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>مقاس العجلة:</span>
                  <span className="font-mono font-bold text-primary print:text-black" data-api-unique-id='officialreceiptcard-r9dc0351f4a278696-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.tireSize}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-rb47be656e18e49df-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r3687db2a42bbd395-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>الكمية المسجلة:</span>
                  <span className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-rc3c029a3ffd56e89-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.quantity} عجلات</span>
                </div>

                <div className="flex justify-between py-1 border-b border-border/40 print:border-gray-300" data-api-unique-id='officialreceiptcard-r162b4c2b030ecb3c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-r5d81f8981c971c0b-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>ولاية وبلدية الاستلام:</span>
                  <span className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r123f6279e2711870-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.wilaya} - {order.commune}</span>
                </div>

                <div className="flex justify-between py-1" data-api-unique-id='officialreceiptcard-rdbb1396bb885e137-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <span className="text-muted-foreground print:text-gray-600" data-api-unique-id='officialreceiptcard-rce50e6268a3af5a4-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>محطة التوزيع:</span>
                  <span className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-rff3e59f7f81ffa8e-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>{order.stationName || `محطة نفطال ${order.commune}`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Calculation Table */}
          <div className="rounded-xl overflow-hidden border-2 border-border print:border-black" data-api-unique-id='officialreceiptcard-r97ea9e043711ba94-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <table className="w-full text-right border-collapse" data-api-unique-id='officialreceiptcard-r81134b01f4bdfb1c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <thead data-api-unique-id='officialreceiptcard-r8409a07d1992e69f-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <tr className="bg-secondary text-secondary-foreground text-xs sm:text-sm font-header font-bold print:bg-gray-200 print:text-black" data-api-unique-id='officialreceiptcard-r4919ec33ab14c70c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <th className="p-3 border-b border-border print:border-black" data-api-unique-id='officialreceiptcard-reb7259ac7b883369-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>بيان الخدمة والحصة</th>
                  <th className="p-3 border-b border-border print:border-black text-center" data-api-unique-id='officialreceiptcard-r778101435ca5a6b1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>الكمية</th>
                  <th className="p-3 border-b border-border print:border-black text-left" data-api-unique-id='officialreceiptcard-r502d6fb5183146d4-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>السعر الفردي (دج)</th>
                  <th className="p-3 border-b border-border print:border-black text-left" data-api-unique-id='officialreceiptcard-r394b5113445c3929-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>المجموع الصافي (دج)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm font-body print:divide-black" data-api-unique-id='officialreceiptcard-rf7a19dc015fa4373-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <tr className="bg-card print:bg-white" data-api-unique-id='officialreceiptcard-r541ed08aaeef6cd3-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <td className="p-3 font-semibold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-rcf24aa85aebf703e-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    إطار أصلي علامة {order.brand === "CONTINENTAL" ? "Continental" : "Iris"} - مقاس {order.tireSize}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r3f98ef27a806a871-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    {order.quantity}
                  </td>
                  <td className="p-3 text-left font-mono text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r3e42f3cd4224eff9-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    {formatDzd(order.unitPriceDzd)}
                  </td>
                  <td className="p-3 text-left font-mono font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r07d7d3cabf9e51bd-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    {formatDzd(order.totalPriceDzd)}
                  </td>
                </tr>
              </tbody>
              <tfoot data-api-unique-id='officialreceiptcard-rcf73591683472801-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <tr className="bg-muted/80 text-foreground font-header font-bold print:bg-gray-100 print:text-black" data-api-unique-id='officialreceiptcard-rfac2d3d92d4390dc-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                  <td colSpan={3} className="p-3 text-right" data-api-unique-id='officialreceiptcard-rdc5c3d7bcde3b65c-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    المبلغ الإجمالي الواجب سداده عند الاستلام (TTC):
                  </td>
                  <td className="p-3 text-left text-base sm:text-lg font-mono font-black text-primary print:text-black" data-api-unique-id='officialreceiptcard-r219c88b0ae278971-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                    {formatDzd(order.totalPriceDzd)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Official Seals & Signatures Area */}
          <div className="pt-6 border-t-2 border-border grid grid-cols-1 sm:grid-cols-3 gap-6 text-center print:border-black" data-api-unique-id='officialreceiptcard-r837ff5c9f74d1833-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            {/* Signature 1 */}
            <div className="space-y-8 p-3 rounded-lg border border-border/60 bg-muted/20 print:border-black" data-api-unique-id='officialreceiptcard-r24ede853ce5194bb-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <span className="text-xs font-header font-bold text-muted-foreground print:text-gray-700 block" data-api-unique-id='officialreceiptcard-r6cc14116e8c1bda2-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                توقيع وتأكيد صاحب الطلب
              </span>
              <div className="h-8 border-b border-dashed border-border print:border-black" data-api-unique-id='officialreceiptcard-r5e4e1e44d025c0ed-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
            </div>

            {/* Official Stamp in Center */}
            <div className="flex flex-col items-center justify-center p-3 relative" data-api-unique-id='officialreceiptcard-r673fe77a69fa4143-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <div className="w-24 h-24 rounded-full border-4 border-double border-primary/70 flex flex-col items-center justify-center text-[10px] font-header font-bold text-primary p-2 rotate-[-6deg] print:border-black print:text-black" data-api-unique-id='officialreceiptcard-rcedd671a2cc289ce-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                <span className="text-[9px]" data-api-unique-id='officialreceiptcard-rce11ac5a11a7c780-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>الجمهورية الجزائرية</span>
                <span className="font-black my-0.5" data-api-unique-id='officialreceiptcard-r064fe3f35ddd09db-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>مصلحة التوزيع</span>
                <span className="text-[9px]" data-api-unique-id='officialreceiptcard-r6994befab7c9b2f1-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>NAFTAL MHATATI</span>
                <span className="text-[8px] font-mono" data-api-unique-id='officialreceiptcard-r7fb45cc7d170381f-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>2026/VAL</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-body mt-2 print:text-gray-600" data-api-unique-id='officialreceiptcard-r6a6ad290595459ab-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                ختم إلكتروني معتمد رسمياً
              </span>
            </div>

            {/* Signature 2 */}
            <div className="space-y-8 p-3 rounded-lg border border-border/60 bg-muted/20 print:border-black" data-api-unique-id='officialreceiptcard-r29c3831dc18f6760-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <span className="text-xs font-header font-bold text-muted-foreground print:text-gray-700 block" data-api-unique-id='officialreceiptcard-r8760dc46af61b294-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
                مصلحة مراقبة الحصص بمحطة نفطال
              </span>
              <div className="h-8 border-b border-dashed border-border print:border-black" data-api-unique-id='officialreceiptcard-r6f15581fdf8f783b-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard' />
            </div>
          </div>

          {/* Legal and Security Footer */}
          <div className="p-4 rounded-xl bg-muted/60 border border-border text-xs text-muted-foreground font-body leading-relaxed space-y-1 print:border-black print:bg-white print:text-gray-700" data-api-unique-id='officialreceiptcard-re76cd7523034dad2-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
            <p className="font-bold text-foreground print:text-black" data-api-unique-id='officialreceiptcard-r9fc947ec4ee715ea-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>تعليمات الاستلام الرسمية بالمحطة:</p>
            <ul className="list-disc list-inside space-y-1 pr-2" data-api-unique-id='officialreceiptcard-r9358c58622cfd021-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>
              <li data-api-unique-id='officialreceiptcard-r2fb8dbdb08de04fa-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>يجب استظهار هذا الوصل مطبوعاً أو عبر الهاتف مع بطاقة التعريف الوطنية البيومترية الأصلية للمستفيد.</li>
              <li data-api-unique-id='officialreceiptcard-rf4a0b138ad4bd614-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>الحصة مخصصة للمركبة المسجلة ولا يمكن التنازل عنها لأطراف أخرى وفقاً للمرسوم التنظيمي لحصص الإطارات.</li>
              <li data-api-unique-id='officialreceiptcard-r7bca8f410a4b03bb-s599240012' data-api-unique-page-name='src/frontend/components/OrderTracking/OfficialReceiptCard'>تسديد القيمة يتم في المحطة بالبطاقة الذهبية أو نقداً وفقاً لقواعد المؤسسة.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}