const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 for(const [w,h,scheme,lang] of [[1280,900,'light','zh'],[1280,900,'dark','en'],[400,860,'light','pt']]){
  const p=await b.newPage({viewport:{width:w,height:h},colorScheme:scheme});
  p.on('pageerror',e=>errs.push(w+': '+e.message));
  await p.addInitScript(l=>{try{localStorage.setItem('lisboa-lone-star-lang',l)}catch(e){}},lang);
  await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
  await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
  await p.evaluate(()=>{S.week=15;S.cash=4000;S.visited={waco:1,austin:2,galveston:1};cur=null;queue=[];render()});
  const m1=await p.$('.tx-map');await m1.screenshot({path:`shots/txmap_home_${w}_${scheme}.png`});
  await p.evaluate(()=>{S.where='sanantonio';S.npc.maya.met=true;S.tripWith='maya';render()});
  const m2=await p.$('.tx-map');await m2.screenshot({path:`shots/txmap_sa_${w}_${scheme}.png`});
  await p.click('.txm-city[data-city="marfa"]');const tabNow=await p.evaluate(()=>tab);
  const wide=await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  console.log(w,scheme,lang,'click→tab',tabNow,'overflow',wide);
 }
 console.log('errors:',errs.length?errs:'none');await b.close();
})();
