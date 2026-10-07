"use client";

import React, { useState } from "react";
import { HelpCircle, PhoneCall, Plus, Edit2, Trash2, CheckCircle, Database, Lock, Printer, Bell, ToggleLeft, ToggleRight } from "lucide-react";
import { FaqCategory } from "@/backend/types/AdminDashboard";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export interface PlatformFaq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
  updatedAt: string;
}
export interface SupportChannel {
  id: string;
  title: string;
  value: string;
  description?: string;
  isActive: boolean;
}
export interface ContentSupportSectionProps {
  faqs: PlatformFaq[];
  channels: SupportChannel[];
  onAddFaq: (faq: Omit<PlatformFaq, "id" | "updatedAt">) => void;
  onUpdateFaq: (faq: PlatformFaq) => void;
  onDeleteFaq: (id: string) => void;
  onUpdateChannel: (channel: SupportChannel) => void;
}
export default function ContentSupportSection({
  faqs,
  channels,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  onUpdateChannel
}: ContentSupportSectionProps) {
  const [activeTab, setActiveTab] = useState<"FAQ" | "SUPPORT" | "FUTURE">("FAQ");
  const [isAddFaqOpen, setIsAddFaqOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<PlatformFaq | null>(null);
  const [editingChannel, setEditingChannel] = useState<SupportChannel | null>(null);

  // New FAQ Form State
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState<FaqCategory>("ORDERS");
  const categoryLabels: Record<FaqCategory, string> = {
    ORDERS: "طلبيات",
    PAYMENT: "دفع",
    DELIVERY: "توصيل",
    WARRANTY: "ضمان"
  };
  const handleSaveNewFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast.error("يرجى ملء نص السؤال والإجابة المعتمدة");
      return;
    }
    onAddFaq({
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      category: newCategory,
      isActive: true
    });
    setIsAddFaqOpen(false);
    setNewQuestion("");
    setNewAnswer("");
    toast.success("تمت إضافة السؤال الشائع بنجاح");
  };
  const handleSaveEditFaq = () => {
    if (!editingFaq) return;
    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      toast.error("لا يمكن ترك السؤال أو الإجابة فارغين");
      return;
    }
    onUpdateFaq({
      ...editingFaq,
      updatedAt: new Date().toISOString().split("T")[0]
    });
    setEditingFaq(null);
    toast.success("تم تحديث السؤال الشائع بنجاح");
  };
  const handleSaveChannel = () => {
    if (!editingChannel) return;
    if (!editingChannel.title.trim() || !editingChannel.value.trim()) {
      toast.error("يرجى إدخال عنوان ورقم القناة");
      return;
    }
    onUpdateChannel(editingChannel);
    setEditingChannel(null);
    toast.success("تم تحديث بيانات القناة بنجاح");
  };
  return <section className="w-full min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-sm flex flex-col gap-4" data-controller-name="لوحة تعديل المحتوى التشغيلي والمعلومات" data-api-unique-id='contentsupportsection-r0e424d6efbc685d1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
      {/* Section Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-3" data-api-unique-id='contentsupportsection-r14d851478d5a8369-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
        <div className="flex items-center gap-2" data-api-unique-id='contentsupportsection-rca6d18cb4ea2be35-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground border border-border" data-api-unique-id='contentsupportsection-rde0d08906d5e8da1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <HelpCircle className="h-4 w-4 text-primary" data-api-unique-id='contentsupportsection-r2825efa8c727d866-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
          </div>
          <div data-api-unique-id='contentsupportsection-re46d65bfe1e641fd-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <h2 className="font-header text-base sm:text-lg font-bold text-foreground" data-api-unique-id='contentsupportsection-r137b0bd78700641f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              المحتوى التوعوي، قنوات الدعم والجاهزية السيادية
            </h2>
            <p className="text-xs text-muted-foreground" data-api-unique-id='contentsupportsection-r26e1698e007ff0b0-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إدارة الأسئلة الشائعة، قنوات الدعم الفني والرقم الأخضر 1050، وتكاملات الأمان RLS
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary p-1" data-api-unique-id='contentsupportsection-r99906f045468ed42-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <button type="button" onClick={() => setActiveTab("FAQ")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "FAQ" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`} data-api-unique-id='contentsupportsection-rcd6659b7fe36df63-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            الأسئلة الشائعة ({faqs.length})
          </button>
          <button type="button" onClick={() => setActiveTab("SUPPORT")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "SUPPORT" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`} data-api-unique-id='contentsupportsection-ree42d483eaafe458-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            قنوات الاتصال (1050)
          </button>
          <button type="button" onClick={() => setActiveTab("FUTURE")} className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "FUTURE" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`} data-api-unique-id='contentsupportsection-rfc6437f6a68d5d18-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            الجاهزية والتقنيات
          </button>
        </div>
      </div>

      {/* Tab 1: FAQ Management */}
      {activeTab === "FAQ" && <div className="flex flex-col gap-3" data-api-unique-id='contentsupportsection-r8bdbbaee2a966659-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <div className="flex items-center justify-between" data-api-unique-id='contentsupportsection-r3c626df9800ca6c4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <span className="text-xs text-muted-foreground" data-api-unique-id='contentsupportsection-r17c4b2fb2d03b42e-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              قائمة الأسئلة المعروضة في المنصة العامة لتوجيه المواطنين وضمان التوعية
            </span>
            <button type="button" onClick={() => setIsAddFaqOpen(true)} className="inline-flex items-center gap-1 rounded bg-secondary border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors" data-api-unique-id='contentsupportsection-rb8c633d8bc4a6563-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <Plus className="h-3.5 w-3.5 text-primary" data-api-unique-id='contentsupportsection-r5b4f8011c13fa23f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              <span data-api-unique-id='contentsupportsection-r6efc959fb376e3e0-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>إضافة سؤال جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-api-unique-id='contentsupportsection-r07f5776da2d7fdd6-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            {faqs.map((faq, index) => <div key={faq.id} className="flex flex-col justify-between gap-2.5 rounded-lg border border-border bg-background p-3.5 transition-colors" data-api-unique-id='contentsupportsection-rcff0674ae4422dee-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                <div className="space-y-1.5" data-api-unique-id='contentsupportsection-rf20f4cff61566b8c-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                  <div className="flex items-start justify-between gap-2" data-api-unique-id='contentsupportsection-ra37dcadf897c3ec6-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                    <span className="font-semibold text-xs text-foreground flex items-center gap-1.5" data-api-unique-id='contentsupportsection-r09b4373081f8a9c3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-question`} data-api-map-var-name='faq'>
                      <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='contentsupportsection-rcb5b7193d7062002-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                      {faq.question}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0" data-api-unique-id='contentsupportsection-raab296434a0064a3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground border border-border font-medium" data-api-unique-id='contentsupportsection-r328a247f2424aaa1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                        {categoryLabels[faq.category]}
                      </span>
                      <span className={`inline-flex h-2 w-2 rounded-full ${faq.isActive ? "bg-success" : "bg-destructive"}`} title={faq.isActive ? "نشط" : "معطل"} data-api-unique-id='contentsupportsection-r6515e98a496001d3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='contentsupportsection-rc74b5861a43f8193-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-answer`} data-api-map-var-name='faq'>
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground" data-api-unique-id='contentsupportsection-r3eb00a9af8c03927-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                  <span data-api-unique-id='contentsupportsection-r62e1ce3aa5ddc41e-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`faqs-${index}-updatedAt`} data-api-map-var-name='faq'>آخر تحديث: {faq.updatedAt}</span>
                  <div className="flex items-center gap-1.5" data-api-unique-id='contentsupportsection-r122994103e973cf1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                    <button type="button" onClick={() => onUpdateFaq({
                ...faq,
                isActive: !faq.isActive
              })} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" title={faq.isActive ? "تعطيل السؤال" : "تفعيل السؤال"} data-api-unique-id='contentsupportsection-rc995030641b42a33-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                      {faq.isActive ? <ToggleRight className="h-4 w-4 text-success" data-api-unique-id='contentsupportsection-r13fdd68980d79eea-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" data-api-unique-id='contentsupportsection-re9902e185442c868-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />}
                    </button>
                    <button type="button" onClick={() => setEditingFaq(faq)} className="p-1 rounded hover:bg-secondary text-secondary-foreground" title="تعديل السؤال" data-api-unique-id='contentsupportsection-rbff76365a9fc71be-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                      <Edit2 className="h-3.5 w-3.5" data-api-unique-id='contentsupportsection-r5207d21cd6fda7e6-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                    </button>
                    <button type="button" onClick={() => onDeleteFaq(faq.id)} className="p-1 rounded hover:bg-destructive/20 text-destructive" title="حذف السؤال" data-api-unique-id='contentsupportsection-r5328f8b6b1deff82-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                      <Trash2 className="h-3.5 w-3.5" data-api-unique-id='contentsupportsection-r8333d85d8c10d95d-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>}

      {/* Tab 2: Support Channels & 1050 Management */}
      {activeTab === "SUPPORT" && <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-api-unique-id='contentsupportsection-rf5365f0c5bb2b98a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          {channels.map((ch, index) => <div key={ch.id} className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-background p-4 min-w-0" data-api-unique-id='contentsupportsection-r0cfa510081daca0a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
              <div className="space-y-1" data-api-unique-id='contentsupportsection-r79d9fb388884f63d-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                <div className="flex items-center justify-between" data-api-unique-id='contentsupportsection-rf37286319f7ffc9a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                  <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5" data-api-unique-id='contentsupportsection-r8cd30f19d882dbee-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`channels-${index}-title`} data-api-map-var-name='ch'>
                    <PhoneCall className="h-3.5 w-3.5 text-primary" data-api-unique-id='contentsupportsection-ra23fd9e06608b7df-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                    {ch.title}
                  </h3>
                  <span className={`inline-flex h-2.5 w-2.5 rounded-full ${ch.isActive ? "bg-success" : "bg-destructive"}`} title={ch.isActive ? "القناة مفعلة" : "القناة معطلة"} data-api-unique-id='contentsupportsection-r56c7950d15c6cb53-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                </div>
                <div className="text-base font-black font-mono text-primary pt-1" data-api-unique-id='contentsupportsection-rb57e0f1ec5cc8d01-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`channels-${index}-value`} data-api-map-var-name='ch'>
                  {ch.value}
                </div>
                <p className="text-xs text-muted-foreground" data-api-unique-id='contentsupportsection-r721dd53a27aab8a7-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' data-api-bind-info={`channels-${index}-description`} data-api-map-var-name='ch'>{ch.description}</p>
              </div>

              <div className="border-t border-border/70 pt-2 flex items-center justify-between" data-api-unique-id='contentsupportsection-ra3ecc426d0f8d3cd-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                <button type="button" onClick={() => onUpdateChannel({
            ...ch,
            isActive: !ch.isActive
          })} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1" data-api-unique-id='contentsupportsection-r0c0858910bc0ce5a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                  {ch.isActive ? "إيقاف القناة" : "تفعيل القناة"}
                </button>
                <button type="button" onClick={() => setEditingChannel(ch)} className="inline-flex items-center gap-1 text-xs text-secondary-foreground hover:text-foreground font-medium" data-api-unique-id='contentsupportsection-rf25925d5b515acb3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>
                  <Edit2 className="h-3 w-3" data-api-unique-id='contentsupportsection-r6efca89b0a890c90-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1' />
                  <span data-api-unique-id='contentsupportsection-r908403a2ab3a5145-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' data-api-in-loop='1'>تعديل البيانات</span>
                </button>
              </div>
            </div>)}
        </div>}

      {/* Tab 3: Future Readiness & Technical Compatibility */}
      {activeTab === "FUTURE" && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" data-api-unique-id='contentsupportsection-rc3563af742b8f0dc-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          {/* Card 1: RLS Security */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3.5" data-api-unique-id='contentsupportsection-r7132e5f35dc22a3e-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground" data-api-unique-id='contentsupportsection-r05d7ce3e49207ba7-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <Lock className="h-4 w-4 text-primary" data-api-unique-id='contentsupportsection-r9e84366b9a7a27e1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              <span data-api-unique-id='contentsupportsection-r4216c7903e56ae28-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>أمان Row Level Security</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='contentsupportsection-r7ecabf3aa653a973-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              سياسات RLS نشطة على مستوى قاعدة البيانات لحماية أرقام بطاقة الذهبية (18 خانة) وسجلات الهوية الوطنية.
            </p>
            <div className="mt-auto pt-2 border-t border-border/60" data-api-unique-id='contentsupportsection-re1080a1d6525e331-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <span className="inline-flex items-center gap-1 rounded bg-success/20 px-2 py-0.5 text-[10px] font-bold text-success" data-api-unique-id='contentsupportsection-r9e55634481062052-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <CheckCircle className="h-3 w-3" data-api-unique-id='contentsupportsection-r663b15edcf3f52f8-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
                <span data-api-unique-id='contentsupportsection-r78ce11cd5c6ca0d6-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>مفعل ومؤمن بالكامل</span>
              </span>
            </div>
          </div>

          {/* Card 2: Database Live Stream */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3.5" data-api-unique-id='contentsupportsection-r984bab8803854017-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground" data-api-unique-id='contentsupportsection-r35bc814302c4fdf9-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <Database className="h-4 w-4 text-primary" data-api-unique-id='contentsupportsection-r5bb5f6849560c294-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              <span data-api-unique-id='contentsupportsection-r4dfc8b55c53bd03f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>التزامن اللحظي للبيانات</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='contentsupportsection-r7bc3b6b29baaaaa7-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              مزامنة فورية للطلبات والكميات مع جداول الإطارات والمخزون المعتمد في الـ 58 ولاية.
            </p>
            <div className="mt-auto pt-2 border-t border-border/60" data-api-unique-id='contentsupportsection-re96125b91e9bb289-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground border border-border" data-api-unique-id='contentsupportsection-rabc08473bf40006f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <CheckCircle className="h-3 w-3 text-primary" data-api-unique-id='contentsupportsection-r3646cfea356becc2-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
                <span data-api-unique-id='contentsupportsection-ree93757458bb1bcf-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>متصل بالقاعدة السيادية</span>
              </span>
            </div>
          </div>

          {/* Card 3: Instant Push Notifications */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3.5" data-api-unique-id='contentsupportsection-ra08c80566f717eea-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground" data-api-unique-id='contentsupportsection-r1944a1f719b2c4c4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <Bell className="h-4 w-4 text-primary" data-api-unique-id='contentsupportsection-r66f1519b5bad5e84-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              <span data-api-unique-id='contentsupportsection-r51d37027354abb31-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>الإشعارات الفورية (SMS)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='contentsupportsection-r2eac2a7bd48c79d4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إرسال رسائل نصية للمواطنين برقم الوصل NM-2026 وموعد الاستلام بالمحطة عبر خوادم الاتصالات الوطنية.
            </p>
            <div className="mt-auto pt-2 border-t border-border/60" data-api-unique-id='contentsupportsection-r94bbb194085c37e2-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-rc0ac5e27ca54aa97-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <span data-api-unique-id='contentsupportsection-r61be4609d1ff9a21-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>مهيأ وجاهز للإرسال</span>
              </span>
            </div>
          </div>

          {/* Card 4: Official Printing Protocol */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3.5" data-api-unique-id='contentsupportsection-r2348cfe9d2e6d321-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <div className="flex items-center gap-2 text-xs font-bold text-foreground" data-api-unique-id='contentsupportsection-r67590f4b026e3a40-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <Printer className="h-4 w-4 text-primary" data-api-unique-id='contentsupportsection-r5d2cd33f7f8a7bb4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              <span data-api-unique-id='contentsupportsection-r8e0c7628a6a32169-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>بروتوكول الطباعة الموحد</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='contentsupportsection-r6895cd07490c8b7d-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              توليد وصولات استلام حرارية ورسمية متوافقة مع نقاط البيع ومراكز خدمات نفطال.
            </p>
            <div className="mt-auto pt-2 border-t border-border/60" data-api-unique-id='contentsupportsection-rf59bac9e7725564a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r78730c3647a816ee-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <span data-api-unique-id='contentsupportsection-r8e4cdd483a68befb-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>متوافق مع طابعات POS</span>
              </span>
            </div>
          </div>
        </div>}

      {/* Add FAQ Dialog */}
      <Dialog open={isAddFaqOpen} onOpenChange={setIsAddFaqOpen} data-api-unique-id='contentsupportsection-r1bbeae22d82831fb-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md bg-card text-card-foreground border-border" data-api-unique-id='contentsupportsection-re7b8139d19efd4aa-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <DialogHeader data-api-unique-id='contentsupportsection-rcd3bb39c8ab8931c-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='contentsupportsection-rb2a9feaedba5ff2f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إضافة سؤال شائع جديد
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-xs" data-api-unique-id='contentsupportsection-r350fe33c27e2f8e7-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <div className="space-y-1" data-api-unique-id='contentsupportsection-rfd7b75705babab92-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r6829045d029c9e0e-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>فئة السؤال</label>
              <Select value={newCategory} onValueChange={val => setNewCategory(val as FaqCategory)} data-api-unique-id='contentsupportsection-r1572c43c620f20d1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='contentsupportsection-r0e429bc12fc37341-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                  <SelectValue placeholder="فئة السؤال" data-api-unique-id='contentsupportsection-r2002a589e597be65-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>{categoryLabels[newCategory]}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='contentsupportsection-r05093fde3b39d5fd-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                  <SelectItem value="ORDERS" data-api-unique-id='contentsupportsection-r686ff2b2e2a7d254-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>طلبيات</SelectItem>
                  <SelectItem value="PAYMENT" data-api-unique-id='contentsupportsection-r443d90b9c602cdac-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>دفع</SelectItem>
                  <SelectItem value="DELIVERY" data-api-unique-id='contentsupportsection-r0100105a76e42f63-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>توصيل</SelectItem>
                  <SelectItem value="WARRANTY" data-api-unique-id='contentsupportsection-r76560a4362c30590-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>ضمان</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1" data-api-unique-id='contentsupportsection-rdb8882d0d70ef8f4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r098f669ca408d907-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>نص السؤال</label>
              <input type="text" placeholder="كيف يمكنني متابعة حالة طلبي؟" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-rd7e6bcfcd32f6e87-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
            </div>

            <div className="space-y-1" data-api-unique-id='contentsupportsection-r21c62870aacbbd3b-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r92c58ab59211f441-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>نص الإجابة الرسمي</label>
              <textarea rows={4} placeholder="يمكنكم استخدام الرقم المرجعي NM-2026 للتواصل مع محطة نفطال المعنية..." value={newAnswer} onChange={e => setNewAnswer(e.target.value)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-r5fd9061b19d1fd7e-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
            </div>
          </div>

          <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='contentsupportsection-rdffe56bfae7e6dd8-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <button type="button" onClick={() => setIsAddFaqOpen(false)} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='contentsupportsection-r6357c103369d665f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إلغاء
            </button>
            <button type="button" onClick={handleSaveNewFaq} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='contentsupportsection-rc3382ec348e3012f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              حفظ السؤال
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Dialog */}
      <Dialog open={!!editingFaq} onOpenChange={open => !open && setEditingFaq(null)} data-api-unique-id='contentsupportsection-ra8059625da0ae72d-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md bg-card text-card-foreground border-border" data-api-unique-id='contentsupportsection-r4efe9f15db3365a2-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <DialogHeader data-api-unique-id='contentsupportsection-ra9c6898edb3a109a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='contentsupportsection-r4e37f105bd150a86-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              تعديل السؤال الشائع
            </DialogTitle>
          </DialogHeader>

          {editingFaq && <div className="space-y-3 text-xs" data-api-unique-id='contentsupportsection-rb35efcbc0e5c4bc2-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <div className="space-y-1" data-api-unique-id='contentsupportsection-r26daa6a6bf91dbdd-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r6387b0cb1a65cc30-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>فئة السؤال</label>
                <Select key={editingFaq.id} value={editingFaq.category} onValueChange={val => setEditingFaq(prev => prev ? {
              ...prev,
              category: val as FaqCategory
            } : null)} data-api-unique-id='contentsupportsection-r539455037576028f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                  <SelectTrigger className="w-full bg-secondary border-border text-xs" data-api-unique-id='contentsupportsection-r79902256e7f7c09b-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                    <SelectValue placeholder="فئة السؤال" data-api-unique-id='contentsupportsection-r1a0237d0262a3149-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>{categoryLabels[editingFaq.category]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border text-xs" data-api-unique-id='contentsupportsection-r21d7cc7b4192fabc-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                    <SelectItem value="ORDERS" data-api-unique-id='contentsupportsection-r24046faf2c562907-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>طلبيات</SelectItem>
                    <SelectItem value="PAYMENT" data-api-unique-id='contentsupportsection-r655adffe189f11e5-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>دفع</SelectItem>
                    <SelectItem value="DELIVERY" data-api-unique-id='contentsupportsection-r52183062b26c78cc-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>توصيل</SelectItem>
                    <SelectItem value="WARRANTY" data-api-unique-id='contentsupportsection-r013a3efed2f15972-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>ضمان</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1" data-api-unique-id='contentsupportsection-r02e52de3d34952a1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r40f4cbaeeb1748fc-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>نص السؤال</label>
                <input type="text" value={editingFaq.question} onChange={e => setEditingFaq(prev => prev ? {
              ...prev,
              question: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-ra3e5f881283dea14-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              </div>

              <div className="space-y-1" data-api-unique-id='contentsupportsection-r3286de5cc5feaa45-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-rfc690e302573055b-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>نص الإجابة</label>
                <textarea rows={4} value={editingFaq.answer} onChange={e => setEditingFaq(prev => prev ? {
              ...prev,
              answer: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-rf6e64d42d7985813-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              </div>
            </div>}

          <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='contentsupportsection-rcd86958e4ca8ea10-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <button type="button" onClick={() => setEditingFaq(null)} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='contentsupportsection-ra91c4cd7eaa37cdc-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إلغاء
            </button>
            <button type="button" onClick={handleSaveEditFaq} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='contentsupportsection-r6be144c1eecda533-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              تحديث
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Support Channel Dialog */}
      <Dialog open={!!editingChannel} onOpenChange={open => !open && setEditingChannel(null)} data-api-unique-id='contentsupportsection-r100a55de0154f7d4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md bg-card text-card-foreground border-border" data-api-unique-id='contentsupportsection-rf7995bd9ddb7059a-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
          <DialogHeader data-api-unique-id='contentsupportsection-rdff161f62987c5d5-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='contentsupportsection-r8a5d7f121030f33b-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              تعديل بيانات قناة الاتصال
            </DialogTitle>
          </DialogHeader>

          {editingChannel && <div className="space-y-3 text-xs" data-api-unique-id='contentsupportsection-r4b06fd25227d3dd1-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              <div className="space-y-1" data-api-unique-id='contentsupportsection-rbdf582154e919ede-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r5f65d8c1ae8af1d9-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>عنوان القناة</label>
                <input type="text" value={editingChannel.title} onChange={e => setEditingChannel(prev => prev ? {
              ...prev,
              title: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-r6924b159b6269ef8-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              </div>

              <div className="space-y-1" data-api-unique-id='contentsupportsection-rf34bde8844e1ff2f-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-rd925a10120f609b4-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>رقم الهاتف أو البريد الرسمي</label>
                <input type="text" value={editingChannel.value} onChange={e => setEditingChannel(prev => prev ? {
              ...prev,
              value: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs font-mono focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-ra910328590f889a3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              </div>

              <div className="space-y-1" data-api-unique-id='contentsupportsection-rb52194177439cb07-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
                <label className="font-medium text-muted-foreground" data-api-unique-id='contentsupportsection-r0ec140634cc7f081-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>الوصف وساعات العمل</label>
                <input type="text" value={editingChannel.description || ""} onChange={e => setEditingChannel(prev => prev ? {
              ...prev,
              description: e.target.value
            } : null)} className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground text-xs focus:ring-1 focus:ring-primary focus:outline-none" data-api-unique-id='contentsupportsection-r7c5be09cc360afa3-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection' />
              </div>
            </div>}

          <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border" data-api-unique-id='contentsupportsection-r52ab9458a469fbdf-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
            <button type="button" onClick={() => setEditingChannel(null)} className="px-3 py-1.5 rounded border border-border bg-secondary text-secondary-foreground text-xs hover:bg-muted" data-api-unique-id='contentsupportsection-rddd92d0a6c61d513-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              إلغاء
            </button>
            <button type="button" onClick={handleSaveChannel} className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90" data-api-unique-id='contentsupportsection-rc47e6cf6933ebbb6-s123844641' data-api-unique-page-name='src/backend/components/AdminDashboard/ContentSupportSection'>
              حفظ
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>;
}