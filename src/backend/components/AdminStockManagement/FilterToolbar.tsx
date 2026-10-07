"use client";

import React from "react";
import { Search, X, RotateCcw, AlertTriangle, AlertCircle, Layers } from "lucide-react";
import { StockFilterState, TireBrand, TireCategory } from "@/backend/types/AdminStockManagement";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FilterToolbarProps {
  filters: StockFilterState;
  onFilterChange: (newFilters: Partial<StockFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalAllCount: number;
}
export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalAllCount
}) => {
  const isFiltered = filters.searchQuery !== "" || filters.brand !== "ALL" || filters.category !== "ALL" || filters.availability !== "ALL" || filters.stockLevel !== "ALL";
  return <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='filtertoolbar-r96252e5a0adf1349-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
      {/* السطر الأول: البحث السريع + أزرار تبديل العلامة التجارية */}
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='filtertoolbar-r9c085c03356954f8-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
        {/* حقل البحث */}
        <div className="relative min-w-0 flex-1" data-api-unique-id='filtertoolbar-rdf21418a53845a59-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground" data-api-unique-id='filtertoolbar-rf253301e4e870a12-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <Search className="h-4 w-4" data-api-unique-id='filtertoolbar-r131cf1ee692b03cb-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
          </div>
          <input type="text" value={filters.searchQuery} onChange={e => onFilterChange({
          searchQuery: e.target.value
        })} placeholder="بحث بالمقاس (مثال: 205/55 R16) أو مؤشر السرعة والحمولة (91V)..." className="h-10 w-full rounded-lg border border-border bg-input py-2 pr-9 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" data-api-unique-id='filtertoolbar-r739ca3b1248f1b19-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
          {filters.searchQuery && <button type="button" onClick={() => onFilterChange({
          searchQuery: ""
        })} className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground transition-colors hover:text-foreground" title="مسح البحث" data-api-unique-id='filtertoolbar-rdbba500731fc4adc-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <X className="h-4 w-4" data-api-unique-id='filtertoolbar-r58cb1a2e72297016-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            </button>}
        </div>

        {/* أزرار اختيار العلامة التجارية السريعة */}
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted p-1 sm:shrink-0" data-api-unique-id='filtertoolbar-rf25428676de2cd91-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <button type="button" onClick={() => onFilterChange({
          brand: "ALL"
        })} className={`h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.brand === "ALL" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='filtertoolbar-ra9c80624cc73f716-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            كل العلامات
          </button>
          <button type="button" onClick={() => onFilterChange({
          brand: "CONTINENTAL"
        })} className={`flex items-center gap-1.5 h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.brand === "CONTINENTAL" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='filtertoolbar-r318a823c4c635375-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <span className="h-2 w-2 rounded-full bg-accent" data-api-unique-id='filtertoolbar-r86fecc4caaa8159c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            كونتيننتال (Continental)
          </button>
          <button type="button" onClick={() => onFilterChange({
          brand: "IRIS"
        })} className={`flex items-center gap-1.5 h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.brand === "IRIS" ? "bg-secondary text-secondary-foreground shadow-sm border border-border" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='filtertoolbar-re1ffc1f15a34ed76-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <span className="h-2 w-2 rounded-full bg-chart-2" data-api-unique-id='filtertoolbar-r2db637d3436d1e5c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            إيريس (Iris Tyres)
          </button>
        </div>
      </div>

      {/* أزرار التصفية السريعة لحالة المخزون (الكل / نافد / منخفض) */}
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3" data-api-unique-id='filtertoolbar-r576068037666ba59-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted p-1" data-api-unique-id='filtertoolbar-re204d4e0ed0de5ab-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <button type="button" onClick={() => onFilterChange({
          stockLevel: "ALL"
        })} className={`flex items-center gap-1.5 h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.stockLevel === "ALL" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='filtertoolbar-r44c03c7ace81b131-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <Layers className="h-3.5 w-3.5" data-api-unique-id='filtertoolbar-r5be6d8d6fc577316-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            <span data-api-unique-id='filtertoolbar-r2c404fb0ee38206c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>جميع المقاسات (ALL)</span>
          </button>

          <button type="button" onClick={() => onFilterChange({
          stockLevel: "OUT_OF_STOCK"
        })} className={`flex items-center gap-1.5 h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.stockLevel === "OUT_OF_STOCK" ? "bg-destructive text-destructive-foreground shadow-sm font-bold" : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"}`} data-api-unique-id='filtertoolbar-rc00241b2a278c6cc-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='filtertoolbar-r1ad4effdcb80aa1c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            <span data-api-unique-id='filtertoolbar-r848b9cd0072b67e9-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>غير متوفر / نافد (OUT_OF_STOCK)</span>
          </button>

          <button type="button" onClick={() => onFilterChange({
          stockLevel: "LOW_STOCK"
        })} className={`flex items-center gap-1.5 h-8 rounded-md px-3 text-xs font-semibold transition-all ${filters.stockLevel === "LOW_STOCK" ? "bg-warning text-warning-foreground shadow-sm font-bold" : "text-muted-foreground hover:bg-warning/10 hover:text-warning"}`} data-api-unique-id='filtertoolbar-ra769347e4bb47f7b-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <AlertTriangle className="h-3.5 w-3.5" data-api-unique-id='filtertoolbar-rbd1048537d509c7e-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            <span data-api-unique-id='filtertoolbar-r776259ee7cc79123-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>مخزون منخفض / تنبيه (LOW_STOCK)</span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground" data-api-unique-id='filtertoolbar-ra5274f5ba32ce87c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          المطابقة الحالية: <strong className="font-mono text-foreground font-bold" data-api-unique-id='filtertoolbar-r32389f43cbf68bac-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>{totalFilteredCount}</strong> من أصل{" "}
          <span className="font-mono" data-api-unique-id='filtertoolbar-r70483829cd6d789d-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>{totalAllCount}</span>
        </div>
      </div>

      {/* السطر الثاني: القوائم المنسدلة للتصفية المتخصصة */}
      <div className="flex min-w-0 flex-wrap items-center gap-2.5 pt-1" data-api-unique-id='filtertoolbar-r4b9b110e9f7c728c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
        {/* صنف المركبة */}
        <div className="w-full sm:w-auto sm:min-w-[160px]" data-api-unique-id='filtertoolbar-rd211860c6ef10d36-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <Select value={filters.category} onValueChange={val => onFilterChange({
          category: val as "ALL" | TireCategory
        })} data-api-unique-id='filtertoolbar-rbb23b76fc72ec257-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <SelectTrigger size="sm" className="h-9 w-full border-border bg-input text-foreground" data-api-unique-id='filtertoolbar-r27e5766b99358240-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectValue placeholder="صنف المركبة" data-api-unique-id='filtertoolbar-ra4355e37ef74eb14-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            </SelectTrigger>
            <SelectContent data-api-unique-id='filtertoolbar-rcd5185ea6e8e4c04-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectItem value="ALL" data-api-unique-id='filtertoolbar-r8a252ecf97d3709c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>جميع أصناف المركبات</SelectItem>
              <SelectItem value="TOURISM" data-api-unique-id='filtertoolbar-ra3328bac45120be9-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>سياحية (Tourism)</SelectItem>
              <SelectItem value="UTILITY" data-api-unique-id='filtertoolbar-rc58745216f73b2bb-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>نفعية وتجارية (Utility)</SelectItem>
              <SelectItem value="SUV" data-api-unique-id='filtertoolbar-r978cfaa0fb386b25-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>دفع رباعي (SUV / 4x4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* حالة التوفر في المحطات */}
        <div className="w-full sm:w-auto sm:min-w-[150px]" data-api-unique-id='filtertoolbar-r14a66042d0b87e55-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <Select value={filters.availability} onValueChange={val => onFilterChange({
          availability: val as "ALL" | "AVAILABLE" | "UNAVAILABLE"
        })} data-api-unique-id='filtertoolbar-r224fb59575b7ab6a-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <SelectTrigger size="sm" className="h-9 w-full border-border bg-input text-foreground" data-api-unique-id='filtertoolbar-r227e421ecd86ff79-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectValue placeholder="حالة الجاهزية" data-api-unique-id='filtertoolbar-r6eee46e5a2c126c1-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            </SelectTrigger>
            <SelectContent data-api-unique-id='filtertoolbar-r1fcc15d06dc7cc88-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectItem value="ALL" data-api-unique-id='filtertoolbar-r422def199fa42ece-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>كل حالات التوفر</SelectItem>
              <SelectItem value="AVAILABLE" data-api-unique-id='filtertoolbar-ra6e349cbefc98232-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>متاح للحجز بالمحطات</SelectItem>
              <SelectItem value="UNAVAILABLE" data-api-unique-id='filtertoolbar-r0d7713c6c6d7067a-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>معلّق / غير متاح</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* مستوى وفرة المخزون */}
        <div className="w-full sm:w-auto sm:min-w-[170px]" data-api-unique-id='filtertoolbar-rdb48bcfc2d335052-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <Select value={filters.stockLevel} onValueChange={val => onFilterChange({
          stockLevel: val as "ALL" | "LOW_STOCK" | "OUT_OF_STOCK" | "NORMAL"
        })} data-api-unique-id='filtertoolbar-r2422965c65bb364a-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <SelectTrigger size="sm" className="h-9 w-full border-border bg-input text-foreground" data-api-unique-id='filtertoolbar-rbf0a627e8781384f-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectValue placeholder="مستوى المخزون" data-api-unique-id='filtertoolbar-r59fc9bf5ed846b51-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            </SelectTrigger>
            <SelectContent data-api-unique-id='filtertoolbar-rc5eec9f27743b541-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectItem value="ALL" data-api-unique-id='filtertoolbar-rb78f3797de5ba85c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>كافة مستويات المخزون</SelectItem>
              <SelectItem value="LOW_STOCK" data-api-unique-id='filtertoolbar-rca75d23a2263f667-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>تحت حد التنبيه الأدنى</SelectItem>
              <SelectItem value="OUT_OF_STOCK" data-api-unique-id='filtertoolbar-rf19a776191218983-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>نافد تماماً (0 إطار)</SelectItem>
              <SelectItem value="NORMAL" data-api-unique-id='filtertoolbar-rc889042373af216d-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>مستويات كافية وآمنة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* الترتيب والفرز */}
        <div className="w-full sm:w-auto sm:min-w-[170px]" data-api-unique-id='filtertoolbar-ra0b17dde6ea901d4-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <Select value={`${filters.sortBy}-${filters.sortOrder}`} onValueChange={val => {
          const [sortBy, sortOrder] = val.split("-") as ["size" | "priceDzd" | "availableStock" | "updatedAt", "asc" | "desc"];
          onFilterChange({
            sortBy,
            sortOrder
          });
        }} data-api-unique-id='filtertoolbar-r1aed346a1e1456d9-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            <SelectTrigger size="sm" className="h-9 w-full border-border bg-input text-foreground" data-api-unique-id='filtertoolbar-rb5d82afadd34ede5-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectValue placeholder="الترتيب حسب" data-api-unique-id='filtertoolbar-r418f4ab8850edda4-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
            </SelectTrigger>
            <SelectContent data-api-unique-id='filtertoolbar-r858f37119a18400c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <SelectItem value="size-asc" data-api-unique-id='filtertoolbar-r99972c133369af6e-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>المقاس (تصاعدياً)</SelectItem>
              <SelectItem value="priceDzd-desc" data-api-unique-id='filtertoolbar-r73c96892660a41cd-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>السعر (الأعلى أولاً)</SelectItem>
              <SelectItem value="priceDzd-asc" data-api-unique-id='filtertoolbar-rdfdfa3e068db9008-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>السعر (الأقل أولاً)</SelectItem>
              <SelectItem value="availableStock-asc" data-api-unique-id='filtertoolbar-ra7e27950379ab2cc-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>المخزون (الأقل - تنبيه النفاذ)</SelectItem>
              <SelectItem value="availableStock-desc" data-api-unique-id='filtertoolbar-r6403fa601d683670-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>المخزون (الأكثر وفرة)</SelectItem>
              <SelectItem value="updatedAt-desc" data-api-unique-id='filtertoolbar-r64b8fb5f0723619c-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>آخر تحديث</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* زر إعادة الضبط وملخص النتائج */}
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:justify-end" data-api-unique-id='filtertoolbar-r4a24b931238aa650-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
          <div className="text-xs text-muted-foreground whitespace-nowrap" data-api-unique-id='filtertoolbar-rb822d21e1336f910-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
            عرض <strong className="font-mono text-foreground font-semibold" data-api-unique-id='filtertoolbar-r3315e5d88f1d450b-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>{totalFilteredCount}</strong> من أصل{" "}
            <strong className="font-mono text-foreground font-semibold" data-api-unique-id='filtertoolbar-raeea298ffffe7515-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>{totalAllCount}</strong> مقاس
          </div>

          {isFiltered && <button type="button" onClick={onResetFilters} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground" title="إعادة ضبط كافة الفلاتر" data-api-unique-id='filtertoolbar-rdda597547c449b35-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>
              <RotateCcw className="h-3.5 w-3.5" data-api-unique-id='filtertoolbar-r4dd9cdb9ad118ede-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar' />
              <span data-api-unique-id='filtertoolbar-rdf10d8d5e32a953b-s4292147540' data-api-unique-page-name='src/backend/components/AdminStockManagement/FilterToolbar'>إعادة ضبط</span>
            </button>}
        </div>
      </div>
    </div>;
};
export default FilterToolbar;