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
 barbacoa:()=>plate()+tortilla(46,58,20)+tortilla(76,64,18)+[...Array(10)].map((_,i)=>L(`M${36+i*4} ${54+(i%3)*2} l6 3`,K.meatL,2.4)).join('')+C(44,52,2,K.white)+C(52,56,2,K.white)+C(48,58,1.8,K.green)+P('M84 48 a8 8 0 0 1 12 6 Z','#7fb24a',{stroke:'#4f8a2c',stroke_width:1})
};
function dishArt(k,cls){const f=DISHES[k];return f?svg('0 0 120 90',f(),'art-dish '+(cls||'')):''}

/* ---- vehicle kit (side view, facing right) ---- */
const ground=()=>E(100,88,90,4.5,'rgba(0,0,0,.13)');
const wheel=(x,r)=>C(x,78,r||11,'#232326')+C(x,78,(r||11)*0.5,'#b9c0c8')+C(x,78,(r||11)*0.18,'#55595e');
const glass='#cfe3f2',glassD='#9fc3df',chrome='#d6dbe0';
const lights=(fx,y)=>R(fx-4,y,5,4,'#ffe7a3',{rx:1})+R(14,y,4,4,'#d6402e',{rx:1});
const sedan=(c,o)=>{o=o||{};const body=o.boxy?'M14 70 L14 56 Q14 50 22 50 L52 48 L64 32 L132 32 L148 48 L180 50 Q186 51 186 58 L186 70 Q186 76 180 76 L20 76 Q14 76 14 70 Z':'M14 70 Q12 56 24 52 L54 47 Q66 30 96 29 Q128 28 146 46 L178 50 Q188 52 188 62 L188 70 Q188 76 180 76 L20 76 Q14 76 14 70 Z';
 return ground()+P(body,c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})+(o.police?P('M70 50 L70 76 L132 76 L132 50 Z',K.white,{opacity:.95})+R(92,28,18,3,K.iron,{rx:1})+L('M95 28 l-2 -4 M107 28 l2 -4','#d6402e',1.2):'')
 +P(o.boxy?'M58 48 L67 35 L97 35 L97 48 Z':'M60 47 Q70 34 96 33 L97 47 Z',glass,{stroke:glassD,stroke_width:1})+P(o.boxy?'M101 48 L101 35 L130 35 L143 48 Z':'M101 47 L101 33 Q124 33 140 46 Z',glass,{stroke:glassD,stroke_width:1})
 +(o.police?L('M106 36 L106 46 M112 36 L112 46 M118 37 L118 46 M124 38 L124 46','#555',0.8):'')+L('M99 48 L99 74 M64 60 L76 60 M108 60 L120 60','rgba(0,0,0,.35)',1)+lights(188,56)+R(14,66,174,3,'rgba(0,0,0,.18)')+(o.rust?C(40,70,4,'#8a4a22',{opacity:.6})+C(160,72,3,'#8a4a22',{opacity:.6}):'')+(o.doily?R(104,40,10,6,'#fff',{rx:2,opacity:.85}):'')+wheel(46)+wheel(156)};
