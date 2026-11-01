// Every dish and every vehicle must have an illustration (story/v2_art.js), and the SVG must parse.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const miss=[],broken=[];
const ok=s=>s.startsWith('<svg')&&s.endsWith('</svg>')&&!/undefined|NaN/.test(s)&&(s.match(/</g)||[]).length===(s.match(/>/g)||[]).length;
for(const k in DISH){const s=dishArt(k);if(!s)miss.push('dish '+k);else if(!ok(s))broken.push('dish '+k)}
for(const k in VEHICLES){const s=carArt(k);if(!s)miss.push('car '+k);else if(!ok(s))broken.push('car '+k)}
for(const k in NPCS){const f=npcFace(k);if(!f)miss.push('face '+k);else if(!ok(f))broken.push('face '+k)}
// scenes that belong to a person get the portrait
{S=newState('T','中');const sc=talkScene('lucia');if(!sc.art)broken.push('talkScene without portrait');if(actNpc({id:'p4_carmen'})!=='p4_carmen'||actNpc({id:'p7_arc_zeke'})!=='p7_zeke'||actNpc({id:'talk-earl'})!=='earl')broken.push('actNpc mapping')}
// player look: six presets, picked before a new game, used for the player's portrait
{if(PLAYER_LOOKS.length!==12)broken.push('twelve player looks');if(PLAYER_LOOKS.some(L=>L.o.g))broken.push('no glasses on the player');pendingLook=4;const s2=newState('T','中');if(s2.look!==4)broken.push('new game keeps the picked look');S=s2;if(!ok(playerFace())||npcFace('tiago')!==playerFace())broken.push('player portrait');S.look=undefined;if(lookIdx()!==4)broken.push('old saves fall back');pendingLook=0}
console.log('dishes',Object.keys(DISH).length,'vehicles',Object.keys(VEHICLES).length,'portraits',Object.keys(NPCS).length);
if(miss.length)console.log('MISSING',miss.join(', '));if(broken.length)console.log('BROKEN',broken.join(', '));
console.log(miss.length||broken.length?'ART PROBLEMS':'ART OK');`;
eval(js);
