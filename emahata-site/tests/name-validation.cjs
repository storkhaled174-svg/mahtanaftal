const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
for (const path of ['form-submission.js', 'api/orders.js']) {
  const source = fs.readFileSync(path, 'utf8');
  const code = source.match(/const validFullName = value => [^;]+;/)[0];
  const valid = vm.runInNewContext(`${code}\nvalidFullName`);
  for (const name of ['محمد بن علي', 'Najib Benza', 'Élodie André', 'محمد Ahmed']) assert.equal(valid(name), true, `${path}: ${name}`);
  for (const name of ['', '   ', 'محمد1', 'محمد١', 'محمد۱', 'John²', 'John@Doe', 'A#', 'A$', 'A%', 'A!', 'Jean-Luc', "O’Neil", 'A\nB', 'A\tB', 'عـلي', 'A😀', '李', null, 123, {}]) assert.equal(valid(name), false, `${path}: ${name}`);
}
// The API must reject invalid names before issuing a database query.
const source = fs.readFileSync('api/orders.js', 'utf8');
let queries = 0;
const context = {module:{exports:{}}, process:{env:{DATABASE_URL:'test'}}, require(name) {
  if (name === '@neondatabase/serverless') return {neon: () => () => {queries++; throw new Error('Unexpected query');}};
  return require(name);
}};
vm.runInNewContext(source, context);
(async () => {
  const res = {setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
  await context.module.exports({method:'POST',body:{fullName:'محمد123'},headers:{}},res);
  assert.equal(res.code,400);
  assert.equal(res.body.field,'fullName');
  assert.equal(res.body.error,'عذراً، حقل الاسم واللقب الكامل يجب أن يحتوي على حروف فقط ولا يسمح بكتابة الأرقام أو الرموز الخاصة.');
  assert.equal(queries,0);
  console.log('Arabic/Latin name validation and API rejection passed');
})();
