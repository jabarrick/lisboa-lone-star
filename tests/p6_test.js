// Hispanic Texans on the road (story/p6.js): every stage × every choice × 3 languages, visit gating, perks, boots, c4_state rule, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002\\uff0c]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text: '+String(s).slice(0,60));if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,40));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$[\\d,]+/g,'')),path+' zh has Latin: '+s.slice(0,40))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.charme=70;S.letters=12;['quim','rosaelena','bento','duarte'].forEach(k=>{S.npc[k].met=true});S.week=30;S.day=3;S.slot=1;S.visited={};queue=[];cur=null;S.flags.p4_tomas=2};
const arcs=[['sanantonio','p6_bridge','esperanza'],['elpaso','p6_boots','arturo'],['austin','p6_capitol','alicia'],['corpus','p6_docks','emilio'],['laredo','p6_customs','marta'],['houston','p6_weld','carlos']];
const act=(city,loc)=>{const L=CITIES[city].locs.find(l=>l.id===loc);chk(!!L,city+' has '+loc);return L.acts[0]};
for(const [city,loc,k] of arcs){chk(NPCS['p6_'+k]&&NPCS['p6_'+k].loc===city,k+' npc loc');
 for(let s=0;s<3;s++){
  fresh();S.flags['p6_'+k]=s;S.visited[city]=s+1;const nC=act(city,loc).run().choices.length;
  for(let i=0;i<nC;i++){fresh();S.flags['p6_'+k]=s;S.visited[city]=s+1;if(k==='arturo'&&s===2&&i===0)S.flags.p6_arturoOrder=1;
   if(k==='alicia'&&s===2){S.flags.p6_aliciaFile=1;S.flags.evidence=true}
   const a=act(city,loc);chk(a.req()===true,k+' s'+s+' available');const sc=a.run();walk(sc,k+' s'+s);chk(S.flags['p6_'+k]===s+1,k+' advances');
   chk(a.req()!==true,k+' only one stage per visit');
   const c=sc.choices[i];chk(!c.req||c.req()===true,k+' s'+s+' choice '+i+' req: '+(c.req&&res(c.req(),'en')));
   c.fx&&c.fx();if(c.next)walk(c.next(),k+' s'+s+' c'+i)}}
 fresh();S.flags['p6_'+k]=3;S.visited[city]=9;const a=act(city,loc);walk(a.run(),k+' chat');chk(a.req()!==true,k+' chat once a day')}
// boots
fresh();S.dress=1;S.flags.p6_arturo=2;S.visited.elpaso=3;S.flags.p6_arturoOrder=1;let sc=act('elpaso','p6_boots').run();const c0=S.cash;sc.choices[0].fx();chk(S.dress>=4&&S.cash===c0&&S.flags.p6_arturoFest,'paid boots: dress 4, no charge, festival');
fresh();S.dress=0;S.flags.p6_arturo=2;S.visited.elpaso=3;sc=act('elpaso','p6_boots').run();chk(sc.choices.length===3,'unpaid boots: can decline');const c1=S.cash;sc.choices[1].fx();chk(S.dress>=4&&c1-S.cash===450,'unpaid boots: pay $450');
// perks
fresh();S.perks={};S.flags.p6_emilio=2;S.visited.corpus=3;act('corpus','p6_docks').run().choices[0].fx();chk(S.perks.fish===0.85,'fish perk');
fresh();S.perks={};S.flags.p6_marta=2;S.visited.laredo=3;act('laredo','p6_customs').run().choices[0].fx();chk(S.perks.imp===0.85,'imports perk');
// c4_state rule
fresh();S.letters=2;S.flags.p6_alicia=2;S.visited.austin=3;sc=act('austin','p6_capitol').run();chk(sc.choices[0].req()!==true,'state letter needs the file');
S.flags.p6_aliciaFile=1;chk(sc.choices[0].req()!==true,'state letter needs evidence/witness/letters too');
S.flags.c4_witness='roz';chk(sc.choices[0].req()===true,'state letter available with file + witness');sc.choices[0].fx();chk(S.flags.c4_state===1,'c4_state set');
chk(c4_votes(false)>=1,'c4_votes counts it');
// festival + ending
fresh();const e=STORY.find(x=>x.id==='p6_fest');S.week=46;S.day=5;S.slot=1;chk(!e.when(),'festival event needs promises');
Object.assign(S.flags,{p6_esperanzaFest:1,p6_carlosFest:1,p6_carlosBoat:1,p6_emilioFest:1});chk(e.when(),'festival event fires');
S.where='austin';chk(!e.when(),'not while travelling');S.where=null;
const fsc=e.run();walk(fsc,'fest');const f0=S.flags.festivalScore||0;fsc.choices[0].fx();chk((S.flags.festivalScore||0)===f0+2,'festival +2 for three helpers');walk(fsc.choices[0].next(),'fest next');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('埃尔帕索')),'ending paragraph');
console.log(bad?bad+' FAILURES':'P6 OK');`;
eval(js);
