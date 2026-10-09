"use client";

import React from "react";
import { Package, Clock, Activity, CheckCircle2, XCircle, Gauge, DollarSign, AlertTriangle } from "lucide-react";
import { KpiSummary } from "@/backend/types/AdminDashboard";
interface KpiSectionProps {
  summary: KpiSummary;
  selectedStatusFilter: string;
  onSelectStatusFilter: (status: string) => void;
}
export default function KpiSection({
  summary,
  selectedStatusFilter,
  onSelectStatusFilter
}: KpiSectionProps) {
  const totalOrders = summary?.totalOrders ?? 0;
  const newOrders = summary?.newOrders ?? 0;
  const processingOrders = summary?.processingOrders ?? 0;
  const completedOrders = summary?.completedOrders ?? 0;
  const cancelledOrders = summary?.cancelledOrders ?? 0;
  const totalRevenueDzd = summary?.totalRevenueDzd ?? 0;
  const stockAvailabilityRate = summary?.stockAvailabilityRate ?? 0;
  const lowStockAlertCount = summary?.lowStockAlertCount ?? 0;
  const kpiCards = [{
    id: "ALL",
    title: "إجمالي الطلبيات",
    value: totalOrders.toLocaleString("ar-DZ"),
    subtext: "كافة السجلات المسجلة",
    icon: Package,
    badge: "الرئيسي",
    badgeColor: "bg-secondary text-secondary-foreground",
    indicatorBorder: "border-primary",
    activeBg: "border-primary shadow-sm"
  }, {
    id: "NEW",
    title: "طلبيات جديدة",
    value: newOrders.toLocaleString("ar-DZ"),
    subtext: "تحتاج معالجة أولية",
    icon: Clock,
    badge: "🟡 جديدة",
    badgeColor: "bg-warning text-warning-foreground",
    indicatorBorder: "border-warning",
    activeBg: "border-warning shadow-sm"
  }, {
    id: "PROCESSING",
    title: "قيد المعالجة",
    value: processingOrders.toLocaleString("ar-DZ"),
    subtext: "في إطار التجهيز والتوزيع",
    icon: Activity,
    badge: "🔵 قيد المعالجة",
    badgeColor: "bg-secondary text-secondary-foreground",
    indicatorBorder: "border-secondary",
    activeBg: "border-secondary shadow-sm"
  }, {
    id: "COMPLETED",
    title: "طلبيات مكتملة",
    value: completedOrders.toLocaleString("ar-DZ"),
    subtext: "تم التسليم بالمحطات",
    icon: CheckCircle2,
    badge: "🟢 مكتملة",
    badgeColor: "bg-success text-success-foreground",
    indicatorBorder: "border-success",
    activeBg: "border-success shadow-sm"
  }, {
    id: "CANCELLED",
    title: "طلبيات ملغية",
    value: cancelledOrders.toLocaleString("ar-DZ"),
    subtext: "ملغاة لعدم المطابقة",
    icon: XCircle,
    badge: "🔴 ملغية",
    badgeColor: "bg-destructive text-destructive-foreground",
    indicatorBorder: "border-destructive",
    activeBg: "border-destructive shadow-sm"
  }, {
    id: "REVENUE",
    title: "إجمالي المبيعات",
    value: `${totalRevenueDzd.toLocaleString("ar-DZ")} دج`,
    subtext: "للطلبيات المعتمدة",
    icon: DollarSign,
    badge: "المداخيل",
    badgeColor: "bg-primary text-primary-foreground font-bold",
    indicatorBorder: "border-primary",
    activeBg: "border-primary shadow-sm"
  }, {
    id: "STOCK_RATE",
    title: "توفر المخزون الوطني",
    value: `${stockAvailabilityRate}%`,
    subtext: lowStockAlertCount > 0 ? `${lowStockAlertCount} مقاسات في حالة حرج` : "المخزون مستقر",
    icon: lowStockAlertCount > 0 ? AlertTriangle : Gauge,
    badge: lowStockAlertCount > 0 ? "تنبيه مخزون" : "حالة ممتازة",
    badgeColor: lowStockAlertCount > 0 ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground font-bold",
    indicatorBorder: lowStockAlertCount > 0 ? "border-destructive" : "border-primary",
    activeBg: lowStockAlertCount > 0 ? "border-destructive shadow-sm" : "border-primary shadow-sm"
  }];
  return <section className="w-full min-w-0" data-controller-name="مؤشرات الأداء التشغيلية الإجمالية" data-api-unique-id='kpisection-ra1bdea601ec9a195-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3" data-api-unique-id='kpisection-r6b9ea95b37cf1099-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection'>
        {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        const isSelected = selectedStatusFilter === kpi.id;
        return <button type="button" key={kpi.id} onClick={() => {
          if (kpi.id === "ALL" || kpi.id === "NEW" || kpi.id === "PROCESSING" || kpi.id === "COMPLETED" || kpi.id === "CANCELLED") {
            onSelectStatusFilter(kpi.id);
          }
        }} className={`flex flex-col justify-between rounded-xl border bg-card p-3.5 text-right transition-all duration-200 hover:border-primary/50 text-card-foreground min-w-0 ${isSelected ? kpi.activeBg : "border-border"}`} data-api-unique-id='kpisection-r1e187c48fbc1d9d5-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
              {/* Card Header: Title + Icon */}
              <div className="flex items-start justify-between gap-2 min-w-0 w-full" data-api-unique-id='kpisection-rb2c1c9393935e001-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='kpisection-r7df4e42c10230da9-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
                  <span className="text-sm font-bold text-foreground block" data-api-unique-id='kpisection-raf3c0ce572b35743-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1' data-api-bind-info={`kpiCards-${index}-title`} data-api-map-var-name='kpi'>
                    {kpi.title}
                  </span>
                  <div className="mt-1 flex items-baseline gap-1" data-api-unique-id='kpisection-r540bb02b80bbf249-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-foreground" data-api-unique-id='kpisection-r2d17ff92e232f075-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1' data-api-bind-info={`kpiCards-${index}-value`} data-api-map-var-name='kpi'>
                      {kpi.value}
                    </span>
                  </div>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground border border-border" data-api-unique-id='kpisection-rfc363e61efaa9a9c-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
                  <Icon className="h-4 w-4 text-primary" data-api-bind-info={`kpiCards-${index}-icon`} data-api-map-var-name='kpi' data-api-unique-id='kpisection-r357ecc7ac853e71f-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1' />
                </div>
              </div>

              {/* Card Footer: Status Badge + Subtext */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2 w-full min-w-0" data-api-unique-id='kpisection-r0fdbcd89b4648d95-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1'>
                <span className="text-sm font-medium text-muted-foreground" data-api-unique-id='kpisection-r29977521dfadcf08-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1' data-api-bind-info={`kpiCards-${index}-subtext`} data-api-map-var-name='kpi'>
                  {kpi.subtext}
                </span>
                <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${kpi.badgeColor}`} data-api-unique-id='kpisection-r3f8637015acfc047-s1902068195' data-api-unique-page-name='src/backend/components/AdminDashboard/KpiSection' data-api-in-loop='1' data-api-bind-info={`kpiCards-${index}-badge`} data-api-map-var-name='kpi'>
                  {kpi.badge}
                </span>
              </div>
            </button>;
      })}
      </div>
    </section>;
}