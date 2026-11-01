/* ===== v2 · illustrations: every dish and every vehicle as small inline SVG (no image files, single-file friendly) =====
 dishArt(k) → <svg> for DISH[k];  carArt(k) → <svg> for VEHICLES[k].  Both return '' for unknown ids.
 Flat style in the game's palette (azulejo blue, rust, cream). Decorative: aria-hidden, the name is always printed next to them.
*/
const ART=(function(){
const svg=(vb,inner,cls)=>`<svg class="art ${cls}" viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;
const a=o=>Object.entries(o||{}).map(([k,v])=>`${k.replace(/_/g,'-')}="${v}"`).join(' ');
const E=(cx,cy,rx,ry,f,o)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${a(o)}/>`;
const C=(cx,cy,r,f,o)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${a(o)}/>`;
const R=(x,y,w,h,f,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${a(o)}/>`;
const P=(d,f,o)=>`<path d="${d}" fill="${f}" ${a(o)}/>`;
const L=(d,s,w,o)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${w||1.5}" stroke-linecap="round" ${a(o)}/>`;
const K={plate:'#fbf7ee',rim:'#2c5aa0',rim2:'#d9e2f0',wood:'#b9824a',woodD:'#8a5a2e',terra:'#c0643a',terraD:'#93462a',bread:'#e3aa5c',breadD:'#b97a35',meat:'#7a3b22',meatL:'#9c5332',pink:'#cf7b68',green:'#5f8f3e',greenD:'#3f6e32',yellow:'#f2c94c',cream:'#f4e6c4',red:'#b8322a',orange:'#e07b2e',iron:'#2e2e30',ironL:'#47474a',steel:'#a7b0ba',white:'#ffffff',egg:'#f6b81c',choc:'#5a3018'};
/* ---- dish kit ---- */
const plate=()=>E(60,60,52,23,K.plate,{stroke:K.rim,stroke_width:2})+E(60,60,41,17,'none',{stroke:K.rim2,stroke_width:1.5});
const bowl=(soup,side)=>P('M12 50 Q14 84 60 86 Q106 84 108 50 Z',side||K.plate,{stroke:K.rim,stroke_width:2})+E(60,50,48,12,soup,{stroke:K.rim,stroke_width:2})+L('M24 70 Q60 80 96 70',K.rim2,1.5);
const pot=(inside)=>P('M14 46 Q16 82 60 84 Q104 82 106 46 Z',K.terra,{stroke:K.terraD,stroke_width:2})+E(60,46,46,12,inside,{stroke:K.terraD,stroke_width:2})+R(4,46,12,5,K.terraD,{rx:2})+R(104,46,12,5,K.terraD,{rx:2});
const skillet=(inside)=>R(100,54,22,6,K.iron,{rx:3,transform:'rotate(-12 100 57)'})+E(58,58,48,22,K.iron)+E(58,56,42,18,inside||K.ironL);
const board=()=>P('M8 66 Q8 58 16 57 L104 50 Q112 50 112 58 L112 64 Q112 70 104 71 L16 78 Q8 78 8 72 Z',K.wood,{stroke:K.woodD,stroke_width:1.5})+L('M20 70 L100 63 M24 74 L90 68',K.woodD,1,{opacity:.5});
const steam=(x)=>L(`M${x} 30 q-5 -6 0 -12 q5 -6 0 -12 M${x+10} 32 q-5 -6 0 -12 q5 -6 0 -12`,'#b8c3cf',1.6,{opacity:.8});
const grill=(x1,y1,x2,y2,n,col)=>{let s='';for(let i=0;i<n;i++){const t=(i+1)/(n+1),x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;s+=L(`M${x-3} ${y-5} L${x+3} ${y+5}`,col||K.iron,1.6,{opacity:.7})}return s};
const sardine=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})">${P('M-24 0 Q-6 -8 16 -3 L26 -8 L23 0 L26 8 L16 3 Q-6 8 -24 0 Z','#8e9aa6',{stroke:'#5d6874',stroke_width:1})}${P('M-24 0 Q-6 -8 16 -3 L16 0 L-24 0 Z','#c2ccd5',{opacity:.6})}${C(-18,-1,1.6,K.iron)}${grill(-14,0,12,0,4)}</g>`;
const lemon=(x,y)=>P(`M${x} ${y} l14 -6 a15 15 0 0 1 -6 14 Z`,K.yellow,{stroke:'#d9a92a',stroke_width:1});
const parsley=(x,y)=>C(x,y,3,K.green)+C(x+4,y-2,2.6,K.greenD)+C(x+3,y+3,2.4,K.green);
const bun=(x,y,w,fill,fill2)=>R(x,y+10,w,8,K.bread,{rx:4})+R(x-2,y+5,w+4,6,fill,{rx:3})+(fill2?R(x+2,y+3,w-4,4,fill2,{rx:2}):'')+P(`M${x-1} ${y+4} Q${x+w/2} ${y-16} ${x+w+1} ${y+4} Z`,K.bread,{stroke:K.breadD,stroke_width:1.2})+C(x+w*0.35,y-4,1,K.cream)+C(x+w*0.6,y-6,1,K.cream)+C(x+w*0.5,y-2,1,K.cream);
const tart=(x,y,r,top)=>E(x,y,r,r*0.62,K.breadD)+E(x,y-1,r*0.8,r*0.48,K.yellow)+C(x-r*0.25,y-2,r*0.18,top||'#7a3a12',{opacity:.8})+C(x+r*0.3,y,r*0.14,top||'#7a3a12',{opacity:.7})+C(x+r*0.05,y-r*0.3,r*0.1,top||'#7a3a12',{opacity:.6});
const tortilla=(x,y,w)=>E(x,y,w,w*0.38,'#efd9a6',{stroke:'#c9a96a',stroke_width:1})+C(x-w*0.4,y,1.4,'#c9a96a')+C(x+w*0.3,y-2,1.4,'#c9a96a');
const steak=(x,y,w,col)=>P(`M${x} ${y} q${w*0.2} -${w*0.35} ${w*0.6} -${w*0.3} q${w*0.45} ${w*0.05} ${w*0.4} ${w*0.35} q-${w*0.1} ${w*0.3} -${w*0.55} ${w*0.28} q-${w*0.5} 0 -${w*0.45} -${w*0.33} Z`,col||'#c68a45',{stroke:'#8a5a24',stroke_width:1.2});
const gravy=(x,y,w)=>P(`M${x} ${y} q${w*0.3} -${w*0.2} ${w*0.6} 0 q${w*0.2} ${w*0.12} 0 ${w*0.2} q-${w*0.35} ${w*0.12} -${w*0.6} 0 Z`,'#f3ecdc',{stroke:'#ddd2bc',stroke_width:1})+C(x+w*0.2,y+2,1,'#5b5b5b')+C(x+w*0.45,y+4,1,'#5b5b5b');
const mash=(x,y)=>P(`M${x-14} ${y+6} q2 -12 14 -14 q12 2 14 14 Z`,'#f6efd8',{stroke:'#e1d5b5',stroke_width:1})+C(x,y-2,3,K.yellow);
const beans=(x,y,w)=>{let s='';for(let i=0;i<5;i++)s+=E(x+i*w/5,y+(i%2)*3,3,2,'#6b4a2b',{transform:`rotate(${i*30} ${x+i*w/5} ${y})`});return s};
const DISHES={
 sardinhas:()=>plate()+sardine(52,52,-6)+sardine(58,61,-3)+sardine(64,70,0)+lemon(88,62)+parsley(30,66),
 bifana:()=>plate()+bun(36,44,48,'#a5683a','#f2c94c')+L('M40 50 q8 3 16 0 q8 -3 16 0 q6 2 10 0',K.yellow,2),
 bacalhau:()=>R(18,38,84,40,K.terra,{rx:8,stroke:K.terraD,stroke_width:2})+R(24,42,72,30,'#f0d48a',{rx:6})+C(40,52,5,'#c98a2c',{opacity:.7})+C(62,60,6,'#c98a2c',{opacity:.6})+C(80,50,4,'#c98a2c',{opacity:.7})+C(52,64,3,'#a86a1c',{opacity:.6})+parsley(70,48),
 caldo:()=>bowl('#6f9a3e')+L('M32 48 q6 -4 12 0 M58 52 q6 -4 12 0 M76 46 q5 -3 10 0',K.greenD,2)+C(46,52,4.5,K.red,{stroke:'#7d1d18',stroke_width:1})+C(68,47,4.5,K.red,{stroke:'#7d1d18',stroke_width:1})+C(86,52,4,K.red,{stroke:'#7d1d18',stroke_width:1})+steam(52),
 nata:()=>plate()+tart(40,58,13)+tart(66,54,13)+tart(78,68,12)+C(30,48,1,'#7a5a3a')+C(34,46,1,'#7a5a3a'),
 brisket:()=>board()+[0,1,2,3].map(i=>`<g transform="translate(${26+i*18} ${56-i*1.6}) rotate(-6)">${R(0,0,15,18,K.pink,{rx:2})}${R(0,0,15,4,K.choc,{rx:2})}${R(0,14,15,4,'#3a1e10',{rx:2})}${L('M2 6 L13 6',K.red,1,{opacity:.4})}</g>`).join('')+parsley(98,58),
 chili:()=>bowl('#8c2f1c')+beans(36,50,40)+L('M44 46 l6 2 M60 44 l6 3 M70 50 l5 1',K.yellow,2)+P('M86 40 q10 -6 14 4 q-2 4 -6 2 q-2 -4 -8 -6 Z',K.red)+L('M86 40 l-3 -4',K.green,2),
 cornbread:()=>skillet('#e9b949')+L('M30 56 L86 56 M58 40 L58 72',K.breadD,2)+C(42,48,1.5,'#c98a2c')+C(72,64,1.5,'#c98a2c')+R(46,42,10,6,'#fff3c4',{rx:2,opacity:.9}),
 coffee:()=>E(60,72,40,10,K.plate,{stroke:K.rim,stroke_width:2})+P('M36 40 L84 40 L80 70 Q60 76 40 70 Z',K.white,{stroke:K.rim,stroke_width:2})+E(60,40,24,5,'#5a3018')+L('M84 46 q12 2 8 14 q-2 6 -10 6',K.rim,3)+steam(52),
 polvo:()=>plate()+L('M36 58 q4 -18 22 -14 q16 4 10 16 q-6 8 -14 2 q-4 -4 2 -6',K.terraD,8,{stroke_linecap:'round'})+L('M36 58 q4 -18 22 -14 q16 4 10 16 q-6 8 -14 2 q-4 -4 2 -6',K.pink,5)+E(82,62,7,5,'#e9c36a')+E(30,68,6,4.5,'#e9c36a')+C(50,70,1.6,'#d9b52a')+C(70,72,1.6,'#d9b52a')+C(62,66,1.3,'#d9b52a')+parsley(88,52),
 francesinha:()=>plate()+R(34,44,52,22,'#e3aa5c',{rx:3})+P('M30 50 Q60 30 90 50 L94 66 Q60 76 26 66 Z',K.orange,{opacity:.95})+E(60,46,11,7,K.white)+C(60,46,4.5,K.egg)+R(84,62,3,14,'#f2c94c',{transform:'rotate(20 84 62)'})+R(90,60,3,14,'#f2c94c',{transform:'rotate(-10 90 60)'})+R(26,62,3,13,'#f2c94c',{transform:'rotate(-25 26 62)'}),
 chourico:()=>R(22,52,76,24,K.terra,{rx:10,stroke:K.terraD,stroke_width:2})+R(28,42,64,12,K.terraD,{rx:4})+L('M34 44 L86 44 M34 48 L86 48',K.iron,1,{opacity:.5})+P('M30 44 Q60 30 90 42 Q92 46 88 47 Q60 38 32 49 Z',K.red,{stroke:'#7d1d18',stroke_width:1.2})+P('M44 40 q-4 -10 2 -16 q0 8 6 10 q2 -8 8 -12 q-2 10 4 16 Z','#f39b2a',{opacity:.9})+P('M50 40 q-1 -6 3 -9 q0 5 3 6 q1 -4 4 -6 q-1 6 2 9 Z',K.yellow),
 marisco:()=>pot('#e6873c')+P('M34 46 q6 -8 12 -2 q-2 6 -12 2 Z','#f2a48a',{stroke:'#d0664a',stroke_width:1})+P('M64 42 q6 -8 12 -2 q-2 6 -12 2 Z','#f2a48a',{stroke:'#d0664a',stroke_width:1})+E(52,52,6,3.5,'#2b2d3a',{transform:'rotate(-20 52 52)'})+E(80,52,6,3.5,'#2b2d3a',{transform:'rotate(15 80 52)'})+C(44,54,3,'#efe2c8')+C(70,54,3,'#efe2c8')+parsley(58,46)+steam(54),
 bolinhos:()=>plate()+[[40,56],[58,52],[76,58],[56,68]].map(([x,y])=>E(x,y,10,6.5,'#d79a43',{stroke:'#a8692a',stroke_width:1.2})+C(x-3,y-1,1,'#a8692a')+C(x+3,y+2,1,'#a8692a')).join('')+lemon(82,66)+parsley(30,68),
 paodeus:()=>plate()+E(60,58,26,15,K.bread,{stroke:K.breadD,stroke_width:1.5})+E(60,52,22,10,'#fbf3df')+[...Array(14)].map((_,i)=>C(42+(i*7)%36,47+(i*5)%10,1,'#e6d3a8')).join(''),
 ribs:()=>board()+R(22,46,72,22,'#6d2d18',{rx:6})+R(22,46,72,6,'#3a1a0c',{rx:3})+[0,1,2,3,4,5].map(i=>R(26+i*12,40,4,30,'#efe3c6',{rx:2})+L(`M${32+i*12} 50 L${32+i*12} 66`,'#4a1f0e',1.2,{opacity:.6})).join(''),
 cfsteak:()=>plate()+steak(30,64,44)+gravy(34,52,30)+mash(84,60),
 btaco:()=>plate()+P('M28 64 Q60 18 92 64 Z','#efd9a6',{stroke:'#c9a96a',stroke_width:1.5})+P('M36 60 Q60 34 84 60 Z','#f6d24a')+L('M44 54 q8 -4 16 0 q8 4 16 0',K.red,3)+C(50,58,2.2,K.green)+C(66,56,2.2,K.green),
 pecan:()=>plate()+P('M30 64 L88 56 L92 66 L34 74 Z',K.breadD)+P('M30 64 L88 56 L80 44 Q50 40 30 64 Z','#6b3416',{stroke:'#4a210c',stroke_width:1})+[[46,56],[58,52],[70,52],[62,60],[50,62]].map(([x,y])=>E(x,y,4,2.5,'#9a5b2a',{stroke:'#4a210c',stroke_width:.8})).join('')+P('M86 46 q6 -6 10 0 q-4 4 -10 0 Z',K.white),
 bbifana:()=>plate()+bun(34,44,52,K.pink,K.choc)+L('M38 49 q10 2 20 0 q10 -2 22 0',K.red,1.5,{opacity:.6}),
 pnata:()=>plate()+tart(42,60,13)+tart(70,56,13)+[[42,56],[70,52]].map(([x,y])=>C(x,y,4,'#4f8a2c',{stroke:'#2f5a18',stroke_width:1})+C(x,y,1.6,'#d9e8b0')).join(''),
 p1_alcatra:()=>pot('#6e2a18')+[[40,48],[54,44],[68,48],[80,45],[60,52]].map(([x,y])=>R(x-5,y-4,10,8,K.meatL,{rx:2,stroke:K.meat,stroke_width:1})).join('')+L('M30 44 q4 -2 8 0',K.green,2)+steam(50),
 cobbler:()=>skillet('#e98a3a')+[[38,52],[56,46],[72,56],[50,62],[80,48]].map(([x,y])=>E(x,y,7,4,'#f3c27a',{stroke:'#c98a3a',stroke_width:1})).join('')+C(64,54,3,'#ffd38a')+C(44,46,2.5,'#ffd38a'),
 puffytaco:()=>plate()+P('M28 62 Q30 26 60 28 Q90 26 92 62 Q60 50 28 62 Z','#e7b55e',{stroke:'#b8832e',stroke_width:1.5})+P('M36 52 Q60 40 84 52 Q60 46 36 52 Z','#7a3b22')+L('M40 48 q6 -4 12 0 q6 4 12 0 q6 -4 12 0',K.green,3)+C(52,44,2,K.red)+C(68,44,2,K.red),
 gpotato:()=>bowl('#f0dfa8',K.plate)+[[36,48],[52,46],[68,50],[84,47],[60,53],[44,53]].map(([x,y])=>E(x,y,7,4,'#f6e7b4',{stroke:'#d9c27a',stroke_width:1})).join('')+R(48,44,8,3,'#a33f2a',{rx:1})+R(72,46,8,3,'#a33f2a',{rx:1})+L('M40 44 l3 -2 M64 44 l3 -2 M80 50 l3 -2',K.green,1.6),
 kolache:()=>plate()+[[40,58,'#6a2d6e'],[64,52,'#c0392b'],[78,66,'#e2a12a']].map(([x,y,f])=>E(x,y,13,8,K.bread,{stroke:K.breadD,stroke_width:1.2})+E(x,y-1,6,3.6,f)).join(''),
 gshrimp:()=>plate()+L('M18 66 L102 50',K.woodD,2)+[30,48,66,84].map((x,i)=>`<g transform="translate(${x} ${63-i*4.2})">${P('M-8 0 q0 -9 9 -9 q8 0 8 7 q-1 6 -7 6 q-4 0 -4 -4',  '#f08a5d',{stroke:'#c55a30',stroke_width:1.2})}${grill(-6,-4,6,-4,2)}</g>`).join('')+lemon(84,66),
 chilecol:()=>bowl('#7c1f12')+[[40,48],[56,52],[72,47],[84,52]].map(([x,y])=>R(x-4,y-3,8,6,K.meatL,{rx:2})).join('')+P('M88 38 q10 -6 14 4 q-2 4 -6 2 q-2 -4 -8 -6 Z','#8d1c12')+tortilla(22,40,10),
 tx4_ench:()=>plate()+[0,1,2].map(i=>E(60,64-i*6,32,10,'#efd9a6',{stroke:'#c9a96a',stroke_width:1})).join('')+E(60,52,32,10,'#a92b1c',{opacity:.9})+L('M40 52 l5 1 M58 48 l6 2 M74 54 l4 -1',K.yellow,2)+E(60,48,10,6,K.white)+C(60,48,4,K.egg),
 tx4_cfs:()=>plate()+steak(26,62,50,'#cf9450')+gravy(28,50,44)+C(86,56,4,'#4f8a2c')+C(92,62,4,'#4f8a2c'),
 fajita:()=>skillet()+[...Array(9)].map((_,i)=>L(`M${30+i*6} ${48+(i%3)*5} l10 4`,['#c0392b','#e2a12a','#4f8a2c','#7a3b22','#f3e7c9'][i%5],3.2)).join('')+steam(48)+tortilla(96,30,12),
 chopbeef:()=>plate()+bun(34,44,52,'#6e2a14','#b8322a')+[...Array(6)].map((_,i)=>C(40+i*8,49+(i%2),1.6,'#3a1408')).join(''),
 catfish:()=>plate()+P('M28 60 q20 -14 44 -6 q-10 14 -44 6 Z','#d4953f',{stroke:'#a8692a',stroke_width:1.2})+P('M40 70 q20 -12 40 -4 q-10 12 -40 4 Z','#d4953f',{stroke:'#a8692a',stroke_width:1.2})+C(86,54,5,'#c98a3a')+C(92,62,5,'#c98a3a')+lemon(80,68),
 tx8_betty:()=>plate()+steak(28,64,46,'#c68a45')+gravy(30,52,40)+L('M80 54 l12 -6 M82 60 l12 -6 M84 66 l12 -6',K.green,3),
 pandecampo:()=>skillet()+E(58,56,36,15,'#e8c07a',{stroke:'#c4924a',stroke_width:1.2})+L('M40 52 l8 6 M54 50 l8 6 M68 50 l8 6',K.breadD,1.5)+C(48,60,1.3,'#b8823a')+C(70,60,1.3,'#b8823a'),
 boudin:()=>plate()+L('M34 62 q-6 -16 12 -18 q22 -2 28 10 q4 12 -14 14 q-14 0 -10 -8',K.terraD,10)+L('M34 62 q-6 -16 12 -18 q22 -2 28 10 q4 12 -14 14 q-14 0 -10 -8',K.terra,7)+R(82,56,12,9,'#f2dca0',{rx:1})+R(86,62,12,9,'#f2dca0',{rx:1}),
 p4_concha:()=>plate()+[[40,58,'#f3b6c4'],[68,54,'#f6d27a'],[78,68,'#f3b6c4']].map(([x,y,f])=>E(x,y+3,15,8,'#d9a35a',{stroke:K.breadD,stroke_width:1.2})+P(`M${x-14} ${y+1} Q${x} ${y-14} ${x+14} ${y+1} Q${x} ${y+5} ${x-14} ${y+1} Z`,f,{stroke:'rgba(0,0,0,.18)',stroke_width:1})+L(`M${x-9} ${y-1} Q${x} ${y-9} ${x+9} ${y-1} M${x-5} ${y+1} Q${x} ${y-12} ${x+5} ${y+1} M${x} ${y+2} L${x} ${y-9}`,'rgba(120,70,40,.45)',1)).join(''),
 p4_gulao:()=>plate()+[[40,56],[52,50],[64,56],[76,52],[58,64],[46,64],[72,64]].map(([x,y])=>E(x,y,7,5.5,'#c9452a',{stroke:'#8a2a16',stroke_width:1})+C(x-2,y-2,1.6,'rgba(255,255,255,.45)')).join('')+[[56,57],[70,58]].map(([x,y])=>R(x-4,y-3,8,6,'#f2cf4a',{rx:1.5,stroke:'#c9a22a',stroke_width:.8})).join('')+L('M36 62 l8 -3 M80 58 l8 -3 M62 46 l8 2',K.green,3)+C(84,64,1.2,K.white)+C(36,52,1.2,K.white),
 barbacoa:()=>plate()+tortilla(46,58,20)+tortilla(76,64,18)+[...Array(10)].map((_,i)=>L(`M${36+i*4} ${54+(i%3)*2} l6 3`,K.meatL,2.4)).join('')+C(44,52,2,K.white)+C(52,56,2,K.white)+C(48,58,1.8,K.green)+P('M84 48 a8 8 0 0 1 12 6 Z','#7fb24a',{stroke:'#4f8a2c',stroke_width:1})
};
function dishArt(k,cls){const f=DISHES[k];return f?svg('0 0 120 90',f(),'art-dish '+(cls||'')):''}

