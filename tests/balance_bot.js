// Balance probe: a "human-ish" player (about half the slots in the shop, keeps stock up, rest random).
// Usage: node tests/balance_bot.js [runs] [shopShare] [staff] [nocar]   (by default buys a used pickup at week 8 once cash > $3500)   (needs a fresh build: python3 build.py)
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const RUNS=+(process.argv[2]||12),SHARE=+(process.argv[3]||0.5),HIRE=process.argv.includes('staff'),CARS=!process.argv.includes('nocar');
const cols=['cash','profit','rep','online','charme','bonus','charm','craft','tex','saud'];const W=[4,8,12,16,20,24,30,36,42,48];
const acc={};const first60=[];const cars={};const ends={};let neg=0;
for(let run=0;run<RUNS;run++){S=newState('T',['浓','中','淡'][run%3]);S.npc.grace.met=true;queue=[];cur=null;let steps=0,lastW=0,f60=0;
 while(S&&steps<30000){steps++;
  if(cur){const ti=String(res(cur.title||'','en'));if(/Ending ·/.test(ti)){ends[ti]=(ends[ti]||0)+1;break}const cs=cur.choices||[];choose(Math.max(0,cs.findIndex(c=>!c.req||c.req()===true)));continue}
  if(S.week>=50)break;
  if(!f60&&charm()>=60)f60=S.week;
  if(S.week!==lastW&&S.day===1&&S.slot===0){const w=S.week-1;lastW=S.week;const h=S.history[S.history.length-1];
   if(W.includes(w)){(acc[w]=acc[w]||[]).push([S.cash,h?h.profit:0,S.rep,S.online,S.stats.charme,charmBonus(),charm(),S.stats.oficio,S.stats.tex,S.stats.saud]);if(S.cash<0)neg++}}
  if(S.inv.beef<12&&S.cash>150){S.cash-=73;S.wk.spend+=73;S.inv.beef+=10}if(S.inv.pork<12&&S.cash>80){S.cash-=29;S.wk.spend+=29;S.inv.pork+=10}if(S.inv.fish<8&&S.cash>80){S.cash-=37;S.wk.spend+=37;S.inv.fish+=10}if(S.inv.dairy<10&&S.cash>60){S.cash-=18;S.wk.spend+=18;S.inv.dairy+=10}
  if(HIRE&&S.cash>800&&S.staff.length<2){for(const k of ['tommy','marisol','jolene']){if(S.staff.length<2&&!S.staff.includes(k)&&((k==='tommy'&&S.week>=5)||(k==='marisol'&&rel('marisol').met)||(k==='jolene'&&rel('jolene').like>=3))){S.staff.push(k);smOf(k)}}}
  if(CARS&&!S.car&&S.week>=8&&S.cash>3500)buyCar('pickup');
  const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a)&&a.loc!=='x:v1_lot');
  if(!A.length){doAction(actions().find(a=>a.id==='sleep'));continue}
  const shop=A.filter(x=>['host','cook','upsell'].includes(x.id));
  doAction(shop.length&&Math.random()<SHARE?pick(shop):pick(A));
 }
 first60.push(f60||99);const ck=S&&S.car||'none';cars[ck]=(cars[ck]||0)+1;}
console.log('runs',RUNS,'shopShare',SHARE,HIRE?'hires staff':'',' (means)');console.log('wk  '+cols.map(c=>c.padStart(7)).join(''));
for(const w of W){const r=acc[w];if(!r)continue;console.log(String(w).padEnd(4)+cols.map((_,i)=>String(Math.round(r.reduce((a,x)=>a+x[i],0)/r.length)).padStart(7)).join(''))}
console.log('vehicle at the end',JSON.stringify(cars));console.log('charm>=60 first week (median)',first60.sort((a,b)=>a-b)[first60.length>>1],' negative-cash samples',neg,' endings',JSON.stringify(ends));`;
eval(js);
