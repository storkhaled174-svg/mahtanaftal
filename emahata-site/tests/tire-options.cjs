const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('api/orders.js', 'utf8');
const validate = vm.runInNewContext(`(${source.slice(0, source.indexOf('const validateCustomId')).trim()})`);
for (const value of ['1', '2', '3', '4']) assert.equal(validate(value), true);
for (const value of ['5', '20', '100', '', '0', '-1', '1.5', '01', '1e2', '9007199254740992', null, 4]) assert.equal(validate(value), false);
const html = fs.readFileSync('index.html', 'utf8');
assert.ok(html.indexOf('1. مواصفات') < html.indexOf('2. المعلومات'));
assert.ok(html.indexOf('2. المعلومات') < html.indexOf('3. التحقق'));
console.log('Layout and server quantity tests passed');

assert.ok(!html.includes('tireCategory'));
assert.ok(!fs.readFileSync('tire-options.js', 'utf8').includes('tireCategory'));
assert.ok(html.includes('id="wheel-preview-img"'));
assert.ok(html.indexOf('id="wheel-preview-img"') > html.indexOf('id="tireRim"'));
assert.ok(html.indexOf('id="wheel-preview-img"') < html.indexOf('id="quantitySelect"'));
for (let rim=13; rim<=20; rim++) assert.ok(html.includes(`value="${rim}C"`));

for (const id of ['brandSelect','tireWidth','tireAspect','tireRim','quantitySelect']) {
 const select = html.match(new RegExp(`<select id="${id}"[^>]*>([\\s\\S]*?)</select>`))[1];
 assert.match(select, /^\s*<option value="" selected disabled>يرجى الاختيار<\/option>/);
 assert.equal((select.match(/selected/g)||[]).length,1);
}
for (const id of ['nidInput','dahabiaInput']) {
 const input = html.match(new RegExp(`<input[^>]*id="${id}"[^>]*>`))[0];
 assert.doesNotMatch(input,/\bvalue="[^"]+"/);
 if(id!=='quantitySelect') assert.doesNotMatch(input,/\bplaceholder=/);
}
const elements = Object.fromEntries(['naftalForm','tireWidth','tireAspect','tireRim','sizeSelect','tireSizeSummary','wheel-size-display'].map(id=>[id,{value:'',textContent:'',handlers:{},addEventListener(name,fn){this.handlers[name]=fn;}}]));
vm.runInNewContext(fs.readFileSync('tire-options.js','utf8'), {document:{getElementById:id=>elements[id]},setTimeout:fn=>fn()});
assert.equal(elements.sizeSelect.value,'');
assert.equal(elements.tireSizeSummary.textContent,'يرجى الاختيار');
elements.tireWidth.value='195';elements.tireWidth.handlers.change();
assert.equal(elements.sizeSelect.value,'');
elements.tireAspect.value='65';elements.tireRim.value='15';elements.tireRim.handlers.change();
assert.equal(elements.sizeSelect.value,'195/65 R15');
for(const id of ['tireWidth','tireAspect','tireRim']) elements[id].value='';
elements.naftalForm.handlers.reset();
assert.equal(elements.sizeSelect.value,'');
assert.equal(elements['wheel-size-display'].textContent,'يرجى الاختيار');
console.log('Empty defaults, partial selection, complete selection and reset tests passed');

const quantity = html.match(/<select id="quantitySelect"[^>]*>([\s\S]*?)<\/select>/)[1];
assert.deepEqual([...quantity.matchAll(/value="([^"]*)"/g)].map(match=>match[1]), ['', '1', '2', '3', '4']);
assert.ok(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'));
console.log('Quantity dropdown and viewport tests passed');
