'use client'

import { useRouter } from 'next/navigation'
import { useAdminSession } from '@/tools/BackendSession'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { create } from 'zustand'

// 登录路由
const LOGIN_ROUTE = '/adminlogin'

// 弹窗状态管理
interface AuthDialogState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))

// 获取 Token
export function getToken(): string | null {
  const session = useAdminSession.getState()
  return session.token || null
}

// 清除登录态
export function clearAuth(): void {
  useAdminSession.getState().reset()
}

/**
 * 401 未登录处理
 * 逻辑：清除本地缓存并触发全局弹窗
 * 注意：如果当前已在登录页，则不弹窗（避免检测登录状态时误弹）
 */
export function handleUnauthorized(): void {
  clearAuth()
  
  // 已经在登录页，不弹窗（用 includes 兼容 basePath 和尾部斜杠）
  if (typeof window !== 'undefined' && window.location.pathname.includes(LOGIN_ROUTE)) {
    return
  }
  
  useAuthDialog.getState().open()
}

// 401 Dialog 组件（在后台 layout 挂载）
export function AuthExpiredDialog() {
  const router = useRouter()
  const { isOpen, close } = useAuthDialog()

  const handleLogin = () => {
    close()
    router.push(LOGIN_ROUTE)
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {/* 右下角弹窗(不允许修改弹窗位置，仅修改颜色、圆角) */}
      <DialogContent className="fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 max-w-sm rounded-lg border border-border bg-card p-5 text-card-foreground shadow-card">
        <DialogHeader className="text-right">
          <DialogTitle className="font-header text-base font-bold text-foreground">
            انتهت صلاحية الجلسة الإدارية
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            يرجى تسجيل الدخول مجدداً للوصول إلى لوحة تحكم نفطال محطتي ومتابعة العمليات.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={close}
            className="border-border bg-secondary font-header text-sm text-secondary-foreground hover:bg-muted"
          >
            إلغاء
          </Button>
          <Button
            onClick={handleLogin}
            className="bg-primary font-header text-sm font-bold text-primary-foreground hover:bg-accent"
          >
            تسجيل الدخول
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
