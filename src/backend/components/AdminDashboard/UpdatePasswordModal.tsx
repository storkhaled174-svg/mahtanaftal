import React from "react";
import { KeyRound, ShieldAlert } from "lucide-react";
interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPasswordInput: string;
  setCurrentPasswordInput: (val: string) => void;
  newPasswordInput: string;
  setNewPasswordInput: (val: string) => void;
  confirmPasswordInput: string;
  setConfirmPasswordInput: (val: string) => void;
  updateError: string;
  onSave: (e: React.FormEvent) => void;
}
export default function UpdatePasswordModal({
  isOpen,
  onClose,
  currentPasswordInput,
  setCurrentPasswordInput,
  newPasswordInput,
  setNewPasswordInput,
  confirmPasswordInput,
  setConfirmPasswordInput,
  updateError,
  onSave
}: UpdatePasswordModalProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-50 duration-200" data-api-unique-id='updatepasswordmodal-rfbad7e961b991d3f-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
      <div className="w-full max-w-md bg-card text-card-foreground border border-border shadow-2xl rounded-2xl overflow-hidden" data-api-unique-id='updatepasswordmodal-r752224dc4eedcab5-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
        <div className="bg-[#143067] text-white p-5 flex items-center justify-between" data-api-unique-id='updatepasswordmodal-r1c904ef80a5c62fc-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
          <div className="flex items-center gap-2" data-api-unique-id='updatepasswordmodal-r01c7a9110dda8821-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FAEB1A]" data-api-unique-id='updatepasswordmodal-re21b11e0745424e9-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
              <KeyRound className="w-4 h-4" data-api-unique-id='updatepasswordmodal-r1c1c015bb24a4048-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
            </div>
            <div data-api-unique-id='updatepasswordmodal-rd68b8801daa37def-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
              <h3 className="text-base font-bold font-header" data-api-unique-id='updatepasswordmodal-rc436ea71e5ef0175-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>تحديث كلمة سر إدارة الطلبيات</h3>
              <p className="text-xs text-blue-100/80" data-api-unique-id='updatepasswordmodal-r1f256ee1c5050323-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>تعيين كلمة مرور جديدة للوحة التحكم</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer" data-api-unique-id='updatepasswordmodal-r689701e988f4af7b-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            ✕
          </button>
        </div>

        <form onSubmit={onSave} className="p-5 space-y-4" data-api-unique-id='updatepasswordmodal-rd6a83828061acbdb-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
          <div className="space-y-1" data-api-unique-id='updatepasswordmodal-r6f7cfa1ecce95b91-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            <label className="text-xs font-semibold text-foreground" data-api-unique-id='updatepasswordmodal-r23f482996c460b01-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>كلمة السر الحالية:</label>
            <input type="password" value={currentPasswordInput} onChange={e => setCurrentPasswordInput(e.target.value)} placeholder="كلمة السر الحالية (مثل: bach na9ch أو naftal2026)" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" required data-api-unique-id='updatepasswordmodal-r926f76f895488f7c-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
          </div>

          <div className="space-y-1" data-api-unique-id='updatepasswordmodal-rf7eb9ae6dfe05343-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            <label className="text-xs font-semibold text-foreground" data-api-unique-id='updatepasswordmodal-r26e741a12452df19-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>كلمة السر الجديدة:</label>
            <input type="password" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} placeholder="أدخل كلمة السر الجديدة (4 خانات على الأقل)" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" required data-api-unique-id='updatepasswordmodal-r88603301c530b15f-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
          </div>

          <div className="space-y-1" data-api-unique-id='updatepasswordmodal-rb1258dad3cc3e3b7-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            <label className="text-xs font-semibold text-foreground" data-api-unique-id='updatepasswordmodal-r5491854ac838a77f-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>تأكيد كلمة السر الجديدة:</label>
            <input type="password" value={confirmPasswordInput} onChange={e => setConfirmPasswordInput(e.target.value)} placeholder="أعد إدخال كلمة السر الجديدة للتأكيد" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" required data-api-unique-id='updatepasswordmodal-rb365e5b72a0d3917-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
          </div>

          {updateError && <div className="p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-1.5" data-api-unique-id='updatepasswordmodal-r4aa43a377992744c-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" data-api-unique-id='updatepasswordmodal-r4348a9e3e4a28aef-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
              <span data-api-unique-id='updatepasswordmodal-r2688eae7e48c88ae-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>{updateError}</span>
            </div>}

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-border" data-api-unique-id='updatepasswordmodal-rf5413e9eca29ac35-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer" data-api-unique-id='updatepasswordmodal-rf07c20d2ee50142f-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs" data-api-unique-id='updatepasswordmodal-ra329fa903767f1b3-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>
              <KeyRound className="w-3.5 h-3.5" data-api-unique-id='updatepasswordmodal-r9ee89bb0ac7f8060-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal' />
              <span data-api-unique-id='updatepasswordmodal-r9b023543ef74eeba-s359779263' data-api-unique-page-name='src/backend/components/AdminDashboard/UpdatePasswordModal'>حفظ كلمة السر الجديدة</span>
            </button>
          </div>
        </form>
      </div>
    </div>;
}