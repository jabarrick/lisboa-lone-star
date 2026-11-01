const fs=require('fs');
const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'Tiago'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};
global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const ROM=Object.keys(NPCS).filter(k=>NPCS[k].romance);const out={};let crashes=0;
for(let run=0;run<48;run++){const focus=ROM[run%16];
 S=newState('T',['浓','中','淡'][run%3]);S.npc.grace.met=true;queue=[];cur=null;let steps=0,last=null,sawCH5=false,sawEnd='',wed=false,child=null;
 try{while(S&&steps<20000){steps++;last=S;
  if(cur){const ti=String(res(cur.title||'','en'));if(/Ending ·/.test(ti)){sawEnd=ti;choose(0);break}
   if(S.flags.married)wed=true;if(S.flags.child)child=res(S.flags.child.name,'en');
   const cs=cur.choices||[];
   let i=cs.findIndex(c=>(!c.req||c.req()===true)&&/^Stay$/.test(res(c.t,'en')));
   if(i<0)i=cs.findIndex(c=>(!c.req||c.req()===true)&&/together|marry|propose|ring|yes/i.test(res(c.t,'en')));
   if(i<0)i=cs.findIndex(c=>(!c.req||c.req()===true)&&/true|truth|honest|sincer/i.test(res(c.t,'en')));
   if(i<0)i=cs.findIndex(c=>!c.req||c.req()===true);
   if(S.week>=49&&!sawCH5&&/Home|Lar|家/.test(String(res(cur.meta||'','en'))+res(cur.title||'','en')))sawCH5=true;
   choose(Math.max(0,i));continue}
  if(S.week>=50)break;
  const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a));
  if(!A.length){doAction(actions().find(a=>a.id==='sleep'));continue}
  const talk=A.find(a=>a.id==='talk-'+focus);const meet=A.find(a=>a.loc===NPCS[focus].loc&&['stroll','drink','train','class','work','mass','ride'].includes(a.id));const shop=A.find(a=>a.id==='host');
  doAction(talk&&Math.random()<0.5?talk:(!rel(focus).met&&meet&&Math.random()<0.5)?meet:(shop&&Math.random()<0.5?shop:A[Math.floor(Math.random()*A.length)]));
 }}catch(e){crashes++;console.log('CRASH',focus,e.stack.split('\\n').slice(0,3).join(' | '))}
 const s=S||last;const k=focus;out[k]=out[k]||[];out[k].push((s.settled===focus?'settled':'NOT')+' wed:'+(wed||!!(s.flags&&s.flags.married))+' child:'+(child||'-')+' end:'+sawEnd);
}
for(const k in out)console.log(k.padEnd(9),out[k].join(' || '));console.log('crashes',crashes);
`;
eval(js);
