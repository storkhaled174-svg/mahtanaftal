"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchTireOrder, getOrderByOrderNumber, getSampleOrders } from "@/frontend/actions/OrderTracking";
import { TireOrderOutput, SampleOrderSummary, TrackingSearchParams } from "@/frontend/types/OrderTracking";
import SearchSection from "@/frontend/components/OrderTracking/SearchSection";
import StatusTimeline from "@/frontend/components/OrderTracking/StatusTimeline";
import OrderDetailsSummary from "@/frontend/components/OrderTracking/OrderDetailsSummary";
import OfficialReceiptCard from "@/frontend/components/OrderTracking/OfficialReceiptCard";
import VerificationGuidance from "@/frontend/components/OrderTracking/VerificationGuidance";
import { toast } from "sonner";
import { SearchX, Loader2 } from "lucide-react";
type UIOrder = TireOrderOutput;
function mapOutputToTireOrder(output: TireOrderOutput): UIOrder {
  return {
    ...output,
    secondaryPhone: output.secondaryPhone ?? "",
    notes: output.notes ?? null,
    customerId: output.customerId ?? null,
    createdAt: output.createdAt instanceof Date ? output.createdAt : new Date(output.createdAt),
    updatedAt: output.updatedAt instanceof Date ? output.updatedAt : new Date(output.updatedAt)
  };
}
export default function OrderTrackingPage() {
  const searchParams = useSearchParams();

  // Search & data state
  const [searchedOrderNumber, setSearchedOrderNumber] = useState<string>("");
  const [searchedPhoneNumber, setSearchedPhoneNumber] = useState<string>("");
  const [currentOrder, setCurrentOrder] = useState<UIOrder | null>(null);
  const [sampleOrders, setSampleOrders] = useState<SampleOrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // Load sample orders and initial search if URL contains orderNumber
  useEffect(() => {
    let isMounted = true;
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const samples = await getSampleOrders();
        if (!isMounted) return;
        if (samples && Array.isArray(samples)) {
          setSampleOrders(samples);
        }
        const paramOrderNumber = searchParams?.get("orderNumber");
        if (paramOrderNumber) {
          const cleanParam = paramOrderNumber.trim().toUpperCase();
          setSearchedOrderNumber(cleanParam);
          const orderData = await getOrderByOrderNumber(cleanParam);
          if (!isMounted) return;
          if (orderData) {
            const mapped = mapOutputToTireOrder(orderData);
            setCurrentOrder(mapped);
            setSearchedPhoneNumber(mapped.phoneNumber);
            setErrorMessage(undefined);
            setHasSearched(true);
          } else {
            setErrorMessage("لم يتم العثور على أي طلبية مطابقة للرقم المرجعي المحدد في الرابط.");
            setCurrentOrder(null);
            setHasSearched(true);
          }
        } else if (samples && samples.length > 0) {
          // If no specific query param, load first sample order as sovereign preview
          const firstSample = samples[0];
          setSearchedOrderNumber(firstSample.orderNumber);
          setSearchedPhoneNumber(firstSample.phoneNumber);
          const defaultOrder = await getOrderByOrderNumber(firstSample.orderNumber);
          if (!isMounted) return;
          if (defaultOrder) {
            setCurrentOrder(mapOutputToTireOrder(defaultOrder));
            setHasSearched(true);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        setErrorMessage("تعذر الاتصال بخدمة التحقق من الطلبيات. يرجى المحاولة مجدداً.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    initializeData();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  // Handle manual tracking lookup
  const handleSearch = async (params: TrackingSearchParams) => {
    setIsLoading(true);
    setSearchedOrderNumber(params.orderNumber);
    setSearchedPhoneNumber(params.phoneNumber);
    setErrorMessage(undefined);
    try {
      const res = await searchTireOrder({
        orderNumber: params.orderNumber,
        phoneNumber: params.phoneNumber
      });
      if (res.found && res.order) {
        const mapped = mapOutputToTireOrder(res.order);
        setCurrentOrder(mapped);
        setHasSearched(true);
        setErrorMessage(undefined);
        toast.success(`تم العثور على الطلبية ${mapped.orderNumber} بنجاح`);
      } else {
        setCurrentOrder(null);
        setHasSearched(true);
        const err = res.errorMessage || "لم يتم العثور على أي طلبية مطابقة للبيانات المدخلة.";
        setErrorMessage(err);
        toast.error(err);
      }
    } catch (err) {
      setCurrentOrder(null);
      setHasSearched(true);
      const errText = "حدث خطأ أثناء معالجة الاستعلام، يرجى المحاولة لاحقاً.";
      setErrorMessage(errText);
      toast.error(errText);
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="w-full bg-background text-foreground min-h-screen">
      {/* Main Content Container matching layout rules */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Section 1: Search and Verification Form */}
        <SearchSection initialOrderNumber={searchedOrderNumber} initialPhoneNumber={searchedPhoneNumber} sampleOrders={sampleOrders} isLoading={isLoading} onSearch={handleSearch} errorMessage={errorMessage} />

        {/* Dynamic Display when Order Found */}
        {currentOrder && <div className="space-y-8 sm:space-y-10 animate-[fade-in_0.4s_ease_both]">
            {/* Section 2: Progress Pipeline */}
            <StatusTimeline order={currentOrder} />

            {/* Section 3: Summary Details */}
            <OrderDetailsSummary order={currentOrder} />

            {/* Section 4: Official Printable Sovereign Receipt */}
            <OfficialReceiptCard order={currentOrder} />

            {/* Section 5: Verification Guidance and FAQs */}
            <VerificationGuidance />
          </div>}

        {/* Loading state indicator */}
        {isLoading && !currentOrder && <div className="rounded-2xl bg-card text-card-foreground border border-border shadow-card p-12 text-center max-w-2xl mx-auto space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-sm font-header text-muted-foreground">
              جاري التحقق واسترجاع بيانات الطلبية من السجل الوطني...
            </p>
          </div>}

        {/* Empty state when searched but not found */}
        {hasSearched && !currentOrder && !isLoading && <div data-controller-name="تنبيه عدم وجود الطلبية" className="rounded-2xl bg-card text-card-foreground border-2 border-border shadow-card p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-header font-bold text-foreground">
              تعذر العثور على بيانات الطلبية
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {errorMessage || "تأكد من إدخال الرقم المرجعي الرسمي (المرسل إليك في رسالة SMS عند التسجيل) ورقم الهاتف المسجل بالطلب."}
            </p>
            {sampleOrders.length > 0 && <div className="pt-2">
                <button type="button" onClick={() => {
            handleSearch({
              orderNumber: sampleOrders[0].orderNumber,
              phoneNumber: sampleOrders[0].phoneNumber
            });
          }} className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted font-header font-bold text-xs sm:text-sm transition-colors border border-border">
                  تجربة استعلام بنموذج صالح ({sampleOrders[0].orderNumber})
                </button>
              </div>}
          </div>}
      </main>
    </div>;
}
