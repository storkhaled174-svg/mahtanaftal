const {neon} = require('@neondatabase/serverless');
const {verify,headers,publicOrder} = require('../lib/order-share');
module.exports = async (req,res) => {
  headers(res);
  if (req.method !== 'GET') return res.status(405).json({error:'طريقة غير مسموحة'});
  const id = verify(String(req.headers.authorization || '').replace(/^Bearer /,''));
  if (!id) return res.status(403).json({error:'رابط غير صالح أو منتهي الصلاحية. اطلب رابطاً جديداً من الإدارة.'});
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT id, data, order_sequence, created_at FROM mhatati_orders WHERE id = ${id}`;
    if (!rows.length) return res.status(404).json({error:'الطلبية غير موجودة'});
    return res.status(200).json(publicOrder(rows[0]));
  } catch {
    return res.status(503).json({error:'تعذر تحميل الطلبية حالياً. حاول مجدداً.'});
  }
};