const moto=(c,o)=>{o=o||{};const big=o.cruiser;
 return ground()+wheel(48,big?15:13)+wheel(150,big?15:13)+L(`M48 78 L82 54 L124 54 L150 78`,K.iron,4)+L('M124 54 L140 34',chrome,3)+L('M134 30 L148 30',K.iron,3)+L('M60 76 L96 76',chrome,3)
 +P(big?'M84 52 Q90 36 114 38 Q126 40 124 54 Z':'M88 52 Q94 40 112 42 Q120 44 118 54 Z',c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +P(big?'M58 54 Q64 44 84 46 L86 54 Z':'M64 54 Q70 46 88 48 L88 54 Z','#2a1b12')+R(84,58,26,12,'#7d8590',{rx:4})+C(146,40,4,'#ffe7a3')
 +(o.eagle?P('M98 44 l6 -4 l4 3 l4 -4 l2 6 l-8 2 Z','#f2c94c',{stroke:'#8a5a24',stroke_width:.8}):'')+L(big?'M40 60 Q34 48 48 46':'M42 62 Q38 52 50 50',c,4)};
const pickup=(c,o)=>{o=o||{};const hi=o.modern?4:0;
 return ground()+P(`M12 ${72-hi} L12 ${50-hi} L96 ${50-hi} L98 ${30-hi} Q99 ${26-hi} 104 ${26-hi} L136 ${26-hi} Q142 ${26-hi} 146 ${32-hi} L156 ${48-hi} L182 ${50-hi} Q190 ${51-hi} 190 ${60-hi} L190 ${72-hi} Q190 ${76-hi} 184 ${76-hi} L18 ${76-hi} Q12 ${76-hi} 12 ${72-hi} Z`,c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +L(`M14 ${53-hi} L94 ${53-hi}`,'rgba(0,0,0,.25)',2)+P(`M104 ${30-hi} L134 ${30-hi} Q138 ${30-hi} 141 ${34-hi} L150 ${47-hi} L104 ${47-hi} Z`,glass,{stroke:glassD,stroke_width:1})
 +(o.twoTone?P(`M100 ${48-hi} L150 ${48-hi} L150 ${74-hi} L100 ${74-hi} Z`,'#f2efe8',{stroke:'rgba(0,0,0,.3)',stroke_width:1}):L(`M100 ${48-hi} L100 ${74-hi} M150 ${48-hi} L150 ${74-hi}`,'rgba(0,0,0,.35)',1))
 +L(`M112 ${58-hi} L124 ${58-hi}`,'rgba(0,0,0,.4)',1.4)+(o.modern?R(182,52-hi,8,14,chrome,{rx:2})+R(12,66-hi,178,3,chrome):'')+lights(190,54-hi)
 +(o.dents?[...Array(9)].map((_,i)=>C(104+i*4.2,28-hi+(i%2),1.3,'rgba(255,255,255,.55)')).join('')+[...Array(8)].map((_,i)=>C(158+i*3.6,50-hi+(i%2),1.2,'rgba(255,255,255,.5)')).join(''):'')
 +(o.scratch?L('M22 62 l18 -4 M30 68 l26 -3 M60 60 l14 3',`rgba(255,255,255,.55)`,1):'')+(o.rust?C(30,70,4,'#8a4a22',{opacity:.6})+C(178,68,3,'#8a4a22',{opacity:.6}):'')
 +(o.dually?P(`M24 ${64-hi} Q42 ${50-hi} 60 ${64-hi} Z`,c,{stroke:'rgba(0,0,0,.35)',stroke_width:1}):'')+wheel(42,o.modern?13:12)+wheel(160,o.modern?13:12)};
const van=(c)=>ground()+P('M12 70 L12 40 Q12 32 22 31 L130 30 Q146 30 158 44 L180 50 Q190 53 190 62 L190 70 Q190 76 184 76 L18 76 Q12 76 12 70 Z',c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +P('M22 36 L52 36 L52 48 L20 48 Z',glass,{stroke:glassD,stroke_width:1})+P('M58 36 L96 36 L96 48 L58 48 Z',glass,{stroke:glassD,stroke_width:1})+P('M102 36 L132 36 Q142 36 152 48 L102 48 Z',glass,{stroke:glassD,stroke_width:1})
 +L('M56 50 L56 74 M98 50 L98 74 M56 56 L98 56','rgba(0,0,0,.3)',1)+lights(190,56)+R(12,66,178,3,'rgba(0,0,0,.18)')+wheel(44)+wheel(158);
const jeep=(c)=>ground()+P('M22 72 L22 46 L120 46 L122 34 L128 34 L132 46 L176 48 Q186 49 186 58 L186 72 Q186 76 180 76 L28 76 Q22 76 22 72 Z',c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +L('M40 46 L46 24 L110 24 L118 46',K.iron,3)+L('M78 24 L80 46',K.iron,2)+P('M122 34 L128 34 L128 46 L122 46 Z',glass)+C(13,58,9,'#232326')+C(13,58,4.5,'#b9c0c8')+C(178,56,4,'#ffe7a3')
 +R(150,48,14,14,'rgba(0,0,0,.2)',{rx:2})+L('M168 54 L184 54 M168 58 L184 58',K.iron,1.2)+wheel(44,13)+wheel(152,13);
const stepvan=(c,o)=>{o=o||{};return ground()+P('M12 72 L12 16 Q12 12 18 12 L156 12 Q164 12 166 20 L176 40 Q184 42 186 50 L186 72 Q186 76 180 76 L18 76 Q12 76 12 72 Z',c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +P('M150 18 L162 18 L172 40 L150 40 Z',glass,{stroke:glassD,stroke_width:1})+R(40,26,80,26,o.steel?'#d9dee3':'#3b3f45',{rx:2})+R(40,26,80,26,'none',{stroke:'rgba(0,0,0,.35)',stroke_width:1})
 +[0,1,2,3,4,5,6,7].map(i=>R(36+i*11,18,11,8,i%2?K.white:(o.awning||K.rim))).join('')+R(36,52,88,4,K.iron,{opacity:.6})+(o.gen?R(14,58,16,12,'#6b7178',{rx:2}):'')
 +L('M144 44 L144 74','rgba(0,0,0,.35)',1)+lights(186,56)+wheel(42,12)+wheel(150,12)};
const mustang=(c)=>ground()+P('M12 70 Q10 58 22 56 L56 52 Q78 32 104 31 Q122 31 132 44 L176 50 Q190 52 190 62 L190 70 Q190 76 182 76 L18 76 Q12 76 12 70 Z',c,{stroke:'rgba(0,0,0,.35)',stroke_width:1.2})
 +P('M64 51 Q80 37 100 36 L101 51 Z',glass,{stroke:glassD,stroke_width:1})+P('M105 51 L105 36 Q118 36 126 46 Z',glass,{stroke:glassD,stroke_width:1})
 +L('M18 62 L188 58','#ffffff',3,{opacity:.85})+L('M18 66 L188 62','#ffffff',1.5,{opacity:.85})+R(184,56,6,6,chrome,{rx:1})+lights(190,56)+wheel(46,12)+wheel(158,12);
const CARS={
 civic98:()=>sedan('#7d8d74',{rust:1}),
 caprice94:()=>sedan('#1d1f24',{boxy:1,police:1}),
 century99:()=>sedan('#c8b9a2',{boxy:1,doily:1}),
 camry04:()=>sedan('#8f99a4'),
 rebel11:()=>moto('#2b2d33'),
 sportster06:()=>moto('#7a1f1a',{cruiser:1,eagle:1}),
 f150_95:()=>pickup('#a8302a',{twoTone:1,rust:1}),
 ram01:()=>pickup('#3e5f86',{dually:1}),
 sienna09:()=>van('#b9bec3'),
 silverado08:()=>pickup('#ece8de',{scratch:1}),
 wrangler07:()=>jeep('#c7a24a'),
 stepvan99:()=>stepvan('#f1ece0'),
 tacoma12:()=>pickup('#5e6b5a',{dents:1}),
 mustang68:()=>mustang('#1f4d8c'),
 e450_14:()=>stepvan('#f6f6f6',{steel:1,gen:1,awning:'#c0643a'}),
 f150_19:()=>pickup('#2b2f36',{modern:1})
};
function carArt(k,cls){const f=CARS[k];return f?svg('0 0 200 92',f(),'art-car '+(cls||'')):''}
return {dishArt,carArt,DISHES,CARS};
})();
const dishArt=ART.dishArt,carArt=ART.carArt;