/* ---- vehicles: three-quarter view from above-front-left. Each body part is a side profile (x along the car, z up)
   extruded across the width (y), projected with a fixed axonometric camera; faces are culled and shaded by their normal. ---- */
const PX=[0.86,0.31],PY=[0.6,-0.36],PZ=[0,-1];
const pj=(x,y,z)=>[x*PX[0]+y*PY[0]+z*PZ[0],x*PX[1]+y*PY[1]+z*PZ[1]];
const hex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const shade=(h,k)=>{const c=hex(h);return 'rgb('+c.map(v=>Math.round(k>=0?v+(255-v)*k:v*(1+k))).join(',')+')'};
const area=p=>{let s=0;for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];s+=a[0]*b[1]-b[0]*a[1]}return s/2};
const pts=p=>p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
const OUT='rgba(20,22,28,.55)';
const poly=(p3,fill,o)=>`<polygon points="${pts(p3.map(q=>pj(...q)))}" fill="${fill}" ${a(Object.assign({stroke:OUT,stroke_width:.3,stroke_linejoin:'round'},o||{}))}/>`;
const line3=(p3,stroke,w,o)=>`<polyline points="${pts(p3.map(q=>pj(...q)))}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${a(o)}/>`;
// direction towards the camera = the vector that projects to a point, sign chosen so the near side (−y) faces it
const CAMX=(PY[0]/PX[0]),CAMZ=-((PX[1]*(-PY[0]/PX[0]))+PY[1]);
// prism: profile [[x,z],...] (any winding), y0 near side, y1 far side. edge: {i: fill} overrides (e.g. glass), shades by normal
function prism(prof,y0,y1,col,o){o=o||{};let P=prof.slice();const m=P.length;let E=o.edge||{};
 if(area(P.map(([x,z])=>[x,-z]))<0){P.reverse();const E2={};for(const k in E)E2[(m-2-(+k)+m)%m]=E[k];E=E2} // counter-clockwise in (x,z); edge i of the original is edge m-2-i after reversing
 const n=P.length,OS=area(P)>0?1:-1;const faces=[];
 const near=P.map(([x,z])=>[x,y0,z]);
 for(let i=0;i<n;i++){const A=P[i],B=P[(i+1)%n];const quad=[[A[0],y0,A[1]],[B[0],y0,B[1]],[B[0],y1,B[1]],[A[0],y1,A[1]]];
  let nx=(B[1]-A[1])*OS,nz=-(B[0]-A[0])*OS;const l=Math.hypot(nx,nz)||1;nx/=l;nz/=l; // outward normal from the winding
  if(CAMX*nx+CAMZ*nz<=0.02)continue; // back-facing
  const base=E[i]||col;const k=0.26*Math.max(0,nz)-0.16*Math.max(0,nx)-0.3*Math.max(0,-nz)+0.04*Math.max(0,-nx);
  faces.push(poly(quad,shade(base,k)));
  const at=(u,v)=>[A[0]+(B[0]-A[0])*u,y0+(y1-y0)*v,A[1]+(B[1]-A[1])*u];
  if(base===GL)faces.push(poly([at(0.12,0.62),at(0.88,0.4),at(0.88,0.5),at(0.12,0.72)],'rgba(255,255,255,.38)',{stroke:'none'})+poly([at(0.15,0.8),at(0.85,0.6),at(0.85,0.64),at(0.15,0.84)],'rgba(255,255,255,.28)',{stroke:'none'}));
  else if(nz>0.85&&Math.hypot(B[0]-A[0],B[1]-A[1])>4)faces.push(poly([at(0.04,0.06),at(0.96,0.06),at(0.96,0.2),at(0.04,0.2)],'rgba(255,255,255,.13)',{stroke:'none'}))}
 return faces.join('')+poly(near,shade(o.side||col,o.sideK||0))}
