"use client";

import React, { useState } from "react";
import { X, Plus, AlertCircle } from "lucide-react";
import { TireBrand, TireCategory } from "@/backend/types/AdminStockManagement";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export type Brand = TireBrand;
export interface NewTireStockPayload {
  brand: TireBrand;
  size: string;
  category: TireCategory;
  priceDzd: number;
  availableStock: number;
  minThreshold: number;
  speedIndex: string;
}
export interface CreateStockDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: NewTireStockPayload) => void;
}
const CATEGORY_LABELS: Record<TireCategory, string> = {
  TOURISM: "سياحية (Tourism)",
  UTILITY: "نفعية (Utility)",
  SUV: "دفع رباعي (SUV)"
};
export const CreateStockDrawer: React.FC<CreateStockDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [brand, setBrand] = useState<TireBrand>("CONTINENTAL");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState<TireCategory>("TOURISM");
  const [priceDzd, setPriceDzd] = useState<string>("16500");
  const [availableStock, setAvailableStock] = useState<string>("50");
  const [minThreshold, setMinThreshold] = useState<string>("10");
  const [speedIndex, setSpeedIndex] = useState("91V");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!size.trim()) {
      setErrorMsg("يرجى إدخال المقاس الفني للإطار (مثل: 205/55 R16)");
      return;
    }
    const price = parseFloat(priceDzd);
    const stock = parseInt(availableStock, 10);
    const threshold = parseInt(minThreshold, 10);
    if (isNaN(price) || price <= 0) {
      setErrorMsg("يرجى إدخال سعر رسمي صحيح ومعتمد بالدينار الجزائري");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setErrorMsg("يرجى إدخال كمية مخزون صحيحة (0 أو أكثر)");
      return;
    }
    if (isNaN(threshold) || threshold < 0) {
      setErrorMsg("يرجى إدخال حد تنبيه أدنى صحيح");
      return;
    }
    onSubmit({
      brand,
      size: size.trim(),
      category,
      priceDzd: price,
      availableStock: stock,
      minThreshold: threshold,
      speedIndex: speedIndex.trim()
    });
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" data-api-unique-id='createstockdrawer-rc6e3e517edaff77b-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
      <div className="relative flex h-full w-full max-w-md flex-col border-r border-border bg-card text-card-foreground shadow-2xl animate-in slide-in-from-right duration-300" data-api-unique-id='createstockdrawer-r2a70f6659a02cc92-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
        {/* رأس الدرج */}
        <div className="flex items-center justify-between border-b border-border p-5" data-api-unique-id='createstockdrawer-r339ae11fcc94b592-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
          <div className="flex items-center gap-2" data-api-unique-id='createstockdrawer-rf1ae040f321a8526-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary" data-api-unique-id='createstockdrawer-rf17ccc76c94d33cf-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <Plus className="h-4 w-4 stroke-[3]" data-api-unique-id='createstockdrawer-r5cdeaaf0108461be-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
            </div>
            <div data-api-unique-id='createstockdrawer-r3fcfc76cfc7b9885-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <h2 className="font-header text-base font-bold text-foreground" data-api-unique-id='createstockdrawer-rb329d33545193011-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                إضافة مقاس إطار جديد
              </h2>
              <p className="text-xs text-muted-foreground" data-api-unique-id='createstockdrawer-rd77e523a9f40ea1d-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                تسجيل مقاس معتمد لعلامتي Continental أو Iris
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" data-api-unique-id='createstockdrawer-rb070a91cae5fde85-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
            <X className="h-5 w-5" data-api-unique-id='createstockdrawer-r62ce3845fe9c9df0-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
          </button>
        </div>

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between overflow-y-auto p-5" data-api-unique-id='createstockdrawer-r4cf0739e9a3baf06-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
          <div className="flex flex-col gap-4" data-api-unique-id='createstockdrawer-ree078956c90218f4-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
            {errorMsg && <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive" data-api-unique-id='createstockdrawer-r517cb74effcfe614-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <AlertCircle className="h-4 w-4 shrink-0" data-api-unique-id='createstockdrawer-r08dfd8ae5f86f1ea-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
                <span data-api-unique-id='createstockdrawer-rfab822c5247fd8c2-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>{errorMsg}</span>
              </div>}

            {/* العلامة التجارية */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-r9024b71e6fe02c5c-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r6ffd578a282619e8-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                العلامة التجارية المعتمدة <span className="text-destructive" data-api-unique-id='createstockdrawer-raad35f64f6c1e589-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
              </label>
              <Select value={brand} onValueChange={val => setBrand(val as TireBrand)} data-api-unique-id='createstockdrawer-ra717628d70381cc6-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <SelectTrigger className="h-10 border-border bg-input text-foreground" data-api-unique-id='createstockdrawer-r568a80caf9daabdc-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  <SelectValue placeholder="اختر العلامة التجارية" data-api-unique-id='createstockdrawer-r120cfe2e2373a6c3-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                    {brand === "CONTINENTAL" ? "كونتيننتال (CONTINENTAL - الألمانية)" : "إيريس (IRIS - الوطنية الجزائرية)"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent data-api-unique-id='createstockdrawer-r164aaa538b1d86a3-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  <SelectItem value="CONTINENTAL" data-api-unique-id='createstockdrawer-r0ccceb5e430afa00-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>كونتيننتال (CONTINENTAL - الألمانية)</SelectItem>
                  <SelectItem value="IRIS" data-api-unique-id='createstockdrawer-r90a923341be8d736-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>إيريس (IRIS - الوطنية الجزائرية)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* المقاس الفني */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-r21c71b15cc7689e8-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r759d0562333dcde6-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                المقاس الفني للإطار (Size) <span className="text-destructive" data-api-unique-id='createstockdrawer-re8cde4ae33a28151-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
              </label>
              <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="مثال: 205/55 R16 أو 185/65 R15" className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='createstockdrawer-radd938bc4c58962c-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='createstockdrawer-r8162a4b76aea419f-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                يرجى مطابقة الصيغة القياسية لنفطال (العرض/الارتفاع قطر الجنط)
              </span>
            </div>

            {/* صنف المركبة ومؤشر السرعة */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" data-api-unique-id='createstockdrawer-r4c511f59818df77f-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-rc1ec3616c1a43c18-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-rb6d6cd9d334c65de-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  صنف المركبة <span className="text-destructive" data-api-unique-id='createstockdrawer-rfb34846ec7b11fe8-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
                </label>
                <Select value={category} onValueChange={val => setCategory(val as TireCategory)} data-api-unique-id='createstockdrawer-r322712be3c39e7f8-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  <SelectTrigger className="h-10 border-border bg-input text-foreground" data-api-unique-id='createstockdrawer-rb3fd78283a033c66-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                    <SelectValue placeholder="صنف المركبة" data-api-unique-id='createstockdrawer-r5bd105057d7ee980-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                      {CATEGORY_LABELS[category]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='createstockdrawer-r72177db9733eb48f-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                    <SelectItem value="TOURISM" data-api-unique-id='createstockdrawer-r1d5f5481ff403e05-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>سياحية (Tourism)</SelectItem>
                    <SelectItem value="UTILITY" data-api-unique-id='createstockdrawer-r2f998a1ed4bd4e1e-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>نفعية (Utility)</SelectItem>
                    <SelectItem value="SUV" data-api-unique-id='createstockdrawer-r04e8bd31f7ac9bbe-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>دفع رباعي (SUV)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-r7edbb551e3f0033b-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r6f4a33b4db8b65ce-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  مؤشر الحمولة والسرعة
                </label>
                <input type="text" value={speedIndex} onChange={e => setSpeedIndex(e.target.value)} placeholder="مثال: 91V أو 94W" className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" data-api-unique-id='createstockdrawer-rd7e0323249ab6f4f-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
              </div>
            </div>

            {/* السعر الرسمي بالدينار الجزائري */}
            <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-r8064539ff23216fb-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r3de58e3873702457-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                السعر الرسمي المعتمد (DZD) <span className="text-destructive" data-api-unique-id='createstockdrawer-r91e60b994beeb955-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
              </label>
              <div className="relative" data-api-unique-id='createstockdrawer-r25606b66382c7c1e-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <input type="number" min="0" step="50" value={priceDzd} onChange={e => setPriceDzd(e.target.value)} placeholder="16500" className="h-10 w-full rounded-md border border-border bg-input pr-3 pl-16 font-mono text-sm font-bold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='createstockdrawer-r2cf19ce3b9821a53-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-primary" data-api-unique-id='createstockdrawer-r3d6db9113cf1b225-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  د.ج (DZD)
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='createstockdrawer-r7632ce9f11f67159-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                السعر شامل الرسم على القيمة المضافة لشبكة محطات نفطال
              </span>
            </div>

            {/* المخزون الابتدائي وحد التنبيه */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" data-api-unique-id='createstockdrawer-ra40684fb18c6b1bc-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-r50b3c47955bf3bb6-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r3396a6ad7d3072ed-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  الكمية الابتدائية للمخزون <span className="text-destructive" data-api-unique-id='createstockdrawer-r02cdd610daceb326-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
                </label>
                <input type="number" min="0" value={availableStock} onChange={e => setAvailableStock(e.target.value)} placeholder="50" className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='createstockdrawer-r8831c16d370fa547-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
              </div>

              <div className="flex flex-col gap-1.5" data-api-unique-id='createstockdrawer-rbd0ac8b9a52d1c4b-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                <label className="text-xs font-semibold text-foreground" data-api-unique-id='createstockdrawer-r8b7965277307ff87-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                  حد التنبيه الأدنى <span className="text-destructive" data-api-unique-id='createstockdrawer-r6a02b6913ea1d2bf-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>*</span>
                </label>
                <input type="number" min="1" value={minThreshold} onChange={e => setMinThreshold(e.target.value)} placeholder="10" className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='createstockdrawer-rdcc56f91fa6fb185-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer' />
              </div>
            </div>

            {/* تنبيه قاعدة نفطال للتوفر التلقائي */}
            <div className="rounded-lg border border-border bg-muted/60 p-3 text-xs text-muted-foreground" data-api-unique-id='createstockdrawer-rc7e57a6cc97b9552-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              <span className="font-semibold text-foreground" data-api-unique-id='createstockdrawer-r3665061f5ae7e898-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>قاعدة العمل الصارمة:</span>
              <p className="mt-1" data-api-unique-id='createstockdrawer-r17f401d5613c77ff-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
                إذا تم ضبط كمية المخزون الابتدائي على 0، سيتم إيقاف توفر المقاس تلقائياً في واجهة الحجز بالمحطات ولن يتمكن الزبائن من حجزه حتى تغذية المخزون.
              </p>
            </div>
          </div>

          {/* أزرار الحفظ والإلغاء */}
          <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-border pt-4" data-api-unique-id='createstockdrawer-r927d585ff48f4d73-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
            <button type="button" onClick={onClose} className="h-9 rounded-md border border-border bg-muted px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground" data-api-unique-id='createstockdrawer-re6bbf9b2a5d125cb-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              إلغاء
            </button>
            <button type="submit" className="h-9 rounded-md bg-primary px-5 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='createstockdrawer-rf72dedc06a065a1c-s868896045' data-api-unique-page-name='src/backend/components/AdminStockManagement/CreateStockDrawer'>
              تأكيد وإضافة المقاس
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default CreateStockDrawer;