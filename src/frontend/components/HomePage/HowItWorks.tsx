"use client";

import React from "react";
import { MousePointerClick, FileText, CheckCircle } from "lucide-react";
export default function HowItWorks() {
  const steps = [{
    number: "01",
    title: "اختر إطارك",
    description: "حدد العلامة المناسبة لمركبتك (Continental أو Iris) واستعرض المقاسات المطابقة لمواصفات سيارتك مع الأسعار الرسمية والتوفر الفوري.",
    icon: MousePointerClick
  }, {
    number: "02",
    title: "سجّل طلبك",
    description: "املأ استمارة التسجيل الرسمية ببياناتك الشخصية، رقم الهوية الوطنية، ورقم آخر 8 أرقام من البطاقة الذهبية (18 رقماً) للتحقق الأمني.",
    icon: FileText
  }, {
    number: "03",
    title: "استلم طلبك",
    description: "احصل على وصل التسجيل الرقمي برمز التتبع NM-2026 وتوجه لمحطة نفطال المعينة في ولايتك للاستلام والتركيب.",
    icon: CheckCircle
  }];
  return <section data-controller-name="قسم آلية العمل والخطوات" className="w-full border-b border-border bg-background py-16 sm:py-20" data-api-unique-id='howitworks-ree3f2674f5df62ea-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='howitworks-r9e52dae909dc0182-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
        
        {/* Section Header */}
        <div className="mb-12 text-center" data-api-unique-id='howitworks-r88dace8a62c659e2-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
          <h2 className="font-header text-2xl font-bold text-foreground sm:text-3xl" data-api-unique-id='howitworks-rb47472ed364a97c1-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
            كيف يعمل؟
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground sm:text-base" data-api-unique-id='howitworks-r84785a4d84146b2c-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
            اطلب إطاراتك في 3 خطوات بسيطة ومقننة
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" data-api-unique-id='howitworks-ra815f20b27ac51a8-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks'>
          {steps.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.number} className="group relative flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground transition-all duration-200 hover:border-primary/50" data-api-unique-id='howitworks-rc90516de0773d6bf-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1'>
                {/* Step Top Header */}
                <div className="flex items-center justify-between" data-api-unique-id='howitworks-r68a5b8aef6c9ac52-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1'>
                  <span className="font-display text-3xl font-black text-primary/40 transition-colors group-hover:text-primary" data-api-unique-id='howitworks-r4cdcb3361446dcf2-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1' data-api-bind-info={`steps-${index}-number`} data-api-map-var-name='step'>
                    {step.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary" data-api-unique-id='howitworks-rff47ce4e28f86eeb-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1'>
                    <Icon className="h-5 w-5" data-api-bind-info={`steps-${index}-icon`} data-api-map-var-name='step' data-api-unique-id='howitworks-r1e077a05822c3e4f-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1' />
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="mt-6 font-header text-lg font-bold text-foreground" data-api-unique-id='howitworks-re7cd7736559f18c4-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1' data-api-bind-info={`steps-${index}-title`} data-api-map-var-name='step'>
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground" data-api-unique-id='howitworks-red223457f7490ec4-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1' data-api-bind-info={`steps-${index}-description`} data-api-map-var-name='step'>
                  {step.description}
                </p>

                {/* Bottom Gold Accent Indicator Line */}
                <div className="mt-6 border-t border-border/50 pt-4" data-api-unique-id='howitworks-rf753e2ea675a4032-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1'>
                  <div className="h-1 w-8 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" data-api-unique-id='howitworks-r733158baebc10e3d-s659157506' data-api-unique-page-name='src/frontend/components/HomePage/HowItWorks' data-api-in-loop='1' />
                </div>
              </div>;
        })}
        </div>

      </div>
    </section>;
}