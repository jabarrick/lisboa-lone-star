// Sheriff Pruitt arc (story/p3.js): drive all four events, every choice, all three languages.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const at={p3_pt1:[8,5,2],p3_pt2:[17,3,2],p3_pt3:[32,4,2],p3_pt4:[39,4,0]};
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}};
const walk=(sc,path)=>{for(const L of ['zh','en','pt']){res(sc.title,L);sc.text.forEach(x=>{const s=res(x,L);chk(typeof s==='string'&&s.length>0,path+' text '+L)})}};
const fresh=()=>{S=newState('T','中');S.cash=5000;S.stats.oficio=60;S.stats.tex=60;S.letters=12;S.npc.earl.met=true;S.npc.savannah.met=true};
// 1) every choice of every event runs (req satisfied, fx + next render)
for(const id of Object.keys(at)){const e=STORY.find(x=>x.id===id);
 const n=(()=>{fresh();Object.assign(S.flags,{ev_p3_pt1:1,ev_p3_pt2:1,p3_pt:4,p3_notebook:1});[S.week,S.day,S.slot]=at[id];return e.run().choices.length})();
 for(let i=0;i<n;i++){fresh();Object.assign(S.flags,{ev_p3_pt1:1,ev_p3_pt2:1,p3_pt:4,p3_notebook:1});[S.week,S.day,S.slot]=at[id];
  chk(e.when(),id+' when');const sc=e.run();walk(sc,id);const c=sc.choices[i];chk(!c.req||c.req()===true,id+' req '+i);
  c.fx&&c.fx();if(c.next)walk(c.next(),id+' next '+i);}
 console.log(id,'choices',n,'ok');}
// 2) the happy path wires into the council
fresh();const run=(id,i)=>{const e=STORY.find(x=>x.id===id);[S.week,S.day,S.slot]=at[id];chk(e.when(),id+' when (path)');S.flags['ev_'+id]=1;const c=e.run().choices[i];c.fx&&c.fx();c.next&&c.next()};
run('p3_pt1',0);run('p3_pt2',0);run('p3_pt3',0);run('p3_pt4',0);
console.log('path flags',JSON.stringify({pt:S.flags.p3_pt,norther:S.flags.p3_norther,nb:S.flags.p3_notebook,speak:S.flags.p3_speak,witness:S.flags.c4_witness}));
chk(S.flags.c4_witness==='pruitt','witness set');chk(c4_proof(),'c4_proof true');
const end=ENDING_EXTRA('stay');chk(end.some(x=>res(x,'zh').includes('普鲁伊特')),'ending line');
// 3) gating: pt3 needs trust >=2, pt4 needs the notebook and no travel
fresh();Object.assign(S.flags,{ev_p3_pt2:1,p3_pt:1});[S.week,S.day,S.slot]=at.p3_pt3;chk(!STORY.find(x=>x.id==='p3_pt3').when(),'pt3 gated by trust');
fresh();[S.week,S.day,S.slot]=at.p3_pt4;chk(!STORY.find(x=>x.id==='p3_pt4').when(),'pt4 gated by notebook');
// 4) deal branch of pt4
for(let i=0;i<2;i++){fresh();Object.assign(S.flags,{p3_notebook:1,p3_pt:5,travisDeal:'deal'});[S.week,S.day,S.slot]=at.p3_pt4;const sc=STORY.find(x=>x.id==='p3_pt4').run();walk(sc,'pt4 deal');chk(sc.choices.length===2,'deal choices');const c=sc.choices[i];c.fx();walk(c.next(),'pt4 deal next');chk(S.flags.p3_speak==='deal'&&!S.flags.c4_witness,'deal sets no witness')}
console.log(bad?bad+' FAILURES':'P3 OK');`;
eval(js);
