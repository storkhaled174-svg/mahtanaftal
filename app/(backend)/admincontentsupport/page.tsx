"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { PlatformFaq, SupportChannel, FaqFilterState, FaqFormData, SupportChannelFormData, ContentSupportStats } from "../types/AdminContentSupport";
import { getContentSupportWorkbenchData, createPlatformFaq, updatePlatformFaq, togglePlatformFaqStatus, createSupportChannel, updateSupportChannel, toggleSupportChannelStatus } from "../actions/AdminContentSupport";
import AdminContentSupportHeader from "../components/AdminContentSupport/AdminContentSupportHeader";
import FaqFiltersToolbar from "../components/AdminContentSupport/FaqFiltersToolbar";
import FaqDataTable from "../components/AdminContentSupport/FaqDataTable";
import SupportChannelsGrid from "../components/AdminContentSupport/SupportChannelsGrid";
import FaqFormModal from "../components/AdminContentSupport/FaqFormModal";
import SupportChannelModal from "../components/AdminContentSupport/SupportChannelModal";
import FaqDetailModal from "../components/AdminContentSupport/FaqDetailModal";

export default function AdminContentSupportPage() {
  // Primary State
  const [faqs, setFaqs] = useState<PlatformFaq[]>([]);
  const [channels, setChannels] = useState<SupportChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [filters, setFilters] = useState<FaqFilterState>({
    search: "",
    category: "ALL",
    status: "ALL"
  });

  // Modal Dialog States
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState<PlatformFaq | null>(null);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [channelToEdit, setChannelToEdit] = useState<SupportChannel | null>(null);
  const [selectedFaqDetail, setSelectedFaqDetail] = useState<PlatformFaq | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getContentSupportWorkbenchData();
        if (isMounted && data) {
          setFaqs(data.faqs || []);
          setChannels(data.channels || []);
        }
      } catch (err) {
        toast.error("فشل تحميل بيانات إدارة المحتوى والدعم");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Statistics derivation
  const stats: ContentSupportStats = useMemo(() => {
    return {
      totalFaqs: faqs.length,
      activeFaqs: faqs.filter(f => f.isActive).length,
      ordersFaqsCount: faqs.filter(f => f.category === "ORDERS").length,
      paymentFaqsCount: faqs.filter(f => f.category === "PAYMENT").length,
      deliveryFaqsCount: faqs.filter(f => f.category === "DELIVERY").length,
      warrantyFaqsCount: faqs.filter(f => f.category === "WARRANTY").length,
      totalChannels: channels.length,
      activeChannels: channels.filter(c => c.isActive).length
    };
  }, [faqs, channels]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchSearch = filters.search === "" || item.question.toLowerCase().includes(filters.search.toLowerCase()) || item.answer.toLowerCase().includes(filters.search.toLowerCase()) || item.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === "ALL" || item.category === filters.category;
      const matchStatus = filters.status === "ALL" || filters.status === "ACTIVE" && item.isActive || filters.status === "INACTIVE" && !item.isActive;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [faqs, filters]);

  // Handlers for FAQs
  const handleToggleFaqActive = async (id: string, currentState: boolean) => {
    const nextState = !currentState;
    try {
      const updated = await togglePlatformFaqStatus({
        id,
        isActive: nextState
      });
      setFaqs(prev => prev.map((faq) => faq.id === id ? updated : faq));
      if (selectedFaqDetail && selectedFaqDetail.id === id) {
        setSelectedFaqDetail(updated);
      }
      toast.success(nextState ? "تم تفعيل السؤال الشائع بنجاح وإظهاره في المنصة العامة للمواطنين" : "تم تعطيل السؤال الشائع وحجبه عن الواجهة العامة");
    } catch (err) {
      toast.error("حدث خطأ أثناء تعديل حالة السؤال الشائع");
    }
  };
  const handleOpenNewFaq = () => {
    setFaqToEdit(null);
    setIsFaqModalOpen(true);
  };
  const handleEditFaq = (faq: PlatformFaq) => {
    setFaqToEdit(faq);
    setIsFaqModalOpen(true);
  };
  const handleViewFaqDetail = (faq: PlatformFaq) => {
    setSelectedFaqDetail(faq);
    setIsDetailModalOpen(true);
  };
  const handleSaveFaq = async (formData: FaqFormData, id?: string) => {
    try {
      if (id) {
        const updated = await updatePlatformFaq({
          id,
          question: formData.question,
          answer: formData.answer,
          category: formData.category,
          isActive: formData.isActive
        });
        setFaqs(prev => prev.map((item) => item.id === id ? updated : item));
        if (selectedFaqDetail && selectedFaqDetail.id === id) {
          setSelectedFaqDetail(updated);
        }
        toast.success("تم تحديث بيانات السؤال الشائع المعتمد بنجاح");
      } else {
        const created = await createPlatformFaq({
          question: formData.question,
          answer: formData.answer,
          category: formData.category,
          isActive: formData.isActive
        });
        setFaqs(prev => [created, ...prev]);
        toast.success("تم تسجيل ونشر السؤال الشائع الجديد في منصة نفطال");
      }
      setIsFaqModalOpen(false);
    } catch (err) {
      toast.error("فشل حفظ بيانات السؤال الشائع");
    }
  };

  // Handlers for Support Channels
  const handleToggleChannelActive = async (id: string, currentState: boolean) => {
    const nextState = !currentState;
    try {
      const updated = await toggleSupportChannelStatus({
        id,
        isActive: nextState
      });
      setChannels(prev => prev.map((ch) => ch.id === id ? updated : ch));
      toast.success(nextState ? "تم تفعيل وسيلة الاتصال للمواطنين في مركز الدعم" : "تم تعطيل وسيلة الاتصال مؤقتاً في البوابة الرقمية");
    } catch (err) {
      toast.error("حدث خطأ أثناء تعديل حالة وسيلة الاتصال");
    }
  };
  const handleOpenNewChannel = () => {
    setChannelToEdit(null);
    setIsChannelModalOpen(true);
  };
  const handleEditChannel = (channel: SupportChannel) => {
    setChannelToEdit(channel);
    setIsChannelModalOpen(true);
  };
  const handleSaveChannel = async (formData: SupportChannelFormData, id?: string) => {
    try {
      if (id) {
        const updated = await updateSupportChannel({
          id,
          title: formData.title,
          value: formData.value,
          description: formData.description || null,
          isActive: formData.isActive
        });
        setChannels(prev => prev.map((item) => item.id === id ? updated : item));
        toast.success("تم تحديث بيانات قناة الاتصال بنجاح");
      } else {
        const created = await createSupportChannel({
          title: formData.title,
          value: formData.value,
          description: formData.description || null,
          isActive: formData.isActive
        });
        setChannels(prev => [created, ...prev]);
        toast.success("تمت إضافة قناة اتصال ودعم رسمي جديدة بنجاح");
      }
      setIsChannelModalOpen(false);
    } catch (err) {
      toast.error("فشل حفظ بيانات قناة الاتصال");
    }
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-6" dir="rtl">
      <AdminContentSupportHeader stats={stats} onOpenNewFaq={handleOpenNewFaq} onOpenNewChannel={handleOpenNewChannel} />

      <section data-controller-name="جدول إدارة واستعراض الأسئلة الشائعة" className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-header text-base font-bold text-foreground sm:text-lg">
              بنك الأسئلة الشائعة المعتمدة (Platform FAQs Workbench)
            </h2>
            <p className="font-body text-xs text-muted-foreground">
              استعراض وإدارة بنك الإجابات الرسمية المصنفة حسب طلبيات الإطارات، الدفع بالذهبية، الاستلام، والضمان
            </p>
          </div>
          <span className="font-body text-xs text-muted-foreground">
            عرض <span className="font-bold text-foreground">{filteredFaqs.length}</span> من أصل{" "}
            <span className="font-bold text-foreground">{faqs.length}</span> سؤال
          </span>
        </div>

        <FaqFiltersToolbar filters={filters} onFilterChange={setFilters} onReset={() => setFilters({
        search: "",
        category: "ALL",
        status: "ALL"
      })} filteredCount={filteredFaqs.length} totalCount={faqs.length} />

        <FaqDataTable faqs={filteredFaqs} onToggleActive={handleToggleFaqActive} onEdit={handleEditFaq} onViewDetails={handleViewFaqDetail} />
      </section>

      <section data-controller-name="جدول إدارة قنوات الاتصال والدعم الفني المباشر" className="mt-2 border-t border-border/60 pt-6">
        <SupportChannelsGrid channels={channels} onToggleActive={handleToggleChannelActive} onEdit={handleEditChannel} onAddNew={handleOpenNewChannel} />
      </section>

      <FaqFormModal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)} faqToEdit={faqToEdit} onSave={handleSaveFaq} />

      <SupportChannelModal isOpen={isChannelModalOpen} onClose={() => setIsChannelModalOpen(false)} channelToEdit={channelToEdit} onSave={handleSaveChannel} />

      <FaqDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} faq={selectedFaqDetail} onEdit={handleEditFaq} onToggleActive={handleToggleFaqActive} />
    </div>;
}
