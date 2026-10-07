"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronLeft, User, LogOut, Search, ShoppingCart } from "lucide-react";
import { useUserSession } from "@/tools/FrontendSession";
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const {
    username,
    reset,
    token
  } = useUserSession();
  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const navLinks = [{
    name: "الرئيسية وطلب الإطارات",
    href: "/"
  }, {
    name: "تتبع الطلبية والوصل",
    href: "/ordertracking"
  }];
  const handleLogout = () => {
    reset();
  };
  return <header className="sticky top-0 z-50 w-full min-h-16 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/40 bg-[#FAEB1A] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <img src="https://www.autocoder.cc/background/project_image/project_attachments/2312856744/2e0441ef89ee42ceab8ec1ebb1bc5266.png" alt="شعار نفطال الرسمي NAFTAL" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-header font-bold text-base sm:text-lg leading-tight text-foreground tracking-tight whitespace-nowrap">
              نفطال <span className="text-primary font-display font-black">NAFTAL</span>
            </span>
            <span className="text-[11px] font-body text-muted-foreground leading-none tracking-wider whitespace-nowrap">
              Mhatati • محطتي الرقمية
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center max-w-xl">
          {navLinks.map((item, index) => {
          const isActive = item.href === "/" ? normalizedPath === "/" : normalizedPath === item.href || normalizedPath.startsWith(item.href + "/");
          return <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-header font-medium transition-colors whitespace-nowrap rounded-md ${isActive ? "bg-secondary text-primary font-bold shadow-sm" : "text-foreground/80 hover:text-primary hover:bg-secondary/40"}`}>
                {item.name}
              </Link>;
        })}
        </nav>

        {/* Action & Account Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {token ? <div className="flex items-center gap-2">
              <Link href="/ordertracking" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-header text-foreground hover:bg-secondary/80 transition-colors">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="max-w-[120px] truncate">{username || "حساب الزبون"}</span>
              </Link>
              <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-header font-medium text-destructive-foreground bg-destructive/80 hover:bg-destructive rounded-md transition-colors" title="تسجيل الخروج">
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div> : <div className="flex items-center gap-2">
              <Link href="/customerlogin" className="text-xs sm:text-sm font-header font-medium text-foreground/80 hover:text-primary px-2.5 sm:px-3 py-1.5 rounded-md hover:bg-secondary/40 transition-colors whitespace-nowrap">
                دخول الزبون
              </Link>
              <Link href="/customerregister" className="text-xs sm:text-sm font-header font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap hidden sm:inline-block">
                فتح حساب جديد
              </Link>
            </div>}

          <Link href="/" className="hidden lg:inline-flex items-center justify-center gap-1.5 h-9 px-4 text-xs sm:text-sm font-header font-bold bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 transition-all rounded-md shadow-sm whitespace-nowrap">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>طلب إطار الآن</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="القائمة الرئيسية" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && <div className="md:hidden border-b border-border bg-card text-card-foreground shadow-lg px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item, index) => {
          const isActive = item.href === "/" ? normalizedPath === "/" : normalizedPath === item.href || normalizedPath.startsWith(item.href + "/");
          return <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2.5 rounded-md text-sm font-header font-medium flex items-center justify-between ${isActive ? "bg-secondary text-primary font-bold" : "text-foreground/90 hover:text-primary hover:bg-secondary/60"}`}>
                  <span>{item.name}</span>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </Link>;
        })}
          </nav>

          <div className="pt-3 border-t border-border/70 flex flex-col gap-2">
            {token ? <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-secondary rounded-md text-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{username || "حساب الزبون"}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">CUSTOMER</span>
                </div>
                <button type="button" onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }} className="w-full flex items-center justify-center gap-2 h-9 text-xs font-header font-semibold text-destructive-foreground bg-destructive/90 rounded-md">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div> : <div className="grid grid-cols-2 gap-2">
                <Link href="/customerlogin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-9 text-xs font-header font-medium bg-secondary text-foreground rounded-md text-center">
                  دخول الزبون
                </Link>
                <Link href="/customerregister" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-9 text-xs font-header font-medium bg-secondary text-foreground rounded-md text-center">
                  فتح حساب جديد
                </Link>
              </div>}

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center h-10 text-sm font-header font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm whitespace-nowrap">
              طلب إطار الآن
            </Link>
          </div>
        </div>}
    </header>;
}
export default Navigation;