const ring=(x,y,z,r,n)=>[...Array(n||28)].map((_,i)=>{const t=i/(n||28)*Math.PI*2;return [x+r*Math.cos(t),y,z+r*Math.sin(t)]});
function hull(p){p=p.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const c=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];
 for(const q of p){while(lo.length>=2&&c(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q)}for(const q of p.slice().reverse()){while(up.length>=2&&c(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q)}return lo.slice(0,-1).concat(up.slice(0,-1))}
// a wheel: tyre band + sidewall + rim + hub; y = outer face, tw = tyre width (towards +y)
function wheel3(x,z,r,y,tw,o){o=o||{};const A=ring(x,y,z,r),B=ring(x,y+tw,z,r);const band=hull(A.concat(B).map(q=>pj(...q)));
 const rim=o.rim||'#c9ced4';
 return `<polygon points="${pts(band)}" fill="#1c1d21"/>`+poly(A,'#2a2b30',{stroke:'#111',stroke_width:.3})+(o.white?poly(ring(x,y-0.02,z,r*0.8),'#f1efe8',{stroke:'none'}):'')
  +poly(ring(x,y-0.04,z,r*0.6),rim,{stroke:'rgba(0,0,0,.4)'})+poly(ring(x,y-0.06,z,r*0.6*0.72),shade(rim,-0.18),{stroke:'none'})
  +(o.spokes?[...Array(5)].map((_,i)=>{const t=i/5*Math.PI*2;return line3([[x,y-0.07,z],[x+r*0.55*Math.cos(t),y-0.07,z+r*0.55*Math.sin(t)]],shade(rim,0.25),0.6)}).join(''):'')
  +poly(ring(x,y-0.08,z,r*0.16,12),shade(rim,-0.35),{stroke:'none'})}
const arch=(x,z,r,y)=>poly([...Array(15)].map((_,i)=>{const t=Math.PI*i/14;return [x+r*Math.cos(t),y-0.01,z+r*Math.sin(t)]}),'#17181c',{stroke:'none'});
const shadow3=(L,W,s)=>`<polygon points="${pts([[-1.5,-1.5,0],[L+2.5,-1.5,0],[L+2.5,W+1.5,0],[-1.5,W+1.5,0]].map(q=>pj(...q)))}" fill="rgba(0,0,0,${s||.2})" filter="url(#artblur)"/>`;
const GL='#9ec4df',GLD='#6f97b6';
// glass panel set into the near side of a cabin profile: quad given as 4 [x,z]
const win=(q,y,col)=>poly(q.map(([x,z])=>[x,y-0.03,z]),col||GL,{stroke:'rgba(20,22,28,.6)',stroke_width:.35})+line3([[q[0][0]+0.6,y-0.05,q[0][1]-0.4],[q[1][0]+0.3,y-0.05,q[1][1]-0.4]],'rgba(255,255,255,.55)',0.5);
const lamp=(x,y0,y1,z0,z1,c)=>poly([[x+0.05,y0,z0],[x+0.05,y1,z0],[x+0.05,y1,z1],[x+0.05,y0,z1]],c||'#fff3c4',{stroke:'rgba(0,0,0,.45)'});
const mirror=(x,z,y)=>poly([[x,y,z],[x+1.6,y,z],[x+1.6,y-1.4,z+0.4],[x,y-1.4,z+0.4]],'#222')+poly([[x,y-1.4,z+0.4],[x+1.6,y-1.4,z+0.4],[x+1.6,y-1.4,z+1.6],[x,y-1.4,z+1.6]],'#2b2d33');
const seam=(p,y)=>line3(p.map(([x,z])=>[x,y-0.04,z]),'rgba(0,0,0,.35)',0.35);
const handle=(x,z,y)=>line3([[x,y-0.05,z],[x+1.6,y-0.05,z]],'rgba(255,255,255,.6)',0.6)+line3([[x,y-0.06,z-0.25],[x+1.6,y-0.06,z-0.25]],'rgba(0,0,0,.45)',0.4);
const fit=(inner,ps)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const [x,y,z] of ps){const [u,v]=pj(x,y,z);x0=Math.min(x0,u);x1=Math.max(x1,u);y0=Math.min(y0,v);y1=Math.max(y1,v)}
 const pad=2.5;return {vb:`${(x0-pad).toFixed(1)} ${(y0-pad).toFixed(1)} ${(x1-x0+pad*2).toFixed(1)} ${(y1-y0+pad*2).toFixed(1)}`,inner:`<defs><filter id="artblur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter></defs>`+inner}};
