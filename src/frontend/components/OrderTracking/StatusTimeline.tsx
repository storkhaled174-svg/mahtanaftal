"use client";

import React from "react";
import { CheckCircle2, Clock, AlertTriangle, XCircle, FileText, Check } from "lucide-react";
import { OrderStatus, TireOrderOutput } from "@/frontend/types/OrderTracking";
interface StatusTimelineProps {
  order: TireOrderOutput;
}
interface StepItem {
  stepNumber: number;
  label: string;
  desc: string;
}
export default function StatusTimeline({
  order
}: StatusTimelineProps) {
  const steps: StepItem[] = [{
    stepNumber: 1,
    label: "تسجيل الطلبية",
    desc: "تم استلام الطلب وتأكيد بيانات البطاقة الذهبية بنجاح"
  }, {
    stepNumber: 2,
    label: "تخصيص الحصة",
    desc: "حجز الحصة الرسمية وتوجيهها لمركز نفطال بالولاية"
  }, {
    stepNumber: 3,
    label: "المعالجة والشحن",
    desc: "تجهيز الإطارات ونقلها إلى محطة التوزيع المحددة"
  }, {
    stepNumber: 4,
    label: "جاهزة للاستلام",
    desc: "الإطارات متوفرة بالمحطة للتسليم بالوصل الرسمي"
  }];
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "NEW":
        return {
          label: "طلبية جديدة ومسجلة",
          className: "bg-warning/15 text-warning border border-warning/30",
          icon: Clock
        };
      case "PROCESSING":
        return {
          label: "قيد المعالجة وتخصيص الحصة",
          className: "bg-primary/15 text-primary border border-primary/30",
          icon: Clock
        };
      case "COMPLETED":
        return {
          label: "مكتملة ومتاحة للاستلام",
          className: "bg-success/15 text-success border border-success/30",
          icon: CheckCircle2
        };
      case "CANCELLED":
        return {
          label: "ملغية من طرف الإدارة",
          className: "bg-destructive/15 text-destructive border border-destructive/30",
          icon: XCircle
        };
      default:
        return {
          label: status,
          className: "bg-muted text-muted-foreground border border-border",
          icon: AlertTriangle
        };
    }
  };
  const currentBadge = getStatusBadge(order.status);
  const StatusIcon = currentBadge.icon;
  const getStepState = (stepNumber: number, status: OrderStatus): "done" | "current" | "upcoming" | "cancelled" => {
    if (status === "CANCELLED") {
      return "cancelled";
    }
    if (status === "COMPLETED") {
      return "done";
    }
    if (status === "PROCESSING") {
      if (stepNumber <= 2) return "done";
      if (stepNumber === 3) return "current";
      return "upcoming";
    }
    if (status === "NEW") {
      if (stepNumber === 1) return "current";
      return "upcoming";
    }
    return "upcoming";
  };
  const formattedDate = React.useMemo(() => {
    if (!order.createdAt) return "";
    try {
      const dateObj = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);
      if (isNaN(dateObj.getTime())) {
        return String(order.createdAt);
      }
      return new Intl.DateTimeFormat("ar-DZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(dateObj);
    } catch {
      return String(order.createdAt);
    }
  }, [order.createdAt]);
  return <section data-controller-name="شريط الحالة التشغيلية والتقدم" className="w-full rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8" data-api-unique-id='statustimeline-rd40c6c82a90cd784-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border" data-api-unique-id='statustimeline-rf120ab77b4f48326-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
        <div className="space-y-1 text-right" data-api-unique-id='statustimeline-rfaece3e65a865399-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
          <div className="flex items-center gap-3" data-api-unique-id='statustimeline-r13eb18c45aab56d8-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            <h2 className="text-xl sm:text-2xl font-header font-bold text-foreground" data-api-unique-id='statustimeline-re12249f1e5802ac3-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
              الحالة التشغيلية ومسار التوريد
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-header font-bold inline-flex items-center gap-1.5 ${currentBadge.className}`} data-api-unique-id='statustimeline-r47f156c43d84b107-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
              <StatusIcon className="w-3.5 h-3.5" data-api-unique-id='statustimeline-r3c10d3753b265f03-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' />
              <span data-api-unique-id='statustimeline-r706ce9148ff09f27-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>{currentBadge.label}</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-body" data-api-unique-id='statustimeline-r748b31dfc8cd2f43-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            الرقم المرجعي: <span className="font-mono font-bold text-primary" data-api-unique-id='statustimeline-rf26c5a67ce135b0a-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>{order.orderNumber}</span>
            {formattedDate && <> | تاريخ التسجيل: <span className="font-mono" data-api-unique-id='statustimeline-rc0d5a574de8fd5ab-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>{formattedDate}</span></>}
          </p>
        </div>

        {order.status === "COMPLETED" && <div className="bg-success/10 border border-success px-4 py-2 rounded-lg text-right" data-api-unique-id='statustimeline-r809cd20e4f4e3bc3-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            <span className="text-xs font-bold text-foreground block" data-api-unique-id='statustimeline-r68e44942080a572c-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>جاهزة للاستلام الفوري</span>
            <span className="text-xs text-muted-foreground font-body" data-api-unique-id='statustimeline-r0a3113b84e2ee760-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>يرجى إحضار بطاقة التعريف والوصل الرسمي</span>
          </div>}
      </div>

      {/* Progress Steps Timeline */}
      {order.status !== "CANCELLED" ? <div className="mt-8" data-api-unique-id='statustimeline-r07f67651b72954f3-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative" data-api-unique-id='statustimeline-r90bd27c22d353bf1-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            {steps.map((step, index) => {
          const state = getStepState(step.stepNumber, order.status);
          return <div key={step.stepNumber} className={`relative flex flex-col p-4 rounded-xl border transition-all text-right ${state === "current" ? "bg-muted/40 border-primary shadow-sm ring-1 ring-primary/20" : state === "done" ? "bg-secondary/40 border-border" : "bg-card border-border/40 opacity-70"}`} data-api-unique-id='statustimeline-r362fe0837007b12d-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1'>
                  <div className="flex items-center justify-between mb-3" data-api-unique-id='statustimeline-r49f667f89a31ae23-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1'>
                    <span className="text-xs font-mono font-bold text-muted-foreground" data-api-unique-id='statustimeline-rb6ed3d2f395e86ba-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1' data-api-bind-info={`steps-${index}-stepNumber`} data-api-map-var-name='step'>
                      المرحلة 0{step.stepNumber}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${state === "done" ? "bg-success text-success-foreground shadow-sm" : state === "current" ? "bg-primary text-primary-foreground animate-pulse shadow-sm" : "bg-muted text-muted-foreground border border-border"}`} data-api-unique-id='statustimeline-r80b1d59b6d6d230e-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1'>
                      {state === "done" ? <Check className="w-4 h-4" data-api-unique-id='statustimeline-rff71f72ecffe71c2-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1' /> : step.stepNumber}
                    </div>
                  </div>

                  <h3 className={`text-base font-header font-bold mb-1 ${state === "current" ? "text-primary" : "text-foreground"}`} data-api-unique-id='statustimeline-rc48042d395dc9ac2-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1' data-api-bind-info={`steps-${index}-label`} data-api-map-var-name='step'>
                    {step.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed" data-api-unique-id='statustimeline-r93c5816aff87ecd1-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' data-api-in-loop='1' data-api-bind-info={`steps-${index}-desc`} data-api-map-var-name='step'>
                    {step.desc}
                  </p>
                </div>;
        })}
          </div>
        </div> : <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive text-foreground text-right" data-api-unique-id='statustimeline-r78383648f9e059c0-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
          <div className="flex items-center gap-2 mb-1" data-api-unique-id='statustimeline-r449562c39c0b7a39-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            <XCircle className="w-5 h-5 text-destructive" data-api-unique-id='statustimeline-rbc0896e9c5f80a9d-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' />
            <h3 className="font-header font-bold text-destructive" data-api-unique-id='statustimeline-r1803a14f3e49cd37-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>تم إلغاء هذه الطلبية</h3>
          </div>
          <p className="text-sm font-body text-muted-foreground" data-api-unique-id='statustimeline-rddd8b303284589d6-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            {order.notes || "تم إلغاء الطلبية من قبل النظام لعدم استيفاء شروط الحصة أو بطلب من المعني. لمزيد من المعلومات يرجى الاتصال بمصالح نفطال."}
          </p>
        </div>}

      {/* Operational Notes If Available */}
      {order.notes && order.status !== "CANCELLED" && <div className="mt-6 p-4 rounded-xl bg-muted/60 border border-border text-right" data-api-unique-id='statustimeline-r961d9444b017a8c7-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
          <div className="flex items-center gap-2 mb-1" data-api-unique-id='statustimeline-r7a2a007e6ae2770a-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            <FileText className="w-4 h-4 text-primary" data-api-unique-id='statustimeline-rb324fec259188838-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline' />
            <span className="text-xs font-header font-bold text-foreground" data-api-unique-id='statustimeline-r508c6fed7c8b90f3-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>ملاحظات مركز التوزيع والعمليات:</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-body" data-api-unique-id='statustimeline-r325517312cfe5061-s971746622' data-api-unique-page-name='src/frontend/components/OrderTracking/StatusTimeline'>
            {order.notes}
          </p>
        </div>}
    </section>;
}