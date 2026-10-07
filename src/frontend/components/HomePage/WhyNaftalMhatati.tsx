"use client";

import React from "react";
import { ShieldCheck, Compass, MapPin } from "lucide-react";
export default function WhyNaftalMhatati() {
  const features = [{
    title: "أصالة وجودة ومكافحة المضاربة",
    description: "إطارات أصلية 100% مستوردة ومصنعة وفق المعايير المعتمدة من نفطال بأسعار مقننة وثابتة دون وسطاء تجاريين.",
    icon: ShieldCheck
  }, {
    title: "اختيار رقمي مباشر",
    description: "منظومة رقمية تتيح تصفح المقاسات والمخزون الحي بالمحطات وتثبيت الحصص بنزاهة وشفافية لجميع المواطنين.",
    icon: Compass
  }, {
    title: "تغطية وطنية في 58 ولاية",
    description: "شبكة توزيع سيادية ممتدة عبر ربوع الوطن مع مراكز خدمة مجهزة لتركيب وموازنة الإطارات بأعلى احترافية.",
    icon: MapPin
  }];
  return <section data-controller-name="قسم مزايا المنصة" className="w-full border-b border-border bg-card py-16 text-card-foreground sm:py-20" data-api-unique-id='whynaftalmhatati-r910d75bac30cd58b-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='whynaftalmhatati-rff32da3845defb09-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
        {/* Section Header */}
        <div className="mb-12 text-center" data-api-unique-id='whynaftalmhatati-r19da0108f55cfe2b-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
          <h2 className="font-header text-2xl font-bold text-foreground sm:text-3xl" data-api-unique-id='whynaftalmhatati-rc36523eb9efbb0e5-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
            لماذا Naftal Mhatati؟
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground sm:text-base" data-api-unique-id='whynaftalmhatati-r08648514f2f57cf1-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
            المنصة الوطنية المعتمدة — شفافية، أمان، وأسعار مقننة
          </p>
        </div>

        {/* 3 Pillar Cards with Top Indicator */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" data-api-unique-id='whynaftalmhatati-ra7851627e69c9e81-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati'>
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <div key={index} className="relative flex flex-col rounded-xl border border-border bg-secondary p-8 text-secondary-foreground transition-all duration-200 hover:border-primary/40" data-api-unique-id='whynaftalmhatati-r67751a17ae50928b-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1'>
                {/* Gold Top Indicator Line */}
                <div className="absolute left-6 right-6 top-0 h-1 rounded-b-full bg-primary" data-api-unique-id='whynaftalmhatati-r92d2158740e3d75d-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1' />

                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-primary" data-api-unique-id='whynaftalmhatati-rbf2283ec9f3dd97c-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1'>
                  <Icon className="h-6 w-6" data-api-bind-info={`features-${index}-icon`} data-api-map-var-name='feature' data-api-unique-id='whynaftalmhatati-r9a16aab8defe2918-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1' />
                </div>

                <h3 className="font-header text-lg font-bold text-foreground" data-api-unique-id='whynaftalmhatati-r8741127871c0fb40-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1' data-api-bind-info={`features-${index}-title`} data-api-map-var-name='feature'>
                  {feature.title}
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground" data-api-unique-id='whynaftalmhatati-r9e4644a7f9f54641-s2699556926' data-api-unique-page-name='src/frontend/components/HomePage/WhyNaftalMhatati' data-api-in-loop='1' data-api-bind-info={`features-${index}-description`} data-api-map-var-name='feature'>
                  {feature.description}
                </p>
              </div>;
        })}
        </div>
      </div>
    </section>;
}