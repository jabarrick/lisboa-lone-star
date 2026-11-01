// More neighbours (story/p5.js): every stage and every choice of all six arcs in three languages, places, staff, dishes, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text');if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,40));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$\\d+/g,'')),path+' zh has Latin: '+s.slice(0,40))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.saud=60;S.stats.charme=70;S.letters=12;S.course.drive=2;S.car='f150_95';S.carMi=VEHICLES.f150_95.miles;
 ['hannah','grace','kyle','albertina','colleen','travis'].forEach(k=>{S.npc[k].met=true;S.npc[k].trust=6});Object.keys(NPCS).filter(k=>k.startsWith('p5_')).forEach(k=>{S.npc[k].met=true;S.npc[k].trust=6});
 S.flags.p3_pt=3;S.flags.p4_tomas=1;S.week=32;S.day=3;S.slot=1;queue=[];cur=null};
const act=(loc,id)=>EXTRA_LOCS.find(l=>l.id===loc).acts.find(a=>a.id===id);
const arcs=[['p5_tire','p5_ramiro','ramiro',3],['p5_tire','p5_jc','jc',3],['p5_court','p5_lola','lola',3],['p5_court','p5_vicky','vicky',3],['p5_corner','p5_patty','patty',3],['p5_corner','p5_angel','angel',3]];
for(const [loc,id,k,n] of arcs){for(let s=0;s<n;s++){
  fresh();S.flags['p5_'+k]=s;S.flags.p5_ramiro=Math.max(S.flags.p5_ramiro||0,k==='angel'?1:0);const nC=act(loc,id).run().choices.length;
  for(let i=0;i<nC;i++){fresh();S.flags['p5_'+k]=s;if(k==='angel')S.flags.p5_ramiro=Math.max(S.flags.p5_ramiro||0,1);
   const sc=act(loc,id).run();walk(sc,k+' s'+s);chk(S.flags['p5_'+k]===s+1,k+' advances');const c=sc.choices[i];chk(!c.req||c.req()===true,k+' s'+s+' choice '+i+' req: '+(c.req&&res(c.req(),'en')));
   c.fx&&c.fx();if(c.next)walk(c.next(),k+' s'+s+' c'+i)}}
 fresh();S.flags['p5_'+k]=n;walk(act(loc,id).run(),k+' chat');}
// variants: JC after the storm with and without the open shop, Patty's tamalada at Christmas and later
for(const open of [true,false]){fresh();S.flags.stormOpen=open;S.flags.p5_jc=1;walk(act('p5_tire','p5_jc').run(),'jc storm '+open)}
for(const w of [28,33]){fresh();S.week=w;S.flags.p5_patty=1;walk(act('p5_corner','p5_patty').run(),'patty tamalada w'+w)}
// gates
fresh();S.week=2;chk(act('p5_tire','p5_ramiro').req()!==true,'ramiro gated before week 4');
fresh();S.flags.p5_jc=1;S.week=29;chk(act('p5_tire','p5_jc').req()!==true,'jc stage 2 waits for the storm');
// free check
fresh();const ck=act('p5_tire','p5_check');chk(ck.req()!==true,'free check needs the deal');S.flags.p5_ramiro=1;act('p5_tire','p5_ramiro').run().choices[0].fx();
chk(S.flags.p5_ramiroDeal&&S.carServ===S.week,'ramiro deal gives a free service');chk(ck.req()!==true,'free check waits 8 weeks');S.week+=8;chk(ck.req()===true,'free check after 8 weeks');walk(ck.run(),'free check');chk(S.carServ===S.week,'free check services the car');
S.car=null;S.week+=8;chk(ck.req()!==true,'free check needs a car');
// small acts
fresh();S.slot=0;const tc=act('p5_corner','p5_taco');S.energy=5;chk(tc.req()===true,'taco in the morning');walk(tc.run(),'taco');chk(S.energy===6&&tc.req()!==true,'taco +1 energy, once a day');
fresh();const fm=act('p5_court','p5_film');walk(fm.run(),'film');chk(fm.req()!==true,'microfilm once a week');
// deed + vote
fresh();S.flags.p5_lola=2;const dl=act('p5_court','p5_lola').run();dl.choices[0].fx();chk(S.flags.p5_deedCopy,'deed copy');
const v0=(()=>{const f=S.flags.p5_vickyTurn;S.flags.p5_vickyTurn=0;const v=c4_votes(false);S.flags.p5_vickyTurn=f;return v})();S.flags.p5_vickyTurn=1;chk(c4_votes(false)===Math.min(5,v0+1),'deed + lot list = +1 council vote');
fresh();S.flags.p5_vicky=2;const vk=act('p5_court','p5_vicky').run();vk.choices[2].fx();chk(!S.flags.p5_vickyTurn,'vicky keeps the list if you leave it to her');
// people panel place names
chk(res(locName(NPCS.p5_lola.loc),'en')==='County records room','people panel place name');
// festival + ending
fresh();const e=STORY.find(x=>x.id==='p5_fest');S.week=46;S.day=2;S.slot=1;chk(!e.when(),'festival event needs helpers');
Object.assign(S.flags,{p5_ramiroFest:1,p5_angelFest:1,p5_pattyFest:1,p5_jcFest:1});chk(e.when(),'festival event fires');
const fsc=e.run();walk(fsc,'fest');const f0=S.flags.festivalScore||0;fsc.choices[0].fx();chk((S.flags.festivalScore||0)===f0+3,'festival +3');
walk(fsc.choices[0].next(),'fest next');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('卷饼车有了屋顶')),'ending paragraph');
console.log(bad?bad+' FAILURES':'P5 OK');`;
eval(js);
