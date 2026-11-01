const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 for(const [w,h,scheme] of [[1280,900,'light'],[400,860,'dark']]){
  const p=await b.newPage({viewport:{width:w,height:h},colorScheme:scheme});
  p.on('pageerror',e=>errs.push(w+': '+e.message));
  await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
  await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
  await p.evaluate(()=>{S.week=15;S.cash=4000;S.up.pickup=1;S.course.drive=3;S.npc.maya.met=true;S.npc.maya.like=7;S.npc.maya.trust=5;cur=null;queue=[];render()});
  await p.evaluate(()=>{mview='panel';render()});await p.click('[data-t="map"]');await p.screenshot({path:`shots/map_${w}.png`,fullPage:true});
  await p.selectOption('#tripwith','maya').catch(()=>{});
  await p.click('#panel [data-go="austin"]');
  while(await p.$('.choice')){await p.click('.choice');}
  const where=await p.evaluate(()=>S.where);
  await p.screenshot({path:`shots/austin_${w}.png`,fullPage:true});
  // do the first enabled city action, play through its scene
  await p.evaluate(()=>{mview='act';render()});const btn=await p.$('.act:not([disabled]):not(.off)');const label=btn?await btn.textContent():'-';if(btn)await btn.click();
  let n=0;while(await p.$('.choice')&&n++<10){await p.click('.choice:not([disabled])').catch(()=>{});}
  const after=await p.evaluate(()=>({where:S.where,slot:S.slot,mayaLike:S.npc.maya.like}));
  // go home
  const home=await p.$('[data-a="austin:trip|home"]');if(home&&!(await home.isDisabled())&&!(await home.getAttribute('aria-disabled')))await home.click();
  n=0;while(await p.$('.choice')&&n++<10){await p.click('.choice:not([disabled])').catch(()=>{});}
  const back=await p.evaluate(()=>S.where);
  // overnight trip to Marfa
  await p.evaluate(()=>{S.slot=0;S.energy=10;cur=null;queue=[];MAP_FOCUS='marfa';mview='panel';render()});await p.click('[data-t="map"]');await p.click('#panel [data-go="marfa"]');
  n=0;while(await p.$('.choice')&&n++<10){await p.click('.choice:not([disabled])').catch(()=>{});}
  await p.screenshot({path:`shots/marfa_${w}.png`});
  const wide=await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  console.log(w,{where,label:label.trim(),after,back,marfa:await p.evaluate(()=>S.where),overflow:wide});
 }
 console.log('errors:',errs.length?errs:'none');await b.close();
})();
