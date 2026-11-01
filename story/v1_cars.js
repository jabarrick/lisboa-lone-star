/* ===== v1 · the frontage-road car lot: buy, trade in, sell and service vehicles =====
 Vehicles and their numbers live in the engine (VEHICLES, buyCar, sellCar, carTrade, CAR, carId).
 Flags: S.car (vehicle id or null), S.carServ (week of the last service; halves breakdowns for 6 weeks → ×0.4)
*/
(function(){
const BUCK=t(`巴克`,`Buck`,`Buck`);
const LOT=t(`辅路二手车场`,`Frontage-road car lot`,`Stand da via de serviço`);
const LINES={
 sedan:t(`“这辆轿车跑了二十万英里，”巴克拍拍车顶，“剩下的二十万全靠祷告。便宜，省油。坏了别来找我。”`,`"Two hundred thousand miles on this sedan," Buck says, patting the roof. "The next two hundred are on prayer. Cheap, sips gas. Don't come crying when it quits."`,`«Este carro tem duzentas mil milhas», diz o Buck, a bater no tejadilho. «As próximas duzentas são à base de oração. Barato, poupado. Se avariar, não venhas chorar.»`),
 moto:t(`“摩托车。省油，好看，女孩子会多看你一眼。”他想了想，“下雨天你会恨它。也装不下一扇牛胸肉。”`,`"A motorcycle. Easy on gas, looks good, gets you a second glance." He thinks. "You'll hate it in the rain. And it won't carry a brisket."`,`«Uma mota. Gasta pouco, fica bem, fazem-te olhinhos.» Pensa um bocado. «Vais odiá-la quando chover. E não leva um peito de vaca.»`),
 pickup:t(`“皮卡。在德州，没有皮卡的男人就像没有帽子的牛仔——不犯法，可大家会小声议论。”`,`"A pickup. In Texas a man without a pickup is like a cowboy without a hat — not illegal, but folks talk."`,`«Uma carrinha. No Texas, um homem sem carrinha é como um cowboy sem chapéu — não é crime, mas as pessoas comentam.»`),
 foodtruck:t(`“一辆旧餐车，以前卖墨西哥卷饼的。烤架、冰柜、窗板都在。”巴克敲了敲车身，“开到哪儿，店就开到哪儿。油钱嘛，你就别算了。”`,`"An old food truck — used to sell tacos. Grill, cooler, serving hatch, all there." Buck knocks on the side. "Wherever you drive it, you're open for business. Just don't add up the gas."`,`«Uma roulote velha — vendia tacos. Grelha, arca, janela, está tudo.» O Buck bate na chapa. «Onde a levares, tens o restaurante aberto. Só não faças contas à gasolina.»`),
 newtruck:t(`巴克压低声音：“这辆是全新的，经销商那边退下来的，里程表上才四十英里。全镇只有特拉维斯开得起这个级别。”`,`Buck lowers his voice. "This one's brand new, came back from a dealer with forty miles on the clock. Only Travis drives anything in this class around here."`,`O Buck baixa a voz. «Esta é novinha, veio de um concessionário com quarenta milhas no conta-quilómetros. Por aqui só o Travis anda numa coisa destas.»`)
};
const AFTER={
 sedan:t(`你开着它出了车场，排气管咳了两声。巴克在后面喊：“它喜欢你！”`,`You drive it off the lot and the tailpipe coughs twice. Buck hollers after you: "She likes you!"`,`Sais do stand e o escape tosse duas vezes. O Buck grita atrás de ti: «Ela gosta de ti!»`),
 moto:t(`你骑上摩托沿着主街开过去。花店门口有人吹了一声口哨，你没回头，耳朵红到脖子。`,`You ride the motorcycle down Main Street. Someone outside the flower shop whistles. You don't look back; your ears go red to the neck.`,`Desces a rua principal de mota. À porta da florista alguém assobia. Não olhas para trás; as orelhas ficam vermelhas até ao pescoço.`),
 pickup:t(`你把皮卡停在店门口。厄尔从酒吧那边走过来，绕车一圈，踢了踢轮胎：“行。现在你看起来像住在这儿的了。”`,`You park the pickup outside the shop. Earl wanders over from the saloon, walks round it once, kicks a tyre. "All right. Now you look like you live here."`,`Estacionas a carrinha à porta. O Earl vem do bar, dá uma volta, dá um pontapé num pneu. «Pronto. Agora pareces de cá.»`),
 foodtruck:t(`你在餐车侧面用葡萄牙蓝刷了一行字：若泽烧烤店·流动分店。字有点歪，阿尔贝蒂娜太太说歪得正好。`,`You paint a line in Portuguese blue along the side: Zé's Churrasco · On the Road. The letters lean a little; Dona Albertina says they lean just right.`,`Pintas na lateral, em azul português: Churrasqueira do Zé · Sobre Rodas. As letras ficam um pouco tortas; a Dona Albertina diz que estão tortas na medida certa.`),
 newtruck:t(`第二天，全镇都知道葡萄牙人买了新皮卡。五金店老板说你“生意做起来了”，特拉维斯开车经过时多看了两眼。`,`By the next day the whole town knows the Portuguese fella bought a new truck. The hardware man says you've "made it"; Travis slows down for a second look as he drives by.`,`No dia seguinte a vila inteira sabe que o português comprou uma carrinha nova. O da loja de ferragens diz que «estás a ir bem»; o Travis abranda para olhar duas vezes.`)
};
function lotScene(){
 const own=CAR(),tr=carTrade();
 const intro=[t(`35 号州际公路辅路边上一块碎石地，三十来辆车排成两排，每辆挡风玻璃上都用白漆写着价钱。车场老板巴克从活动房里出来，手里端着一杯咖啡。`,`A gravel lot on the I-35 frontage road: thirty-odd vehicles in two rows, prices painted in white on every windshield. Buck, who runs the place, steps out of his trailer office holding a coffee.`,`Um terreno de gravilha na via de serviço da I-35: uns trinta veículos em duas filas, o preço pintado a branco em cada para-brisas. O Buck, o dono, sai do escritório-contentor com um café na mão.`),
  own?t(`他看了一眼你的${own.n[0]}：“那辆我按 $${tr} 收，折进新车里。”`,`He eyes your ${own.n[1].toLowerCase()}. "I'll take that for $${tr} toward the next one."`,`Olha para o teu veículo (${own.n[2]}). «Fico com esse por $${tr} para abater no próximo.»`):t(`“第一次买车？在德州，车就是你的腿。”`,`"First car? In Texas, your car is your legs."`,`«Primeiro carro? No Texas, o carro são as tuas pernas.»`)];
 if(S.course.drive<2)intro.push(t(`“你还不会开？那先跟厄尔学两课，车我可以先卖给你，在店门口等你。”`,`"Can't drive yet? Take a couple of lessons with Earl. I'll still sell you one — it can wait outside your shop."`,`«Ainda não conduzes? Tem umas aulas com o Earl. Vendo-te o carro na mesma — fica à tua porta à espera.»`));
 const ch=Object.keys(VEHICLES).filter(k=>k!==carId()).map(k=>{const v=VEHICLES[k],price=v.cost-tr;
  return {t:t(`${v.n[0]} · $${v.cost}${tr?`（折价后 $${price}）`:''} — ${v.d[0]}`,`${v.n[1]} · $${v.cost}${tr?` ($${price} after trade-in)`:''} — ${v.d[1]}`,`${v.n[2]} · $${v.cost}${tr?` ($${price} com retoma)`:''} — ${v.d[2]}`),
   req:()=>S.cash>=price||t(`钱不够（要 $${price}）`,`Not enough money (need $${price})`,`Não tens dinheiro (precisas de $${price})`),
   next:()=>({title:tt(v.n),meta:LOT,text:[LINES[k],t(`油耗每英里 $${v.gas.toFixed(2)}，保险和保养每周 $${v.upkeep}。`,`Gas $${v.gas.toFixed(2)} a mile; insurance and upkeep $${v.upkeep} a week.`,`Gasolina $${v.gas.toFixed(2)} por milha; seguro e manutenção $${v.upkeep} por semana.`)],choices:[
    {t:t(`成交（$${price}）`,`Deal ($${price})`,`Negócio fechado ($${price})`),req:()=>S.cash>=price||t('钱不够','Not enough money','Não tens dinheiro'),fx:()=>{buyCar(k);if(k==='newtruck'){S.rep+=3;stat('tex',2)}if(k==='pickup')stat('tex',2);if(k==='foodtruck')S.lusoThisWeek=true},
     next:()=>say(tt(v.n),AFTER[k],k==='newtruck'?t('口碑 +3 · 德州味 +2','Reputation +3 · Texanness +2','Reputação +3 · Texanidade +2'):k==='pickup'?t('德州味 +2','Texanness +2','Texanidade +2'):'')},
    {t:t('再想想','Let me think about it','Vou pensar')}]})}});
 if(own)ch.push({t:t(`把${own.n[0]}直接卖给他（+$${tr}）`,`Just sell him the ${own.n[1].toLowerCase()} (+$${tr})`,`Vender-lhe só o veículo (+$${tr})`),fx:()=>sellCar(),next:()=>say(LOT,t('巴克数钱数得很慢，像在数自己的好心。“想买车的时候再来。”','Buck counts the money out slowly, like he\'s counting his own generosity. "Come back when you want wheels."','O Buck conta o dinheiro devagar, como quem conta a própria generosidade. «Volta quando quiseres rodas.»'))});
 ch.push({t:t('只是看看','Just looking','Só estou a ver')});
 return {title:LOT,meta:BUCK,text:intro,choices:ch};
}
function serviceScene(){
 const v=CAR();if(!v)return say(LOT,t('你还没有车。','You don\'t have a vehicle yet.','Ainda não tens veículo.'));
 S.cash-=40;S.wk.spend+=40;S.carServ=S.week;
 return say(t('保养','Service','Revisão'),[t(`巴克的侄子钻到${v.n[0]}底下，换了机油、皮带和一个你叫不出名字的零件。“六个礼拜内它会听话的，”他说，“之后看它心情。”`,`Buck's nephew slides under the ${v.n[1].toLowerCase()} and changes the oil, a belt and a part you can't name. "She'll behave for six weeks," he says. "After that, depends on her mood."`,`O sobrinho do Buck enfia-se debaixo do veículo (${v.n[2]}) e muda o óleo, uma correia e uma peça cujo nome não sabes. «Seis semanas a portar-se bem», diz. «Depois, depende do humor dela.»`)],
  t('$40 · 六周内抛锚概率降到四成','$40 · breakdown chance cut to 40% for six weeks','$40 · probabilidade de avaria reduzida a 40% durante seis semanas'));
}
EXTRA_LOCS.push({id:'v1_lot',n:LOT,open:()=>S.week>=2,acts:[
 {id:'v1_look',n:t('看车 / 买车 / 卖车','Browse, buy or sell a vehicle','Ver, comprar ou vender um veículo'),cost:1,tip:t('五种车，旧车可以折价','Five vehicles; trade-ins welcome','Cinco veículos; aceita retomas'),run:lotScene},
 {id:'v1_service',n:t('给车做保养 $40','Service your vehicle · $40','Fazer a revisão · $40'),cost:1,tip:t('六周内少抛锚','Fewer breakdowns for six weeks','Menos avarias durante seis semanas'),
  req:()=>!carId()?t('你还没有车','You don\'t have a vehicle','Ainda não tens veículo'):!CAR().brk?t('新车不需要保养','A new truck doesn\'t need it','Uma carrinha nova não precisa'):S.carServ&&S.week-S.carServ<6?t(`刚保养过（第 ${S.carServ} 周）`,`Serviced recently (week ${S.carServ})`,`Revisão recente (semana ${S.carServ})`):S.cash<40?t('钱不够','Not enough money','Não tens dinheiro'):true,run:serviceScene}
]});
})();
