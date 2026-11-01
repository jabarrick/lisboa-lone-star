const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 for(const [w,h,scheme] of [[1280,900,'light'],[400,860,'dark']]){
  const p=await b.newPage({viewport:{width:w,height:h},colorScheme:scheme});
  p.on('pageerror',e=>errs.push(w+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(w+' console: '+m.text())});
  await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
  await p.click('#go');
  for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
  // jump ahead: week 6 with gym and muscle so all actions show
  await p.evaluate(()=>{S.week=6;S.flags.gym=1;S.flags.ranch=1;S.muscle=3;S.cash=3000;mondaySystems();S.orders.push({id:'bake',due:dayIndex()+3,done:false});cur=null;queue=[];render()});
  await p.screenshot({path:`shots/idle_${w}.png`,fullPage:false});
  // grill minigame
  await p.evaluate(()=>{mview='act';render()});await p.click('[data-a="shop|cook"]');await p.waitForSelector('#mbtn');
  for(let i=0;i<3;i++){await p.waitForTimeout(350);await p.click('#mbtn')}
  await p.screenshot({path:`shots/grill_${w}.png`});
  await p.waitForTimeout(800);
  const t1=await p.textContent('.scene h2');
  // arm wrestling minigame
  while(await p.$('.choice')){await p.click('.choice');}
  await p.evaluate(()=>{mview='act';render()});await p.click('[data-a="gym|arm"]').catch(e=>errs.push('arm click '+e.message));await p.waitForSelector('#mbtn');
  await p.click('#mbtn');for(let i=0;i<30;i++)await p.click('#mbtn',{force:true}).catch(()=>{});
  await p.waitForTimeout(900);const t2=await p.textContent('.scene');
  while(await p.$('.choice')){await p.click('.choice');}
  // panels
  await p.evaluate(()=>{mview='panel';render()});await p.click('[data-t="biz"]');await p.screenshot({path:`shots/biz_${w}.png`,fullPage:true});
  await p.click('[data-up="neon"]');await p.click('[data-price="premium"]');
  await p.click('[data-t="ach"]');await p.screenshot({path:`shots/ach_${w}.png`});
  const wide=await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  console.log(w,'after grill:',t1.trim(),'| arm result has win/lose text:',/压在|lose|输/.test(t2)||/pin|Perdes|Deitas/.test(t2),'| horizontal overflow px:',wide,'| neon bought:',await p.evaluate(()=>!!S.up.neon),'price:',await p.evaluate(()=>S.price));
 }
 console.log('errors:',errs.length?errs:'none');await b.close();
})();
