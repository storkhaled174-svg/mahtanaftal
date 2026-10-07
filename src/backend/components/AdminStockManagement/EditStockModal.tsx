"use client";

import React, { useState, useEffect } from "react";
import { X, Save, AlertTriangle, AlertCircle } from "lucide-react";
import { TireStockDto, UpdateTireStockInput } from "@/backend/types/AdminStockManagement";
interface EditStockModalProps {
  item: TireStockDto | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: UpdateTireStockInput) => void;
}
export const EditStockModal: React.FC<EditStockModalProps> = ({
  item,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [priceDzd, setPriceDzd] = useState<string>("");
  const [availableStock, setAvailableStock] = useState<string>("");
  const [minThreshold, setMinThreshold] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    if (item) {
      setPriceDzd(item.priceDzd.toString());
      setAvailableStock(item.availableStock.toString());
      setMinThreshold(item.minThreshold.toString());
      setIsAvailable(item.isAvailable && item.availableStock > 0);
      setErrorMsg(null);
    }
  }, [item]);
  if (!isOpen || !item) return null;
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAvailableStock(val);
    const parsedStock = parseInt(val, 10);
    // قاعدة نفطال: عند انخفاض المخزون للصفر يتم تعطيل التوفر تلقائياً
    if (!isNaN(parsedStock) && parsedStock === 0) {
      setIsAvailable(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const price = parseFloat(priceDzd);
    const stock = parseInt(availableStock, 10);
    const threshold = parseInt(minThreshold, 10);
    if (isNaN(price) || price <= 0) {
      setErrorMsg("يرجى إدخال سعر معتمد صحيح بالدينار الجزائري");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setErrorMsg("يرجى إدخال كمية مخزون صحيحة");
      return;
    }
    if (isNaN(threshold) || threshold < 0) {
      setErrorMsg("يرجى إدخال حد تنبيه أدنى صحيح");
      return;
    }

    // قاعدة العمل الصارمة: إذا المخزون 0 يمنع تشغيل التوفر
    const finalAvailability = stock === 0 ? false : isAvailable;
    onSubmit({
      id: item.id,
      priceDzd: price,
      availableStock: stock,
      minThreshold: threshold,
      isAvailable: finalAvailability
    });
    onClose();
  };
  const parsedStock = parseInt(availableStock, 10);
  const isZeroStock = !isNaN(parsedStock) && parsedStock === 0;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-in fade-in duration-200" data-api-unique-id='editstockmodal-rb3e8938e63c8cbcf-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
      <div className="relative flex w-full max-w-lg max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl animate-in zoom-in-95 duration-200" data-api-unique-id='editstockmodal-r76a454820ee6f8e6-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
        {/* رأس النافذة */}
        <div className="flex items-start justify-between border-b border-border pb-4" data-api-unique-id='editstockmodal-r9afdf91b3ed34b65-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
          <div data-api-unique-id='editstockmodal-rd07a4e1fcf5221d4-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <div className="flex items-center gap-2" data-api-unique-id='editstockmodal-r014b688d583cf515-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${item.brand === "CONTINENTAL" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground border border-border"}`} data-api-unique-id='editstockmodal-r48baee6afbeb76cb-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                {item.brand}
              </span>
              <h2 className="font-header text-lg font-bold text-foreground" data-api-unique-id='editstockmodal-r2a74b73dd48f4b2b-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                تعديل السعر والمخزون: {item.size}
              </h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground" data-api-unique-id='editstockmodal-r6eb5d512dec3d2e1-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              تعديل السعر الرسمي أو الكميات المتوفرة وحد التنبيه للمقاس المعتمد
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" data-api-unique-id='editstockmodal-rd7d67b3af7091b43-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <X className="h-5 w-5" data-api-unique-id='editstockmodal-r789d0668d889ab19-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
          </button>
        </div>

        {/* جسم النموذج */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4" data-api-unique-id='editstockmodal-rf557ca9d38c710f2-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
          {errorMsg && <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive" data-api-unique-id='editstockmodal-r3a3b5ff5370bf0ea-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <AlertCircle className="h-4 w-4 shrink-0" data-api-unique-id='editstockmodal-re18de51989c6e20f-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
              <span data-api-unique-id='editstockmodal-rf784259f31dc0d62-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>{errorMsg}</span>
            </div>}

          {/* تفاصيل ثابتة للمقاس */}
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-muted/40 p-3 text-xs" data-api-unique-id='editstockmodal-re3634a44379cb3c6-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <div data-api-unique-id='editstockmodal-r610a3555f9e9e1b9-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <span className="text-muted-foreground" data-api-unique-id='editstockmodal-r3083302355f307d1-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>صنف المركبة:</span>
              <span className="mr-1.5 font-semibold text-foreground" data-api-unique-id='editstockmodal-r2d23742bead863e4-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                {item.category === "TOURISM" ? "سياحية" : item.category === "UTILITY" ? "نفعية" : "دفع رباعي"}
              </span>
            </div>
            <div data-api-unique-id='editstockmodal-r70d05ae666233893-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <span className="text-muted-foreground" data-api-unique-id='editstockmodal-refa4226f8e85a66d-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>مؤشر السرعة والحمولة:</span>
              <span className="mr-1.5 font-mono font-bold text-foreground" data-api-unique-id='editstockmodal-rfe4a7c0de283c0f3-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                {item.speedIndex || "غير محدد"}
              </span>
            </div>
            <div data-api-unique-id='editstockmodal-r89a74d5a6455ae1a-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <span className="text-muted-foreground" data-api-unique-id='editstockmodal-r14e7e6b789cd8e0c-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>المحجوز الفعلي حالياً:</span>
              <span className="mr-1.5 font-mono font-bold text-info" data-api-unique-id='editstockmodal-rb7a87ae36256c50f-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                {item.reservedStock} إطار
              </span>
            </div>
            <div data-api-unique-id='editstockmodal-r12e4378ecaa80584-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <span className="text-muted-foreground" data-api-unique-id='editstockmodal-rda380345541bdad1-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>معرف السجل:</span>
              <span className="mr-1.5 font-mono text-[10px] text-muted-foreground truncate" data-api-unique-id='editstockmodal-r627165b0ec154af3-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                {item.id.slice(0, 14)}...
              </span>
            </div>
          </div>

          {/* السعر الرسمي بالدينار الجزائري */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='editstockmodal-rd6e458deb7557d9f-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <label className="text-xs font-semibold text-foreground" data-api-unique-id='editstockmodal-rd40e406674b2515d-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              السعر الرسمي المعتمد (DZD) <span className="text-destructive" data-api-unique-id='editstockmodal-re932741cf3d484e3-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>*</span>
            </label>
            <div className="relative" data-api-unique-id='editstockmodal-ra085420dd54a5448-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <input type="number" min="0" step="50" value={priceDzd} onChange={e => setPriceDzd(e.target.value)} className="h-10 w-full rounded-md border border-border bg-input pr-3 pl-16 font-mono text-sm font-bold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='editstockmodal-rbdae1c826174d5c7-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-primary" data-api-unique-id='editstockmodal-r402ba55b8ff6ff6f-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                د.ج (DZD)
              </span>
            </div>
          </div>

          {/* المخزون المتوفر وحد التنبيه */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" data-api-unique-id='editstockmodal-r222e405b0972c0a9-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <div className="flex flex-col gap-1.5" data-api-unique-id='editstockmodal-r04155eb07f18a486-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='editstockmodal-r440332fb74f47fea-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                المخزون المتوفر (Available Stock) <span className="text-destructive" data-api-unique-id='editstockmodal-r10d7b57659ab41ce-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>*</span>
              </label>
              <input type="number" min="0" value={availableStock} onChange={handleStockChange} className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='editstockmodal-r813f498dad52944c-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
            </div>

            <div className="flex flex-col gap-1.5" data-api-unique-id='editstockmodal-r2767819ffe24ae85-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <label className="text-xs font-semibold text-foreground" data-api-unique-id='editstockmodal-rf9cd9fbd85f6e0c7-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                حد التنبيه الأدنى (Min Threshold) <span className="text-destructive" data-api-unique-id='editstockmodal-ra4912c354de565ac-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>*</span>
              </label>
              <input type="number" min="0" value={minThreshold} onChange={e => setMinThreshold(e.target.value)} className="h-10 rounded-md border border-border bg-input px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" required data-api-unique-id='editstockmodal-r27adb2cb92e07901-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
            </div>
          </div>

          {/* مفتاح تبديل التوفر في المحطات مع فحص قاعدة الصفر */}
          <div className="rounded-lg border border-border bg-muted/40 p-3.5" data-api-unique-id='editstockmodal-r08a7d8400539a712-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <div className="flex items-center justify-between" data-api-unique-id='editstockmodal-r2d2fa73c903b1ec7-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <div className="flex flex-col" data-api-unique-id='editstockmodal-rc0de3fcbc5debcd4-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                <span className="text-xs font-semibold text-foreground" data-api-unique-id='editstockmodal-r951bec2f7e98c417-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                  حالة إتاحة المقاس للحجز بالمحطات
                </span>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='editstockmodal-r5a78e2181d89a49b-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                  تحديد ما إذا كان المقاس يظهر للزبائن في منصة الحجز
                </span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center" data-api-unique-id='editstockmodal-r6a2bc9e7eefe012d-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                <input type="checkbox" checked={isAvailable && !isZeroStock} disabled={isZeroStock} onChange={e => setIsAvailable(e.target.checked)} className="peer sr-only" data-api-unique-id='editstockmodal-r00c27cd1e30976dd-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
                <div className="peer h-6 w-11 rounded-full bg-input peer-checked:bg-success peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:right-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-white after:transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-40" data-api-unique-id='editstockmodal-rb0d91fa7f503a700-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
              </label>
            </div>

            {isZeroStock && <div className="mt-2.5 flex items-start gap-1.5 rounded border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive" data-api-unique-id='editstockmodal-r49f0af1ee91efb1d-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" data-api-unique-id='editstockmodal-r6be8a0d57c4dac84-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
                <span data-api-unique-id='editstockmodal-r66ced2c0f241f4e1-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
                  <strong data-api-unique-id='editstockmodal-r3756d9fb0078ccfc-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>تجميد آلي (Auto-Freeze):</strong> لا يمكن تفعيل المقاس لأن المخزون المتوفر يساوي 0. سيتم تعطيله تلقائياً حتى إضافة كميات جديدة.
                </span>
              </div>}
          </div>

          {/* أزرار الإجراءات */}
          <div className="mt-3 flex items-center justify-end gap-2.5 border-t border-border pt-4" data-api-unique-id='editstockmodal-r58fb00f8360a111b-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
            <button type="button" onClick={onClose} className="h-9 rounded-md border border-border bg-muted px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground" data-api-unique-id='editstockmodal-r7e93ce9d357c1e44-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              إلغاء
            </button>
            <button type="submit" className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-5 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='editstockmodal-r3014732a020d1ebc-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>
              <Save className="h-3.5 w-3.5 stroke-[2.5]" data-api-unique-id='editstockmodal-rae3adbac54407e6c-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal' />
              <span data-api-unique-id='editstockmodal-r223a63179caaf8ee-s758617743' data-api-unique-page-name='src/backend/components/AdminStockManagement/EditStockModal'>حفظ التعديلات والتحديث</span>
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default EditStockModal;