const box=(L,W,H)=>[[0,0,0],[L,0,0],[L,W,0],[0,W,0],[0,0,H],[L,0,H],[L,W,H],[0,W,H]];

/* --- sedans (also the police car and the Mustang) --- */
function sedan(c,o){o=o||{};const L=o.L||48,W=o.W||18,r=o.r||3.2,wz=r,sill=2.6,belt=o.belt||9,cab=o.cab||[[12,belt],[16,14],[29,14],[35,belt]],ci=1.6;
 const nose=o.boxy?[[L,sill],[L,belt-1.2],[L-1,belt]]:[[L,sill],[L+0.4,belt-2.4],[L-2,belt]];
 const tail=o.boxy?[[0,belt],[0,sill+0.5]]:[[1,belt],[0,belt-2],[0,sill+0.8]];
 const body=[...tail,[1,sill],[L-1,sill],...nose,[cab[3][0],belt+0.2],[cab[0][0],belt+0.2]];
 const fx=[L*0.78,L*0.2];let s=shadow3(L,W);
 s+=fx.map(x=>wheel3(x,wz,r,W-1.6,1.4)).join('');
 s+=prism(body,0,W,c);
 s+=prism(cab,ci,W-ci,c,{edge:{0:GL,2:GL}});
 const [b0,b1,b2,b3]=cab;const mid=(b1[0]+b2[0])/2;
 s+=win([[b0[0]+1.4,belt+0.5],[b1[0]+0.5,b1[1]-0.7],[mid-0.6,b1[1]-0.7],[mid-0.6,belt+0.5]],ci)+win([[mid+0.6,belt+0.5],[mid+0.6,b2[1]-0.7],[b2[0]-0.3,b2[1]-0.7],[b3[0]-1.6,belt+0.5]],ci);
 if(o.police){s+=poly([[L*0.36,-0.02,sill+0.3],[L*0.7,-0.02,sill+0.3],[L*0.7,-0.02,belt-0.1],[L*0.36,-0.02,belt-0.1]],'#f4f4f2',{stroke:'rgba(0,0,0,.4)'});
  s+=line3([[mid-6,ci+3,14.05],[mid-6,ci+3,15]],'#c0392b',0.6)+line3([[mid+4,W-ci-3,14.05],[mid+4,W-ci-3,15]],'#c0392b',0.6)+line3([[mid-3,ci,belt+0.6],[mid-3,ci,13.1]],'#444',0.3)+line3([[mid-1.5,ci,belt+0.6],[mid-1.5,ci,13.1]],'#444',0.3);
  s+=poly([[L,1.5,sill+0.4],[L+1.6,1.5,sill+0.4],[L+1.6,W-1.5,sill+0.4],[L,W-1.5,sill+0.4]],'#222')+line3([[L+1.4,2,sill+0.5],[L+1.4,2,belt-1.5],[L+1.4,W-2,belt-1.5],[L+1.4,W-2,sill+0.5]],'#2a2a2a',0.7)}
 if(o.stripes){for(const yy of [W/2-2.2,W/2+0.6]){s+=poly([[cab[3][0]+0.3,yy,belt+0.22],[L-2.1,yy,belt+0.02],[L-2.1,yy+1.6,belt+0.02],[cab[3][0]+0.3,yy+1.6,belt+0.22]],'#f7f7f2',{stroke:'none'});
   s+=poly([[b1[0],yy,b1[1]+0.03],[b2[0],yy,b2[1]+0.03],[b2[0],yy+1.6,b2[1]+0.03],[b1[0],yy+1.6,b1[1]+0.03]],'#f7f7f2',{stroke:'none'})}}
 s+=seam([[mid,sill+0.4],[mid,belt-0.2]],0)+seam([[cab[0][0]-0.5,sill+0.4],[cab[0][0]-0.5,belt-0.3]],0)+seam([[cab[3][0]+1,sill+0.4],[cab[3][0]+1,belt-0.3]],0);
 s+=handle(mid-4,belt-1.4,0)+handle(mid+4.5,belt-1.4,0)+line3([[2,-0.05,belt-2.2],[L-2.5,-0.05,belt-2.2]],'rgba(255,255,255,.35)',0.5);
 if(o.rust)s+=poly([[6,-0.05,sill+0.3],[9,-0.05,sill+0.3],[8,-0.05,sill+1.8]],'#8a4a22',{stroke:'none',opacity:.75})+poly([[L-9,-0.05,sill+0.2],[L-6.5,-0.05,sill+0.2],[L-7.5,-0.05,sill+1.3]],'#8a4a22',{stroke:'none',opacity:.7});
 s+=fx.map(x=>arch(x,wz,r+0.7,0)).join('');
 s+=fx.map(x=>wheel3(x,wz,r,0.2,1.4,{white:o.white,spokes:o.spokes,rim:o.rim})).join('');
 s+=lamp(L+(o.boxy?0:0.2),1.2,4.6,belt-2.6,belt-1.4)+lamp(L+(o.boxy?0:0.2),W-4.6,W-1.2,belt-2.6,belt-1.4)+poly([[L+0.06,5.5,belt-2.7],[L+0.06,W-5.5,belt-2.7],[L+0.06,W-5.5,belt-1.5],[L+0.06,5.5,belt-1.5]],o.chrome?'#d9dde2':'#2a2c31')
  +lamp(-0.02,0,0,0,0,'none')+poly([[0.6,-0.04,belt-2.2],[2.4,-0.04,belt-2.2],[2.4,-0.04,belt-1.2],[0.6,-0.04,belt-1.2]],'#c0392b',{stroke:'none'});
 s+=mirror(cab[3][0]-1.2,belt+0.2,ci);
 return fit(s,box(L,W,cab[1][1]))}

