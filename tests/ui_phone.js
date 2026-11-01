const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [scheme,lang] of [['light','zh'],['dark','en']]){
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:scheme});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(l=>{try{localStorage.setItem('lisboa-lone-star-lang',l)}catch(e){}},lang);
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.click('#go');
 await p.screenshot({path:`shots/phone_story_${lang}.png`});
 for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
 const mv1=await p.evaluate(()=>mview);
 await p.evaluate(()=>{S.week=15;S.cash=3000;S.flags.gym=1;S.flags.ranch=1;S.where='austin';render()});
 await p.screenshot({path:`shots/phone_act_${lang}.png`});
 await p.click('.mnav [data-mv="map"]');await p.screenshot({path:`shots/phone_map_${lang}.png`});
 await p.click('.mnav [data-mv="panel"]');await p.screenshot({path:`shots/phone_panel_${lang}.png`});
 const docScroll=await p.evaluate(()=>({h:document.documentElement.scrollHeight-window.innerHeight,w:document.documentElement.scrollWidth-window.innerWidth}));
 await p.click('.mnav [data-mv="act"]');const act=await p.$('.act:not([disabled]):not(.off)');await act.click();const mv2=await p.evaluate(()=>mview);
 console.log(scheme,lang,'after first scenes view:',mv1,'| page overflow',JSON.stringify(docScroll),'| after action view:',mv2);}
 console.log('errors',errs.length?errs:'none');await b.close()})();
