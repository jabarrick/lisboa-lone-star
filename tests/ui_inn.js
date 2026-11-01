const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
 await p.evaluate(()=>{S.week=15;S.cash=3000;cur=null;queue=[];render()});
 await p.click('[data-t="map"]');await p.click('[data-go="fredericksburg"]');let n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 const r=[];
 for(let night=0;night<3;night++){
  await p.click('[data-a="fredericksburg:inn|book"]');await p.click('.choice >> nth=2');n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
  // spend the rest of the day sleeping early to reach the night
  await p.evaluate(()=>{S.slot=2;render()});const sl=await p.$('[data-a="fredericksburg:inn|lobby"]');if(sl&&!(await sl.isDisabled()))await sl.click();n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
  r.push(await p.evaluate(()=>({where:S.where,nights:S.tripNights,energy:S.energy,day:S.day,cash:Math.round(S.cash)})));
 }
 await p.locator('.tx-map').screenshot({path:'shots/inn_map.png'});
 // a day trip without booking returns home
 await p.click('[data-a="fredericksburg:trip|home"]');n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 await p.evaluate(()=>{S.slot=0;S.energy=10;cur=null;queue=[];render()});await p.click('[data-t="map"]');await p.click('#panel [data-go="austin"]');n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 await p.evaluate(()=>{S.slot=2;render()});const a=await p.$('.act:not([disabled])');await a.click();n=0;while(await p.$('.choice')&&n++<10)await p.click('.choice:not([disabled])');
 console.log(JSON.stringify(r),'| unbooked day trip after night →',await p.evaluate(()=>S.where),'| errors',errs.length?errs:'none');await b.close()})();
