/* ===== v1 · the frontage-road car lot: specific used vehicles, weekly stock, trade-ins, service =====
 Engine side: VEHICLES (filled here), CAR_ALIAS, carId, CAR, carFull, carOdo, carTrade, carBrk, buyCar, sellCar.
 State: S.car (listing id or null), S.carMi (odometer), S.carServ (week of last service → breakdowns ×0.4 for 6 weeks)
 Real makes and models only (no dealerships or real businesses); prices are this game's economy, explained by each car's history.
 cls: car | moto | truck | van | suv | food | classic
*/
(function(){
const V=(make,year,miles,cost,gas,upkeep,brk,cls,extra,quirk)=>Object.assign({make,year,miles,cost,gas,upkeep,brk,cls,charm:0,quirk},extra||{});
Object.assign(VEHICLES,{
 civic98:V(['本田思域','Honda Civic','Honda Civic'],1998,241000,1100,0.08,9,0.11,'car',{},
  [`副驾驶的门只能从里面开。巴克说这叫“防盗设计”。`,`The passenger door only opens from the inside. Buck calls it "an anti-theft feature".`,`A porta do pendura só abre por dentro. O Buck chama-lhe «sistema antirroubo».`]),
 caprice94:V(['雪佛兰卡普里斯（退役警车）','Chevrolet Caprice (retired police car)','Chevrolet Caprice (ex-carro da polícia)'],1994,176000,1300,0.12,12,0.1,'car',{charm:1},
  [`后座还装着隔离网，警灯拆了，线还在。普鲁伊特警长说这辆他开过三年。`,`The cage is still behind the front seats; the light bar is gone but the wiring isn't. Sheriff Pruitt says he drove this one for three years.`,`Ainda tem a grade atrás dos bancos da frente; as luzes foram tiradas, os fios não. O xerife Pruitt diz que andou nele três anos.`]),
 century99:V(['别克世纪','Buick Century','Buick Century'],1999,112000,1500,0.1,10,0.06,'car',{},
  [`教堂的一位老太太开了二十年，只开去教堂和超市。座椅上还套着钩针织的垫子。`,`A church lady drove it for twenty years, only to church and the grocery store. There's still a crocheted cover on the seat.`,`Uma senhora da igreja conduziu-o vinte anos, só para a missa e o supermercado. Ainda tem uma capa de croché no banco.`]),
 camry04:V(['丰田凯美瑞','Toyota Camry','Toyota Camry'],2004,198000,1900,0.09,10,0.05,'car',{},
  [`一个大学生毕业搬去达拉斯前卖的，后备箱里还有半箱方便面。`,`A college kid sold it before moving to Dallas after graduation. Half a case of instant noodles is still in the trunk.`,`Um universitário vendeu-o antes de se mudar para Dallas. Ainda há meia caixa de massa instantânea na mala.`]),
 rebel11:V(['本田叛逆者 250','Honda Rebel 250','Honda Rebel 250'],2011,9000,1600,0.04,7,0.04,'moto',{charm:2},
  [`几乎没骑过。前车主的老婆不让他骑，他每个礼拜六来擦一遍。`,`Barely ridden. The last owner's wife wouldn't let him ride it; he came out every Saturday to polish it.`,`Quase não andou. A mulher do antigo dono não o deixava andar; ele vinha todos os sábados dar-lhe brilho.`]),
 sportster06:V(['哈雷戴维森运动者 883','Harley-Davidson Sportster 883','Harley-Davidson Sportster 883'],2006,38000,3200,0.05,12,0.05,'moto',{charm:4},
  [`油箱上画着一只鹰，画得很认真，也很难看。`,`There's an eagle painted on the tank, very earnestly and very badly.`,`Tem uma águia pintada no depósito, com muito empenho e muito mal.`]),
 f150_95:V(['福特 150 型皮卡','Ford F-150','Ford F-150'],1995,268000,2400,0.13,14,0.09,'truck',{cargo:1},
  [`两扇车门两种颜色，一扇红一扇白。巴克说：“这叫个性。”`,`The two doors are two different colors, one red, one white. "That's called personality," says Buck.`,`As duas portas são de cores diferentes, uma vermelha, outra branca. «Chama-se personalidade», diz o Buck.`]),
 ram01:V(['道奇公羊 2500 柴油版','Dodge Ram 2500 diesel','Dodge Ram 2500 a gasóleo'],2001,302000,3400,0.14,16,0.06,'truck',{cargo:1,charm:1},
  [`柴油机跑了三十万英里。巴克说：“才刚磨合好。”`,`The diesel has three hundred thousand miles on it. "Just broken in," says Buck.`,`O motor a gasóleo tem trezentas mil milhas. «Acabou de fazer a rodagem», diz o Buck.`]),
 sienna09:V(['丰田塞纳','Toyota Sienna','Toyota Sienna'],2009,171000,3600,0.11,13,0.04,'van',{cargo:1,charm:-1},
  [`座椅缝里全是麦片。七个座，适合拖家带口——巴克看了你一眼，“或者拉一后备箱的沙丁鱼。”`,`Cereal in every seat crack. Seven seats, made for a family — Buck glances at you — "or a trunk full of sardines."`,`Cereais em todas as frinchas dos bancos. Sete lugares, feita para uma família — o Buck olha para ti — «ou para uma mala cheia de sardinhas».`]),
 silverado08:V(['雪佛兰索罗德 1500','Chevrolet Silverado 1500','Chevrolet Silverado 1500'],2008,187000,4200,0.12,15,0.05,'truck',{cargo:1},
  [`牧场上用了十几年，车斗里的划痕能拼出一张德州地图。`,`A ranch truck for over a decade; the scratches in the bed could pass for a map of Texas.`,`Uma carrinha de rancho há mais de dez anos; os riscos na caixa davam um mapa do Texas.`]),
 wrangler07:V(['吉普牧马人','Jeep Wrangler','Jeep Wrangler'],2007,164000,5800,0.13,18,0.07,'suv',{charm:3},
  [`车顶能拆。巴克说开去大本德，星星会自己掉进车里。`,`The top comes off. Buck says drive it out to Big Bend and the stars fall right in.`,`O tejadilho sai. O Buck diz que, se o levares até Big Bend, as estrelas caem lá dentro.`]),
 stepvan99:V(['雪佛兰厢式底盘餐车','Chevrolet step-van food truck','Roulote (furgão Chevrolet)'],1999,214000,6800,0.2,40,0.08,'food',{cargo:1,food:1},
  [`以前卖墨西哥卷饼的，烤架、冰柜、窗板都在。车里还留着一股孜然味。`,`It used to sell tacos. Grill, cooler and serving hatch all there, and it still smells of cumin.`,`Vendia tacos. Grelha, arca e janela estão lá todas, e ainda cheira a cominhos.`]),
 tacoma12:V(['丰田塔科马','Toyota Tacoma','Toyota Tacoma'],2012,151000,7900,0.11,18,0.02,'truck',{cargo:1,charm:1},
  [`去年那场冰雹把车顶砸得像高尔夫球，所以才这个价。发动机一点事都没有。`,`Last year's hailstorm dimpled the roof like a golf ball — that's why it's this cheap. The engine's perfect.`,`A granizada do ano passado deixou o tejadilho como uma bola de golfe — por isso é tão barata. O motor está impecável.`]),
 mustang68:V(['福特野马','Ford Mustang','Ford Mustang'],1968,97000,9500,0.16,30,0.15,'classic',{charm:6},
  [`里程表只有五位数，谁也不知道它转过几圈。厄尔说他高中时有人开着这样一辆车把他女朋友接走了。`,`The odometer only has five digits; nobody knows how many times it has rolled over. Earl says in high school a boy in one of these drove off with his girlfriend.`,`O conta-quilómetros só tem cinco dígitos; ninguém sabe quantas voltas já deu. O Earl diz que no liceu um rapaz num destes lhe levou a namorada.`]),
 e450_14:V(['福特 450 型厢式餐车','Ford E-450 food truck','Roulote Ford E-450'],2014,88000,11500,0.18,45,0.03,'food',{cargo:1,food:1,charm:1},
  [`不锈钢厨房，自带发电机。奥斯汀一对夫妻开的咖啡车，生了双胞胎以后不干了。`,`Stainless kitchen, its own generator. An Austin couple ran it as a coffee truck until they had twins.`,`Cozinha em inox, gerador próprio. Um casal de Austin tinha-a como roulote de café até lhes nascerem gémeos.`]),
 f150_19:V(['福特 150 型皮卡','Ford F-150','Ford F-150'],2019,52000,13800,0.12,35,0,'truck',{cargo:1,charm:4},
  [`银行收回来的车，比市价便宜一大截。巴克说：“上一个车主去哪儿了，你别问，我也不问。”`,`A bank repossession, well under market. "Where the last owner went," says Buck, "you don't ask and I don't either."`,`Retomada pelo banco, muito abaixo do preço de mercado. «Para onde foi o antigo dono», diz o Buck, «tu não perguntas e eu também não.»`])
});

const BUCK=t(`巴克`,`Buck`,`Buck`);
const LOT=t(`辅路二手车场`,`Frontage-road car lot`,`Stand da via de serviço`);
const AFTER={
 car:t(`你开着它出了车场，排气管咳了两声。巴克在后面喊：“它喜欢你！”`,`You drive it off the lot and the tailpipe coughs twice. Buck hollers after you: "She likes you!"`,`Sais do stand e o escape tosse duas vezes. O Buck grita atrás de ti: «Ela gosta de ti!»`),
 moto:t(`你骑上摩托沿着主街开过去。花店门口有人吹了一声口哨，你没回头，耳朵红到脖子。`,`You ride down Main Street. Someone outside the flower shop whistles. You don't look back; your ears go red to the neck.`,`Desces a rua principal de mota. À porta da florista alguém assobia. Não olhas para trás; as orelhas ficam vermelhas até ao pescoço.`),
 truck:t(`你把皮卡停在店门口。厄尔从酒吧那边走过来，绕车一圈，踢了踢轮胎：“行。现在你看起来像住在这儿的了。”`,`You park the truck outside the shop. Earl wanders over from the saloon, walks round it once, kicks a tyre. "All right. Now you look like you live here."`,`Estacionas a carrinha à porta. O Earl vem do bar, dá uma volta, dá um pontapé num pneu. «Pronto. Agora pareces de cá.»`),
 van:t(`阿尔贝蒂娜太太看了一眼七个座位，意味深长地“嗯”了一声，什么也没说。`,`Dona Albertina counts the seven seats, says "Hm" meaningfully, and nothing else.`,`A Dona Albertina conta os sete lugares, diz «hum» com muito significado, e mais nada.`),
 suv:t(`你把车顶拆了，沿着 35 号州际公路的辅路开了一圈。风灌进来，像在阿尔法马的山坡上骑自行车往下冲。`,`You take the top off and do a lap of the I-35 frontage road. The wind pours in like riding a bike down the hills of Alfama.`,`Tiras o tejadilho e dás uma volta pela via de serviço da I-35. O vento entra como quando descias de bicicleta as ladeiras de Alfama.`),
 food:t(`你在车身侧面用葡萄牙蓝刷了一行字：若泽烧烤店·流动分店。字有点歪，阿尔贝蒂娜太太说歪得正好。`,`You paint a line in Portuguese blue along the side: Zé's Churrasco · On the Road. The letters lean a little; Dona Albertina says they lean just right.`,`Pintas na lateral, em azul português: Churrasqueira do Zé · Sobre Rodas. As letras ficam um pouco tortas; a Dona Albertina diz que estão tortas na medida certa.`),
 classic:t(`你开着野马慢慢穿过主街。五金店老板放下扫帚，戴尔牧师在教堂台阶上停住，连特拉维斯的皮卡都在路口让了你一下。`,`You roll the Mustang slowly down Main Street. The hardware man puts down his broom, Pastor Dale stops on the church steps, and even Travis's truck waits for you at the corner.`,`Desces a rua principal devagar no Mustang. O da loja de ferragens pousa a vassoura, o Pastor Dale para nos degraus da igreja, e até a carrinha do Travis te dá passagem no cruzamento.`)
};
const AFTER_RICH=t(`第二天，全镇都知道葡萄牙人买了辆几乎全新的皮卡。五金店老板说你“生意做起来了”，特拉维斯开车经过时多看了两眼。`,`By the next day the whole town knows the Portuguese fella bought a nearly new truck. The hardware man says you've "made it"; Travis slows down for a second look.`,`No dia seguinte a vila inteira sabe que o português comprou uma carrinha quase nova. O da loja de ferragens diz que «estás a ir bem»; o Travis abranda para olhar duas vezes.`);
// purchase bonuses: trucks make you more Texan; the expensive ones turn heads
const BONUS=v=>v.cost>=9000?{rep:3,tex:2}:v.cls==='truck'?{tex:2}:v.cls==='classic'?{rep:2}:{};
const bonusText=b=>[b.rep?t(`口碑 +${b.rep}`,`Reputation +${b.rep}`,`Reputação +${b.rep}`):null,b.tex?t(`德州味 +${b.tex}`,`Texanness +${b.tex}`,`Texanidade +${b.tex}`):null].filter(Boolean);

// this week's stock: six listings, reshuffled every week, always at least one under $2,000
function lotStock(){
 const h=k=>{let x=S.week*2654435761;for(const ch of k)x=(x^ch.charCodeAt(0))*16777619>>>0;return x};
 let ids=Object.keys(VEHICLES).filter(k=>k!==carId()).sort((a,b)=>h(a)-h(b)).slice(0,6);
 if(!ids.some(k=>VEHICLES[k].cost<=2000)){const cheap=Object.keys(VEHICLES).filter(k=>k!==carId()&&VEHICLES[k].cost<=2000).sort((a,b)=>h(a)-h(b))[0];if(cheap)ids[5]=cheap}
 return ids.sort((a,b)=>VEHICLES[a].cost-VEHICLES[b].cost);
}
const specs=v=>t(`${v.year} 年 · 里程 ${fmtMi(v.miles)} 英里 · 油耗每英里 $${v.gas.toFixed(2)} · 保险保养每周 $${v.upkeep}${v.brk?` · 抛锚 ${Math.round(v.brk*100)}%/趟`:' · 几乎不坏'}${v.charm?` · 魅力 ${v.charm>0?'+':''}${v.charm}`:''}${v.cargo?' · 能拉货':''}${v.food?' · 能出摊':''}`,
 `${v.year} · ${fmtMi(v.miles)} mi · gas $${v.gas.toFixed(2)}/mile · insurance & upkeep $${v.upkeep}/week${v.brk?` · breakdowns ${Math.round(v.brk*100)}%/trip`:' · hardly ever breaks'}${v.charm?` · charm ${v.charm>0?'+':''}${v.charm}`:''}${v.cargo?' · hauls cargo':''}${v.food?' · sells food':''}`,
 `${v.year} · ${fmtMi(v.miles)} mi · gasolina $${v.gas.toFixed(2)}/milha · seguro e manutenção $${v.upkeep}/semana${v.brk?` · avarias ${Math.round(v.brk*100)}%/viagem`:' · quase não avaria'}${v.charm?` · charme ${v.charm>0?'+':''}${v.charm}`:''}${v.cargo?' · leva carga':''}${v.food?' · vende comida':''}`);

function lotScene(){
 const own=CAR(),tr=carTrade();
 const intro=[t(`35 号州际公路辅路边上一块碎石地，几十辆车排成两排，每辆挡风玻璃上都用白漆写着年份、里程和价钱。车场老板巴克从活动房里出来，手里端着一杯咖啡。“这礼拜新到了几辆。”`,`A gravel lot on the I-35 frontage road: a few dozen vehicles in two rows, year, mileage and price painted in white on every windshield. Buck, who runs the place, steps out of his trailer office with a coffee. "Got a few new ones in this week."`,`Um terreno de gravilha na via de serviço da I-35: umas dezenas de veículos em duas filas, ano, milhas e preço pintados a branco em cada para-brisas. O Buck, o dono, sai do escritório-contentor com um café. «Chegaram uns novos esta semana.»`),
  own?t(`他绕着你的${own.make[0]}走了一圈，看了眼里程表（${fmtMi(carOdo())} 英里）：“我按 $${tr} 收，折进下一辆里。”`,`He walks round your ${own.make[1]} and checks the odometer (${fmtMi(carOdo())} mi). "I'll take it for $${tr} toward the next one."`,`Dá uma volta ao teu ${own.make[2]} e espreita o conta-quilómetros (${fmtMi(carOdo())} mi). «Fico com ele por $${tr} para abater no próximo.»`):t(`“第一次买车？在德州，车就是你的腿。”`,`"First car? In Texas, your car is your legs."`,`«Primeiro carro? No Texas, o carro são as tuas pernas.»`)];
 if(S.course.drive<2)intro.push(t(`“你还不会开？那先跟厄尔学两课。车我可以先卖给你，让它在你店门口等着。”`,`"Can't drive yet? Take a couple of lessons with Earl. I'll still sell you one — it can wait outside your shop."`,`«Ainda não conduzes? Tem umas aulas com o Earl. Vendo-te o carro na mesma — fica à tua porta à espera.»`));
 const stock=lotStock();
 const gallery=`<div class="lot-grid">${stock.map(k=>{const v=VEHICLES[k];return `<figure>${carArt(k)}<figcaption><b>${carFull(v)}</b><br>$${fmtMi(v.cost)}</figcaption></figure>`}).join('')}</div>`;
 const ch=stock.map(k=>{const v=VEHICLES[k],price=v.cost-tr;
  return {t:t(`${v.year} 年${v.make[0]} · ${fmtMi(v.miles)} 英里 · $${fmtMi(v.cost)}${tr?`（折价后 $${fmtMi(price)}）`:''}`,`${v.year} ${v.make[1]} · ${fmtMi(v.miles)} mi · $${fmtMi(v.cost)}${tr?` ($${fmtMi(price)} after trade-in)`:''}`,`${v.make[2]} de ${v.year} · ${fmtMi(v.miles)} mi · $${fmtMi(v.cost)}${tr?` ($${fmtMi(price)} com retoma)`:''}`),
   next:()=>{const b=BONUS(v);return {title:carFull(v),meta:LOT,art:carArt(k),text:[tt(v.quirk),specs(v)],choices:[
    {t:t(`成交（$${fmtMi(price)}）`,`Deal ($${fmtMi(price)})`,`Negócio fechado ($${fmtMi(price)})`),req:()=>S.cash>=price||t(`钱不够（要 $${fmtMi(price)}）`,`Not enough money (need $${fmtMi(price)})`,`Não tens dinheiro (precisas de $${fmtMi(price)})`),
     fx:()=>{buyCar(k);if(b.rep)S.rep+=b.rep;if(b.tex)stat('tex',b.tex);if(v.food)S.lusoThisWeek=true},
     next:()=>Object.assign(say(carFull(v),v.cost>=9000&&v.cls==='truck'?AFTER_RICH:AFTER[v.cls],bonusText(b).join(' · ')),{art:carArt(k)})},
    {t:t('再看看别的','Look at the others','Ver os outros'),next:lotScene}]}}}});
 if(own)ch.push({t:t(`把${own.make[0]}直接卖给他（+$${fmtMi(tr)}）`,`Just sell him the ${own.make[1]} (+$${fmtMi(tr)})`,`Vender-lhe só o ${own.make[2]} (+$${fmtMi(tr)})`),fx:()=>sellCar(),next:()=>say(LOT,t('巴克数钱数得很慢，像在数自己的好心。“想买车的时候再来。”','Buck counts the money out slowly, like he\'s counting his own generosity. "Come back when you want wheels."','O Buck conta o dinheiro devagar, como quem conta a própria generosidade. «Volta quando quiseres rodas.»'))});
 ch.push({t:t('只是看看','Just looking','Só estou a ver')});
 return {title:LOT,meta:BUCK,text:intro,html:gallery,choices:ch};
}
function serviceScene(){
 const v=CAR();if(!v)return say(LOT,t('你还没有车。','You don\'t have a vehicle yet.','Ainda não tens veículo.'));
 S.cash-=40;S.wk.spend+=40;S.carServ=S.week;
 return say(t('保养','Service','Revisão'),[t(`巴克的侄子钻到${v.make[0]}底下，换了机油、皮带和一个你叫不出名字的零件。“六个礼拜内它会听话的，”他说，“之后看它心情。”`,`Buck's nephew slides under the ${v.make[1]} and changes the oil, a belt and a part you can't name. "She'll behave for six weeks," he says. "After that, depends on her mood."`,`O sobrinho do Buck enfia-se debaixo do ${v.make[2]} e muda o óleo, uma correia e uma peça cujo nome não sabes. «Seis semanas a portar-se bem», diz. «Depois, depende do humor dela.»`)],
  t('$40 · 六周内抛锚概率降到四成','$40 · breakdown chance cut to 40% for six weeks','$40 · probabilidade de avaria reduzida a 40% durante seis semanas'));
}
EXTRA_LOCS.push({id:'v1_lot',n:LOT,open:()=>S.week>=2,acts:[
 {id:'v1_look',n:t('看车 / 买车 / 卖车','Browse, buy or sell a vehicle','Ver, comprar ou vender um veículo'),cost:1,tip:t('每周换一批车，旧车可以折价','New stock every week; trade-ins welcome','Carros novos todas as semanas; aceita retomas'),run:lotScene},
 {id:'v1_service',n:t('给车做保养 $40','Service your vehicle · $40','Fazer a revisão · $40'),cost:1,tip:t('六周内少抛锚','Fewer breakdowns for six weeks','Menos avarias durante seis semanas'),
  req:()=>!carId()?t('你还没有车','You don\'t have a vehicle','Ainda não tens veículo'):!CAR().brk?t('这辆车不需要保养','This one doesn\'t need it','Este não precisa'):S.carServ&&S.week-S.carServ<6?t(`刚保养过（第 ${S.carServ} 周）`,`Serviced recently (week ${S.carServ})`,`Revisão recente (semana ${S.carServ})`):S.cash<40?t('钱不够','Not enough money','Não tens dinheiro'):true,run:serviceScene}
]});
})();
