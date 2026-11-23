const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
(async () => {
 const elements = new Map();
 const element = id => {
  if (!elements.has(id)) elements.set(id, {value:'', hidden:true, textContent:'', handlers:{}, attributes:{}, addEventListener(name, fn) {this.handlers[name]=fn;}, setAttribute(k,v) {this.attributes[k]=v;}, setCustomValidity(v) {this.validationMessage=v;}});
  return elements.get(id);
 };
 let requests = 0;
 vm.runInNewContext(fs.readFileSync('form-submission.js','utf8'), {document:{getElementById:element}, fetch:()=>{requests++; throw new Error('Unexpected request');}});
 element('fullName').value='محمد بن علي';
 const input=element('dahabiaInput');
 for (const value of [...Array.from({length:10}, (_, i) => String(62807030 + i)), '12345678', '99123488', '23458899', '88765499', '43219880', '98109876', '12121212', '56565656', '00000000', '11111111', '11111123', '00000088', '28111111']) {
  input.value=value;input.handlers.input();
  await element('naftalForm').handlers.submit({preventDefault(){}});
  assert.equal(input.attributes['aria-invalid'],'true');
  assert.equal(element('dahabiaError').hidden,false);
  assert.equal(input.validationMessage,'يرجى إدخال رقم البطاقة الصحيح');
  assert.equal(element('registrationSubmit').disabled,true);
  assert.equal(requests,0);
 }
 for (const value of ['12807030', '62807029', '62807040', '62808030', '65888828']) {
  input.value=value;input.handlers.input();
  assert.equal(input.attributes['aria-invalid'],'false');
  assert.equal(input.validationMessage,'');
  assert.equal(element('dahabiaError').hidden,true);
  assert.equal(element('registrationSubmit').disabled,false);
 }
 for (const value of ['', '1', '1234567', '123456789', '8452x917']) {
  input.value=value;input.handlers.input();
  await element('naftalForm').handlers.submit({preventDefault(){}});
  assert.equal(input.attributes['aria-invalid'],'true');
  assert.equal(element('dahabiaError').hidden,false);
  assert.equal(input.validationMessage,'يرجى إدخال 8 أرقام فقط');
  assert.equal(element('registrationSubmit').disabled,true);
  assert.equal(requests,0);
 }
 input.value='62807040';input.handlers.input();
 assert.equal(input.attributes['aria-invalid'],'false');
 assert.equal(element('dahabiaError').hidden,true);
 let databaseCalls=0;
 const module={exports:{}};
 vm.runInNewContext(fs.readFileSync('api/orders.js','utf8'), {module, process:{env:{DATABASE_URL:'test-only'}}, require(name) {return name==='@neondatabase/serverless'?{neon:()=>()=>{databaseCalls++;throw new Error('Unexpected database call');}}:require(name);}});
 for(const dahabia of [...Array.from({length:10}, (_, i) => String(62807030 + i)), '12345678', '99123488', '23458899', '88765499', '43219880', '98109876', '12121212', '56565656', '00000000', '11111111', '11111123', '00000088', '28111111']) {
  const res={setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;}};
  await module.exports({method:'POST',body:{fullName:'Test',phone1:'0555555555',phone2:'0666666666',wilaya:'Test',baladiya:'Test',brand:'Iris',size:'Test',quantity:'1',dahabia}},res);
  assert.equal(res.code,400);assert.equal(res.body.field,'dahabia');assert.equal(res.body.error,'يرجى إدخال رقم البطاقة الصحيح');
 }
 for (const dahabia of ['', '1', '123456789', '8452x917']) {
  const res={setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;}};
  await module.exports({method:'POST',body:{fullName:'Test',phone1:'0555555555',phone2:'0666666666',wilaya:'Test',baladiya:'Test',brand:'Iris',size:'Test',quantity:'1',dahabia}},res);
  assert.equal(res.code,400);
  assert.equal(res.body.field,'dahabia');
  assert.equal(res.body.error,'يرجى إدخال 8 أرقام فقط');
 }
 assert.equal(databaseCalls,0);
 console.log('Invalid cards blocked before frontend requests and backend database writes; field errors clear on correction.');
})().catch(error=>{console.error(error);process.exitCode=1;});
