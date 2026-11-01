const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`S=newState('T','中');Object.assign(S.flags,{tx4_ledger:1,tx6_dempsey:1,tx6_water:1,tx5_rig:1,tx6_ettaFest:1,tx5_quimFest:1,tx6_crate:1,tx4_wesSong:'jose'});S.perks.beef=0.75;
for(const id of ['tx7_council','tx7_friends']){const e=STORY.find(x=>x.id===id);S.week=id==='tx7_council'?39:47;S.day=id==='tx7_council'?3:6;S.slot=id==='tx7_council'?2:0;
 console.log(id,'when',e.when());const sc=e.run();for(const L of ['zh','en','pt'])console.log(' ',L,res(sc.title,L),'|',res(sc.text[1],L).slice(0,60));const c=sc.choices[0];c.fx();}
console.log('witness',S.flags.c4_witness,'festivalScore',S.flags.festivalScore,'rep',Math.round(S.rep));`;
eval(js);
