"use client";

import React, { useState } from "react";
import { BrandType, TireSizeOption } from "@/frontend/types/HomePage";
import { CheckCircle2, XCircle, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
interface TireCatalogProps {
  selectedBrand: BrandType;
  onBrandChange: (brand: BrandType) => void;
  selectedSizeId: string;
  onSizeChange: (sizeId: string) => void;
  sizeOptions: TireSizeOption[];
  onProceedToOrder: () => void;
}
export default function TireCatalog({
  selectedBrand,
  onBrandChange,
  selectedSizeId,
  onSizeChange,
  sizeOptions,
  onProceedToOrder
}: TireCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Filter sizes for the selected brand and category
  const filteredSizes = sizeOptions.filter(s => {
    const brandMatch = s.brand === selectedBrand;
    const catMatch = selectedCategory === "ALL" || s.category === selectedCategory;
    return brandMatch && catMatch;
  });
  const currentSelectedSize = sizeOptions.find(s => s.id === selectedSizeId);
  /* Extracted array: _labels */
  const _labels = [{
    key: "ALL",
    label: "كافة الأصناف"
  }, {
    key: "tourisme",
    label: "سياحية (TOURISM)"
  }, {
    key: "suv",
    label: "رباعية الدفع (SUV)"
  }, {
    key: "utilitaire",
    label: "نفعية (UTILITY)"
  }];
  return <section id="catalog-section" data-controller-name="كتالوج الإطارات المعتمد" className="w-full border-b border-border bg-background py-16 sm:py-20" data-api-unique-id='tirecatalog-r4e84e30463a42097-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='tirecatalog-r6f1f24d34e6f3ef5-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center" data-api-unique-id='tirecatalog-r0246fbcc80929bc7-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary px-3.5 py-1 text-xs font-semibold text-primary" data-api-unique-id='tirecatalog-rc9c1ad8eef618217-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
            <SlidersHorizontal className="h-3.5 w-3.5" data-api-unique-id='tirecatalog-r2f2699ded59c7500-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
            <span data-api-unique-id='tirecatalog-rb02e69459b40c255-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>كتالوج الإطارات الوطني المعتمد</span>
          </div>
          <h2 className="font-header text-2xl font-bold text-foreground sm:text-3xl" data-api-unique-id='tirecatalog-rd09eabb141f41476-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
            اختيارك يبدأ من هنا
          </h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground sm:text-base" data-api-unique-id='tirecatalog-r71f30bfd77251b1d-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
            استعرض المقاسات والمواصفات الفنية المعتمدة للإطارات المطاطية المتوفرة عبر محطات نفطال، وحدد المواصفات المتوافقة مع مركبتك مباشرة دون أي صور إطارات تجارية وفق الاشتراطات الرسمية.
          </p>
        </div>

        {/* Dual Brand Selection Cards (Continental vs Iris) */}
        <div className="mx-auto max-w-4xl" data-api-unique-id='tirecatalog-rb31ba72645b53202-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" data-api-unique-id='tirecatalog-r72a4cdacd2c3cc80-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
            {/* Continental Card */}
            <button type="button" onClick={() => {
            onBrandChange("continental");
            const first = sizeOptions.find(s => s.brand === "continental");
            if (first) onSizeChange(first.id);
          }} className={`relative flex flex-col items-start rounded-xl border p-6 text-right transition-all duration-200 ${selectedBrand === "continental" ? "border-primary bg-card text-card-foreground shadow-md ring-1 ring-primary" : "border-border bg-card/60 text-card-foreground hover:border-border/80 hover:bg-card"}`} data-api-unique-id='tirecatalog-rb8e07a5f967c96b6-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
              <div className="flex w-full items-center justify-between" data-api-unique-id='tirecatalog-r086a9208aa623a26-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <div className="font-display text-2xl font-black tracking-wide text-foreground" data-api-unique-id='tirecatalog-r8ddf132abc1786ad-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  CONTINENTAL
                </div>
                {selectedBrand === "continental" && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" data-api-unique-id='tirecatalog-r5fe50e236afd5a35-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    <CheckCircle2 className="h-4 w-4" data-api-unique-id='tirecatalog-r5c43b8b2f41e63d2-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                  </span>}
              </div>

              <p className="mt-3 font-body text-xs text-muted-foreground" data-api-unique-id='tirecatalog-r8a18d811fa32e328-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                الجودة الهندسية الألمانية المتميزة، أداء استثنائي وتحكم فائق وثبات معزز على كافة المسارات الجافة والمبللة.
              </p>

              <div className="mt-4 flex items-center gap-2" data-api-unique-id='tirecatalog-r4fd6df7e51912895-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <span className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs font-semibold text-secondary-foreground" data-api-unique-id='tirecatalog-rc667b290be8248de-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  سياحية • رباعية الدفع
                </span>
                <span className="rounded-md bg-info/10 px-2.5 py-1 font-body text-xs font-medium text-info" data-api-unique-id='tirecatalog-r808a5067dd6a4252-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  شريك رسمي
                </span>
              </div>
            </button>

            {/* Iris Card */}
            <button type="button" onClick={() => {
            onBrandChange("iris");
            const first = sizeOptions.find(s => s.brand === "iris");
            if (first) onSizeChange(first.id);
          }} className={`relative flex flex-col items-start rounded-xl border p-6 text-right transition-all duration-200 ${selectedBrand === "iris" ? "border-primary bg-card text-card-foreground shadow-md ring-1 ring-primary" : "border-border bg-card/60 text-card-foreground hover:border-border/80 hover:bg-card"}`} data-api-unique-id='tirecatalog-rc80cc91d598938a7-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
              <div className="flex w-full items-center justify-between" data-api-unique-id='tirecatalog-r66308d0a6fd35629-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <div className="font-display text-2xl font-black tracking-wide text-foreground" data-api-unique-id='tirecatalog-r1d297a6011b80f2a-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  IRIS TYRES
                </div>
                {selectedBrand === "iris" && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" data-api-unique-id='tirecatalog-r4dbfe68173b0e3ee-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    <CheckCircle2 className="h-4 w-4" data-api-unique-id='tirecatalog-r7a38e557542108c2-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                  </span>}
              </div>

              <p className="mt-3 font-body text-xs text-muted-foreground" data-api-unique-id='tirecatalog-ra0d74c470a6ef8bc-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                المنتج الوطني الرائد، تكنولوجيا متقدمة وتصنيع محلي وفق أعلى المعايير القياسية العالمية بمتانة مصممة للبيئة الجزائرية.
              </p>

              <div className="mt-4 flex items-center gap-2" data-api-unique-id='tirecatalog-ra2cca63fd20e60c3-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <span className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs font-semibold text-secondary-foreground" data-api-unique-id='tirecatalog-re054738e11bd9fe2-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  إنتاج وطني • معتمد
                </span>
                <span className="rounded-md bg-success/10 px-2.5 py-1 font-body text-xs font-medium text-success" data-api-unique-id='tirecatalog-r42e3da10e6bdba0b-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  صنع في الجزائر
                </span>
              </div>
            </button>
          </div>

          {/* Size Selector Console */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8" data-api-unique-id='tirecatalog-r781375606c395e83-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
            {/* Category Filter Chips */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4" data-api-unique-id='tirecatalog-r49f1ef706b0d96db-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
              <div className="text-right" data-api-unique-id='tirecatalog-rbe3b35c72d8c5af1-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <span className="font-header text-sm font-bold text-foreground" data-api-unique-id='tirecatalog-rd906ed5e4d1a8d1a-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  تصفية حسب صنف المركبة:
                </span>
              </div>
              <div className="flex flex-wrap gap-2" data-api-unique-id='tirecatalog-ra32854ec407c63ad-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                {_labels.map((cat, index) => <button key={cat.key} type="button" onClick={() => setSelectedCategory(cat.key)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${selectedCategory === cat.key ? "bg-primary text-primary-foreground shadow-sm" : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"}`} data-api-unique-id='tirecatalog-rea9286bbf0f5b55e-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1' data-api-bind-info={`_labels-${index}-label`} data-api-map-var-name='cat'>
                    {cat.label}
                  </button>)}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='tirecatalog-rc31390c38c96b9a9-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
              <div className="flex-1 space-y-1 text-right" data-api-unique-id='tirecatalog-r2da8eb5ca2ff7be8-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <label className="font-header text-sm font-bold text-foreground sm:text-base" data-api-unique-id='tirecatalog-r411879c016457f58-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  المقاس والمواصفات الفنية لعلامة ({selectedBrand === "continental" ? "Continental" : "Iris"})
                </label>
                <p className="font-body text-xs text-muted-foreground sm:text-sm" data-api-unique-id='tirecatalog-rb0a3143f663c94cf-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  اختر المقاس المعتمد المطابق للبطاقة الرمادية لمركبتك من القائمة
                </p>
              </div>

              <div className="w-full lg:w-96" data-api-unique-id='tirecatalog-rb4877c77ac5a2d0d-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <Select value={selectedSizeId} onValueChange={onSizeChange} data-api-unique-id='tirecatalog-rdb8f11d573172455-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  <SelectTrigger className="h-12 w-full min-w-0 border-border bg-background text-right text-foreground" data-api-unique-id='tirecatalog-rfe76353ecc445118-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    <SelectValue placeholder="اختر المقاس من القائمة..." data-api-unique-id='tirecatalog-r2d8fa018ce2d3bca-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 border-border bg-popover text-popover-foreground" data-api-unique-id='tirecatalog-raed4557fdb16b772-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    {filteredSizes.length === 0 ? <div className="p-3 text-center text-xs text-muted-foreground" data-api-unique-id='tirecatalog-r457a90a3d178d831-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                        لا توجد مقاسات مطابقة للصنف المختار
                      </div> : filteredSizes.map((size, index) => <SelectItem key={size.id} value={size.id} className="flex items-center justify-between py-2.5 text-right font-mono" data-api-unique-id='tirecatalog-r5e003e1e09142c03-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1'>
                          <div className="flex w-full items-center justify-between gap-4" data-api-unique-id='tirecatalog-r535c947b93a7b0cd-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1'>
                            <span className="font-bold" data-api-unique-id='tirecatalog-r600c24518ae61506-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1' data-api-bind-info={`filteredSizes-${index}-dimension`} data-api-map-var-name='size'>{size.dimension}</span>
                            <span className="text-xs text-muted-foreground" data-api-unique-id='tirecatalog-rfb657bac10de2f08-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1' data-api-bind-info={`filteredSizes-${index}-loadSpeed`} data-api-map-var-name='size'>
                              {size.loadSpeed}
                            </span>
                            <span className="font-bold text-primary" data-api-unique-id='tirecatalog-ra9c40b2ff91c189c-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1'>
                              {size.priceDzd.toLocaleString()} دج
                            </span>
                            {size.inStock ? <span className="rounded bg-success/10 px-1.5 py-0.5 text-[11px] font-semibold text-success" data-api-unique-id='tirecatalog-r2a6a2b2797b5e7e4-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1' data-api-bind-info={`filteredSizes-${index}-availableStock`} data-api-map-var-name='size'>
                                متوفر ({size.availableStock})
                              </span> : <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[11px] font-semibold text-destructive" data-api-unique-id='tirecatalog-r3ea90ef53783fe88-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' data-api-in-loop='1'>
                                غير متوفر
                              </span>}
                          </div>
                        </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Current Selection Details Panel */}
            {currentSelectedSize && <div className="mt-6 rounded-xl border border-border/80 bg-secondary p-4 text-secondary-foreground sm:p-6" data-api-unique-id='tirecatalog-rb177f4a68b686cdd-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center" data-api-unique-id='tirecatalog-r9ec70a395fab87f3-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                  <div className="space-y-1.5 text-right" data-api-unique-id='tirecatalog-rcbbe5e41daf9e6a3-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    <div className="flex flex-wrap items-center gap-3" data-api-unique-id='tirecatalog-r4eafeb1e42771724-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                      <span className="font-mono text-xl font-black text-foreground sm:text-2xl" data-api-unique-id='tirecatalog-r556b19d12a74467b-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                        {currentSelectedSize.dimension}
                      </span>
                      <span className="font-mono text-lg font-bold text-primary" data-api-unique-id='tirecatalog-r71e192d8336ecd69-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                        {currentSelectedSize.priceDzd.toLocaleString()} دج / للإطار
                      </span>
                      {currentSelectedSize.inStock ? <span className="inline-flex items-center gap-1 rounded-full bg-success text-xs font-bold text-success-foreground px-3 py-1" data-api-unique-id='tirecatalog-r548329e1c6f2c81e-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                          <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='tirecatalog-r8e02ee1524abc5fe-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                          متوفر بالمحطات ({currentSelectedSize.availableStock} إطار)
                        </span> : <span className="inline-flex items-center gap-1 rounded-full bg-destructive text-xs font-bold text-destructive-foreground px-3 py-1" data-api-unique-id='tirecatalog-r6dfce940642b4b23-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                          <XCircle className="h-3.5 w-3.5" data-api-unique-id='tirecatalog-rfd10f978d8542c8b-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                          غير متوفر حالياً
                        </span>}
                    </div>
                    <p className="font-body text-xs text-muted-foreground sm:text-sm" data-api-unique-id='tirecatalog-r18a4c9a94bb1b2c2-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                      مؤشر الحمولة والسرعة: <span className="font-mono text-foreground font-semibold" data-api-unique-id='tirecatalog-r4d932ebfb69a126c-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>{currentSelectedSize.loadSpeed}</span> • الموسم: <span className="text-foreground" data-api-unique-id='tirecatalog-r017e6d7fcd87061f-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>{currentSelectedSize.season}</span> • الفئة: <span className="text-foreground font-semibold" data-api-unique-id='tirecatalog-r8635e34c16c36382-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>{currentSelectedSize.category === "tourisme" ? "سياحية (TOURISM)" : currentSelectedSize.category === "suv" ? "دفع رباعي (SUV)" : "نفعية (UTILITY)"}</span>
                    </p>
                  </div>

                  <div className="flex w-full flex-col sm:w-auto sm:items-end" data-api-unique-id='tirecatalog-r56331007eb19f5d2-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                    <Button disabled={!currentSelectedSize.inStock} onClick={onProceedToOrder} className="w-full bg-primary font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 sm:w-auto" data-api-unique-id='tirecatalog-r988a22fa6d89aad6-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>
                      <span data-api-unique-id='tirecatalog-r034276e61997b530-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog'>تأكيد الاختيار والانتقال للتسجيل</span>
                      <ArrowLeft className="mr-2 h-4 w-4" data-api-unique-id='tirecatalog-ra3cb0f7dd5f72851-s4082540284' data-api-unique-page-name='src/frontend/components/HomePage/TireCatalog' />
                    </Button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </section>;
}