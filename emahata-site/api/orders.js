function validQuantity(value) {
  return typeof value === 'string' && /^[1-4]$/.test(value);
}
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
const validFullName = value => typeof value === 'string' && /^[\p{L} ]+$/u.test(value) && /^[\p{Script=Arabic}\p{Script=Latin} ]+$/u.test(value) && /\p{L}/u.test(value);
const nameMessage = 'عذراً، حقل الاسم واللقب الكامل يجب أن يحتوي على حروف فقط ولا يسمح بكتابة الأرقام أو الرموز الخاصة.';
const { neon } = require('@neondatabase/serverless');
const { createHash, timingSafeEqual } = require('node:crypto');
function authorized(req) {
  const supplied = String(req.headers.authorization || '').replace(/^Bearer /, '').trim();
  // Ignore accidental surrounding whitespace in both configuration and pasted input.
  const expected = String(process.env.ADMIN_PASSWORD || '').trim();
  return !!expected && timingSafeEqual(createHash('sha256').update(supplied).digest(), createHash('sha256').update(expected).digest());
}
// Legacy notes predate the dedicated status. A manual status choice overrides them.
function effectiveOrder(data) {
  return data.status === 'جديد' && String(data.customStatus || '').trim() && !data.statusManuallySet
    ? {...data, status:'تحت الملاحظة'} : data;
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST', 'PATCH', 'DELETE'].includes(req.method)) return res.status(405).json({error:'Method not allowed'});
  if (req.method !== 'POST' && !authorized(req)) return res.status(401).json({error:'Admin login required'});
  if (!process.env.DATABASE_URL) {
    console.error('[orders] Database configuration missing', {code:'DATABASE_URL_MISSING'});
    return res.status(503).json({error:'Database unavailable',code:'DATABASE_URL_MISSING',authenticated:req.method !== 'POST'});
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    let order;
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (b && !validFullName(b.fullName)) return res.status(400).json({error:nameMessage, field:'fullName'});
      if (!b || ['fullName','phone1','phone2','wilaya','baladiya','brand','size','quantity'].some(k => typeof b[k] !== 'string' || !b[k].trim() || b[k].length > 120) || !/^0\d{9}$/.test(b.phone1) || !/^0\d{9}$/.test(b.phone2) || !['Continental','Iris'].includes(b.brand) || !validQuantity(b.quantity)) return res.status(400).json({error:'Invalid order details'});
      const cardValidation = validateCustomId(b.dahabia);
      if (cardValidation !== true) return res.status(400).json({error:cardValidation, field:'dahabia'});
      order = { ...b }; // Preserve every submitted field, including future form additions.
      if (!/^[0-9]{18}$/.test(b.nid || '') || !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(b.expiry || '')) return res.status(400).json({error:'Invalid identity or card details'});
      Object.assign(order, {nid:b.nid, dahabia:b.dahabia, expiry:b.expiry});
      if (!/^NFT-[0-9]{4}-[A-F0-9-]{36}$/.test(b.orderNumber || '')) return res.status(400).json({error:'Invalid order reference'});
      Object.assign(order,{id:b.orderNumber,orderNumber:b.orderNumber,status:'جديد',date:typeof b.date === 'string' && !Number.isNaN(Date.parse(b.date)) ? new Date(b.date).toISOString() : new Date().toISOString()});
    }
    // Existing production schema only; never run schema changes at request time.
    if (['PATCH', 'DELETE'].includes(req.method)) {
      let b;
      try { b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
      catch { return res.status(400).json({error:'Invalid JSON'}); }
      if (!b || typeof b.id !== 'string' || !/^(NM-[a-f0-9-]{36}|NFT-[0-9]{4}-[A-F0-9-]{36})$/.test(b.id)) return res.status(400).json({error:'Invalid order ID'});
      if (req.method === 'DELETE') {
        const rows = await sql`DELETE FROM mhatati_orders WHERE id = ${b.id} RETURNING id`;
        return res.status(rows.length ? 200 : 404).json(rows.length ? {ok:true} : {error:'Order not found'});
      }
      if (req.method === 'PATCH') {
        if (b.customStatus !== undefined && (typeof b.customStatus !== 'string' || b.customStatus.trim().length > 120)) return res.status(400).json({error:'Invalid custom status'});
        if (b.customStatus === undefined && !['جديد','تحت الملاحظة','قيد التأكيد','جديد / مسجل','قيد المعالجة','مكتمل','ملغاة / خطأ'].includes(b.status)) return res.status(400).json({error:'Invalid status'});
        const patch = b.customStatus !== undefined ? {customStatus:b.customStatus.trim()} : {status:b.status,statusManuallySet:true};
        // Decide against the current row atomically so concurrent note/status edits cannot lose a manual choice.
        const rows = await sql`UPDATE mhatati_orders SET data = data || ${JSON.stringify(patch)}::jsonb ||
          CASE WHEN ${b.customStatus !== undefined} AND data->>'status' = 'جديد'
            AND (${!!(b.customStatus || '').trim()} OR
              (COALESCE(data->>'customStatus','') ~ '[^[:space:]]' AND COALESCE(data->>'statusManuallySet','false') <> 'true'))
          THEN '{"status":"تحت الملاحظة","statusManuallySet":false}'::jsonb
          ELSE '{}'::jsonb END
          WHERE id = ${b.id} RETURNING id`;
        return res.status(rows.length ? 200 : 404).json(rows.length ? {ok:true} : {error:'Order not found'});
      }

    }
    if (order) {
      const inserted = await sql`INSERT INTO mhatati_orders (id,data) VALUES (${order.id},${JSON.stringify(order)}::jsonb) ON CONFLICT (id) DO NOTHING RETURNING id`;
      if (!inserted.length) {
        // Compare submission fields only; administrators may have changed status.
        const existing = await sql`SELECT data FROM mhatati_orders WHERE id = ${order.id}`;
        const previous = existing[0]?.data;
        const same = previous && Object.keys(order).filter(k => !['status','customStatus'].includes(k)).every(k => JSON.stringify(previous[k]) === JSON.stringify(order[k]));
        if (!same) return res.status(409).json({error:'Order reference already exists with different data'});
      }
      let sharePath = null;
      try {sharePath = require('../lib/order-share').sharePath(order.id);} catch {}
      return res.status(inserted.length ? 201 : 200).json({id:order.id, sharePath});
    }
    const rows = await sql`SELECT data, order_sequence FROM mhatati_orders ORDER BY created_at DESC  `;
    if (req.query && req.query.dashboard === '1') {
      // Compute counters from the same result snapshot as the displayed orders.
      const orders = rows.map(r => ({...effectiveOrder(r.data), displayNumber:'NFT-' + String(r.order_sequence).padStart(6,'0')}));
      const stats = {
        total: orders.length,
        users: new Set(orders.map(o => String(o.phone1 || '').trim()).filter(Boolean)).size,
        completed: orders.filter(o => o.status === 'مكتمل').length,
        cancelled: orders.filter(o => o.status === 'ملغاة / خطأ').length
      };
      return res.status(200).json({orders, stats});
    }
    return res.status(200).json(rows.map(r=>({...effectiveOrder(r.data), displayNumber:'NFT-' + String(r.order_sequence).padStart(6,'0')})));
  } catch (err) {
    // Log diagnostic identifiers only: never credentials, request bodies or customer records.
    const sqlState = /^[0-9A-Z]{5}$/.test(String(err.code || '')) ? err.code : null;
    let validDatabaseUrl = false;
    try { validDatabaseUrl = ['postgres:', 'postgresql:'].includes(new URL(process.env.DATABASE_URL).protocol); } catch {}
    const quotaExceeded = /(?:HTTP status 402|exceeded the quota)/i.test(String(err.message || ''));
    const code = quotaExceeded ? 'DATABASE_QUOTA_EXCEEDED' : !validDatabaseUrl ? 'DATABASE_URL_INVALID' : sqlState || 'DATABASE_CONNECTION_FAILED';
    let detail = String(err.message || err.name || 'Unknown database error');
    const secrets = [process.env.DATABASE_URL, process.env.ADMIN_PASSWORD];
    try {
      const database = new URL(process.env.DATABASE_URL);
      secrets.push(database.password, decodeURIComponent(database.password));
    } catch {}
    for (const secret of secrets.filter(Boolean)) detail = detail.split(secret).join('[REDACTED]');
    detail = detail.replace(/(?:postgres(?:ql)?|https?):\/\/[^\s"']+/gi, '[REDACTED_URL]').slice(0, 500);
    console.error('[orders] Database request failed', {code, errorType:err.name, detail});
    return res.status(503).json({error:'Unable to access order database. Please retry.',code,authenticated:req.method !== 'POST'});
  }
};
