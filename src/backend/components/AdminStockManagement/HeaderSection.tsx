"use client";

import React from "react";
import { Plus, RefreshCw, Layers, ShieldCheck, Clock } from "lucide-react";
interface HeaderSectionProps {
  lastSyncTime: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOpenCreateDrawer: () => void;
}
export const HeaderSection: React.FC<HeaderSectionProps> = ({
  lastSyncTime,
  isRefreshing,
  onRefresh,
  onOpenCreateDrawer
}) => {
  return <div data-controller-name="رأس لوحة إدارة المخزون المركزية" className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='headersection-r6f619add80130bf1-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
      <div className="flex min-w-0 items-start gap-3.5" data-api-unique-id='headersection-r2824f3f8fb91cb28-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary" data-api-unique-id='headersection-r131506417d7cf862-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
          <Layers className="h-6 w-6" data-api-unique-id='headersection-r675d9b969e99e5d1-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
        </div>
        <div className="min-w-0 flex-1" data-api-unique-id='headersection-r9555558c10aa2109-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='headersection-rd20d8ddaf504de06-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
            <h1 className="font-header text-xl font-bold tracking-tight text-foreground sm:text-2xl" data-api-unique-id='headersection-r4b88b19f9c24be8c-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
              إدارة المخزون والمقاسات والأسعار
            </h1>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground" data-api-unique-id='headersection-r846042dc970dafbb-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
              <ShieldCheck className="h-3.5 w-3.5 text-primary" data-api-unique-id='headersection-rc894876ddf14795f-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
              لوحة التحكم المركزية - نفطال
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground" data-api-unique-id='headersection-r04d2fd806fb85b7f-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
            <span className="flex items-center gap-1" data-api-unique-id='headersection-re7de1185fe752f0f-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
              <Clock className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='headersection-r37b65b1da4c53079-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
              آخر مزامنة لقاعدة البيانات: <span className="font-mono text-foreground font-semibold" data-api-unique-id='headersection-rb5d2aff85975e480-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>{lastSyncTime}</span>
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground" data-api-unique-id='headersection-r7ecd44b04308ec41-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
            <span data-api-unique-id='headersection-r3a20ae69465beb67-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>نظام الحصص المعتمد لولايات الجزائر</span>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2.5 sm:shrink-0" data-api-unique-id='headersection-r76d8aa7fd5532875-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
        <button type="button" onClick={onRefresh} disabled={isRefreshing} className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-muted px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none" title="تحديث البيانات الفوري" data-api-unique-id='headersection-ra9e66b84725f2f22-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} data-api-unique-id='headersection-r253e91841f27f5a8-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
          <span data-api-unique-id='headersection-rfe77652a084d16f6-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>تحديث السجلات</span>
        </button>

        <button type="button" onClick={onOpenCreateDrawer} className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='headersection-r9e79bd8b08f7933a-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>
          <Plus className="h-4 w-4 stroke-[3]" data-api-unique-id='headersection-r4f3ffc1425f2ba39-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection' />
          <span data-api-unique-id='headersection-r11bb482c774af560-s2295844545' data-api-unique-page-name='src/backend/components/AdminStockManagement/HeaderSection'>إضافة مقاس جديد</span>
        </button>
      </div>
    </div>;
};
export default HeaderSection;