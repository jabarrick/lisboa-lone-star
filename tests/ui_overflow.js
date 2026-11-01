// Layout audit: every language × desktop/phone × every panel tab and phone view.
// Reports elements wider than the viewport and text clipped inside its box (scrollWidth > clientWidth).
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];let issues=0;
for(const lang of ['zh','en','pt'])for(const [w,h,name] of [[1280,900,'desk'],[390,844,'phone']]){
 const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(l=>{try{localStorage.clear();localStorage.setItem('lisboa-lone-star-lang',l)}catch(e){}},lang);
 await p.goto('file://'+require('path').resolve(__dirname,'../lisboa/index.html'));
 await p.click('#go');for(let i=0;i<40;i++){const c=await p.$('.choice');if(!c)break;await c.click();await p.waitForTimeout(20)}
 await p.evaluate(()=>{S.week=20;S.cash=4321;Object.keys(S.npc).forEach(k=>{S.npc[k].met=true;S.npc[k].like=6;S.npc[k].trust=4});S.staff=['jolene','tommy','marisol'];S.orders.push({id:'bake',due:dayIndex()+3,done:false});render()});
 const views=[['story',null],['act',null],['map',null],...['shop','biz','map','people','ach','log','wiki'].map(t=>['panel',t])];
 for(const [mv,tb] of (name==='desk'?[['story','shop'],...views.filter(v=>v[1]&&v[1]!=='shop')]:views)){
  await p.evaluate(([mv,tb])=>{mview=mv;if(tb)tab=tb;render()},[mv,tb]);
  const r=await p.evaluate(()=>{const W=innerWidth,out=[];const sel=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).join('.'):'');
   for(const e of document.querySelectorAll('#app *')){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||!e.offsetParent&&cs.position!=='fixed')continue;
    const bx=e.getBoundingClientRect();if(!bx.width)continue;
    let scroller=false;for(let a=e.parentElement;a;a=a.parentElement){const o=getComputedStyle(a).overflowX;if(o==='auto'||o==='scroll'){scroller=true;break}}
    if(!scroller&&(bx.right>W+1||bx.left<-1))out.push('OFFSCREEN '+sel(e)+' '+Math.round(bx.left)+'→'+Math.round(bx.right)+' "'+(e.textContent||'').trim().slice(0,30)+'"');
    if(['hidden','clip'].includes(cs.overflowX)&&cs.textOverflow!=='ellipsis'&&e.scrollWidth>e.clientWidth+2&&e.children.length===0)out.push('CLIPPED '+sel(e)+' "'+e.textContent.trim().slice(0,30)+'"');
    if(e.matches('button,.btn-s,.act,.chip,.tab')&&e.scrollWidth>e.clientWidth+2)out.push('BTN-OVER '+sel(e)+' "'+e.textContent.trim().slice(0,30)+'"')}
   return {out:[...new Set(out)].slice(0,12),wide:document.documentElement.scrollWidth-W}});
  if(r.out.length||r.wide>0){issues+=r.out.length+(r.wide>0);console.log(lang,name,mv,tb||'','pagewide',r.wide);r.out.forEach(x=>console.log('   ',x))}
  if(name==='phone'&&lang!=='zh'&&mv==='panel')await p.screenshot({path:`/tmp/o_${lang}_${tb}.png`});
 }
 await p.close();}
console.log(issues?issues+' layout issues':'LAYOUT OK','| errors:',errs.length?errs:'none');await b.close()})();
