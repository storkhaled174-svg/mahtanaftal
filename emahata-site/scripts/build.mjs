import {mkdir, copyFile, cp, rm} from 'node:fs/promises';
import {build} from 'esbuild';
await build({entryPoints:['scripts/order-qr.js'],bundle:true,minify:true,outfile:'order-qr.js'});
await rm('public',{recursive:true,force:true});
await mkdir('public',{recursive:true});
for (const file of ['index.html','order.html','order-page.js','order-card.css','order-qr.js','form-submission.js','location-picker.js','locations.js','privacy-policy.html','terms.html','tire-options.js','visitor-tracking.js','wheel-photo.js','wheel-preview.css','wheel-preview.js','three-LICENSE.txt','data-LICENSE.txt','data-NOTICE.txt','qrcode-LICENSE.txt']) await copyFile(file,'public/'+file);
await cp('images','public/images',{recursive:true});
