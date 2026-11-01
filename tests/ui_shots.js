const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,h,name] of [[1280,900,'desk'],[390,844,'phone']]){
const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('#go');for(let i=0;i<40;i++){const c=await p.$('.choice');if(!c)break;await c.click();await p.waitForTimeout(20)}
await p.evaluate(()=>{S.week=12;Object.keys(S.npc).slice(0,8).forEach(k=>{S.npc[k].met=true;S.npc[k].like=4});S.staff=['jolene','tommy'];for(let i=0;i<20;i++)log('测试日志第'+i+'条，今天店里来了很多客人','x','x');render()});
for(const tb of (process.argv[2]||'shop,biz,people,ach,log,wiki').split(',')){await p.evaluate(t=>{tab=t;mview='panel';render()},tb);
 await p.screenshot({path:`/tmp/s_${name}_${tb}.png`,fullPage:name==='desk'});}
}
await b.close()})();
