"use client";

import React from "react";
import { Truck, Award, LockKeyhole } from "lucide-react";
import { BrandPartnershipInfo, SecurityFeatureItem } from "@/frontend/types/CustomerLogin";
const TRUST_FEATURES: SecurityFeatureItem[] = [{
  id: "f1",
  title: "تغطية شاملة لـ 58 ولاية",
  description: "شبكة مراكز توزيع ونقاط استلام نفطال معتمدة في كافة ربوع الوطن.",
  iconName: "Truck"
}, {
  id: "f2",
  title: "إطارات أصلية معتمدة",
  description: "حصص رسمية مباشرة من العلامات المصنعة Continental و Iris.",
  iconName: "Award"
}, {
  id: "f3",
  title: "حماية البيانات والمطابقة الوطنية",
  description: "توثيق آمن لبيانات بطاقة التعريف الوطنية والبطاقة الذهبية.",
  iconName: "LockKeyhole"
}];
const BRANDS_INFO: BrandPartnershipInfo[] = [{
  name: "CONTINENTAL",
  arabicName: "كونتيننتال الألمانية",
  badgeText: "جودة معتمدة",
  description: "إطارات متميزة بأعلى معايير الأمان والثبات على الطرقات"
}, {
  name: "IRIS",
  arabicName: "إيريس الجزائرية",
  badgeText: "إنتاج وطني",
  description: "صناعة وطنية رائدة تلبي متطلبات المركبات السياحية والنفعية"
}];
export default function InstitutionalTrustSection() {
  return <div data-controller-name="لوحة الضمانات المؤسسية لنفطال" className="w-full max-w-4xl mx-auto mt-8 sm:mt-10 pt-6 border-t border-border/50 text-foreground" data-api-unique-id='institutionaltrustsection-r808b5365805271a5-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
      {/* Brands badges strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-secondary/40 border border-border/80 mb-6" data-api-unique-id='institutionaltrustsection-r20500523777f2d8c-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
        <div className="flex items-center gap-3" data-api-unique-id='institutionaltrustsection-r6d2af4f89ae39112-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0" data-api-unique-id='institutionaltrustsection-r63c91e04dfa1e177-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
            <Award className="w-5 h-5 text-primary" data-api-unique-id='institutionaltrustsection-re090f3932da71802-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' />
          </div>
          <div className="text-right" data-api-unique-id='institutionaltrustsection-rdd32e9aaf8aff5fd-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
            <h2 className="font-header font-bold text-sm text-foreground" data-api-unique-id='institutionaltrustsection-r658c5cff4c6d94cc-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
              العلامات التجارية المعتمدة في منصة نفطال
            </h2>
            <p className="text-xs text-muted-foreground font-body" data-api-unique-id='institutionaltrustsection-rf730de3d43258c38-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
              توزيع حصص الإطارات المعتمدة وفق التنظيم الوطني
            </p>
          </div>
        </div>

        {/* Brand badges */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end" data-api-unique-id='institutionaltrustsection-rac51b72daa75310e-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
          {BRANDS_INFO.map((b, index) => <div key={b.name} className="px-3.5 py-1.5 rounded-lg bg-card text-card-foreground border border-border flex items-center gap-2 shadow-soft" data-api-unique-id='institutionaltrustsection-r00a721e6ca7ac501-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
              <span className="w-2 h-2 rounded-full bg-primary" data-api-unique-id='institutionaltrustsection-r0ac4bc3d6cbefc94-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' />
              <div className="text-right" data-api-unique-id='institutionaltrustsection-r46b1a28d3d0aff18-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
                <span className="font-display font-black text-xs text-primary block tracking-wider" data-api-unique-id='institutionaltrustsection-r4abe5fd7e64a95dc-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' data-api-bind-info={`BRANDS_INFO-${index}-name`} data-api-map-var-name='b'>
                  {b.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-body" data-api-unique-id='institutionaltrustsection-r13bc6c7e3a753528-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' data-api-bind-info={`BRANDS_INFO-${index}-arabicName`} data-api-map-var-name='b'>
                  {b.arabicName}
                </span>
              </div>
            </div>)}
        </div>
      </div>

      {/* 3 Pillars of Trust Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='institutionaltrustsection-r27cd8e994f8ed819-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
        {TRUST_FEATURES.map((item, index) => <div key={item.id} className="bg-card/70 text-card-foreground border border-border/70 rounded-lg p-4 text-right flex flex-col justify-between" data-api-unique-id='institutionaltrustsection-raeaccd83b5453734-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
            <div className="flex items-start gap-3" data-api-unique-id='institutionaltrustsection-re8eb7cc1c666b545-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
              <div className="p-2 rounded-md bg-muted text-primary shrink-0 border border-border/60" data-api-unique-id='institutionaltrustsection-rb5e4f57e175826dc-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
                {item.iconName === "Truck" && <Truck className="w-4 h-4 text-primary" data-api-unique-id='institutionaltrustsection-r915689c11a2bd999-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' />}
                {item.iconName === "Award" && <Award className="w-4 h-4 text-primary" data-api-unique-id='institutionaltrustsection-r40e0e980ea9061ae-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' />}
                {item.iconName === "LockKeyhole" && <LockKeyhole className="w-4 h-4 text-primary" data-api-unique-id='institutionaltrustsection-r00521ec48964b505-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' />}
              </div>
              <div className="space-y-1" data-api-unique-id='institutionaltrustsection-r3db17259b0fc4b5d-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1'>
                <h3 className="font-header font-bold text-xs text-foreground" data-api-unique-id='institutionaltrustsection-ref6b9049f2c2511c-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' data-api-bind-info={`TRUST_FEATURES-${index}-title`} data-api-map-var-name='item'>
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted-foreground font-body leading-relaxed" data-api-unique-id='institutionaltrustsection-r499f83e22005bbae-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection' data-api-in-loop='1' data-api-bind-info={`TRUST_FEATURES-${index}-description`} data-api-map-var-name='item'>
                  {item.description}
                </p>
              </div>
            </div>
          </div>)}
      </div>

      {/* Sovereign Footer Notice */}
      <div className="mt-6 text-center text-xs text-muted-foreground font-body flex flex-wrap items-center justify-center gap-x-4 gap-y-1" data-api-unique-id='institutionaltrustsection-r909a151d8c58bdc3-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>
        <span data-api-unique-id='institutionaltrustsection-r14737b95f08c06b7-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>شركة نفطال ش.ذ.م.م - فرع سوناطراك</span>
        <span data-api-unique-id='institutionaltrustsection-rf29f551543977292-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>•</span>
        <span data-api-unique-id='institutionaltrustsection-r93b42a3779c0c291-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>الجمهورية الجزائرية الديمقراطية الشعبية</span>
        <span data-api-unique-id='institutionaltrustsection-r3cbd4d2106ce9b54-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>•</span>
        <span data-api-unique-id='institutionaltrustsection-r3bd849c86a8ba1a1-s700385241' data-api-unique-page-name='src/frontend/components/CustomerLogin/InstitutionalTrustSection'>جميع الحقوق محفوظة {new Date().getFullYear()}</span>
      </div>
    </div>;
}