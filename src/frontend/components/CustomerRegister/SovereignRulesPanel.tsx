"use client";

import React from "react";
import { ShieldCheck, Award, UserCheck, Lock, Landmark } from "lucide-react";
export default function SovereignRulesPanel() {
  const rules = [{
    id: "quota",
    icon: Award,
    title: "الاستفادة من الحصص الوطنية المعتمدة",
    desc: "التسجيل يتيح للمواطنين حجز حصص إطارات السيارات (Continental و Iris) بالأسعار الرسمية المقننة عبر شبكة محطات نفطال المعتمدة عبر 58 ولاية.",
    badge: "تغطية 58 ولاية"
  }, {
    id: "nin",
    icon: ShieldCheck,
    title: "التحقق المباشر برقم التعريف الوطني (NIN)",
    desc: "ربط بيومتري مباشر مع سجل التعريف الوطني لضمان عدالة التوزيع ومنع تكرار الحجوزات خارج الضوابط القانونية والتنظيمية المعمول بها.",
    badge: "مطابقة بيومترية"
  }, {
    id: "role",
    icon: UserCheck,
    title: "تعيين دور زبون (CUSTOMER) تلقائياً",
    desc: "تُمنح جميع الحسابات المنشأة عبر هذه البوابة صلاحية زبون حصرياً، وتتم إدارة حسابات مسؤولي نفطال مركزياً عبر المصالح المختصة.",
    badge: "حساب زبون رسمي"
  }];
  return <div data-controller-name="لوحة الضوابط والمعايير الوطنية" className="flex flex-col justify-between space-y-8 rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8 backdrop-blur-md" data-api-unique-id='sovereignrulespanel-r1846d27d99f3d39c-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
      {/* Top Banner with Sovereign Seal */}
      <div className="space-y-4" data-api-unique-id='sovereignrulespanel-r61a399147c5e8319-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-header font-bold text-primary" data-api-unique-id='sovereignrulespanel-r3ef4241fcb05b7ea-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
          <Landmark className="h-3.5 w-3.5" data-api-unique-id='sovereignrulespanel-r605f19b6dea832f1-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' />
          <span data-api-unique-id='sovereignrulespanel-r7951647195d78a66-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>الجمهورية الجزائرية الديمقراطية الشعبية</span>
        </div>

        <div className="space-y-2" data-api-unique-id='sovereignrulespanel-rf7d119635c794b74-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-api-unique-id='sovereignrulespanel-rf3de6a21e45ba81a-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
            بوابة التسجيل الوطني للمواطنين
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed" data-api-unique-id='sovereignrulespanel-r5768cdd9d148d6cf-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
            أنشئ حسابك الرقمي الموثق للاستفادة من برنامج التوزيع العادل لإطارات المركبات المعتمدة من شركة نفطال، فرع سوناطراك.
          </p>
        </div>

        {/* 3 Core Rules Matrix */}
        <div className="mt-6 space-y-4" data-api-unique-id='sovereignrulespanel-r6ccd55bcfc7384cf-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
          {rules.map((rule, index) => {
          const IconComp = rule.icon;
          return <div key={rule.id} className="group relative rounded-xl border border-border/60 bg-muted/40 p-4 transition-all hover:border-primary/50 hover:bg-muted/70" data-api-unique-id='sovereignrulespanel-rad9457fa11965322-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1'>
                <div className="flex items-start gap-3.5" data-api-unique-id='sovereignrulespanel-rf04d5fdd67361e47-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1'>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary border border-border group-hover:border-primary/40 group-hover:shadow-gold transition-all" data-api-unique-id='sovereignrulespanel-r328f1f4e8eb990b3-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1'>
                    <IconComp className="h-5 w-5" data-api-bind-info={`rules-${index}-icon`} data-api-map-var-name='rule' data-api-unique-id='sovereignrulespanel-r048a2e0bbee94d04-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1' />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1" data-api-unique-id='sovereignrulespanel-r1d4c57c77970e299-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1'>
                    <div className="flex items-center justify-between gap-2 flex-wrap" data-api-unique-id='sovereignrulespanel-rade6aa4fc4510264-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1'>
                      <h3 className="font-header text-sm font-bold text-foreground" data-api-unique-id='sovereignrulespanel-r3721c673809c0d32-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1' data-api-bind-info={`rules-${index}-title`} data-api-map-var-name='rule'>
                        {rule.title}
                      </h3>
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-header font-semibold text-primary border border-primary/20" data-api-unique-id='sovereignrulespanel-r6ea83c200a2981bc-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1' data-api-bind-info={`rules-${index}-badge`} data-api-map-var-name='rule'>
                        {rule.badge}
                      </span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed" data-api-unique-id='sovereignrulespanel-rbcdcdb73d4ef08b8-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' data-api-in-loop='1' data-api-bind-info={`rules-${index}-desc`} data-api-map-var-name='rule'>
                      {rule.desc}
                    </p>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* Security & Integrity Indicators */}
      <div className="pt-4 border-t border-border/60 space-y-3" data-api-unique-id='sovereignrulespanel-rf7833e30c14e8328-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
        <div className="flex items-center justify-between text-xs font-body text-muted-foreground" data-api-unique-id='sovereignrulespanel-rb0b6ec55e99b4baa-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
          <div className="flex items-center gap-1.5" data-api-unique-id='sovereignrulespanel-rd0e038cf7b9bce64-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
            <Lock className="h-3.5 w-3.5 text-primary" data-api-unique-id='sovereignrulespanel-r05fa021e7fdba56b-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel' />
            <span data-api-unique-id='sovereignrulespanel-r27cac425bab11227-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>تشفير بيانات الحساب ببروتوكول SHA-256</span>
          </div>
          <span className="text-emerald-400 font-medium" data-api-unique-id='sovereignrulespanel-r1e9a44f52be50186-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>نظام نشط ومؤمن</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs font-header" data-api-unique-id='sovereignrulespanel-r4469bdb3b59bc635-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
          <div className="rounded-lg border border-border/70 bg-card p-2.5" data-api-unique-id='sovereignrulespanel-r926387003cfd5e49-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
            <span className="block text-primary font-bold text-base" data-api-unique-id='sovereignrulespanel-r142fbc494b2e36f7-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>58 ولاية</span>
            <span className="text-muted-foreground text-[11px]" data-api-unique-id='sovereignrulespanel-r0c64fc2dd6ba31e5-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>تغطية وطنية شاملة</span>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-2.5" data-api-unique-id='sovereignrulespanel-rab2d9bec8dcae49d-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>
            <span className="block text-primary font-bold text-base" data-api-unique-id='sovereignrulespanel-r63e12fe68c48702f-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>حصة مقننة</span>
            <span className="text-muted-foreground text-[11px]" data-api-unique-id='sovereignrulespanel-r54ea3cfddc76bb6e-s1277695226' data-api-unique-page-name='src/frontend/components/CustomerRegister/SovereignRulesPanel'>مواطنة رقمية عادلة</span>
          </div>
        </div>
      </div>
    </div>;
}