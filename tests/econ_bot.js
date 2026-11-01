const fs=require('fs');
const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'Tiago'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};
global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const STRAT=process.argv[2]||'random';
const marks=[4,12,24,36,48];const rows={};const ends={};
for(let run=0;run<12;run++){S=newState('T',['浓','中','淡'][run%3]);S.npc.grace.met=true;queue=[];cur=null;let steps=0,last=null;
 while(S&&steps<20000){steps++;last=S;
  if(cur){const ti=String(res(cur.title||'','en'));if(/Ending ·/.test(ti)){ends[ti]=(ends[ti]||0)+1;break}
   const cs=cur.choices||[];let i=cs.findIndex(c=>(!c.req||c.req()===true)&&/true|truth|honest/i.test(res(c.t,'en')));if(i<0||STRAT==='random')i=cs.findIndex(c=>!c.req||c.req()===true);choose(Math.max(0,i));continue}
  if(S.week>=50)break;
  if(S.day===1&&S.slot===0&&!S['_m'+S.week]){S['_m'+S.week]=1;if(marks.includes(S.week-1)){(rows[S.week-1]=rows[S.week-1]||[]).push([S.cash,charm(),S.stats.oficio,S.stats.tex,S.stats.saud,S.rep,S.online].map(Math.round))}}
  const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a));
  if(!A.length){doAction(actions().find(a=>a.id==='sleep'));continue}
  const LUSO=['self','fado','teach','mass','call'];let A2=STRAT==='tex'?A.filter(x=>!LUSO.includes(x.id)):STRAT==='luso'?A.filter(x=>!['drive','ride','gun','drink','work','train','arm'].includes(x.id)):A;if(!A2.length)A2=A;
  let a=A2[Math.floor(Math.random()*A2.length)];if(STRAT==='luso'){const l=A2.filter(x=>LUSO.includes(x.id));if(l.length&&Math.random()<0.4)a=pick(l)}
  if(STRAT==='shop'||STRAT==='tex'||STRAT==='luso'){const s=A.find(x=>['host','cook','upsell'].includes(x.id));if(s&&Math.random()<0.7)a=s;if(S.inv.beef<10&&S.cash>100){S.cash-=65;S.wk.spend+=65;S.inv.beef+=10}if(S.inv.dairy<10&&S.cash>50){S.cash-=16;S.wk.spend+=16;S.inv.dairy+=10}if(S.inv.pork<10&&S.cash>50){S.cash-=32;S.wk.spend+=32;S.inv.pork+=10}if(S.inv.fish<6&&S.cash>50){S.cash-=42;S.wk.spend+=42;S.inv.fish+=10}}
  doAction(a);
 }}
console.log(STRAT,'  cols: cash charm craft tex saud rep online');
for(const w of marks){const r=rows[w]||[];const avg=r[0]?r[0].map((_,i)=>Math.round(r.reduce((a,x)=>a+x[i],0)/r.length)):[];console.log('wk',w,JSON.stringify(avg))}
console.log('endings',JSON.stringify(ends));
const h=[];`;
eval(js);
