const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
assert.match(html, /id="adminPasswordInput" type="password"/);
assert.ok(!html.includes("const pwd = prompt("));
const elements = {};
for (const id of ['adminPasswordDialog','adminPasswordInput','adminPasswordToggle','adminPasswordForm','adminPasswordCancel','adminPasswordEyeSlash']) {
  elements[id] = {style:{}, setAttribute(k,v){this[k]=v;}, focus(){}};
}
const dialog = elements.adminPasswordDialog;
dialog.showModal = () => { dialog.open = true; };
dialog.addEventListener = (_, fn) => { dialog.onclose = fn; };
dialog.close = () => { dialog.open = false; dialog.onclose(); };
const fn = html.slice(html.indexOf('function requestAdminPassword()'), html.indexOf('// طلب كلمة السر للوحة التحكم'));
const request = vm.runInNewContext(`(${fn.trim()})`, {document:{getElementById:id=>elements[id]}});
(async () => {
 const input = elements.adminPasswordInput, toggle = elements.adminPasswordToggle;
 let result = request();
 assert.equal(input.type, 'password');
 input.value = 'test-only';
 toggle.onclick(); assert.equal(input.type,'text'); assert.equal(toggle['aria-pressed'],'true');
 toggle.onclick(); assert.equal(input.type,'password'); assert.equal(input.value,'test-only');
 elements.adminPasswordForm.onsubmit({preventDefault(){}});
 assert.equal(await result,'test-only'); assert.equal(input.value,'');
 result = request(); assert.equal(input.type,'password');
 input.value = 'cancel-test'; elements.adminPasswordCancel.onclick(); assert.equal(await result,null); assert.equal(input.value,'');
 result = request(); dialog.close(); assert.equal(await result,null);
 console.log('Password masking, eye toggle, submit, cancel and close reset passed.');
})().catch(e => {console.error(e);process.exitCode=1;});
