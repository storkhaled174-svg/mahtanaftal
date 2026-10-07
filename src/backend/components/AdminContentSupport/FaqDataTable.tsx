"use client";

import React from "react";
import { Edit3, HelpCircle, Package, CreditCard, Truck, ShieldCheck, Eye, Clock } from "lucide-react";
import { PlatformFaq, FaqCategory } from "@/backend/types/AdminContentSupport";
interface FaqDataTableProps {
  faqs: PlatformFaq[];
  onToggleActive: (id: string, currentState: boolean) => void;
  onEdit: (faq: PlatformFaq) => void;
  onViewDetails: (faq: PlatformFaq) => void;
}
const CATEGORY_CONFIG: Record<FaqCategory, {
  label: string;
  bgClass: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}> = {
  ORDERS: {
    label: "طلبيات الإطارات",
    bgClass: "bg-secondary text-secondary-foreground",
    icon: Package
  },
  PAYMENT: {
    label: "الدفع بالذهبية CIB",
    bgClass: "bg-warning text-warning-foreground",
    icon: CreditCard
  },
  DELIVERY: {
    label: "استلام المحطات",
    bgClass: "bg-success text-success-foreground",
    icon: Truck
  },
  WARRANTY: {
    label: "الضمان والخدمات",
    bgClass: "bg-info text-info-foreground",
    icon: ShieldCheck
  }
};
function formatDate(dateValue: Date | string): string {
  const d = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (isNaN(d.getTime())) {
    return "";
  }
  return d.toLocaleDateString("ar-DZ", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
export const FaqDataTable: React.FC<FaqDataTableProps> = ({
  faqs,
  onToggleActive,
  onEdit,
  onViewDetails
}) => {
  if (faqs.length === 0) {
    return <div className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-12 text-center text-card-foreground" data-api-unique-id='faqdatatable-r101eb02e31504137-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground" data-api-unique-id='faqdatatable-r5b155a85d50e5124-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
          <HelpCircle className="h-6 w-6" data-api-unique-id='faqdatatable-r12c5b10a8e166edf-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' />
        </div>
        <h3 className="mt-3 font-header text-sm font-semibold text-foreground" data-api-unique-id='faqdatatable-r840ee0347643b482-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>لا توجد أسئلة شائعة مطابقة للبحث</h3>
        <p className="mt-1 font-body text-xs text-muted-foreground" data-api-unique-id='faqdatatable-r0f9b22ab0240ac4e-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
          يرجى تعديل معايير البحث أو تصفية الفئات، أو إضافة سؤال شائع جديد لمنظومة نفطال.
        </p>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm" data-api-unique-id='faqdatatable-r858a780346885f48-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
      <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='faqdatatable-r00d5b4373e9bed47-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
        <table className="w-full min-w-[960px] text-right font-body text-xs" data-api-unique-id='faqdatatable-r01ec26afe6ce6c4c-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
          <thead data-api-unique-id='faqdatatable-r77b0e4c1900207a2-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
            <tr className="border-b border-border bg-muted/80 text-muted-foreground font-header" data-api-unique-id='faqdatatable-ref0715607c258aae-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
              <th className="px-4 py-3 text-right font-semibold" data-api-unique-id='faqdatatable-r76ae32a8b6c691da-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>السؤال الشائع (Question)</th>
              <th className="px-4 py-3 text-right font-semibold" data-api-unique-id='faqdatatable-redf7b075c1ebea91-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>مقتطف الإجابة الرسمية (Answer)</th>
              <th className="min-w-[140px] px-4 py-3 text-right font-semibold whitespace-nowrap" data-api-unique-id='faqdatatable-r0db590c123816c37-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>التصنيف</th>
              <th className="min-w-[120px] px-4 py-3 text-center font-semibold whitespace-nowrap" data-api-unique-id='faqdatatable-rb351ae77dd6329ab-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>حالة الظهور</th>
              <th className="min-w-[130px] px-4 py-3 text-right font-semibold whitespace-nowrap" data-api-unique-id='faqdatatable-r4668b3166fa7f63c-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>آخر تحديث</th>
              <th className="min-w-[140px] px-4 py-3 text-center font-semibold whitespace-nowrap" data-api-unique-id='faqdatatable-r7979f026bc73e262-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60" data-api-unique-id='faqdatatable-r394aeac34f15de4a-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable'>
            {faqs.map((faq, index) => {
            const catConfig = CATEGORY_CONFIG[faq.category] || CATEGORY_CONFIG.ORDERS;
            const Icon = catConfig.icon;
            return <tr key={faq.id} className="transition-colors hover:bg-muted/40" data-api-unique-id='faqdatatable-re22e52434e13833b-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                  {/* Question */}
                  <td className="max-w-[280px] px-4 py-3.5 align-top" data-api-unique-id='faqdatatable-r5aabf6b3d0aff7be-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <div className="flex items-start gap-2.5" data-api-unique-id='faqdatatable-ra7c22d5e70e83996-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted text-primary" data-api-unique-id='faqdatatable-r0f90367f62b98271-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        <HelpCircle className="h-3.5 w-3.5" data-api-unique-id='faqdatatable-r3d74993ff8cc9d2a-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                      </div>
                      <div className="min-w-0 flex-1" data-api-unique-id='faqdatatable-reb74264285070962-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        <button type="button" onClick={() => onViewDetails(faq)} className="text-right font-header font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:underline" data-api-unique-id='faqdatatable-r4e1885de81545314-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                          <p className="line-clamp-2 text-xs leading-relaxed" data-api-unique-id='faqdatatable-r0ce1ccb9cb6ae95d-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-question`} data-api-map-var-name='faq'>{faq.question}</p>
                        </button>
                        <span className="mt-1 block font-mono text-[10px] text-muted-foreground" data-api-unique-id='faqdatatable-r122334d2e5b26a5d-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-id`} data-api-map-var-name='faq'>
                          ID: {faq.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Answer Snippet */}
                  <td className="max-w-[340px] px-4 py-3.5 align-top" data-api-unique-id='faqdatatable-r404ced5bb9a0e0e7-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground" data-api-unique-id='faqdatatable-ra54c7e4741a7f00a-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-answer`} data-api-map-var-name='faq'>
                      {faq.answer}
                    </p>
                  </td>

                  {/* Category Badge */}
                  <td className="px-4 py-3.5 align-top whitespace-nowrap" data-api-unique-id='faqdatatable-r7e3d92f63b74ce26-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${catConfig.bgClass}`} data-api-unique-id='faqdatatable-r1af611f5b66e49dd-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                      <Icon className="h-3 w-3" data-api-unique-id='faqdatatable-refe9b7b486fac4f6-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                      <span data-api-unique-id='faqdatatable-rbe40b027f70b548d-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>{catConfig.label}</span>
                    </span>
                  </td>

                  {/* Is Active Status Switch */}
                  <td className="px-4 py-3.5 align-top text-center whitespace-nowrap" data-api-unique-id='faqdatatable-ra981325eb811729e-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <div className="inline-flex flex-col items-center gap-1" data-api-unique-id='faqdatatable-r420e769222f79a85-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onToggleActive(faq.id, faq.isActive)} title={faq.isActive ? "تعطيل السؤال الشائع" : "تفعيل السؤال الشائع"} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${faq.isActive ? "bg-success" : "bg-muted"}`} data-api-unique-id='faqdatatable-r662d8091d3ef927e-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${faq.isActive ? "translate-x-0" : "-translate-x-4"}`} data-api-unique-id='faqdatatable-r3a6e25acf86ab8f7-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                      </button>
                      <span className={`text-[10px] font-medium ${faq.isActive ? "text-success" : "text-muted-foreground"}`} data-api-unique-id='faqdatatable-r2fd3cc1d37038864-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        {faq.isActive ? "معروض للزبائن" : "معطل"}
                      </span>
                    </div>
                  </td>

                  {/* Updated At */}
                  <td className="px-4 py-3.5 align-top whitespace-nowrap text-muted-foreground" data-api-unique-id='faqdatatable-r4ccf7db0af813356-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <div className="flex items-center gap-1.5 text-[11px]" data-api-unique-id='faqdatatable-r1e002b3327bf7123-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                      <Clock className="h-3.5 w-3.5 shrink-0" data-api-unique-id='faqdatatable-r108bda65e1218ff8-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                      <span className="font-mono" data-api-unique-id='faqdatatable-rafe684d29e45956d-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        {formatDate(faq.updatedAt)}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-3.5 align-top text-center whitespace-nowrap" data-api-unique-id='faqdatatable-rc295c19ec242c555-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                    <div className="inline-flex items-center justify-center gap-1.5" data-api-unique-id='faqdatatable-r85eecbcb971f704f-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onViewDetails(faq)} title="معاينة السؤال الشائع" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='faqdatatable-r6100516453d52055-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        <Eye className="h-3.5 w-3.5" data-api-unique-id='faqdatatable-rc1caa5dfb3bbf22e-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                      </button>
                      <button type="button" onClick={() => onEdit(faq)} title="تعديل بيانات السؤال" className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-muted px-2 font-header text-[11px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='faqdatatable-r7cfae41cacc02022-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>
                        <Edit3 className="h-3 w-3" data-api-unique-id='faqdatatable-r7055d35dcc610e7c-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1' />
                        <span data-api-unique-id='faqdatatable-r81228c37ee9731ab-s675833757' data-api-unique-page-name='src/backend/components/AdminContentSupport/FaqDataTable' data-api-in-loop='1'>تعديل</span>
                      </button>
                    </div>
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>
    </div>;
};
export default FaqDataTable;