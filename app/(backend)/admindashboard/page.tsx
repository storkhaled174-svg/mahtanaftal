"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { OrderItem, OrderStatus, TireSizeStock, WilayaData, PlatformFaqItem, SupportChannelItem, FilterState, KpiSummary } from "@/backend/types/AdminDashboard";
import { getAdminDashboardData, updateOrderStatus, updateOrderDetails, deleteOrder, addTireStock, updateTireStock, toggleStockAvailability, addPlatformFaq, updatePlatformFaq, deletePlatformFaq, updateSupportChannel } from "@/backend/actions/AdminDashboard";
import KpiSection from "@/backend/components/AdminDashboard/KpiSection";
import FiltersSection from "@/backend/components/AdminDashboard/FiltersSection";
import OrdersTableSection from "@/backend/components/AdminDashboard/OrdersTableSection";
import CatalogStockSection from "@/backend/components/AdminDashboard/CatalogStockSection";
import ContentSupportSection from "@/backend/components/AdminDashboard/ContentSupportSection";
import CustomerModal from "@/backend/components/AdminDashboard/CustomerModal";
import EditOrderModal from "@/backend/components/AdminDashboard/EditOrderModal";
import { useRouter } from 'next/navigation';
import { useAdminSession } from '@/tools/BackendSession';
import { changeAdminPassword } from '@/backend/actions/AdminLogin';
import AdminLockScreen from "@/backend/components/AdminDashboard/AdminLockScreen";
import AdminSecurityBar from "@/backend/components/AdminDashboard/AdminSecurityBar";
import UpdatePasswordModal from "@/backend/components/AdminDashboard/UpdatePasswordModal";
interface UiFaqItem {
  id: string;
  question: string;
  answer: string;
  category: "ORDERS" | "PAYMENT" | "DELIVERY" | "WARRANTY";
  isActive: boolean;
  updatedAt: string;
}
interface UiSupportChannel {
  id: string;
  title: string;
  value: string;
  description?: string;
  isActive: boolean;
}
function mapOrderToUi(o: OrderItem): OrderItem {
  return {
    ...o,
    secondaryPhone: o.secondaryPhone || "",
    notes: o.notes || null,
    customerId: o.customerId || null,
    createdAt: o.createdAt ? new Date(o.createdAt) : new Date(),
    updatedAt: o.updatedAt ? new Date(o.updatedAt) : new Date()
  };
}
function mapFaqToUi(f: PlatformFaqItem): UiFaqItem {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    isActive: f.isActive,
    updatedAt: f.updatedAt ? f.updatedAt instanceof Date ? f.updatedAt.toISOString().split("T")[0] : String(f.updatedAt).split("T")[0] : new Date().toISOString().split("T")[0]
  };
}
function mapChannelToUi(c: SupportChannelItem): UiSupportChannel {
  return {
    id: c.id,
    title: c.title,
    value: c.value,
    description: c.description || undefined,
    isActive: c.isActive
  };
}
export default function AdminDashboardPage() {
  const router = useRouter();
  const session = useAdminSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Security Lock State for Orders Management
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Password Update Modal State
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState<boolean>(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>("");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [updateError, setUpdateError] = useState<string>("");

  useEffect(() => {
    setAuthChecked(session._hasHydrated);
    setIsAuthenticated(Boolean(session.token) && session.role === 'ADMIN');
  }, [session.token, session.role, session._hasHydrated]);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    router.replace('/adminlogin/');
  };
  const handleLockAndExit = async () => {
    await fetch('/api/admin/logout', {method:'POST'});
    session.reset();
    router.replace('/adminlogin/');
  };
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError('');
    if (newPasswordInput !== confirmPasswordInput) { setUpdateError('تأكيد كلمة السر الجديدة غير متطابق'); return; }
    try {
      await changeAdminPassword({currentPassword:currentPasswordInput,newPassword:newPasswordInput});
      toast.success('تم تحديث كلمة السر في الحساب الإداري');
      setIsUpdatePasswordOpen(false);
      setCurrentPasswordInput(''); setNewPasswordInput(''); setConfirmPasswordInput('');
    } catch (error) { setUpdateError(error instanceof Error ? error.message : 'تعذر تحديث كلمة السر'); }
  };

  // State Management for Operational Entities
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [stocks, setStocks] = useState<TireSizeStock[]>([]);
  const [faqs, setFaqs] = useState<UiFaqItem[]>([]);
  const [channels, setChannels] = useState<UiSupportChannel[]>([]);
  const [wilayas, setWilayas] = useState<WilayaData[]>([]);

  // Modals state
  const [selectedOrderForCustomer, setSelectedOrderForCustomer] = useState<OrderItem | null>(null);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<OrderItem | null>(null);

  // Advanced Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    phone: "",
    orderNumber: "",
    wilaya: "ALL",
    commune: "ALL",
    status: "ALL",
    brand: "ALL"
  });

  // Refresh from the same database while the administrator is signed in.
  useEffect(() => {
    if (!authChecked || !isAuthenticated) return;
    let isMounted = true;
    let inFlight = false;
    async function loadDashboardData() {
      if (inFlight || document.visibilityState === 'hidden') return;
      inFlight = true;
      try {
        const data = await getAdminDashboardData();
        if (isMounted && data) {
          setOrders(data.orders.map(mapOrderToUi));
          setStocks(data.stocks);
          setFaqs(data.faqs.map(mapFaqToUi));
          setChannels(data.channels.map(mapChannelToUi));
          if (data.wilayas) {
            setWilayas(data.wilayas);
          }
        }
      } catch (err) {
        console.error("Failed to load admin dashboard data:", err);
        toast.error("فشل في استرجاع بيانات لوحة الإدارة");
      } finally {
        inFlight = false;
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    void loadDashboardData();
    const timer = window.setInterval(() => void loadDashboardData(), 15000);
    const refreshWhenVisible = () => { void loadDashboardData(); };
    document.addEventListener('visibilitychange', refreshWhenVisible);
    window.addEventListener('focus', refreshWhenVisible);
    return () => {
      isMounted = false;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      window.removeEventListener('focus', refreshWhenVisible);
    };
  }, [authChecked, isAuthenticated]);

  // KPI Computations
  const kpiSummary: KpiSummary = useMemo(() => {
    const total = orders.length;
    const newCount = orders.filter(o => o.status === "NEW").length;
    const procCount = orders.filter(o => o.status === "PROCESSING").length;
    const compCount = orders.filter(o => o.status === "COMPLETED").length;
    const cancCount = orders.filter(o => o.status === "CANCELLED").length;
    const availableTires = stocks.reduce((acc, s) => acc + (s.isAvailable ? s.availableStock : 0), 0);
    const totalTires = stocks.reduce((acc, s) => acc + s.availableStock, 0);
    const rate = totalTires > 0 ? Math.round(availableTires / totalTires * 100) : 0;
    const lowStockAlerts = stocks.filter(s => s.availableStock <= s.minThreshold).length;
    const totalRevenue = orders.filter(o => o.status === "COMPLETED").reduce((acc, o) => acc + o.totalPriceDzd, 0);
    return {
      totalOrders: total,
      newOrders: newCount,
      processingOrders: procCount,
      completedOrders: compCount,
      cancelledOrders: cancCount,
      stockAvailabilityRate: rate,
      totalRevenueDzd: totalRevenue,
      totalAvailableTires: availableTires,
      lowStockAlertCount: lowStockAlerts
    };
  }, [orders, stocks]);

  // Filtered Orders Computation
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Search Query (Name)
      if (filters.searchQuery.trim() !== "" && !order.customerName.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // 2. Phone
      if (filters.phone.trim() !== "" && !order.phoneNumber.includes(filters.phone.trim()) && !(order.secondaryPhone && order.secondaryPhone.includes(filters.phone.trim()))) {
        return false;
      }

      // 3. Order Number
      if (filters.orderNumber.trim() !== "" && !order.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase())) {
        return false;
      }

      // 4. Wilaya
      if (filters.wilaya !== "ALL" && order.wilaya !== filters.wilaya) {
        return false;
      }

      // 5. Commune
      if (filters.commune !== "ALL" && order.commune !== filters.commune) {
        return false;
      }

      // 6. Status
      if (filters.status !== "ALL" && order.status !== filters.status) {
        return false;
      }

      // 7. Brand
      if (filters.brand !== "ALL" && order.brand !== filters.brand) {
        return false;
      }
      return true;
    });
  }, [orders, filters]);

  // Handlers for Orders lifecycle & stock quota deductions
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;
    const oldStatus = targetOrder.status;
    if (oldStatus === newStatus) return;
    try {
      const updated = await updateOrderStatus({
        orderId,
        newStatus
      });
      if (updated) {
        setOrders(prev => prev.map((o, index) => o.id === orderId ? mapOrderToUi(updated) : o));

        // Synchronize stock quotas locally
        setStocks(prevStocks => {
          return prevStocks.map((stock, index) => {
            if (stock.size === targetOrder.tireSize && stock.brand === targetOrder.brand) {
              let avail = stock.availableStock;
              let reserved = stock.reservedStock;

              // From NEW to PROCESSING (allocate quota)
              if (oldStatus === "NEW" && newStatus === "PROCESSING") {
                avail = Math.max(0, avail - targetOrder.quantity);
                reserved += targetOrder.quantity;
              }
              // From PROCESSING to COMPLETED (confirm delivery)
              else if (oldStatus === "PROCESSING" && newStatus === "COMPLETED") {
                reserved = Math.max(0, reserved - targetOrder.quantity);
              }
              // From PROCESSING to CANCELLED (release reserved stock)
              else if (oldStatus === "PROCESSING" && newStatus === "CANCELLED") {
                reserved = Math.max(0, reserved - targetOrder.quantity);
                avail += targetOrder.quantity;
              }
              // From COMPLETED to CANCELLED (admin recovery)
              else if (oldStatus === "COMPLETED" && newStatus === "CANCELLED") {
                avail += targetOrder.quantity;
              }
              return {
                ...stock,
                availableStock: avail,
                reservedStock: reserved,
                isAvailable: avail > 0
              };
            }
            return stock;
          });
        });
        const statusLabels: Record<OrderStatus, string> = {
          NEW: "جديدة",
          PROCESSING: "قيد المعالجة وتخصيص الحصة",
          COMPLETED: "مكتملة ومسلمة بالمحطة",
          CANCELLED: "ملغية"
        };
        toast.success(`تم تحديث حالة الطلبية ${updated.orderNumber} إلى: ${statusLabels[newStatus]}`);
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      toast.error("حدث خطأ أثناء تحديث حالة الطلبية");
    }
  };
  const handleDeleteOrder = async (orderId: string) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;
    try {
      const res = await deleteOrder(orderId);
      if (res?.success) {
        // Revert reserved stock if order was in PROCESSING
        if (target.status === "PROCESSING") {
          setStocks(prev => prev.map((s, index) => {
            if (s.size === target.tireSize && s.brand === target.brand) {
              return {
                ...s,
                reservedStock: Math.max(0, s.reservedStock - target.quantity),
                availableStock: s.availableStock + target.quantity,
                isAvailable: true
              };
            }
            return s;
          }));
        }
        setOrders(prev => prev.filter(o => o.id !== orderId));
        toast.success(`تم حذف سجل الطلبية ${target.orderNumber} بنجاح`);
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("حدث خطأ أثناء حذف الطلبية");
    }
  };
  const handleSaveEditedOrder = async (updatedOrder: OrderItem) => {
    try {
      const saved = await updateOrderDetails({
        orderId: updatedOrder.id,
        customerName: updatedOrder.customerName,
        phoneNumber: updatedOrder.phoneNumber,
        secondaryPhone: updatedOrder.secondaryPhone || undefined,
        wilaya: updatedOrder.wilaya,
        commune: updatedOrder.commune,
        brand: updatedOrder.brand,
        tireSize: updatedOrder.tireSize,
        quantity: updatedOrder.quantity,
        status: updatedOrder.status,
        notes: updatedOrder.notes || undefined
      });
      if (saved) {
        setOrders(prev => prev.map((o, index) => o.id === saved.id ? mapOrderToUi(saved) : o));
        setSelectedOrderForEdit(null);
        toast.success(`تم حفظ تعديلات الطلبية ${saved.orderNumber} بنجاح`);
      }
    } catch (err) {
      console.error("Failed to save edited order:", err);
      toast.error("حدث خطأ أثناء حفظ تعديلات الطلبية");
    }
  };

  // Handlers for Stocks
  const handleUpdateStock = async (updatedStock: TireSizeStock) => {
    try {
      const saved = await updateTireStock({
        stockId: updatedStock.id,
        priceDzd: updatedStock.priceDzd,
        availableStock: updatedStock.availableStock,
        minThreshold: updatedStock.minThreshold,
        isAvailable: updatedStock.isAvailable
      });
      if (saved) {
        setStocks(prev => prev.map((s, index) => s.id === saved.id ? saved : s));
        toast.success(`تم تحديث بيانات المخزون للمقاس ${saved.size} بنجاح`);
      }
    } catch (err) {
      console.error("Failed to update tire stock:", err);
      toast.error("حدث خطأ أثناء تحديث بيانات المخزون");
    }
  };
  const handleAddStock = async (newStock: Omit<TireSizeStock, "id">) => {
    try {
      const created = await addTireStock({
        brand: newStock.brand,
        size: newStock.size,
        category: newStock.category,
        priceDzd: newStock.priceDzd,
        availableStock: newStock.availableStock,
        minThreshold: newStock.minThreshold,
        speedIndex: newStock.speedIndex || undefined
      });
      if (created) {
        setStocks(prev => [created, ...prev]);
        toast.success(`تمت إضافة المقاس ${created.size} إلى المخزون بنجاح`);
      }
    } catch (err) {
      console.error("Failed to add tire stock:", err);
      toast.error("حدث خطأ أثناء إضافة المقاس الجديد");
    }
  };
  const handleToggleStockAvailability = async (stockId: string) => {
    try {
      const updated = await toggleStockAvailability(stockId);
      if (updated) {
        setStocks(prev => prev.map((s, index) => s.id === updated.id ? updated : s));
        toast.success(`تم تغيير حالة توفر ${updated.brand} (${updated.size}) إلى: ${updated.isAvailable ? "متوفر" : "غير متوفر"}`);
      }
    } catch (err) {
      console.error("Failed to toggle stock availability:", err);
      toast.error("حدث خطأ أثناء تعديل حالة التوفر");
    }
  };

  // Handlers for FAQ & Support Channels
  const handleAddFaq = async (faqData: Omit<UiFaqItem, "id" | "updatedAt">) => {
    try {
      const created = await addPlatformFaq({
        question: faqData.question,
        answer: faqData.answer,
        category: faqData.category
      });
      if (created) {
        setFaqs(prev => [mapFaqToUi(created), ...prev]);
        toast.success("تمت إضافة السؤال الشائع بنجاح");
      }
    } catch (err) {
      console.error("Failed to add FAQ:", err);
      toast.error("حدث خطأ أثناء إضافة السؤال الشائع");
    }
  };
  const handleUpdateFaq = async (updatedFaq: UiFaqItem) => {
    try {
      const saved = await updatePlatformFaq({
        faqId: updatedFaq.id,
        question: updatedFaq.question,
        answer: updatedFaq.answer,
        category: updatedFaq.category,
        isActive: updatedFaq.isActive
      });
      if (saved) {
        setFaqs(prev => prev.map((f, index) => f.id === saved.id ? mapFaqToUi(saved) : f));
        toast.success("تم تحديث السؤال الشائع بنجاح");
      }
    } catch (err) {
      console.error("Failed to update FAQ:", err);
      toast.error("حدث خطأ أثناء تحديث السؤال الشائع");
    }
  };
  const handleDeleteFaq = async (id: string) => {
    try {
      const res = await deletePlatformFaq(id);
      if (res?.success) {
        setFaqs(prev => prev.filter(f => f.id !== id));
        toast.success("تم حذف السؤال الشائع بنجاح");
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
      toast.error("حدث خطأ أثناء حذف السؤال الشائع");
    }
  };
  const handleUpdateChannel = async (updatedChannel: UiSupportChannel) => {
    try {
      const saved = await updateSupportChannel({
        channelId: updatedChannel.id,
        title: updatedChannel.title,
        value: updatedChannel.value,
        description: updatedChannel.description,
        isActive: updatedChannel.isActive
      });
      if (saved) {
        setChannels(prev => prev.map((c, index) => c.id === saved.id ? mapChannelToUi(saved) : c));
        toast.success("تم تحديث قناة الدعم بنجاح");
      }
    } catch (err) {
      console.error("Failed to update support channel:", err);
      toast.error("حدث خطأ أثناء تحديث قناة الدعم");
    }
  };
  const handleExportCsv = () => {
    if (filteredOrders.length === 0) {
      toast.error("لا توجد سجلات مطابقة للتصدير");
      return;
    }
    const headers = ["رقم الطلبية", "الاسم واللقب", "رقم الهاتف", "الولاية", "البلدية", "العلامة", "المقاس", "الكمية", "سعر الوحدة (دج)", "المبلغ الإجمالي (دج)", "رقم التعريف الوطني", "الحالة", "تاريخ التسجيل"];
    const rows = filteredOrders.map((o, index) => {
      const regDate = o.createdAt ? o.createdAt instanceof Date ? o.createdAt.toISOString().split("T")[0] : String(o.createdAt).split("T")[0] : "";
      return [o.orderNumber, `"${o.customerName}"`, o.phoneNumber, `"${o.wilaya}"`, `"${o.commune}"`, o.brand, `"${o.tireSize}"`, o.quantity, o.unitPriceDzd, o.totalPriceDzd, `"${o.nationalIdNumber}"`, o.status, regDate];
    });
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e, index) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `naftal-mhatati-orders-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`تم تصدير ${filteredOrders.length} سجل طلبيات بصيغة CSV`);
  };
  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      phone: "",
      orderNumber: "",
      wilaya: "ALL",
      commune: "ALL",
      status: "ALL",
      brand: "ALL"
    });
    toast.info("تمت إعادة ضبط كافة فلاتر البحث");
  };

  if (authChecked && !isAuthenticated) {
    return (
      <AdminLockScreen
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isVerifying={isVerifying}
        onUnlock={handleUnlock}
      />
    );
  }

  if (isLoading || !authChecked) {
    return <div dir="rtl" className="w-full max-w-full min-w-0 min-h-screen p-4 lg:p-6 flex flex-col items-center justify-center gap-3 text-foreground bg-background font-body">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">جاري تحميل بيانات لوحة التحكم التشغيلي...</p>
      </div>;
  }
  return <div dir="rtl" className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-5 text-foreground bg-background font-body">
      {/* Sovereign Admin Security & Authentication Status Bar */}
      <AdminSecurityBar
        onOpenUpdatePassword={() => {
          setUpdateError("");
          setCurrentPasswordInput("");
          setNewPasswordInput("");
          setConfirmPasswordInput("");
          setIsUpdatePasswordOpen(true);
        }}
        onLockAndExit={handleLockAndExit}
      />

      {/* 1. Tactical KPIs Summary Bar */}
      <KpiSection summary={kpiSummary} selectedStatusFilter={filters.status} onSelectStatusFilter={status => setFilters(prev => ({
      ...prev,
      status
    }))} />

      {/* 2. Advanced Search & Filtering Bar */}
      <FiltersSection filters={filters} onFilterChange={setFilters} onResetFilters={handleResetFilters} onExportCsv={handleExportCsv} filteredCount={filteredOrders.length} totalCount={orders.length} wilayas={wilayas} />

      {/* 3. Official Sovereign Orders Table */}
      <OrdersTableSection orders={filteredOrders} onStatusChange={handleStatusChange} onOpenCustomerModal={order => setSelectedOrderForCustomer(order)} onOpenEditModal={order => setSelectedOrderForEdit(order)} onDeleteOrder={handleDeleteOrder} />

      {/* 4. Dual Brand Catalog & Stock Management (Continental & Iris) */}
      <CatalogStockSection stocks={stocks} onUpdateStock={handleUpdateStock} onAddStock={handleAddStock} onToggleAvailability={handleToggleStockAvailability} />

      {/* 5. Operational Content & Technical Readiness */}
      <ContentSupportSection faqs={faqs} channels={channels} onAddFaq={handleAddFaq} onUpdateFaq={handleUpdateFaq} onDeleteFaq={handleDeleteFaq} onUpdateChannel={handleUpdateChannel} />

      {/* Modals: Customer verification and order editing */}
      <CustomerModal order={selectedOrderForCustomer} isOpen={!!selectedOrderForCustomer} onClose={() => setSelectedOrderForCustomer(null)} />

      <EditOrderModal order={selectedOrderForEdit} stocks={stocks} wilayas={wilayas} isOpen={!!selectedOrderForEdit} onClose={() => setSelectedOrderForEdit(null)} onSave={handleSaveEditedOrder} />

      {/* Modal: Update Security Password */}
      <UpdatePasswordModal
        isOpen={isUpdatePasswordOpen}
        onClose={() => setIsUpdatePasswordOpen(false)}
        currentPasswordInput={currentPasswordInput}
        setCurrentPasswordInput={setCurrentPasswordInput}
        newPasswordInput={newPasswordInput}
        setNewPasswordInput={setNewPasswordInput}
        confirmPasswordInput={confirmPasswordInput}
        setConfirmPasswordInput={setConfirmPasswordInput}
        updateError={updateError}
        onSave={handleUpdatePassword}
      />
    </div>;
}
