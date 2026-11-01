// The start screen must scroll on short phone screens so the "board the bus" button is reachable (e.g. in-app browsers).
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];let bad=0;
for(const [w,h] of [[390,640],[360,560],[390,844],[1280,720]]){const p=await b.newPage({viewport:{width:w,height:h},isMobile:w<800,hasTouch:w<800});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.clear()});
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
 await p.locator('#go').scrollIntoViewIfNeeded();const box=await p.locator('#go').boundingBox();
 const inView=box&&box.y>=0&&box.y+box.height<=h;if(!inView){bad++;console.log('FAIL',w+'x'+h,'start button not reachable',box)}
 if(w<800)await p.tap('#go');else await p.click('#go');await p.waitForTimeout(150);
 const r=await p.evaluate(()=>({started:!!S,start:document.documentElement.classList.contains('start'),y:scrollY}));
 if(!r.started||r.start||r.y!==0){bad++;console.log('FAIL',w+'x'+h,'after start',JSON.stringify(r))}
 else console.log(w+'x'+h,'ok')}
console.log(bad?bad+' FAILURES':'START OK','| errors:',errs.length?errs:'none');await b.close()})();
