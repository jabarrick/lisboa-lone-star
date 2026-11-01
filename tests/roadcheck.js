// Road network check (needs a fresh build: python3 build.py)
//  1. every road shares at least one exact point with another road, and the whole network is connected
//  2. every city's `via` route uses existing roads, starts on a road through San Luís,
//     consecutive roads share a junction point, and the last road passes within ~0.3° of the city
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
const key=p=>p[0].toFixed(2)+','+p[1].toFixed(2);
const ids=Object.keys(ROADS),pts={};ids.forEach(r=>pts[r]=new Set(ROADS[r].pts.map(key)));
const share=(a,b)=>[...pts[a]].some(k=>pts[b].has(k));
const bad=[];
for(const r of ids)if(!ids.some(o=>o!==r&&share(r,o)))bad.push('road '+r+' touches no other road');
const seen=new Set([ids[0]]),q=[ids[0]];while(q.length){const r=q.shift();for(const o of ids)if(!seen.has(o)&&share(r,o)){seen.add(o);q.push(o)}}
if(seen.size!==ids.length)bad.push('network split: unreachable '+ids.filter(r=>!seen.has(r)).join(','));
const segD=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=dx*dx+dy*dy;let t=L?((p[0]-a[0])*dx+(p[1]-a[1])*dy)/L:0;t=Math.max(0,Math.min(1,t));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)};
const near=(p,r)=>Math.min(...ROADS[r].pts.slice(1).map((b,i)=>segD(p,ROADS[r].pts[i],b)));
const home=TX_PT.home;let n=0;
for(const c of Object.keys(CITIES)){const v=CITIES[c].via;if(!v||!v.length){bad.push('city '+c+' has no via');continue}n++;
 const miss=v.filter(r=>!ROADS[r]);if(miss.length){bad.push('city '+c+' unknown road '+miss);continue}
 if(near(home,v[0])>0.05)bad.push('city '+c+' route does not start at San Luís ('+v[0]+')');
 for(let i=1;i<v.length;i++)if(!share(v[i-1],v[i]))bad.push('city '+c+' '+v[i-1]+'→'+v[i]+' share no junction');
 const p=TX_PT[c];if(!p)bad.push('city '+c+' has no map point');else{const d=near(p,v[v.length-1]);if(d>0.3)bad.push('city '+c+' is '+d.toFixed(2)+'° from '+v[v.length-1])}}
console.log('roads',ids.length,'cities checked',n);console.log(bad.length?bad.join('\\n'):'ROADS OK');`;
eval(js);
