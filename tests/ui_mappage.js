const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,h,name] of [[1280,900,'desk'],[390,844,'phone']]){
const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('#go');for(let i=0;i<40;i++){const c=await p.$('.choice');if(!c)break;await c.click();await p.waitForTimeout(20)}
await p.evaluate(()=>{tab='map';mview='panel';render()});
const box='#panel';
console.log(name,'rows p1',await p.$$eval(box+' .mp-row',x=>x.length));
await p.click(box+' [data-mpg="2"]');console.log(name,'page',await p.evaluate(()=>MAP_PG),await p.$$eval(box+' .mp-row .nm',x=>x.map(e=>e.textContent).join(',')));
await p.click(box+' [data-mrg="west"]');console.log(name,'west rows',await p.$$eval(box+' .mp-row',x=>x.length),await p.$$eval(box+' .mp-pager',x=>x.length));
await p.click(box+' [data-mrg="all"]');
await p.screenshot({path:`/tmp/mp_${name}.png`});
// tap map city
await p.evaluate(()=>{MAP_RG='coast';render()});
await p.evaluate(()=>{document.querySelector('.txm-city[data-city="padre"]').dispatchEvent(new MouseEvent('click',{bubbles:true}))});
console.log(name,'focus',await p.evaluate(()=>[MAP_FOCUS,MAP_RG,MAP_PG]),await p.$$eval('#panel .mp-focus .nm',x=>x.map(e=>e.textContent)));
// go to a city
await p.evaluate(()=>{MAP_FOCUS=null;MAP_PG=0;render()});
const g=await p.$('#panel .mp-go:not([disabled])');if(g){await g.click();console.log(name,'trip ->',await p.evaluate(()=>S.where||(cur&&res(cur.title))))}
console.log(name,'errors',errs);}
await b.close()})();
