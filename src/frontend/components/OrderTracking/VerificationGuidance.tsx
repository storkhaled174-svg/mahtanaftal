"use client";

import React, { useState } from "react";
import { FileCheck2, HelpCircle, ChevronDown, ChevronUp, PhoneCall } from "lucide-react";
export default function VerificationGuidance() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const faqs = [{
    q: "ما هي الوثائق المطلوبة عند التوجه لمحطة نفطال لاستلام الإطارات؟",
    a: "يتوجب عليك إحضار: 1) وصل التسجيل الرقمي الرسمي (مطبوع أو عبر الهاتف). 2) أصل بطاقة التعريف الوطنية البيومترية للمستفيد المسجل. 3) البطاقة الرمادية للمركبة المعنية لتأكيد المطابقة."
  }, {
    q: "كم تبلغ المهلة المحددة لاستلام الحصة بعد وصول إشعار الجاهزية؟",
    a: "تمنح نفطال مهلة 15 يوماً من تاريخ وضع الحصة في حالة (جاهزة للاستلام / مكتملة). في حال عدم الحضور خلال هذه الفترة، يعاد توجيه الحصة لقائمة الانتظار تلقائياً."
  }, {
    q: "هل يمكن تفويض شخص آخر لاستلام الإطارات نيابة عني؟",
    a: "نعم، يشترط تقديم وكالة قانونية موثقة أو تفويض مصادق عليه من البلدية، مع إرفاق بطاقة التعريف الأصلية للمستفيد والوكيل بالإضافة للوصل الرسمي."
  }, {
    q: "كيف يتم سداد المبلغ المالي المحدد في الوصل؟",
    a: "يتم السداد مباشرة عند نقطة الاستلام بمحطة نفطال عبر جهاز الدفع الإلكتروني (TPE) بواسطة البطاقة الذهبية أو نقداً وفق رغبة الزبون."
  }];
  return <section data-controller-name="دليل وضوابط استلام حصص الإطارات" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden" data-api-unique-id='verificationguidance-r3195999b4ea05e1e-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
      {/* Rules and Checklist (7 cols) */}
      <div className="lg:col-span-7 rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8 text-right flex flex-col justify-between" data-api-unique-id='verificationguidance-r4189da34b482b737-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
        <div data-api-unique-id='verificationguidance-r24788c3d8d5abcee-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
          <div className="flex items-center gap-2 pb-4 border-b border-border" data-api-unique-id='verificationguidance-r9d10fe177c787e9f-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
            <FileCheck2 className="w-5 h-5 text-primary" data-api-unique-id='verificationguidance-r46ead9b36368ab2f-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' />
            <h3 className="text-lg font-header font-bold text-foreground" data-api-unique-id='verificationguidance-rad117d2f3b6d01a7-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
              ضوابط استلام الحصة والتحقق الميداني
            </h3>
          </div>

          <div className="mt-5 space-y-3 font-body" data-api-unique-id='verificationguidance-r4515581b74ab6245-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3" data-api-unique-id='verificationguidance-r5abf4ae9249023df-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs" data-api-unique-id='verificationguidance-r83f1985b00bc9b8d-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                1
              </div>
              <div data-api-unique-id='verificationguidance-r9f4d3239c9182916-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                <h4 className="text-sm font-bold text-foreground font-header mb-0.5" data-api-unique-id='verificationguidance-r6636b5c4607b31e7-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  مطابقة بطاقة التعريف والبطاقة الذهبية
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='verificationguidance-rb4aba425fde15f7f-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  يقوم عون الاستقبال بمحطة نفطال بمطابقة رقم NIN وآخر 4 أرقام من البطاقة الذهبية مع بيانات الوصل المعتمد.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3" data-api-unique-id='verificationguidance-r378d1001dba89609-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs" data-api-unique-id='verificationguidance-re72994233a5739b4-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                2
              </div>
              <div data-api-unique-id='verificationguidance-r6d5f7a9fefa4ee1d-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                <h4 className="text-sm font-bold text-foreground font-header mb-0.5" data-api-unique-id='verificationguidance-r82aef02b8cb005bd-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  معاينة مقاس وجودة الإطارات
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='verificationguidance-r7f3f95473c8083d1-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  يتم تسليم الإطارات الأصلية المختارة (Continental أو Iris) مع التأكد من سنة الصنع وتاريخ الإنتاج الحديث وضمان المصنع.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-start gap-3" data-api-unique-id='verificationguidance-rec0114e45f23acb8-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs" data-api-unique-id='verificationguidance-r115693ae7be14d79-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                3
              </div>
              <div data-api-unique-id='verificationguidance-r8211fde7b12c27cc-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                <h4 className="text-sm font-bold text-foreground font-header mb-0.5" data-api-unique-id='verificationguidance-r7fa06e840822afbc-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  خدمة التركيب المجاني بالمحطة
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='verificationguidance-r3064d284801c3286-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
                  توفر مراكز نفطال المعتمدة إمكانية تركيب وموازنة العجلات في ورشة المحطة مجاناً عند استظهار هذا الوصل.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Hotline banner */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-secondary/40 p-4 rounded-xl" data-api-unique-id='verificationguidance-r13bdea943ffb0b09-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
          <div className="flex items-center gap-2" data-api-unique-id='verificationguidance-rb74862ebdd8d93b3-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
            <PhoneCall className="w-5 h-5 text-primary" data-api-unique-id='verificationguidance-r47e4a8d99263cf04-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' />
            <div data-api-unique-id='verificationguidance-r30c96962682aba44-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
              <span className="text-xs font-bold text-foreground block font-header" data-api-unique-id='verificationguidance-r07661018c37caf21-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>مركز خدمة الزبائن ومطابقة الحصص</span>
              <span className="text-xs text-muted-foreground font-body" data-api-unique-id='verificationguidance-r0d44d0a1f5ef7cde-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>متاح طيلة أيام الأسبوع من 08:00 إلى 18:00</span>
            </div>
          </div>
          <span className="text-base font-mono font-black text-primary self-start sm:self-center" data-api-unique-id='verificationguidance-ra18101d9a787f9b3-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
            33 11 (الرقم الأخضر)
          </span>
        </div>
      </div>

      {/* FAQs (5 cols) */}
      <div className="lg:col-span-5 rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8 text-right" data-api-unique-id='verificationguidance-r93fd4127b42dc219-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
        <div className="flex items-center gap-2 pb-4 border-b border-border" data-api-unique-id='verificationguidance-rbef3e4fa268f4a1e-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
          <HelpCircle className="w-5 h-5 text-primary" data-api-unique-id='verificationguidance-r5deacc857f5d9d91-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' />
          <h3 className="text-lg font-header font-bold text-foreground" data-api-unique-id='verificationguidance-rc74b9fb3b99c117f-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
            الأسئلة الشائعة حول الاستلام
          </h3>
        </div>

        <div className="mt-4 space-y-2.5" data-api-unique-id='verificationguidance-r3e825935e34e028b-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance'>
          {faqs.map((item, index) => <div key={index} className="rounded-xl border border-border bg-muted/30 overflow-hidden" data-api-unique-id='verificationguidance-r4ef431283c7e2913-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1'>
              <button type="button" onClick={() => toggleFaq(index)} className="w-full p-3.5 text-right flex items-center justify-between gap-2 hover:bg-muted/50 transition-colors" data-api-unique-id='verificationguidance-re4a73f88e7c3106a-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1'>
                <span className="text-xs sm:text-sm font-header font-bold text-foreground" data-api-unique-id='verificationguidance-rc284369950f9f06b-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-q`} data-api-map-var-name='item'>
                  {item.q}
                </span>
                {openFaq === index ? <ChevronUp className="w-4 h-4 text-primary shrink-0" data-api-unique-id='verificationguidance-r5aafd59273776d09-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1' /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" data-api-unique-id='verificationguidance-rda45fd4e6cce65ee-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1' />}
              </button>
              {openFaq === index && <div className="p-3.5 pt-0 text-xs text-muted-foreground font-body leading-relaxed border-t border-border/40 bg-muted/20" data-api-unique-id='verificationguidance-r2bd896af39d26841-s1791947590' data-api-unique-page-name='src/frontend/components/OrderTracking/VerificationGuidance' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-a`} data-api-map-var-name='item'>
                  {item.a}
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
}