const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const invalid = [...Array.from({length:10}, (_, i) => String(62807030 + i)), '12345678', '99123488', '23458899', '88765499', '43219880', '98109876', '12121212', '56565656', '00000000', '11111111', '11111123', '00000088', '28111111'];
const valid = ['12807030', '62807029', '62807040', '62808030', '03958261', '65888828', '11111238', '00000882', '12121213', '99012888', '89012880', '12807930'];
for (const path of ['form-submission.js', 'api/orders.js']) {
 const source = fs.readFileSync(path, 'utf8');
 const code = source.match(/const validateCustomId = \(value\) => \{[\s\S]*?\n    \};/)[0];
 const validate = vm.runInNewContext(`${code}\nvalidateCustomId`);
 for (const value of invalid) assert.equal(validate(value), 'يرجى إدخال رقم البطاقة الصحيح', `${path}: ${value}`);
 for (const value of ['', '1', '1234567', '123456789', '8452x917', '١٢٣٤٥٦٧٨', null, 12345678]) assert.equal(validate(value), 'يرجى إدخال 8 أرقام فقط', `${path}: ${value}`);
 for (const value of valid) assert.equal(validate(value), true, `${path}: ${value}`);
}
console.log('Frontend/backend: blocked range, boundaries, empty and starts-with-1 cases passed');

const html = fs.readFileSync('index.html', 'utf8');
assert.match(html.match(/<input[^>]*id="dahabiaInput"[^>]*>/)[0], /maxlength="8"/);
