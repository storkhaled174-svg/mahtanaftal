const fs=require('node:fs');
const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
async function tick(){await new Promise(r=>setTimeout(r,30));}
(async()=>{
 const token='synthetic.fragment';
 const dom=new JSDOM(fs.readFileSync('order.html','utf8'),{url:'https://example.test/order#'+token,runScripts:'outside-only'});
 const {window:w}=dom; let status='قيد الانتظار',calls=0,qr=0;
 w.fetch=async(url,options)=>{assert.equal(url,'/api/order');assert.equal(options.headers.Authorization,'Bearer '+token);assert.equal(options.cache,'no-store');calls++;return {ok:true,json:async()=>({orderNumber:'NFT-SYNTHETIC',fullName:'<img src=x onerror=alert(1)>',nid:'SYNTHETIC',size:'195/65 R15',quantity:'2',wilaya:'الجزائر',baladiya:'باب الوادي',status,date:'2026-11-01T12:00:00Z'})};};
 w.OrderQR={mount:async(el,path)=>{assert.equal(path,'/order#'+token);qr++;el.textContent='QR';}};
 w.eval(fs.readFileSync('order-page.js','utf8')); await tick();
 assert.equal(w.document.getElementById('orderData').hidden,false);
 assert.equal(w.document.getElementById('orderNumber').textContent,'NFT-SYNTHETIC');
 assert.ok(w.document.getElementById('orderFields').textContent.includes('<img'));
 assert.equal(w.document.querySelector('img'),null);assert.equal(qr,1);
 status='مكتمل';w.document.getElementById('retryOrder').click();await tick();assert.equal(w.document.getElementById('orderStatus').textContent,'مكتمل');assert.equal(calls,2);
 w.fetch=async()=>({ok:false,json:async()=>({error:'رابط منتهي'})});w.document.getElementById('retryOrder').click();await tick();assert.equal(w.document.getElementById('orderData').hidden,true);assert.equal(w.document.getElementById('pageQR').textContent,'');assert.equal(w.document.getElementById('orderMessage').textContent,'رابط منتهي');
 // Bundled encoder mounts controls without network. Mock only the canvas renderer surface.
 w.TextEncoder=TextEncoder;
 w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},putImageData(){},createImageData:(width,height)=>({data:new Uint8ClampedArray(width*height*4)})});
 w.HTMLCanvasElement.prototype.toDataURL=()=> 'data:image/png;base64,synthetic';
 let printed=false,downloaded=false;
 w.print=()=>{assert.ok(w.document.body.classList.contains('receipt-print'));printed=true;};
 w.HTMLAnchorElement.prototype.click=function(){downloaded=this.download==='emahata-order-qr.png';};
 w.eval(fs.readFileSync('order-qr.js','utf8'));
 const box=w.document.getElementById('pageQR'); await w.OrderQR.mount(box,'/order#'+token,{receipt:true});
 assert.ok(box.querySelector('canvas'));assert.equal(box.querySelector('a').href,'https://example.test/order#'+token);
 const buttons=box.querySelectorAll('button');assert.equal(buttons.length,2);buttons[0].click();buttons[1].click();assert.equal(printed,true);assert.equal(downloaded,true);assert.ok(!w.document.body.classList.contains('receipt-print'));
 await w.OrderQR.mount(box,null);assert.equal(box.querySelector('canvas'),null);assert.ok(box.textContent.includes('غير متاح'));
 dom.window.close();
 console.log('Order UI PASS: synthetic details, safe text, current status refresh, denied/expired state, private fragment, local QR, PNG download, print/PDF controls.');
})().catch(e=>{console.error(e);process.exitCode=1;});
