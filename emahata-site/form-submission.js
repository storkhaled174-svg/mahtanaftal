(() => {
    const form = document.getElementById('naftalForm');
    const submit = document.getElementById('registrationSubmit');
    const errorBox = document.getElementById('submissionError');
    const modal = document.getElementById('orderSuccessDialog');
    const nameInput = document.getElementById('fullName');
    const nameMessage = 'عذراً، حقل الاسم واللقب الكامل يجب أن يحتوي على حروف فقط ولا يسمح بكتابة الأرقام أو الرموز الخاصة.';
    const validFullName = value => typeof value === 'string' && /^[\p{L} ]+$/u.test(value) && /^[\p{Script=Arabic}\p{Script=Latin} ]+$/u.test(value) && /\p{L}/u.test(value);
    function updateName() {
        const valid = validFullName(nameInput.value);
        nameInput.setCustomValidity(valid ? '' : nameMessage);
        nameInput.setAttribute('aria-invalid', String(!valid));
        return valid;
    }
    nameInput.addEventListener('input', () => {
        if (!updateName()) {
            errorBox.textContent = nameMessage;
            errorBox.hidden = false;
        } else {
            if (errorBox.textContent === nameMessage) errorBox.hidden = true;
        }
    });
    form.addEventListener('reset', () => {
        nameInput.setCustomValidity('');
        nameInput.removeAttribute('aria-invalid');
    });
    const originalLabel = submit.textContent;
    const validateCustomId = (value) => {
        if (typeof value !== 'string' || !/^[0-9]{8}$/.test(value)) {
            return "يرجى إدخال 8 أرقام فقط";
        }
        // Reject four-digit ascending/descending runs at any position (no wraparound).
        for (let i = 0; i <= value.length - 4; i++) {
            const run = value.slice(i, i + 4);
            if ('0123456789'.includes(run) || '9876543210'.includes(run)) {
                return "يرجى إدخال رقم البطاقة الصحيح";
            }
        }
        // Reject a two-digit block repeated across the ID, or six identical digits in a row.
        if (/^([0-9]{2})\1{3}$/.test(value) || /([0-9])\1{5}/.test(value)) {
            return "يرجى إدخال رقم البطاقة الصحيح";
        }
        if (value.startsWith('1')) return true;
        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 62807030 && num <= 62807039) {
            return "يرجى إدخال رقم البطاقة الصحيح";
        }
        return true;
    };
    const cardInput = document.getElementById('dahabiaInput');
    const cardError = document.getElementById('dahabiaError');
    const cardMessage = 'يرجى إدخال رقم البطاقة الصحيح';
    let touched = false;
    let busy = false;
    let serverRejected = false;
    function updateCard() {
        const result = validateCustomId(cardInput.value);
        const valid = !serverRejected && result === true;
        const message = result === true ? cardMessage : result;
        cardError.textContent = message;
        cardInput.setCustomValidity(valid ? '' : message);
        const showError = !valid && touched;
        if (showError) errorBox.hidden = true;
        cardInput.setAttribute('aria-invalid', String(showError));
        cardError.hidden = !showError;
        submit.disabled = busy || !valid;
        return valid;
    }
    cardInput.addEventListener('input', () => {
        serverRejected = false;
        touched = true;
        updateCard();
    });
    cardInput.addEventListener('blur', () => { touched = true; updateCard(); });
    form.addEventListener('reset', () => {
        touched = false;
        serverRejected = false;
        setTimeout(updateCard, 0);
    });
    updateCard();
    let pendingOrderNumber = null;
    let confirmedOrderNumber = '';
    let pendingDate = null;
    let carrySaved = false;
    let databaseSaved = false;
    let orderSharePath = null;
    const text = (id, value) => { document.getElementById(id).textContent = value; };
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!updateName()) {
            errorBox.textContent = nameMessage;
            errorBox.hidden = false;
            nameInput.reportValidity();
            nameInput.focus();
            return;
        }
        touched = true;
        if (busy || !updateCard() || !form.reportValidity()) return;
        errorBox.hidden = true;
        if (typeof validLocationSelection === 'function' && !validLocationSelection()) {
            errorBox.textContent = 'يرجى اختيار الولاية والبلدية من القوائم.';
            errorBox.hidden = false;
            return;
        }
        busy = true;
        submit.disabled = true;
        submit.textContent = 'جاري تسجيل الطلبية…';
        form.setAttribute('aria-busy', 'true');
        // Create before sending so Formcarry and the customer's receipt share one reference.
        pendingOrderNumber ||= `NFT-${new Date().getFullYear()}-${crypto.randomUUID().toUpperCase()}`;
        const fields = new FormData(form);
        fields.set('orderNumber', pendingOrderNumber);
        pendingDate ||= new Date().toISOString();
        fields.set('date', pendingDate);
        const summary = {
            name: String(fields.get('name') || ''),
            identity: String(fields.get('nid') || ''),
            size: String(fields.get('size') || ''),
            quantity: String(fields.get('quantity') || ''),
            date: pendingDate,
            vehicleType: String(fields.get('vehicleType') || 'غير محدد في الاستمارة'),
            wilaya: document.getElementById('wilaya').selectedOptions[0]?.textContent || '',
            municipality: document.getElementById('baladiya').selectedOptions[0]?.textContent || ''
        };
        try {
            const payload = Object.fromEntries(fields);
            const databaseOrder = {
                ...payload, orderNumber: pendingOrderNumber, date: pendingDate,
                fullName: payload.name, phone1: payload.phone, phone2: payload.phone2,
                wilaya: payload.wilaya, baladiya: payload.baladiya,
                brand: payload.brand, size: payload.size, quantity: payload.quantity,
                nid: payload.nid, dahabia: payload.dahabia, expiry: payload.expiry
            };
            const tasks = [
                carrySaved ? (async () => {}) : (async () => {
                    const response = await fetch('https://formcarry.com/s/wBFskeIx7lr', {
                        method: 'POST', headers: { Accept: 'application/json' }, body: fields
                    });
                    const result = await response.json();
                    if (!response.ok || Number(result.code) !== 200) throw new Error('Formcarry');
                    carrySaved = true;
                }),
                databaseSaved ? (async () => {}) : (async () => {
                    const response = await fetch('/api/orders', {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(databaseOrder)
                    });
                    if (!response.ok) {
                        const result = await response.json().catch(() => ({}));
                        if (result.field === 'dahabia') {
                            const error = new Error(cardMessage);
                            error.field = 'dahabia';
                            throw error;
                        }
                        throw new Error('Database');
                    }
                    const saved = await response.json();
                    orderSharePath = saved.sharePath || null;
                    databaseSaved = true;
                    // Refresh only an authenticated admin view; never expose private orders publicly.
                    if (typeof adminPassword !== 'undefined' && adminPassword) {
                        const savedOrder = { ...databaseOrder, id: pendingOrderNumber, status: 'جديد' };
                        if (!allOrders.some(order => order.id === savedOrder.id)) allOrders.unshift(savedOrder);
                        document.getElementById('totalOrdersCount').textContent = allOrders.length;
                        document.getElementById('registeredUsersCount').textContent = new Set(allOrders.map(order => String(order.phone1 || '').trim()).filter(Boolean)).size;
                        filterOrders();
                        // Reconcile against authoritative counters, including simultaneous submissions.
                        await renderAdminOrders();
                    }
                })
            ].reverse();
            const outcomes = [];
            // Our API must accept the card before external delivery.
            for (const task of tasks) {
                try { await task(); outcomes.push({status: 'fulfilled'}); }
                catch (reason) { outcomes.push({status: 'rejected', reason}); break; }
            }
            const cardFailure = outcomes.find(result => result.status === 'rejected' && result.reason.field === 'dahabia');
            if (cardFailure) throw cardFailure.reason;
            if (outcomes.some(result => result.status === 'rejected')) throw new Error('Partial or failed submission');
            confirmedOrderNumber = pendingOrderNumber;
            pendingOrderNumber = null;
            pendingDate = null;
            carrySaved = false;
            databaseSaved = false;
            text('successOrderNumber', confirmedOrderNumber);
            text('successCustomerName', summary.name);
            text('successIdentity', summary.identity);
            text('successTireSize', summary.size);
            text('successQuantity', summary.quantity);
            text('successCustomerWilaya', [summary.wilaya, summary.municipality].filter(Boolean).join(' - '));
            text('successOrderDate', new Intl.DateTimeFormat('ar-DZ', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(summary.date)));
            text('successVehicleType', summary.vehicleType);
            text('copyOrderStatus', '');
            text('copyOrderNumber', '📋 نسخ رقم الطلبية');
            form.reset();
            if (typeof resetLocationPickers === 'function') resetLocationPickers();
            modal.showModal();
            if (window.OrderQR) await window.OrderQR.mount(document.getElementById('successQR'),orderSharePath,{receipt:true});
            orderSharePath = null;
        } catch (error) {
            if (error.field === 'dahabia') {
                serverRejected = true;
                touched = true;
                cardInput.setAttribute('aria-invalid', 'true');
                cardError.hidden = false;
                errorBox.hidden = true;
                cardInput.focus();
                return;
            }
            errorBox.textContent = carrySaved || databaseSaved
                ? 'تم حفظ الطلب في إحدى الخدمتين، وتعذر تأكيد الخدمة الأخرى. اضغط الإرسال مجدداً لإكمالها بنفس رقم الطلب، ولا تغلق الصفحة.'
                : 'تعذر تأكيد تسجيل الطلبية. تحقق من الاتصال وحاول مجدداً. بياناتك ما زالت في الاستمارة.';
            errorBox.hidden = false;
        } finally {
            busy = false;
            updateCard();
            submit.textContent = originalLabel;
            form.removeAttribute('aria-busy');
        }
    });
    document.getElementById('copyOrderNumber').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(confirmedOrderNumber);
            text('copyOrderNumber', '✅ تم النسخ!');
            text('copyOrderStatus', 'تم نسخ رقم الطلبية بنجاح.');
        } catch {
            text('copyOrderStatus', 'تعذر النسخ التلقائي؛ يمكنك تحديد رقم الطلبية ونسخه يدوياً.');
        }
    });
    document.getElementById('closeOrderSuccess').addEventListener('click', () => {
        modal.close();
        window.location.assign('/');
    });
    modal.addEventListener('close', () => document.getElementById('fullName').focus());
})();
