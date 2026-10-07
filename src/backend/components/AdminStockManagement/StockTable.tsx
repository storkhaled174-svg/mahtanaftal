"use client";

import React from "react";
import { TireStockDto, TireBrand, TireCategory } from "@/backend/types/AdminStockManagement";
import { Edit3, Power, AlertTriangle, Lock, ArrowUpDown, Car, Truck, Shield, Snowflake } from "lucide-react";
export type TireStockItem = TireStockDto;
export type Brand = TireBrand;
export interface StockTableProps {
  items: TireStockDto[];
  onEditItem: (item: TireStockDto) => void;
  onToggleAvailability: (item: TireStockDto) => void;
  onSortChange: (column: "size" | "priceDzd" | "availableStock" | "updatedAt") => void;
  currentSortBy: "size" | "priceDzd" | "availableStock" | "updatedAt";
  currentSortOrder: "asc" | "desc";
}
const CATEGORY_LABELS: Record<TireCategory, {
  label: string;
  icon: React.ReactNode;
}> = {
  TOURISM: {
    label: "سياحية",
    icon: <Car className="h-3.5 w-3.5" data-api-unique-id='stocktable-r5651c0ea9df81fc5-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
  },
  UTILITY: {
    label: "نفعية",
    icon: <Truck className="h-3.5 w-3.5" data-api-unique-id='stocktable-r11ec9c28ae757583-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
  },
  SUV: {
    label: "دفع رباعي",
    icon: <Shield className="h-3.5 w-3.5" data-api-unique-id='stocktable-rab0924670fcff08e-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
  }
};
const BRAND_BADGES: Record<TireBrand, {
  label: string;
  bgClass: string;
  textClass: string;
  dotClass: string;
}> = {
  CONTINENTAL: {
    label: "Continental",
    bgClass: "bg-accent text-accent-foreground font-bold",
    textClass: "text-accent-foreground",
    dotClass: "bg-primary"
  },
  IRIS: {
    label: "Iris Tyres",
    bgClass: "bg-secondary text-secondary-foreground border border-border font-bold",
    textClass: "text-secondary-foreground",
    dotClass: "bg-chart-2"
  }
};
export const StockTable: React.FC<StockTableProps> = ({
  items,
  onEditItem,
  onToggleAvailability,
  onSortChange,
  currentSortBy,
  currentSortOrder
}) => {
  if (items.length === 0) {
    return <div className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 p-12 text-center text-card-foreground" data-api-unique-id='stocktable-r10962cb5ac2a263c-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground" data-api-unique-id='stocktable-r7bdb2c7456534d4b-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
          <Snowflake className="h-6 w-6" data-api-unique-id='stocktable-r6d293127f5e3e417-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
        </div>
        <h3 className="mt-4 font-header text-base font-bold text-foreground" data-api-unique-id='stocktable-r39aafd370bcdd935-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
          لا توجد مقاسات مطابقة لمعايير البحث والتصفية
        </h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground" data-api-unique-id='stocktable-r63a95478f48fff4a-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
          يرجى تعديل خيارات التصفية أو مسح كلمة البحث، أو إضافة مقاس إطار جديد لقاعدة البيانات.
        </p>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-xl border border-border bg-card text-card-foreground shadow-sm" data-api-unique-id='stocktable-r482289893212fbeb-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
      <table className="w-full min-w-[960px] text-right text-xs" data-api-unique-id='stocktable-r52121128a77ba6de-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
        {/* ترويسة الجدول */}
        <thead data-api-unique-id='stocktable-r386b82ba66002aee-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
          <tr className="border-b border-border bg-muted/80 text-muted-foreground" data-api-unique-id='stocktable-r38acbcd04ab0d948-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
            <th className="py-3.5 pr-4 pl-3 font-header font-semibold whitespace-nowrap min-w-[140px]" data-api-unique-id='stocktable-rb0accdf5d4442989-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              العلامة التجارية
            </th>
            <th onClick={() => onSortChange("size")} className="py-3.5 px-3 font-header font-semibold cursor-pointer select-none transition-colors hover:text-foreground whitespace-nowrap min-w-[160px]" data-api-unique-id='stocktable-rfaecd494130d21f3-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              <div className="flex items-center gap-1.5" data-api-unique-id='stocktable-r2786a72a91345902-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
                <span data-api-unique-id='stocktable-r8a3b1d4d04fb0b43-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>المقاس الفني (Size)</span>
                <ArrowUpDown className={`h-3 w-3 ${currentSortBy === "size" ? "text-primary" : "text-muted-foreground"}`} data-api-unique-id='stocktable-reed9b9e2c461d94f-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
              </div>
            </th>
            <th className="py-3.5 px-3 font-header font-semibold whitespace-nowrap min-w-[110px]" data-api-unique-id='stocktable-r93a1e1dbdaeadc2b-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              صنف المركبة
            </th>
            <th className="py-3.5 px-3 font-header font-semibold whitespace-nowrap min-w-[120px]" data-api-unique-id='stocktable-r164e570d9a7a16d5-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              مؤشر الحمولة والسرعة
            </th>
            <th onClick={() => onSortChange("priceDzd")} className="py-3.5 px-3 font-header font-semibold cursor-pointer select-none transition-colors hover:text-foreground whitespace-nowrap min-w-[140px]" data-api-unique-id='stocktable-r80fe08bb7427fbdb-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              <div className="flex items-center justify-end gap-1.5" data-api-unique-id='stocktable-rc7727a6e8f444331-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
                <span data-api-unique-id='stocktable-ra281dc77bcdf5f14-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>السعر الرسمي المعتمد</span>
                <ArrowUpDown className={`h-3 w-3 ${currentSortBy === "priceDzd" ? "text-primary" : "text-muted-foreground"}`} data-api-unique-id='stocktable-rec74b77c9d47ac20-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
              </div>
            </th>
            <th onClick={() => onSortChange("availableStock")} className="py-3.5 px-3 font-header font-semibold cursor-pointer select-none transition-colors hover:text-foreground whitespace-nowrap min-w-[130px]" data-api-unique-id='stocktable-rdbc9099d5d1ca658-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              <div className="flex items-center justify-center gap-1.5" data-api-unique-id='stocktable-r836e7a514538a039-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
                <span data-api-unique-id='stocktable-r361f4f998edbb3a1-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>المخزون المتوفر</span>
                <ArrowUpDown className={`h-3 w-3 ${currentSortBy === "availableStock" ? "text-primary" : "text-muted-foreground"}`} data-api-unique-id='stocktable-r9492454a1ccb5a51-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' />
              </div>
            </th>
            <th className="py-3.5 px-3 font-header font-semibold text-center whitespace-nowrap min-w-[120px]" data-api-unique-id='stocktable-r1450fbb5da49c432-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              المحجوز المؤكد
            </th>
            <th className="py-3.5 px-3 font-header font-semibold text-center whitespace-nowrap min-w-[110px]" data-api-unique-id='stocktable-rb9ec5b64eb9f3a94-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              حد التنبيه الأدنى
            </th>
            <th className="py-3.5 px-3 font-header font-semibold text-center whitespace-nowrap min-w-[140px]" data-api-unique-id='stocktable-r7a18702e28759923-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              حالة الجاهزية بالمحطة
            </th>
            <th className="py-3.5 pl-4 pr-3 font-header font-semibold text-center whitespace-nowrap min-w-[110px]" data-api-unique-id='stocktable-r9671ef55501fe618-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
              إجراءات الإدارة
            </th>
          </tr>
        </thead>

        {/* جسم الجدول */}
        <tbody className="divide-y divide-border/60" data-api-unique-id='stocktable-red462f72a09cf644-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable'>
          {items.map((item, index) => {
          const isOutOfStock = item.availableStock === 0;
          const isLowStock = !isOutOfStock && item.availableStock <= item.minThreshold;
          const brandBadge = BRAND_BADGES[item.brand] || {
            label: item.brand,
            bgClass: "bg-secondary text-secondary-foreground border border-border font-bold",
            textClass: "text-secondary-foreground",
            dotClass: "bg-muted-foreground"
          };
          const categoryInfo = CATEGORY_LABELS[item.category] || {
            label: item.category || "عام",
            icon: <Car className="h-3.5 w-3.5" data-api-unique-id='stocktable-r6ddea39e46e23948-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
          };
          return <tr key={item.id} className={`transition-colors hover:bg-muted/40 ${isOutOfStock ? "bg-destructive/5" : isLowStock ? "bg-warning/5" : ""}`} data-api-unique-id='stocktable-r3e8af859e705ae7d-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                {/* العلامة التجارية */}
                <td className="py-3.5 pr-4 pl-3 whitespace-nowrap" data-api-unique-id='stocktable-rf713216039d261d7-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs ${brandBadge.bgClass}`} data-api-unique-id='stocktable-r7320bb615591cba6-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    <span className={`h-1.5 w-1.5 rounded-full ${brandBadge.dotClass}`} data-api-unique-id='stocktable-r66ca266764d7c9a6-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                    {brandBadge.label}
                  </span>
                </td>

                {/* المقاس الفني */}
                <td className="py-3.5 px-3 whitespace-nowrap" data-api-unique-id='stocktable-r972524f67d6952e1-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="flex flex-col" data-api-unique-id='stocktable-r5e720fa8e491bf83-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    <span className="font-mono text-sm font-bold tracking-tight text-foreground" data-api-unique-id='stocktable-rcd34710105b4c112-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-size`} data-api-map-var-name='item'>
                      {item.size}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground" data-api-unique-id='stocktable-r96814e0224a75df1-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                      كود: {item.id ? item.id.slice(0, 16) : ""}...
                    </span>
                  </div>
                </td>

                {/* صنف المركبة */}
                <td className="py-3.5 px-3 whitespace-nowrap" data-api-unique-id='stocktable-r78568784d4bd02f7-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground" data-api-unique-id='stocktable-r5422c33236b15ed6-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    {categoryInfo.icon}
                    <span data-api-unique-id='stocktable-r3ea298266d89d855-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>{categoryInfo.label}</span>
                  </span>
                </td>

                {/* مؤشر الحمولة والسرعة */}
                <td className="py-3.5 px-3 whitespace-nowrap" data-api-unique-id='stocktable-r4f6021e5a93b80c5-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <span className="inline-flex items-center rounded border border-border bg-input px-2 py-0.5 font-mono text-xs font-semibold text-foreground" data-api-unique-id='stocktable-rbb35d5bbe80e01a6-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    {item.speedIndex || "غير محدد"}
                  </span>
                </td>

                {/* السعر الرسمي المعتمد */}
                <td className="py-3.5 px-3 text-left whitespace-nowrap" data-api-unique-id='stocktable-re083af90b0db326c-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="flex flex-col items-end" data-api-unique-id='stocktable-rb39ba014e5458507-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    <span className="font-mono text-sm font-bold text-foreground" data-api-unique-id='stocktable-r29de6afc649fcec1-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                      {Number(item.priceDzd || 0).toLocaleString("fr-DZ")}
                    </span>
                    <span className="text-[10px] font-semibold text-primary" data-api-unique-id='stocktable-r4a555950a88c052b-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>د.ج معتمد</span>
                  </div>
                </td>

                {/* المخزون المتوفر */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap" data-api-unique-id='stocktable-reded62d75c81c2ab-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="inline-flex flex-col items-center" data-api-unique-id='stocktable-r167381972ff8013f-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    <div className="flex items-center gap-1" data-api-unique-id='stocktable-rb6fd6fdb8ac845bd-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                      <span className={`font-mono text-sm font-bold ${isOutOfStock ? "text-destructive" : isLowStock ? "text-warning" : "text-foreground"}`} data-api-unique-id='stocktable-r93604452258a6e01-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                        {Number(item.availableStock || 0).toLocaleString("fr-DZ")}
                      </span>
                      {isOutOfStock ? <span className="inline-flex items-center rounded bg-destructive/10 px-1 py-0.5 text-[10px] font-bold text-destructive" data-api-unique-id='stocktable-r4afcaa91ff28104e-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                          نافد
                        </span> : isLowStock ? <AlertTriangle className="h-3.5 w-3.5 text-warning" data-api-unique-id='stocktable-r5f1f93446599e103-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' /> : null}
                    </div>
                    <span className="text-[10px] text-muted-foreground" data-api-unique-id='stocktable-r59294822c4d5d082-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>إطار متاح</span>
                  </div>
                </td>

                {/* المحجوز للطلبيات */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap" data-api-unique-id='stocktable-rb5d0eaa74e8b87dd-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="inline-flex items-center gap-1 rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-xs text-muted-foreground" data-api-unique-id='stocktable-r0f74648e636a040a-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    <Lock className="h-3 w-3 text-info" data-api-unique-id='stocktable-r1ccf22bfd877f01d-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                    <span data-api-unique-id='stocktable-r298b9054886043ba-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>{Number(item.reservedStock || 0).toLocaleString("fr-DZ")}</span>
                  </div>
                </td>

                {/* حد التنبيه */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap" data-api-unique-id='stocktable-rb571fc6c5091e3dc-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <span className="font-mono text-xs text-muted-foreground" data-api-unique-id='stocktable-r567ef05814a9c865-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-minThreshold`} data-api-map-var-name='item'>
                    {item.minThreshold} إطارات
                  </span>
                </td>

                {/* حالة التوفر والجاهزية */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap" data-api-unique-id='stocktable-r52edd25e0eccdcb2-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="flex flex-col items-center gap-1" data-api-unique-id='stocktable-rcd6a315d229e9bb5-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    {item.isAvailable ? <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success px-2.5 py-0.5 text-xs font-bold text-success-foreground" data-api-unique-id='stocktable-r34425ccb9ea8221a-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                        <span className="h-1.5 w-1.5 rounded-full bg-white" data-api-unique-id='stocktable-r87463eb2f24fed29-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                        متاح للطلب
                      </span> : isOutOfStock ? <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground" title="معطل تلقائياً بسبب نفاد المخزون (Auto-Freeze)" data-api-unique-id='stocktable-r0c910f377072e1e0-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                        <AlertTriangle className="h-3 w-3 text-destructive-foreground" data-api-unique-id='stocktable-r6ddac2e170028a44-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                        مجمد (نفاد الكمية)
                      </span> : <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border" data-api-unique-id='stocktable-r0f9b1419aa180193-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                        معلّق مؤقتاً
                      </span>}

                    {isOutOfStock && <span className="text-[10px] text-destructive" data-api-unique-id='stocktable-r502bcd8714b9d4de-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                        إغلاق آلي للطلبات
                      </span>}
                  </div>
                </td>

                {/* إجراءات الإدارة */}
                <td className="py-3.5 pl-4 pr-3 text-center whitespace-nowrap" data-api-unique-id='stocktable-r5508b24879d9cbfc-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                  <div className="flex items-center justify-center gap-1.5" data-api-unique-id='stocktable-r8dc9737b7b717951-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                    {/* زر تعديل السعر والمخزون */}
                    <button type="button" onClick={() => onEditItem(item)} className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-muted px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="تعديل السعر والمخزون وحد التنبيه" data-api-unique-id='stocktable-r4b130832d1adb28c-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                      <Edit3 className="h-3.5 w-3.5" data-api-unique-id='stocktable-r6e3e765e6746f8f2-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                      <span data-api-unique-id='stocktable-rebb884591a1e1559-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>تعديل</span>
                    </button>

                    {/* زر التبديل اليدوي لحالة التوفر */}
                    <button type="button" onClick={() => onToggleAvailability(item)} disabled={isOutOfStock && !item.isAvailable} className={`inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.isAvailable ? "border-success/40 bg-success/10 text-success hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive" : isOutOfStock ? "border-border bg-muted text-muted-foreground/40 cursor-not-allowed" : "border-border bg-muted text-muted-foreground hover:bg-success/10 hover:border-success/40 hover:text-success"}`} title={isOutOfStock ? "لا يمكن تفعيل التوفر بينما المخزون 0 (قاعدة نفطال الصارمة)" : item.isAvailable ? "تعليق التوفر في المحطات مؤقتاً" : "استئناف إتاحة المقاس بالمحطات"} data-api-unique-id='stocktable-r2753ddfcf8cee834-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1'>
                      <Power className="h-3.5 w-3.5" data-api-unique-id='stocktable-r0322ca594f97e3f6-s3188569574' data-api-unique-page-name='src/backend/components/AdminStockManagement/StockTable' data-api-in-loop='1' />
                    </button>
                  </div>
                </td>
              </tr>;
        })}
        </tbody>
      </table>
    </div>;
};
export default StockTable;