/* --- pickups --- */
function pickup(c,o){o=o||{};const L=o.L||56,W=o.W||19,r=o.r||3.6,wz=r,sill=3.2,belt=o.belt||11,cabX0=o.cabX0||22,cabX1=o.cabX1||35,top=o.top||17.5,bedW=o.bedW||W;
 const fx=[L*0.8,L*0.17];let s=shadow3(L,Math.max(W,bedW));const dy=(W-bedW)/2;
 s+=fx.map(x=>wheel3(x,wz,r,(x<L/2?Math.max(W,bedW)+dy*0:W)-1.8,1.6)).join('');
 // bed (open box): outer prism, then the opening on top and the inner far wall
 s+=prism([[0,sill+0.3],[cabX0-0.3,sill+0.3],[cabX0-0.3,belt],[0,belt]],dy,dy+bedW,o.bed||c);
 s+=poly([[1,dy+1,belt+0.01],[cabX0-1.3,dy+1,belt+0.01],[cabX0-1.3,dy+bedW-1,belt+0.01],[1,dy+bedW-1,belt+0.01]],'#2a2b30',{stroke:'none'})
  +poly([[1,dy+bedW-1,belt],[cabX0-1.3,dy+bedW-1,belt],[cabX0-1.3,dy+bedW-1,belt-4],[1,dy+bedW-1,belt-4]],shade(o.bed||c,-0.35),{stroke:'none'})
  +poly([[cabX0-1.3,dy+1,belt],[cabX0-1.3,dy+bedW-1,belt],[cabX0-1.3,dy+bedW-1,belt-4],[cabX0-1.3,dy+1,belt-4]],shade(o.bed||c,-0.2),{stroke:'none'})
  +poly([[1,dy+1,belt-4],[cabX0-1.3,dy+1,belt-4],[cabX0-1.3,dy+bedW-1,belt-4],[1,dy+bedW-1,belt-4]],'#3a3b40',{stroke:'none',opacity:.0});
 if(o.cargo)s+=prism([[3,belt-3.5],[9,belt-3.5],[9,belt+1.2],[3,belt+1.2]],dy+3,dy+9,'#b9824a')+prism([[10,belt-3.5],[15,belt-3.5],[15,belt+0.5],[10,belt+0.5]],dy+bedW-9,dy+bedW-3,'#c99a5a');
 // cab + hood
 s+=prism([[cabX0,sill],[L-1,sill],[L,sill+1],[L,belt-1],[L-1.5,belt],[cabX1+1,belt+0.2],[cabX0,belt+0.2]],0,W,c);
 s+=prism([[cabX0+0.3,belt+0.2],[cabX0+0.6,top],[cabX1-2,top],[cabX1+1,belt+0.2]],1.2,W-1.2,c,{edge:{2:GL}});
 s+=win([[cabX0+1.3,belt+0.6],[cabX0+1.5,top-0.8],[cabX1-2.4,top-0.8],[cabX1-0.4,belt+0.6]],1.2);
 if(o.twoTone)s+=poly([[cabX0+0.4,-0.02,sill+0.5],[cabX1+0.6,-0.02,sill+0.5],[cabX1+0.6,-0.02,belt-0.1],[cabX0+0.4,-0.02,belt-0.1]],'#f1eee6',{stroke:'rgba(0,0,0,.4)'});
 s+=seam([[cabX0+0.4,sill+0.5],[cabX0+0.4,belt]],0)+seam([[cabX1+0.6,sill+0.5],[cabX1+0.6,belt-0.3]],0)+handle(cabX0+2,belt-1.6,0);
 s+=line3([[1,-0.05,belt-1.6],[L-2,-0.05,belt-1.6]],'rgba(255,255,255,.3)',0.5);
 if(o.dents)for(let i=0;i<14;i++){const x=cabX0+1.5+(i*2.3)%(cabX1-cabX0-4),y=2.5+(i*3.7)%(W-5);s+=poly(ring(x,y,top+0.02,0.35,8).map(([px,py,pz])=>[px,py+ (pz-top),top+0.02]),'rgba(255,255,255,.45)',{stroke:'none'})}
 if(o.dents)for(let i=0;i<10;i++){const x=cabX1+2+(i*2.9)%(L-cabX1-5),y=2.5+(i*4.1)%(W-5);s+=poly(ring(x,y,belt+0.02,0.3,8).map(([px,py,pz])=>[px,py+(pz-belt),belt+0.02]),'rgba(255,255,255,.4)',{stroke:'none'})}
 if(o.scratch)s+=line3([[3,dy-0.05,belt-2.5],[9,dy-0.05,belt-3.4],[14,dy-0.05,belt-2.8]],'rgba(255,255,255,.65)',0.35)+line3([[5,dy-0.05,belt-5],[12,dy-0.05,belt-4.4]],'rgba(255,255,255,.55)',0.35);
 if(o.rust)s+=poly([[3,dy-0.05,sill+0.5],[6,dy-0.05,sill+0.5],[5,dy-0.05,sill+2]],'#8a4a22',{stroke:'none',opacity:.75});
 if(o.flares)s+=poly([...Array(13)].map((_,i)=>{const t=Math.PI*i/12;return [fx[1]+(r+2)*Math.cos(t),dy-0.4,wz+(r+2)*Math.sin(t)]}),shade(c,-0.08));
 s+=fx.map((x,i)=>arch(x,wz,r+0.8,i===1?dy:0)).join('');
 s+=fx.map((x,i)=>wheel3(x,wz,r,(i===1?dy:0)+0.2,1.6,{rim:o.rim,spokes:o.spokes})).join('');
 const gz0=sill+1.4,gz1=belt-0.6;
 s+=poly([[L+0.06,4.5,gz0],[L+0.06,W-4.5,gz0],[L+0.06,W-4.5,gz1],[L+0.06,4.5,gz1]],o.chrome?'#dfe3e8':'#2a2c31')+(o.chrome?[1,2,3].map(i=>line3([[L+0.08,4.5,gz0+i*(gz1-gz0)/4],[L+0.08,W-4.5,gz0+i*(gz1-gz0)/4]],'#9aa1a9',0.4)).join(''):'');
 s+=lamp(L,1.2,4.2,belt-3,belt-1.2,o.led?'#eaf6ff':'#fff3c4')+lamp(L,W-4.2,W-1.2,belt-3,belt-1.2,o.led?'#eaf6ff':'#fff3c4')+(o.led?line3([[L+0.1,1.2,belt-3.2],[L+0.1,4.2,belt-3.2]],'#9fe0ff',0.5):'');
 s+=prism([[L-0.4,sill-0.9],[L+1.3,sill-0.9],[L+1.5,sill+1.1],[L-0.4,sill+1.3]],0.4,W-0.4,o.chrome?'#d3d8de':'#2b2d31');
 s+=poly([[0.8,dy-0.04,belt-2.6],[2.2,dy-0.04,belt-2.6],[2.2,dy-0.04,belt-0.8],[0.8,dy-0.04,belt-0.8]],'#c0392b',{stroke:'none'})+mirror(cabX1-0.6,belt+0.4,1.2);
 return fit(s,box(L,Math.max(W,bedW),top))}

