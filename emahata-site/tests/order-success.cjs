const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
(async () => {
 const elements = new Map();
 const el = id => {
  if (!elements.has(id)) elements.set(id, {value:'', textContent:'', handlers:{}, selectedOptions:[{textContent:id === 'wilaya' ? 'الجزائر' : 'باب الوادي'}], addEventListener(k,f){this.handlers[k]=f;}, setAttribute(){}, removeAttribute(){}, setCustomValidity(){}, reportValidity(){return true;}, reset(){this.resetCalled=true;}, showModal(){this.open=true;}, close(){this.open=false;}, focus(){}});
  return elements.get(id);
 };
 const values = {name:'<img src=x onerror=alert(1)>', nid:'123456789012345678', size:'195/65 R15', quantity:'2', wilaya:'16', baladiya:'1601', dahabia:'62807040'};
 let requests=0, home='', shared=null;
 el('fullName').value=values.name;
 el('dahabiaInput').value=values.dahabia;
 vm.runInNewContext(fs.readFileSync('form-submission.js','utf8'), {
  document:{getElementById:el}, FormData:class extends Map {constructor(){super(Object.entries(values));}},
  crypto:{randomUUID:()=> 'TEST-REFERENCE'}, Date, Intl,
  fetch:async () => {requests++;return {ok:true,json:async()=>({code:200,sharePath:'/order#synthetic-test'})};},
  window:{OrderQR:{mount:async(el,path,options)=>{shared={path,options};}},location:{assign:p=>{home=p;}}},
 });
 await el('naftalForm').handlers.submit({preventDefault(){}});
 assert.equal(requests,0);
 assert.notEqual(el('orderSuccessDialog').open,true);
 values.name='محمد بن علي';
 el('fullName').value=values.name;
 await el('naftalForm').handlers.submit({preventDefault(){}});
 assert.equal(requests,2);
 assert.equal(shared.path,'/order#synthetic-test');
 assert.equal(shared.options.receipt,true);
 assert.equal(el('orderSuccessDialog').open,true);
 assert.equal(el('successCustomerName').textContent,values.name);
 assert.equal(el('successIdentity').textContent,values.nid);
 assert.equal(el('successTireSize').textContent,values.size);
 assert.equal(el('successQuantity').textContent,'2');
 assert.equal(el('successCustomerWilaya').textContent,'الجزائر - باب الوادي');
 assert.ok(el('successOrderDate').textContent);
 assert.equal(el('successVehicleType').textContent,'غير محدد في الاستمارة');
 assert.match(el('successOrderNumber').textContent,/NFT-\d{4}-TEST-REFERENCE/);
 assert.equal(el('naftalForm').resetCalled,true);
 el('closeOrderSuccess').handlers.click();
 assert.equal(home,'/');
 assert.equal(el('orderSuccessDialog').open,false);
 const html=fs.readFileSync('index.html','utf8');
 for (const id of ['successOrderNumber','successCustomerName','successIdentity','successTireSize','successQuantity','successCustomerWilaya','successOrderDate','successVehicleType']) assert.equal((html.match(new RegExp(`id="${id}"`,'g')) || []).length,1);
 console.log('Success receipt: real submitted values, safe text, timestamp, reference, reset and home navigation passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
