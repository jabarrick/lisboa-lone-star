const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [w,lang,scheme] of [[1280,'zh','light'],[400,'en','dark']]){const p=await b.newPage({viewport:{width:w,height:900},colorScheme:scheme});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(l=>{try{localStorage.setItem('lisboa-lone-star-lang',l)}catch(e){}},lang);
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
 await p.evaluate(()=>{S.week=20;S.cash=5000;S.up.pickup=1;S.course.drive=3;cur=null;queue=[];MAP_FOCUS='marfa';mview='panel';render()});
 await p.click('[data-t="map"]');await p.click('#panel [data-go="marfa"]');let n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 const legs=[];
 for(const step of [0,1]){await p.evaluate(()=>{S.slot=0;S.energy=10;mview='act';render()});await p.click(`[data-a="${await p.evaluate(()=>S.where)}:trip|roadtrip"]`);
  const opts=await p.$$eval('.choice',a=>a.map(x=>x.textContent.trim()));legs.push(opts[0]);await p.click('.choice >> nth=0');n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');legs.push(await p.evaluate(()=>S.where+' legs:'+S.tripLegs));}
 await p.evaluate(()=>{mview='map';render()});await p.locator('.tx-map').screenshot({path:`shots/roads_${w}.png`});
 await p.evaluate(()=>{mview='act';render()});const cash0=await p.evaluate(()=>Math.round(S.cash));await p.click(`[data-a="${await p.evaluate(()=>S.where)}:trip|home"]`);const txt=await p.textContent('.scene');n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 console.log(w,lang,JSON.stringify(legs),'| home fare charged:',cash0-await p.evaluate(()=>Math.round(S.cash)),'| back:',await p.evaluate(()=>S.where),'|',txt.slice(0,70).replace(/\s+/g,' '));}
 console.log('errors:',errs.length?errs:'none');await b.close()})();