/* --- minivan --- */
function van(c){const L=51,W=19,r=3.3,sill=2.8,belt=9.5,top=17;let s=shadow3(L,W);const fx=[L*0.8,L*0.18];
 s+=fx.map(x=>wheel3(x,r,r,W-1.6,1.4)).join('');
 s+=prism([[0,sill],[L-1,sill],[L,sill+1.5],[L+0.3,belt-1.5],[L-3,belt],[0.5,belt],[0,belt-1]],0,W,c);
 s+=prism([[0.6,belt],[1.4,top],[34,top],[44,belt]],1.1,W-1.1,c,{edge:{2:GL,0:GL}});
 s+=win([[2.6,belt+0.6],[2.9,top-0.9],[12,top-0.9],[12,belt+0.6]],1.1)+win([[13.2,belt+0.6],[13.2,top-0.9],[24,top-0.9],[24,belt+0.6]],1.1)+win([[25.2,belt+0.6],[25.2,top-0.9],[33.4,top-0.9],[41.5,belt+0.6]],1.1);
 s+=seam([[13,sill+0.4],[13,belt-0.2]],0)+seam([[25,sill+0.4],[25,belt-0.2]],0)+line3([[13,-0.05,belt-0.8],[25,-0.05,belt-0.8]],'rgba(0,0,0,.4)',0.45)+handle(22,belt-1.6,0)+handle(31,belt-1.6,0);
 s+=line3([[6,(W)/2-4,top+0.3],[30,(W)/2-4,top+0.3]],'#555a62',0.6)+line3([[6,W/2+4,top+0.3],[30,W/2+4,top+0.3]],'#555a62',0.6);
 s+=fx.map(x=>arch(x,r,r+0.7,0)).join('')+fx.map(x=>wheel3(x,r,r,0.2,1.4)).join('');
 s+=lamp(L+0.3,1.2,5,belt-3,belt-1.8)+lamp(L+0.3,W-5,W-1.2,belt-3,belt-1.8)+poly([[L+0.36,6,sill+2],[L+0.36,W-6,sill+2],[L+0.36,W-6,sill+3.6],[L+0.36,6,sill+3.6]],'#2a2c31')+mirror(41,belt+0.2,1.1);
 return fit(s,box(L,W,top))}

