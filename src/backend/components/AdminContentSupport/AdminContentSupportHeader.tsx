"use client";

import React from "react";
import { HelpCircle, Headphones, Plus, Package, CreditCard, Truck, ShieldCheck, Radio, CheckCircle2 } from "lucide-react";
import { ContentSupportStats } from "@/backend/types/AdminContentSupport";
interface AdminContentSupportHeaderProps {
  stats: ContentSupportStats;
  onOpenNewFaq: () => void;
  onOpenNewChannel: () => void;
}
export const AdminContentSupportHeader: React.FC<AdminContentSupportHeaderProps> = ({
  stats,
  onOpenNewFaq,
  onOpenNewChannel
}) => {
  return <header className="flex min-w-0 flex-col gap-5 border-b border-border/60 pb-6" data-api-unique-id='admincontentsupportheader-r80d9793799e599e4-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
      {/* Top Banner: Title & Primary Action Buttons */}
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='admincontentsupportheader-rfd1948845da65980-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
        <div className="flex min-w-0 items-start gap-3.5" data-api-unique-id='admincontentsupportheader-r8e4d1500ccd7aadc-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-rf98bf51b8416bded-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <HelpCircle className="h-6 w-6" data-api-unique-id='admincontentsupportheader-r392296b82dc183d9-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
          </div>
          <div className="min-w-0" data-api-unique-id='admincontentsupportheader-ra1f1914cc104825b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='admincontentsupportheader-r45439bdf47d87ad5-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <h1 className="font-header text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='admincontentsupportheader-rd3cd2237d21ae485-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
                إدارة المحتوى وقنوات الدعم والأسئلة الشائعة
              </h1>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success px-2.5 py-0.5 text-xs font-semibold text-success-foreground" data-api-unique-id='admincontentsupportheader-r1c403f48250202ba-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
                <Radio className="h-3 w-3 animate-pulse" data-api-unique-id='admincontentsupportheader-re5bd79346f9c4025-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
                منصة نفطال محطتي (مباشر)
              </span>
            </div>
            <p className="mt-1 font-body text-xs text-muted-foreground sm:text-sm" data-api-unique-id='admincontentsupportheader-ra1f84fa0778850ed-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              المركز الإداري لتهيئة بنك الأسئلة الشائعة المعتمدة وتحديث قنوات الاتصال والدعم الفني للمواطنين
            </p>
          </div>
        </div>

        {/* Global Action CTA Buttons */}
        <div className="flex shrink-0 flex-wrap items-center gap-2.5" data-api-unique-id='admincontentsupportheader-r22e6ee31ccfcaa5b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <button type="button" onClick={onOpenNewFaq} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 font-header text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-primary/80" data-api-unique-id='admincontentsupportheader-raaaf685930a868b4-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <Plus className="h-4 w-4" data-api-unique-id='admincontentsupportheader-rb90f807d1a035203-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            <span data-api-unique-id='admincontentsupportheader-r7729755edf592fa8-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>إضافة سؤال شائع جديد</span>
          </button>

          <button type="button" onClick={onOpenNewChannel} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-secondary px-3.5 font-header text-xs font-semibold text-secondary-foreground shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:brightness-90" data-api-unique-id='admincontentsupportheader-r5b4577092461b8f1-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <Headphones className="h-4 w-4 text-accent" data-api-unique-id='admincontentsupportheader-r3008b5c2d524b98d-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            <span data-api-unique-id='admincontentsupportheader-r4c5bd26135c81b3e-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>إضافة قناة اتصال ودعم</span>
          </button>
        </div>
      </div>

      {/* Metric & Category Distribution Cards Grid */}
      <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6" data-api-unique-id='admincontentsupportheader-r3fb0fcf1f91f74f3-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
        {/* Total FAQs */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-r922efac91ca63bf7-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-rb4658f8a917c00f3-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-r7b998e257e818bd2-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>إجمالي الأسئلة</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-foreground" data-api-unique-id='admincontentsupportheader-r2f7b70840447f267-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <HelpCircle className="h-4 w-4" data-api-unique-id='admincontentsupportheader-rdbc7594f5250ef7a-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-r12395331e3cdbd81-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-rc70d0c8e8acfc72b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>{stats.totalFaqs}</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-success" data-api-unique-id='admincontentsupportheader-r2936f2e6122bd32c-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <CheckCircle2 className="h-3 w-3" data-api-unique-id='admincontentsupportheader-ra4ac54180f10f78f-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
              {stats.activeFaqs} مفعل
            </span>
          </div>
        </div>

        {/* Orders FAQ Category */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-rd5b0402d03e8049b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-r2ebf9779e7f8bae5-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-r017f945587742b4a-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>طلبيات الإطارات</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground" data-api-unique-id='admincontentsupportheader-r692157118202f1c5-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <Package className="h-4 w-4" data-api-unique-id='admincontentsupportheader-r2b944d85566ab5dd-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-r943606bd13fd5c58-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-r2d647700452b9ef8-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>{stats.ordersFaqsCount}</span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground" data-api-unique-id='admincontentsupportheader-r95994fe1867bd55d-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              ORDERS
            </span>
          </div>
        </div>

        {/* Dahabia Payment Category */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-r0897f0c69dbb7386-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-rd6c1b8ce4081baea-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-rdba6661c6702c06d-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>الدفع بالذهبية CIB</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-warning text-warning-foreground" data-api-unique-id='admincontentsupportheader-r9ff1602289c2cce5-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <CreditCard className="h-4 w-4" data-api-unique-id='admincontentsupportheader-r4d9cd4735edf636c-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-r2a373a128a871a93-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-rec8ddcb66ab13bdb-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>{stats.paymentFaqsCount}</span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-warning px-2 py-0.5 text-[10px] font-semibold text-warning-foreground" data-api-unique-id='admincontentsupportheader-r85831ae8c46e6a48-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              PAYMENT
            </span>
          </div>
        </div>

        {/* Delivery Category */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-r0f585f5715d5295d-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-ra4478f0e9f2d37f7-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-rc0274bd26ebbb81f-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>استلام المحطات</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-success text-success-foreground" data-api-unique-id='admincontentsupportheader-r9147f0f6769e8081-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <Truck className="h-4 w-4" data-api-unique-id='admincontentsupportheader-r813e52e816ab71fe-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-r5063297283980890-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-re152a0d4fcc73649-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>{stats.deliveryFaqsCount}</span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-success-foreground" data-api-unique-id='admincontentsupportheader-r63f1109c9c9bd6d0-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              DELIVERY
            </span>
          </div>
        </div>

        {/* Warranty Category */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-rb808d9874dc3daad-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-r82e1cbc9a2082064-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-r1207947d8ac397c1-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>الضمان وما بعد البيع</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-info text-info-foreground" data-api-unique-id='admincontentsupportheader-rbed171e7a88abf7e-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <ShieldCheck className="h-4 w-4" data-api-unique-id='admincontentsupportheader-r3ea1bd0c1dfd1bff-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-rf24e5a226b4d4061-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-rdea828a0ec4215bc-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>{stats.warrantyFaqsCount}</span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-info px-2 py-0.5 text-[10px] font-semibold text-info-foreground" data-api-unique-id='admincontentsupportheader-r465b7eadab9ea56e-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              WARRANTY
            </span>
          </div>
        </div>

        {/* Active Support Channels */}
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-card-foreground shadow-sm" data-api-unique-id='admincontentsupportheader-rffda59ae66db52d4-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
          <div className="flex min-w-0 items-center justify-between gap-2" data-api-unique-id='admincontentsupportheader-r6be07202175b34ad-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-header text-xs font-medium text-muted-foreground" data-api-unique-id='admincontentsupportheader-rd1e74acb11b868e9-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>قنوات الدعم النشطة</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground" data-api-unique-id='admincontentsupportheader-r021cfffb3933febe-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              <Headphones className="h-4 w-4" data-api-unique-id='admincontentsupportheader-r88eca99503073f6b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader' />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2" data-api-unique-id='admincontentsupportheader-r54e779c28b874f36-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground" data-api-unique-id='admincontentsupportheader-r84f1b05564e72a49-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              {stats.activeChannels}
              <span className="text-xs font-normal text-muted-foreground" data-api-unique-id='admincontentsupportheader-r4f362ee2f4887c0b-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>/{stats.totalChannels}</span>
            </span>
            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary" data-api-unique-id='admincontentsupportheader-ra61a5aa066029c09-s3637140438' data-api-unique-page-name='src/backend/components/AdminContentSupport/AdminContentSupportHeader'>
              الرقم 1050 متاح
            </span>
          </div>
        </div>
      </div>
    </header>;
};
export default AdminContentSupportHeader;