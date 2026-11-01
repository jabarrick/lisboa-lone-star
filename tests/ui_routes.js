const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));await p.click('#go');for(let i=0;i<3;i++){await p.click('.choice').catch(()=>{})}
 for(const id of ['lubbock','permian','padre','marfa','lockhart']){await p.evaluate(id=>{S.where=id;S.tripLegs=0;cur=null;queue=[];render()},id);await p.locator('.tx-map').screenshot({path:`shots/route_${id}.png`})}
 console.log('errors',errs.length?errs:'none');await b.close()})();