/* --- Jeep Wrangler: open top, roll bar, flat windshield, round lamps, slotted grille --- */
function jeep(c){const L=42,W=18,r=3.9,sill=4,belt=12,top=19.5;let s=shadow3(L,W);const fx=[L*0.8,L*0.2];
 s+=fx.map(x=>wheel3(x,r,r,W-2,1.8)).join('');
 s+=prism([[0,sill],[L,sill],[L,belt-0.5],[L-0.5,belt],[0,belt]],0,W,c);
 s+=poly([[1,1,belt+0.01],[29,1,belt+0.01],[29,W-1,belt+0.01],[1,W-1,belt+0.01]],'#26272b',{stroke:'none'})+prism([[6,belt],[14,belt],[14,belt+3],[6,belt+3]],2,W-2,'#3a332c')+prism([[17,belt],[24,belt],[24,belt+3.2],[17,belt+3.2]],2.5,W-2.5,'#3a332c');
 s+=line3([[9,1,belt],[9,1,top],[9,W-1,top],[9,W-1,belt]],'#1f2024',1)+line3([[9,1,top],[29.5,1,top-0.2]],'#1f2024',0.9)+line3([[9,W-1,top],[29.5,W-1,top-0.2]],'#1f2024',0.9);
 s+=prism([[29,belt],[29.6,top-0.2],[30.4,top-0.2],[30.4,belt]],0.6,W-0.6,'#2a2b30',{edge:{0:GL}});
 s+=poly([[29.05,1.2,belt+0.5],[29.55,1.2,top-0.8],[29.55,W-1.2,top-0.8],[29.05,W-1.2,belt+0.5]],GL,{stroke:'rgba(0,0,0,.5)',opacity:.85});
 s+=prism([[4,sill-0.5],[L-3,sill-0.5],[L-3,sill+0.3],[4,sill+0.3]],-1.2,0,'#222428');
 s+=fx.map(x=>arch(x,r,r+0.9,0)).join('')+fx.map(x=>wheel3(x,r,r,0.15,1.8,{rim:'#bfc4ca',spokes:1})).join('');
 for(let i=0;i<7;i++){const y=4.6+i*1.25;s+=poly([[L+0.06,y,sill+1.8],[L+0.06,y+0.55,sill+1.8],[L+0.06,y+0.55,belt-1.3],[L+0.06,y,belt-1.3]],'#202124',{stroke:'none'})}
 for(const y of [2.6,W-2.6])s+=poly(ring(0,0,0,1.25,16).map(([u,_,v])=>[L+0.07,y+u,belt-3+v]),'#fff3c4',{stroke:'#333',stroke_width:.4});
 s+=prism([[L-0.4,sill-1.2],[L+1.6,sill-1.2],[L+1.6,sill+0.8],[L-0.4,sill+0.8]],-0.6,W+0.6,'#26272b');
 return fit(s,box(L,W,top))}

/* --- step-van food trucks --- */
function stepvan(c,o){o=o||{};const L=58,W=20,r=3.6,sill=3.6,top=29,ws=48;let s=shadow3(L,W);const fx=[L*0.84,L*0.2];
 s+=fx.map(x=>wheel3(x,r,r,W-1.8,1.6)).join('');
 s+=prism([[0,sill],[ws,sill],[ws,top],[1,top],[0,top-1]],0,W,c);
 s+=prism([[ws,sill],[L,sill],[L,12],[L-2,13.5],[ws+3.5,14],[ws+1,top-1],[ws,top]],0.6,W-0.6,c,{edge:{4:GL}});
 s+=win([[ws+1.2,15],[ws+1.2,top-2.5],[ws+2.8,15.5],[ws+2.8,15]],0.6);
 // serving hatch + awning on the near side
 const hx0=12,hx1=40,hz0=12.5,hz1=21.5;
 s+=poly([[hx0,-0.03,hz0],[hx1,-0.03,hz0],[hx1,-0.03,hz1],[hx0,-0.03,hz1]],o.steel?'#d7dce1':'#3b3f45',{stroke:'rgba(0,0,0,.55)',stroke_width:.5})
  +poly([[hx0+1,-0.05,hz0+1],[hx1-1,-0.05,hz0+1],[hx1-1,-0.05,hz1-0.8],[hx0+1,-0.05,hz1-0.8]],o.steel?'#aeb6be':'#23262b',{stroke:'none'})
  +poly([[hx0-1,-0.04,hz0-0.6],[hx1+1,-0.04,hz0-0.6],[hx1+1.6,-2.4,hz0-0.2],[hx0-1.6,-2.4,hz0-0.2]],'#c9ced4');
 const n=9;for(let i=0;i<n;i++){const x0=hx0-1+(hx1-hx0+2)*i/n,x1=hx0-1+(hx1-hx0+2)*(i+1)/n;
  s+=poly([[x0,-0.05,hz1+0.6],[x1,-0.05,hz1+0.6],[x1,-4.2,hz1-1.4],[x0,-4.2,hz1-1.4]],i%2?'#fbfaf6':(o.awning||'#2c5aa0'),{stroke:'rgba(0,0,0,.35)',stroke_width:.25})}
 s+=line3([[hx0,-4.2,hz1-1.4],[hx1,-4.2,hz1-1.4]],'rgba(0,0,0,.4)',0.5);
 if(o.gen)s+=prism([[3,sill-0.6],[9,sill-0.6],[9,sill+3.5],[3,sill+3.5]],-1.5,1,'#6b7178');
 s+=seam([[ws-0.2,sill+0.5],[ws-0.2,top-0.5]],0)+line3([[0.5,-0.05,top-2],[ws-1,-0.05,top-2]],'rgba(255,255,255,.4)',0.5);
 s+=fx.map(x=>arch(x,r,r+0.8,0)).join('')+fx.map(x=>wheel3(x,r,r,0.15,1.6,{rim:o.steel?'#e1e4e8':'#c9ced4'})).join('');
 s+=lamp(L,1.4,4.6,9.5,11)+lamp(L,W-4.6,W-1.4,9.5,11)+poly([[L+0.06,6,sill+1.6],[L+0.06,W-6,sill+1.6],[L+0.06,W-6,sill+5],[L+0.06,6,sill+5]],'#2a2c31')
  +prism([[L-0.4,sill-0.9],[L+1.3,sill-0.9],[L+1.5,sill+1.1],[L-0.4,sill+1.3]],0.4,W-0.4,'#2b2d31')+mirror(ws+1.5,15.5,0.6);
 return fit(s,box(L,W,top))}

