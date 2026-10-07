"use client";

import React, { useState } from "react";
import { PlatformFaqItem, SupportChannelItem, FaqItem } from "@/frontend/types/HomePage";
import { ChevronDown, PhoneCall, Mail, Facebook, Clock, ShieldCheck, HelpCircle } from "lucide-react";
interface ContactAndFaqProps {
  faqs?: (PlatformFaqItem | FaqItem)[];
  supportChannels?: SupportChannelItem[];
}
const DEFAULT_FAQS: FaqItem[] = [{
  id: "faq-1",
  category: "DELIVERY",
  question: "ما هي الوثائق المطلوبة لاستلام الإطارات من محطة نفطال؟",
  answer: "يجب تقديم وصل الطلبية الرقمي (أو إظهار رمز NM-2026)، بطاقة التعريف الوطنية الأصلية، والبطاقة الذهبية المسجلة أثناء إجراء الطلب للتحقق من هوية صاحب المركبة."
}, {
  id: "faq-2",
  category: "ORDERS",
  question: "ما هو الحد الأقصى للإطارات المسموح بطلبها؟",
  answer: "تحدد المنصة الحصة القصوى بـ 4 إطارات لكل مركبة ورقم تعريف وطني، وذلك لضمان التوزيع العادل والشفاف وتغطية طلبات جميع المواطنين ومنع أي مضاربة."
}, {
  id: "faq-3",
  category: "PAYMENT",
  question: "كيف يتم دفع قيمة الإطارات؟",
  answer: "يتم تسديد المبلغ الكامل مباشرة عند الاستلام في محطة نفطال المعينة في الوصل، سواء عن طريق الدفع الإلكتروني بالبطاقة الذهبية أو نقداً وفق الأسعار الرسمية المقننة."
}, {
  id: "faq-4",
  category: "WARRANTY",
  question: "هل تركيب الإطارات متوفر في محطات نفطال وهل توجد كفالة؟",
  answer: "نعم، توفر مراكز ومحطات نفطال المعتمدة خدمة التركيب، الموازنة، وضبط ضغط الإطارات بأحدث المعدات التقنية مع ضمان أصالة الإطار ومطابقته للمواصفات القياسية."
}];
export default function ContactAndFaq({
  faqs: faqsProp,
  supportChannels = []
}: ContactAndFaqProps = {}) {
  const faqs = faqsProp && faqsProp.length > 0 ? faqsProp : DEFAULT_FAQS;
  const [openFaqId, setOpenFaqId] = useState<string>(faqs[0]?.id || "faq-1");
  const [faqCategory, setFaqCategory] = useState<string>("ALL");
  const filteredFaqs = faqs.filter(faq => faqCategory === "ALL" || faq.category === faqCategory);

  // Extract support channel details from props if provided
  const tollFreeChannel = supportChannels.find(c => c.title.includes("الأخضر") || c.value.includes("1050"));
  const tollFreeNumber = tollFreeChannel ? tollFreeChannel.value : "1050";
  const tollFreeDesc = tollFreeChannel?.description || "متاح 24/24 ساعة لاستقبال مكالماتكم من جميع الشبكات الوطنية";
  const emailChannel = supportChannels.find(c => c.value.includes("@") || c.title.includes("البريد"));
  const emailValue = emailChannel ? emailChannel.value : "contact@naftal.dz";
  const facebookChannel = supportChannels.find(c => c.value.toLowerCase().includes("facebook") || c.title.includes("فيسبوك"));
  const facebookValue = facebookChannel ? facebookChannel.value : "facebook.com/NaftalDz";
  const facebookUrl = facebookValue.startsWith("http") ? facebookValue : `https://${facebookValue}`;
  /* Extracted array: _labels */
  const _labels = [{
    key: "ALL",
    label: "الكل"
  }, {
    key: "ORDERS",
    label: "الطلبيات"
  }, {
    key: "PAYMENT",
    label: "الدفع"
  }, {
    key: "DELIVERY",
    label: "الاستلام"
  }, {
    key: "WARRANTY",
    label: "الضمان"
  }];
  return <section id="contact-faq-section" data-controller-name="قسم الأسئلة الشائعة ومركز الاتصال" className="w-full border-b border-border bg-background py-16 sm:py-20" data-api-unique-id='contactandfaq-r31f49cb5719646b3-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='contactandfaq-r603472bf03077fd3-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
        {/* Section Title */}
        <div className="mx-auto mb-12 max-w-3xl text-center" data-api-unique-id='contactandfaq-ra4673e9fd78365b6-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary px-3.5 py-1 text-xs font-semibold text-primary" data-api-unique-id='contactandfaq-r5a44a9d9a85aaa07-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
            <HelpCircle className="h-3.5 w-3.5" data-api-unique-id='contactandfaq-r7c49ff1fed25a230-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
            <span data-api-unique-id='contactandfaq-r878b703b4c47ce6f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>الدعم والإرشاد الفني</span>
          </div>
          <h2 className="font-header text-2xl font-bold text-foreground sm:text-3xl" data-api-unique-id='contactandfaq-ra606d85ce2127f7a-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
            الأسئلة الشائعة ومركز الاتصال
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground sm:text-base" data-api-unique-id='contactandfaq-rd85f114120fe35a4-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
            كل ما تحتاج معرفته عن آلية الاستلام وخدمات الدعم المباشرة عبر شبكة نفطال الوطنية
          </p>
        </div>

        {/* 2-Column Grid: Left FAQ Accordion, Right Contact Hub */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12" data-api-unique-id='contactandfaq-r0b5cf0a96fe27c9f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
          {/* FAQ Accordion (7 cols) */}
          <div className="space-y-4 lg:col-span-7" data-api-unique-id='contactandfaq-rfe501d404e9f22e3-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3" data-api-unique-id='contactandfaq-r539640f808f6c175-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
              <h3 className="flex items-center gap-2 font-header text-lg font-bold text-foreground" data-api-unique-id='contactandfaq-r96c680298154e793-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                <ShieldCheck className="h-5 w-5 text-primary" data-api-unique-id='contactandfaq-rdd643d1ff0b043fe-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                <span data-api-unique-id='contactandfaq-rad1c281bb13ea51c-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>الأسئلة الأكثر تداولاً</span>
              </h3>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5" data-api-unique-id='contactandfaq-r24b4ec4931e744d0-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                {_labels.map((c, index) => <button key={c.key} type="button" onClick={() => setFaqCategory(c.key)} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${faqCategory === c.key ? "bg-primary text-primary-foreground shadow-sm" : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"}`} data-api-unique-id='contactandfaq-r448c0278bc608232-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1' data-api-bind-info={`_labels-${index}-label`} data-api-map-var-name='c'>
                    {c.label}
                  </button>)}
              </div>
            </div>

            <div className="space-y-3 pt-1" data-api-unique-id='contactandfaq-r67c27a67f5bf34ea-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
              {filteredFaqs.length === 0 ? <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground" data-api-unique-id='contactandfaq-r706446b9613eb65f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  لا توجد أسئلة شائعة متوفرة لهذا التصنيف حالياً
                </div> : filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return <div key={faq.id} className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-200" data-api-unique-id='contactandfaq-r98162ad4ab67060b-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1'>
                      <button type="button" onClick={() => setOpenFaqId(isOpen ? "" : faq.id)} className="flex w-full items-center justify-between p-5 text-right font-header text-sm font-bold transition-colors hover:text-primary sm:text-base" data-api-unique-id='contactandfaq-rd50f1b8e14d2a0d2-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1'>
                        <span className="ml-4 flex-1" data-api-unique-id='contactandfaq-r0b8e1fb091624e38-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1' data-api-bind-info={`filteredFaqs-${index}-question`} data-api-map-var-name='faq'>{faq.question}</span>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} data-api-unique-id='contactandfaq-r2ea8e093081247b1-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1' />
                      </button>
                      {isOpen && <div className="border-t border-border/50 px-5 pb-5 pt-1 font-body text-sm leading-relaxed text-muted-foreground" data-api-unique-id='contactandfaq-r666e6adbaa7013af-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' data-api-in-loop='1' data-api-bind-info={`filteredFaqs-${index}-answer`} data-api-map-var-name='faq'>
                          {faq.answer}
                        </div>}
                    </div>;
            })}
            </div>
          </div>

          {/* Official Contact Hub (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-card p-6 text-card-foreground shadow-lg sm:p-8 lg:col-span-5" data-api-unique-id='contactandfaq-rfad55dd93d6cafc2-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
            <div className="space-y-6" data-api-unique-id='contactandfaq-r90c34c5fedfa03ef-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
              <div data-api-unique-id='contactandfaq-r1da66e67f4e0c113-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-header text-xs font-bold text-primary" data-api-unique-id='contactandfaq-r2f1f50805ec36abf-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  <PhoneCall className="h-3.5 w-3.5" data-api-unique-id='contactandfaq-rd4ffaa77958cce7f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                  خدمة الزبائن والدعم الفني
                </span>
                <h3 className="mt-3 font-header text-xl font-bold text-foreground" data-api-unique-id='contactandfaq-r55279c49d8fbf149-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  تواصل مع نفطال
                </h3>
                <p className="mt-1 font-body text-xs text-muted-foreground sm:text-sm" data-api-unique-id='contactandfaq-rc1aff74d8699373d-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  فريقنا في خدمتكم للإجابة على استفساراتكم ومرافقتكم في تسجيل واستلام طلبياتكم.
                </p>
              </div>

              {/* Green Line Toll Free */}
              <div className="rounded-xl border border-success/30 bg-success/10 p-5" data-api-unique-id='contactandfaq-r74393d4be7376df9-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                <div className="flex items-center justify-between" data-api-unique-id='contactandfaq-rfe52a55ce571bbec-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  <div data-api-unique-id='contactandfaq-r7cdbf5302ffdd390-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                    <div className="font-header text-xs font-semibold text-foreground" data-api-unique-id='contactandfaq-ree6536df5d3dd78d-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                      الرقم الأخضر المجاني
                    </div>
                    <div className="mt-1 font-mono text-3xl font-black text-success" data-api-unique-id='contactandfaq-r0905ab03f89367e6-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                      {tollFreeNumber}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground shadow-md" data-api-unique-id='contactandfaq-r11de30c0ea39963f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                    <PhoneCall className="h-6 w-6" data-api-unique-id='contactandfaq-ra73d280a6c8e2e6f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                  </div>
                </div>
                <div className="mt-2 font-body text-xs text-muted-foreground" data-api-unique-id='contactandfaq-r1e6309dc555d5611-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  {tollFreeDesc}
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 font-body text-sm" data-api-unique-id='contactandfaq-re3bf4920f5d36f8d-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-secondary-foreground" data-api-unique-id='contactandfaq-r918396225cf7dcd8-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  <Mail className="h-5 w-5 shrink-0 text-primary" data-api-unique-id='contactandfaq-rf9113a15bfb477f4-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                  <div className="min-w-0 flex-1" data-api-unique-id='contactandfaq-r872faeb4fade84f6-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                    <div className="text-xs text-muted-foreground" data-api-unique-id='contactandfaq-r3a266b5a6807f49f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>البريد الإلكتروني المعتمد:</div>
                    <div className="font-mono font-bold text-foreground break-all" data-api-unique-id='contactandfaq-r7a460cbb29772e9e-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>{emailValue}</div>
                  </div>
                </div>

                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-secondary-foreground transition-colors hover:border-primary/50" data-api-unique-id='contactandfaq-rba3934570bc164a7-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                  <Facebook className="h-5 w-5 shrink-0 text-primary" data-api-unique-id='contactandfaq-r50a88c4ceda1e390-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                  <div className="min-w-0 flex-1" data-api-unique-id='contactandfaq-ra1075b0d588640bb-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                    <div className="text-xs text-muted-foreground" data-api-unique-id='contactandfaq-r3095c80c1be55257-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>الصفحة الرسمية على فيسبوك:</div>
                    <div className="font-semibold text-foreground transition-colors group-hover:text-primary" data-api-unique-id='contactandfaq-r10af06d9013e9b3d-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                      {facebookValue}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-4 text-xs text-muted-foreground" data-api-unique-id='contactandfaq-rf355c294fecde755-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
              <span className="flex items-center gap-1" data-api-unique-id='contactandfaq-rd124c3ba683ebd8f-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>
                <Clock className="h-3.5 w-3.5 text-primary" data-api-unique-id='contactandfaq-r80b450f9433908a6-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq' />
                استقبال الطلبات: 24/24 ساعة
              </span>
              <span data-api-unique-id='contactandfaq-r252df2e84b9fe5d5-s310430588' data-api-unique-page-name='src/frontend/components/HomePage/ContactAndFaq'>المقر: الجزائر العاصمة</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}