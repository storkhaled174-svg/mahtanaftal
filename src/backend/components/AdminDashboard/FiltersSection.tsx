"use client";

import React from "react";
import { Search, Phone, Hash, MapPin, X, Download, Filter } from "lucide-react";
import { FilterState, WilayaData } from "@/backend/types/AdminDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FiltersSectionProps {
  filters: FilterState;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  onExportCsv: () => void;
  filteredCount: number;
  totalCount: number;
  wilayas?: WilayaData[];
}
export default function FiltersSection({
  filters,
  onFilterChange,
  onResetFilters,
  onExportCsv,
  filteredCount,
  totalCount,
  wilayas = []
}: FiltersSectionProps) {
  const selectedWilayaData = wilayas.find(w => w.code === filters.wilaya || w.nameAr === filters.wilaya);
  const availableCommunes = selectedWilayaData ? selectedWilayaData.communes : [];
  const handleWilayaChange = (val: string) => {
    onFilterChange(prev => ({
      ...prev,
      wilaya: val,
      commune: "ALL"
    }));
  };
  const hasActiveFilters = filters.searchQuery !== "" || filters.phone !== "" || filters.orderNumber !== "" || filters.wilaya !== "ALL" || filters.commune !== "ALL" || filters.status !== "ALL" || filters.brand !== "ALL";
  return <section className="w-full min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-sm" data-controller-name="شريط البحث الفعال والفلترة التشغيلية المتقدمة" data-api-unique-id='filterssection-rc25fcfca4b8a4d51-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
      <div className="flex flex-col gap-4" data-api-unique-id='filterssection-r496e067bd5d38c70-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
        {/* Top summary row: Title + count + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-3" data-api-unique-id='filterssection-r150521b1fa2c1d4b-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
          <div className="flex items-center gap-2" data-api-unique-id='filterssection-r4e419fc4cda25597-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground border border-border" data-api-unique-id='filterssection-r345e2b1ebeddd348-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <Filter className="h-4 w-4 text-primary" data-api-unique-id='filterssection-r14387b1fa9bc6e64-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
            </div>
            <div data-api-unique-id='filterssection-ree6ded3d5373eeb6-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <h2 className="font-header text-base font-bold text-foreground" data-api-unique-id='filterssection-r9209505b52929a2e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                التصفية والبحث المتقدم للطلبيات
              </h2>
              <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='filterssection-r503dde4470fad50e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                نتائج التصفية: {filteredCount} من أصل {totalCount} طلبية
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='filterssection-r05b636d049680a53-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            {hasActiveFilters && <button type="button" onClick={onResetFilters} className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors" data-api-unique-id='filterssection-rafcde38665ab549c-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <X className="h-3.5 w-3.5" data-api-unique-id='filterssection-r8bfec7c92c3efdee-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
                <span data-api-unique-id='filterssection-r3db2433010f06c20-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>إلغاء التصفية</span>
              </button>}

            <button type="button" onClick={onExportCsv} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors" data-api-unique-id='filterssection-r27ce5e4de660f835-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <Download className="h-3.5 w-3.5 text-primary" data-api-unique-id='filterssection-rfa0e4228b4571122-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              <span data-api-unique-id='filterssection-rf47c2159c3feaaba-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>تصدير السجلات (CSV)</span>
            </button>
          </div>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3" data-api-unique-id='filterssection-r7006fe882c056953-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
          {/* Field 1: Quick Search (Name) */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-rce4f12a91f62fc0e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1" data-api-unique-id='filterssection-rff3b9a561b372538-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <Search className="h-3.5 w-3.5 text-primary" data-api-unique-id='filterssection-rf466849b2bdab3dd-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              <span data-api-unique-id='filterssection-rcd4d075da812c1e9-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>بحث بالاسم واللقب</span>
            </label>
            <input type="text" placeholder="مثال: سليمان بوزيد..." value={filters.searchQuery} onChange={e => onFilterChange(prev => ({
            ...prev,
            searchQuery: e.target.value
          }))} className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" data-api-unique-id='filterssection-re186082fefed93df-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
          </div>

          {/* Field 2: Phone Search */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-r650d8be5bf4940fd-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1" data-api-unique-id='filterssection-r291f3055c5ebdb6b-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <Phone className="h-3.5 w-3.5 text-primary" data-api-unique-id='filterssection-r5ed96d4c3b395be6-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              <span data-api-unique-id='filterssection-rf33eef4d161ff0bc-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>رقم الهاتف (الرئيسي/الثانوي)</span>
            </label>
            <input type="text" placeholder="05 / 06 / 07..." value={filters.phone} onChange={e => onFilterChange(prev => ({
            ...prev,
            phone: e.target.value
          }))} className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" data-api-unique-id='filterssection-r62c6bdd2b6e38e56-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
          </div>

          {/* Field 3: Order Number NM-2026-XXXX */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-r8af773a1a81f8a0f-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1" data-api-unique-id='filterssection-r67f7898a00313168-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <Hash className="h-3.5 w-3.5 text-primary" data-api-unique-id='filterssection-r10a6a9d60b2a0360-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              <span data-api-unique-id='filterssection-r6c684c2353d8f2e2-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>رقم الطلبية (NM-2026)</span>
            </label>
            <input type="text" placeholder="NM-2026-..." value={filters.orderNumber} onChange={e => onFilterChange(prev => ({
            ...prev,
            orderNumber: e.target.value
          }))} className="w-full rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" data-api-unique-id='filterssection-r52ad369bfdc3531a-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
          </div>

          {/* Field 4: Wilaya Selector */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-r4d6cf1904d3fd020-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1" data-api-unique-id='filterssection-r7e93d439b7e5bae4-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <MapPin className="h-3.5 w-3.5 text-primary" data-api-unique-id='filterssection-r6e0303eaa1313757-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              <span data-api-unique-id='filterssection-rd70cb9ac8f2b144f-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>الولاية (58 ولاية)</span>
            </label>
            <Select value={filters.wilaya} onValueChange={handleWilayaChange} data-api-unique-id='filterssection-r25119d813486c0c8-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <SelectTrigger className="w-full min-w-[130px] h-9 text-xs bg-secondary/60 border-border" data-api-unique-id='filterssection-ra6cf3d20cefcf29d-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectValue placeholder="كافة الولايات" data-api-unique-id='filterssection-rda90bbe6a4978496-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-popover text-popover-foreground border-border" data-api-unique-id='filterssection-rd223e3f3d6e3ccce-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectItem value="ALL" data-api-unique-id='filterssection-rde93d08e1be688d3-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>كافة الولايات (الكل)</SelectItem>
                {wilayas.map((wilaya, index) => <SelectItem key={wilaya.id || wilaya.code} value={wilaya.nameAr} data-api-unique-id='filterssection-r6fcfafd4ce30fc4b-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' data-api-in-loop='1' data-api-bind-info={`wilayas-${index}-code`} data-api-map-var-name='wilaya'>
                    {wilaya.code} - {wilaya.nameAr}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Field 5: Commune Selector */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-r4e891a803684955e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='filterssection-r575e69ef74b3e012-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              البلدية
            </label>
            <Select value={filters.commune} onValueChange={val => onFilterChange(prev => ({
            ...prev,
            commune: val
          }))} disabled={filters.wilaya === "ALL"} data-api-unique-id='filterssection-rddc984fb63d0e5a7-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <SelectTrigger className="w-full min-w-[130px] h-9 text-xs bg-secondary/60 border-border disabled:opacity-50" data-api-unique-id='filterssection-r87c942e29d650c4f-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectValue placeholder="كافة البلديات" data-api-unique-id='filterssection-ra5e52fbaaf4034ba-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-popover text-popover-foreground border-border" data-api-unique-id='filterssection-r142d46695d0c4f98-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectItem value="ALL" data-api-unique-id='filterssection-rafd2b59d50b1efa8-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>كافة البلديات</SelectItem>
                {availableCommunes.map((commune, index) => <SelectItem key={commune} value={commune} data-api-unique-id='filterssection-r39f05a2524f000a5-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' data-api-in-loop='1' data-api-bind-info={`availableCommunes-${index}-$item`} data-api-map-var-name='commune'>
                    {commune}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Field 6: Brand Selector */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-ra506bab3ad29f7f4-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='filterssection-r36dc95770e384a43-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              العلامة المعتمدة
            </label>
            <Select value={filters.brand} onValueChange={val => onFilterChange(prev => ({
            ...prev,
            brand: val
          }))} data-api-unique-id='filterssection-r117cd491aca31d00-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <SelectTrigger className="w-full min-w-[130px] h-9 text-xs bg-secondary/60 border-border" data-api-unique-id='filterssection-r72cdaf0710efc074-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectValue placeholder="كافة العلامات" data-api-unique-id='filterssection-r25d14513fce14d90-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground border-border" data-api-unique-id='filterssection-reca8d35eb549eb35-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectItem value="ALL" data-api-unique-id='filterssection-r344228fea57eb36e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>كافة العلامات (الكل)</SelectItem>
                <SelectItem value="CONTINENTAL" data-api-unique-id='filterssection-r9026f3c945e5a263-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>Continental</SelectItem>
                <SelectItem value="IRIS" data-api-unique-id='filterssection-rd55bee766c479b36-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>Iris</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field 7: Status Selector */}
          <div className="space-y-1.5" data-api-unique-id='filterssection-rd3756eaff1918f1c-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
            <label className="text-xs font-medium text-muted-foreground" data-api-unique-id='filterssection-r9c7282e096c063b2-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              الحالة التشغيلية
            </label>
            <Select value={filters.status} onValueChange={val => onFilterChange(prev => ({
            ...prev,
            status: val
          }))} data-api-unique-id='filterssection-rb8f47a8c64eab971-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
              <SelectTrigger className="w-full min-w-[130px] h-9 text-xs bg-secondary/60 border-border" data-api-unique-id='filterssection-r20f002256bf8849e-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectValue placeholder="كافة الحالات" data-api-unique-id='filterssection-rf8c03dcf5c80a9e8-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection' />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground border-border" data-api-unique-id='filterssection-reed73115663a542a-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>
                <SelectItem value="ALL" data-api-unique-id='filterssection-r16f7f2118cb66b00-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>كافة الحالات (الكل)</SelectItem>
                <SelectItem value="NEW" data-api-unique-id='filterssection-r35edb4be2b1d8a2c-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>🟡 جديدة</SelectItem>
                <SelectItem value="PROCESSING" data-api-unique-id='filterssection-r56a81d5586300569-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>🔵 قيد المعالجة</SelectItem>
                <SelectItem value="COMPLETED" data-api-unique-id='filterssection-r388936538c273070-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>🟢 مكتملة</SelectItem>
                <SelectItem value="CANCELLED" data-api-unique-id='filterssection-r34db042a5550bff6-s1573064653' data-api-unique-page-name='src/backend/components/AdminDashboard/FiltersSection'>🔴 ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>;
}