/* --- motorcycles: drawn on the centre plane, same camera --- */
function moto(c,o){o=o||{};const big=o.cruiser,y=5,r=big?3.3:3.1,rx=3.4,fx=big?20.5:18.6,L=fx+3.4,z=r,head=big?[16.2,10.6]:[15.4,10.4];
 let s=`<polygon points="${pts([[0,y-2,0],[L,y-2,0],[L,y+2,0],[0,y+2,0]].map(q=>pj(...q)))}" fill="rgba(0,0,0,.22)" filter="url(#artblur)"/>`;
 const tube=(p,w,col)=>line3(p.map(([x,zz,yy])=>[x,yy==null?y:yy,zz]),col||'#25262a',w||0.75);
 s+=tube([[head[0]+0.2,head[1]-0.2,y+1],[fx,z,y+1]],0.7,'#c4cad1');                      // far fork leg
 s+=wheel3(rx,z,r,y-0.6,1.2,{spokes:1,rim:'#b9c0c8'});
 s+=tube([[rx,z],[8.6,4.4]],0.9)+tube([[8.4,8.2],[head[0],head[1]]],0.9)+tube([[head[0],head[1]],[11.8,4]],0.9)+tube([[4.2,8.4],[8.4,8.2],[11.8,4],[8.6,4.4]],0.8);
 s+=prism([[7.6,3.6],[12.6,3.4],[13.2,6.6],[8.4,7.2]],y-1.5,y+1.5,'#8d939c');                  // engine
 for(let k=0;k<4;k++)s+=line3([[9+k*1,y-1.55,4.6],[9.4+k*1,y-1.55,6.6]],'rgba(255,255,255,.55)',0.3);
 s+=prism([[9.6,4.2],[12,4.2],[12,6],[9.6,6]],y-2,y-1.5,'#c9ced4');                             // cover
 s+=tube([[12.2,3.6,y-1.9],[6,3.9,y-2],[1,5,y-2]],big?1.1:0.9,'#d8dde2')+tube([[1,5,y-2],[0.2,5.3,y-2]],big?1.5:1.2,'#9aa1a9'); // exhaust
 s+=prism(big?[[2.4,7.5],[8.6,7.6],[9.4,8.6],[5.4,9],[2.6,8.6]]:[[2.6,8],[9,7.9],[9.6,8.9],[3,9.2]],y-1.5,y+1.5,'#2a1d14');  // seat
 s+=prism([[0.6,6.4],[4.2,7.8],[4.4,8.4],[0.4,7.1]],y-1.3,y+1.3,c);                             // rear fender
 s+=poly([[0.5,y-1.32,6.8],[1.2,y-1.32,7.1],[1.2,y-1.32,7.5],[0.5,y-1.32,7.2]],'#c0392b',{stroke:'none'});
 s+=prism(big?[[8.8,8.4],[15.6,9],[15.8,10.6],[10.4,11.4],[8.8,10]]:[[9.2,8.6],[14.8,9.2],[15,10.6],[10.4,11.1],[9.2,9.8]],y-1.8,y+1.8,c); // tank
 if(o.eagle)s+=poly([[11.2,y-1.85,9.6],[12.4,y-1.85,10.6],[13.3,y-1.85,9.9],[14.4,y-1.85,10.6],[14.2,y-1.85,9.3],[12.3,y-1.85,9.1]],'#f2c94c',{stroke:'#7a4a14',stroke_width:.25});
 else s+=line3([[10,y-1.85,9.9],[14.4,y-1.85,10]],'rgba(255,255,255,.7)',0.45);
 s+=wheel3(fx,z,r,y-0.6,1.2,{spokes:1,rim:'#b9c0c8'});
 s+=prism([[fx-2.6,z+2.6],[fx+1.2,z+3.4],[fx+2.6,z+2.2],[fx+2.2,z+2.9],[fx-2.4,z+3.3]],y-1,y+1,c);  // front fender
 s+=tube([[head[0]+0.2,head[1]-0.2,y-1],[fx,z,y-1]],0.75,'#d6dbe0');                          // near fork leg
 s+=tube([[head[0]-0.6,head[1]+1.2,y-3.6],[head[0]+0.4,head[1]+0.4,y-1.4],[head[0]+0.4,head[1]+0.4,y+1.4],[head[0]-0.6,head[1]+1.2,y+3.6]],0.6,'#2a2b30'); // bars
 s+=tube([[head[0]-0.6,head[1]+1.2,y-3.6],[head[0]-1.4,head[1]+1.2,y-3.7]],0.9,'#111');
 s+=poly(ring(0,0,0,1,16).map(([u,_,v])=>[head[0]+1.1,y+u,head[1]-0.6+v]),'#fff3c4',{stroke:'#2a2b30',stroke_width:.45});
 return fit(s,[[0,y-4,0],[L,y+4,0],[0,y-4,13],[L,y+4,13]])}
const CARS={
 civic98:()=>sedan('#7d8d74',{L:44,W:17,rust:1,cab:[[11,9],[15,13.4],[26,13.4],[32,9]]}),
 caprice94:()=>sedan('#1b1d22',{L:54,W:19,boxy:1,police:1,belt:9.4,cab:[[14,9.4],[18,14.2],[33,14.2],[39,9.4]]}),
 century99:()=>sedan('#cdbfa6',{L:50,W:18.5,boxy:1,white:1,chrome:1,belt:9.2,cab:[[12,9.2],[16,14],[30,14],[36,9.2]]}),
 camry04:()=>sedan('#97a1ac',{L:48,W:18,cab:[[11,9],[16,14],[29,14],[35.5,9]]}),
 rebel11:()=>moto('#2b2d33'),
 sportster06:()=>moto('#7a1f1a',{cruiser:1,eagle:1}),
 f150_95:()=>pickup('#a8302a',{twoTone:1,rust:1}),
 ram01:()=>pickup('#3e5f86',{L:60,W:19.5,bedW:22.5,flares:1,belt:12,top:19,cabX0:24,cabX1:38,r:3.9,chrome:1,cargo:1}),
 sienna09:()=>van('#b9bec3'),
 silverado08:()=>pickup('#ece8de',{L:57,scratch:1,cabX1:36,chrome:1}),
 wrangler07:()=>jeep('#c7a24a'),
 stepvan99:()=>stepvan('#f1ece0'),
 tacoma12:()=>pickup('#5e6b5a',{L:54,W:18.5,dents:1,top:17,cabX0:21,cabX1:34,spokes:1}),
 mustang68:()=>sedan('#1f4d8c',{L:47,W:18,belt:8.6,cab:[[9,8.6],[20,12.6],[27,12.6],[33,8.6]],stripes:1,chrome:1,spokes:1,rim:'#dfe3e8'}),
 e450_14:()=>stepvan('#f6f6f6',{steel:1,gen:1,awning:'#c0643a'}),
 f150_19:()=>pickup('#2b2f36',{L:60,W:20,belt:12.5,top:19.5,cabX0:23,cabX1:38,r:3.9,chrome:1,led:1,spokes:1,rim:'#d7dbe0'})
};
function carArt(k,cls){const f=CARS[k];if(!f)return '';const {vb,inner}=f();return svg(vb,inner,'art-car '+(cls||''))}

return {dishArt,carArt,DISHES,CARS};
})();
const dishArt=ART.dishArt,carArt=ART.carArt;
