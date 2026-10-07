"use client";

import React, { useState, useEffect } from "react";
import { Headphones, Save, AlertCircle } from "lucide-react";
import { SupportChannel, SupportChannelFormData } from "@/backend/types/AdminContentSupport";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
interface SupportChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelToEdit?: SupportChannel | null;
  onSave: (data: SupportChannelFormData, id?: string) => void;
}
export const SupportChannelModal: React.FC<SupportChannelModalProps> = ({
  isOpen,
  onClose,
  channelToEdit,
  onSave
}) => {
  const [formData, setFormData] = useState<SupportChannelFormData>({
    title: "",
    value: "",
    description: "",
    isActive: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (channelToEdit) {
      setFormData({
        title: channelToEdit.title,
        value: channelToEdit.value,
        description: channelToEdit.description || "",
        isActive: channelToEdit.isActive
      });
    } else {
      setFormData({
        title: "",
        value: "",
        description: "",
        isActive: true
      });
    }
    setErrors({});
  }, [channelToEdit, isOpen]);
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "يرجى إدخال اسم القناة وتسميتها الرسمية";
    }
    if (!formData.value.trim()) {
      newErrors.value = "يرجى إدخال قيمة وسيلة الاتصال (مثل 1050 أو البريد الإلكتروني)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData, channelToEdit?.id);
    }
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='supportchannelmodal-r38dc0d6fa95502c6-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg border-border bg-card text-card-foreground p-6 shadow-card" data-api-unique-id='supportchannelmodal-r069b476737446f85-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
        <DialogHeader className="text-right" data-api-unique-id='supportchannelmodal-r3866151b2adc1ca2-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
          <div className="flex items-center gap-2.5" data-api-unique-id='supportchannelmodal-re2e1fd4d41c3b8f0-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground" data-api-unique-id='supportchannelmodal-r54054b4a03001f84-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              <Headphones className="h-5 w-5 text-accent" data-api-unique-id='supportchannelmodal-r5f749a3ab75be2a9-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
            </div>
            <div data-api-unique-id='supportchannelmodal-ra0076af9b505fe6e-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              <DialogTitle className="font-header text-base font-bold text-foreground" data-api-unique-id='supportchannelmodal-r50ca7721defea49f-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                {channelToEdit ? "تعديل بيانات قناة الاتصال والدعم" : "إضافة وسيلة اتصال ودعم فني جديدة"}
              </DialogTitle>
              <DialogDescription className="font-body text-xs text-muted-foreground" data-api-unique-id='supportchannelmodal-r0fde2d25e3aeefec-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                ضبط قنوات التواصل الرسمية لمركز خدمة الزبائن والمواطنين بنفطال
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4" data-api-unique-id='supportchannelmodal-r81acb8ca3676ed7e-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
          {/* Title Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='supportchannelmodal-rb681ce9acb046346-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <label className="font-header text-xs font-semibold text-foreground" data-api-unique-id='supportchannelmodal-rb98ea7f41b514b5e-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              اسم القناة وتسميتها الرسمية (Title) <span className="text-destructive" data-api-unique-id='supportchannelmodal-r736077c376f35a21-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>*</span>
            </label>
            <input type="text" value={formData.title} onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} placeholder="مثال: الرقم الأخضر الوطني المجاني (1050)" className={`h-9 w-full rounded-lg border bg-input px-3 font-body text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.title ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`} data-api-unique-id='supportchannelmodal-r721a526b8b2d53d9-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
            {errors.title && <span className="flex items-center gap-1 text-[11px] font-medium text-destructive" data-api-unique-id='supportchannelmodal-r936f1fc1153c9845-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                <AlertCircle className="h-3 w-3" data-api-unique-id='supportchannelmodal-ra4fae16ec839b5a8-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
                {errors.title}
              </span>}
          </div>

          {/* Value Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='supportchannelmodal-r034e736795de81c9-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <label className="font-header text-xs font-semibold text-foreground" data-api-unique-id='supportchannelmodal-r709493e08ba1a075-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              قيمة وسيلة الاتصال أو الرقم أو البريد (Value) <span className="text-destructive" data-api-unique-id='supportchannelmodal-r568e62f2696bdfce-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>*</span>
            </label>
            <input type="text" dir="ltr" value={formData.value} onChange={e => setFormData({
            ...formData,
            value: e.target.value
          })} placeholder="مثال: 1050 أو contact@naftal.dz" className={`h-9 w-full rounded-lg border bg-input px-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.value ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`} data-api-unique-id='supportchannelmodal-re660d6cce46f6a57-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
            {errors.value && <span className="flex items-center gap-1 text-[11px] font-medium text-destructive" data-api-unique-id='supportchannelmodal-rc138d0941f60b51a-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                <AlertCircle className="h-3 w-3" data-api-unique-id='supportchannelmodal-re46d642f1a5fae3f-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
                {errors.value}
              </span>}
          </div>

          {/* Description / Working Hours Field */}
          <div className="flex flex-col gap-1.5" data-api-unique-id='supportchannelmodal-rd0fa26f550b1bc5c-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <label className="font-header text-xs font-semibold text-foreground" data-api-unique-id='supportchannelmodal-r531f0abc56da9a5f-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              الوصف التشغيلي ومواقيت العمل وملاحظات مركز الاتصال (Description)
            </label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({
            ...formData,
            description: e.target.value
          })} placeholder="مثال: متاح طيلة أيام الأسبوع من 08:00 صباحاً حتى 20:00 مساءً للرد على استفسارات طلبيات الإطارات والدفع بالذهبية..." className="w-full rounded-lg border border-border bg-input p-3 font-body text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" data-api-unique-id='supportchannelmodal-r0ad81a69c26748d7-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
          </div>

          {/* Is Active Switch / Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3" data-api-unique-id='supportchannelmodal-reb2af0c4803929dc-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <div className="flex flex-col" data-api-unique-id='supportchannelmodal-r1e19df907e191037-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              <span className="font-header text-xs font-bold text-foreground" data-api-unique-id='supportchannelmodal-rc6322e065425406f-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                تفعيل ظهور القناة (is_active)
              </span>
              <span className="font-body text-[11px] text-muted-foreground" data-api-unique-id='supportchannelmodal-r0619ee77d0a280f7-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
                إتاحة هذه القناة مباشرة في واجهة الدعم والمساعدة للمواطنين
              </span>
            </div>

            <button type="button" onClick={() => setFormData({
            ...formData,
            isActive: !formData.isActive
          })} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${formData.isActive ? "bg-success" : "bg-muted"}`} data-api-unique-id='supportchannelmodal-ree6c50baa24bf96e-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.isActive ? "translate-x-0" : "-translate-x-5"}`} data-api-unique-id='supportchannelmodal-r4114d1e3c8356405-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
            </button>
          </div>

          {/* Modal Footer */}
          <DialogFooter className="mt-2 flex items-center justify-end gap-2 sm:gap-2" data-api-unique-id='supportchannelmodal-r18b1a54a136748c8-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
            <button type="button" onClick={onClose} className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted px-4 font-header text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='supportchannelmodal-r3d5df9baade2ea4c-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              إلغاء
            </button>
            <button type="submit" className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-header text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-primary/80" data-api-unique-id='supportchannelmodal-r199a47e26de6ada2-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>
              <Save className="h-4 w-4" data-api-unique-id='supportchannelmodal-rd857e8fc63e72172-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal' />
              <span data-api-unique-id='supportchannelmodal-re7a45191f651aa86-s2176254318' data-api-unique-page-name='src/backend/components/AdminContentSupport/SupportChannelModal'>{channelToEdit ? "تحديث قناة الاتصال" : "حفظ وتفعيل القناة"}</span>
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>;
};
export default SupportChannelModal;