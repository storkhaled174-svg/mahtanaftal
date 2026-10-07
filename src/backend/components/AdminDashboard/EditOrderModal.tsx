"use client";

import React, { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";
import { OrderItem, OrderStatus, TireSizeStock, WilayaData } from "@/backend/types/AdminDashboard";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface EditOrderModalProps {
  order: OrderItem | null;
  stocks: TireSizeStock[];
  wilayas?: WilayaData[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: OrderItem) => void;
}
const statusTextMap: Record<OrderStatus, string> = {
  NEW: "🟡 جديدة",
  PROCESSING: "🔵 قيد المعالجة",
  COMPLETED: "🟢 مكتملة",
  CANCELLED: "🔴 ملغية"
};
export default function EditOrderModal({
  order,
  stocks,
  wilayas = [],
  isOpen,
  onClose,
  onSave
}: EditOrderModalProps) {
  const [formData, setFormData] = useState<OrderItem | null>(null);
  useEffect(() => {
    if (order) {
      setFormData({
        ...order
      });
    }
  }, [order]);
  if (!formData || !order) return null;
  const currentWilaya = wilayas.find(w => w.nameAr === formData.wilaya || w.code === formData.wilaya);
  const communesList = currentWilaya ? currentWilaya.communes : formData.commune ? [formData.commune] : [];
  const handleWilayaChange = (val: string) => {
    const selected = wilayas.find(w => w.nameAr === val || w.code === val);
    setFormData(prev => prev ? {
      ...prev,
      wilaya: val,
      commune: selected && selected.communes.length > 0 ? selected.communes[0] : ""
    } : null);
  };
  const handleTireChange = (stockId: string) => {
    const selectedStock = stocks.find(s => s.id === stockId);
    if (!selectedStock) return;
    setFormData(prev => {
      if (!prev) return null;
      const unitPrice = selectedStock.priceDzd;
      return {
        ...prev,
        brand: selectedStock.brand,
        tireSize: selectedStock.size,
        unitPriceDzd: unitPrice,
        totalPriceDzd: unitPrice * prev.quantity
      };
    });
  };
  const handleQuantityChange = (qty: number) => {
    const validQty = Math.max(1, Math.min(8, isNaN(qty) ? 1 : qty));
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        quantity: validQty,
        totalPriceDzd: prev.unitPriceDzd * validQty
      };
    });
  };
  const handleSave = () => {
    if (!formData) return;
    if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
      toast.error("يرجى ملء اسم العميل ورقم هاتفه");
      return;
    }
    onSave(formData);
    onClose();
    toast.success(`تم تحديث بيانات الطلبية ${formData.orderNumber} بنجاح`);
  };
  const currentStockMatch = stocks.find(s => s.size === formData.tireSize && s.brand === formData.brand);
  const currentStockLabel = currentStockMatch ? `${currentStockMatch.brand} • ${currentStockMatch.size} — ${currentStockMatch.priceDzd.toLocaleString("ar-DZ")} دج` : formData.brand && formData.tireSize ? `${formData.brand} — ${formData.tireSize} (${formData.unitPriceDzd.toLocaleString("ar-DZ")} دج)` : "اختر المقاس والعلامة";
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='editordermodal-r7dbea5577a5bc295-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
      <DialogContent key={order.id} className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg bg-card text-card-foreground border-border" data-api-unique-id='editordermodal-r2fb1a77f8197d910-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
        <DialogHeader data-api-unique-id='editordermodal-rfaa9fe5869d686f4-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
          <div className="flex items-center gap-2" data-api-unique-id='editordermodal-r74ed1e99782aa036-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 border border-primary/30 text-primary" data-api-unique-id='editordermodal-rf158a033f16106dd-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <Edit3 className="h-4 w-4" data-api-unique-id='editordermodal-r621f2da99b0a8133-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
            </div>
            <div data-api-unique-id='editordermodal-r85b1ca9a0bc78604-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='editordermodal-r37d621d43d6efa38-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                تعديل وتدقيق بيانات وسجل الطلبية
              </DialogTitle>
              <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='editordermodal-r2d3ce63946746c82-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                الرقم المرجعي: {formData.orderNumber}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3.5 text-xs pt-2" data-api-unique-id='editordermodal-rd923d60fb2e3715a-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
          {/* Customer Name */}
          <div className="space-y-1" data-api-unique-id='editordermodal-rd5d1eaad8a4be9c3-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-rb78c69d38c535195-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>اسم ولقب العميل</label>
            <input type="text" value={formData.customerName} onChange={e => setFormData(prev => prev ? {
            ...prev,
            customerName: e.target.value
          } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground focus:ring-1 focus:ring-primary focus:outline-none text-xs" data-api-unique-id='editordermodal-r13e43084075a8b16-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-api-unique-id='editordermodal-ree9c3b908a0409e3-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <div className="space-y-1" data-api-unique-id='editordermodal-r45df840f4d42d0a9-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-re4930845ee1f8eb2-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>رقم الهاتف الرئيسي</label>
              <input type="text" value={formData.phoneNumber} onChange={e => setFormData(prev => prev ? {
              ...prev,
              phoneNumber: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none text-xs" data-api-unique-id='editordermodal-ra1e38b476fe798b1-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
            </div>

            <div className="space-y-1" data-api-unique-id='editordermodal-rd1ec20df1eba661b-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-r610cf650c9358fda-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>رقم الهاتف الثانوي (اختياري)</label>
              <input type="text" value={formData.secondaryPhone || ""} onChange={e => setFormData(prev => prev ? {
              ...prev,
              secondaryPhone: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none text-xs" data-api-unique-id='editordermodal-r3fa141bda26cb48c-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
            </div>
          </div>

          {/* Wilaya & Commune */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-api-unique-id='editordermodal-rd08b0c0c962c6b6c-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <div className="space-y-1" data-api-unique-id='editordermodal-r228b5c5430031b1d-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-r3e3b7c613da2cc56-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>الولاية المعتمدة</label>
              <Select value={formData.wilaya} onValueChange={handleWilayaChange} data-api-unique-id='editordermodal-r893c1dc9ea463753-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='editordermodal-r22183dd9624544b9-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  <SelectValue placeholder="اختر الولاية" data-api-unique-id='editordermodal-refa87ed5fd9c36b0-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>{formData.wilaya || "اختر الولاية"}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-52 bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='editordermodal-r53cf8d504e487a58-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  {wilayas.map((w, index) => <SelectItem key={w.code} value={w.nameAr} data-api-unique-id='editordermodal-rfd14b6d759380666-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' data-api-in-loop='1' data-api-bind-info={`wilayas-${index}-code`} data-api-map-var-name='w'>
                      {w.code} - {w.nameAr}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1" data-api-unique-id='editordermodal-r6a88f3b04c359117-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-rdb5a2c47538e0209-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>البلدية</label>
              <Select value={formData.commune} onValueChange={val => setFormData(prev => prev ? {
              ...prev,
              commune: val
            } : null)} data-api-unique-id='editordermodal-ra82707c5125ab4d2-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='editordermodal-r299a0d4219e4cd29-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  <SelectValue placeholder="اختر البلدية" data-api-unique-id='editordermodal-r83475f7a72ae266f-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>{formData.commune || "اختر البلدية"}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-52 bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='editordermodal-r8f93d37dc9cdce1b-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  {communesList.map((c, index) => <SelectItem key={c} value={c} data-api-unique-id='editordermodal-re718d4abf569154f-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' data-api-in-loop='1' data-api-bind-info={`communesList-${index}-$item`} data-api-map-var-name='c'>
                      {c}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Select Tire Model / Size from Stock Catalog */}
          <div className="space-y-1" data-api-unique-id='editordermodal-r3cc752d3a78d0de6-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-r1ac67c4555a2bddf-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              تغيير المقاس من الكتالوج المعتمد
            </label>
            <Select value={currentStockMatch?.id || ""} onValueChange={handleTireChange} data-api-unique-id='editordermodal-r8f91192989ecf290-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <SelectTrigger className="w-full bg-secondary border-border text-xs font-mono" data-api-unique-id='editordermodal-rf966c21a2945037a-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                <SelectValue placeholder="اختر المقاس والعلامة" data-api-unique-id='editordermodal-rd685a23dea137029-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  {currentStockLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-56 bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='editordermodal-r2fbf2c35b7117c8e-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                {stocks.map((stock, index) => <SelectItem key={stock.id} value={stock.id} data-api-unique-id='editordermodal-r83dd37d9ce7f0bc4-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' data-api-in-loop='1' data-api-bind-info={`stocks-${index}-brand`} data-api-map-var-name='stock'>
                    {stock.brand} • {stock.size} — {stock.priceDzd.toLocaleString("ar-DZ")} دج (متبقي: {stock.availableStock})
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Status & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-api-unique-id='editordermodal-ra3869f264f8f7034-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <div className="space-y-1" data-api-unique-id='editordermodal-rc5e95736cb8a4f53-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-r0db14c9c7c20c912-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>الحالة التشغيلية</label>
              <Select value={formData.status} onValueChange={val => setFormData(prev => prev ? {
              ...prev,
              status: val as OrderStatus
            } : null)} data-api-unique-id='editordermodal-r268cd6b059c408f8-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='editordermodal-rdd270ec785f237ec-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  <SelectValue placeholder="الحالة" data-api-unique-id='editordermodal-rffd84586416f03d0-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                    {statusTextMap[formData.status] || formData.status}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='editordermodal-r91495996e0d5d067-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                  <SelectItem value="NEW" data-api-unique-id='editordermodal-r41529a8fbd71b61e-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>🟡 جديدة</SelectItem>
                  <SelectItem value="PROCESSING" data-api-unique-id='editordermodal-r7a39819937f599b7-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>🔵 قيد المعالجة</SelectItem>
                  <SelectItem value="COMPLETED" data-api-unique-id='editordermodal-r9b4cbc8a4ffff4eb-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>🟢 مكتملة</SelectItem>
                  <SelectItem value="CANCELLED" data-api-unique-id='editordermodal-r294f9927c35e7277-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>🔴 ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1" data-api-unique-id='editordermodal-r7d67d526b05113b0-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-r2266266f119c06a5-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>عدد الإطارات (1 إلى 4)</label>
              <input type="number" min={1} max={8} value={formData.quantity} onChange={e => handleQuantityChange(Number(e.target.value))} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none text-xs" data-api-unique-id='editordermodal-r4ecf243bebfd0800-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
            </div>
          </div>

          {/* Supervisor Notes */}
          <div className="space-y-1" data-api-unique-id='editordermodal-r78e18179caa81310-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <label className="font-medium text-muted-foreground" data-api-unique-id='editordermodal-rcd42f8678df8be09-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>ملاحظات المشرف الإدارية (Notes)</label>
            <textarea rows={2} placeholder="سجل أي تفاصيل خاصة بتسليم الشحنة أو التدقيق الأمني..." value={formData.notes || ""} onChange={e => setFormData(prev => prev ? {
            ...prev,
            notes: e.target.value
          } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='editordermodal-r4b804fe928d6a5f0-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal' />
          </div>

          {/* Live Recalculated Summary */}
          <div className="rounded border border-border bg-secondary/50 p-2.5 space-y-1.5 text-xs" data-api-unique-id='editordermodal-r8d971be82cfd4c6c-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            <div className="flex justify-between" data-api-unique-id='editordermodal-rd61db2f57cf72f32-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <span className="text-muted-foreground" data-api-unique-id='editordermodal-rf34fdedab8c2daea-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>العلامة والمقاس:</span>
              <span className="font-bold text-foreground" data-api-unique-id='editordermodal-r5e44e5944d0cf942-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                {formData.brand} — {formData.tireSize}
              </span>
            </div>
            <div className="flex justify-between" data-api-unique-id='editordermodal-r210237d057265aa9-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <span className="text-muted-foreground" data-api-unique-id='editordermodal-r4344820718d601f1-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>سعر الوحدة الرسمي:</span>
              <span className="font-mono text-foreground" data-api-unique-id='editordermodal-r522e4bf3aa7a5335-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                {formData.unitPriceDzd.toLocaleString("ar-DZ")} دج
              </span>
            </div>
            <div className="flex justify-between" data-api-unique-id='editordermodal-r1b3fe4019337f34d-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <span className="text-muted-foreground" data-api-unique-id='editordermodal-r5d64ada45721bcfc-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>الكمية المحسوبة:</span>
              <span className="font-mono text-foreground font-bold" data-api-unique-id='editordermodal-r58a6a65b5de689c3-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                {formData.quantity} إطارات
              </span>
            </div>
            <div className="flex justify-between border-t border-border/60 pt-1.5 font-bold" data-api-unique-id='editordermodal-r60c8a8102e456c94-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
              <span className="text-foreground" data-api-unique-id='editordermodal-r6c754b294978567b-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>المبلغ الإجمالي المحسوب:</span>
              <span className="font-mono text-primary text-sm" data-api-unique-id='editordermodal-r3fe9e45ed51436b1-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
                {formData.totalPriceDzd.toLocaleString("ar-DZ")} دج
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='editordermodal-rc13569c573f137be-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='editordermodal-r09765a5f76e9ea90-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            إلغاء
          </button>
          <button type="button" onClick={handleSave} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='editordermodal-rad429c7ae75373e7-s424284968' data-api-unique-page-name='src/backend/components/AdminDashboard/EditOrderModal'>
            حفظ التغييرات
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}