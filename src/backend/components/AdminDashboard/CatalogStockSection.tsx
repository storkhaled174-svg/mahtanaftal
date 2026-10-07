"use client";

import React, { useState } from "react";
import { Layers, Plus, Edit } from "lucide-react";
import { TireSizeStock, TireBrand, TireCategory } from "@/backend/types/AdminDashboard";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface CatalogStockSectionProps {
  stocks: TireSizeStock[];
  onUpdateStock: (updatedStock: TireSizeStock) => void;
  onAddStock: (newStock: Omit<TireSizeStock, "id">) => void;
  onToggleAvailability: (stockId: string) => void;
}
export default function CatalogStockSection({
  stocks,
  onUpdateStock,
  onAddStock,
  onToggleAvailability
}: CatalogStockSectionProps) {
  const [selectedStockForEdit, setSelectedStockForEdit] = useState<TireSizeStock | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New stock form state
  const [newBrand, setNewBrand] = useState<TireBrand>("CONTINENTAL");
  const [newSize, setNewSize] = useState("");
  const [newCategory, setNewCategory] = useState<TireCategory>("TOURISM");
  const [newPrice, setNewPrice] = useState<number>(18500);
  const [newStockCount, setNewStockCount] = useState<number>(45);
  const [newMinThreshold, setNewMinThreshold] = useState<number>(10);
  const [newSpeedIndex, setNewSpeedIndex] = useState("91V");

  // Filter stocks by brand
  const continentalStocks = stocks.filter(s => s.brand === "CONTINENTAL");
  const irisStocks = stocks.filter(s => s.brand === "IRIS");
  const handleOpenEdit = (stock: TireSizeStock) => {
    setSelectedStockForEdit({
      ...stock
    });
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = () => {
    if (!selectedStockForEdit) return;
    if (selectedStockForEdit.priceDzd <= 0) {
      toast.error("يرجى إدخال سعر صحيح أكبر من الصفر");
      return;
    }
    // Auto toggle availability if stock becomes 0
    const updated: TireSizeStock = {
      ...selectedStockForEdit,
      isAvailable: selectedStockForEdit.availableStock > 0 ? selectedStockForEdit.isAvailable : false
    };
    onUpdateStock(updated);
    setIsEditModalOpen(false);
    setSelectedStockForEdit(null);
    toast.success("تم تحديث بيانات المقاس والمخزون بنجاح");
  };
  const handleCreateNewStock = () => {
    if (!newSize.trim()) {
      toast.error("يرجى كتابة المقاس الفني المعتمد (مثال: 205/55 R16)");
      return;
    }
    if (newPrice <= 0) {
      toast.error("يرجى إدخال سعر صالح");
      return;
    }
    onAddStock({
      brand: newBrand,
      size: newSize.trim(),
      category: newCategory,
      priceDzd: Number(newPrice),
      availableStock: Number(newStockCount),
      reservedStock: 0,
      minThreshold: Number(newMinThreshold),
      speedIndex: newSpeedIndex.trim() || null,
      isAvailable: Number(newStockCount) > 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setIsAddModalOpen(false);
    setNewSize("");
    toast.success("تمت إضافة المقاس الجديد إلى الكتالوج الرسمي");
  };
  const categoryLabels: Record<TireCategory, string> = {
    TOURISM: "سياحية",
    UTILITY: "نفعية",
    SUV: "رباعية الدفع"
  };
  return <section className="w-full min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-sm flex flex-col gap-5" data-controller-name="شريحة إدارة كتالوج العلامات والمقاسات والأسعار والمخزون" data-api-unique-id='catalogstocksection-r3d8bbda8be391135-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-3" data-api-unique-id='catalogstocksection-r9492f4f612521b2a-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
        <div className="flex items-center gap-2" data-api-unique-id='catalogstocksection-rd678af4738c61eb7-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground border border-border" data-api-unique-id='catalogstocksection-r6a3aa84eb94148b0-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <Layers className="h-4 w-4 text-primary" data-api-unique-id='catalogstocksection-rbd0577a6563632de-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
          </div>
          <div data-api-unique-id='catalogstocksection-rd690c31bd85b5647-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <h2 className="font-header text-base sm:text-lg font-bold text-foreground" data-api-unique-id='catalogstocksection-r1edfd3fefa78769e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              مصفوفة إدارة الكتالوج والمخزون المزدوج (Continental • Iris)
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='catalogstocksection-r25728ac8f902f14c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              ضبط المقاسات المعتمدة، الأسعار الرسمية بالدينار الجزائري، وحالة التوفر الفوري
            </p>
          </div>
        </div>

        <button type="button" onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all" data-api-unique-id='catalogstocksection-r3ae2e3f20d4fcc7c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <Plus className="h-4 w-4" data-api-unique-id='catalogstocksection-r799f43063aa20435-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
          <span data-api-unique-id='catalogstocksection-rf86c4225747d1093-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>إضافة مقاس جديد</span>
        </button>
      </div>

      {/* Dual Tables Matrix: Continental and Iris in parallel */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" data-api-unique-id='catalogstocksection-r7b59d8731e1ec052-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
        {/* Table 1: Continental */}
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 min-w-0" data-api-unique-id='catalogstocksection-rc339826c17829eda-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <div className="flex items-center justify-between border-b border-border/70 pb-2" data-api-unique-id='catalogstocksection-r9334a7fc74742462-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <div className="flex items-center gap-2" data-api-unique-id='catalogstocksection-raeaef497f54da51d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <span className="inline-flex h-6 items-center px-2.5 rounded bg-primary text-primary-foreground text-xs font-black font-display" data-api-unique-id='catalogstocksection-r54b3f0b50a26bbdf-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                Continental
              </span>
              <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='catalogstocksection-r6dbb8367bf55ef86-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                ({continentalStocks.length} مقاس معتمد)
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='catalogstocksection-r8763725c302d7374-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>العلامة الدولية المعتمدة</span>
          </div>

          <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='catalogstocksection-r96ddb06007a992d9-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <table className="w-full text-right text-xs border-collapse min-w-[500px]" data-api-unique-id='catalogstocksection-r26bd31806441d2db-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <thead data-api-unique-id='catalogstocksection-r72028f1e46b25b3e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <tr className="border-b border-border text-muted-foreground bg-secondary/50" data-api-unique-id='catalogstocksection-rc9f4cdbd673e88a8-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <th className="p-2 font-semibold" data-api-unique-id='catalogstocksection-r8a8f889a4bbbdf7e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>المقاس / الفئة</th>
                  <th className="p-2 font-semibold" data-api-unique-id='catalogstocksection-rf26e0e26d813ec00-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>السعر الرسمي</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-rffbb171803db93ff-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>المتوفر / المحجوز</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-rb9c056957332866b-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>التوفر</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-r3d0c7697d6fc389e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60" data-api-unique-id='catalogstocksection-rfa43ad2f4df6e7b8-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                {continentalStocks.map((item, index) => {
                const isLow = item.availableStock <= item.minThreshold;
                return <tr key={item.id} className="hover:bg-secondary/30 transition-colors" data-api-unique-id='catalogstocksection-r17a75ff4d36e3521-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                      <td className="p-2.5" data-api-unique-id='catalogstocksection-r57640b838f427c93-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <div className="flex flex-col font-mono" data-api-unique-id='catalogstocksection-r9a1a5a00592947db-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <span className="font-bold text-foreground" data-api-unique-id='catalogstocksection-r24235701db3a55bc-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`continentalStocks-${index}-size`} data-api-map-var-name='item'>{item.size}</span>
                          <span className="text-[10px] text-muted-foreground font-sans" data-api-unique-id='catalogstocksection-re975a859a2621624-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                            {categoryLabels[item.category]} • {item.speedIndex ? `مؤشر ${item.speedIndex}` : "قياسي"}
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 font-mono whitespace-nowrap" data-api-unique-id='catalogstocksection-r1c9777ec2caed9b5-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <span className="font-semibold text-foreground" data-api-unique-id='catalogstocksection-r04151b0181d51c2f-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          {item.priceDzd.toLocaleString("ar-DZ")} دج
                        </span>
                      </td>

                      <td className="p-2.5 text-center font-mono" data-api-unique-id='catalogstocksection-r9f69da2186158217-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <div className="flex items-center justify-center gap-1.5" data-api-unique-id='catalogstocksection-r01ddd72a92133241-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${isLow ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground"}`} title={isLow ? `تنبيه: المخزون تحت حد الأمان (${item.minThreshold})` : "مخزون متاح"} data-api-unique-id='catalogstocksection-r8f0990a63ce1044a-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`continentalStocks-${index}-availableStock`} data-api-map-var-name='item'>
                            {item.availableStock}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono" title="المخزون المحجوز للطلبيات" data-api-unique-id='catalogstocksection-rabff27059ae39137-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`continentalStocks-${index}-reservedStock`} data-api-map-var-name='item'>
                            (حجز: {item.reservedStock})
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 text-center" data-api-unique-id='catalogstocksection-r2dfe812272661d8c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <button type="button" onClick={() => onToggleAvailability(item.id)} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${item.isAvailable && item.availableStock > 0 ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`} data-api-unique-id='catalogstocksection-r1af8be570bcc2fd3-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          {item.isAvailable && item.availableStock > 0 ? "متوفر" : "غير متوفر"}
                        </button>
                      </td>

                      <td className="p-2.5 text-center" data-api-unique-id='catalogstocksection-r7ee8b24c13d48049-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <button type="button" onClick={() => handleOpenEdit(item)} className="p-1.5 rounded border border-border bg-secondary hover:bg-muted text-secondary-foreground transition-colors" title="تعديل السعر والمخزون" data-api-unique-id='catalogstocksection-r1ed5cc56ae64e4ac-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <Edit className="h-3.5 w-3.5" data-api-unique-id='catalogstocksection-re07d13da2a8ba05f-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' />
                        </button>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Iris */}
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 min-w-0" data-api-unique-id='catalogstocksection-r0803ef357f46f121-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <div className="flex items-center justify-between border-b border-border/70 pb-2" data-api-unique-id='catalogstocksection-rf901eb17659a6cab-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <div className="flex items-center gap-2" data-api-unique-id='catalogstocksection-rfda94bf355d9657b-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <span className="inline-flex h-6 items-center px-2.5 rounded bg-accent text-accent-foreground text-xs font-black font-display" data-api-unique-id='catalogstocksection-rafbe5859017e304e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                Iris
              </span>
              <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='catalogstocksection-r243843ab23691127-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                ({irisStocks.length} مقاس معتمد)
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='catalogstocksection-r5704dbffd92a1072-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>الإنتاج الوطني الجزائري</span>
          </div>

          <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='catalogstocksection-r6eee3b488ffaecce-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <table className="w-full text-right text-xs border-collapse min-w-[500px]" data-api-unique-id='catalogstocksection-r8b094ef350319b61-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <thead data-api-unique-id='catalogstocksection-r5992a89d8c1fbafd-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <tr className="border-b border-border text-muted-foreground bg-secondary/50" data-api-unique-id='catalogstocksection-r2d8d6a0e59288234-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <th className="p-2 font-semibold" data-api-unique-id='catalogstocksection-r4c3846afda22e4fc-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>المقاس / الفئة</th>
                  <th className="p-2 font-semibold" data-api-unique-id='catalogstocksection-rfeb41b1772c453cd-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>السعر الرسمي</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-rce4c2cdde972d359-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>المتوفر / المحجوز</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-rd1cd3aec04df9cb0-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>التوفر</th>
                  <th className="p-2 font-semibold text-center" data-api-unique-id='catalogstocksection-r5a2128e415e85af9-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60" data-api-unique-id='catalogstocksection-r87f42b5eccc0d96e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                {irisStocks.map((item, index) => {
                const isLow = item.availableStock <= item.minThreshold;
                return <tr key={item.id} className="hover:bg-secondary/30 transition-colors" data-api-unique-id='catalogstocksection-r4a9eeb615654f934-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                      <td className="p-2.5" data-api-unique-id='catalogstocksection-r4822ded01ca2f2ec-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <div className="flex flex-col font-mono" data-api-unique-id='catalogstocksection-r0585cb80e0919f9d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <span className="font-bold text-foreground" data-api-unique-id='catalogstocksection-rdbcf93315f35d914-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`irisStocks-${index}-size`} data-api-map-var-name='item'>{item.size}</span>
                          <span className="text-[10px] text-muted-foreground font-sans" data-api-unique-id='catalogstocksection-rd373f141f6a5f2dc-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                            {categoryLabels[item.category]} • {item.speedIndex ? `مؤشر ${item.speedIndex}` : "قياسي"}
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 font-mono whitespace-nowrap" data-api-unique-id='catalogstocksection-r3b07f51be34152ba-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <span className="font-semibold text-foreground" data-api-unique-id='catalogstocksection-re5f6ee9a10b28fe6-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          {item.priceDzd.toLocaleString("ar-DZ")} دج
                        </span>
                      </td>

                      <td className="p-2.5 text-center font-mono" data-api-unique-id='catalogstocksection-red0673774b5d2f3d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <div className="flex items-center justify-center gap-1.5" data-api-unique-id='catalogstocksection-r6c4cbd152ad45d55-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${isLow ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground"}`} title={isLow ? `تنبيه: المخزون تحت حد الأمان (${item.minThreshold})` : "مخزون متاح"} data-api-unique-id='catalogstocksection-r3533514df1447ffc-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`irisStocks-${index}-availableStock`} data-api-map-var-name='item'>
                            {item.availableStock}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono" title="المخزون المحجوز للطلبيات" data-api-unique-id='catalogstocksection-r8baf0e62390166ee-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' data-api-bind-info={`irisStocks-${index}-reservedStock`} data-api-map-var-name='item'>
                            (حجز: {item.reservedStock})
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 text-center" data-api-unique-id='catalogstocksection-r5b52372d91d5fe9c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <button type="button" onClick={() => onToggleAvailability(item.id)} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${item.isAvailable && item.availableStock > 0 ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`} data-api-unique-id='catalogstocksection-rfff26bc4ed68550c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          {item.isAvailable && item.availableStock > 0 ? "متوفر" : "غير متوفر"}
                        </button>
                      </td>

                      <td className="p-2.5 text-center" data-api-unique-id='catalogstocksection-r6437eae134695614-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                        <button type="button" onClick={() => handleOpenEdit(item)} className="p-1.5 rounded border border-border bg-secondary hover:bg-muted text-secondary-foreground transition-colors" title="تعديل السعر والمخزون" data-api-unique-id='catalogstocksection-r08b8ea8bb9f34534-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1'>
                          <Edit className="h-3.5 w-3.5" data-api-unique-id='catalogstocksection-rf643d8bd29bc9f43-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' data-api-in-loop='1' />
                        </button>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Stock Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen} data-api-unique-id='catalogstocksection-r7913a2ef9ca0c009-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md bg-card text-card-foreground border-border" data-api-unique-id='catalogstocksection-r1bb616c5cf852654-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <DialogHeader data-api-unique-id='catalogstocksection-r59e7cb391674d664-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='catalogstocksection-r2e2beab6fa00dafe-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              تعديل سعر ومخزون المقاس ({selectedStockForEdit?.size})
            </DialogTitle>
          </DialogHeader>

          {selectedStockForEdit && <div className="space-y-4 text-xs" data-api-unique-id='catalogstocksection-re65fe4d4c9f6c9b5-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <div className="flex items-center justify-between p-2.5 rounded bg-secondary border border-border" data-api-unique-id='catalogstocksection-r5db716d194757409-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <span className="text-muted-foreground" data-api-unique-id='catalogstocksection-rc86a27d731be4362-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>العلامة التجارية:</span>
                <span className="font-bold text-foreground" data-api-unique-id='catalogstocksection-r98daf0af236361ce-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>{selectedStockForEdit.brand}</span>
              </div>

              <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r71aeea859c23ee8d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-r7542416fc431fb8e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>السعر بالدينار الجزائري (دج)</label>
                <input type="number" value={selectedStockForEdit.priceDzd} onChange={e => setSelectedStockForEdit(prev => prev ? {
              ...prev,
              priceDzd: Number(e.target.value)
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-r73ba2d7ed74c2ac5-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
              </div>

              <div className="grid grid-cols-2 gap-2.5" data-api-unique-id='catalogstocksection-r1e1b506e2ff018ab-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r76c428ea65dbf9cb-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-r1d9316de59d6c908-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>الكمية المتوفرة بالمخزون</label>
                  <input type="number" value={selectedStockForEdit.availableStock} onChange={e => setSelectedStockForEdit(prev => prev ? {
                ...prev,
                availableStock: Number(e.target.value)
              } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-rfc1ac4c3af0542a3-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
                </div>

                <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r5d5cc48e53873ead-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-refdeda251a95b3e8-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>حد التنبيه الأدنى</label>
                  <input type="number" value={selectedStockForEdit.minThreshold} onChange={e => setSelectedStockForEdit(prev => prev ? {
                ...prev,
                minThreshold: Number(e.target.value)
              } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-r8347767b73b257ae-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded border border-border bg-secondary" data-api-unique-id='catalogstocksection-r9351e841284d3583-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <span className="font-medium text-foreground" data-api-unique-id='catalogstocksection-r5f3ba7022cf0fafe-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>حالة التوفر للطلب العام</span>
                <button type="button" onClick={() => setSelectedStockForEdit(prev => prev ? {
              ...prev,
              isAvailable: !prev.isAvailable
            } : null)} className={`px-3 py-1 rounded-full text-xs font-bold ${selectedStockForEdit.isAvailable ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`} data-api-unique-id='catalogstocksection-r5ec79aff112f6a61-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  {selectedStockForEdit.isAvailable ? "متوفر حالياً" : "غير متوفر"}
                </button>
              </div>
            </div>}

          <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='catalogstocksection-rc82675796e02f812-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='catalogstocksection-r465a3c03ab0954d9-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              إلغاء
            </button>
            <button type="button" onClick={handleSaveEdit} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='catalogstocksection-r40b063a985766e51-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              حفظ التعديلات
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Stock Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} data-api-unique-id='catalogstocksection-ra4b9d4a9d5f5edb1-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md bg-card text-card-foreground border-border" data-api-unique-id='catalogstocksection-r81c1e8a966a8469c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
          <DialogHeader data-api-unique-id='catalogstocksection-ra22eb23a52a8cd50-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='catalogstocksection-r16377dd0a9991688-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              إضافة مقاس إطار جديد إلى الكتالوج الرسمي
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3.5 text-xs" data-api-unique-id='catalogstocksection-r36ad9a431cbfc7fe-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r361352e8421c6423-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-raf62bf469ee0f929-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>العلامة المعتمدة</label>
              <Select value={newBrand} onValueChange={val => setNewBrand(val as TireBrand)} data-api-unique-id='catalogstocksection-rc9badffcc3e715ab-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='catalogstocksection-r47a4c05dbef507a0-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <SelectValue placeholder="اختر العلامة" data-api-unique-id='catalogstocksection-r0231a54af44729ff-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                    {newBrand === "CONTINENTAL" ? "Continental" : "Iris"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='catalogstocksection-rb8a80ad5ba0d776d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <SelectItem value="CONTINENTAL" data-api-unique-id='catalogstocksection-rd137cd31f6ab3c31-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>Continental</SelectItem>
                  <SelectItem value="IRIS" data-api-unique-id='catalogstocksection-r157a2f2b0c6ea9cf-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>Iris</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r1b28cdfc93cd14cd-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-rce3f23d5d707576e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>المقاس القياسي (مثال: 225/45 R17)</label>
              <input type="text" placeholder="205/55 R16 91V" value={newSize} onChange={e => setNewSize(e.target.value)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-rd7105a4ab9b7326f-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
            </div>

            <div className="grid grid-cols-2 gap-2.5" data-api-unique-id='catalogstocksection-r6b3aee6c16ff184f-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r551aae49eca69d93-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-raa061da2312cb08c-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>الفئة</label>
                <Select value={newCategory} onValueChange={val => setNewCategory(val as TireCategory)} data-api-unique-id='catalogstocksection-r91fad3530a8350c0-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                  <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='catalogstocksection-rd9a50af1a6d80968-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                    <SelectValue placeholder="الفئة" data-api-unique-id='catalogstocksection-rb0c4c9bedca8e85e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>{categoryLabels[newCategory]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='catalogstocksection-rb056c3b53c7c381d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                    <SelectItem value="TOURISM" data-api-unique-id='catalogstocksection-r60898a72ace686a6-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>سياحية</SelectItem>
                    <SelectItem value="UTILITY" data-api-unique-id='catalogstocksection-r01471e8318e01e4e-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>نفعية</SelectItem>
                    <SelectItem value="SUV" data-api-unique-id='catalogstocksection-r11d43d1ad94880cf-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>رباعية الدفع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r384c8547866c5310-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-r66e227e6803d7ca2-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>مؤشر السرعة / الحمولة</label>
                <input type="text" placeholder="91V" value={newSpeedIndex} onChange={e => setNewSpeedIndex(e.target.value)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-re957248859661bf1-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5" data-api-unique-id='catalogstocksection-r91b7d848c1d53aca-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              <div className="space-y-1.5" data-api-unique-id='catalogstocksection-rdd41970523d13053-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-rd6a281cac52bb0e4-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>السعر بالدينار (دج)</label>
                <input type="number" value={newPrice} onChange={e => setNewPrice(Number(e.target.value))} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-rd895c8055ae6a2ee-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
              </div>

              <div className="space-y-1.5" data-api-unique-id='catalogstocksection-r37764798919e96a5-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='catalogstocksection-r882f31d563d3aed7-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>الكمية الابتدائية بالمخزون</label>
                <input type="number" value={newStockCount} onChange={e => setNewStockCount(Number(e.target.value))} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='catalogstocksection-r1222ca1d12a7547d-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection' />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='catalogstocksection-r61a63bb71c00c126-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='catalogstocksection-rdebade0eeca932de-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              إلغاء
            </button>
            <button type="button" onClick={handleCreateNewStock} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='catalogstocksection-r452a2a9a3c07dac2-s1880327250' data-api-unique-page-name='src/backend/components/AdminDashboard/CatalogStockSection'>
              إضافة إلى الكتالوج
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>;
}