const {neon} = require('@neondatabase/serverless');
const {sharePath,validId,authorized,headers} = require('../lib/order-share');
module.exports = async (req,res) => {
  headers(res);
  if (req.method !== 'POST') return res.status(405).json({error:'طريقة غير مسموحة'});
  if (!authorized(req)) return res.status(401).json({error:'يجب تسجيل دخول الإدارة'});
  let body;
  try {body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;} catch {}
  if (!validId(body?.id)) return res.status(400).json({error:'رقم غير صالح'});
  let path;
  try {path = sharePath(body.id);} catch {return res.status(503).json({error:'مشاركة الطلبات غير مهيأة بعد'});}
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT id FROM mhatati_orders WHERE id = ${body.id}`;
    if (!rows.length) return res.status(404).json({error:'الطلبية غير موجودة'});
    return res.status(200).json({sharePath:path});
  } catch {return res.status(503).json({error:'تعذر إنشاء رابط المشاركة حالياً'});}
};
