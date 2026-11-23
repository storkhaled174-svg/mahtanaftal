const QRCode = require('qrcode');
// Entire QR generation is local. Never send the signed link to an external QR service.
window.OrderQR = {
  clear(container) { container.replaceChildren(); },
  async mount(container, path, options = {}) {
    container.replaceChildren();
    if (!path || !path.startsWith('/order#')) {
      container.textContent = 'رابط المشاركة غير متاح حالياً. يمكن للإدارة إصداره لاحقاً.';
      return;
    }
    const url = new URL(path, location.origin).href;
    const box = document.createElement('section'); box.className = 'order-share-controls';
    const link = document.createElement('a'); link.href = url; link.textContent = 'فتح صفحة الطلبية المباشرة'; link.referrerPolicy = 'no-referrer';
    const canvas = document.createElement('canvas'); canvas.setAttribute('role','img');canvas.setAttribute('aria-label','رمز QR لصفحة الطلبية');
    const warning = document.createElement('p');warning.textContent = 'رابط خاص صالح لمدة 90 يوماً. كل من يملكه يمكنه عرض بيانات الطلبية؛ شاركه مع الزبون أو الموزع المعني فقط.';
    box.append(link,canvas,warning); container.append(box);
    try {await QRCode.toCanvas(canvas,url,{width:280,margin:4,errorCorrectionLevel:'M'});} catch {
      canvas.remove(); const msg=document.createElement('p');msg.textContent='تعذر توليد QR. يمكنك استخدام الرابط المباشر.';box.append(msg);return;
    }
    const download = document.createElement('button'); download.type = 'button';download.textContent = 'تحميل QR (PNG)';
    download.addEventListener('click',() => {const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='emahata-order-qr.png';a.click();});
    const print = document.createElement('button');print.type='button'; print.textContent='طباعة البطاقة / حفظ PDF';
    print.addEventListener('click',()=>{
      if (options.receipt) {document.body.classList.add('receipt-print');window.print();document.body.classList.remove('receipt-print');}
      else if (options.admin) {window.open(url,'_blank','noopener,noreferrer');}
      else window.print();
    });
    box.append(download,print);
    if (options.admin) {const note=document.createElement('p');note.textContent='للطباعة، افتح البطاقة ثم اختر طباعة / حفظ PDF.';box.append(note);}
  }
};
