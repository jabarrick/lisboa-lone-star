/* ===== v3 · portraits: every named character as a small inline-SVG bust =====
 npcFace(id, cls) → <svg> or ''. Built from a parameter set per person (FACE[id]):
  sk skin tone 0–9 · h hair style · hc hair colour · fh facial hair · g glasses · hat · cl clothing · cc clothing colour
  acc accessories · age 0 young / 1 middle / 2 old · f face shape (r round, n narrow, w wide, o oval) · bg background
 Flat, friendly, realistic proportions; decorative (aria-hidden) — the name is always printed next to it. */
const FACES=(function(){
const a=o=>Object.entries(o||{}).map(([k,v])=>`${k.replace(/_/g,'-')}="${v}"`).join(' ');
const E=(cx,cy,rx,ry,f,o)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${a(o)}/>`;
const C=(cx,cy,r,f,o)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${a(o)}/>`;
const R=(x,y,w,h,f,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${a(o)}/>`;
const P=(d,f,o)=>`<path d="${d}" fill="${f}" ${a(o)}/>`;
const L=(d,s,w,o)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${w||1.2}" stroke-linecap="round" stroke-linejoin="round" ${a(o)}/>`;
const hex=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const sh=(h,k)=>{const c=hex(h);return 'rgb('+c.map(v=>Math.round(k>=0?v+(255-v)*k:v*(1+k))).join(',')+')'};
const SKIN=['#f8dcc8','#f1c9ad','#e8b893','#d9a37b','#c88c63','#b07650','#966041','#7c4b31','#623a26','#4a2c1d'];
const HAIR={black:'#1d1916',dark:'#33231a',brown:'#5e3c24',chestnut:'#7a4526',auburn:'#8e3a1f',red:'#b0532b',blonde:'#d6b26a',ash:'#b9a17a',platinum:'#e6d9bd',gray:'#9e9a96',silver:'#c9c6c2',white:'#ecebe7'};
const CLOTH={white:'#f4f2ee',cream:'#ece2cc',denim:'#4d6a8e',navy:'#2b3a55',black:'#26272b',charcoal:'#3f4247',gray:'#8d939a',red:'#a8352c',maroon:'#6e2433',rust:'#b0582f',orange:'#d9822f',mustard:'#c9a23a',olive:'#6b7346',green:'#3e6e4b',teal:'#2f7470',sky:'#7fa9cf',blue:'#2c5aa0',purple:'#6a4a8a',pink:'#d98aa0',rose:'#c45d74',brown:'#7a5134',tan:'#b99668',khaki:'#a89a6c',saffron:'#e0a33a'};
const BG=['#e6eef7','#f3e6da','#e4efe4','#f2e3e8','#ece8f4','#f5eedb','#e1eef0','#efe6dc'];
function face(o){
 const sk=SKIN[o.sk||0],skD=sh(sk,-0.14),skL=sh(sk,0.18),hc=HAIR[o.hc||'brown']||o.hc,hcD=sh(hc,-0.25),cc=CLOTH[o.cc||'denim']||o.cc,ccD=sh(cc,-0.22);
 const age=o.age||0,fw={r:17,n:14.8,w:18.2,o:16}[o.f||'o'],fy=46,fh=19.5,chin=fy+fh;
 let s=o.nobg?'':C(50,50,50,o.bg||BG[o.bgi||0]);
 // hair behind the head (long styles)
 const long=['long','wavy','braids','ponytail','bun_low','locs','straight'].includes(o.h);
 if(o.h==='long'||o.h==='straight')s+=P(`M${50-fw-3} 40 Q${50-fw-5} 70 ${50-fw-2} 80 L${50+fw+2} 80 Q${50+fw+5} 70 ${50+fw+3} 40 Z`,hc);
 if(o.h==='wavy')s+=P(`M${50-fw-3} 40 Q${50-fw-8} 58 ${50-fw-3} 66 Q${50-fw-7} 74 ${50-fw} 82 L${50+fw} 82 Q${50+fw+7} 74 ${50+fw+3} 66 Q${50+fw+8} 58 ${50+fw+3} 40 Z`,hc);
 if(o.h==='locs')for(let i=-3;i<=3;i++)s+=L(`M${50+i*5} 34 Q${50+i*7.2} 60 ${50+i*7.6} 78`,hc,3.4);
 if(o.h==='afro')s+=C(50,40,fw+10,hc)+C(50-fw-4,46,8,hc)+C(50+fw+4,46,8,hc);
 if(o.h==='curly_long')s+=[[-1,48],[1,48],[-1.1,60],[1.1,60],[-0.9,70],[0.9,70]].map(([d,y])=>C(50+d*(fw+4),y,6.5,hc)).join('');
 // body
 s+=P('M8 100 Q11 76 33 71 Q50 77 67 71 Q89 76 92 100 Z',cc);
 s+=R(43.5,fy+12,13,14,skD,{rx:4});
 s+=clothes(o,cc,ccD,sk,skD);
 // ears + head
 s+=E(50-fw+0.5,fy+2,3.2,4.6,skD)+E(50+fw-0.5,fy+2,3.2,4.6,skD);
 if(o.acc&&o.acc.includes('earrings'))s+=C(50-fw+0.3,fy+7.2,1.4,'#e3c15a')+C(50+fw-0.3,fy+7.2,1.4,'#e3c15a');
 s+=P(`M${50-fw} ${fy-6} Q${50-fw} ${fy-fh} 50 ${fy-fh} Q${50+fw} ${fy-fh} ${50+fw} ${fy-6} L${50+fw} ${fy+4} Q${50+fw-1} ${chin-3} 50 ${chin} Q${50-fw+1} ${chin-3} ${50-fw} ${fy+4} Z`,sk);
 s+=P(`M${50+fw-4} ${fy-10} Q${50+fw} ${fy} ${50+fw-2} ${fy+8} Q${50+fw-6} ${chin-4} 50 ${chin} Q${50+fw-3} ${chin-6} ${50+fw-4} ${fy-10} Z`,skD,{opacity:.35});
 // features
 const ey=fy+1,ex=6.2;
 s+=E(50-ex,ey,1.8,2.2,'#2a1d17')+E(50+ex,ey,1.8,2.2,'#2a1d17')+C(50-ex+0.6,ey-0.7,0.55,'#fff')+C(50+ex+0.6,ey-0.7,0.55,'#fff');
 const bw=o.fhb==='full'||age>=2?1.9:1.6;s+=L(`M${50-ex-3} ${ey-4.4} Q${50-ex} ${ey-6} ${50-ex+3} ${ey-4.8}`,o.brow||hcD,bw)+L(`M${50+ex-3} ${ey-4.8} Q${50+ex} ${ey-6} ${50+ex+3} ${ey-4.4}`,o.brow||hcD,bw);
 s+=L(`M50 ${ey+1.5} Q48.6 ${ey+6.5} 50.6 ${ey+7.3}`,skD,1.1);
 s+=C(50-ex-1.5,ey+6,2.6,'#e88a8a',{opacity:.18})+C(50+ex+1.5,ey+6,2.6,'#e88a8a',{opacity:.18});
 const mo=o.mouth||'smile';
 s+=mo==='flat'?L(`M46.5 ${ey+11} L53.5 ${ey+11}`,'#7d4134',1.3):mo==='grin'?P(`M45.5 ${ey+10} Q50 ${ey+15} 54.5 ${ey+10} Z`,'#7d4134')+P(`M46.6 ${ey+10.3} Q50 ${ey+11.6} 53.4 ${ey+10.3} Z`,'#fff'):L(`M46 ${ey+10.2} Q50 ${ey+13} 54 ${ey+10.2}`,'#7d4134',1.3);
 if(o.lip)s+=L(`M46.5 ${ey+10.4} Q50 ${ey+12.6} 53.5 ${ey+10.4}`,o.lip,1.6,{opacity:.75});
 if(age>=1)s+=L(`M${50-ex-4.4} ${ey+1.6} l-1.4 1`,skD,0.7)+L(`M${50+ex+4.4} ${ey+1.6} l1.4 1`,skD,0.7);
 if(age>=2)s+=L(`M43 ${fy-12} Q50 ${fy-13} 57 ${fy-12} M44.5 ${fy-9.5} Q50 ${fy-10.5} 55.5 ${fy-9.5}`,skD,0.6)+L(`M${50-7} ${ey+9} q-1.5 2 -0.5 4 M${50+7} ${ey+9} q1.5 2 0.5 4`,skD,0.7);
 if(o.freckles)for(let i=0;i<6;i++)s+=C(44+(i%3)*2.4+(i>2?9.6:0),ey+4.4+(i%2),0.45,'#a8693f',{opacity:.7});
 s+=facial(o,hc,fy,fw,chin,ey);
 s+=hairTop(o,hc,hcD,fy,fw,fh);
 if(o.g)s+=glasses(o.g,ey,ex);
 if(o.hat)s+=hat(o.hat,o.hatc,fy,fw,fh);
 if(o.acc&&o.acc.includes('pencil'))s+=L(`M${50+fw-2} ${fy-10} l9 -6`,'#e2b23a',1.6);
 if(o.acc&&o.acc.includes('flower'))s+=C(50-fw+1,fy-12,3,'#e9a3b8')+C(50-fw+1,fy-12,1.2,'#f2d16b');
 return s;
}
function clothes(o,cc,ccD,sk,skD){const t=o.cl||'tee',acc=o.acc||[];let s='';
 const V=(d)=>P(`M41 71 L50 ${d} L59 71 Z`,sk);
 if(t==='tee')s+=P('M41 70.5 Q50 76 59 70.5 Q50 73 41 70.5 Z',ccD);
 if(t==='shirt'||t==='flannel'||t==='western'){s+=V(80)+P('M41 70 L47 78 L44 82 L37 73 Z',sh(cc,0.15))+P('M59 70 L53 78 L56 82 L63 73 Z',sh(cc,0.15))+L('M50 80 L50 100',ccD,0.8);
  if(t==='flannel')for(let i=0;i<6;i++)s+=L(`M${14+i*14} 78 L${14+i*14} 100`,ccD,1.6,{opacity:.55})+L(`M10 ${84+i*5} L90 ${84+i*5}`,ccD,1.2,{opacity:.4});
  if(t==='western')s+=L('M24 80 Q36 84 44 79 M76 80 Q64 84 56 79',sh(cc,0.3),1.4)+C(50,85,0.9,'#e8e1d0')+C(50,91,0.9,'#e8e1d0')}
 if(t==='suit'||t==='blazer'){const inner=t==='suit'?'#f4f2ee':(o.ic?CLOTH[o.ic]||o.ic:'#f4f2ee');s+=P('M40 71 L50 92 L60 71 Z',inner)+P('M40 71 L46 90 L37 96 L30 76 Z',sh(cc,0.08))+P('M60 71 L54 90 L63 96 L70 76 Z',sh(cc,0.08));
  if(t==='suit')s+=P('M48.6 74 L51.4 74 L52.4 88 L50 92 L47.6 88 Z',o.tie?CLOTH[o.tie]||o.tie:'#a8352c')}
 if(t==='dress')s+=P('M40 71 Q50 84 60 71 Z',sk)+L('M40 71 Q50 84 60 71',ccD,1);
 if(t==='scrubs')s+=V(84)+L('M41 71 L50 84 L59 71',ccD,1.2);
 if(t==='labcoat')s+=P('M41 71 L50 86 L59 71 Z',o.ic?CLOTH[o.ic]:'#7fa9cf')+P('M8 100 Q11 76 33 71 L44 98 L44 100 Z','#f6f6f4')+P('M92 100 Q89 76 67 71 L56 98 L56 100 Z','#f6f6f4')+L('M33 71 L44 98 M67 71 L56 98','#d6d6d2',1);
 if(t==='apron')s+=P('M41 70.5 Q50 76 59 70.5 Q50 73 41 70.5 Z',ccD)+P('M36 100 L37 82 Q50 79 63 82 L64 100 Z',o.ac?CLOTH[o.ac]||o.ac:'#f2eee6')+L('M38 82 L42 71 M62 82 L58 71',o.ac?CLOTH[o.ac]||o.ac:'#f2eee6',2);
 if(t==='uniform')s+=P('M41 70 L47 78 L44 82 L37 73 Z',ccD)+P('M59 70 L53 78 L56 82 L63 73 Z',ccD)+V(79)+R(26,84,9,3,ccD,{rx:1});
 if(t==='clergy')s+=P('M41 70.5 L50 73 L59 70.5 L59 74 L50 76 L41 74 Z','#26272b')+R(48,72,4,3.6,'#f6f6f4',{rx:0.6});
 if(t==='robe')s+=P('M30 74 L60 100 L44 100 L24 80 Z',o.ac?CLOTH[o.ac]:'#e0a33a')+P('M70 74 L46 100 L58 100 L78 80 Z',sh(cc,-0.1));
 if(t==='hoodie')s+=P('M34 72 Q50 86 66 72 Q60 70 50 74 Q40 70 34 72 Z',ccD)+L('M46 80 L45 90 M54 80 L55 90','#eee',0.9);
 if(t==='vest')s+=V(82)+P('M41 71 L47 80 L45 100 L30 100 L33 72 Z',o.ac?CLOTH[o.ac]:'#3f4247')+P('M59 71 L53 80 L55 100 L70 100 L67 72 Z',o.ac?CLOTH[o.ac]:'#3f4247');
 if(t==='sweater')s+=P('M40 71 Q50 79 60 71 Q50 76 40 71 Z',ccD)+L('M14 92 L86 92',ccD,1,{opacity:.4});
 if(t==='overalls')s+=P('M41 70.5 Q50 76 59 70.5 Q50 73 41 70.5 Z',ccD)+P('M37 100 L38 84 L62 84 L63 100 Z',o.ac?CLOTH[o.ac]:'#4d6a8e')+L('M39 84 L41 71 M61 84 L59 71',o.ac?CLOTH[o.ac]:'#4d6a8e',2.4)+C(41,84,1,'#d6b26a')+C(59,84,1,'#d6b26a');
 if(acc.includes('badge'))s+=P('M30 86 l1.6 3.2 3.4 .4 -2.5 2.4 .7 3.4 -3.2 -1.7 -3.2 1.7 .7 -3.4 -2.5 -2.4 3.4 -.4 Z','#e3c15a',{stroke:'#a8862a',stroke_width:0.4});
 if(acc.includes('stethoscope'))s+=L('M43 72 Q38 86 44 92 Q50 96 56 92 Q62 86 57 72','#3a3d42',1.4)+C(50,96,2.2,'#a7b0ba');
 if(acc.includes('necklace'))s+=L('M43 72 Q50 81 57 72','#e3c15a',0.9)+C(50,80.4,1.4,'#e3c15a');
 if(acc.includes('cross'))s+=L('M43 72 Q50 81 57 72','#c9c6c2',0.8)+L('M50 79.5 L50 85 M48.2 81.3 L51.8 81.3','#c9c6c2',1.1);
 if(acc.includes('mala'))for(let i=0;i<13;i++){const t2=Math.PI*(0.15+i*0.054);s+=C(50+12*Math.cos(t2+Math.PI*0.5)*-1,72+11*Math.sin(t2),1.1,'#7a3b22')}
 if(acc.includes('scarf'))s+=P('M36 72 Q50 82 64 72 L66 77 Q50 87 34 77 Z',o.sc?CLOTH[o.sc]||o.sc:'#c45d74')+P('M56 79 L60 92 L55 93 L52 81 Z',o.sc?CLOTH[o.sc]||o.sc:'#c45d74');
 if(acc.includes('bandana'))s+=P('M38 71 Q50 80 62 71 L50 86 Z',o.sc?CLOTH[o.sc]||o.sc:'#a8352c');
 if(acc.includes('bolo'))s+=L('M45 71 L49 86 M55 71 L51 86','#26272b',0.8)+C(50,82,2.2,'#7fb3b0',{stroke:'#c9c6c2',stroke_width:0.6});
 if(acc.includes('camera'))s+=R(58,86,12,8,'#26272b',{rx:1.5})+C(64,90,2.6,'#5d6a76');
 return s}
function facial(o,hc,fy,fw,chin,ey){const t=o.fh;if(!t)return '';const c=o.fhc?HAIR[o.fhc]||o.fhc:hc;let s='';
 if(t==='stubble')for(let i=0;i<22;i++){const x=50-9+(i%11)*1.8,y=ey+10+(i<11?2.5:5.5)+(i%2);s+=C(x,y,0.35,c,{opacity:.55})}
 if(t==='mustache'||t==='beard'||t==='goatee'||t==='full')s+=P(`M44.6 ${ey+9.6} Q50 ${ey+7.2} 55.4 ${ey+9.6} Q53 ${ey+10.6} 50 ${ey+9.4} Q47 ${ey+10.6} 44.6 ${ey+9.6} Z`,c);
 if(t==='beard'||t==='full')s+=P(`M${50-fw+0.8} ${fy+3} Q${50-fw+2} ${chin+(t==='full'?3:0)} 50 ${chin+(t==='full'?5:2)} Q${50+fw-2} ${chin+(t==='full'?3:0)} ${50+fw-0.8} ${fy+3} Q${50+fw-4} ${ey+14} 50 ${ey+13.4} Q${50-fw+4} ${ey+14} ${50-fw+0.8} ${fy+3} Z`,c);
 if(t==='goatee')s+=P(`M46.6 ${ey+12.6} Q50 ${ey+12} 53.4 ${ey+12.6} Q53 ${chin+1.5} 50 ${chin+2} Q47 ${chin+1.5} 46.6 ${ey+12.6} Z`,c);
 return s}
function hairTop(o,hc,hcD,fy,fw,fh){const t=o.h||'short',top=fy-fh;let s='';
 const cap=(dy,side)=>P(`M${50-fw-1.5} ${fy-1+(side||0)} Q${50-fw-2} ${top-2+dy} 50 ${top-3+dy} Q${50+fw+2} ${top-2+dy} ${50+fw+1.5} ${fy-1+(side||0)} Q${50+fw-1} ${fy-9} ${50+fw-6} ${fy-11} Q50 ${fy-15} ${50-fw+6} ${fy-11} Q${50-fw+1} ${fy-9} ${50-fw-1.5} ${fy-1+(side||0)} Z`,hc);
 if(t==='short'||t==='side'||t==='slick'||t==='pixie'||t==='curly'){s+=cap(0);
  if(t==='side')s+=P(`M${50-fw+3} ${fy-11} Q${50-4} ${top+2} ${50+fw-1} ${fy-9} Q${50+2} ${fy-13} ${50-fw+3} ${fy-11} Z`,hc)+L(`M${50-5} ${top-1} Q${50-6} ${fy-12} ${50-8} ${fy-11}`,hcD,0.7);
  if(t==='slick')s+=L(`M${50-fw+3} ${fy-12} Q50 ${top} ${50+fw-3} ${fy-12} M${50-fw+5} ${fy-15} Q50 ${top-1} ${50+fw-5} ${fy-15}`,hcD,0.7);
  if(t==='curly')for(let i=0;i<9;i++)s+=C(50-fw+2+i*(fw*2-4)/8,fy-12-(i%2)*2-Math.sin(i/8*Math.PI)*5,3.2,hc);
  if(t==='pixie')s+=P(`M${50-fw} ${fy-6} Q${50-fw-1} ${fy+2} ${50-fw+1} ${fy+4} L${50-fw+2} ${fy-8} Z`,hc)}
 if(t==='buzz')s+=P(`M${50-fw+0.5} ${fy-5} Q${50-fw} ${top+1} 50 ${top} Q${50+fw} ${top+1} ${50+fw-0.5} ${fy-5} Q50 ${fy-13} ${50-fw+0.5} ${fy-5} Z`,hc,{opacity:.85});
 if(t==='balding')s+=P(`M${50-fw-1} ${fy+1} Q${50-fw-1.5} ${fy-9} ${50-fw+3} ${fy-12} L${50-fw+3} ${fy-6} Q${50-fw+1} ${fy-2} ${50-fw+1} ${fy+2} Z`,hc)+P(`M${50+fw+1} ${fy+1} Q${50+fw+1.5} ${fy-9} ${50+fw-3} ${fy-12} L${50+fw-3} ${fy-6} Q${50+fw-1} ${fy-2} ${50+fw-1} ${fy+2} Z`,hc);
 if(t==='afro')s+=P(`M${50-fw+2} ${fy-9} Q50 ${fy-15} ${50+fw-2} ${fy-9} Q50 ${fy-12} ${50-fw+2} ${fy-9} Z`,hcD,{opacity:.4});
 if(t==='long'||t==='wavy'||t==='straight'||t==='bob'||t==='ponytail'||t==='bun'||t==='bun_low'||t==='braids'||t==='curly_long'||t==='locs'){
  s+=P(`M${50-fw-2.5} ${fy+(t==='bob'?8:4)} Q${50-fw-3} ${top-3} 50 ${top-3.5} Q${50+fw+3} ${top-3} ${50+fw+2.5} ${fy+(t==='bob'?8:4)} Q${50+fw-1} ${fy-7} ${50+fw-5} ${fy-11} Q${50+2} ${fy-16} ${50-3} ${fy-13} Q${50-fw+3} ${fy-11} ${50-fw+1} ${fy-4} Q${50-fw} ${fy} ${50-fw-0.5} ${fy+(t==='bob'?8:4)} Z`,hc);
  if(t==='bob')s+=P(`M${50+fw+2.5} ${fy+8} Q${50+fw+2} ${fy+12} ${50+fw-2} ${fy+12} L${50+fw-1} ${fy} Z M${50-fw-2.5} ${fy+8} Q${50-fw-2} ${fy+12} ${50-fw+2} ${fy+12} L${50-fw+1} ${fy} Z`,hc);
  if(t==='bun')s+=C(50,top-5,6,hc)+L(`M45 ${top-3} Q50 ${top-1} 55 ${top-3}`,hcD,0.6);
  if(t==='ponytail')s+=P(`M${50+fw} ${fy-12} Q${50+fw+11} ${fy-6} ${50+fw+6} ${fy+16} Q${50+fw+3} ${fy+4} ${50+fw-1} ${fy-6} Z`,hc);
  if(t==='braids')s+=[-1,1].map(d=>{let b='';for(let i=0;i<5;i++)b+=E(50+d*(fw+2.6),fy+6+i*5.2,2.6,3,hc,{stroke:hcD,stroke_width:0.5});return b}).join('');
  if(t==='bun_low')s+=C(50+fw-2,fy+10,5,hc)}
 return s}
function glasses(g,ey,ex){const c=g==='gold'?'#c9a24a':g==='clear'?'#9aa3ad':'#26272b';
 if(g==='round')return C(50-ex,ey,4,'none',{stroke:c,stroke_width:1})+C(50+ex,ey,4,'none',{stroke:c,stroke_width:1})+L(`M${50-ex+4} ${ey} Q50 ${ey-1.4} ${50+ex-4} ${ey}`,c,0.9);
 return R(50-ex-4.4,ey-3.1,8.8,6.2,'rgba(255,255,255,.12)',{rx:1.6,stroke:c,stroke_width:g==='thick'?1.6:1})+R(50+ex-4.4,ey-3.1,8.8,6.2,'rgba(255,255,255,.12)',{rx:1.6,stroke:c,stroke_width:g==='thick'?1.6:1})+L(`M${50-ex+4.4} ${ey-0.6} L${50+ex-4.4} ${ey-0.6}`,c,1)}
function hat(t,col,fy,fw,fh){const top=fy-fh,c=col?(CLOTH[col]||col):null;
 if(t==='cowboy'||t==='straw'){const k=c||(t==='straw'?'#dcc183':'#8a6038'),kd=sh(k,-0.2);
  return E(50,top+5,fw+15,4.6,kd)+P(`M${50-fw+1} ${top+5} Q${50-fw} ${top-11} ${50-4} ${top-9} Q50 ${top-6} ${50+4} ${top-9} Q${50+fw} ${top-11} ${50+fw-1} ${top+5} Z`,k)+R(50-fw+1.4,top+0.5,fw*2-2.8,3,t==='straw'?'#7a4526':sh(k,-0.4))+E(50,top+5.6,fw+14,3,k,{opacity:.9})}
 if(t==='cap'){const k=c||'#2c5aa0';return P(`M${50-fw-1} ${fy-6} Q${50-fw} ${top-5} 50 ${top-5} Q${50+fw} ${top-5} ${50+fw+1} ${fy-6} Z`,k)+P(`M${50-fw-1} ${fy-6} Q50 ${fy-10} ${50+fw+10} ${fy-5} Q${50+fw+6} ${fy-2.5} ${50+fw-2} ${fy-4.5} Q50 ${fy-7} ${50-fw-1} ${fy-4} Z`,sh(k,-0.2))+C(50,top-4.6,1.2,sh(k,-0.3))}
 if(t==='beanie'){const k=c||'#a8352c';return P(`M${50-fw-1} ${fy-5} Q${50-fw} ${top-6} 50 ${top-7} Q${50+fw} ${top-6} ${50+fw+1} ${fy-5} Z`,k)+R(50-fw-1.5,fy-8,fw*2+3,4,sh(k,-0.2),{rx:1.5})}
 if(t==='hardhat'){const k=c||'#e0a33a';return P(`M${50-fw-1} ${fy-7} Q${50-fw} ${top-5} 50 ${top-5} Q${50+fw} ${top-5} ${50+fw+1} ${fy-7} Z`,k)+E(50,fy-7,fw+5,2.2,sh(k,-0.15))}
 if(t==='kufi'){const k=c||'#f4f2ee';return P(`M${50-fw+1} ${fy-9} Q${50-fw+1} ${top-4} 50 ${top-4.5} Q${50+fw-1} ${top-4} ${50+fw-1} ${fy-9} Z`,k,{stroke:sh(k,-0.12),stroke_width:0.6})}
 if(t==='visor'){const k=c||'#2f7470';return R(50-fw-1,fy-12,fw*2+2,3,k,{rx:1.4})+P(`M${50-fw} ${fy-9.5} Q50 ${fy-6} ${50+fw+8} ${fy-8} L${50+fw} ${fy-10} Z`,sh(k,-0.2))}
 return ''}
const SV=(inner,cls)=>`<svg class="art art-face ${cls||''}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><clipPath id="fc"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#fc)">${inner}</g></svg>`;
return {face,SV};
})();

/* ---------- who looks like what ---------- */
const FACE={
 // romance options
 lucia:{sk:3,h:'ponytail',hc:'dark',cl:'flannel',cc:'red',acc:['earrings'],bgi:3},
 jolene:{sk:1,h:'wavy',hc:'auburn',cl:'western',cc:'denim',freckles:1,lip:'#b4545e',bgi:1},
 savannah:{sk:1,h:'bob',hc:'blonde',cl:'blouse',cc:'sky',acc:['flower'],lip:'#c45d74',bgi:2},
 clara:{sk:0,h:'bun',hc:'chestnut',g:'round',cl:'sweater',cc:'mustard',bgi:5},
 hannah:{sk:0,h:'straight',hc:'platinum',cl:'labcoat',ic:'teal',acc:['stethoscope'],bgi:6},
 brooke:{sk:2,h:'braids',hc:'ash',hat:'cowboy',hatc:'tan',cl:'western',cc:'rose',bgi:1},
 megan:{sk:0,h:'long',hc:'red',cl:'dress',cc:'blue',acc:['cross'],freckles:1,bgi:4},
 colleen:{sk:1,h:'curly_long',hc:'auburn',g:'square',cl:'blazer',cc:'olive',ic:'cream',acc:['pencil'],bgi:0},
 wade:{sk:2,h:'short',hc:'brown',fh:'stubble',hat:'cowboy',hatc:'brown',cl:'flannel',cc:'olive',mouth:'flat',age:1,bgi:5},
 ashley:{sk:0,h:'ponytail',hc:'blonde',cl:'hoodie',cc:'maroon',acc:['earrings'],bgi:2},
 ines:{sk:1,h:'long',hc:'dark',cl:'blazer',cc:'black',ic:'white',acc:['earrings'],lip:'#a8352c',bgi:6},
 roz:{sk:1,h:'bun_low',hc:'brown',g:'thick',hat:'hardhat',cl:'shirt',cc:'khaki',bgi:7},
 kyle:{sk:1,h:'side',hc:'blonde',fh:'stubble',cl:'tee',cc:'charcoal',bgi:0},
 delphine:{sk:1,h:'bob',hc:'black',g:'thick',cl:'blouse',cc:'white',lip:'#a8352c',acc:['earrings'],bgi:3},
 grace:{sk:1,h:'bob',hc:'chestnut',cl:'suit',cc:'navy',tie:'navy',acc:['earrings'],lip:'#7a3b3b',bgi:4},
 maya:{sk:2,h:'long',hc:'black',cl:'sweater',cc:'teal',g:'round',bgi:6},
 // San Luís regulars
 earl:{sk:1,h:'balding',hc:'white',fh:'mustache',fhc:'white',hat:'cowboy',hatc:'tan',cl:'western',cc:'brown',age:2,bgi:5},
 albertina:{sk:1,h:'bun',hc:'silver',cl:'sweater',cc:'navy',acc:['cross'],g:'gold',age:2,bgi:3},
 dale:{sk:0,h:'side',hc:'gray',g:'square',cl:'suit',cc:'charcoal',tie:'blue',age:2,bgi:0},
 travis:{sk:1,h:'slick',hc:'brown',cl:'blazer',cc:'tan',ic:'white',acc:['bolo'],mouth:'grin',age:1,bgi:7},
 beto:{sk:5,h:'short',hc:'gray',fh:'mustache',fhc:'gray',hat:'cowboy',hatc:'brown',cl:'western',cc:'denim',age:2,bgi:1},
 marisol:{sk:5,h:'bun',hc:'black',cl:'apron',cc:'teal',ac:'white',acc:['earrings'],age:1,bgi:3},
 p1_hollis:{sk:1,h:'balding',hc:'silver',g:'square',cl:'apron',cc:'shirt',ac:'red',age:2,bgi:5},
 p1_irene:{sk:0,h:'pixie',hc:'white',g:'gold',cl:'blazer',cc:'purple',ic:'cream',acc:['necklace'],age:2,bgi:4},
 p1_bea:{sk:1,h:'bob',hc:'dark',g:'thick',cl:'sweater',cc:'rust',bgi:6},
 p1_ruthann:{sk:1,h:'curly',hc:'silver',cl:'shirt',cc:'pink',age:2,bgi:2},
 p1_ray:{sk:1,h:'buzz',hc:'white',hat:'cap',hatc:'navy',cl:'shirt',cc:'khaki',age:2,mouth:'flat',bgi:0},
 p1_deshawn:{sk:1,h:'side',hc:'brown',freckles:1,cl:'tee',cc:'orange',mouth:'grin',bgi:1},
 // p4 neighbours
 p4_carmen:{sk:3,h:'bun',hc:'dark',cl:'apron',cc:'pink',ac:'white',acc:['earrings','cross'],age:1,bgi:3},
 p4_isabel:{sk:3,h:'ponytail',hc:'black',cl:'scrubs',cc:'sky',bgi:6},
 p4_tomas:{sk:5,h:'short',hc:'white',fh:'mustache',fhc:'white',hat:'straw',cl:'western',cc:'cream',age:2,bgi:5},
 p4_ortega:{sk:4,h:'short',hc:'black',g:'square',cl:'clergy',cc:'black',bgi:0},
 p4_meiling:{sk:2,h:'bob',hc:'gray',cl:'apron',cc:'red',ac:'cream',g:'gold',age:2,bgi:1},
 p4_kevin:{sk:2,h:'side',hc:'black',g:'thick',cl:'shirt',cc:'sky',bgi:6},
 // p5
 p5_ramiro:{sk:5,h:'short',hc:'gray',fh:'mustache',fhc:'dark',cl:'overalls',cc:'gray',ac:'navy',age:1,bgi:7},
 p5_jc:{sk:3,h:'buzz',hc:'black',fh:'goatee',cl:'uniform',cc:'navy',acc:['badge'],bgi:0},
 p5_lola:{sk:2,h:'bun',hc:'dark',g:'round',cl:'blazer',cc:'maroon',ic:'cream',acc:['necklace'],age:1,bgi:4},
 p5_vicky:{sk:1,h:'wavy',hc:'chestnut',cl:'blazer',cc:'white',ic:'black',acc:['earrings'],lip:'#b4545e',bgi:2},
 p5_patty:{sk:5,h:'ponytail',hc:'black',hat:'visor',hatc:'red',cl:'tee',cc:'mustard',bgi:5},
 p5_angel:{sk:3,h:'side',hc:'black',fh:'mustache',cl:'western',cc:'black',acc:['bolo'],bgi:3},
 // p6
 p6_esperanza:{sk:2,h:'bun',hc:'black',cl:'western',cc:'black',acc:['earrings','bandana'],sc:'red',lip:'#a8352c',bgi:3},
 p6_arturo:{sk:5,h:'short',hc:'gray',g:'round',cl:'apron',cc:'cream',ac:'brown',age:2,bgi:7},
 p6_alicia:{sk:1,h:'straight',hc:'dark',cl:'suit',cc:'navy',tie:'blue',acc:['earrings'],bgi:0},
 p6_emilio:{sk:6,h:'curly',hc:'gray',fh:'beard',fhc:'gray',hat:'cap',hatc:'white',cl:'tee',cc:'sky',age:2,bgi:6},
 p6_marta:{sk:2,h:'bob',hc:'dark',g:'square',cl:'blazer',cc:'teal',ic:'white',acc:['necklace'],age:1,bgi:4},
 p6_carlos:{sk:4,h:'buzz',hc:'black',fh:'stubble',cl:'tee',cc:'charcoal',acc:['bandana'],sc:'navy',bgi:7},
 // p7
 p7_zeke:{sk:8,h:'balding',hc:'gray',fh:'beard',fhc:'gray',g:'gold',cl:'clergy',cc:'charcoal',age:2,bgi:1},
 p7_angela:{sk:8,h:'curly',hc:'white',g:'gold',cl:'blazer',cc:'purple',ic:'cream',acc:['necklace','earrings'],age:2,bgi:4},
 p7_naomi:{sk:0,h:'bun_low',hc:'auburn',g:'square',cl:'labcoat',ic:'navy',acc:['badge'],bgi:6},
 p7_marcus:{sk:9,h:'buzz',hc:'black',fh:'goatee',hat:'cowboy',hatc:'black',cl:'western',cc:'rust',bgi:5},
 p7_wei:{sk:2,h:'short',hc:'black',g:'square',hat:'cap',hatc:'maroon',cl:'shirt',cc:'khaki',age:1,bgi:2},
 p7_xiuying:{sk:2,h:'pixie',hc:'white',g:'gold',cl:'sweater',cc:'teal',acc:['necklace'],age:2,bgi:3},
 // p8 — the family in Waco
 p8_tenzin:{sk:4,h:'short',hc:'black',fh:'stubble',cl:'vest',cc:'shirt',ac:'maroon',age:1,bgi:5},
 p8_dolma:{sk:4,h:'braids',hc:'black',cl:'apron',cc:'maroon',ac:'saffron',acc:['earrings','necklace'],bgi:1},
 p8_tsering:{sk:3,h:'long',hc:'black',cl:'hoodie',cc:'green',acc:['camera'],bgi:6},
 p8_lobsang:{sk:5,h:'buzz',hc:'silver',g:'round',cl:'robe',cc:'maroon',ac:'saffron',acc:['mala'],age:2,bgi:7},
 // p9
 p9_gao:{sk:3,h:'short',hc:'black',g:'thick',cl:'flannel',cc:'navy',age:1,bgi:2},
 p9_ma:{sk:3,h:'short',hc:'black',fh:'stubble',hat:'cap',hatc:'teal',cl:'tee',cc:'navy',bgi:0},
 // around Texas
 ofelia:{sk:2,h:'short',hc:'white',cl:'tee',cc:'teal',g:'round',age:2,bgi:6},
 june:{sk:0,h:'braids',hc:'ash',hat:'straw',cl:'overalls',cc:'cream',ac:'denim',freckles:1,age:1,bgi:2},
 walt:{sk:0,h:'balding',hc:'white',fh:'full',fhc:'white',cl:'vest',cc:'white',ac:'brown',age:2,bgi:5},
 hutchins:{pair:[{sk:1,h:'short',hc:'brown',fh:'mustache',hat:'cap',hatc:'red',cl:'tee',cc:'denim',age:1},{sk:1,h:'curly',hc:'ash',cl:'shirt',cc:'pink',acc:['earrings'],age:1}],bgi:7},
 otis:{sk:1,h:'balding',hc:'gray',fh:'mustache',fhc:'gray',hat:'cap',hatc:'navy',cl:'uniform',cc:'gray',f:'n',age:2,bgi:0},
 gabi:{sk:2,h:'bun_low',hc:'black',hat:'cowboy',hatc:'cream',cl:'uniform',cc:'tan',acc:['badge'],bgi:7},
 maricela:{sk:2,h:'wavy',hc:'dark',g:'square',cl:'blazer',cc:'rust',ic:'cream',acc:['earrings'],age:1,bgi:3},
 nora:{sk:1,h:'braids',hc:'brown',hat:'cowboy',hatc:'khaki',cl:'uniform',cc:'khaki',acc:['badge'],bgi:2},
 wes:{sk:1,h:'curly',hc:'brown',fh:'stubble',cl:'flannel',cc:'teal',bgi:5},
 dusty:{sk:1,h:'short',hc:'gray',fh:'mustache',fhc:'gray',hat:'cowboy',hatc:'white',cl:'western',cc:'sky',acc:['bolo'],age:2,bgi:1},
 quim:{sk:1,h:'balding',hc:'white',fh:'beard',fhc:'white',hat:'beanie',hatc:'navy',cl:'sweater',cc:'navy',age:2,bgi:6},
 dani:{sk:2,h:'ponytail',hc:'brown',hat:'cap',hatc:'teal',cl:'tee',cc:'sky',freckles:1,bgi:6},
 rosaelena:{sk:4,h:'bun',hc:'black',cl:'apron',cc:'orange',ac:'white',acc:['earrings'],age:1,bgi:3},
 chuy:{sk:5,h:'short',hc:'white',fh:'beard',fhc:'white',hat:'cap',hatc:'green',cl:'flannel',cc:'red',age:2,bgi:7},
 etta:{sk:8,h:'curly',hc:'gray',hat:'straw',cl:'apron',cc:'denim',ac:'cream',acc:['earrings'],age:2,bgi:1},
 vivian:{sk:0,h:'bun',hc:'silver',cl:'dress',cc:'purple',acc:['necklace'],age:2,bgi:4},
 bento:{sk:3,h:'balding',hc:'dark',fh:'mustache',cl:'shirt',cc:'green',age:2,mouth:'grin',bgi:2},
 duarte:{sk:1,h:'curly',hc:'dark',fh:'beard',g:'round',cl:'sweater',cc:'gray',bgi:0},
 clyde:{sk:1,h:'balding',hc:'white',g:'thick',hat:'cowboy',hatc:'brown',cl:'western',cc:'red',acc:['bolo'],age:2,bgi:5},
 jesse:{sk:3,h:'buzz',hc:'black',hat:'cap',hatc:'orange',cl:'tee',cc:'gray',bgi:7},
 waltk:{sk:1,h:'balding',hc:'silver',g:'gold',hat:'cowboy',hatc:'tan',cl:'vest',cc:'white',ac:'tan',age:2,bgi:1},
 ada:{sk:0,h:'curly_long',hc:'red',g:'round',cl:'sweater',cc:'mustard',freckles:1,bgi:4},
 lupe:{sk:5,h:'braids',hc:'gray',hat:'straw',cl:'shirt',cc:'khaki',age:2,bgi:7},
 lorraine:{sk:2,h:'curly',hc:'silver',g:'square',cl:'blouse',cc:'teal',acc:['necklace'],age:2,bgi:6},
 ambrose:{sk:1,h:'short',hc:'white',fh:'mustache',fhc:'white',hat:'straw',cl:'overalls',cc:'white',ac:'olive',age:2,bgi:2},
 tessa:{sk:1,h:'ponytail',hc:'chestnut',cl:'flannel',cc:'maroon',freckles:1,bgi:5},
 chayo:{sk:5,h:'bun',hc:'white',hat:'straw',cl:'shirt',cc:'cream',acc:['earrings'],age:2,bgi:2},
 // not in NPCS but appear in scenes
 pruitt:{sk:1,h:'short',hc:'brown',fh:'mustache',hat:'cowboy',hatc:'cream',cl:'uniform',cc:'tan',acc:['badge'],age:1,mouth:'flat',bgi:7}
};
// 'blouse' renders like a dress neckline with a collar
const facePrep=o=>{const p=Object.assign({},o);if(p.cl==='blouse')p.cl='shirt';if(p.cc==='shirt')p.cc='sky';return p};
function npcFace(id,cls){const o=FACE[id];if(!o)return '';
 if(o.pair){const bg=['#e6eef7','#f3e6da','#e4efe4','#f2e3e8','#ece8f4','#f5eedb','#e1eef0','#efe6dc'][o.bgi||0];
  return FACES.SV(`<circle cx="50" cy="50" r="50" fill="${bg}"/><g transform="translate(-6 18) scale(.72)">${FACES.face(Object.assign(facePrep(o.pair[1]),{nobg:1}))}</g><g transform="translate(34 14) scale(.76)">${FACES.face(Object.assign(facePrep(o.pair[0]),{nobg:1}))}</g>`,cls)}
 return FACES.SV(FACES.face(facePrep(o)),cls)}

/* ---------- put the portrait on scenes that belong to a person ---------- */
// which character an action is about: its id (p4_carmen, talk-lucia, p7_arc_zeke…) or the person's name in its label
function actNpc(a){if(!a||!a.id)return null;const id=String(a.id);
 for(const k of [id,id.replace(/^talk-/,''),id.replace('_arc_','_')])if(NPCS[k]&&FACE[k])return k;
 if(a.person)return null;
 const lab=res(a.n||'','zh');let best=null,len=0;
 for(const k in NPCS){if(!FACE[k])continue;const n=NPCS[k];for(const nm of [n.n&&n.n[0],n.s&&n.s[0]]){if(nm&&nm.length>=2&&lab.includes(nm)&&nm.length>len){best=k;len=nm.length}}}
 if(!best&&/普鲁伊特警长/.test(lab))best='pruitt';
 return best}
{const da0=doAction;doAction=function(a){const nid=actNpc(a);if(nid&&a.run&&!a._face){const r=a.run;a=Object.assign({},a,{_face:1,run:()=>{const sc=r();if(sc&&!sc.art)sc.art=npcFace(nid);return sc}})}return da0(a)}}
{const m0=meetScene;meetScene=function(id){const sc=m0(id);if(sc&&!sc.art)sc.art=npcFace(id);return sc}}
{const t0=talkScene;talkScene=function(id){const sc=t0(id);if(sc&&!sc.art)sc.art=npcFace(id);return sc}}
if(typeof truthScene==='function'){const u0=truthScene;truthScene=function(id){const sc=u0(id);if(sc&&!sc.art)sc.art=npcFace(id);return sc}}
