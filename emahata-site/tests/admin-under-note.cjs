const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('api/orders.js','utf8');
const html = fs.readFileSync('index.html','utf8');
const ctx = vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function effectiveOrder('), source.indexOf('module.exports =')),ctx);
const effective = value => ctx.effectiveOrder(value);
assert.equal(effective({status:'جديد',customStatus:'نعودل مبعد'}).status,'تحت الملاحظة');
assert.equal(effective({status:'جديد',customStatus:'  '}).status,'جديد');
assert.equal(effective({status:'جديد',customStatus:'عندو تيلفون صغير',statusManuallySet:true}).status,'جديد');
assert.equal(effective({status:'تحت الملاحظة',customStatus:''}).status,'تحت الملاحظة');
assert.equal(effective({status:'مكتمل',customStatus:'ملاحظة'}).status,'مكتمل');
assert.equal(effective({status:'ملغاة / خطأ',customStatus:'ملاحظة'}).status,'ملغاة / خطأ');
const rows = [{status:'جديد'}, {status:'جديد',customStatus:'مهزش'}, {status:'جديد',customStatus:'مهزش',statusManuallySet:true}].map(effective);
assert.equal(rows.filter(o => o.status === 'جديد').length,2);
assert.equal(rows.filter(o => o.status === 'تحت الملاحظة').length,1);
assert.ok(html.includes("select.value = normalizedStatus(order.status);"));
assert.ok(html.includes("'تحت الملاحظة':'📝 تحت الملاحظة'"));
assert.ok(html.includes('data-order-filter="تحت الملاحظة"'));

// Exercise the authenticated handler, retaining the query and bound parameters.
let query;
const sql = async (parts,...values) => {
  if (parts.join('').includes('UPDATE mhatati_orders')) {query={text:parts.join('?'),values};return [{id:'ok'}];}
  return [];
};
const sandbox = {module:{exports:{}},process:{env:{ADMIN_PASSWORD:'test-password',DATABASE_URL:'test'}},require:name => name === '@neondatabase/serverless' ? {neon:()=>sql} : require(name)};
vm.runInNewContext(source,sandbox);
async function patch(body) {
  let status;
  const res={setHeader(){},status(n){status=n;return this;},json(data){return data;}};
  await sandbox.module.exports({method:'PATCH',headers:{authorization:'Bearer test-password'},body:{id:'NFT-2026-AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA',...body}},res);
  assert.equal(status,200);
  return query;
}
(async()=>{
  let q = await patch({customStatus:' نعودل مبعد '});
  assert.equal(JSON.parse(q.values[0]).customStatus,'نعودل مبعد');
  assert.equal(q.values[1],true); assert.equal(q.values[2],true);
  assert.ok(q.text.includes("data->>'status' = 'جديد'"));
  assert.ok(q.text.includes('"status":"تحت الملاحظة"'));
  q = await patch({status:'جديد'});
  assert.deepEqual(JSON.parse(q.values[0]),{status:'جديد',statusManuallySet:true});
  assert.equal(q.values[1],false); // Manual status never runs the note transition.
  q = await patch({customStatus:''});
  assert.equal(q.values[2],false);
  assert.ok(q.text.includes("COALESCE(data->>'statusManuallySet','false') <> 'true'"));
  q = await patch({status:'تحت الملاحظة'});
  assert.equal(JSON.parse(q.values[0]).status,'تحت الملاحظة');
  console.log('Under Note: legacy notes, manual override, note removal, counts and atomic PATCH passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
