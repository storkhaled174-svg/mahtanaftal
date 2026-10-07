"use client";

import React from "react";
import { ShieldCheck, Clock, ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HeroProps {
  onOrderClick: () => void;
  onCatalogClick: () => void;
}
export default function Hero({
  onOrderClick,
  onCatalogClick
}: HeroProps) {
  return <section data-controller-name="قسم الاستقبال والتعريف" className="relative w-full overflow-hidden border-b border-border bg-background py-16 sm:py-24" data-api-unique-id='hero-r79cd7ef8e8fd1095-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
      {/* Real Naftal Station Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" data-api-unique-id='hero-r23a1f0eec6e5e911-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
        <img src="https://www.autocoder.cc/background/zaki_prod/generated/ecc081b91160435fb60deb62082d7257.png" alt="محطة نفطال الرسمية بالجزائر" className="h-full w-full object-cover object-center opacity-40 transition-transform duration-700" data-api-unique-id='hero-r113ff1ff51e304fa-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" data-api-unique-id='hero-rbc19b2abf37a2d71-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
      </div>

      {/* Industrial grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(229,169,59,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,169,59,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" data-api-unique-id='hero-r3a2732b5e59e40bb-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(250,235,26,0.12)_0%,transparent_70%)]" data-api-unique-id='hero-r2fbb57390fb4fd38-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='hero-re20e6a2a37eb201b-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center" data-api-unique-id='hero-re2d98ec6c1679c0b-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
          
          {/* Sovereign Naftal Emblem Banner */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-card px-4 py-2 text-card-foreground shadow-lg backdrop-blur-sm" data-api-unique-id='hero-ra677bfcdd942bf7e-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FAEB1A] p-0.5 shadow-sm" data-api-unique-id='hero-r5a9827557097156f-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <img src="https://www.autocoder.cc/background/project_image/project_attachments/2312856744/2e0441ef89ee42ceab8ec1ebb1bc5266.png" alt="شعار نفطال" className="h-full w-full object-contain" data-api-unique-id='hero-r855f7a731341f601-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
            </div>
            <span className="font-header text-xs font-bold sm:text-sm text-foreground" data-api-unique-id='hero-re4711e216c150fa8-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              الجمهورية الجزائرية الديمقراطية الشعبية — <span className="font-black text-primary" data-api-unique-id='hero-rdc2681b35c6f07b5-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>نفطال NAFTAL</span>
            </span>
          </div>

          {/* Main Hero Claim */}
          <h1 className="font-display text-4xl font-black leading-[1.2] tracking-tight text-foreground sm:text-5xl lg:text-6xl" data-api-unique-id='hero-r0d83dd1a7a15daf1-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            عجلات عالية الجودة <span className="text-primary" data-api-unique-id='hero-r3c8531681b321abb-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>في متناولكم</span>
          </h1>

          {/* Subtext description */}
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg" data-api-unique-id='hero-r3033f6da05fa66f1-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            المنصة الرقمية الرسمية لنفطال لتسجيل طلبات وتوزيع الإطارات المطاطية المعتمدة في 58 ولاية. اختيار شفاف، جودة مضمونة، وخدمة وطنية متكاملة لتلبية متطلبات تنقلكم بأمان وموثوقية.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row" data-api-unique-id='hero-r7c555fc257bf6ba4-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            <Button onClick={onOrderClick} size="lg" className="w-full min-w-[200px] bg-primary py-6 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:bg-primary/80 sm:w-auto" data-api-unique-id='hero-raf5f14295ae94166-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <span data-api-unique-id='hero-rb06ed9af96337b43-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>اطلب الآن</span>
              <ArrowLeft className="mr-2 h-5 w-5" data-api-unique-id='hero-r4b2335903d281208-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
            </Button>
            <Button onClick={onCatalogClick} variant="outline" size="lg" className="w-full min-w-[200px] border-border bg-card py-6 text-base font-semibold text-card-foreground hover:bg-muted hover:text-foreground active:bg-secondary sm:w-auto" data-api-unique-id='hero-rda29a0ed563a27e0-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <span data-api-unique-id='hero-r70e97e20b206a71c-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>عرض الكتالوج</span>
              <Layers className="mr-2 h-5 w-5 text-primary" data-api-unique-id='hero-r7af4d7c625a56d72-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
            </Button>
          </div>

          {/* Sovereign Status Chips */}
          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-2xl" data-api-unique-id='hero-rbd47f367f70ff3f2-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors hover:border-primary/40" data-api-unique-id='hero-r747fd201e53df511-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary" data-api-unique-id='hero-rd0665f8d30a6ee0d-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                <ShieldCheck className="h-6 w-6" data-api-unique-id='hero-r0e1ec56d5269f8dd-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
              </div>
              <div className="text-right" data-api-unique-id='hero-r76af803c3d4cb03a-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                <div className="font-header text-sm font-bold text-foreground" data-api-unique-id='hero-rd4867b804fed7d54-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  2 علامات معتمدة
                </div>
                <div className="font-body text-xs text-muted-foreground" data-api-unique-id='hero-rd08ed85098210ffd-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  Continental • Iris (مطابقة رسمياً)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors hover:border-primary/40" data-api-unique-id='hero-raad597c33ab8cab7-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary" data-api-unique-id='hero-r83714ff86d892433-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                <Clock className="h-6 w-6" data-api-unique-id='hero-r6bfdf52ecc0873bf-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
              </div>
              <div className="text-right" data-api-unique-id='hero-r4f193b23d6197fad-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                <div className="font-header text-sm font-bold text-foreground" data-api-unique-id='hero-r626c1857a45ca3a1-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  24/24 استقبال الطلبات
                </div>
                <div className="font-body text-xs text-muted-foreground" data-api-unique-id='hero-re283970f42568b2b-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  خدمة رقمية مستمرة على مدار الساعة
                </div>
              </div>
            </div>
          </div>

          {/* Official Logistics & Service Visual Showcase */}
          <div className="mt-8 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card p-2 shadow-sm" data-api-unique-id='hero-r7f8a0931f0120fff-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
            <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44" data-api-unique-id='hero-refcb0cb65aa87ae3-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
              <img src="https://www.autocoder.cc/background/zaki_prod/generated/020934f6838e43e2a5bc3bf3ae3cd204.png" alt="أسطول وشبكة توزيع نفطال الوطنية للإطارات والمحروقات" className="h-full w-full object-cover object-center brightness-95 transition-transform duration-500 hover:scale-105" data-api-unique-id='hero-r06499323efb930eb-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" data-api-unique-id='hero-r793d7c40414efb4a-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero' />
              <div className="absolute bottom-3 right-4 text-right" data-api-unique-id='hero-r0f93a88eced10959-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                <div className="font-header text-xs font-bold text-white sm:text-sm" data-api-unique-id='hero-r0646618266286624-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  الشبكة اللوجستية الوطنية لنفطال لتوزيع الإطارات
                </div>
                <div className="font-body text-[11px] text-white/80" data-api-unique-id='hero-r0e5ffa0dde30ac1a-s92238866' data-api-unique-page-name='src/frontend/components/HomePage/Hero'>
                  تغطية شاملة ومراكز خدمة في كافة ولايات الوطن الـ 58
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>;
}