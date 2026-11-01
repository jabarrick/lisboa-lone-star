// p7 (story/p7.js): every stage × every choice of six arcs in three languages, places, city arcs, Juneteenth, council vote, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text');if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,50));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$\\d+/g,'')),path+' zh has Latin: '+s.slice(0,50))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.charme=70;S.letters=12;S.course.ride=2;S.flags.ranch=1;S.flags.p4_tomas=1;
 ['hannah','grace','kyle','albertina','dale','colleen','brooke','beto','lucia','maricela'].forEach(k=>{S.npc[k].met=true;S.npc[k].trust=6});S.week=30;S.day=3;S.slot=2;queue=[];cur=null};
const act=(loc,id)=>EXTRA_LOCS.find(l=>l.id===loc).acts.find(a=>a.id===id);
const cityAct=(city,loc,id)=>CITIES[city].locs.find(l=>l.id===loc).acts.find(a=>a.id===id);
const home=[['p7_zion','p7_zeke','zeke'],['p7_zion','p7_angela','angela'],['p7_health','p7_naomi','naomi'],['p7_arena','p7_marcus','marcus']];
const city=[['aggieland','p7_ext','p7_arc_wei','wei'],['elpaso','p7_chinatown','p7_arc_xiuying','xiuying']];
const getAct=x=>x.length===3?act(x[0],x[1]):cityAct(x[0],x[1],x[2]);
for(const x of [...home,...city]){const k=x[x.length-1];for(let s=0;s<3;s++){
  fresh();S.flags['p7_'+k]=s;const nC=getAct(x).run().choices.length;chk(nC>=2,k+' s'+s+' has choices');
  for(let i=0;i<nC;i++){fresh();S.flags['p7_'+k]=s;if(x.length===4){S.where=x[0];S.visited[x[0]]=5}
   const sc=getAct(x).run();walk(sc,k+' s'+s);chk(S.flags['p7_'+k]===s+1,k+' advances');const c=sc.choices[i];chk(!c.req||c.req()===true,k+' s'+s+' choice '+i+' req: '+(c.req&&res(c.req(),'en')));
   c.fx&&c.fx();chk(!!c.next,k+' s'+s+' c'+i+' has outcome');if(c.next)walk(c.next(),k+' s'+s+' c'+i)}}
 fresh();S.flags['p7_'+k]=3;if(x.length===4){S.where=x[0];S.visited[x[0]]=5}walk(getAct(x).run(),k+' chat')}
// gates
fresh();S.week=2;chk(act('p7_zion','p7_zeke').req()!==true,'zeke gated before week 3');
fresh();S.flags.p7_angela=1;S.flags.p7_angelaW=29;S.week=30;chk(act('p7_zion','p7_angela').req()!==true,'angela gap between stages');
fresh();S.where='aggieland';S.visited.aggieland=3;S.flags.p7_wei=1;S.flags.p7_wei_v=3;chk(cityAct('aggieland','p7_ext','p7_arc_wei').req()!==true,'wei: one stage per visit');
S.visited.aggieland=4;chk(cityAct('aggieland','p7_ext','p7_arc_wei').req()===true,'wei: next visit opens next stage');
S.flags.p7_wei=2;S.flags.ranch=0;chk(cityAct('aggieland','p7_ext','p7_arc_wei').req()!==true,'wei water test needs the ranch');
// small actions
fresh();S.day=3;S.slot=2;const ch=act('p7_zion','p7_choir');chk(ch.req()===true,'choir on wednesday night');walk(ch.run(),'choir');chk(ch.req()!==true&&S.restBonus>=1,'choir once, sleep bonus');
fresh();S.day=1;chk(act('p7_zion','p7_choir').req()!==true,'choir not on monday');
fresh();S.clean=50;const m=act('p7_health','p7_manual');walk(m.run(),'manual');chk(S.clean===56&&m.req()!==true,'manual +6 once a week');
fresh();S.day=5;S.slot=2;const r=act('p7_arena','p7_rodeo');chk(r.req()===true,'rodeo friday night');walk(r.run(),'rodeo');chk(S.cash===8992,'rodeo $8');
// Juneteenth
fresh();const j=STORY.find(e=>e.id==='p7_june');S.week=2;S.day=6;S.slot=1;chk(j.when(),'juneteenth fires W2 Sat midday');
const js_=j.run();walk(js_,'june');chk(rel('p7_zeke').met&&rel('p7_angela').met,'juneteenth introduces Zeke and Angela');
for(let i=0;i<js_.choices.length;i++){const c=js_.choices[i];c.fx&&c.fx();walk(c.next(),'june c'+i)}
S.where='austin';chk(!j.when(),'no juneteenth while travelling');
// council vote
fresh();const base=c4_votes(false);S.flags.p7_waterTest=1;chk(c4_votes(false)===base,'one record: no extra vote');S.flags.p7_healthRecords=1;chk(c4_votes(false)===Math.min(5,base+1),'two records: +1 vote');
S.flags.license=true;S.flags.stormOpen=true;S.flags.c4_roz=1;S.flags.c4_state=1;S.flags.evidence=true;S.rep=60;chk(c4_votes(true)<=5,'votes capped at 5');
// festival + ending
fresh();const e=STORY.find(x=>x.id==='p7_fest');S.week=46;S.day=3;S.slot=1;chk(!e.when(),'festival event needs helpers');
Object.assign(S.flags,{p7_zekeFest:1,p7_angelaFest:1,p7_marcusFest:1,p7_naomiFest:1,p7_xiuyingFest:1,p7_weiFest:1});chk(e.when(),'festival event fires');
const fsc=e.run();walk(fsc,'fest');const f0=S.flags.festivalScore||0;fsc.choices[0].fx();chk((S.flags.festivalScore||0)===f0+3,'festival +3');walk(fsc.choices[1].next(),'fest c1');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('铁路灯')),'ending paragraph');
// people panel place names
chk(res(locName(NPCS.p7_zeke.loc),'en')==='Zion AME Church'&&!!CITIES[NPCS.p7_wei.loc],'npc locs resolve');
console.log(bad?bad+' FAILURES':'P7 OK');`;
eval(js);
