const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
assert.ok(!html.includes('فضاء إدارة الطلبيات'));
assert.equal((footer.match(/onclick="promptPassword\(\)"/g) || []).length, 1);
assert.match(footer, /© <button type="button" onclick="promptPassword\(\)" style="all: unset; font: inherit; color: inherit; cursor: text;">2026<\/button> نفطال/);
console.log('Footer year opens existing login; visible admin button removed.');
