"use client";

import React from "react";
import { Building2, MapPin, Layers, Phone, UserCheck, Calendar } from "lucide-react";
import { TireOrderOutput } from "@/frontend/types/OrderTracking";
export type TireOrder = TireOrderOutput;
export interface OrderDetailsSummaryProps {
  order: TireOrderOutput;
}
export default function OrderDetailsSummary({
  order
}: OrderDetailsSummaryProps) {
  // Format currency with Algerian Dinar
  const formatDzd = (val: number) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Mask dahabia card for security
  const maskDahabia = (cardNumber?: string) => {
    if (!cardNumber) return "6280 **** **** ****";
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (cleaned.length < 8) return cardNumber;
    const first4 = cleaned.slice(0, 4);
    const last4 = cleaned.slice(-4);
    return `${first4} **** **** ${last4}`;
  };
  return <section data-controller-name="تفاصيل الحصة ومحطة الاستلام" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6" data-api-unique-id='orderdetailssummary-r63f401dd74e83c40-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
      {/* Quota & Tire Specs Card (8 cols on lg) */}
      <div className="lg:col-span-8 rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8 flex flex-col justify-between" data-api-unique-id='orderdetailssummary-r714ac1036f85d835-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
        <div data-api-unique-id='orderdetailssummary-r1e24a7679c0b8112-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
          <div className="flex items-center justify-between pb-4 border-b border-border" data-api-unique-id='orderdetailssummary-r638d2efaa0552b50-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <div className="flex items-center gap-2" data-api-unique-id='orderdetailssummary-r2e41c869e989fcf3-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <Layers className="w-5 h-5 text-primary" data-api-unique-id='orderdetailssummary-r1de2a17b9f76e3b2-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
              <h3 className="text-lg sm:text-xl font-header font-bold text-foreground" data-api-unique-id='orderdetailssummary-r02b9501979768bb0-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                مواصفات الحصة المحجوزة
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-secondary text-secondary-foreground font-mono font-bold" data-api-unique-id='orderdetailssummary-rc95a8ae3bef3f4ec-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              حصص نفطال المعتمدة
            </span>
          </div>

          {/* Grid specs */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-right" data-api-unique-id='orderdetailssummary-rcfc4cfc33caac6a7-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            {/* Brand Card */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border" data-api-unique-id='orderdetailssummary-r721471251d553bca-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground font-body block mb-1" data-api-unique-id='orderdetailssummary-r836675d2d7a15f87-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>العلامة التجارية</span>
              <div className="flex items-center gap-2" data-api-unique-id='orderdetailssummary-re0fe7cdae856934a-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                <span className="text-base sm:text-lg font-header font-black text-foreground" data-api-unique-id='orderdetailssummary-r5aa91fb6a7754d90-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                  {order.brand === "CONTINENTAL" ? "كونتيننتال Continental" : "إيريس IRIS الجزائر"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-bold" data-api-unique-id='orderdetailssummary-r4dfecab30bd87796-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                  أصلية
                </span>
              </div>
            </div>

            {/* Tire Size */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border" data-api-unique-id='orderdetailssummary-r41eaa688c1491f78-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground font-body block mb-1" data-api-unique-id='orderdetailssummary-r313b58cfb959abd1-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>مقاس العجلة المعتمد</span>
              <span className="text-base sm:text-lg font-mono font-bold text-primary tracking-wide" data-api-unique-id='orderdetailssummary-r56c944339eb0039e-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {order.tireSize}
              </span>
            </div>

            {/* Quantity */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border" data-api-unique-id='orderdetailssummary-rd8c5ea81f33a1361-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground font-body block mb-1" data-api-unique-id='orderdetailssummary-rcf68dd19ab1e812d-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>الكمية المحجوزة</span>
              <div className="flex items-baseline gap-1" data-api-unique-id='orderdetailssummary-r241cbfb1af564650-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                <span className="text-xl font-header font-black text-foreground" data-api-unique-id='orderdetailssummary-r19a112cfc6d18087-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>{order.quantity}</span>
                <span className="text-xs text-muted-foreground font-body" data-api-unique-id='orderdetailssummary-rffa5e4a29001066b-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>إطارات (حصة سنوية)</span>
              </div>
            </div>

            {/* Unit Price */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border" data-api-unique-id='orderdetailssummary-r93dae53bcd786f08-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground font-body block mb-1" data-api-unique-id='orderdetailssummary-rc86e65d77ce524d1-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>السعر الفردي للإطار</span>
              <span className="text-base sm:text-lg font-mono font-bold text-foreground" data-api-unique-id='orderdetailssummary-r1918e2628f551183-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {formatDzd(order.unitPriceDzd)}
              </span>
            </div>
          </div>

          {/* Financial summary bar */}
          <div className="mt-6 p-4 rounded-xl bg-secondary/80 text-secondary-foreground border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right" data-api-unique-id='orderdetailssummary-rcddbdb576979ff35-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <div data-api-unique-id='orderdetailssummary-r16e55cd5d17bc26e-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground block font-body" data-api-unique-id='orderdetailssummary-rc73dee4fb9a72166-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>المبلغ الإجمالي المستحق للدفع عند الاستلام</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-primary" data-api-unique-id='orderdetailssummary-ra5cc58babfc36b4a-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {formatDzd(order.totalPriceDzd)}
              </span>
            </div>
            <div className="text-xs font-body text-muted-foreground sm:text-left" data-api-unique-id='orderdetailssummary-r1431572cfd3ef2dd-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              شاملة للرسوم والضريبة الرسمية (TTC)
            </div>
          </div>
        </div>

        {/* Beneficiary Details */}
        <div className="mt-6 pt-6 border-t border-border" data-api-unique-id='orderdetailssummary-r9794849b202ba0c6-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
          <h4 className="text-sm font-header font-bold text-muted-foreground mb-3 flex items-center gap-2" data-api-unique-id='orderdetailssummary-r1b8e8cce55fa6a8d-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <UserCheck className="w-4 h-4 text-primary" data-api-unique-id='orderdetailssummary-r845885091b390fed-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
            <span data-api-unique-id='orderdetailssummary-r8996c883c864d5f1-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>بيانات المستفيد من الحصة</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-body" data-api-unique-id='orderdetailssummary-rdb7f6626bfc7889b-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <div className="p-2.5 rounded-lg bg-input border border-border/60" data-api-unique-id='orderdetailssummary-r831f74425b1131a2-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-muted-foreground block mb-0.5" data-api-unique-id='orderdetailssummary-rfadf5ab8e9adc456-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>الاسم واللقب:</span>
              <span className="font-bold text-foreground text-sm" data-api-unique-id='orderdetailssummary-r2943e9f92573b83a-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>{order.customerName}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-input border border-border/60" data-api-unique-id='orderdetailssummary-ra2fec2fa2f3a3f77-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-muted-foreground block mb-0.5" data-api-unique-id='orderdetailssummary-r2d805ce26092be98-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>رقم بطاقة التعريف (NIN):</span>
              <span className="font-mono font-bold text-foreground text-sm" data-api-unique-id='orderdetailssummary-r6801896a0411776c-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>{order.nationalIdNumber}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-input border border-border/60" data-api-unique-id='orderdetailssummary-r4f6fa441889231b0-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-muted-foreground block mb-0.5" data-api-unique-id='orderdetailssummary-r0776caa5eab8c24a-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>البطاقة الذهبية المشفرة:</span>
              <span className="font-mono font-bold text-foreground text-sm" data-api-unique-id='orderdetailssummary-r397158d7bdd5c21d-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>{maskDahabia(order.dahabiaCardNumber)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Designated Naftal Station & Pickup Details (4 cols on lg) */}
      <div className="lg:col-span-4 rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-6 sm:p-8 flex flex-col justify-between text-right" data-api-unique-id='orderdetailssummary-rbd97935dd0af78be-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
        <div data-api-unique-id='orderdetailssummary-ra7ef1cdf39065901-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
          <div className="flex items-center gap-2 pb-4 border-b border-border" data-api-unique-id='orderdetailssummary-r5cb348032fb9d2c4-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <Building2 className="w-5 h-5 text-primary" data-api-unique-id='orderdetailssummary-r4abced0bf35910cb-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
            <h3 className="text-lg font-header font-bold text-foreground" data-api-unique-id='orderdetailssummary-rbe35b4e28a0112ca-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              مركز الاستلام المعتمد
            </h3>
          </div>

          <div className="mt-5 space-y-4 font-body" data-api-unique-id='orderdetailssummary-rc6c35adae1bd3d96-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            {/* Wilaya and Commune */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border" data-api-unique-id='orderdetailssummary-rb68407f13f5f52c0-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <div className="flex items-center gap-2 text-primary text-xs font-bold mb-1" data-api-unique-id='orderdetailssummary-r0032da761decf200-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                <MapPin className="w-4 h-4" data-api-unique-id='orderdetailssummary-rdeedced64eefc3d3-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
                <span data-api-unique-id='orderdetailssummary-rcc120098c15b5aa8-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>الولاية والبلدية</span>
              </div>
              <p className="text-base font-header font-bold text-foreground" data-api-unique-id='orderdetailssummary-r43215dd484c1982d-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                ولاية {order.wilaya} - بلدية {order.commune}
              </p>
            </div>

            {/* Station details */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2" data-api-unique-id='orderdetailssummary-rf823c37393b3d6d4-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <span className="text-xs text-muted-foreground block" data-api-unique-id='orderdetailssummary-reeaf9d82386d60e6-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>محطة نفطال المعنية بالاستلام:</span>
              <p className="text-sm font-header font-bold text-foreground" data-api-unique-id='orderdetailssummary-r9dbcd8d2370bcd80-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {order.stationName || `محطة خدمات نفطال المركزية - ${order.commune}`}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='orderdetailssummary-r31df512a51893330-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {order.stationAddress || `المنطقة الصناعية، الطريق الوطني، بلدية ${order.commune}، ولاية ${order.wilaya}`}
              </p>
            </div>

            {/* Pickup Deadline */}
            <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-1" data-api-unique-id='orderdetailssummary-r59f5e823197ffe43-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold" data-api-unique-id='orderdetailssummary-ra79a5f9a99e45aff-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                <Calendar className="w-4 h-4" data-api-unique-id='orderdetailssummary-r50ceb9e16ced8a0c-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
                <span data-api-unique-id='orderdetailssummary-ra7a07decef743149-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>آخر أجل لاستلام الحصة</span>
              </div>
              <p className="text-sm font-mono font-bold text-foreground" data-api-unique-id='orderdetailssummary-rf93246daa9def519-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
                {order.pickupDeadline || "خلال 15 يوماً من تاريخ الإشعار بالجاهزية"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact reminder */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='orderdetailssummary-r5a21544901e056f8-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
          <div className="flex items-center gap-1" data-api-unique-id='orderdetailssummary-r9ea2264f48e394f9-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>
            <Phone className="w-3.5 h-3.5 text-primary" data-api-unique-id='orderdetailssummary-r720edcdfabae0ee6-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary' />
            <span data-api-unique-id='orderdetailssummary-rf3a6fc88577bc6bd-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>هاتف الزبون:</span>
          </div>
          <span className="font-mono font-bold text-foreground" data-api-unique-id='orderdetailssummary-rdfcc919837d12193-s2504210145' data-api-unique-page-name='src/frontend/components/OrderTracking/OrderDetailsSummary'>{order.phoneNumber}</span>
        </div>
      </div>
    </section>;
}