"use client";

import React, { useState } from "react";
import { Eye, Edit2, Trash2, CreditCard, Phone, MapPin, Calendar, AlertTriangle, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { OrderItem, OrderStatus } from "@/backend/types/AdminDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface OrdersTableSectionProps {
  orders: OrderItem[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onOpenCustomerModal: (order: OrderItem) => void;
  onOpenEditModal: (order: OrderItem) => void;
  onDeleteOrder: (orderId: string) => void;
}
const statusBadgeClasses: Record<OrderStatus, {
  text: string;
  badge: string;
}> = {
  NEW: {
    text: "🟡 جديدة",
    badge: "bg-warning text-warning-foreground"
  },
  PROCESSING: {
    text: "🔵 قيد المعالجة",
    badge: "bg-secondary text-secondary-foreground"
  },
  COMPLETED: {
    text: "🟢 مكتملة",
    badge: "bg-success text-success-foreground"
  },
  CANCELLED: {
    text: "🔴 ملغية",
    badge: "bg-destructive text-destructive-foreground"
  }
};
export default function OrdersTableSection({
  orders,
  onStatusChange,
  onOpenCustomerModal,
  onOpenEditModal,
  onDeleteOrder
}: OrdersTableSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(orders.length / pageSize) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedOrders = orders.slice((validPage - 1) * pageSize, validPage * pageSize);
  const formatPrice = (price: number) => {
    return (price ?? 0).toLocaleString("ar-DZ") + " دج";
  };
  const formatDahabiaMasked = (num?: string) => {
    const clean = (num || "").replace(/\s+/g, "");
    if (clean.length < 16) return clean;
    return `${clean.slice(0, 4)} •••• •••• ${clean.slice(clean.length - 4)}`;
  };
  const formatOrderDate = (dateVal?: Date | string | null) => {
    if (!dateVal) return "";
    if (dateVal instanceof Date) {
      return dateVal.toLocaleDateString("ar-DZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    }
    const parsed = new Date(dateVal);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("ar-DZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    }
    return String(dateVal);
  };
  return <section className="w-full min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-sm flex flex-col gap-4" data-controller-name="جدول إدارة الطلبيات الشامل" data-api-unique-id='orderstablesection-rd06881a59bb3275b-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
      {/* Table Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-3" data-api-unique-id='orderstablesection-r6868ea3286ea1f32-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
        <div className="flex items-center gap-2" data-api-unique-id='orderstablesection-rafdddbe5c4d128b1-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground border border-border" data-api-unique-id='orderstablesection-r19b87e93d3ad4068-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            <SlidersHorizontal className="h-4 w-4 text-primary" data-api-unique-id='orderstablesection-r67815a2a91d57f46-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' />
          </div>
          <div data-api-unique-id='orderstablesection-rbcc9ec79b67ed813-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            <h2 className="font-header text-base sm:text-lg font-bold text-foreground" data-api-unique-id='orderstablesection-rd8228f3245d93c65-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              جدول تدفق طلبيات الإطارات الوطني (Live Operations Flow)
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='orderstablesection-r4767a960b34b524b-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              سجل الطلبات السيادي مع التحقق المشفر من بطاقة الذهبية (18 رقماً) ورقم الهوية الوطنية البيومترية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground" data-api-unique-id='orderstablesection-r99b3cda93ceca40d-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 border border-border" data-api-unique-id='orderstablesection-r385f01dd04a36d49-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            إجمالي السجلات: <strong className="text-foreground" data-api-unique-id='orderstablesection-re456e4fc6b3a3475-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-background" data-api-unique-id='orderstablesection-r6127d09fbc68cfae-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
        <table className="w-full text-right text-xs border-collapse min-w-[1100px]" data-api-unique-id='orderstablesection-ra72ca0f9e284a52f-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
          <thead data-api-unique-id='orderstablesection-r33384b77050c1dac-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            <tr className="border-b border-border bg-secondary/80 text-muted-foreground" data-api-unique-id='orderstablesection-rc6c5a5d17b15a008-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[130px]" data-api-unique-id='orderstablesection-rb3ef3f8fea15e7a1-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                رقم الطلبية
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[150px]" data-api-unique-id='orderstablesection-rdae835294956f4fb-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                العميل والهوية
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[130px]" data-api-unique-id='orderstablesection-r1244313c990bd8bb-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                رقم الهاتف
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[140px]" data-api-unique-id='orderstablesection-r347fccc698216abf-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                الولاية والبلدية
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[160px]" data-api-unique-id='orderstablesection-ra941496636013099-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                العلامة والمقاس
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[80px] text-center" data-api-unique-id='orderstablesection-r960b88512df76819-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                الكمية
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[120px]" data-api-unique-id='orderstablesection-r02b431049cf23f49-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                المبلغ الإجمالي
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[160px]" data-api-unique-id='orderstablesection-r4eb7fe564a496ab4-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                بيانات الدفع الذهبية
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[140px]" data-api-unique-id='orderstablesection-r9bf5902ef2b90e75-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                حالة الطلب
              </th>
              <th className="p-3 font-semibold whitespace-nowrap min-w-[140px] text-center" data-api-unique-id='orderstablesection-r458b11faf0272ab9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                الإجراءات والتحكم
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60" data-api-unique-id='orderstablesection-r45ead362ddf3f31c-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            {paginatedOrders.length === 0 ? <tr data-api-unique-id='orderstablesection-r1f05ed93f5af1565-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                <td colSpan={10} className="p-8 text-center text-muted-foreground" data-api-unique-id='orderstablesection-r4902cc8df0973057-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                  <div className="flex flex-col items-center justify-center gap-2" data-api-unique-id='orderstablesection-r3f7d4b1813a96199-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
                    <AlertTriangle className="h-8 w-8 text-muted-foreground/60" data-api-unique-id='orderstablesection-r1665761b45298463-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' />
                    <p className="text-sm font-medium" data-api-unique-id='orderstablesection-r7a0da378fd73a15f-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>لا توجد طلبيات مطابقة لمعايير البحث الحالية</p>
                    <span className="text-xs" data-api-unique-id='orderstablesection-rf9967a27180c3bac-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>يرجى تعديل معايير التصفية أو إلغاء حقول البحث</span>
                  </div>
                </td>
              </tr> : paginatedOrders.map((order, index) => {
            const statusMeta = statusBadgeClasses[order.status] || statusBadgeClasses.NEW;
            const isIris = order.brand === "IRIS";
            const displayDate = formatOrderDate(order.createdAt);
            return <tr key={order.id} className="hover:bg-secondary/40 transition-colors" data-api-unique-id='orderstablesection-r281e2a63162082ab-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                    {/* 1. Order Number */}
                    <td className="p-3 whitespace-nowrap" data-api-unique-id='orderstablesection-rd9aa165053524f6b-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col" data-api-unique-id='orderstablesection-rf2e9623093653348-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <span className="font-mono font-bold text-foreground text-xs tracking-wider" data-api-unique-id='orderstablesection-rb03cdf15846a2a28-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-orderNumber`} data-api-map-var-name='order'>
                          {order.orderNumber}
                        </span>
                        {displayDate && <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 mt-0.5" data-api-unique-id='orderstablesection-r6eab4b295c9abdea-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <Calendar className="h-3 w-3" data-api-unique-id='orderstablesection-ra8dbc536a8a7c119-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                            {displayDate}
                          </span>}
                      </div>
                    </td>

                    {/* 2. Customer Name & Identity */}
                    <td className="p-3" data-api-unique-id='orderstablesection-r17e09a6a90b216b3-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col min-w-0" data-api-unique-id='orderstablesection-rc11f463d490cc1d2-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <span className="font-semibold text-foreground truncate max-w-[160px]" data-api-unique-id='orderstablesection-r9fe0b71bc6fed332-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-customerName`} data-api-map-var-name='order'>
                          {order.customerName}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono truncate" title={order.nationalIdNumber} data-api-unique-id='orderstablesection-rf316d23f8ee8ae8a-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          ب.ت.و: <strong className="text-foreground" data-api-unique-id='orderstablesection-radd07fa01f0f1d09-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-nationalIdNumber`} data-api-map-var-name='order'>{order.nationalIdNumber}</strong>
                        </span>
                      </div>
                    </td>

                    {/* 3. Phone numbers */}
                    <td className="p-3 whitespace-nowrap font-mono" data-api-unique-id='orderstablesection-rddf8592dd74af77c-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col text-xs space-y-0.5" data-api-unique-id='orderstablesection-rb5b2442a24363eff-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <span className="text-foreground font-bold flex items-center gap-1" data-api-unique-id='orderstablesection-r270d623461c6b9e1-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <Phone className="h-3 w-3 text-primary" data-api-unique-id='orderstablesection-r4ca50b8dd0c93139-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                          <span data-api-unique-id='orderstablesection-r0f30b7d9a66e65ae-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-phoneNumber`} data-api-map-var-name='order'>{order.phoneNumber}</span>
                        </span>
                        {order.secondaryPhone ? <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold" data-api-unique-id='orderstablesection-r535942ae2f899bc3-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <span className="text-[10px] text-primary/80" data-api-unique-id='orderstablesection-r7c1eb1caf257f12c-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>هاتف 2:</span>
                            <span data-api-unique-id='orderstablesection-rd31ff2b213eba636-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-secondaryPhone`} data-api-map-var-name='order'>{order.secondaryPhone}</span>
                          </span> : <span className="text-[10px] text-muted-foreground italic" data-api-unique-id='orderstablesection-r359912adcb8bdd07-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            (لا يوجد هاتف ثانٍ)
                          </span>}
                      </div>
                    </td>

                    {/* 4. Wilaya & Commune */}
                    <td className="p-3 whitespace-nowrap" data-api-unique-id='orderstablesection-re87aea646c618cab-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col" data-api-unique-id='orderstablesection-r7077f406a343bfc9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <span className="font-medium text-foreground flex items-center gap-1" data-api-unique-id='orderstablesection-rb6b5a2d87d181919-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-wilaya`} data-api-map-var-name='order'>
                          <MapPin className="h-3 w-3 text-muted-foreground" data-api-unique-id='orderstablesection-r433f9a5d746986fc-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                          {order.wilaya}
                        </span>
                        <span className="text-[11px] text-muted-foreground" data-api-unique-id='orderstablesection-r0aa213a33aac3a3a-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-commune`} data-api-map-var-name='order'>
                          {order.commune}
                        </span>
                      </div>
                    </td>

                    {/* 5. Brand & Size */}
                    <td className="p-3 whitespace-nowrap" data-api-unique-id='orderstablesection-red1d5abcbbc5fec2-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col" data-api-unique-id='orderstablesection-r6c081762500dafa9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5" data-api-unique-id='orderstablesection-r297b532e7b700e97-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <span className={`inline-flex shrink-0 items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${isIris ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`} data-api-unique-id='orderstablesection-rac80bfe17c32625e-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-brand`} data-api-map-var-name='order'>
                            {order.brand}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground" data-api-unique-id='orderstablesection-r1a48c8a986704d64-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-tireSize`} data-api-map-var-name='order'>
                            {order.tireSize}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-0.5" data-api-unique-id='orderstablesection-rcba5976185e4e716-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          سعر الوحدة: {formatPrice(order.unitPriceDzd)}
                        </span>
                      </div>
                    </td>

                    {/* 6. Quantity */}
                    <td className="p-3 whitespace-nowrap text-center" data-api-unique-id='orderstablesection-rc9e9f5d006f6e0d9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-mono font-bold text-foreground border border-border" data-api-unique-id='orderstablesection-raccbab7c989fe9a9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-quantity`} data-api-map-var-name='order'>
                        {order.quantity}
                      </span>
                    </td>

                    {/* 7. Total Price */}
                    <td className="p-3 whitespace-nowrap font-mono" data-api-unique-id='orderstablesection-r07f30c2b1200f79b-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <span className="font-bold text-foreground text-xs" data-api-unique-id='orderstablesection-r430f22507fdb0e85-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        {formatPrice(order.totalPriceDzd)}
                      </span>
                    </td>

                    {/* 8. Dahabia Card & Customer Details */}
                    <td className="p-3 whitespace-nowrap" data-api-unique-id='orderstablesection-r49966651e61b913d-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1" data-api-unique-id='orderstablesection-r640298062ac9ae96-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20" data-api-unique-id='orderstablesection-re534cc95ea0f02f7-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <CreditCard className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='orderstablesection-r4ca8a3989f0d19eb-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                          <span className="tracking-wider" data-api-unique-id='orderstablesection-rd462dcc9c65a36c8-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>{formatDahabiaMasked(order.dahabiaCardNumber)}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground" data-api-unique-id='orderstablesection-r0f14edbbfa0abffa-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          {order.dahabiaExpiry && <span data-api-unique-id='orderstablesection-rc9f054fac823157d-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>انتهاء: <strong className="font-mono text-foreground" data-api-unique-id='orderstablesection-r1393a832cf00d76d-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`paginatedOrders-${index}-dahabiaExpiry`} data-api-map-var-name='order'>{order.dahabiaExpiry}</strong></span>}
                          <button type="button" onClick={() => onOpenCustomerModal(order)} className="inline-flex items-center gap-1 text-primary hover:underline hover:text-primary/80 transition-colors" title="عرض بطاقة العميل التفصيلية" data-api-unique-id='orderstablesection-r2978468a051af58c-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <Eye className="h-3 w-3" data-api-unique-id='orderstablesection-ra9aa3796c52a54df-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                            <span data-api-unique-id='orderstablesection-rfb3eb46156fd7e99-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>كافة التفاصيل</span>
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* 9. Order Status Selector */}
                    <td className="p-3 whitespace-nowrap" data-api-unique-id='orderstablesection-r7e2bb0251b45c868-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <Select value={order.status} onValueChange={val => onStatusChange(order.id, val as OrderStatus)} data-api-unique-id='orderstablesection-r1091731f0b6114f4-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <SelectTrigger className="h-7 w-[130px] text-[11px] border-border bg-secondary" data-api-unique-id='orderstablesection-r598f0275e3b65727-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <SelectValue data-api-unique-id='orderstablesection-r21b5ae555801fe7f-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>{statusMeta.text}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='orderstablesection-rebfc48c0240e670f-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <SelectItem value="NEW" data-api-unique-id='orderstablesection-r4d302f17b0295272-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <span className="inline-flex items-center gap-1.5" data-api-unique-id='orderstablesection-r8f9be27beeefc81a-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                              <span data-api-unique-id='orderstablesection-rf5121fac5b3ea1c7-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>🟡</span> جديدة
                            </span>
                          </SelectItem>
                          <SelectItem value="PROCESSING" data-api-unique-id='orderstablesection-r5bc37464fb1dff51-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <span className="inline-flex items-center gap-1.5" data-api-unique-id='orderstablesection-r642046320b28ebfd-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                              <span data-api-unique-id='orderstablesection-re0aa88678d21b1ed-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>🔵</span> قيد المعالجة
                            </span>
                          </SelectItem>
                          <SelectItem value="COMPLETED" data-api-unique-id='orderstablesection-re84b4536525240a6-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <span className="inline-flex items-center gap-1.5" data-api-unique-id='orderstablesection-r6a450895cbe626fb-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                              <span data-api-unique-id='orderstablesection-r1faabc126da18fe0-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>🟢</span> مكتملة
                            </span>
                          </SelectItem>
                          <SelectItem value="CANCELLED" data-api-unique-id='orderstablesection-rdfe7caf23fae0ce5-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                            <span className="inline-flex items-center gap-1.5" data-api-unique-id='orderstablesection-r5f6b121c5fc493bd-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                              <span data-api-unique-id='orderstablesection-r2f05dc79b708feeb-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>🔴</span> ملغية
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    {/* 10. Actions */}
                    <td className="p-3 whitespace-nowrap text-center" data-api-unique-id='orderstablesection-r72f63649d57a385e-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                      <div className="flex items-center justify-center gap-1.5" data-api-unique-id='orderstablesection-raad6c6d3ea9c8bec-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                        <button type="button" onClick={() => onOpenEditModal(order)} className="flex h-7 w-7 items-center justify-center rounded border border-border bg-secondary text-secondary-foreground hover:bg-muted hover:text-primary transition-colors" title="تعديل تفاصيل الطلبية" data-api-unique-id='orderstablesection-rfa43afb8c9dd8155-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <Edit2 className="h-3.5 w-3.5" data-api-unique-id='orderstablesection-r2c9e8b5f381ddd15-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                        </button>

                        <button type="button" onClick={() => onDeleteOrder(order.id)} className="flex h-7 w-7 items-center justify-center rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="حذف الطلبية" data-api-unique-id='orderstablesection-rd3ba749fc853e57f-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1'>
                          <Trash2 className="h-3.5 w-3.5" data-api-unique-id='orderstablesection-r9e44342001ec25d8-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' />
                        </button>
                      </div>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {orders.length > 0 && <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/70 pt-3 text-xs" data-api-unique-id='orderstablesection-rdffd42d5a4b89447-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
          <span className="text-muted-foreground font-mono" data-api-unique-id='orderstablesection-rfc0b091525ccba95-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            عرض صفحة {validPage} من أصل {totalPages} (إجمالي {orders.length} طلبية)
          </span>

          <div className="flex items-center gap-1.5" data-api-unique-id='orderstablesection-ra6fdfbf38b99eba5-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
            <button type="button" disabled={validPage <= 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground hover:bg-muted disabled:opacity-40 transition-colors" data-api-unique-id='orderstablesection-r94ed7a357487b0c9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              <ChevronRight className="h-3.5 w-3.5" data-api-unique-id='orderstablesection-r1171710a12746acd-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' />
              <span data-api-unique-id='orderstablesection-rb7a52666d852900a-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>السابق</span>
            </button>

            <div className="flex items-center gap-1 font-mono" data-api-unique-id='orderstablesection-r10782b35db090195-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              {Array.from({
            length: totalPages
          }, (_, i) => i + 1).map((page, index) => <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`h-7 w-7 rounded text-xs font-semibold transition-colors ${validPage === page ? "bg-primary text-primary-foreground font-bold" : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"}`} data-api-unique-id='orderstablesection-r0c43fd81768ea463-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' data-api-in-loop='1' data-api-bind-info={`Array-${index}-$item`} data-api-map-var-name='page'>
                  {page}
                </button>)}
            </div>

            <button type="button" disabled={validPage >= totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground hover:bg-muted disabled:opacity-40 transition-colors" data-api-unique-id='orderstablesection-rfffb606d1fbc178a-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>
              <span data-api-unique-id='orderstablesection-r99d0ea44326eb91d-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection'>التالي</span>
              <ChevronLeft className="h-3.5 w-3.5" data-api-unique-id='orderstablesection-r5e7902cd4c5910c9-s1872561328' data-api-unique-page-name='src/backend/components/AdminDashboard/OrdersTableSection' />
            </button>
          </div>
        </div>}
    </section>;
}