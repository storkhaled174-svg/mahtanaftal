const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {createRequire}=require('node:module');
const {randomBytes}=require('node:crypto');
process.env.ORDER_SHARE_SECRET=randomBytes(48).toString('base64url');
const share=require('../lib/order-share');
const id='NFT-2026-AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA', other='NFT-2026-BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB';
const now=Math.floor(Date.now()/1000), token=share.issue(id,now);
assert.equal(share.verify(token,now),id);
assert.equal(share.verify(token,now+share.TTL),null);
assert.equal(share.verify(token,now-1),null);
assert.equal(share.verify(token+'x',now),null);
assert.equal(share.verify(share.issue(other,now),now),other);
assert.equal(share.verify(token.replace(token.split('.')[0],Buffer.from(JSON.stringify({id:other,exp:now+share.TTL})).toString('base64url')),now),null);
for(const bad of ['', 'a.b', ['token'], 'x'.repeat(1000), id]) assert.equal(share.verify(bad),null);
process.env.ADMIN_PASSWORD='synthetic-admin';
const originalKey=process.env.ORDER_SHARE_SECRET;
process.env.ORDER_SHARE_SECRET=randomBytes(48).toString('base64url'); assert.equal(share.verify(token),null);
process.env.ORDER_SHARE_SECRET=''; assert.throws(()=>share.issue(id));assert.equal(share.verify(token),null);
process.env.ORDER_SHARE_SECRET=originalKey;
assert.ok(share.sharePath(id).startsWith('/order#')); assert.ok(!share.sharePath(id).includes('?'));
let calls=[], rows=[{id,data:{orderNumber:id,fullName:'عميل تجريبي',nid:'SYNTHETIC',size:'195/65 R15',quantity:'2',status:'جديد',dahabia:'DO NOT EXPOSE',expiry:'DO NOT EXPOSE',customStatus:'internal',notes:'internal',statusManuallySet:true},order_sequence:7}];
const sql=async(parts,...values)=>{calls.push({text:parts.join('?'),values});return rows;};
function handler(file){const real=createRequire(require('node:path').resolve(file));const sandbox={module:{exports:{}},process:{env:{DATABASE_URL:'mock',ADMIN_PASSWORD:'synthetic-admin'}},require:n=>n==='@neondatabase/serverless'?{neon:()=>sql}:real(n)};vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox);return sandbox.module.exports;}
const read=handler('api/order.js'), issue=handler('api/order-share.js');
async function run(fn,req){const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(body){this.body=body;return this;}};await fn({headers:{},...req},res);return res;}
(async()=>{
 for(const auth of ['',id,'Bearer broken',`Bearer ${token}x`]) {calls=[];const res=await run(read,{method:'GET',headers:{authorization:auth}});assert.equal(res.code,403);assert.equal(calls.length,0);}
 let res=await run(read,{method:'POST'});assert.equal(res.code,405);
 res=await run(read,{method:'GET',headers:{authorization:'Bearer '+token}});
 assert.equal(res.code,200);assert.equal(res.body.nid,'SYNTHETIC');assert.equal(res.body.status,'قيد الانتظار');assert.equal(res.body.displayNumber,'NFT-000007');
 for(const k of ['dahabia','expiry','customStatus','notes','statusManuallySet'])assert.ok(!(k in res.body));
 assert.equal(res.headers['Cache-Control'],'no-store, private');assert.deepEqual(calls[0].values,[id]);
 rows[0].data.status='مكتمل';res=await run(read,{method:'GET',headers:{authorization:'Bearer '+token}});assert.equal(res.body.status,'مكتمل');
 rows=[];res=await run(read,{method:'GET',headers:{authorization:'Bearer '+token}});assert.equal(res.code,404);
 calls=[];res=await run(issue,{method:'POST',body:{id}});assert.equal(res.code,401);assert.equal(calls.length,0);
 res=await run(issue,{method:'POST',headers:{authorization:'Bearer synthetic-admin'},body:{id:"' OR 1=1"}});assert.equal(res.code,400);
 rows=[{id}];res=await run(issue,{method:'POST',headers:{authorization:'Bearer synthetic-admin'},body:{id}});assert.equal(res.code,200);assert.equal(share.verify(res.body.sharePath.split('#')[1]),id);
 for(const call of calls) assert.match(call.text,/^SELECT /);
 for(const f of ['api/order.js','api/order-share.js','api/orders.js','api/visitors.js'])assert.doesNotMatch(fs.readFileSync(f,'utf8'),/\b(?:CREATE TABLE|ALTER TABLE|DROP TABLE|TRUNCATE)\b/);
 // Decode actual QR pixels: URL only, preserved after scanning, no raw customer data.
 const qr=require('qrcode').create('https://example.test'+share.sharePath(id),{errorCorrectionLevel:'M'}), scale=5, margin=4, size=(qr.modules.size+margin*2)*scale;
 const pixels=new Uint8ClampedArray(size*size*4).fill(255);
 for(let y=0;y<qr.modules.size;y++) for(let x=0;x<qr.modules.size;x++) if(qr.modules.get(y,x)) for(let dy=0;dy<scale;dy++)for(let dx=0;dx<scale;dx++){const i=(((y+margin)*scale+dy)*size+(x+margin)*scale+dx)*4;pixels[i]=pixels[i+1]=pixels[i+2]=0;}
 const decoded=require('jsqr')(pixels,size,size);assert.ok(decoded);assert.ok(decoded.data.startsWith('https://example.test/order#'));assert.equal(share.verify(new URL(decoded.data).hash.slice(1)),id);assert.ok(!decoded.data.includes('SYNTHETIC'));
 console.log('Signed sharing PASS: scoped ID, tampering, expiry, rotation, missing key, admin-only issuance, dynamic status, allowlisted data, bound read-only SQL, no DDL, QR round-trip.');
})().catch(e=>{console.error(e);process.exitCode=1;});
