"use client";

import React, { useState, useEffect } from "react";
import { Search, Hash, Phone, AlertCircle, ShieldCheck } from "lucide-react";
import { TrackingSearchParams, SampleOrderSummary } from "@/frontend/types/OrderTracking";
interface SearchSectionProps {
  initialOrderNumber?: string;
  initialPhoneNumber?: string;
  sampleOrders?: SampleOrderSummary[];
  isLoading: boolean;
  onSearch: (params: TrackingSearchParams) => void;
  errorMessage?: string;
}
const statusLabels: Record<string, string> = {
  NEW: "جديدة",
  PROCESSING: "معالجة",
  COMPLETED: "مكتملة",
  CANCELLED: "ملغية"
};
export default function SearchSection({
  initialOrderNumber = "",
  initialPhoneNumber = "",
  sampleOrders = [],
  isLoading,
  onSearch,
  errorMessage
}: SearchSectionProps) {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [localError, setLocalError] = useState<string | null>(null);
  useEffect(() => {
    if (initialOrderNumber) {
      setOrderNumber(initialOrderNumber);
    }
  }, [initialOrderNumber]);
  useEffect(() => {
    if (initialPhoneNumber) {
      setPhoneNumber(initialPhoneNumber);
    }
  }, [initialPhoneNumber]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const cleanOrder = orderNumber.trim().toUpperCase();
    const cleanPhone = phoneNumber.trim();
    if (!cleanOrder) {
      setLocalError("يرجى إدخال رقم الطلبية المرجعي (مثال: NM-2026-8841)");
      return;
    }
    if (!cleanPhone) {
      setLocalError("يرجى إدخال رقم الهاتف المسجل للتحقق من هوية صاحب الحصة");
      return;
    }
    onSearch({
      orderNumber: cleanOrder,
      phoneNumber: cleanPhone
    });
  };
  const setSampleData = (sampleOrder: string, samplePhone: string) => {
    setOrderNumber(sampleOrder);
    setPhoneNumber(samplePhone);
    setLocalError(null);
    onSearch({
      orderNumber: sampleOrder,
      phoneNumber: samplePhone
    });
  };
  return <section data-controller-name="نموذج البحث والتحقق من الطلبية" className="w-full relative overflow-hidden rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8 lg:p-10" data-api-unique-id='searchsection-r0e205af23ccea878-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
      {/* Visual background pattern */}
      <div className="absolute top-0 right-0 -left-20 h-40 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" data-api-unique-id='searchsection-r5483015a4cda0ff2-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" data-api-unique-id='searchsection-r05a6a7193c386213-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />

      <div className="relative z-10 max-w-4xl mx-auto text-right" data-api-unique-id='searchsection-re14cfc1322f637f5-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
        {/* Header and Sovereign Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80" data-api-unique-id='searchsection-rce9079e37d26f33e-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
          <div data-api-unique-id='searchsection-reed1eca690baea5d-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold mb-2" data-api-unique-id='searchsection-rbebf6be87271efe7-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              <ShieldCheck className="w-4 h-4 text-primary" data-api-unique-id='searchsection-r71b7f10571434ad4-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
              <span data-api-unique-id='searchsection-r47249f0b6ebcc942-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>المنصة الوطنية للتحقق الفوري من حصص الإطارات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-foreground tracking-tight" data-api-unique-id='searchsection-r5a5fe9cebe60de4b-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              تتبع طلبيتك واستخرج وصل الاستلام الرسمي
            </h1>
          </div>
          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center" data-api-unique-id='searchsection-rdc88dba776896012-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
            <span className="text-xs text-muted-foreground font-body" data-api-unique-id='searchsection-rf01a63d808a70c5f-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>نفطال - فرع سوناطراك</span>
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" data-api-unique-id='searchsection-r216c348b8e82c938-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
          </div>
        </div>

        {/* Instructions */}
        <p className="mt-4 text-sm sm:text-base text-muted-foreground font-body leading-relaxed max-w-3xl" data-api-unique-id='searchsection-rddbdaec7c205c648-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
          أدخل الرقم المرجعي السيادي للطلبية ورقم الهاتف المسجل لمطابقة البيانات والاطلاع على تقدم حجز الحصة، وطباعة وصل التسجيل الرسمي المعتمد للاستلام لدى محطة نفطال المعنية.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" data-api-unique-id='searchsection-r9dd8462ea515c838-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4" data-api-unique-id='searchsection-r2815d035faf2fce6-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
            {/* Order Number Input */}
            <div className="md:col-span-6 space-y-1.5 text-right" data-api-unique-id='searchsection-r45cc51df10c7e39c-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              <label htmlFor="orderNumberInput" className="block text-xs sm:text-sm font-header font-bold text-foreground" data-api-unique-id='searchsection-rb86445b1d8c411cb-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                الرقم المرجعي للطلبية (NM-2026-XXXX) <span className="text-primary" data-api-unique-id='searchsection-r07daa563d153165c-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>*</span>
              </label>
              <div className="relative" data-api-unique-id='searchsection-r0240f179d192ec0a-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                <input id="orderNumberInput" type="text" dir="ltr" value={orderNumber} onChange={e => setOrderNumber(e.target.value.toUpperCase())} placeholder="NM-2026-8841" className="w-full bg-input text-foreground border-2 border-border rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base font-mono font-semibold tracking-wider placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-left" data-api-unique-id='searchsection-r76ca1fe7a66b6e6a-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" data-api-unique-id='searchsection-rdabd34f11cf5c69f-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="md:col-span-6 space-y-1.5 text-right" data-api-unique-id='searchsection-rf7ecd6ca2d6b0906-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              <label htmlFor="phoneNumberInput" className="block text-xs sm:text-sm font-header font-bold text-foreground" data-api-unique-id='searchsection-rb7ae1a80e9183927-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                رقم الهاتف المسجل بالطلب <span className="text-primary" data-api-unique-id='searchsection-rcfe296a9d02254ae-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>*</span>
              </label>
              <div className="relative" data-api-unique-id='searchsection-rec395e7fac6d0cc0-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                <input id="phoneNumberInput" type="tel" dir="ltr" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="0550123456" className="w-full bg-input text-foreground border-2 border-border rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base font-mono font-semibold tracking-wider placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-left" data-api-unique-id='searchsection-rb380b14669d4f33f-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" data-api-unique-id='searchsection-r2ddd6680ea27da91-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
              </div>
            </div>
          </div>

          {/* Action Button & Quick Samples */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2" data-api-unique-id='searchsection-r93f4f8d6d53bf7d8-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
            {sampleOrders.length > 0 && <div className="flex flex-wrap items-center gap-2" data-api-unique-id='searchsection-rc516cc17977d4b6c-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                <span className="text-xs text-muted-foreground font-body" data-api-unique-id='searchsection-r0134d56a4b6e8ebb-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>أمثلة سريعة للاستعلام:</span>
                {sampleOrders.map((sample, index) => <button key={sample.orderNumber} type="button" onClick={() => setSampleData(sample.orderNumber, sample.phoneNumber)} className="px-2.5 py-1 text-xs rounded bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground border border-border/80 transition-colors font-mono" data-api-unique-id='searchsection-r11f59bf23dff690c-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' data-api-in-loop='1' data-api-bind-info={`sampleOrders-${index}-orderNumber`} data-api-map-var-name='sample'>
                    {sample.orderNumber} ({statusLabels[sample.status] || sample.status})
                  </button>)}
              </div>}

            <button type="submit" disabled={isLoading} className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-header font-bold text-base hover:bg-accent active:scale-[0.98] transition-all shadow-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none mr-auto sm:mr-0" data-api-unique-id='searchsection-r030f9894d304648d-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              {isLoading ? <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" data-api-unique-id='searchsection-r0963e9aaf0079e69-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
                  <span data-api-unique-id='searchsection-ra36d53fe9948cfc7-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>جاري التحقق السيادي...</span>
                </> : <>
                  <Search className="w-5 h-5" data-api-unique-id='searchsection-race47e44a119dd02-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
                  <span data-api-unique-id='searchsection-r6e86140d036806b7-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>استعلام واستخراج الوصل</span>
                </>}
            </button>
          </div>

          {/* Error display */}
          {(localError || errorMessage) && <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive text-foreground flex items-start gap-3 text-right" data-api-unique-id='searchsection-r715ac242bd6a9dd8-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" data-api-unique-id='searchsection-rdcb618f1019ef6e3-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection' />
              <div className="text-sm font-body" data-api-unique-id='searchsection-rb3e19f57a4134a30-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>
                <span className="font-bold text-destructive" data-api-unique-id='searchsection-r171f48969ded91a3-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>تنبيه: </span>
                <span data-api-unique-id='searchsection-rc4bb3bebdc37b7f7-s700078943' data-api-unique-page-name='src/frontend/components/OrderTracking/SearchSection'>{localError || errorMessage}</span>
              </div>
            </div>}
        </form>
      </div>
    </section>;
}