// New neighbours (story/p4.js): every stage and every choice of all six arcs in three languages, places, staff, dishes, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text');if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,40));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$\\d+/g,'')),path+' zh has Latin: '+s.slice(0,40))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.charme=70;S.letters=12;['hannah','grace','kyle','albertina'].forEach(k=>{S.npc[k].met=true;S.npc[k].trust=6});S.week=30;S.day=7;S.slot=1;S.flags.church=1;queue=[];cur=null};
const act=(loc,id)=>EXTRA_LOCS.find(l=>l.id===loc).acts.find(a=>a.id===id);
const arcs=[['p4_bakery','p4_carmen','carmen',4],['p4_bakery','p4_isabel','isabel',3],['p4_yard','p4_tomas','tomas',3],['p4_yard','p4_ortega','ortega',3],['p4_wu','p4_meiling','meiling',4],['p4_wu','p4_kevin','kevin',2]];
for(const [loc,id,k,n] of arcs){for(let s=0;s<n;s++){
  fresh();S.flags['p4_'+k]=s;if(k==='kevin')S.flags.p4_meiling=3;const nC=act(loc,id).run().choices.length;
  for(let i=0;i<nC;i++){fresh();S.flags['p4_'+k]=s;S.flags.p4_carmen=Math.max(S.flags.p4_carmen||0,k==='ortega'?1:0);if(k==='kevin'||k==='meiling'){S.flags.p4_meiling=k==='kevin'?3:s;S.flags.p4_kevin=k==='kevin'?s:1}
   const sc=act(loc,id).run();walk(sc,k+' s'+s);chk(S.flags['p4_'+k]===s+1,k+' advances');const c=sc.choices[i];chk(!c.req||c.req()===true,k+' s'+s+' choice '+i+' req: '+(c.req&&res(c.req(),'en')));
   c.fx&&c.fx();if(c.next)walk(c.next(),k+' s'+s+' c'+i)}}
 fresh();S.flags['p4_'+k]=n;const ch=act(loc,id).run();walk(ch,k+' chat');}
// gates
fresh();S.week=2;chk(act('p4_bakery','p4_carmen').req()!==true,'carmen gated before week 3');
fresh();S.flags.p4_meiling=3;S.week=42;chk(act('p4_wu','p4_meiling').req()!==true,'new year dinner closes after week 40');
fresh();S.flags.p4_meiling=2;S.week=30;chk(act('p4_wu','p4_kevin').req()!==true,'kevin waits for meiling stage 3');
fresh();S.flags.p4_meiling=3;S.week=30;S.day=3;chk(act('p4_wu','p4_kevin').req()!==true,'kevin only on sundays');
// small acts
fresh();S.slot=0;const b=act('p4_bakery','p4_bread');chk(b.req()===true,'bread in the morning');walk(b.run(),'bread');chk(b.req()!==true,'bread once a day');
fresh();S.slot=1;const l=act('p4_wu','p4_lunch');S.energy=5;walk(l.run(),'lunch');chk(S.energy===7,'lunch +2 energy');
fresh();S.day=7;S.slot=0;walk(act('p4_yard','p4_coffee').run(),'coffee');
// staff
fresh();chk(!STAFF.p4_isabel.avail(),'isabel not hireable before meeting');S.flags.p4_isabel=1;chk(STAFF.p4_isabel.avail(),'isabel hireable after stage 1');
// dishes
fresh();S.flags.p4_carmen=1;act('p4_bakery','p4_carmen').run().choices[0].fx();chk(S.flags.dish_p4_concha,'concha learned');
fresh();S.flags.p4_meiling=1;act('p4_wu','p4_meiling').run().choices[0].fx();chk(S.flags.dish_p4_gulao,'sweet-and-sour pork learned');
// people panel shows the new places
fresh();S.npc.p4_carmen.met=true;chk(locName(NPCS.p4_carmen.loc)&&res(locName(NPCS.p4_carmen.loc),'en')==='Mendoza Bakery','people panel place name');
// festival + ending
fresh();const e=STORY.find(x=>x.id==='p4_fest');S.week=46;S.day=4;S.slot=1;chk(!e.when(),'festival event needs helpers');
Object.assign(S.flags,{p4_carmenFest:1,p4_tomasFest:1,p4_wuFest:1,p4_ortegaFest:1,p4_isabel:3});chk(e.when(),'festival event fires');
const fsc=e.run();walk(fsc,'fest');const f0=S.flags.festivalScore||0;fsc.choices[0].fx();chk((S.flags.festivalScore||0)===f0+3,'festival +3');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('手风琴')),'ending paragraph');
console.log(bad?bad+' FAILURES':'P4 OK');`;
eval(js);
