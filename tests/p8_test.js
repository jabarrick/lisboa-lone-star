// The Tibetan family in Waco (story/p8.js): every stage and choice of the four arcs in three languages, visit gating, butter tea, Losar, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text: '+s.slice(0,40));if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,40));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$\\d+/g,'')),path+' zh has Latin: '+s.slice(0,40))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.charme=70;S.letters=12;S.energy=10;S.npc.colleen.met=true;S.week=40;S.day=6;S.slot=0;S.where='waco';S.visited.waco=10;queue=[];cur=null};
const loc=()=>CITIES.waco.locs.find(l=>l.id==='p8_yard');const act=id=>loc().acts.find(a=>a.id===id);
chk(!!loc(),'Waco location exists');
for(const k of ['tenzin','dolma','tsering','lobsang']){const id='p8_'+k;
 for(let s=0;s<3;s++){fresh();S.flags[id]=s;const n=act(id).run().choices.length;
  for(let i=0;i<n;i++){fresh();S.flags[id]=s;chk(act(id).req()===true,k+' s'+s+' req');const sc=act(id).run();walk(sc,k+' s'+s);chk(S.flags[id]===s+1&&S.npc[id].met,k+' advances + met');
   if(s<2)chk(act(id).req()!==true,k+' one stage per visit');const c=sc.choices[i];chk(!c.req||c.req()===true,k+' s'+s+' c'+i+' req');c.fx&&c.fx();if(c.next)walk(c.next(),k+' s'+s+' c'+i)}}
 fresh();S.flags[id]=3;walk(act(id).run(),k+' chat');chk(act(id).req()!==true,k+' chat once a day');}
fresh();S.flags.p8_tenzin=1;S.flags.p8_tenzinV=10;chk(act('p8_tenzin').req()!==true,'same visit blocked');S.visited.waco=11;chk(act('p8_tenzin').req()===true,'new visit opens stage');
fresh();S.week=2;S.flags.p8_tsering=0;chk(act('p8_tsering').req()!==true,'tsering waits until week 5');
fresh();S.flags.p8_dolma=2;const d=act('p8_dolma').run();const r0=S.rep;d.choices[0].fx();chk(S.rep===r0+2&&S.flags.p8_painting,'painting rep +2');const r1=S.rep;d.choices[1].fx();chk(S.rep===r1,'painting perk only once');
fresh();chk(act('p8_tea').req()!==true,'tea needs the family');S.npc.p8_lobsang.met=true;S.energy=5;walk(act('p8_tea').run(),'tea');chk(S.energy===7&&act('p8_tea').req()!==true,'tea +2 energy once a day');
fresh();S.where=null;const L=STORY.find(e=>e.id==='p8_losar');S.week=35;chk(!L.when(),'losar needs two met');S.npc.p8_tenzin.met=true;S.npc.p8_dolma.met=true;chk(L.when(),'losar fires');
S.week=30;chk(!L.when(),'losar not in week 30');S.week=36;S.where='waco';chk(!L.when(),'losar not while travelling');S.where=null;
const ls=L.run();walk(ls,'losar');ls.choices.forEach((c,i)=>{fresh();S.where=null;S.npc.p8_tenzin.met=true;S.npc.p8_dolma.met=true;chk(!c.req||c.req()===true,'losar c'+i);c.fx();walk(c.next(),'losar c'+i)});
fresh();S.where=null;const F=STORY.find(e=>e.id==='p8_fest');S.week=46;S.day=1;S.slot=1;chk(!F.when(),'festival needs promises');
Object.assign(S.flags,{p8_lobsangFest:1,p8_dolmaFest:1,p8_tenzinFest:1,p8_tseringFest:1,p4_wuFest:1});chk(F.when(),'festival fires');
const fsc=F.run();walk(fsc,'fest');const f0=S.flags.festivalScore||0;fsc.choices[0].fx();chk((S.flags.festivalScore||0)===f0+2,'festival +2');walk(fsc.choices[0].next(),'fest next');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('风马旗')),'ending paragraph');
console.log(bad?bad+' FAILURES':'P8 OK');`;
eval(js);
