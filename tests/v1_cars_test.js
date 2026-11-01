// Vehicles (engine VEHICLES + story/v1_cars.js): migration, buying/trade-in/selling, gas, upkeep, breakdowns, charm, food truck, service.
const fs=require('fs');const el=()=>({innerHTML:'',classList:{add(){},remove(){}},dataset:{},onclick:null,value:'T'});
global.document={querySelector:()=>el(),querySelectorAll:()=>[],documentElement:{}};global.window={innerWidth:1200,innerHeight:900,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},scrollTo(){},requestAnimationFrame(){}};global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
let js=fs.readFileSync('check.js','utf8').replace(/document\.documentElement\.lang=[^\n]*\ndocument\.title=[^\n]*\nrender\(\);\s*$/,'');
js+=`
let bad=0;const chk=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok  ',m)};
const walk=sc=>{for(const L of ['zh','en','pt']){res(sc.title,L);sc.text.forEach(x=>{const s=res(x,L);if(L!=='zh'&&/[\\u4e00-\\u9fff\\uff08\\uff09]/.test(s)){bad++;console.log('CJK in',L,s)}});(sc.choices||[]).forEach(c=>res(c.t,L))}};
const fresh=()=>{S=newState('T','中');S.week=10;S.cash=20000;S.course.drive=2;queue=[];cur=null};
const priceOf=c=>+res(c.t,'en').split('$')[1].split(' ')[0].split(',').join('');
// data sanity: every listing complete and trilingual
for(const [k,v] of Object.entries(VEHICLES)){chk(v.make.length===3&&v.quirk.length===3&&v.year>=1960&&v.year<=2024&&v.miles>0&&v.cost>0&&v.gas>0&&v.upkeep>0,'listing '+k+' complete');
 if(/[A-Za-z]/.test(v.make[0]+v.quirk[0])){bad++;console.log('LATIN in zh',k)}}
chk(Object.keys(VEHICLES).length>=15,'at least 15 listings');
// migration: v0.9.2 pickup upgrade and v0.9.3 generic ids
fresh();S.up.pickup=5;delete S.car;ensureState(S);chk(S.car==='f150_95'&&!S.up.pickup,'old pickup upgrade migrates to the 1995 F-150');
fresh();S.car='newtruck';ensureState(S);chk(S.car==='f150_19','generic newtruck id migrates');
chk(!('pickup' in UPG),'pickup is no longer a shop upgrade');
// weekly stock
fresh();const st1=EXTRA_LOCS.find(l=>l.id==='v1_lot');const look=st1.acts.find(a=>a.id==='v1_look');
const seen=new Set();for(let w=2;w<=48;w++){S.week=w;const sc=look.run();const n=sc.choices.length-1;chk(n===6,'week '+w+' shows 6 cars');
 const ids=sc.choices.slice(0,6).map(c=>res(c.t,'en'));ids.forEach(x=>seen.add(x));chk(sc.choices.slice(0,6).some(c=>priceOf(c)<=2000),'week '+w+' has a car under $2,000')}
chk(seen.size>=14,'over the year most listings show up ('+seen.size+')');
// buy the cheapest of week 10
fresh();let sc=look.run();walk(sc);let pk=sc.choices[0].next();walk(pk);const cost=priceOf(sc.choices[0]);
pk.choices[0].fx();walk(pk.choices[0].next());const v=CAR();chk(v&&S.cash===20000-cost&&carOdo()===v.miles,'bought the cheapest car, odometer = listing mileage');
const austin=CITIES.austin;chk(fare(austin)===Math.round(austin.miles*2*v.gas),'car gas price used in fares');
// driving adds miles and lowers the trade-in
const tr0=carTrade();goTrip('austin');chk(carOdo()===v.miles+austin.miles*2,'trip adds round-trip miles to the odometer');
cur=null;queue=[];S.where=null;S.carMi=v.miles+20000;chk(carTrade()===Math.round(v.cost*0.5*0.5)&&carTrade()<tr0,'20,000 miles driven halves the trade-in');
S.carMi=v.miles+90000;chk(carTrade()===Math.round(v.cost*0.25),'trade-in floor is a quarter of the price');
// trade in for the 2019 F-150
fresh();S.car='civic98';S.carMi=VEHICLES.civic98.miles;const tr=carTrade();const cash0=S.cash,rep0=S.rep;buyCar('f150_19');S.rep+=3;
chk(S.car==='f150_19'&&cash0-S.cash===13800-tr,'trade-in subtracts from the price');chk(charmBonus()>=4,'2019 F-150 adds charm');
// detail scene + purchase bonus through the scene
fresh();S.week=1;let found=null;for(let w=2;w<=48&&!found;w++){S.week=w;const c=look.run().choices.find(c=>/2019 Ford F-150/.test(res(c.t,'en')));if(c)found=c}
chk(!!found,'the 2019 F-150 shows up some week');if(found){const d=found.next();walk(d);const r0=S.rep;d.choices[0].fx();walk(d.choices[0].next());chk(S.car==='f150_19'&&S.rep===r0+3,'buying it via the lot: rep +3')}
// upkeep in the weekly settlement
let c1=S.cash;S.wk={rev:0,spend:0,happy:0,orders:0,trains:0,talks:0,hosts:0};S.staff=[];weekly();chk(c1-S.cash===250+35,'weekly upkeep $35');
chk(res(queue.find(q=>res(q.title,'en').includes('closing')).text[0],'zh').includes('车辆保险与保养 $35'),'settlement text shows the upkeep');
// sell
c1=S.cash;const want=carTrade();sc=look.run();const sell=sc.choices.find(c=>/^Just sell/.test(res(c.t,'en')));sell.fx();chk(!S.car&&S.cash-c1===want,'selling pays the trade-in value');
chk(fare(austin)===Math.round(12+austin.miles*0.18),'no car → bus fare');
// breakdown on a trip
fresh();S.car='civic98';S.carMi=241000;const R0=Math.random;Math.random=()=>0.01;c1=S.cash;goTrip('austin');Math.random=R0;
chk(c1-S.cash>fare(austin)+59,'forced breakdown charges a repair on top of gas');walk(cur||queue[0]);
// service
fresh();const serv=st1.acts.find(a=>a.id==='v1_service');chk(serv.req()!==true,'service needs a car');S.car='f150_95';chk(serv.req()===true,'service available');
walk(serv.run());chk(S.carServ===S.week&&serv.req()!==true&&Math.abs(carBrk()-0.09*0.4)<1e-9,'service recorded, breakdowns ×0.4');
S.car='f150_19';S.carServ=0;chk(serv.req()!==true,'the never-breaks truck needs no service');
// food truck in a city
fresh();S.car='stepvan99';S.where='austin';S.inv.beef=30;const ft=cityActions().find(a=>a.id==='foodtruck');chk(!!ft,'food truck action in cities');
c1=S.cash;walk(ft.run());chk(S.cash>c1&&ft.req()!==true,'food truck sells once a day');
S.car='ram01';chk(!cityActions().some(a=>a.id==='foodtruck'),'no food truck action with a pickup');
// owned but can't drive yet
fresh();S.car='sportster06';S.course.drive=1;chk(!canDrive()&&charmBonus()===accentBonus()+S.muscle*4+S.dress,'owning without lessons: bus, no charm');
S.course.drive=2;walk({title:'',text:[carPanel()]});
console.log(bad?bad+' FAILURES':'CARS OK');`;
eval(js);
