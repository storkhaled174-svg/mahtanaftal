const {createHmac, timingSafeEqual, createHash} = require('node:crypto');
const TTL = 90 * 24 * 60 * 60;
const validId = id => typeof id === 'string' && /^(?:NM-[a-f0-9-]{36}|NFT-[0-9]{4}-[A-F0-9-]{36})$/.test(id);
function key() {
  const secret = process.env.ORDER_SHARE_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) throw new Error('SHARING_NOT_CONFIGURED');
  return secret;
}
function signature(payload) {return createHmac('sha256', key()).update('emahata-order:v1:' + payload).digest();}
function issue(id, now = Math.floor(Date.now()/1000)) {
  if (!validId(id)) throw new Error('INVALID_ID');
  const payload = Buffer.from(JSON.stringify({id, exp:now + TTL})).toString('base64url');
  return payload + '.' + signature(payload).toString('base64url');
}
function verify(token, now = Math.floor(Date.now()/1000)) {
  try {
    if (typeof token !== 'string' || token.length > 512 || !/^[\w-]+\.[\w-]+$/.test(token)) return null;
    const [payload, mac] = token.split('.'), actual = Buffer.from(mac,'base64url'), expected = signature(payload);
    if (actual.length !== expected.length || !timingSafeEqual(actual,expected)) return null;
    const value = JSON.parse(Buffer.from(payload,'base64url').toString());
    return validId(value.id) && Number.isSafeInteger(value.exp) && value.exp > now && value.exp <= now + TTL ? value.id : null;
  } catch {return null;}
}
function sharePath(id) { return '/order#' + issue(id); }
function authorized(req) {
  const expected = String(process.env.ADMIN_PASSWORD || '').trim();
  const supplied = String(req.headers.authorization || '').replace(/^Bearer /,'').trim();
  return !!expected && timingSafeEqual(createHash('sha256').update(expected).digest(),createHash('sha256').update(supplied).digest());
}
function headers(res) {
  res.setHeader('Cache-Control','no-store, private');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Content-Type-Options','nosniff');
}
// Explicit customer-facing fields only. Never expose payment cards, expiry, internal notes or arbitrary JSONB fields.
function publicOrder(row) {
  const d = row.data;
  const status = d.status === 'جديد' && String(d.customStatus || '').trim() && !d.statusManuallySet ? 'تحت الملاحظة' : d.status;
  return {orderNumber:d.orderNumber || row.id, displayNumber:row.order_sequence ? 'NFT-' + String(row.order_sequence).padStart(6,'0') : null,
    fullName:d.fullName, phone1:d.phone1, phone2:d.phone2, nid:d.nid, registrationNumber:d.registrationNumber || d.vehicleRegistration,
    brand:d.brand, size:d.size, quantity:d.quantity, wilaya:d.wilaya, baladiya:d.baladiya,
    address:d.address, vehicleType:d.vehicleType, date:d.date || row.created_at,
    status:status === 'جديد' ? 'قيد الانتظار' : status || 'قيد الانتظار'};
}
module.exports = {issue,verify,sharePath,validId,authorized,headers,publicOrder,TTL};
