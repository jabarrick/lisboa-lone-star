const lang=process.argv[2];
const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'Tiago'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};
global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:k=>k.includes('lang')?lang:null,setItem(){},removeItem(){}};
let html='';const seen=new Map();
const src=require('fs').readFileSync('check.js','utf8').replace("const $=s=>document.querySelector(s);","const $=s=>{const e=el();if(s==='#app')Object.defineProperty(e,'innerHTML',{set(v){html=v;scan(v)},get(){return html}});return e};")+`
function scan(h){
 if(h.includes('\\uE000'))note('TOKEN LEFT');
 if(/undefined|NaN|\\[object/.test(h.replace(/<[^>]+>/g,' ')))note('BAD '+(h.replace(/<[^>]+>/g,' ').match(/.{30}(undefined|NaN|\\[object).{20}/)||[''])[0]);
 const txt=h.replace(/<[^>]+>/g,' ');
 if(lang==='zh'){for(const w of txt.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]{2,}(?: [A-Za-zÀ-ÿ'’-]+)*/g)||[])note('LATIN '+w)}
 if(lang!=='zh'){for(const w of txt.match(/[\\u4e00-\\u9fff]+/g)||[])note('CJK '+w)}
 if(lang==='en'){for(const w of txt.match(/\\b\\S*[ãõçáéíóúâêôà]\\S*\\b/gi)||[])note('PT? '+w)}
}
function note(k){seen.set(k,(seen.get(k)||0)+1)}
for(let run=0;run<4;run++){
S=newState('T',['浓','中','淡'][run%3]);S.menu=['polvo','francesinha','chourico','ribs','cfsteak','btaco','pecan','bolinhos'];S.inv.imp=40;S.npc.grace.met=true;queue=[];cur=null;let steps=0;
while(S&&S.week<50&&steps<6000){steps++;
 if(cur){const ok=cur.choices&&cur.choices.length?cur.choices.findIndex(c=>!c.req||c.req()===true):0;choose(Math.max(0,ok));render();continue}
 const A=actions().filter(a=>locOpen(a.loc)&&(!a.req||a.req()===true)&&S.energy>=costOf(a));
 if(!A.length){doAction(actions().find(a=>a.id==='sleep'));continue}
 doAction(A[Math.floor(Math.random()*A.length)]);render();
 if(steps%50===0){const sv=tab;for(const tb of ['shop','people','log']){tab=tb;render()}tab=sv}
}}
S=null;render();
console.log(lang,[...seen.entries()].sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+' ×'+v).join('\\n'));
`;
eval(src);
