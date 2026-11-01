// usage: node validate.js story/yourfile.js [more files]   — run from the scratchpad directory
const fs=require('fs');
const tpl=fs.readFileSync(__dirname+'/lisboa/template.html','utf8');
const files=process.argv.slice(2);
const data=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
let js=tpl.match(/<script>([\s\S]*)<\/script>/)[1].replace('/*STORY-DATA*/',()=>data);
try{new Function(js)}catch(e){console.log('SYNTAX ERROR:',e.message);process.exit(1)}
const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'Tiago'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};
global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
const ALLOW=/^(saudade|I|y'all|y’all|fixin' to|How y'all doin'|thoroughly|brisket|biscuit|food pairing|I-35|BBQ|Shiner|Bock|OK|DJ|GPS|EPA|LLC|Wi-Fi|FM)$/i;
const harness=`
const problems=[];const P=m=>{if(problems.length<60)problems.push(m)};
const myIds=STORY.slice(BASE_STORY).map(e=>e.id);
// 1) token table sanity
function checkReg(){REG.forEach((r,i)=>{if(!r)return;const [z,e,p]=r;
 if(!z||!e||!p)P('EMPTY TRANSLATION: '+JSON.stringify(r).slice(0,120));
 const cj=/[\\u4e00-\\u9fff]/;if(cj.test(e))P('CJK IN ENGLISH: '+e.slice(0,80));if(cj.test(p))P('CJK IN PORTUGUESE: '+p.slice(0,80));
 const zz=String(z).replace(/<[^>]+>/g,' ').replace(/\\$\\{[^}]*\\}/g,'');
 for(const w of zz.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]+(?: [A-Za-zÀ-ÿ'’-]+)*/g)||[]){if(!ALLOWRE.test(w)&&w.length>1)P('LATIN IN CHINESE: "'+w+'" in '+zz.slice(0,60))}
})}
// 2) walk every new event's scene tree under several states
let WALKN=0;function walk(sc,depth,path){
 if(depth===0)WALKN=0; if(!sc||depth>40||++WALKN>600)return; if(typeof sc==='function')sc=sc();
 if(!sc||typeof sc!=='object'){P('NOT A SCENE at '+path);return}
 for(const L of ['zh','en','pt']){const txt=[sc.title,sc.meta,...(sc.text||[])].map(x=>res(x==null?'':x,L)).join(' ');if(/undefined|NaN|\\[object|\\uE000/.test(txt))P('BAD TEXT ('+L+') at '+path+': '+txt.slice(0,100))}
 if(!Array.isArray(sc.text))P('text must be an array at '+path);
 (sc.choices||[]).forEach((c,i)=>{ if(!c.t)P('choice without t at '+path);
  try{if(c.req){const r=c.req();if(r!==true&&typeof r!=='string')P('req must return true or a string at '+path)}}catch(e){P('req threw at '+path+': '+e.message)}
  const snap=JSON.stringify(S);
  try{if(c.fx)c.fx();let n=c.next;if(typeof n==='function')n=n();if(n)walk(n,depth+1,path+'>'+i)}catch(e){P('choice threw at '+path+'>'+i+': '+e.message)}
  S=JSON.parse(snap);
 });
}
function freshState(variant){S=newState('Tiago',['浓','中','淡'][variant%3]);S.npc.grace.met=true;
 Object.keys(S.npc).forEach(k=>{S.npc[k].met=true;S.npc[k].like=variant*3;S.npc[k].trust=variant*3;S.npc[k].talks=variant*2});
 S.stats={charme:20+variant*25,oficio:20+variant*25,tex:10+variant*30,saud:30+variant*20};S.cash=[50,800,5000][variant];S.muscle=variant*2;
 S.fusion.unlocked=variant>0;S.settled=variant===2?'lucia':null;Object.assign(S.flags,FLAG_SAMPLES[variant]);}
const FLAG_SAMPLES=[{fair:'luso',license:false,homecoming:'charm',stormOpen:false,canneryWith:'alone',evidence:false,travisDeal:'deal',festival:false},
 {fair:'tex',license:true,homecoming:'humor',stormOpen:true,canneryWith:'beto',evidence:true,travisDeal:'expose',festival:true},
 {fair:'fusion',license:true,homecoming:'truth',stormOpen:true,canneryWith:'lucia',evidence:true,travisDeal:'expose',festival:true}];
for(let v=0;v<3;v++){for(const e of STORY.slice(BASE_STORY)){freshState(v);try{walk(e.run(),0,e.id)}catch(err){P('run() threw in '+e.id+': '+err.message)}}}
for(const id of Object.keys(ROMX)){const x=ROMX[id];if(!NPCS[id])P('ROMX unknown character '+id);else{if(!x.beats||x.beats.length!==4)P('ROMX.'+id+'.beats must have 4 entries');if(!x.epilogue)P('ROMX.'+id+' missing epilogue')}}
if(typeof ENDING_EXTRA==='function'){for(let v=0;v<3;v++){freshState(v);for(const ch of ['stay','home','austin']){try{const a=ENDING_EXTRA(ch);if(!Array.isArray(a))P('ENDING_EXTRA must return an array')}catch(e){P('ENDING_EXTRA threw: '+e.message)}}}}

// family arc checks
const PIDS=Object.keys(NPCS).filter(k=>NPCS[k].romance);
if(Object.keys(PARTNER).length){for(const id of PIDS){const x=PARTNER[id];if(!x)P('PARTNER missing '+id);else for(const k of ['yes','vow','baby','home'])if(!x[k])P('PARTNER.'+id+' missing '+k)}}
if(typeof CH5==='function'){for(const id of PIDS){for(let v=0;v<3;v++){freshState(v);S.settled=id;S.flags.married=v>0;S.flags.engaged=true;
 try{walk(CH5(()=>say(t('终','END','FIM'),t('结束。','The end.','Fim.'))),0,'CH5['+id+']')}catch(e){P('CH5 threw for '+id+': '+e.message)}}}}
if(typeof FAMILY_EXTRA==='function'){for(const id of PIDS){freshState(1);S.settled=id;S.flags.married=true;for(const ch of ['stay','home','austin']){try{if(!Array.isArray(FAMILY_EXTRA(ch)))P('FAMILY_EXTRA must return an array')}catch(e){P('FAMILY_EXTRA threw: '+e.message)}}}}

if(typeof CH5==='function'){let longest=0,ok=0;for(const id of PIDS){for(let r=0;r<12;r++){freshState(r%3);S.settled=id;S.flags.married=r%2===0;S.flags.engaged=true;
 let sc;try{sc=CH5(()=>({title:'__END__',text:[],choices:[]}));let n=0;
  while(sc&&n<200){if(typeof sc==='function')sc=sc();if(!sc)break;if(sc.title==='__END__'){ok++;break}n++;
   for(const L of ['zh','en','pt']){const txt=[sc.title,sc.meta,...(sc.text||[])].map(x=>res(x==null?'':x,L)).join(' ');if(/undefined|NaN|\\[object|\\uE000/.test(txt))P('CH5 BAD TEXT ('+L+') '+id+': '+txt.slice(0,90))}
   const cs=(sc.choices||[]).filter(c=>!c.req||c.req()===true);if(!cs.length){P('CH5 dead end (no enabled choice) for '+id+' at '+res(sc.title,'en'));break}
   const c=cs[Math.floor(Math.random()*cs.length)];if(c.fx)c.fx();let nx=c.next;if(typeof nx==='function')nx=nx();sc=nx;
   if(!sc)P('CH5 chain stops without reaching the final scene for '+id+' after '+res(c.t,'en'));}
  longest=Math.max(longest,n)}catch(e){P('CH5 random run threw for '+id+': '+e.message)}}}
 console.log('CH5 random runs reaching the end:',ok,'/',PIDS.length*12,'| longest chain:',longest,'scenes')}


// characters added by city files
const BASE_NPCS=['lucia','jolene','savannah','clara','hannah','brooke','megan','colleen','wade','ashley','ines','roz','kyle','delphine','grace','maya','earl','albertina','dale','travis','beto','marisol'];
for(const k of Object.keys(NPCS)){if(BASE_NPCS.includes(k))continue;const n=NPCS[k];
 for(const f of ['n','s','p','role'])if(!Array.isArray(n[f])||n[f].length!==3||n[f].some(x=>!x))P('NPC '+k+' needs '+f+' as [zh,en,pt]');
 if(!n.loc||!(CITIES[n.loc]||['shop','main','bar','gym','ranch','college','church'].includes(n.loc)))P('NPC '+k+' loc must be a city id: '+n.loc);
 if(n.beats||n.romance||n.meet)P('NPC '+k+' must not have beats/romance/meet');
 if(/[A-Za-z]/.test(n.n[0])||/[A-Za-z]/.test(n.s[0])||/[A-Za-z]/.test(n.role[0]))P('NPC '+k+' Chinese name/role contains Latin letters');}
// travel checks
for(const id of Object.keys(CITIES)){const c=CITIES[id];
 if(c.via&&(!Array.isArray(c.via)||c.via.some(k=>!ROADS[k])))P('CITY '+id+' via must list keys of ROADS: '+JSON.stringify(c.via));
 if(!TX_PT[id])P('CITY '+id+' has no map position in TX_PT (ask the coordinator)');
 if(!c.n||typeof c.miles!=='number'||!c.desc||!Array.isArray(c.locs)||!c.locs.length||!['day','overnight'].includes(c.trip))P('CITY '+id+' needs n, miles (number), trip (day|overnight), desc, locs');
 for(const L of c.locs||[]){if(!L.id||!L.n||!Array.isArray(L.acts)||!L.acts.length)P('CITY '+id+' loc needs id, n, acts');
  for(const a of L.acts||[]){if(!a.id||!a.n||typeof a.cost!=='number'||typeof a.run!=='function')P('CITY '+id+'/'+L.id+' act needs id, n, cost (number), run');
   for(let v=0;v<3;v++){freshState(v);S.where=id;try{if(a.req){const r=a.req();if(r!==true&&typeof r!=='string')P('req must return true or a string: '+id+'/'+a.id)}walk(a.run(),0,'city:'+id+'/'+L.id+'/'+a.id)}catch(e){P('city act threw '+id+'/'+a.id+': '+e.message)}}}}
 if(c.arrive){freshState(1);S.where=id;try{const x=c.arrive();if(!Array.isArray(x))P('arrive() must return an array: '+id)}catch(e){P('arrive threw '+id+': '+e.message)}}
}
for(const L of EXTRA_LOCS){if(!L.id||!L.n||!Array.isArray(L.acts))P('EXTRA_LOC needs id, n, acts');for(const a of L.acts||[]){for(let v=0;v<3;v++){freshState(v);try{if(L.open)L.open();if(a.req)a.req();walk(a.run(),0,'home:'+L.id+'/'+a.id)}catch(e){P('home act threw '+L.id+'/'+a.id+': '+e.message)}}}}
for(const e of ROAD_EVENTS){for(const id of Object.keys(CITIES)){freshState(1);try{if(!e.cond||e.cond(CITIES[id]))walk(e.run(CITIES[id]),0,'road:'+(e.id||'?'))}catch(err){P('road event threw '+(e.id||'?')+': '+err.message)}}}
console.log('cities:',Object.keys(CITIES).length,'| city locations:',Object.values(CITIES).reduce((a,c)=>a+(c.locs||[]).length,0),'| city actions:',Object.values(CITIES).reduce((a,c)=>a+(c.locs||[]).reduce((b,L)=>b+L.acts.length,0),0),'| home extra locations:',EXTRA_LOCS.length,'| road events:',ROAD_EVENTS.length);
// 3) when() must not throw
for(let v=0;v<3;v++){freshState(v);for(const e of STORY.slice(BASE_STORY)){try{const w=e.when();if(typeof w!=='boolean')P('when() should return a boolean in '+e.id)}catch(err){P('when() threw in '+e.id+': '+err.message)}}}
// 4) random full-year playthroughs
let fired=new Set();
for(let run=0;run<6;run++){S=newState('T',['浓','中','淡'][run%3]);S.npc.grace.met=true;queue=[];cur=null;let steps=0;
 try{while(S&&S.week<50&&steps<8000){steps++;
  for(const id of myIds)if(S.flags['ev_'+id])fired.add(id);
  if(cur){const ok=cur.choices&&cur.choices.length?cur.choices.findIndex(c=>!c.req||c.req()===true):0;choose(Math.max(0,run%2?ok:Math.max(ok,(cur.choices||[]).length-1)));if(cur&&cur.choices&&cur.choices.length&&cur.choices.every(c=>c.req&&c.req()!==true))choose(0);continue}
  if(!S.where&&S.slot<=1&&Object.keys(CITIES).length&&Math.random()<0.08){const ids=Object.keys(CITIES);goTrip(pick(ids),null);continue}
  const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a));
  if(!A.length){const sl=actions().find(a=>a.id==='sleep')||actions().find(a=>a.id==='home');if(sl)doAction(sl);else{S.energy=10;}continue}
  doAction(A[Math.floor(Math.random()*A.length)]);}}catch(e){P('PLAYTHROUGH CRASH week '+(S&&S.week)+': '+e.stack.split('\\n').slice(0,3).join(' | '))}}
checkReg();
const never=myIds.filter(id=>!fired.has(id));
const zh=STORY.slice(BASE_STORY).length;
console.log('events in your file(s):',myIds.length,'| ROMX characters:',Object.keys(ROMX).length);
console.log('never fired in 6 random playthroughs (fine for rare/conditional ones, suspicious if many):',never.join(', ')||'none');
console.log(problems.length?'PROBLEMS:\\n- '+problems.join('\\n- '):'NO PROBLEMS FOUND');
`;
js=js.replace("/*STORY-DATA*/","").replace("render();\n","");
const final=js.replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'')+'\n'+harness;
const pre=`const BASE_STORY=0;const ALLOWRE=${ALLOW};`;
const zhCount=(data.match(/[一-鿿]/g)||[]).length;
console.log('Chinese characters in your file(s):',zhCount);
eval(pre+final);
