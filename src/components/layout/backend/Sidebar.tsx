"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Layers, FileQuestion, ShieldCheck, Fuel, LogOut, UserCheck } from "lucide-react";
import { useAdminSession } from "@/tools/BackendSession";
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    username,
    reset,
    token
  } = useAdminSession();
  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const menuItems = [{
    name: "لوحة التحكم التشغيلي",
    href: "/admindashboard",
    icon: LayoutDashboard
  }, {
    name: "إدارة المخزون والمقاسات والأسعار",
    href: "/adminstockmanagement",
    icon: Layers
  }, {
    name: "إدارة المحتوى والدعم والأسئلة الشائعة",
    href: "/admincontentsupport",
    icon: FileQuestion
  }];
  const handleLogout = () => {
    void fetch('/api/admin/logout', {method:'POST'});
    reset();
    router.push("/adminlogin");
  };
  return <aside className="w-60 shrink-0 h-full min-h-0 bg-sidebar text-sidebar-foreground border-l border-sidebar-border flex flex-col select-none">
      {/* Brand & System Status */}
      <div className="shrink-0 p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-black shadow-sm shrink-0">
            <span className="font-display text-lg font-black leading-none">N</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-header font-bold text-sm text-sidebar-foreground truncate">
              نفطال <span className="font-display text-sidebar-primary">Naftal</span>
            </span>
            <span className="text-[11px] font-body text-sidebar-foreground/70 truncate">
              الإدارة المركزية
            </span>
          </div>
        </div>

        {/* Security / RLS badge */}
        <div className="mt-3 px-2.5 py-1.5 rounded bg-sidebar-accent/60 border border-sidebar-border flex items-center gap-2 text-[11px] text-sidebar-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-sidebar-primary shrink-0" />
          <span className="truncate">جلسة RLS إدارية مشفرة</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
        <div className="px-2 py-1.5 text-[10px] font-header font-bold uppercase tracking-wider text-sidebar-foreground/50">
          القوائم التشغيلية
        </div>
        {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = normalizedPath === item.href || normalizedPath.startsWith(item.href + "/");
        return <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-header font-medium transition-colors min-w-0 ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="min-w-0 truncate whitespace-nowrap">{item.name}</span>
            </Link>;
      })}
      </nav>

      {/* Admin User Profile & Logout */}
      <div className="shrink-0 p-3 border-t border-sidebar-border bg-sidebar/60 space-y-2">
        <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-sidebar-accent/40 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <UserCheck className="w-3.5 h-3.5 text-sidebar-primary shrink-0" />
            <span className="truncate font-body text-sidebar-foreground/90 font-medium">
              {username || (token ? "مشرف النظام" : "غير مسجل")}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sidebar-primary/20 text-sidebar-primary font-mono shrink-0">
            ADMIN
          </span>
        </div>

        <button type="button" onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-header font-semibold text-destructive-foreground bg-destructive/90 hover:bg-destructive transition-colors cursor-pointer">
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>تسجيل الخروج الآمن</span>
        </button>

        {/* System Meta */}
        <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/60 pt-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <Fuel className="w-3.5 h-3.5 text-sidebar-primary shrink-0" />
            <span className="truncate">نظام محطتي 2026</span>
          </div>
          <span className="font-mono text-[10px] bg-sidebar-accent px-1.5 py-0.5 rounded text-sidebar-foreground/80">
            v2.4
          </span>
        </div>
      </div>
    </aside>;
}
export default Sidebar;
