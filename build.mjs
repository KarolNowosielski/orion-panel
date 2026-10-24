import fs from 'node:fs/promises';
await fs.mkdir('dist/vendor',{recursive:true});
for(const [from,to] of [['build/pdf.min.mjs','pdf.mjs'],['build/pdf.worker.min.mjs','pdf.worker.mjs'],['LICENSE','LICENSE-pdfjs.txt']])await fs.copyFile('node_modules/pdfjs-dist/'+from,'dist/vendor/'+to);
for(const dir of ['cmaps','standard_fonts','wasm'])await fs.cp('node_modules/pdfjs-dist/'+dir,'dist/vendor/'+dir,{recursive:true});
console.log('PDF.js 6.4.299 copied locally. Static app ready in dist/.');
