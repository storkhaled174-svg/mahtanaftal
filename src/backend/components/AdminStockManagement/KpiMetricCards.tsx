"use client";

import React from "react";
import { Layers, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
import { StockKpiData } from "@/backend/types/AdminStockManagement";
interface KpiMetricCardsProps {
  kpi: StockKpiData;
  onFilterAlerts?: () => void;
}
export const KpiMetricCards: React.FC<KpiMetricCardsProps> = ({
  kpi,
  onFilterAlerts
}) => {
  return <div data-controller-name="شريط المؤشرات الإحصائية لمخزون الإطارات" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" data-api-unique-id='kpimetriccards-r136c08b816b04f90-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
      {/* 1. إجمالي المقاسات المسجلة */}
      <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4.5 text-card-foreground shadow-sm" data-api-unique-id='kpimetriccards-r3e28e86b74b3d6c4-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='kpimetriccards-rc8add1218790aa2d-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='kpimetriccards-rdcfe452b44ea8cba-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='kpimetriccards-r77205ae45cfe8d83-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>إجمالي المقاسات المسجلة</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='kpimetriccards-r8ed28f825cca8b64-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='kpimetriccards-r0cafb737609d334b-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
                {kpi.totalSizes}
              </span>
              <span className="text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-r79a9fdee14ac69a9-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>صنفاً معتمداً</span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary" data-api-unique-id='kpimetriccards-r6198f1843042f2ed-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <Layers className="h-5 w-5" data-api-unique-id='kpimetriccards-r24983bbf9b355889-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
          </div>
        </div>
        <div className="mt-3.5 flex min-w-0 items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-r502c396bd4771acc-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <span className="flex items-center gap-1 truncate" data-api-unique-id='kpimetriccards-r4d8b826925ba99bf-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <span className="h-2 w-2 rounded-full bg-accent" data-api-unique-id='kpimetriccards-r22a61fbe95e6ab7e-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
            كونتيننتال: <strong className="font-mono text-foreground font-semibold" data-api-unique-id='kpimetriccards-r82ee40f674cc198d-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>{kpi.continentalCount}</strong>
          </span>
          <span className="flex items-center gap-1 truncate" data-api-unique-id='kpimetriccards-r0de6dc1a2ca64593-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <span className="h-2 w-2 rounded-full bg-chart-2" data-api-unique-id='kpimetriccards-r5aa93f3450969677-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
            إيريس: <strong className="font-mono text-foreground font-semibold" data-api-unique-id='kpimetriccards-r29d95d582269fcde-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>{kpi.irisCount}</strong>
          </span>
        </div>
      </div>

      {/* 2. المخزون الفعلي المتوفر */}
      <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4.5 text-card-foreground shadow-sm" data-api-unique-id='kpimetriccards-r8fb042588d5c2c64-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='kpimetriccards-r6d02f21c2678fea4-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='kpimetriccards-r3a46696db8f37045-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='kpimetriccards-r6ed83b892134af82-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>المخزون المتوفر للطلب</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='kpimetriccards-r4b2fdec51ab5cff5-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='kpimetriccards-r964bf4cc8d4b9141-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
                {kpi.totalAvailable.toLocaleString("fr-DZ")}
              </span>
              <span className="text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-r683a08cf73c0a91e-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>إطاراً جاهزاً</span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-success/30 bg-success/10 text-success" data-api-unique-id='kpimetriccards-rc5082388c76fc592-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <CheckCircle2 className="h-5 w-5" data-api-unique-id='kpimetriccards-r12772690c1bc8675-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
          </div>
        </div>
        <div className="mt-3.5 flex min-w-0 items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-raf9dd0a3a955bcb7-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <span data-api-unique-id='kpimetriccards-r3f6cdf714d059d5f-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>القيمة الإجمالية المقدرة</span>
          <span className="font-mono font-bold text-foreground" data-api-unique-id='kpimetriccards-rdf8349b5b349865c-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            {kpi.totalInventoryValueDzd.toLocaleString("fr-DZ")} <span className="text-[10px] text-primary" data-api-unique-id='kpimetriccards-re8ac9691d87fc110-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>د.ج</span>
          </span>
        </div>
      </div>

      {/* 3. المخزون المحجوز للطلبيات */}
      <div className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-4.5 text-card-foreground shadow-sm" data-api-unique-id='kpimetriccards-rbbdde7ab080bdfb3-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='kpimetriccards-r54ca0a7227a82655-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='kpimetriccards-rd2078b6c88ffe723-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <span className="text-xs font-medium text-muted-foreground" data-api-unique-id='kpimetriccards-rc1e90e7beda18d44-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>المخزون المحجوز للطلبيات</span>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='kpimetriccards-r32eb6e7edb8814b0-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-api-unique-id='kpimetriccards-r4aab1fb54f97a76d-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
                {kpi.totalReserved.toLocaleString("fr-DZ")}
              </span>
              <span className="text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-r6e7af30ea914298b-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>حصة مؤكدة</span>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-info/30 bg-info/10 text-info" data-api-unique-id='kpimetriccards-r0882acefbe7a58a9-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <Lock className="h-5 w-5" data-api-unique-id='kpimetriccards-rbe4a77e16d9f4ef1-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
          </div>
        </div>
        <div className="mt-3.5 flex min-w-0 items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-r00e78005674ff9cb-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <span data-api-unique-id='kpimetriccards-r9b1a01ab36f44180-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>بانتظار التركيب بالمحطات</span>
          <span className="font-mono text-foreground font-semibold" data-api-unique-id='kpimetriccards-r8c0f4aa70fc4f3e5-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            {(kpi.totalReserved / (kpi.totalAvailable + kpi.totalReserved || 1) * 100).toFixed(1)}% من الإجمالي
          </span>
        </div>
      </div>

      {/* 4. تنبيهات انخفاض المخزون والنفاد */}
      <div onClick={onFilterAlerts} className={`flex min-w-0 flex-col justify-between rounded-xl border p-4.5 text-card-foreground shadow-sm transition-all cursor-pointer ${kpi.criticalAlertCount > 0 ? "border-destructive/60 bg-destructive/10 hover:border-destructive" : "border-border bg-card hover:border-primary/50"}`} data-api-unique-id='kpimetriccards-r568bce0f42e3dd56-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
        <div className="flex min-w-0 items-start justify-between gap-2" data-api-unique-id='kpimetriccards-r8677d50cfcf5b742-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <div className="min-w-0 flex-1" data-api-unique-id='kpimetriccards-r6c4d3d646125592f-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <div className="flex items-center gap-1.5" data-api-unique-id='kpimetriccards-rbaf6c39f380124d4-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
              <span className="text-xs font-medium text-foreground" data-api-unique-id='kpimetriccards-ra8f18b8f1afde126-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>تنبيهات انخفاض المخزون</span>
              {kpi.criticalAlertCount > 0 && <span className="relative flex h-2 w-2" data-api-unique-id='kpimetriccards-r44f8fb109e7d7afd-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" data-api-unique-id='kpimetriccards-r9150bb4e291770c4-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" data-api-unique-id='kpimetriccards-r96dbbb45cf0bab58-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
                </span>}
            </div>
            <div className="mt-1 flex items-baseline gap-2" data-api-unique-id='kpimetriccards-r43f4cb57933fd53e-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
              <span className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${kpi.criticalAlertCount > 0 ? "text-destructive" : "text-foreground"}`} data-api-unique-id='kpimetriccards-r10726ac6c47765c6-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
                {kpi.criticalAlertCount}
              </span>
              <span className="text-xs text-muted-foreground" data-api-unique-id='kpimetriccards-rcff1a2fef6bba6ed-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>مقاسات تحت العتبة</span>
            </div>
          </div>
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${kpi.criticalAlertCount > 0 ? "border-destructive/30 bg-destructive text-destructive-foreground" : "border-border bg-muted text-muted-foreground"}`} data-api-unique-id='kpimetriccards-r62451cee9319bf74-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            <AlertTriangle className="h-5 w-5" data-api-unique-id='kpimetriccards-rbd6358eb9cae86ad-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards' />
          </div>
        </div>
        <div className="mt-3.5 flex min-w-0 items-center justify-between border-t border-border/60 pt-2.5 text-xs" data-api-unique-id='kpimetriccards-r49e38f849252c77b-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
          <span className="text-muted-foreground" data-api-unique-id='kpimetriccards-r2fad7e852f84ee32-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>حالة التنبيه الفوري:</span>
          <span className={`font-bold ${kpi.criticalAlertCount > 0 ? "text-destructive" : "text-success"}`} data-api-unique-id='kpimetriccards-r6f268605159f7e85-s390102235' data-api-unique-page-name='src/backend/components/AdminStockManagement/KpiMetricCards'>
            {kpi.criticalAlertCount > 0 ? "يتطلب إعادة التموين" : "المستويات آمنة"}
          </span>
        </div>
      </div>
    </div>;
};
export default KpiMetricCards;