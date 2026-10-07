"use client";

import React from "react";
import { Search, X, Layers, Package, CreditCard, Truck, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { FaqCategory, FaqFilterState } from "@/backend/types/AdminContentSupport";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FaqFiltersToolbarProps {
  filters: FaqFilterState;
  onFilterChange: (filters: FaqFilterState) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}
const CATEGORY_TABS: {
  id: FaqCategory | "ALL";
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}[] = [{
  id: "ALL",
  label: "جميع الأسئلة",
  icon: Layers
}, {
  id: "ORDERS",
  label: "طلبيات الإطارات",
  icon: Package
}, {
  id: "PAYMENT",
  label: "الدفع بالذهبية",
  icon: CreditCard
}, {
  id: "DELIVERY",
  label: "استلام المحطات",
  icon: Truck
}, {
  id: "WARRANTY",
  label: "الضمان والخدمات",
  icon: ShieldCheck
}];
export const FaqFiltersToolbar: React.FC<FaqFiltersToolbarProps> = ({
  filters,
  onFilterChange,
  onReset,
  filteredCount,
  totalCount
}) => {
  const isFiltered = filters.search !== "" || filters.category !== "ALL" || filters.status !== "ALL";
  return <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='faqfilterstoolbar-r3561a3211ea14d70-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
      {/* Category Quick Selector Tabs */}
      <div className="flex min-w-0 max-w-full items-center gap-1.5 overflow-x-auto pb-1 text-xs" data-api-unique-id='faqfilterstoolbar-rc6146c8c2754be8e-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
        {CATEGORY_TABS.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = filters.category === tab.id;
        return <button key={tab.id} type="button" onClick={() => onFilterChange({
          ...filters,
          category: tab.id
        })} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 font-header text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='faqfilterstoolbar-rd37ad9c253c63086-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' data-api-in-loop='1'>
              <Icon className="h-3.5 w-3.5" data-api-bind-info={`CATEGORY_TABS-${index}-icon`} data-api-map-var-name='tab' data-api-unique-id='faqfilterstoolbar-ra3314f93b0473410-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' data-api-in-loop='1' />
              <span data-api-unique-id='faqfilterstoolbar-r448bdda638f44c08-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' data-api-in-loop='1' data-api-bind-info={`CATEGORY_TABS-${index}-label`} data-api-map-var-name='tab'>{tab.label}</span>
            </button>;
      })}
      </div>

      {/* Search Input & Secondary Filters Grid */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-12" data-api-unique-id='faqfilterstoolbar-r37d4bb876a194c54-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
        {/* Search Keyword */}
        <div className="relative min-w-0 sm:col-span-7 lg:col-span-8" data-api-unique-id='faqfilterstoolbar-re5b47b865fc7cffd-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground" data-api-unique-id='faqfilterstoolbar-rd30e4b60ee5494e1-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
            <Search className="h-4 w-4" data-api-unique-id='faqfilterstoolbar-rf1a8ddafc7c3f0fa-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
          </div>
          <input type="text" value={filters.search} onChange={e => onFilterChange({
          ...filters,
          search: e.target.value
        })} placeholder="بحث بنص السؤال، كلمات الإجابة أو الرمز الإداري..." className="h-9 w-full min-w-0 rounded-lg border border-border bg-input py-1.5 pl-3 pr-9 font-body text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" data-api-unique-id='faqfilterstoolbar-red8c04e8f1f5cff3-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
          {filters.search && <button type="button" onClick={() => onFilterChange({
          ...filters,
          search: ""
        })} className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground hover:text-foreground" data-api-unique-id='faqfilterstoolbar-r5c8e5adaca3e0316-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
              <X className="h-3.5 w-3.5" data-api-unique-id='faqfilterstoolbar-r91cc94143c4a0bd5-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
            </button>}
        </div>

        {/* Status Dropdown Filter */}
        <div className="min-w-0 sm:col-span-3 lg:col-span-3" data-api-unique-id='faqfilterstoolbar-r4825c18bc767eb5e-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
          <Select value={filters.status} onValueChange={val => onFilterChange({
          ...filters,
          status: val as FaqFilterState["status"]
        })} data-api-unique-id='faqfilterstoolbar-r527f0d34e1f07c3f-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
            <SelectTrigger size="sm" className="h-9 w-full min-w-[130px] border-border bg-input font-body text-xs text-foreground" data-api-unique-id='faqfilterstoolbar-r40e3a7c98f75b6fb-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
              <SelectValue placeholder="حالة الظهور" data-api-unique-id='faqfilterstoolbar-rd2df8c3c5fd088e6-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover text-popover-foreground" data-api-unique-id='faqfilterstoolbar-raa67512b8d356f63-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
              <SelectItem value="ALL" data-api-unique-id='faqfilterstoolbar-r8d7445cc09470730-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>جميع الحالات</SelectItem>
              <SelectItem value="ACTIVE" data-api-unique-id='faqfilterstoolbar-rf6094ab59c6ed4f3-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
                <span className="flex items-center gap-1.5 text-xs text-success" data-api-unique-id='faqfilterstoolbar-r6db771f0f56ca592-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
                  <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='faqfilterstoolbar-r0d015af8efe278f8-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
                  مفعل في البوابة العامة
                </span>
              </SelectItem>
              <SelectItem value="INACTIVE" data-api-unique-id='faqfilterstoolbar-r7ed2bb0bc50ca2af-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='faqfilterstoolbar-rd195d6aeb325b8f1-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
                  <XCircle className="h-3.5 w-3.5" data-api-unique-id='faqfilterstoolbar-rae00d96c2539c5f0-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
                  معطل / محجوب
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset / Clear Button */}
        <div className="flex min-w-0 items-center justify-end sm:col-span-2 lg:col-span-1" data-api-unique-id='faqfilterstoolbar-r029c4f52af2da5ee-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
          {isFiltered ? <button type="button" onClick={onReset} title="إعادة تعيين الفلاتر" className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 font-header text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='faqfilterstoolbar-r8c4bda5f10647f9a-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
              <X className="h-3.5 w-3.5" data-api-unique-id='faqfilterstoolbar-rbddfbbd39d998cbf-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar' />
              <span className="sm:hidden lg:inline" data-api-unique-id='faqfilterstoolbar-rc0b19e6fe051c2ff-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>مسح</span>
            </button> : <div className="flex h-9 w-full items-center justify-center rounded-lg border border-border/40 bg-muted/40 px-2 font-body text-[11px] text-muted-foreground" data-api-unique-id='faqfilterstoolbar-re51b8924fa61b369-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>
              <span data-api-unique-id='faqfilterstoolbar-r9d636024a326deb1-s3763094977' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqFiltersToolbar'>{filteredCount} عنصر</span>
            </div>}
        </div>
      </div>
    </div>;
};
export default FaqFiltersToolbar;