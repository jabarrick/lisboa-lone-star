const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [w,lang] of [[1280,'zh'],[1280,'en']]){const p=await b.newPage({viewport:{width:w,height:900}});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(l=>{try{localStorage.setItem('lisboa-lone-star-lang',l)}catch(e){}},lang);
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
 await p.evaluate(()=>{S.week=20;S.cash=5000;S.visited={corpus:1,elpaso:1,jefferson:1,austin:1};S.where='corpus';cur=null;queue=[];render()});
 await p.locator('.tx-map').screenshot({path:`shots/map20_${lang}.png`});
 // walk into Corpus: Quim storyline first stage
 const acts=await p.$$eval('.act',a=>a.map(x=>x.dataset.a));console.log(lang,'corpus actions:',acts.length);
 await p.click('[data-t="people"]');}
 console.log('errors:',errs.length?errs:'none');await b.close()})();
