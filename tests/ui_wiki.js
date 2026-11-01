const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,h,name] of [[1280,900,'desk'],[390,844,'phone']]){
const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
await p.evaluate(()=>localStorage.clear());await p.reload();
// start game
await p.click('#go');
await p.waitForTimeout(300);
// dismiss scenes
for(let i=0;i<40;i++){const c=await p.$('.choice');if(!c)break;await c.click();await p.waitForTimeout(30)}
await p.evaluate(()=>{tab='wiki';mview='panel';render()});
for(const s of ['guide','people','cities','roads','dishes','letters']){await p.click(`#panel [data-wsec="${s}"]`)}
await p.fill('#wikiq','Austin');await p.waitForTimeout(100);
const n=await p.$$eval('#panel .wiki-e',x=>x.length);console.log(name,'search Austin entries',n);
await p.fill('#wikiq','');
await p.click('#dbgtoggle');
await p.evaluate(()=>{tab='debug';render()});
const cheats=await p.$$eval('#panel [data-cheat]',x=>x.map(e=>e.dataset.cheat));
for(const c of cheats.filter(c=>c!=='ending')){await p.click(`#panel [data-cheat="${c}"]`)}
await p.click('#panel [data-dtog="dbgInfEnergy"]');await p.click('#panel [data-dtog="dbgFreeTravel"]');
await p.selectOption('#dbgweek','20');await p.selectOption('#dbgaccent','淡');await p.selectOption('#dbgcity','permian');
const st2=await p.evaluate(()=>({cash:S.cash,week:S.week,where:S.where,acc:S.accent,e:S.energy,fare:fare(CITIES.lubbock),chip:!!document.querySelector('.chip-dbg'),dish:S.fusion.unlocked}));console.log(name,JSON.stringify(st2));
await p.screenshot({path:`/tmp/dbg_${name}.png`});
await p.evaluate(()=>{tab='wiki';WIKI_SEC='people';render()});await p.screenshot({path:`/tmp/wiki_${name}.png`});
await p.evaluate(()=>{tab='debug';render()});await p.click('#panel [data-cheat="ending"]');await p.waitForTimeout(200);
console.log(name,'after ending:',await p.evaluate(()=>cur&&res(cur.title)));
const sf=await p.evaluate(()=>{tab='wiki';render();tab='debug';render();document.querySelector('[data-cheat=crew]').click();tab='shop';render();return {staff:S.staff,hdr:document.querySelector('#panel').innerText.includes('5')}});console.log(name,JSON.stringify(sf));await p.screenshot({path:'/tmp/shop_'+name+'.png',fullPage:false});console.log(name,'errors',errs);}
await b.close()})();
