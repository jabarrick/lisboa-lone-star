const fs=require('fs');
const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'Tiago'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};
global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const fired={},ends={};let crashes=0;
const ROM=Object.keys(NPCS).filter(k=>NPCS[k].romance);
for(let run=0;run<32;run++){const focus=ROM[run%16];
 S=newState('T',['浓','中','淡'][run%3]);S.npc.grace.met=true;queue=[];cur=null;let steps=0;
 let last=null;try{while(S&&S.week<50&&steps<9000){steps++;
  last=S;if(cur){if(String(res(cur.title,'zh')).startsWith('结局'))ends[res(cur.title,'zh')]=(ends[res(cur.title,'zh')]||0)+1;
   const cs=cur.choices||[];let i=cs.findIndex(c=>(!c.req||c.req()===true)&&/true|truth|honest|sincer/i.test(res(c.t,'en')));if(i<0)i=cs.findIndex(c=>!c.req||c.req()===true);choose(Math.max(0,i));continue}
  const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a));
  if(!A.length){doAction(actions().find(a=>a.id==='sleep'));continue}
  const talk=A.find(a=>a.id==='talk-'+focus);
  const meet=A.find(a=>a.loc===NPCS[focus].loc&&['stroll','drink','train','class','work','mass','ride'].includes(a.id));
  const shop=A.find(a=>a.id==='host');
  doAction(talk&&Math.random()<0.5?talk:(!rel(focus).met&&meet&&Math.random()<0.5)?meet:(shop&&Math.random()<0.5?shop:A[Math.floor(Math.random()*A.length)]));
 }}catch(e){crashes++;console.log('CRASH',focus,S&&S.week,e.stack.split('\\n').slice(0,3).join(' | '))}
 S=S||last;console.log(focus,'like',rel(focus).like.toFixed(1),'trust',rel(focus).trust.toFixed(1),'talks',rel(focus).talks,'met',rel(focus).met,'truth',rel(focus).truth,'trustSum',Object.keys(S.npc).reduce((a,k)=>a+(S.npc[k].met?S.npc[k].trust:0),0).toFixed(0),'charm',charm(),'flirt',S.flirt);for(const k in S.flags)if(k.startsWith('ev_r'))fired[k.slice(3)]=1;
}
const all=STORY.filter(e=>/^r[EF]_/.test(e.id)).map(e=>e.id);
console.log('romance events fired',Object.keys(fired).length,'/',all.length);
console.log('missing:',all.filter(i=>!fired[i]).join(', ')||'none');
console.log('endings:',JSON.stringify(ends),'crashes',crashes);
`;
eval(js);
