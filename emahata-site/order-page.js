(() => {
  // Fragment never goes to the web server or a Referer. Only the read API receives it as Authorization.
  const token = location.hash.slice(1);
  const message=document.getElementById('orderMessage'), data=document.getElementById('orderData'), retry=document.getElementById('retryOrder');
  let loading=false;
  async function load() {
    if (loading) return; loading=true;retry.disabled=true;data.hidden=true;
    document.getElementById('orderFields').replaceChildren();document.getElementById('pageQR').replaceChildren();
    message.textContent='جاري تحميل تفاصيل الطلبية…';
    try {
      if (!token) throw new Error('هذا الرابط لا يحتوي على تصريح عرض. افتح الرابط الخاص الموجود في رمز QR.');
      const response=await fetch('/api/order',{headers:{Authorization:'Bearer '+token},cache:'no-store',referrerPolicy:'no-referrer'});
      const order=await response.json();
      if (!response.ok) throw new Error(order.error || 'تعذر تحميل الطلبية');
      document.getElementById('orderNumber').textContent=order.orderNumber;
      document.getElementById('orderDisplay').textContent=order.displayNumber || '';
      document.getElementById('orderStatus').textContent=order.status;
      const fields=[['الزبون',order.fullName],['الهاتف الأول',order.phone1],['الهاتف الثاني',order.phone2],['رقم بطاقة التعريف',order.nid],['تسجيل المركبة',order.registrationNumber],['العلامة',order.brand],['الأبعاد',order.size],['العدد',order.quantity],['العنوان',[order.wilaya,order.baladiya,order.address].filter(Boolean).join(' — ')],['نوع المركبة',order.vehicleType],['تاريخ الطلب',order.date && !Number.isNaN(Date.parse(order.date)) ? new Intl.DateTimeFormat('ar-DZ',{dateStyle:'long',timeStyle:'short',timeZone:'Africa/Algiers'}).format(new Date(order.date)) : null]];
      for (const [label,value] of fields) {const div=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value || 'غير مسجل';div.append(dt,dd);document.getElementById('orderFields').append(div);}
      data.hidden=false; message.textContent='الحالة الحالية من قاعدة البيانات — حدّث الصفحة للتحقق مجدداً.';
      await window.OrderQR.mount(document.getElementById('pageQR'),'/order#'+token);
    } catch (error) {message.textContent=error.message || 'تعذر تحميل الطلبية. حاول مجدداً.';}
    finally {loading=false;retry.disabled=false;}
  }
  retry.addEventListener('click',load);load();
})();
