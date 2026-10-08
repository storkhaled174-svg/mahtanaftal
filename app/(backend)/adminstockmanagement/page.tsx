"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { StockFilterState, StockKpiData, TireStockDto } from "../types/AdminStockManagement";
import { getStockManagementData, createTireStock, updateTireStock, toggleTireAvailability } from "../actions/AdminStockManagement";
import HeaderSection from "../components/AdminStockManagement/HeaderSection";
import KpiMetricCards from "../components/AdminStockManagement/KpiMetricCards";
import FilterToolbar from "../components/AdminStockManagement/FilterToolbar";
import StockTable from "../components/AdminStockManagement/StockTable";
import CreateStockDrawer, { NewTireStockPayload } from "../components/AdminStockManagement/CreateStockDrawer";
import EditStockModal from "../components/AdminStockManagement/EditStockModal";

const formatSyncTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export default function AdminStockManagementPage() {
  const [items, setItems] = useState<TireStockDto[]>([]);
  const [kpi, setKpi] = useState<StockKpiData>({
    totalSizes: 0,
    totalAvailable: 0,
    totalReserved: 0,
    criticalAlertCount: 0,
    continentalCount: 0,
    irisCount: 0,
    totalInventoryValueDzd: 0
  });
  const [lastSyncTime, setLastSyncTime] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // حالة النوافذ المنبثقة
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TireStockDto | null>(null);

  // حالة التصفية والفرز
  const [filters, setFilters] = useState<StockFilterState>({
    searchQuery: "",
    brand: "ALL",
    category: "ALL",
    availability: "ALL",
    stockLevel: "ALL",
    sortBy: "availableStock",
    sortOrder: "asc"
  });

  // جلب البيانات من الخادم
  const loadDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    try {
      const data = await getStockManagementData();
      if (data) {
        setItems(data.items || []);
        setKpi(data.kpi || {
          totalSizes: 0,
          totalAvailable: 0,
          totalReserved: 0,
          criticalAlertCount: 0,
          continentalCount: 0,
          irisCount: 0,
          totalInventoryValueDzd: 0
        });
        const sTime = data.serverTime instanceof Date ? data.serverTime : new Date(data.serverTime);
        setLastSyncTime(formatSyncTime(sTime));
        if (isManualRefresh) {
          toast.success("تم تحديث بيانات المخزون والمقاسات بنجاح من قاعدة البيانات");
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل تحميل بيانات المخزون والمقاسات");
    } finally {
      if (isManualRefresh) {
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    loadDashboardData(false);
  }, [loadDashboardData]);

  // تحديث البيانات يدوياً
  const handleRefresh = () => {
    loadDashboardData(true);
  };

  // تصفية وفرز البيانات المعروضة
  const filteredAndSortedItems = useMemo(() => {
    return items.filter(item => {
      // بحث بالاسم أو كود السرعة أو المعرف
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchSize = item.size.toLowerCase().includes(q);
        const matchSpeed = (item.speedIndex ?? "").toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        if (!matchSize && !matchSpeed && !matchId) return false;
      }

      // تصفية بالعلامة التجارية
      if (filters.brand !== "ALL" && item.brand !== filters.brand) {
        return false;
      }

      // تصفية بصنف المركبة
      if (filters.category !== "ALL" && item.category !== filters.category) {
        return false;
      }

      // تصفية بحالة التوفر بالمحطات
      if (filters.availability === "AVAILABLE" && !item.isAvailable) return false;
      if (filters.availability === "UNAVAILABLE" && item.isAvailable) return false;

      // تصفية بمستوى المخزون
      if (filters.stockLevel === "LOW_STOCK") {
        if (item.availableStock === 0 || item.availableStock > item.minThreshold) return false;
      } else if (filters.stockLevel === "OUT_OF_STOCK") {
        if (item.availableStock !== 0) return false;
      } else if (filters.stockLevel === "NORMAL") {
        if (item.availableStock <= item.minThreshold) return false;
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === "size") {
        comparison = a.size.localeCompare(b.size);
      } else if (filters.sortBy === "priceDzd") {
        comparison = a.priceDzd - b.priceDzd;
      } else if (filters.sortBy === "availableStock") {
        comparison = a.availableStock - b.availableStock;
      } else if (filters.sortBy === "updatedAt") {
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });
  }, [items, filters]);

  // إضافة مقاس إطار جديد
  const handleCreateNewStock = async (payload: NewTireStockPayload) => {
    try {
      await createTireStock({
        brand: payload.brand,
        size: payload.size,
        category: payload.category,
        priceDzd: payload.priceDzd,
        availableStock: payload.availableStock,
        minThreshold: payload.minThreshold,
        speedIndex: payload.speedIndex
      });
      toast.success(`تم تسجيل مقاس الإطار الجديد بنجاح (${payload.size} - ${payload.brand})`);
      setIsCreateDrawerOpen(false);
      await loadDashboardData(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل تسجيل مقاس الإطار الجديد");
    }
  };

  // تعديل مقاس ومخزون وسعر
  const handleEditStock = async (payload: {
    id: string;
    priceDzd: number;
    availableStock: number;
    minThreshold: number;
    isAvailable: boolean;
  }) => {
    try {
      await updateTireStock({
        id: payload.id,
        priceDzd: payload.priceDzd,
        availableStock: payload.availableStock,
        minThreshold: payload.minThreshold,
        isAvailable: payload.isAvailable
      });
      toast.success("تم حفظ تحديثات السعر والمخزون بنجاح");
      setEditingItem(null);
      await loadDashboardData(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل تحديث بيانات المقاس");
    }
  };

  // التبديل اليدوي لحالة التوفر مع التحقق من قاعدة عدم النفاد
  const handleToggleAvailability = async (item: TireStockDto) => {
    if (item.availableStock === 0 && !item.isAvailable) {
      toast.error("لا يمكن تفعيل توفر المقاس بالمحطات بينما المخزون الحالي يساوي 0 (تجميد آلي صارم لنفطال)");
      return;
    }
    const nextState = !item.isAvailable;
    try {
      await toggleTireAvailability({
        id: item.id,
        isAvailable: nextState
      });
      if (nextState) {
        toast.success(`تم تفعيل توفر مقاس ${item.size} للحجز بمحطات نفطال`);
      } else {
        toast.info(`تم تعليق توفر مقاس ${item.size} مؤقتاً بالمحطات`);
      }
      await loadDashboardData(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل تغيير حالة التوفر");
    }
  };

  // تصفية سريعة للتنبيهات الحرجة
  const handleFilterAlerts = () => {
    setFilters(prev => ({
      ...prev,
      stockLevel: prev.stockLevel === "LOW_STOCK" ? "ALL" : "LOW_STOCK"
    }));
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
      <div className="flex min-w-0 flex-col gap-6">
        {/* 1. رأس الصفحة والتحكم العام */}
        <HeaderSection lastSyncTime={lastSyncTime} isRefreshing={isRefreshing} onRefresh={handleRefresh} onOpenCreateDrawer={() => setIsCreateDrawerOpen(true)} />

        {/* 2. شريط المؤشرات الإحصائية لمخزون الإطارات (KPIs) */}
        <KpiMetricCards kpi={kpi} onFilterAlerts={handleFilterAlerts} />

        {/* 3. شريط التصفية والبحث والفرز المتقدم */}
        <div data-controller-name="جدول متكامل لإدارة مقاسات وأسعار ومخزون الإطارات" className="flex min-w-0 flex-col gap-4">
          <FilterToolbar filters={filters} onFilterChange={newFilters => setFilters(prev => ({
          ...prev,
          ...newFilters
        }))} onResetFilters={() => setFilters({
          searchQuery: "",
          brand: "ALL",
          category: "ALL",
          availability: "ALL",
          stockLevel: "ALL",
          sortBy: "availableStock",
          sortOrder: "asc"
        })} totalFilteredCount={filteredAndSortedItems.length} totalAllCount={items.length} />

          {/* 4. جدول إدارة مقاسات وأسعار ومخزون الإطارات */}
          <StockTable items={filteredAndSortedItems} onEditItem={item => setEditingItem(item)} onToggleAvailability={handleToggleAvailability} onSortChange={col => {
          setFilters(prev => ({
            ...prev,
            sortBy: col,
            sortOrder: prev.sortBy === col && prev.sortOrder === "asc" ? "desc" : "asc"
          }));
        }} currentSortBy={filters.sortBy} currentSortOrder={filters.sortOrder} />
        </div>
      </div>

      {/* 5. درج إضافة مقاس إطار جديد */}
      <CreateStockDrawer isOpen={isCreateDrawerOpen} onClose={() => setIsCreateDrawerOpen(false)} onSubmit={handleCreateNewStock} />

      {/* 6. نافذة تعديل السعر والمخزون وحد التنبيه */}
      <EditStockModal item={editingItem} isOpen={editingItem !== null} onClose={() => setEditingItem(null)} onSubmit={handleEditStock} />
    </div>
  );
}
