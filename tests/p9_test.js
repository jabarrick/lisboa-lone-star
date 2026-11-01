// Dr. Gao and Tianyu Ma (story/p9.js): every stage × choice × 3 languages, gates, ride-along, ice-storm call, vote wrap, festival, ending.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const CJK=/[\\u4e00-\\u9fff\\uff08\\uff09\\u3001\\u3002]/;
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){const all=[sc.title,sc.meta,...(sc.text||[]),...((sc.choices||[]).map(c=>c.t))].filter(Boolean).map(x=>res(x,L));
 all.forEach(s=>{chk(typeof s==='string'&&!/undefined|NaN|\\[object/.test(s),path+' '+L+' bad text');if(L!=='zh')chk(!CJK.test(s),path+' '+L+' has CJK: '+s.slice(0,40));else chk(!/[A-Za-z]{2,}/.test(s.replace(/\\$\\d+/g,'')),path+' zh has Latin: '+s.slice(0,40))})}};
const fresh=()=>{S=newState('T','中');S.cash=9000;S.stats.oficio=60;S.stats.tex=60;S.stats.charme=70;['albertina','lucia','beto','p4_meiling'].forEach(k=>{if(S.npc[k]){S.npc[k].met=true;S.npc[k].trust=6}});S.week=36;S.day=3;S.slot=1;queue=[];cur=null};
const vet=EXTRA_LOCS.find(l=>l.id==='p9_vet');const gaoA=vet.acts.find(a=>a.id==='p9_gao');
const fw=CITIES.fortworth.locs.find(l=>l.id==='p9_nws');chk(!!fw,'fort worth place installed');const maA=fw.acts[0];
for(let s=0;s<3;s++){fresh();S.flags.p9_gao=s;const n=gaoA.run().choices.length;
 for(let i=0;i<n;i++){fresh();S.flags.p9_gao=s;const sc=gaoA.run();walk(sc,'gao s'+s);chk(S.flags.p9_gao===s+1,'gao advances');const c=sc.choices[i];chk(!c.req||c.req()===true,'gao s'+s+' c'+i+' req');c.fx&&c.fx();if(c.next)walk(c.next(),'gao s'+s+' c'+i)}}
fresh();S.flags.p9_gao=3;walk(gaoA.run(),'gao chat');
for(let s=0;s<3;s++){fresh();S.where='fortworth';S.visited.fortworth=5;S.flags.p9_ma=s;const n=maA.run().choices.length;
 for(let i=0;i<n;i++){fresh();S.where='fortworth';S.visited.fortworth=5;S.flags.p9_ma=s;chk(maA.req()===true,'ma s'+s+' gate open');const sc=maA.run();walk(sc,'ma s'+s);chk(S.flags.p9_ma===s+1,'ma advances');if(s<2)chk(maA.req()!==true,'ma one stage per visit');const c=sc.choices[i];chk(!c.req||c.req()===true,'ma s'+s+' c'+i+' req');c.fx&&c.fx();if(c.next)walk(c.next(),'ma s'+s+' c'+i)}}
fresh();S.flags.p9_ma=3;walk(maA.run(),'ma chat');
// gates and the ride-along
fresh();S.week=3;chk(gaoA.req()!==true,'gao gated before week 5');
fresh();const r=vet.acts.find(a=>a.id==='p9_round');chk(r.req()!==true,'ride-along needs Dr. Gao');S.npc.p9_gao.met=true;chk(r.req()===true,'ride-along open');walk(r.run(),'round');chk(r.req()!==true,'ride-along once a week');
// ice-storm call
fresh();const ice=STORY.find(x=>x.id==='p9_icewarn');S.week=28;S.day=6;S.slot=2;chk(!ice.when(),'ice call needs Tianyu');S.npc.p9_ma.met=true;chk(ice.when(),'ice call fires');
const isc=ice.run();walk(isc,'ice');const b0=S.inv.beef;isc.choices[0].fx();chk(S.inv.beef===b0+10&&S.flags.p9_icePrep,'ice prep stocks up');
// vote wrap
fresh();const v0=c4_votes(false);S.flags.p9_vetRecords=1;chk(c4_votes(false)===v0,'records alone add nothing');S.flags.evidence=1;chk(c4_votes(false)<=5,'cap 5');
// festival + ending
fresh();const e=STORY.find(x=>x.id==='p9_fest');S.week=46;S.day=6;S.slot=1;chk(!e.when(),'festival needs helpers');S.flags.p9_gaoFest=1;S.flags.p9_maFest=1;chk(e.when(),'festival fires');
const f=e.run();walk(f,'fest');const f0=S.flags.festivalScore||0;f.choices[0].fx();chk((S.flags.festivalScore||0)===f0+2,'festival +2');
chk(ENDING_EXTRA('stay').some(x=>res(x,'zh').includes('天宇')),'ending paragraph');
// rename check
chk(res(tt(NPCS.p7_xiuying.n),'zh')==='李秀英'&&NPCS.p7_xiuying.n[1]==='Xiuying Li','Li Xiuying renamed');
console.log(bad?bad+' FAILURES':'P9 OK');`;
eval(js);
