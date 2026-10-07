import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Fuel } from "lucide-react";
export function Footer() {
  const quickLinks = [{
    label: "الرئيسية وطلب الإطارات",
    href: "/"
  }, {
    label: "تتبع الطلبية والوصل",
    href: "/ordertracking"
  }, {
    label: "دخول الزبون",
    href: "/customerlogin"
  }, {
    label: "تسجيل حساب جديد",
    href: "/customerregister"
  }];
  return <footer className="w-full bg-card border-t border-border text-card-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Introduction */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/40 bg-[#FAEB1A] p-0.5 flex items-center justify-center shadow-md">
                <img src="https://www.autocoder.cc/background/project_image/project_attachments/2312856744/2e0441ef89ee42ceab8ec1ebb1bc5266.png" alt="شعار نفطال الرسمي NAFTAL" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-header font-bold text-lg text-foreground tracking-tight">
                  نفطال <span className="text-primary font-display font-black">NAFTAL</span>
                </span>
                <span className="text-xs font-body text-muted-foreground">
                  Mhatati • محطتي الرقمية
                </span>
              </div>
            </div>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              المنصة الرقمية الوطنية المعتمدة لتوزيع عجلات السيارات الرسمية (Continental و Iris) التابعة للشركة الوطنية لتسويق وتوزيع المنتجات البترولية نفطال - فرع سوناطراك.
            </p>
            <div className="flex items-center gap-2 text-xs font-body text-primary pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>خدمة عمومية رسمية ومحمية</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-header font-bold text-base text-foreground border-r-2 border-primary pr-2">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-sm font-body">
              {quickLinks.map((link, index) => <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors inline-block">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-header font-bold text-base text-foreground border-r-2 border-primary pr-2">
              معلومات الاتصال والدعم
            </h3>
            <ul className="space-y-3 text-sm font-body">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground/70">الرقم الأخضر المجاني المعتمد</span>
                  <span className="font-bold text-foreground font-mono text-sm">1050</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground/70">البريد الإلكتروني الرسمي</span>
                  <span className="text-foreground font-mono text-xs">contact@naftal.dz</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>الجزائر العاصمة، الجمهورية الجزائرية الديمقراطية الشعبية</span>
              </li>
            </ul>
          </div>

          {/* Service Quality Notice */}
          <div className="space-y-4">
            <h3 className="font-header font-bold text-base text-foreground border-r-2 border-primary pr-2">
              التزام الجودة والمطابقة
            </h3>
            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border space-y-2">
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                تلتزم نفطال بتوفير الإطارات المعتمدة بالأسعار المقننة والموثقة مع حماية حق المواطن عبر التحقق من البطاقة الذهبية وبطاقة التعريف الوطنية.
              </p>
              <div className="flex items-center gap-2 text-xs font-header font-semibold text-foreground/90">
                <Fuel className="w-3.5 h-3.5 text-primary" />
                <span>نفطال: معاً على طريق الأمان والسيادة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="border-t border-border/70 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-body text-muted-foreground gap-4">
          <p>© 2026 نفطال (Naftal Spa) - الجمهورية الجزائرية الديمقراطية الشعبية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              الشروط والأحكام
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/ordertracking" className="hover:text-primary transition-colors">
              بوابة التحقق والوصل
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}
export default Footer;
