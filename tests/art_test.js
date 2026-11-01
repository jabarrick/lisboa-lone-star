// Every dish and every vehicle must have an illustration (story/v2_art.js), and the SVG must parse.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const miss=[],broken=[];
const ok=s=>s.startsWith('<svg')&&s.endsWith('</svg>')&&!/undefined|NaN/.test(s)&&(s.match(/</g)||[]).length===(s.match(/>/g)||[]).length;
for(const k in DISH){const s=dishArt(k);if(!s)miss.push('dish '+k);else if(!ok(s))broken.push('dish '+k)}
for(const k in VEHICLES){const s=carArt(k);if(!s)miss.push('car '+k);else if(!ok(s))broken.push('car '+k)}
console.log('dishes',Object.keys(DISH).length,'vehicles',Object.keys(VEHICLES).length);
if(miss.length)console.log('MISSING',miss.join(', '));if(broken.length)console.log('BROKEN',broken.join(', '));
console.log(miss.length||broken.length?'ART PROBLEMS':'ART OK');`;
eval(js);
