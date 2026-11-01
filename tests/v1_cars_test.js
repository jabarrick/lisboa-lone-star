// Vehicles (engine VEHICLES + story/v1_cars.js): migration, buying/trade-in/selling, gas, upkeep, breakdowns, charm, food truck, service.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok  ',m)};
const walk=sc=>{for(const L of ['zh','en','pt']){res(sc.title,L);sc.text.forEach(x=>{const s=res(x,L);if(L!=='zh'&&/[\\u4e00-\\u9fff\\uff08\\uff09]/.test(s)){bad++;console.log('CJK in',L,s)}});(sc.choices||[]).forEach(c=>res(c.t,L))}};
const fresh=()=>{S=newState('T','中');S.week=10;S.cash=20000;S.course.drive=2;queue=[];cur=null};
// migration from an old save that bought the pickup as an upgrade
fresh();S.up.pickup=5;delete S.car;ensureState(S);chk(S.car==='pickup'&&!S.up.pickup,'old pickup upgrade migrates to S.car');
chk(!('pickup' in UPG),'pickup is no longer a shop upgrade');
// lot scene, buy the sedan
fresh();const lot=EXTRA_LOCS.find(l=>l.id==='v1_lot');const look=lot.acts.find(a=>a.id==='v1_look');
let sc=look.run();walk(sc);chk(sc.choices.length===Object.keys(VEHICLES).length+1,'lot lists every vehicle + just looking');
let pk=sc.choices[0].next();walk(pk);pk.choices[0].fx();walk(pk.choices[0].next());
chk(S.car==='sedan'&&S.cash===20000-1200,'bought the sedan for $1200');
const austin=CITIES.austin;chk(fare(austin)===Math.round(austin.miles*2*0.09),'sedan gas price used in fares');
// trade in for the new truck
sc=look.run();walk(sc);const nt=sc.choices.find(c=>/New pickup/.test(res(c.t,'en')));const cash0=S.cash,rep0=S.rep;
const ntS=nt.next();ntS.choices[0].fx();chk(S.car==='newtruck'&&cash0-S.cash===9800-600&&S.rep===rep0+3,'trade-in: new truck costs 9800-600, rep +3');
chk(charmBonus()>=4,'new truck adds charm');
// upkeep in the weekly settlement
let c1=S.cash;S.wk={rev:0,spend:0,happy:0,orders:0,trains:0,talks:0,hosts:0};S.staff=[];weekly();chk(c1-S.cash===250+35,'weekly upkeep $35 for the new truck');
chk(res(queue.find(q=>/Week \\d+ closing/.test(res(q.title,'en'))).text[0],'zh').includes('车辆保险与保养 $35'),'settlement text shows the upkeep');
// sell
c1=S.cash;sc=look.run();const sell=sc.choices.find(c=>/^Just sell/.test(res(c.t,'en')));sell.fx();chk(!S.car&&S.cash-c1===4900,'selling returns half the price');
chk(fare(austin)===Math.round(12+austin.miles*0.18),'no car → bus fare');
// breakdown on a trip
fresh();S.car='sedan';const R0=Math.random;Math.random=()=>0.01;c1=S.cash;goTrip('austin');Math.random=R0;
const f=fare(austin);chk(c1-S.cash>f+59,'forced breakdown charges a repair on top of gas');walk(cur||queue[0]);
// service halves breakdowns; refused without a car
fresh();const serv=lot.acts.find(a=>a.id==='v1_service');chk(serv.req()!==true,'service needs a car');S.car='pickup';chk(serv.req()===true,'service available with a pickup');
walk(serv.run());chk(S.carServ===S.week&&serv.req()!==true,'service recorded and not repeatable for 6 weeks');
// food truck in a city
fresh();S.car='foodtruck';S.where='austin';S.inv.beef=30;const ft=cityActions().find(a=>a.id==='foodtruck');chk(!!ft,'food truck action in cities');
c1=S.cash;walk(ft.run());chk(S.cash>c1&&ft.req()!==true,'food truck sells once a day');
S.car='pickup';chk(!cityActions().some(a=>a.id==='foodtruck'),'no food truck action with a pickup');
// can't drive yet: owned but lesson < 2
fresh();S.car='moto';S.course.drive=1;chk(!canDrive()&&charmBonus()===accentBonus()+S.muscle*4+S.dress,'owning without lessons: bus, no charm');
walk({title:'',text:[carPanel()]});
console.log(bad?bad+' FAILURES':'CARS OK');`;
eval(js);
