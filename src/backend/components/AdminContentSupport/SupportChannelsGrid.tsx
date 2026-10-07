"use client";

import React from "react";
import { PhoneCall, Mail, Headphones, Clock, Edit3, Copy, Plus } from "lucide-react";
import { SupportChannel } from "@/backend/types/AdminContentSupport";
import { toast } from "sonner";
interface SupportChannelsGridProps {
  channels: SupportChannel[];
  onToggleActive: (id: string, currentState: boolean) => void;
  onEdit: (channel: SupportChannel) => void;
  onAddNew: () => void;
}
export const SupportChannelsGrid: React.FC<SupportChannelsGridProps> = ({
  channels,
  onToggleActive,
  onEdit,
  onAddNew
}) => {
  const handleCopyValue = (value: string, title: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`تم نسخ ${title}: ${value}`);
  };
  const getChannelIcon = (title: string, value: string) => {
    if (value.includes("@") || title.includes("بريد")) {
      return <Mail className="h-4 w-4" data-api-unique-id='supportchannelsgrid-r1bf5151b278914d3-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' />;
    }
    if (value.includes("1050") || title.includes("أخضر") || title.includes("هاتف")) {
      return <PhoneCall className="h-4 w-4" data-api-unique-id='supportchannelsgrid-re57abfa0d283cf81-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' />;
    }
    return <Headphones className="h-4 w-4" data-api-unique-id='supportchannelsgrid-r6c1bccc13cab15a8-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' />;
  };
  return <div className="flex min-w-0 flex-col gap-4" data-api-unique-id='supportchannelsgrid-r67baa44545f60dfa-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
      {/* Section Header */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='supportchannelsgrid-r79bb38cd2bc61d8e-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
        <div data-api-unique-id='supportchannelsgrid-re55c80bd4c930bdd-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
          <h2 className="font-header text-base font-bold text-foreground sm:text-lg" data-api-unique-id='supportchannelsgrid-r2a25023a7f147d6e-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
            قنوات الاتصال والدعم الفني المباشر للمواطنين (Support Channels)
          </h2>
          <p className="font-body text-xs text-muted-foreground" data-api-unique-id='supportchannelsgrid-r7297ed7da8a38bcc-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
            إدارة أرقام الهواتف الرسمية، البريد الإلكتروني، وساعات عمل مركز النداء 1050 الظاهرة في منصة نفطال محطتي
          </p>
        </div>

        <button type="button" onClick={onAddNew} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-secondary px-3 font-header text-xs font-semibold text-secondary-foreground shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='supportchannelsgrid-reffb39636b30aa44-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
          <Plus className="h-3.5 w-3.5 text-accent" data-api-unique-id='supportchannelsgrid-r2effb6b114cdf9d7-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' />
          <span data-api-unique-id='supportchannelsgrid-r464e6b867e9c220d-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>إضافة قناة دعم جديدة</span>
        </button>
      </div>

      {/* Grid of Support Channel Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" data-api-unique-id='supportchannelsgrid-r0133d6d36c6f7571-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid'>
        {channels.map((channel, index) => {
        const isGreenNumber = channel.value.includes("1050") || channel.title.includes("1050");
        const formattedDate = channel.updatedAt ? new Date(channel.updatedAt).toLocaleDateString("ar-DZ") : "";
        return <div key={channel.id} className={`flex min-w-0 flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all ${channel.isActive ? isGreenNumber ? "border-primary/80 shadow-gold" : "border-border" : "border-border/50 opacity-75"}`} data-api-unique-id='supportchannelsgrid-r32e12bc96b898d79-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
              {/* Card Header: Title & Switch */}
              <div className="flex min-w-0 items-start justify-between gap-3" data-api-unique-id='supportchannelsgrid-rb41152e965809fd7-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                <div className="flex min-w-0 items-start gap-2.5" data-api-unique-id='supportchannelsgrid-rfb5c0c606071833c-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isGreenNumber ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`} data-api-unique-id='supportchannelsgrid-r26f5c08ccca1a054-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                    {getChannelIcon(channel.title, channel.value)}
                  </div>
                  <div className="min-w-0" data-api-unique-id='supportchannelsgrid-r4275aa04516d308e-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                    <div className="flex items-center gap-1.5" data-api-unique-id='supportchannelsgrid-r8b9275564e7ab7fa-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                      <h3 className="font-header text-xs font-bold text-foreground" data-api-unique-id='supportchannelsgrid-rfd3f2c964e8b91ee-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' data-api-bind-info={`channels-${index}-title`} data-api-map-var-name='channel'>
                        {channel.title}
                      </h3>
                      {isGreenNumber && <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground" data-api-unique-id='supportchannelsgrid-r8f1536a61aae902f-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                          مجاني
                        </span>}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground" data-api-unique-id='supportchannelsgrid-rfc03cac9e0cdb593-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' data-api-bind-info={`channels-${index}-id`} data-api-map-var-name='channel'>
                      ID: {channel.id}
                    </span>
                  </div>
                </div>

                {/* Inline Toggle Switch */}
                <div className="flex shrink-0 flex-col items-end gap-1" data-api-unique-id='supportchannelsgrid-r7bb1996263717403-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <button type="button" onClick={() => onToggleActive(channel.id, channel.isActive)} title={channel.isActive ? "تعطيل القناة" : "تفعيل القناة"} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${channel.isActive ? "bg-success" : "bg-muted"}`} data-api-unique-id='supportchannelsgrid-rff4ca11469d6b115-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${channel.isActive ? "translate-x-0" : "-translate-x-4"}`} data-api-unique-id='supportchannelsgrid-rd681c46fa23407c7-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' />
                  </button>
                  <span className={`text-[9px] font-semibold ${channel.isActive ? "text-success" : "text-muted-foreground"}`} data-api-unique-id='supportchannelsgrid-r0304dafbb5f48e78-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                    {channel.isActive ? "نشط" : "معطل"}
                  </span>
                </div>
              </div>

              {/* Value Box with Quick Copy */}
              <div className="mt-3.5 flex min-w-0 items-center justify-between rounded-lg border border-border/80 bg-input p-2.5" data-api-unique-id='supportchannelsgrid-rdec255dc86590988-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='supportchannelsgrid-re1ef7fbc71f26869-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <span className="block text-[10px] text-muted-foreground font-body" data-api-unique-id='supportchannelsgrid-ra6866044f5f764a6-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>قيمة وسيلة الاتصال:</span>
                  <span className="block font-mono text-xs font-bold tracking-wider text-foreground truncate" dir="ltr" data-api-unique-id='supportchannelsgrid-r6a904587df971953-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' data-api-bind-info={`channels-${index}-value`} data-api-map-var-name='channel'>
                    {channel.value}
                  </span>
                </div>
                <button type="button" onClick={() => handleCopyValue(channel.value, channel.title)} title="نسخ قيمة وسيلة الاتصال" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='supportchannelsgrid-r2e6ec8435940cccf-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <Copy className="h-3.5 w-3.5" data-api-unique-id='supportchannelsgrid-rb1396733a06729cc-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' />
                </button>
              </div>

              {/* Description & Working Hours */}
              <div className="mt-3 min-w-0 flex-1 rounded-md bg-muted/40 p-2 text-xs" data-api-unique-id='supportchannelsgrid-re1e395106495a435-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground" data-api-unique-id='supportchannelsgrid-r2a2d36d40a30820d-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <Clock className="h-3 w-3" data-api-unique-id='supportchannelsgrid-rbdc9b2dde037a70d-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' />
                  <span data-api-unique-id='supportchannelsgrid-reac58f9ca975ca64-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>مواقيت الخدمة والوصف التشغيلي:</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground font-body" data-api-unique-id='supportchannelsgrid-r41568bcae7d9d2ae-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  {channel.description || "لا يوجد وصف إضافي محدد لهذه القناة."}
                </p>
              </div>

              {/* Card Footer: Timestamp & Edit CTA */}
              <div className="mt-4 flex min-w-0 items-center justify-between border-t border-border/50 pt-2.5 text-[11px]" data-api-unique-id='supportchannelsgrid-r7d6bf068787837ed-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                <span className="font-mono text-muted-foreground text-[10px]" data-api-unique-id='supportchannelsgrid-r9bcc1af1da7011a3-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  تحديث: {formattedDate}
                </span>

                <button type="button" onClick={() => onEdit(channel)} className="inline-flex items-center gap-1 font-header text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='supportchannelsgrid-r72d87dacfdda62d9-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>
                  <Edit3 className="h-3.5 w-3.5" data-api-unique-id='supportchannelsgrid-r53fe89f6fb7613c6-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1' />
                  <span data-api-unique-id='supportchannelsgrid-r6c5721ae3ab58d11-s2081444787' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelsGrid' data-api-in-loop='1'>تعديل البيانات</span>
                </button>
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default SupportChannelsGrid;