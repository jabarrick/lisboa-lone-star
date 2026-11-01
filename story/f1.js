/* ===================== f1.js — family arc (writer M) =====================
   main year: E-2 setup (W13), proposal (W38+ / fallback W44–46), planning (W40–47), Santo António wedding (W48 Sunday)
   Chapter 5 «Lar»: CH5(finalScene) and FAMILY_EXTRA(choice)
   flags: engaged, married, weddingStyle, child; private: f1_* */
const F1={
 fin:null,
 id:()=>S.settled&&NPCS[S.settled]?S.settled:'lucia',
 m:()=>F1.id()==='wade'||F1.id()==='kyle',
 he:()=>F1.m()?t('他','he','ele'):t('她','she','ela'),
 He:()=>F1.m()?t('他','He','Ele'):t('她','She','Ela'),
 his:()=>F1.m()?t('他的','his','dele'):t('她的','her','dela'),
 ysp:()=>F1.m()?t('你的丈夫','your husband','o teu marido'):t('你的妻子','your wife','a tua mulher'),
 yfi:()=>F1.m()?t('你的未婚夫','your fiancé','o teu noivo'):t('你的未婚妻','your fiancée','a tua noiva'),
 cit:()=>!(PARTNER[F1.id()]&&PARTNER[F1.id()].citizen===false),
 carry:()=>!!(PARTNER[F1.id()]&&PARTNER[F1.id()].carry),
 // fallback (keep): a missing PARTNER line never breaks the game — same as PARTNER[id].yes=PARTNER[id].yes||t('好。','Yes.','Sim.')
 D:{yes:()=>t(`${P1()}说：“好。”`,`${P1()} says: "Yes."`,`${P1()} diz: «Sim.»`),vow:()=>t(`${P1()}说：“我愿意。”`,`${P1()} says: "I do."`,`${P1()} diz: «Aceito.»`),baby:()=>t(`${P1()}轻声说：“你好呀，小家伙。”`,`${P1()} says softly: "Hey there, little one."`,`${P1()} diz baixinho: «Olá, pequenino.»`),home:()=>t(`${P1()}说：“我们到家了。”`,`${P1()} says: "We're home."`,`${P1()} diz: «Estamos em casa.»`)},
 L:k=>{const x=PARTNER[F1.id()];return x&&x[k]?tt(x[k]):(F1.D[k]?F1.D[k]():'')},
 kid:()=>S.flags.child?tt(S.flags.child.n||S.flags.child.name):t('孩子','the baby','o bebé'),
 kHe:()=>S.flags.child&&S.flags.child.sex==='girl'?t('她','she','ela'):t('他','he','ele'),
 has:()=>!!S.flags.child,
 M:(z,e,p)=>t('第五章 · 家 · '+z,'Chapter 5 · Home · '+e,'Capítulo 5 · Lar · '+p),
 C:(z,e,p)=>t(z,e,p)
};
const P1=()=>SH(F1.id());
const f1Need=(ok,z,e,p)=>()=>ok()||NEED(t(z,e,p));

/* ---------- W13: the E-2 visa ---------- */
STORY.push(
{id:'f1_visa',when:()=>S.week===13&&S.day===4&&S.slot===0,run:()=>{S.flags.f1_e2=true;
 return {title:t('一张纸的分量','What one piece of paper weighs','O peso de um papel'),meta:NM('grace'),text:[
  t('格蕾丝把一个牛皮纸文件夹放在柜台上，没坐下。“有件事遗嘱里没写，但比遗嘱要紧。你的签证。”','Grace sets a manila folder on the counter and doesn\'t sit. "Something the will doesn\'t mention, and it matters more than the will. Your visa."','A Grace pousa uma pasta de papel pardo no balcão e não se senta. «Há uma coisa que o testamento não diz e que importa mais do que o testamento. O teu visto.»'),
  t('“葡萄牙和美国有通商条约，所以你拿的是条约投资者签证。它不认你这个人，它认这家店。店开着，你就合法；店倒了、卖了，签证就跟着没了。”','"Portugal has a treaty with the U.S., so you\'re here on an E-2 treaty investor visa. It doesn\'t care about you. It cares about this shop. Shop stays open, you stay legal. Shop goes under or gets sold, the visa goes with it."','«Portugal tem um tratado com os Estados Unidos, por isso estás cá com um visto E-2 de investidor. Ele não quer saber de ti. Quer saber deste restaurante. Se o restaurante abre, estás legal. Se fecha ou é vendido, o visto vai com ele.»'),
  t('她看了一眼窗外那块空地。“所以特拉维斯那张支票，买的不只是一块地。”','She glances out at the empty lot. "So that check of Travis\'s isn\'t just buying dirt."','Olha para o terreno lá fora. «Por isso, o cheque do Travis não compra só um bocado de terra.»')],choices:[
  {t:t('问清楚：还有别的路吗？','Ask straight: is there any other way?','Perguntar sem rodeios: há outro caminho?'),fx:()=>{addTrust('grace',1);S.flags.f1_visaAsk=true},next:()=>say('',t('“有。拿绿卡的路有好几条，最常见的那条，要你先爱上一个美国人。”她合上文件夹，“我不建议把它写进经营计划。”','"There are. Several roads to a green card. The most common one starts with falling in love with an American." She closes the folder. "I don\'t recommend putting that in the business plan."','«Há. Vários caminhos para um green card. O mais comum começa por te apaixonares por um americano.» Fecha a pasta. «Não recomendo pôr isso no plano de negócios.»'),t('格蕾丝信任 +1','Grace\'s trust +1','Confiança da Grace +1'))},
  {t:t('开个玩笑：“那我得赶紧在德州结个婚。”','Joke: "Guess I\'d better get married in Texas, quick."','Brincar: «Então tenho de casar no Texas, e depressa.»'),fx:()=>{addLike('grace',1);stat('charme',1)},next:()=>say('',t('“移民局最爱听的就是这句话，”格蕾丝面无表情，“他们会请你喝咖啡，喝很久。”','"That\'s the immigration office\'s favorite sentence," Grace says, deadpan. "They\'ll invite you in for coffee. A long coffee."','«É a frase preferida dos serviços de imigração», diz a Grace, sem pestanejar. «Convidam-te para um café. Um café muito comprido.»'))},
  {t:t('认真地说：“那这家店就不能倒。”','Say it plainly: "Then this shop doesn\'t go under."','Dizer a sério: «Então este restaurante não fecha.»'),req:()=>S.stats.oficio>=30||NEED(t('手艺 30','Craft 30','Ofício 30')),fx:()=>{stat('tex',2);S.rep+=2;addTrust('grace',1)},next:()=>say('',t('格蕾丝第一次对你笑了一下，很短。“若泽当年也这么说。他说到做到了。”','For the first time Grace smiles at you, briefly. "José said the same thing once. He meant it."','Pela primeira vez a Grace sorri-te, por um instante. «O José disse o mesmo, há muito tempo. E cumpriu.»'))}]};
}});

/* ---------- proposal (W38+, settled, trust ≥ 8; fallback W44–46) ---------- */
function f1Propose(late){
 const id=F1.id();
 const done=(style,line)=>({t:line,fx:()=>{S.flags.engaged=true;S.flags.f1_prop=style;addLike(id,1);addTrust(id,1);log(`和 ${res(SH(id),'zh')} 订婚了`,`Engaged to ${res(SH(id),'en')}`,`Noivaste com ${res(SH(id),'pt')}`)},next:()=>({title:t('答案','The answer','A resposta'),meta:NM(id),text:[
  {fado:t('灯串下，你唱到第二段就忘了词。你没停，用葡语把剩下的话说完了。','Under the string lights you forget the words in the second verse. You don\'t stop; you finish it in plain Portuguese.','Debaixo das luzes esqueces a letra na segunda quadra. Não paras; acabas em português corrido.'),
   ranch:t('太阳落到牧场尽头，马在你身下不耐烦地刨地。你没下马就问了，声音被风吹走一半。','The sun goes down at the far end of the ranch and the horse paws the ground under you. You ask without getting off, half the words lost to the wind.','O sol põe-se ao fundo do rancho e o cavalo escarva o chão. Perguntas sem desmontar, metade das palavras levadas pelo vento.'),
   tart:t(`${P1()}咬了一口蛋挞，停住了，从嘴里拿出一枚戒指。“你差点害我崩掉一颗牙。”`,`${P1()} bites into the custard tart, stops, and takes a ring out of ${res(F1.his(),'en')} mouth. "You nearly cost me a tooth."`,`${P1()} trinca o pastel de nata, para e tira um anel da boca. «Quase me partias um dente.»`)}[style],
  F1.L('yes'),
  t('你后来才发现，那只戒指盒你在口袋里揣了整整九天。','Only later do you realize you\'d carried that ring box in your pocket for nine whole days.','Só mais tarde percebes que andaste nove dias inteiros com aquela caixinha no bolso.')],choices:[{t:t('继续','Continue','Continuar')}]})});
 return {title:t('那只小盒子','The little box','A caixinha'),meta:t(late?'第四章 · 再一次':'第四章 · 求婚',late?'Chapter 4 · Once more':'Chapter 4 · The proposal',late?'Capítulo 4 · Outra vez':'Capítulo 4 · O pedido'),text:[
  late?t('你又把那只小盒子从抽屉里拿了出来。节日越来越近，你发现你最想一起过节的，只有一个人。','You take the little box out of the drawer again. The festival is getting close, and there\'s only one person you want to spend it with.','Voltas a tirar a caixinha da gaveta. A festa está a chegar, e só há uma pessoa com quem a queres passar.')
   :t('奥斯汀一家当铺里买的戒指。老板说它“见过两次婚礼，一次离婚，运气算平均”。','A ring from a pawn shop in Austin. The owner said it had "seen two weddings and one divorce, so, average luck."','Um anel de uma casa de penhores em Austin. O dono disse que já tinha «visto dois casamentos e um divórcio, sorte mediana».'),
  t(`打烊以后，${P1()}在后门台阶上等你。你知道今晚就是今晚了。`,`After closing, ${P1()} is waiting for you on the back step. You know tonight is the night.`,`Depois de fechares, ${P1()} está à tua espera no degrau das traseiras. Sabes que é esta noite.`)],choices:[
  done('fado',Object.assign(t('葡式：在空地拉起灯串，唱一段法多','Portuguese: string lights over the lot, sing some fado','À portuguesa: luzes sobre o terreno e um fado'))),
  Object.assign(done('ranch',t('德州式：牧场的日落，在马背上问','Texan: sunset at the ranch, ask from the saddle','À texana: pôr do sol no rancho, pedir a cavalo')),{req:()=>S.course.ride>=1||NEED(t('骑马 1','Riding 1','Equitação 1'))}),
  done('tart',t('店里：把戒指藏进蛋挞','At the shop: hide the ring in a custard tart','No restaurante: esconder o anel num pastel de nata')),
  {t:t('还不急','Not yet','Ainda não'),fx:()=>{S.flags.f1_notyet=S.week},next:()=>say('',t('你把盒子放回口袋，在台阶上坐下，聊了一晚上烤架和天气。还有时间——你这么告诉自己。','You put the box back in your pocket, sit down on the step, and talk about grills and weather all night. There\'s time, you tell yourself.','Voltas a guardar a caixa, sentas-te no degrau e passam a noite a falar de grelhas e do tempo. Há tempo, dizes a ti mesmo.'))}]};
}
STORY.push(
{id:'f1_propose',when:()=>S.week>=38&&S.week<=46&&S.day===6&&S.slot===2&&!!S.settled&&!S.flags.engaged&&rel(S.settled).trust>=8,run:()=>f1Propose(false)},
{id:'f1_propose2',when:()=>S.week>=44&&S.week<=46&&S.day===6&&S.slot===2&&!!S.settled&&!S.flags.engaged&&S.week>(S.flags.f1_notyet||0)&&rel(S.settled).trust>=6,run:()=>f1Propose(true)},

/* ---------- planning (W40–47) ---------- */
{id:'f1_mom',when:()=>!!S.flags.engaged&&S.week>=40&&S.week<=47&&S.day===5&&S.slot===0,run:()=>({title:t('妈妈能来吗','Can Mom come?','A mãe pode vir?'),meta:t('婚礼筹备','Wedding plans','Preparativos do casamento'),text:[
  t('你在电话里说了。那头安静了很久，然后是妈妈擤鼻涕的声音。“我刚出院半年，医生说我能坐飞机。他没说我能坐十一个小时。”','You tell her on the phone. A long silence, then the sound of your mother blowing her nose. "I\'m six months out of hospital. The doctor says I can fly. He didn\'t say I can fly eleven hours."','Contas-lhe ao telefone. Um silêncio comprido, depois a tua mãe a assoar-se. «Tive alta há seis meses. O médico diz que posso andar de avião. Não disse que aguento onze horas.»'),
  S.flags.c4_rui?t('“鲁伊反正要来过节，”她说，“他可以推轮椅。”','"Rui\'s coming for the festival anyway," she says. "He can push the wheelchair."','«O Rui já vai para a festa», diz ela. «Pode empurrar a cadeira de rodas.»'):t('“鲁伊说他陪我，”她说，“可机票……”','"Rui says he\'ll come with me," she says. "But the tickets…"','«O Rui diz que vem comigo», diz ela. «Mas os bilhetes…»')],choices:[
  {t:t('给妈妈买机票','Buy Mom the ticket','Comprar o bilhete à mãe'),req:MONEY(900),fx:()=>{S.cash-=900;S.flags.f1_mom='fly';stat('saud',-5)},next:()=>say('',t('她让你把航班号念了三遍，写在冰箱上的一张纸上。','She makes you read the flight number three times and writes it on a note on the fridge.','Pede-te que leias o número do voo três vezes e escreve-o num papel no frigorífico.'))},
  {t:t('阿尔贝蒂娜的葡裔老乡们凑钱','Dona Albertina\'s Portuguese crowd chips in','Os conterrâneos da Dona Albertina fazem uma vaquinha'),req:()=>rel('albertina').trust>=4||NEED(t('阿尔贝蒂娜信任 4','Albertina\'s trust 4','confiança da Albertina 4')),fx:()=>{S.flags.f1_mom='fly';addTrust('albertina',1);stat('saud',-5)},next:()=>say('',t('周日弥撒后，教堂的募捐篮子转了第二圈。阿尔贝蒂娜说：“新娘的妈妈，就是全镇的妈妈。”','After Sunday mass the collection basket goes round a second time. Albertina says: "The mother of the groom belongs to the whole town."','Depois da missa de domingo, o cesto das ofertas dá uma segunda volta. A Albertina diz: «A mãe do noivo é mãe da vila inteira.»'))},
  {t:t('别让她冒险，用视频连线','Don\'t risk it — set up a video call','Não arriscar — fazer uma videochamada'),fx:()=>{S.flags.f1_mom='video';stat('saud',3)},next:()=>say('',t('“那我要穿那条蓝裙子，”妈妈说，“还要你弟弟把手机举稳。”','"Then I\'m wearing the blue dress," your mother says. "And your brother had better hold the phone steady."','«Então visto o vestido azul», diz a tua mãe. «E o teu irmão que segure bem o telemóvel.»'))}]})},
{id:'f1_style',when:()=>!!S.flags.engaged&&S.week>=40&&S.week<=47&&S.day===3&&S.slot===0,run:()=>({title:t('圣安东尼的新人','Santo António\'s couples','Os noivos de Santo António'),meta:t('婚礼筹备','Wedding plans','Preparativos do casamento'),text:[
  t('阿尔贝蒂娜拿着日历进来：“在里斯本，每年圣安东尼节，市里给一批新人一起办婚礼，叫‘圣安东尼新娘’。圣安东尼是媒人圣徒。节日第二天是星期天。”她用指甲在那一格上敲了两下。','Albertina comes in with a calendar. "In Lisbon, every Santo António, the city marries a whole group of couples together. The Santo António brides. He\'s the matchmaker saint. The day after the festival is a Sunday." She taps the square twice with her fingernail.','A Albertina entra com um calendário. «Em Lisboa, todos os anos pelo Santo António, a câmara casa um grupo de noivos de uma vez. As noivas de Santo António. É o santo casamenteiro. O dia a seguir à festa é domingo.» Bate duas vezes no quadrado com a unha.'),
  t(`${P1()}看着你：“那就那天。问题是，办成什么样？”`,`${P1()} looks at you. "That day, then. The question is, what kind of wedding?"`,`${P1()} olha para ti. «Então é nesse dia. A questão é: que casamento?»`)],choices:[
  {t:t('葡式：沙丁鱼、罗勒、阿尔贝蒂娜的老太太们','Portuguese: sardines, basil, Albertina\'s ladies','À portuguesa: sardinhas, manjericos e as senhoras da Albertina'),fx:()=>{S.flags.weddingStyle='luso';stat('saud',-3);addLike('albertina',1)}},
  {t:t('德州式：牛胸肉、排舞、靴子','Texan: brisket, line dancing, boots','À texana: peito fumado, line dance e botas'),fx:()=>{S.flags.weddingStyle='tex';stat('tex',3);addTrust('beto',1)}},
  {t:t('混合：蛋挞配牛胸肉，法多接乡村乐','Both: tarts and brisket, fado into country','Misto: natas e peito fumado, fado e depois country'),req:()=>S.fusion.unlocked||t('先研发融合菜','Develop fusion dishes first','Primeiro cria os pratos de fusão'),fx:()=>{S.flags.weddingStyle='mixed';stat('tex',2);stat('saud',-2)}}]})},
{id:'f1_officiant',when:()=>!!S.flags.engaged&&S.week>=40&&S.week<=47&&S.day===1&&S.slot===2,run:()=>({title:t('谁来证婚','Who marries you','Quem vos casa'),meta:t('婚礼筹备','Wedding plans','Preparativos do casamento'),text:[
  t('名单上有三个人。一个是镇上的牧师，一个是每月来做一次葡语弥撒的老神父，还有一个是厄尔。厄尔说他“可以去网上领个证，一晚上的事”。','There are three names on the list. The town pastor; the old priest who comes from Waco once a month to say mass in Portuguese; and Earl. Earl says he "can get ordained online, it\'s one evening."','Há três nomes na lista. O pastor da vila; o padre velho que vem de Waco uma vez por mês dizer missa em português; e o Earl. O Earl diz que «se ordena pela internet numa noite».'),
  F1.id()==='megan'?t('梅根握着你的手：“我爸会问你一个问题。你答好了，他就答应。”','Megan squeezes your hand. "Dad\'s going to ask you one question. Answer it right and he\'ll say yes."','A Megan aperta-te a mão. «O meu pai vai fazer-te uma pergunta. Se responderes bem, ele aceita.»'):t('你想要一个说话时你会听进去的人。','You want someone whose words you\'ll actually hear.','Queres alguém cujas palavras vás mesmo ouvir.')],choices:[
  {t:t('请戴尔牧师','Ask Pastor Dale','Pedir ao Pastor Dale'),req:()=>rel('dale').trust>=4||F1.id()==='megan'||NEED(t('戴尔牧师信任 4','Pastor Dale\'s trust 4','confiança do Pastor Dale 4')),fx:()=>{S.flags.f1_off='dale';addTrust('dale',1)},next:()=>say('',t('牧师问：“你会不会在某个早上醒来，就想回里斯本？”你说会。他点头：“那就对了。说不会的人才在撒谎。”','The pastor asks: "Will you ever wake up one morning just wanting to go back to Lisbon?" You say yes. He nods. "Good. The ones who say no are lying."','O pastor pergunta: «Algum dia vais acordar só com vontade de voltar para Lisboa?» Dizes que sim. Ele acena. «Ainda bem. Os que dizem que não estão a mentir.»'))},
  {t:t('请韦科来的老神父','Ask the old priest from Waco','Pedir ao padre velho de Waco'),fx:()=>{S.flags.f1_off='priest';stat('saud',-2);addLike('albertina',1)},next:()=>say('',t('老神父在电话里问了你外婆的名字，问了你受洗的教堂，然后说：“圣安东尼会高兴的。他最喜欢远路来的人。”','On the phone the old priest asks your grandmother\'s name and the church you were baptized in, then says: "Saint Anthony will be pleased. He likes people who came a long way."','Ao telefone o padre pergunta o nome da tua avó e a igreja onde foste batizado, e depois diz: «O Santo António vai gostar. Gosta de quem vem de longe.»'))},
  {t:t('请厄尔','Ask Earl','Pedir ao Earl'),fx:()=>{S.flags.f1_off='earl';addTrust('earl',1);stat('tex',2)},next:()=>say('',t('第二天厄尔把一张打印的证书拍在吧台上。“牧师厄尔。别笑。”他自己先笑了。','Next day Earl slaps a printed certificate on the bar. "Reverend Earl. Don\'t laugh." He laughs first.','No dia seguinte o Earl põe um certificado impresso em cima do balcão. «Reverendo Earl. Não te rias.» É ele o primeiro a rir.'))}]})},
{id:'f1_license',when:()=>!!S.flags.engaged&&!S.flags.f1_lic&&S.week>=40&&S.week<=47&&S.day===2&&S.slot===0,run:()=>({title:t('县书记官处','The county clerk\'s office','O registo do condado'),meta:t('婚礼筹备 · 结婚证','Wedding plans · The license','Preparativos · A licença'),text:[
  t('结婚证要去县城的书记官处申请。窗口后面的女士告诉你们：领了证，要等七十二小时才能办婚礼。“德州给你们三天时间反悔，”她说，“大多数人用不上。”','The license comes from the county clerk\'s office at the county seat. The lady behind the window tells you: after the license is issued, you wait seventy-two hours before the ceremony. "Texas gives you three days to change your minds," she says. "Most folks don\'t need \'em."','A licença pede-se no registo do condado, na sede do condado. A senhora do guiché explica: depois de emitida, têm de esperar setenta e duas horas até à cerimónia. «O Texas dá-vos três dias para mudarem de ideias», diz ela. «A maioria não precisa.»')],choices:[
  {t:t('把护照、出生证明和翻译件一次带齐','Bring passport, birth certificate and translation, all at once','Levar passaporte, certidão de nascimento e tradução, tudo de uma vez'),req:()=>S.stats.oficio>=35||rel('grace').trust>=4||NEED(t('手艺 35 或格蕾丝信任 4','Craft 35 or Grace\'s trust 4','Ofício 35 ou confiança da Grace 4')),fx:()=>{S.flags.f1_lic=true;addTrust(F1.id(),1)},next:()=>say('',t('二十分钟就办完了。出门的时候，你们俩都不知道该把那张纸拿在谁手里。','Done in twenty minutes. Walking out, neither of you knows whose hand the paper should be in.','Despachado em vinte minutos. À saída, nenhum dos dois sabe em que mão deve ficar o papel.'))},
  {t:t('开到一半发现护照忘在店里了','Realize halfway there you left the passport at the shop','A meio do caminho, descobrir que o passaporte ficou no restaurante'),fx:()=>{S.flags.f1_lic=true;stat('tex',2);addLike(F1.id(),1)},next:()=>say('',t(`来回多开了一百二十英里。${P1()}一路上都在笑，笑到最后说：“我就当这是你的第一次反悔，已经用掉了。”`,`An extra hundred and twenty miles round trip. ${P1()} laughs the whole way and finally says: "I\'ll count that as your change of heart. It\'s used up."`,`Mais cento e noventa quilómetros, ida e volta. ${P1()} ri-se o caminho todo e por fim diz: «Conto isto como a tua desistência. Já a gastaste.»`))}]})},

/* ---------- W48 Sunday: the Santo António wedding ---------- */
{id:'f1_wedding',when:()=>S.week===48&&S.day===7&&S.slot===0&&!!S.flags.engaged&&!S.flags.married,run:()=>{
 const id=F1.id(),big=S.flags.festival!==false,st=S.flags.weddingStyle||'mixed';
 const off={dale:t('戴尔牧师合上圣经，没照着念。','Pastor Dale closes his Bible and doesn\'t read from it.','O Pastor Dale fecha a Bíblia e não lê.'),priest:t('老神父用葡语念了一遍，又用英语念了一遍，两遍都很慢。','The old priest says it once in Portuguese and once in English, both times slowly.','O padre velho diz tudo uma vez em português e outra em inglês, as duas devagar.'),earl:t('厄尔穿着他唯一一件西装，把你的名字念错了两次，第三次念对了，全场鼓掌。','Earl, in his only suit, gets your name wrong twice and right the third time. Everyone applauds.','O Earl, com o único fato que tem, diz o teu nome mal duas vezes e bem à terceira. Toda a gente aplaude.')}[S.flags.f1_off]||t('县里的治安法官被临时请来，戴着一顶牛仔帽。','A county justice of the peace is called in at the last minute, cowboy hat and all.','Chamam à última hora um juiz de paz do condado, de chapéu de cowboy e tudo.');
 const mom=S.flags.f1_mom==='fly'?t('妈妈坐在第一排，手里攥着阿尔贝蒂娜递给她的手帕。','Your mother sits in the front row, clutching the handkerchief Albertina gave her.','A tua mãe está na primeira fila, agarrada ao lenço que a Albertina lhe deu.'):S.flags.f1_mom==='video'?t('一部手机架在椅子上，屏幕里，妈妈穿着那条蓝裙子，在里斯本的夜里。','A phone is propped on a chair; on the screen, your mother in the blue dress, in the Lisbon night.','Há um telemóvel apoiado numa cadeira; no ecrã, a tua mãe de vestido azul, na noite de Lisboa.'):t('第一排留了一把空椅子，上面放着若泽的帽子。','One chair in the front row is left empty, with José\'s hat on it.','Uma cadeira da primeira fila fica vazia, com o chapéu do José.');
 return {title:t('圣安东尼的婚礼','The Santo António wedding','O casamento de Santo António'),meta:t('第 48 周 · 周日','Week 48 · Sunday','Semana 48 · Domingo'),text:[
  big?t('昨晚的花拱门还没拆。今年圣鲁伊斯只有一对“圣安东尼新人”，阿尔贝蒂娜说，一对也算。','Last night\'s flower arches are still up. This year San Luís has only one pair of Santo António newlyweds. Albertina says one pair counts.','Os arcos de ontem ainda estão de pé. Este ano San Luís só tem um par de noivos de Santo António. A Albertina diz que um par conta.')
   :t('节日办得冷清，婚礼就挪进了店里。三十把椅子，坐满了一大半——小城里，一大半就是全部的意思。','The festival was a quiet one, so the wedding moves into the shop. Thirty chairs, most of them full — in a small town, most means everyone who matters.','A festa foi modesta, por isso o casamento passa para dentro do restaurante. Trinta cadeiras, quase todas ocupadas — numa vila pequena, quase todas quer dizer toda a gente.'),
  {luso:t('桌上是烤沙丁鱼和一盆盆罗勒，老太太们唱起了里斯本的游行曲。','On the tables, grilled sardines and pots of basil; the old ladies sing Lisbon\'s parade songs.','Nas mesas, sardinhas assadas e manjericos; as senhoras cantam marchas de Lisboa.'),tex:t('牧场的烟熏炉从凌晨烧起，贝托亲手切的牛胸肉。靴子在木地板上踩出节拍。','The ranch smoker has been going since before dawn; Beto carves the brisket himself. Boots keep time on the floorboards.','O fumeiro do rancho está aceso desde a madrugada; o Beto corta o peito fumado com as próprias mãos. As botas marcam o compasso no soalho.'),mixed:t('蛋挞和牛胸肉摆在同一张长桌上。凯尔的吉他从法多一路弹进乡村乐，没人听出接缝在哪儿。','Custard tarts and brisket share one long table. Kyle\'s guitar slides from fado into country and nobody can hear the seam.','Natas e peito fumado na mesma mesa comprida. A guitarra do Kyle passa do fado ao country e ninguém dá pela costura.')}[st]||'',
  mom,S.flags.c4_rui?t('鲁伊站在你旁边当伴郎，西装是借贝托的，袖子长出一截。他小声说：“妈让我告诉你，领带歪了。”','Rui stands beside you as best man in a suit borrowed from Beto, sleeves an inch too long. He whispers: "Mom says to tell you your tie\'s crooked."','O Rui está ao teu lado como padrinho, com um fato emprestado pelo Beto, as mangas compridas demais. Sussurra: «A mãe manda dizer que tens a gravata torta.»'):'',off,
  t(`轮到誓词了。${P1()}站在你对面，等着你先开口。`,`Then the vows. ${P1()} stands facing you, waiting for you to go first.`,`Chegam os votos. ${P1()} está à tua frente, à espera que fales primeiro.`)].filter(Boolean),choices:[
  {t:t('用葡语说誓词','Say your vows in Portuguese','Dizer os votos em português'),fx:()=>{stat('saud',-4);addLike('albertina',1)},next:f1Vow},
  {t:t('用英语说，口音不藏','Say them in English, accent and all','Dizer em inglês, com sotaque e tudo'),fx:()=>{stat('tex',3)},next:f1Vow},
  {t:t('两种语言各说一半','Half in each language','Metade em cada língua'),req:()=>S.stats.tex>=35||NEED(t('德州味 35','Texanness 35','Texanidade 35')),fx:()=>{stat('tex',2);stat('saud',-2);S.rep+=2},next:f1Vow}]};
}});
function f1Vow(){
 const id=F1.id();S.flags.married=true;S.flags.weddingStyle=S.flags.weddingStyle||'mixed';
 S.rep+=S.flags.festival===false?3:6;addTrust(id,1);
 log(`和 ${res(SH(id),'zh')} 结婚了`,`Married ${res(SH(id),'en')}`,`Casaste com ${res(SH(id),'pt')}`);
 return {title:t('誓词','The vows','Os votos'),meta:NM(id),text:[
  t('你说完了，有一个词说错了，没人在乎。','You get through it with one word wrong. Nobody cares.','Chegas ao fim com uma palavra trocada. Ninguém se importa.'),
  F1.L('vow'),
  id==='jolene'?t('厄尔在后排擤鼻涕，声音像一辆卡车刹车。','In the back row Earl blows his nose like a truck braking.','Na última fila o Earl assoa-se como um camião a travar.'):id==='lucia'?t('贝托一整天没说话，只在你们走过他身边时，伸手拍了拍你的后脑勺。','Beto doesn\'t say a word all day, just cuffs the back of your head as you walk past.','O Beto não diz uma palavra o dia inteiro; só te dá uma palmada na nuca quando passam.'):t('阿尔贝蒂娜把一盆罗勒塞进你怀里，说这是圣安东尼的规矩。','Albertina shoves a pot of basil into your arms and says it\'s Saint Anthony\'s rule.','A Albertina enfia-te um manjerico nos braços e diz que é a regra do Santo António.')],
  choices:[{t:t('亲吻','Kiss','Beijar')},{t:t('笑着哭出来','Laugh until you cry','Rir até chorar')}]};
}

/* ===================== Chapter 5 «Lar» ===================== */
const F1G=()=>F1.fin;
const f1Say=(nx,title,text,meta)=>{const sc=say(title,text,meta);sc.choices[0].next=nx;return sc};
// opening if there was no wedding in the year
function c5Propose(){
 return {title:t('一周年后的早晨','The morning after the year','A manhã depois do ano'),meta:F1.M('补上一句','A question owed','Uma pergunta em dívida'),text:[
  t('格蕾丝的文件签完了，店是你的了。可你的签证还是那张——它只认店，不认你。这一年里，你有一句话一直没问。','Grace\'s papers are signed; the shop is yours. Your visa is still the same one, though — it knows the shop, not you. All year there\'s been one question you never asked.','Os papéis da Grace estão assinados; o restaurante é teu. Mas o visto continua o mesmo — conhece o restaurante, não te conhece a ti. Durante o ano inteiro houve uma pergunta que nunca fizeste.')],choices:[
  {t:t('在早餐桌上直接问','Ask over breakfast, just like that','Perguntar ao pequeno-almoço, assim mesmo'),fx:()=>{S.flags.engaged=true;S.flags.f1_prop='tart'},next:c5Yes},
  {t:t('骑马去牧场，等日落','Ride out to the ranch and wait for sunset','Ir a cavalo até ao rancho e esperar o pôr do sol'),req:()=>S.course.ride>=1||NEED(t('骑马 1','Riding 1','Equitação 1')),fx:()=>{S.flags.engaged=true;S.flags.f1_prop='ranch';stat('tex',2)},next:c5Yes},
  {t:t('在空地上拉灯串，唱法多','String lights over the lot, sing fado','Luzes sobre o terreno e um fado'),req:()=>S.stats.saud>=30||NEED(t('乡愁 30','Homesickness 30','Saudade 30')),fx:()=>{S.flags.engaged=true;S.flags.f1_prop='fado';stat('saud',-3)},next:c5Yes}]};
}
function c5Yes(){
 return {title:t('答案','The answer','A resposta'),meta:NM(F1.id()),text:[t(`${P1()}放下杯子，看了你很久。`,`${P1()} puts the cup down and looks at you for a long time.`,`${P1()} pousa a chávena e olha para ti muito tempo.`),F1.L('yes')],choices:[
  {t:t('那就下个月','Next month, then','Então no mês que vem'),next:c5Wed},{t:t('那就越快越好','Then the sooner the better','Então quanto antes melhor'),next:c5Wed}]};
}
function c5Wed(){
 const done=st=>()=>{S.flags.married=true;S.flags.weddingStyle=st;addTrust(F1.id(),1);log('结婚了','Married','Casaste')};
 return {title:t('小婚礼','A small wedding','Um casamento pequeno'),meta:F1.M('一个月后','A month later','Um mês depois'),text:[
  t('没有节日，没有游行。领了证，等满七十二小时，周日下午在店后的空地上，摆了四张长桌。','No festival, no parade. License from the county clerk, seventy-two hours\' wait, and on a Sunday afternoon four long tables on the lot behind the shop.','Sem festa, sem desfile. Licença no registo do condado, setenta e duas horas de espera, e num domingo à tarde quatro mesas compridas no terreno atrás do restaurante.'),
  t('阿尔贝蒂娜说：“圣安东尼不看日历。”','Albertina says: "Saint Anthony doesn\'t check the calendar."','A Albertina diz: «O Santo António não olha para o calendário.»')],choices:[
  {t:t('烤沙丁鱼，放法多','Grilled sardines and fado','Sardinhas assadas e fado'),fx:done('luso'),next:c5Vow},
  {t:t('牛胸肉和排舞','Brisket and line dancing','Peito fumado e line dance'),fx:done('tex'),next:c5Vow},
  {t:t('两样都要','Both','As duas coisas'),req:()=>S.fusion.unlocked||t('先研发融合菜','Develop fusion dishes first','Primeiro cria os pratos de fusão'),fx:done('mixed'),next:c5Vow}]};
}
function c5Vow(){
 return {title:t('誓词','The vows','Os votos'),meta:NM(F1.id()),text:[t('你的誓词很短，说到一半就忘了后面的。','Your vows are short, and you forget the second half.','Os teus votos são curtos, e esqueces a segunda metade.'),F1.L('vow')],choices:[
  {t:t('亲吻','Kiss','Beijar'),next:c5Open},{t:t('先去把炭火翻一下','Go turn the coals first','Ir primeiro virar as brasas'),fx:()=>stat('oficio',1),next:c5Open}]};
}

function c5Open(){
 const ines=!F1.cit();
 return {title:t('家','Home','Lar'),meta:F1.M('第一个夏天','The first summer','O primeiro verão'),text:[
  t('一年过去了，你没走。店还是那家店，楼上的小房间里多了一把牙刷、一双靴子、半个衣柜的别人的衣服。','The year is over and you didn\'t leave. The shop is the same shop; the little room upstairs now has a second toothbrush, another pair of boots, half a closet of someone else\'s clothes.','O ano acabou e não foste embora. O restaurante é o mesmo; o quartinho lá em cima tem agora uma segunda escova de dentes, outras botas, meio armário de roupa de outra pessoa.'),
  t('格蕾丝那份文件收进了抽屉。从今天起，没有人再数你在这里待了多少周。','Grace\'s papers go into a drawer. From today, nobody is counting your weeks here anymore.','Os papéis da Grace vão para uma gaveta. A partir de hoje, já ninguém conta as tuas semanas aqui.'),
  ines?t('伊内丝把里斯本的公寓退了，三个纸箱寄过来，最重的那个装的全是书和你妈妈腌的橄榄。','Inês gave up her Lisbon flat and shipped three boxes. The heaviest is all books and olives your mother cured.','A Inês entregou o apartamento de Lisboa e mandou três caixas. A mais pesada é só livros e azeitonas curadas pela tua mãe.')
   :t(`${P1()}说：“这间房子小得像个船舱。”然后又说：“我喜欢船舱。”`,`${P1()} says: "This room is small as a ship\'s cabin." Then: "I like cabins."`,`${P1()} diz: «Este quarto é pequeno como um camarote.» E depois: «Gosto de camarotes.»`)],choices:[
  {t:t('把楼上收拾成两个人的家','Make the upstairs a home for two','Fazer do andar de cima uma casa para dois'),fx:()=>{S.flags.f1_house='upstairs';stat('saud',-2)},next:c5Papers},
  {t:t('在镇上租一栋带院子的小房子','Rent a little house with a yard in town','Alugar uma casinha com quintal na vila'),req:MONEY(600),fx:()=>{S.cash-=600;S.flags.f1_house='yard';stat('tex',2)},next:c5Papers}]};
}
function c5Papers(){
 const ines=!F1.cit(),g=F1.id()==='grace';
 return {title:t('文件','Paperwork','Papelada'),meta:F1.M('七月','July','Julho'),text:[
  g?t('格蕾丝说她不能当自己丈夫的律师——“利益冲突，我会被吊销执照”——然后花了一整个晚上，把她要是能当的话会怎么办写在一张纸上。','Grace says she can\'t be her own husband\'s lawyer — "conflict of interest, I\'d lose my license" — then spends a whole evening writing down exactly what she\'d do if she could.','A Grace diz que não pode ser advogada do próprio marido — «conflito de interesses, perdia a cédula» — e depois passa uma noite inteira a escrever tudo o que faria se pudesse.')
   :t('格蕾丝把一摞表格分成两堆，像在发牌。','Grace splits a stack of forms into two piles, like she\'s dealing cards.','A Grace divide uma pilha de formulários em dois montes, como quem dá cartas.'),
  ines?t('“伊内丝是葡萄牙人，她帮不了你拿绿卡。但她是你的配偶，可以跟着你的条约投资者签证留下，还能合法工作。你们俩的身份，从此都绑在这家店上。”','"Inês is Portuguese, so she can\'t get you a green card. But as your spouse she can stay on your E-2 as a dependent, and she can work. From now on both of you are tied to this shop."','«A Inês é portuguesa, por isso não te pode dar um green card. Mas, como cônjuge, pode ficar como dependente do teu E-2, e pode trabalhar. A partir de agora estão os dois presos a este restaurante.»')
   :t(`“你和美国公民结了婚，可以在国内递交亲属移民申请，同时申请调整身份。然后去圣安东尼奥的移民局面谈。他们会问很细的问题。”`,`"You\'re married to a U.S. citizen. You can file the I-130 and, at the same time, the I-485 to adjust status from here. Then an interview at the immigration office in San Antonio. They ask very specific questions."`,`«Estás casado com um cidadão americano. Podem entregar o I-130 e, ao mesmo tempo, o I-485 para ajustar o estatuto sem sair do país. Depois há uma entrevista nos serviços de imigração em San Antonio. Fazem perguntas muito concretas.»`)],choices:[
  {t:t('自己填，晚上关了店慢慢填','Fill them in yourselves, nights after closing','Preencher vocês mesmos, à noite depois de fechar'),fx:()=>{stat('tex',2);addTrust(F1.id(),1)},next:c5Binder},
  {t:t('请奥斯汀的移民律师','Hire an immigration lawyer in Austin','Contratar um advogado de imigração em Austin'),req:MONEY(1500),fx:()=>{S.cash-=1500;S.flags.f1_lawyer=true},next:c5Binder},
  {t:t(`交给${res(P1(),'zh')}，你负责做饭`,`Leave it to ${res(P1(),'en')}; you do the cooking`,`Deixar com ${res(P1(),'pt')}; tu cozinhas`),fx:()=>{addLike(F1.id(),1);stat('oficio',1)},next:c5Binder}]};
}
function c5Binder(){
 return {title:t('真实生活的证据','Evidence of a real life','Provas de uma vida a sério'),meta:F1.M('八月','August','Agosto'),text:[
  t('律师说，最好的证据不是漂亮的照片，是乱七八糟的生活：两个人名字的电费单、共同账户、谁半夜去买的退烧药。','The lawyer says the best evidence isn\'t pretty photos, it\'s messy life: power bills in both names, a joint account, who went out at midnight for fever medicine.','O advogado diz que a melhor prova não são fotografias bonitas, é a vida desarrumada: contas da luz em nome dos dois, uma conta conjunta, quem foi à meia-noite comprar o remédio para a febre.'),
  t('翻到第三页，你发现你们俩连吵架都有证据：一张两个人签名的罚单，那天谁开的车，到现在还没说清楚。','By page three you find you even have evidence of your fights: a parking ticket signed by you both. Who was driving that day is still disputed.','Na terceira página descobres que até das discussões há provas: uma multa assinada pelos dois. Quem conduzia nesse dia ainda está por apurar.'),
  t('你们把一个大文件夹摊在店里最大的那张桌子上。','You spread a big binder over the biggest table in the shop.','Espalham uma pasta enorme na maior mesa do restaurante.')],choices:[
  {t:t('从店里墙上取下那些照片','Take the photos down off the shop wall','Tirar as fotografias da parede do restaurante'),fx:()=>{S.flags.f1_proof='photos'},next:c5Letter},
  {t:t('打印一年的共同账户流水','Print a year of the joint account','Imprimir um ano da conta conjunta'),fx:()=>{S.flags.f1_proof='bank';stat('oficio',1)},next:c5Letter},
  {t:t('请阿尔贝蒂娜写一封证明信','Ask Albertina to write a letter for you','Pedir à Albertina uma carta a vosso favor'),req:()=>rel('albertina').trust>=3||NEED(t('阿尔贝蒂娜信任 3','Albertina\'s trust 3','confiança da Albertina 3')),fx:()=>{S.flags.f1_proof='albertina';addLike('albertina',1)},next:c5Letter}]};
}
function c5Letter(){
 const ines=!F1.cit();
 return {title:t('匿名信','The anonymous letter','A carta anónima'),meta:F1.M('九月','September','Setembro'),text:[
  ines?t('移民局收到一封匿名信，说你的店是个空壳，账是做出来的，开店只是为了签证。','The immigration office gets an anonymous letter: your shop is a shell, the books are cooked, it exists only for the visa.','Os serviços de imigração recebem uma carta anónima: o restaurante é uma fachada, as contas são inventadas, só existe por causa do visto.')
   :t('移民局收到一封匿名信，说你们是假结婚，“为了一张绿卡”。','The immigration office gets an anonymous letter saying your marriage is a sham, "for a green card."','Os serviços de imigração recebem uma carta anónima a dizer que o vosso casamento é falso, «por um green card».'),
  t('格蕾丝只看了一眼信纸的水印就认出来了：特拉维斯的律师事务所。“他输了那块地，总得找点事做。”','Grace recognizes the letterhead watermark at a glance: Travis\'s law firm. "He lost the land. He\'s got to keep busy somehow."','A Grace reconhece a marca de água do papel num instante: o escritório de advogados do Travis. «Perdeu o terreno. Tem de se entreter com alguma coisa.»')].filter(Boolean),choices:[
  {t:t('什么都不做，只把真相准备好','Do nothing but have the truth ready','Não fazer nada, só ter a verdade pronta'),fx:()=>{addTrust(F1.id(),1);S.flags.f1_calm=true},next:c5Interview},
  {t:t('请镇上的人写信作证','Ask the town to write letters for you','Pedir à vila que escreva cartas a vosso favor'),req:()=>S.rep>=30||NEED(t('口碑 30','Reputation 30','Reputação 30')),fx:()=>{S.rep+=2;S.flags.f1_town=true},next:c5Interview},
  {t:t('去健身房找特拉维斯当面谈','Go find Travis at the gym','Ir ter com o Travis ao ginásio'),fx:()=>{stat('tex',2)},next:()=>({title:t('铁马健身房','The Iron Mustang','O Iron Mustang'),meta:NM('travis'),text:[t('特拉维斯在卧推，没起身。“我不知道你在说什么。”停了一下，“不过要是我，我就不会浪费时间。真的东西，查不倒。”','Travis is on the bench and doesn\'t get up. "No idea what you\'re talking about." A pause. "But if I were you, I wouldn\'t waste my time. The real thing doesn\'t fall over."','O Travis está no supino e não se levanta. «Não sei do que falas.» Uma pausa. «Mas, se fosse a ti, não perdia tempo. O que é verdadeiro não cai.»')],choices:[{t:t('转身走','Turn and walk out','Virar costas e sair'),next:c5Interview},{t:t('替他数完这一组','Count out his set for him','Contar-lhe a série até ao fim'),fx:()=>stat('charme',1),next:c5Interview}]})}]};
}
function c5Interview(){
 const ines=!F1.cit(),pass=()=>{S.flags.f1_pass=true};
 if(ines)return {title:t('上门核查','The site visit','A visita ao local'),meta:F1.M('十月','October','Outubro'),text:[
  t('一位移民局的官员中午来了店里，没提前打招呼。她数桌子，翻账本，看厨房，最后问伊内丝：“你在这里做什么？”','An immigration officer turns up at lunchtime unannounced. She counts tables, leafs through the books, looks at the kitchen, and finally asks Inês: "And what do you do here?"','Uma funcionária da imigração aparece à hora de almoço sem avisar. Conta as mesas, folheia as contas, espreita a cozinha e por fim pergunta à Inês: «E a senhora, o que faz aqui?»')],choices:[
  {t:t('让她看看午市的人潮','Let her watch the lunch rush','Deixá-la ver a enchente do almoço'),req:()=>S.rep>=25||NEED(t('口碑 25','Reputation 25','Reputação 25')),fx:pass,next:()=>f1Say(c5Card,'',t('排队的人一直排到了人行道上。官员在表格上打了个勾，又买了一份牛胸肉夹包带走。','The line runs out onto the sidewalk. The officer ticks a box and buys a brisket sandwich to go.','A fila chega ao passeio. A funcionária faz um visto no formulário e leva uma sandes de peito fumado.'),F1.M('通过','Approved','Aprovado'))},
  {t:t('让伊内丝自己说实话','Let Inês answer for herself, honestly','Deixar a Inês responder ela mesma, com verdade'),fx:pass,next:()=>f1Say(c5Card,'',t('“我管账，”伊内丝说，“还管他。两样都不容易。”官员笑了，把账本合上。','"I keep the books," Inês says. "And I keep him. Neither is easy." The officer laughs and closes the ledger.','«Faço as contas», diz a Inês. «E aturo-o a ele. Nenhuma das duas é fácil.» A funcionária ri-se e fecha o livro.'),F1.M('通过','Approved','Aprovado'))},
  {t:t('抢着替她回答','Jump in and answer for her','Responder por ela, à pressa'),fx:()=>{S.flags.f1_pass=false},next:c5Second}]};
 return {title:t('面谈','The interview','A entrevista'),meta:F1.M('十月 · 圣安东尼奥','October · San Antonio','Outubro · San Antonio'),text:[
  t('圣安东尼奥的移民局办公室，空调开得像冷库。官员把你们分开，一人一间。','The immigration office in San Antonio, air conditioning set to meat locker. The officer separates you, one room each.','Os serviços de imigração em San Antonio, ar condicionado em modo câmara frigorífica. O funcionário separa-vos, uma sala para cada um.'),
  t(`他翻开你们的文件，问的第一个问题是：“${res(P1(),'zh')}的牙刷是什么颜色？”`,`He opens your file and the first question is: "What color is ${res(P1(),'en')}\'s toothbrush?"`,`Abre o processo e a primeira pergunta é: «De que cor é a escova de dentes de ${res(P1(),'pt')}?»`)],choices:[
  {t:t('说实话：绿色，刷毛早就开叉了','The truth: green, bristles splayed out ages ago','A verdade: verde, com as cerdas abertas há muito'),fx:()=>{pass();addTrust(F1.id(),1)},next:()=>f1Say(c5Card,'',t('隔壁房间里，同一个问题，同一个答案，还多了一句：“他一直说要给我买新的。”官员在两张纸上打了同一个勾。','Next door, same question, same answer, plus: "He keeps saying he\'ll buy me a new one." The officer ticks the same box on both sheets.','Na sala ao lado, mesma pergunta, mesma resposta, e mais: «Ele anda sempre a dizer que me compra uma nova.» O funcionário faz o mesmo visto nas duas folhas.'),F1.M('通过','Approved','Aprovado'))},
  {t:t('背律师让你准备的标准答案','Recite the answers you rehearsed','Recitar as respostas ensaiadas'),fx:()=>{S.flags.f1_pass=false},next:c5Second},
  {t:t('开玩笑：“新的还是旧的那支？”','Joke: "The new one or the old one?"','Brincar: «A nova ou a velha?»'),req:CHARM_REQ(50),fx:()=>{pass();stat('charme',1)},next:()=>f1Say(c5Card,'',t('官员没笑，但他的笔停了一下。“都说说。”你说了。都对。','The officer doesn\'t laugh, but his pen pauses. "Both." You tell him. Both match.','O funcionário não se ri, mas a caneta para. «As duas.» Dizes. Batem certo as duas.'),F1.M('通过','Approved','Aprovado'))}]};
}
function c5Second(){
 return {title:t('第二次','A second time','Segunda vez'),meta:F1.M('十一月','November','Novembro'),text:[
  t('背好的答案太整齐了，两间屋子里说出来一字不差。官员皱了眉：“下个月再来一次，带上你们真正的生活。”','The rehearsed answers were too neat, word for word identical in both rooms. The officer frowned: "Come back next month. Bring your actual life."','As respostas ensaiadas eram arrumadas demais, iguais palavra por palavra nas duas salas. O funcionário franziu a testa: «Voltem no mês que vem. Tragam a vossa vida a sério.»'),
  t('回去的路上谁也没说话。到了州际公路的出口，你们才同时开口，说的是同一句：“对不起。”','Nobody talks on the drive back. At the interstate exit you both speak at once, and it\'s the same word: "Sorry."','Ninguém fala no regresso. Na saída da autoestrada falam os dois ao mesmo tempo, e é a mesma palavra: «Desculpa.»'),
  t('这一次，你们没有排练。','This time you don\'t rehearse.','Desta vez não ensaiam.')],choices:[
  {t:t('带上那口一起烧糊的平底锅','Bring the frying pan you both scorched','Levar a frigideira que queimaram juntos'),fx:()=>{S.flags.f1_pass=true;addLike(F1.id(),1)},next:c5Card},
  {t:t('请阿尔贝蒂娜亲自跟车去','Bring Albertina along in person','Levar a Albertina em pessoa'),req:()=>rel('albertina').like>=3||NEED(t('阿尔贝蒂娜好感 3','Albertina\'s affection 3','afeto da Albertina 3')),fx:()=>{S.flags.f1_pass=true;addTrust('albertina',1)},next:c5Card},
  {t:t('只带一句实话：我们吵过架，也和好过','Bring just the truth: we\'ve fought, and made up','Levar só a verdade: já discutimos e fizemos as pazes'),fx:()=>{S.flags.f1_pass=true;addTrust(F1.id(),1)},next:c5Card}]};
}
function c5Card(){
 const ines=!F1.cit();
 return {title:ines?t('配偶身份','Spouse status','Estatuto de cônjuge'):t('两年期的绿卡','A two-year green card','Um green card de dois anos'),meta:F1.M('冬天','Winter','Inverno'),text:[
  ines?t('伊内丝的配偶身份批下来了，连同工作许可。她把那张卡片和若泽的信放在同一个抽屉里：“这样它们互相作伴。”','Inês\'s E-2 spouse status comes through, work permit and all. She puts the card in the same drawer as José\'s letters. "So they keep each other company."','O estatuto de cônjuge E-2 da Inês é aprovado, com autorização de trabalho e tudo. Ela guarda o cartão na mesma gaveta que as cartas do José. «Assim fazem companhia uns aos outros.»')
   :t('信封到了。因为结婚还不满两年，你拿到的是一张两年期的有条件绿卡。两年后要再递一份取消条件的申请，证明你们还在一起。','The envelope arrives. Because you\'ve been married less than two years, it\'s a conditional green card, good for two years. Before it runs out you\'ll file the I-751 to remove the conditions — proof you\'re still together.','Chega o envelope. Como estão casados há menos de dois anos, é um green card condicional, válido por dois anos. Antes de caducar, entregam o I-751 para retirar as condições — a prova de que continuam juntos.'),
  ines?t('你们俩的未来，还是系在这家店上。你突然觉得，系在这儿也没什么不好。','Both your futures are still tied to this shop. Suddenly that doesn\'t seem like such a bad place to be tied.','O futuro dos dois continua preso a este restaurante. De repente, não parece mau sítio para se estar preso.')
   :t('你的身份第一次不再绑在店上了。你可以把店卖了，可以关门一个月——你什么都不想做，只想照常开门。','For the first time your status isn\'t tied to the shop. You could sell it, close for a month — and all you want to do is open as usual.','Pela primeira vez o teu estatuto não está preso ao restaurante. Podias vendê-lo, fechar um mês — e só te apetece abrir como sempre.')],choices:[
  {t:t('去厄尔的酒吧请全场喝一轮','Buy the whole Lone Star a round','Pagar uma rodada a todo o Lone Star'),req:MONEY(150),fx:()=>{S.cash-=150;addLike('earl',1);S.rep+=2},next:()=>f1Moment(c5Kids)},
  {t:t('把卡片放进若泽的信旁边','Put the card next to José\'s letters','Guardar o cartão junto às cartas do José'),fx:()=>{stat('saud',-2)},next:()=>f1Moment(c5Kids)}]};
}
// partner-specific married moment (written by writer P); skipped if missing
function f1Moment(nx){
 let sc=null;try{const p=PARTNER[F1.id()];if(p&&typeof p.moment==='function')sc=p.moment()}catch(e){sc=null}
 if(!sc||typeof sc!=='object')return nx();
 const ch=(Array.isArray(sc.choices)&&sc.choices.length?sc.choices:[{t:t('继续','Continue','Continuar')}]).map(c=>Object.assign({},c,{next:nx}));
 return Object.assign({},sc,{title:sc.title||t('婚后','Married life','Vida de casados'),text:Array.isArray(sc.text)?sc.text:[sc.text||''],choices:ch});
}
function c5Kids(again){
 const ch=[];
 if(F1.carry())ch.push({t:t('我们要一个孩子吧','Let\'s have a baby','Vamos ter um bebé'),next:c5Preg});
 ch.push({t:F1.carry()?t('我们去收养吧','Let\'s adopt','Vamos adotar'):t('我们去申请寄养，再收养','Let\'s foster, then adopt','Vamos ser família de acolhimento e depois adotar'),next:c5Foster});
 if(again)ch.push({t:t('就我们俩，也很好','Just the two of us is good too','Só nós os dois também é bom'),fx:()=>{S.flags.f1_nokids=true;addTrust(F1.id(),1)},next:c5Shop});
 else ch.push({t:t('再等等','Let\'s wait','Vamos esperar'),fx:()=>{S.flags.f1_wait=true},next:()=>c5Kids(true)});
 return {title:again?t('又一年','Another year','Mais um ano'):t('第三把椅子','A third chair','Uma terceira cadeira'),meta:F1.M(again?'第三年春天':'第二年春天',again?'Spring, year three':'Spring, year two',again?'Primavera do terceiro ano':'Primavera do segundo ano'),text:[
  again?t('又一年过去了。店里的常客问过三次“什么时候”，你都笑着岔开。今晚是你们自己先提起来的。','Another year. The regulars have asked "so when?" three times and you\'ve laughed it off each time. Tonight you bring it up yourselves.','Passou mais um ano. Os clientes habituais já perguntaram três vezes «então, quando?» e tu riste-te sempre. Esta noite são vocês a falar nisso.')
   :t('打烊后你们坐在空地上，那里现在种着节日留下的罗勒。你看见小戴尔在路灯下教一个更小的孩子骑车。','After closing you sit out on the lot, where the festival basil is growing now. Under a streetlight, little Dale is teaching an even smaller kid to ride a bike.','Depois de fechar sentam-se no terreno, onde agora crescem os manjericos da festa. Debaixo de um candeeiro, o pequeno Dale ensina um miúdo ainda mais pequeno a andar de bicicleta.'),
  F1.carry()?t(`${P1()}看着他们，问你：“你想过吗？”`,`${P1()} watches them and asks: "Have you thought about it?"`,`${P1()} fica a vê-los e pergunta: «Já pensaste nisso?»`)
   :t(`${P1()}看着他们说：“德州有寄养转收养的路。先当寄养家庭，孩子住满六个月，再去法院。”${res(F1.he(),'zh')}顿了顿，“我查过了。查了好几个月。”`,`${P1()} watches them. "Texas has foster-to-adopt. You become a foster home first, the kid lives with you six months, then you go to court." A pause. "I looked it up. Been looking for months."`,`${P1()} fica a vê-los. «No Texas há acolhimento com vista à adoção. Primeiro és família de acolhimento, a criança vive contigo seis meses, depois vais a tribunal.» Uma pausa. «Andei a ver isso. Há meses.»`)],choices:ch};
}

/* --- pregnancy --- */
function c5Preg(){
 return {title:t('柠檬','Lemons','Limões'),meta:F1.M('第二年夏天','Summer, year two','Verão do segundo ano'),text:[
  t(`两条线。${P1()}把验孕棒放在吧台上，像放一张账单。你看了很久，才明白那不是账单。`,`Two lines. ${P1()} sets the test on the counter like a bill. You stare a long time before you understand it isn\'t a bill.`,`Duas riscas. ${P1()} pousa o teste no balcão como quem pousa uma conta. Olhas muito tempo até perceberes que não é uma conta.`),
  t('第二周开始孕吐。烤沙丁鱼的味道一飘过来，就得跑后门。','By the second week the morning sickness starts. One whiff of grilled sardines and it\'s a dash for the back door.','À segunda semana começam os enjoos. Basta o cheiro das sardinhas assadas para fugir pela porta das traseiras.')],choices:[
  {t:t('沙丁鱼停一个月','Take sardines off the menu for a month','Tirar as sardinhas da ementa durante um mês'),fx:()=>{S.rep-=2;addLike(F1.id(),2)},next:c5Scan},
  {t:t('在柜台后面放一碗切开的柠檬','Keep a bowl of cut lemons behind the counter','Pôr uma taça de limões cortados atrás do balcão'),fx:()=>{addLike(F1.id(),1);stat('saud',-1)},next:c5Scan},
  {t:t('学做几道没有烟味的菜','Learn a few dishes with no smoke at all','Aprender uns pratos sem fumo nenhum'),req:()=>S.stats.oficio>=45||NEED(t('手艺 45','Craft 45','Ofício 45')),fx:()=>{stat('oficio',2);addTrust(F1.id(),1)},next:c5Scan}]};
}
function c5Scan(){
 const h=F1.id()==='hannah';
 const sx=x=>()=>{S.flags.f1_sex=x};
 return {title:t('奥斯汀的检查','The scan in Austin','A ecografia em Austin'),meta:F1.M('秋天','Fall','Outono'),text:[
  h?t('汉娜说她不能给自己看病，然后在去奥斯汀的路上，把产科医生要说的每一句话都提前说了一遍。','Hannah says she can\'t be her own doctor, then on the drive to Austin recites everything the obstetrician is going to say, in advance.','A Hannah diz que não pode ser médica de si mesma e, a caminho de Austin, recita antecipadamente tudo o que a obstetra vai dizer.')
   :t('汉娜医生帮你们约了奥斯汀的产科，还亲自开车送去：“小城的医生，什么都得管。”','Dr. Hannah books you an obstetrician in Austin and drives you there herself. "Small-town doctor. Everything\'s my job."','A Dra. Hannah marca-vos uma obstetra em Austin e leva-vos lá ela própria. «Médica de vila. Tudo é comigo.»'),
  t('屏幕上一团灰白的影子，心跳声像一匹小马跑过木桥。医生问：“想知道是男孩还是女孩吗？”','A grey-white blur on the screen, a heartbeat like a pony crossing a wooden bridge. The doctor asks: "Do you want to know if it\'s a boy or a girl?"','Uma mancha branca e cinzenta no ecrã, um coração que soa a um pónei a atravessar uma ponte de madeira. A médica pergunta: «Querem saber se é menino ou menina?»')],choices:[
  {t:t('想——是男孩','Yes — a boy','Sim — é menino'),fx:sx('boy'),next:c5Birth},
  {t:t('想——是女孩','Yes — a girl','Sim — é menina'),fx:sx('girl'),next:c5Birth},
  {t:t('不，留到那天','No, save it for the day','Não, guardem para o dia'),fx:sx('surprise'),next:c5Birth}]};
}
function c5Birth(){
 const v=S.flags.festival?pick(['storm','close','fest']):pick(['storm','close']);S.flags.f1_night=v;
 const go=()=>c5Born();
 return {title:t('那一夜','That night','Aquela noite'),meta:F1.M('第三年','Year three','Terceiro ano'),text:[
  {storm:t('四月的雷暴，主街停了电。羊水破的时候，你手里还拿着蜡烛。','An April thunderstorm, Main Street blacked out. When the waters break you\'re still holding a candle.','Uma trovoada de abril, a rua principal sem luz. Quando as águas rebentam ainda tens uma vela na mão.'),
   close:t('刚打烊，你在拖地，椅子都倒扣在桌上。后面传来一声：“别拖了。现在。”','Just closed, you\'re mopping, chairs upside down on the tables. From behind you: "Stop mopping. Now."','Acabaste de fechar, estás a passar a esfregona, as cadeiras viradas em cima das mesas. Lá de trás: «Para com isso. É agora.»'),
   fest:t('圣安东尼节当天，空地上全是人。烟花放到第三发，你被人从烤架边上拽走了。','The day of Santo António, the lot packed with people. On the third firework someone yanks you away from the grill.','Dia de Santo António, o terreno cheio de gente. Ao terceiro foguete, alguém te arranca da grelha.')}[v],
  t('奥斯汀的医院在一个小时车程外。','The hospital in Austin is an hour\'s drive away.','O hospital de Austin fica a uma hora de carro.')],choices:[
  {t:t('你自己开车','You drive','Conduzes tu'),req:()=>S.course.drive>=1||NEED(t('开车 1','Driving 1','Condução 1')),fx:()=>{stat('tex',2)},next:go},
  {t:t('打给韦德，他的皮卡开得最快','Call Wade, his pickup\'s the fastest','Ligar ao Wade, a carrinha dele é a mais rápida'),fx:()=>{addTrust('wade',1)},next:go},
  {t:t('叫救护车，手一直别松开','Call an ambulance and don\'t let go of that hand','Chamar a ambulância e não largar aquela mão'),fx:()=>{addTrust(F1.id(),1)},next:go}]};
}
function c5Born(){
 if(S.flags.f1_sex==='surprise'||!S.flags.f1_sex)S.flags.f1_sex=pick(['boy','girl']);
 const g=S.flags.f1_sex==='girl';
 return {title:g?t('是个女孩','It\'s a girl','É uma menina'):t('是个男孩','It\'s a boy','É um menino'),meta:F1.M('凌晨四点','4 a.m.','Quatro da manhã'),text:[
  t('凌晨四点十二分。护士把孩子放在胸口上，小得像一条刚出水的沙丁鱼，哭声大得像一整个乐队。','Four-twelve in the morning. The nurse lays the baby on a chest, small as a sardine fresh out of the water, crying like a whole brass band.','Quatro e doze da manhã. A enfermeira deita o bebé ao peito, pequeno como uma sardinha acabada de pescar, a chorar como uma banda inteira.'),
  t('窗外天快亮了。房间里很安静，只剩孩子的哭声和监护仪的嘀嗒。','Outside it\'s nearly dawn. The room is quiet except for the crying and the beep of the monitor.','Lá fora está quase a amanhecer. O quarto está em silêncio, tirando o choro e o apito do monitor.'),F1.L('baby')],choices:[
  {t:t('该起名字了','Time to pick a name','Está na hora de escolher um nome'),next:c5Name}]};
}
function f1Child(sex,z,e,p){S.flags.child={name:t(z,e,p),n:[z,e,p],sex};log(`孩子的名字：${z}`,`The baby\'s name: ${e}`,`O nome do bebé: ${p}`)}
function c5Name(){
 const g=S.flags.f1_sex==='girl';
 const N=(lab,z,e,p,fx)=>({t:lab,fx:()=>{f1Child(g?'girl':'boy',z,e,p);if(fx)fx()},next:c5Nights});
 return {title:t('名字','The name','O nome'),meta:F1.M('出生证明','Birth certificate','Certidão de nascimento'),text:[
  t('护士拿着出生证明的表格站在床边，笔已经拔开了。','The nurse stands by the bed with the birth certificate form, pen already uncapped.','A enfermeira está junto à cama com o formulário da certidão, a caneta já destapada.'),
  g?t('你想到了妈妈，也想到了这片土地上开的花。','You think of your mother, and of the flowers that grow in this country.','Pensas na tua mãe, e nas flores que crescem nesta terra.'):t('你想到了若泽，那个把你带到这里、自己却再没回过家的人。','You think of José, who brought you here and never went home himself.','Pensas no José, que te trouxe até aqui e nunca mais voltou a casa.')],choices:g?[
  N(t('葡语名：费尔南达，随外婆','Portuguese: Fernanda, after her grandmother','Português: Fernanda, como a avó'),'费尔南达','Fernanda','Fernanda',()=>stat('saud',-3)),
  N(t('英语名：罗丝','English: Rose','Inglês: Rose'),'罗丝','Rose','Rose',()=>stat('tex',2)),
  N(t('两个都要：费尔南达·罗丝','Both: Fernanda Rose','As duas: Fernanda Rose'),'费尔南达·罗丝','Fernanda Rose','Fernanda Rose')]:[
  N(t('葡语名：若泽，纪念舅舅','Portuguese: José, for your uncle','Português: José, pelo teu tio'),'若泽','José','José',()=>stat('saud',-3)),
  N(t('英语名：卢克','English: Luke','Inglês: Luke'),'卢克','Luke','Luke',()=>stat('tex',2)),
  N(t('两个都要：若泽·卢克','Both: José Luke','Os dois: José Luke'),'若泽·卢克','José Luke','José Luke')]};
}
function c5Nights(){
 const L=k=>()=>{S.flags.f1_lang=k};
 return {title:t('夜里三点的歌','Songs at 3 a.m.','Canções às três da manhã'),meta:F1.M('头三个月','The first three months','Os primeiros três meses'),text:[
  t(`${F1.kid()}白天睡，夜里醒。你抱着${res(F1.kHe(),'zh')}在店里一圈一圈地走，走过烤架，走过若泽的照片。`,`${F1.kid()} sleeps all day and wakes all night. You walk laps of the shop, past the grill, past José\'s photo.`,`${F1.kid()} dorme de dia e acorda de noite. Dás voltas e voltas ao restaurante, pela grelha, pela fotografia do José.`),
  t('你得唱点什么。','You have to sing something.','Tens de cantar alguma coisa.')],choices:[
  {t:t('唱法多','Sing fado','Cantar fado'),fx:L('pt'),next:c5Baptism},{t:t('唱乡村老歌','Sing old country songs','Cantar country antigo'),fx:L('tex'),next:c5Baptism},{t:t('一首法多，一首乡村','One fado, one country','Um fado, um country'),fx:L('both'),next:c5Baptism}]};
}

/* --- foster-to-adopt --- */
function c5Foster(){
 const pref=k=>()=>{S.flags.f1_pref=k};
 return {title:t('寄养家庭','A foster home','Família de acolhimento'),meta:F1.M('第二年夏天','Summer, year two','Verão do segundo ano'),text:[
  t('德州的路是这样的：先上培训课，做背景调查和家访，成为寄养家庭；孩子住进来，满六个月，才能在法院办收养。','In Texas the road goes like this: training classes, background checks and a home study to become a foster home; a child moves in; after six months, you can finalize the adoption in court.','No Texas o caminho é este: formação, verificação de antecedentes e visita domiciliária para se tornarem família de acolhimento; uma criança vem viver convosco; ao fim de seis meses, podem concluir a adoção em tribunal.'),
  t('培训课在韦科，每周四晚上，一共十个星期。最后一堂课上，老师问：“你们准备好接一个什么样的孩子？”','The classes are in Waco, Thursday nights, ten weeks. In the last one the teacher asks: "What child are you ready for?"','A formação é em Waco, às quintas à noite, dez semanas. Na última aula a formadora pergunta: «Estão preparados para que criança?»')],choices:[
  {t:t('小婴儿','A baby','Um bebé'),fx:pref('baby'),next:c5Home},{t:t('大一点的孩子','An older child','Uma criança mais crescida'),fx:pref('older'),next:c5Home},{t:t('谁需要我们，我们就准备好','Whoever needs us — we\'ll be ready','Quem precisar de nós — estaremos prontos'),fx:()=>{pref('any')();addTrust(F1.id(),1)},next:c5Home}]};
}
function c5Home(){
 return {title:t('家访','The home study','A visita domiciliária'),meta:F1.M('秋天','Fall','Outono'),text:[
  t('社工是个从休斯敦调来的女人，带着一个写字板。她看楼梯，看烟雾报警器，看烤架离窗户有多远。','The caseworker is a woman transferred from Houston, with a clipboard. She checks the stairs, the smoke alarms, how far the grill is from the window.','A assistente social veio transferida de Houston e traz uma prancheta. Vê as escadas, os detetores de fumo, a distância da grelha à janela.'),
  F1.m()?t('她看了一眼你们俩，什么都没问。后来她说：“我只关心一件事：这里有没有一张孩子可以睡的床，和两个会半夜爬起来的人。”','She glances at the two of you and asks nothing about it. Later she says: "I only care about one thing: is there a bed a child can sleep in, and two people who\'ll get up in the night?"','Olha para os dois e não pergunta nada sobre isso. Mais tarde diz: «Só me importa uma coisa: se há uma cama onde uma criança possa dormir e duas pessoas que se levantem a meio da noite.»')
   :t('她问你们为什么选收养。你们对视了一眼。','She asks why you chose adoption. You look at each other.','Pergunta porque escolheram adotar. Olham um para o outro.')],choices:[
  {t:t('给楼梯装上护栏','Put a gate on the stairs','Pôr uma cancela nas escadas'),req:MONEY(200),fx:()=>{S.cash-=200;stat('oficio',1)},next:c5Call},
  {t:t('老老实实讲你的签证和身份','Tell her plainly about your visa and status','Contar-lhe com franqueza o teu visto e o teu estatuto'),fx:()=>{addTrust(F1.id(),1)},next:c5Call},
  {t:t('请她尝一个蛋挞','Offer her a custard tart','Oferecer-lhe um pastel de nata'),fx:()=>{stat('charme',1)},next:c5Call}]};
}
function c5Call(){
 const g=S.flags.f1_pref==='baby'?Math.random()<0.5:Math.random()<0.5;S.flags.f1_sex=g?'girl':'boy';
 const age=S.flags.f1_pref==='older'?t('四岁','four years old','quatro anos'):t('一岁半','eighteen months old','um ano e meio');
 const nm=g?t('黛西','Daisy','Daisy'):t('以赛亚','Isaiah','Isaías');
 return {title:t('晚上十一点的电话','The 11 p.m. phone call','O telefonema das onze da noite'),meta:F1.M('冬天','Winter','Inverno'),text:[
  t(`电话在晚上十一点响了。“有一个孩子，${res(age,'zh')}，今晚需要一个地方住。名字叫${res(nm,'zh')}。你们能来接吗？”`,`The phone rings at 11 p.m. "There\'s a child, ${res(age,'en')}, who needs a place tonight. ${g?'Her':'His'} name is ${res(nm,'en')}. Can you come?"`,`O telefone toca às onze da noite. «Há uma criança, com ${res(age,'pt')}, que precisa de um sítio esta noite. Chama-se ${res(nm,'pt')}. Podem vir buscá-la?»`)],choices:[
  {t:t('带上店里那只旧玩具卡车','Grab the old toy truck from the shop','Levar o camião de brincar velho do restaurante'),fx:()=>{S.flags.f1_an=g?'d':'i'},next:c5First},
  {t:t('带上一盒还热的蛋挞','Grab a box of still-warm custard tarts','Levar uma caixa de natas ainda mornas'),fx:()=>{S.flags.f1_an=g?'d':'i';stat('oficio',1)},next:c5First}]};
}
function c5First(){
 const g=S.flags.f1_sex==='girl',nm=g?t('黛西','Daisy','Daisy'):t('以赛亚','Isaiah','Isaías');
 const L=k=>()=>{S.flags.f1_lang=k};
 return {title:t('头几个晚上','The first nights','As primeiras noites'),meta:F1.M('寄养','Fostering','Acolhimento'),text:[
  t(`${res(nm,'zh')}带来的东西装在一个黑色垃圾袋里：两件衣服，一只缺了耳朵的兔子。`,`Everything ${res(nm,'en')} brought fits in a black trash bag: two shirts and a rabbit missing one ear.`,`Tudo o que ${res(nm,'pt')} trouxe cabe num saco do lixo preto: duas camisolas e um coelho sem uma orelha.`),
  t('头三个晚上，孩子不肯睡床，只肯睡在楼梯口的地板上，能看见门的地方。','The first three nights the child won\'t sleep in the bed, only on the floor at the top of the stairs, where the door is visible.','Nas primeiras três noites a criança não quer dormir na cama, só no chão ao cimo das escadas, de onde se vê a porta.')],choices:[
  {t:t('坐在地板上，唱法多唱到天亮','Sit on the floor and sing fado till dawn','Sentar no chão e cantar fado até de manhã'),fx:L('pt'),next:c5Adopt},
  {t:t('坐在地板上，哼乡村老歌','Sit on the floor and hum old country songs','Sentar no chão e trautear country antigo'),fx:L('tex'),next:c5Adopt},
  {t:t('把床垫拖到楼梯口，三个人一起睡','Drag the mattress to the stairs, all three sleep there','Arrastar o colchão para as escadas e dormirem os três ali'),fx:()=>{L('both')();addTrust(F1.id(),1)},next:c5Adopt}]};
}
function c5Adopt(){
 const g=S.flags.f1_sex==='girl',sex=g?'girl':'boy';
 const N=(lab,z,e,p)=>({t:lab,fx:()=>f1Child(sex,z,e,p),next:c5Baptism});
 return {title:t('法院','The courthouse','O tribunal'),meta:F1.M('六个月以后','Six months later','Seis meses depois'),text:[
  t('六个月后，县法院。法官让孩子坐在她的高背椅上，自己站在旁边。木槌落下的时候，孩子笑出了声。','Six months later, the county courthouse. The judge lets the child sit in her tall chair and stands beside it. When the gavel comes down, the child laughs out loud.','Seis meses depois, o tribunal do condado. A juíza deixa a criança sentar-se na sua cadeira alta e fica de pé ao lado. Quando o martelo cai, a criança dá uma gargalhada.'),
  F1.L('baby'),
  t('法官问：名字要不要改？','The judge asks: any change to the name?','A juíza pergunta: querem alterar o nome?')],choices:g?[
  N(t('不改，黛西就是黛西','No change. Daisy is Daisy','Não. A Daisy é a Daisy'),'黛西','Daisy','Daisy'),
  N(t('加一个中间名：黛西·费尔南达','Add a middle name: Daisy Fernanda','Juntar um nome do meio: Daisy Fernanda'),'黛西·费尔南达','Daisy Fernanda','Daisy Fernanda'),
  N(t('加一个中间名：黛西·安东尼娅','Add a middle name: Daisy Antónia','Juntar um nome do meio: Daisy Antónia'),'黛西·安东尼娅','Daisy Antónia','Daisy Antónia')]:[
  N(t('不改，以赛亚就是以赛亚','No change. Isaiah is Isaiah','Não. O Isaías é o Isaías'),'以赛亚','Isaiah','Isaías'),
  N(t('加一个中间名：以赛亚·若泽','Add a middle name: Isaiah José','Juntar um nome do meio: Isaías José'),'以赛亚·若泽','Isaiah José','Isaías José'),
  N(t('加一个中间名：以赛亚·安东尼奥','Add a middle name: Isaiah Antonio','Juntar um nome do meio: Isaías António'),'以赛亚·安东尼奥','Isaiah Antonio','Isaías António')]};
}

/* --- converging: baptism, words, papers, shop, Lisbon, oath --- */
function c5Baptism(){
 const gf=k=>()=>{S.flags.f1_godfather=k};
 return {title:t('受洗','The baptism','O batizado'),meta:F1.M('圣安东尼教堂','The Santo António church','A igreja de Santo António'),text:[
  t(`阿尔贝蒂娜早就宣布了：教母是她。“我八十二岁了，还能再看着一个孩子长大，这是圣安东尼欠我的。”`,`Albertina announced it long ago: she\'s the godmother. "I\'m eighty-two. Watching one more child grow up — Saint Anthony owes me that."`,`A Albertina anunciou há muito: a madrinha é ela. «Tenho oitenta e dois anos. Ver crescer mais uma criança — o Santo António deve-me isso.»`),
  F1.m()?t('有人在后排小声嘀咕“两个爸爸”。阿尔贝蒂娜回过头，用葡语说了一句什么。嘀咕停了。她后来告诉你：“我说，上帝不数爸爸。”','Someone in the back pew mutters "two daddies." Albertina turns round and says something in Portuguese. The muttering stops. Later she tells you: "I said God doesn\'t count fathers."','Alguém no último banco murmura «dois pais». A Albertina vira-se e diz qualquer coisa em português. O murmúrio para. Mais tarde conta-te: «Disse que Deus não conta os pais.»')
   :t(`${F1.kid()}在水碰到额头时没哭，只是皱着眉看着神父，像在评估这家店值不值得再来。`,`${F1.kid()} doesn\'t cry when the water touches, just frowns at the priest like ${res(F1.kHe(),'en')}\'s deciding whether this place is worth coming back to.`,`${F1.kid()} não chora quando a água lhe toca, só franze a testa para o padre, como quem decide se vale a pena voltar.`),
  t('还差一个教父。','You still need a godfather.','Falta um padrinho.')],choices:[
  {t:t('厄尔','Earl','O Earl'),fx:()=>{gf('earl')();addTrust('earl',1)},next:c5Words},
  {t:t('贝托','Beto','O Beto'),req:()=>rel('beto').trust>=3||NEED(t('贝托信任 3','Beto\'s trust 3','confiança do Beto 3')),fx:()=>{gf('beto')();addTrust('beto',1)},next:c5Words},
  {t:t('把鲁伊从里斯本叫来','Fly Rui in from Lisbon','Mandar vir o Rui de Lisboa'),req:MONEY(700),fx:()=>{S.cash-=700;gf('rui')();stat('saud',-3)},next:c5Words}]};
}
function c5Words(){
 const w={pt:t(`${F1.kid()}的第一句话是葡语：“面包。”指着蛋挞说的。`,`${F1.kid()}\'s first word is Portuguese: "pão." Bread. Pointing at a custard tart.`,`A primeira palavra de ${F1.kid()} é em português: «pão». A apontar para um pastel de nata.`),
  tex:t(`${F1.kid()}的第一句话是对着一屋子客人喊的：“y'all（你们大家）！”厄尔笑得把咖啡洒了。`,`${F1.kid()}\'s first word is shouted at a room full of customers: "Y\'all!" Earl laughs so hard he spills his coffee.`,`A primeira palavra de ${F1.kid()} é gritada para uma sala cheia de clientes: «Y\'all!» — «vocês todos». O Earl ri-se tanto que entorna o café.`),
  both:t(`${F1.kid()}的第一句话是“泽”——指着店门口的招牌。两种语言里，这个字念起来都一样。`,`${F1.kid()}\'s first word is "Zé" — pointing at the sign over the door. It sounds the same in both languages.`,`A primeira palavra de ${F1.kid()} é «Zé» — a apontar para a tabuleta da porta. Soa igual nas duas línguas.`)}[S.flags.f1_lang]||t(`${F1.kid()}的第一句话是“还要”。`,`${F1.kid()}\'s first word is "more."`,`A primeira palavra de ${F1.kid()} é «mais».`);
 return {title:t('第一句话','First words','As primeiras palavras'),meta:F1.M('一年以后','A year later','Um ano depois'),text:[w,t(`${P1()}说这不算，要等第二句。`,`${P1()} says that one doesn\'t count; wait for the second.`,`${P1()} diz que essa não conta; é preciso esperar pela segunda.`)],choices:[
  {t:t('马上打电话给里斯本','Call Lisbon right away','Ligar logo para Lisboa'),fx:()=>stat('saud',-3),next:c5I751},
  {t:t('用粉笔写在店里的黑板上','Chalk it up on the shop\'s menu board','Escrever a giz no quadro do restaurante'),fx:()=>{S.rep+=2},next:c5I751},
  {t:t(`把功劳让给${res(P1(),'zh')}`,`Give ${res(P1(),'en')} the credit`,`Dar o mérito a ${res(P1(),'pt')}`),fx:()=>addLike(F1.id(),1),next:c5I751}]};
}
function c5I751(){
 const ines=!F1.cit();
 return {title:ines?t('第一张工资单','The first payroll','A primeira folha de salários'):t('取消条件','Removing the conditions','Retirar as condições'),meta:F1.M('第二个结婚纪念日之前','Before the second anniversary','Antes do segundo aniversário'),text:[
  ines?t('伊内丝接管了账本，第一件事是雇了两个全职的人：汤米，和玛丽索尔的外甥女。“店要长大，”她说，“我们的签证才站得稳。再说，你一个人翻炭翻得太丑了。”','Inês takes over the books and the first thing she does is hire two full-timers: Tommy, and Marisol\'s niece. "The shop has to grow," she says, "if our visa\'s going to stand on solid ground. Besides, you turn coals ugly when you\'re alone."','A Inês fica com as contas e a primeira coisa que faz é contratar duas pessoas a tempo inteiro: o Tommy e a sobrinha da Marisol. «O restaurante tem de crescer», diz ela, «para o nosso visto ter chão firme. Além disso, sozinho viras as brasas muito mal.»')
   :t('两年期的绿卡快到期了。你们一起递了取消条件的申请，附上两年的生活：账单、照片，还有孩子的出生证明或收养判决——如果有的话。','The two-year card is nearly up. Together you file the I-751 to remove the conditions, with two years of life attached: bills, photos, and a birth certificate or adoption decree if there is one.','O cartão de dois anos está a caducar. Entregam juntos o I-751 para retirar as condições, com dois anos de vida em anexo: contas, fotografias e, se houver, uma certidão de nascimento ou uma sentença de adoção.'),
  ines?t('第一个月的工资单打出来，伊内丝把它贴在冰箱上，像贴一张奖状。','She prints the first month\'s payroll and sticks it on the fridge like a certificate.','Imprime a primeira folha de salários e cola-a no frigorífico como um diploma.'):t('三个月后，一张十年期的绿卡寄到了店里。邮递员说：“这次你们不用再给我做蛋挞了。”你还是给了。','Three months later a ten-year green card arrives at the shop. The mailman says: "No need for another custard tart this time." You give him one anyway.','Três meses depois chega ao restaurante um green card de dez anos. O carteiro diz: «Desta vez não precisam de me dar outro pastel de nata.» Dás-lhe um na mesma.')],choices:[
  {t:t('把旧卡钉在若泽的照片旁边','Pin the old card next to José\'s photo','Pregar o cartão antigo ao lado da fotografia do José'),next:c5Shop},
  {t:t('今晚店里所有咖啡免费','Free coffee for everyone tonight','Café grátis para toda a gente esta noite'),fx:()=>{S.rep+=2;S.cash-=40},next:c5Shop}]};
}
function c5Shop(){
 return {title:t('店','The shop','O restaurante'),meta:F1.M('第三年夏天','Summer, year three','Verão do terceiro ano'),text:[
  t('德尔菲娜带来一个奥斯汀的投资人，想在南国会大道开第二家“泽家”。另一边，贝托说牧场门口缺一辆卖午饭的餐车。','Delphine brings an Austin investor who wants a second Zé\'s on South Congress. Meanwhile Beto says the ranch gate could use a lunch truck.','A Delphine traz um investidor de Austin que quer um segundo Zé\'s na South Congress. Entretanto o Beto diz que à entrada do rancho fazia falta uma carrinha de almoços.'),
  F1.has()?t(`${F1.kid()}在柜台底下搭了一个纸箱子的“店”，卖石头。`,`${F1.kid()} has built a cardboard-box "shop" under the counter. It sells rocks.`,`${F1.kid()} montou uma «loja» de cartão debaixo do balcão. Vende pedras.`):t('若泽的账本已经写满了，你开了第二本。','José\'s ledger is full now. You\'ve started a second one.','O livro de contas do José já está cheio. Começaste um segundo.')],choices:[
  {t:t('在奥斯汀开分店','Open a second shop in Austin','Abrir uma segunda casa em Austin'),req:MONEY(3000),fx:()=>{S.cash-=3000;S.flags.f1_shop='austin';S.online=clamp(S.online+10,0,100)},next:c5Lisbon},
  {t:t('在牧场门口放一辆餐车','Put a food truck at the ranch gate','Pôr uma carrinha de comida à entrada do rancho'),req:MONEY(1200),fx:()=>{S.cash-=1200;S.flags.f1_shop='truck';stat('tex',3)},next:c5Lisbon},
  {t:t('保持小店，八张桌子，就像若泽留下的那样','Keep it small, eight tables, the way José left it','Manter pequeno, oito mesas, como o José deixou'),fx:()=>{S.flags.f1_shop='small';stat('saud',-2);S.rep+=2},next:c5Lisbon}]};
}
function c5Lisbon(){
 const ines=!F1.cit();
 return {title:t('回里斯本','Back to Lisbon','De volta a Lisboa'),meta:F1.M('第三年秋天','Fall, year three','Outono do terceiro ano'),text:[
  t('第一次全家一起回去。飞机落地的时候，你闻到了河的味道。','The first trip home as a family. When the plane lands, you can smell the river.','A primeira viagem a casa em família. Quando o avião aterra, sentes o cheiro do rio.'),
  F1.has()?t(`妈妈在阿尔法马的楼梯口等着。她没先抱你，先抱了${F1.kid()}，然后说：“外婆在这儿。”`,`Your mother is waiting at the foot of the Alfama steps. She doesn\'t hug you first. She hugs ${F1.kid()}, and says: "Grandma\'s here."`,`A tua mãe está à espera ao fundo das escadinhas de Alfama. Não te abraça primeiro a ti. Abraça ${F1.kid()} e diz: «A avó está aqui.»`)
   :t('妈妈在阿尔法马的楼梯口等着。她先抱了你，然后抱得更久的是另一个人。','Your mother is waiting at the foot of the Alfama steps. She hugs you first, and then, for longer, someone else.','A tua mãe está à espera ao fundo das escadinhas de Alfama. Abraça-te primeiro a ti e depois, mais tempo, outra pessoa.'),
  F1.has()?t(`${F1.kid()}在电车上把脸贴着玻璃，一路数着晾在窗外的床单，用两种语言数，数到二十就乱了。`,`On the tram ${F1.kid()} presses a face to the glass, counting the sheets drying from the windows in two languages, losing track at twenty.`,`No elétrico, ${F1.kid()} cola a cara ao vidro e conta os lençóis a secar nas janelas, nas duas línguas, e perde-se no vinte.`):'',
  ines?t('伊内丝回到自己的城市，反而走得比你慢。她说：“我现在是从德州回来的人了。”','Back in her own city, Inês walks slower than you. "I\'m someone who comes back from Texas now," she says.','De volta à sua cidade, a Inês anda mais devagar do que tu. «Agora sou alguém que volta do Texas», diz ela.')
   :t(`${P1()}在石阶上停了三次，第三次说：“现在我懂你为什么腿这么结实了。”`,`${P1()} stops three times on the stone steps and the third time says: "Now I get why your legs are like that."`,`${P1()} para três vezes nas escadinhas e à terceira diz: «Agora percebo porque tens essas pernas.»`)].filter(Boolean),choices:[
  {t:t('带大家去看若泽的旧窗户','Take everyone to see José\'s old window','Levar todos a ver a antiga janela do José'),fx:()=>stat('saud',-3),next:c5Oath},
  {t:t('去河边，讲“圣安东尼号”那一夜的真相','Go to the river and tell the truth about the night of the Santo António','Ir ao rio e contar a verdade sobre a noite do Santo António'),req:()=>S.letters>=10||NEED(t('若泽的信 10 封','10 of José\'s letters','10 cartas do José')),fx:()=>{stat('saud',-5)},next:()=>f1Say(c5Oath,'',t('妈妈听完，望着河看了很久，说：“我哥哥是个好人。我应该早点知道。”那天晚上她第一次把若泽的照片摆上了餐桌。','Your mother listens, looks at the river a long time, and says: "My brother was a good man. I should have known sooner." That night, for the first time, she puts José\'s photo on the dinner table.','A tua mãe ouve, fica muito tempo a olhar para o rio e diz: «O meu irmão era um homem bom. Devia ter sabido mais cedo.» Nessa noite, pela primeira vez, põe a fotografia do José na mesa do jantar.'),F1.M('里斯本','Lisbon','Lisboa'))},
  {t:t(`让妈妈教${res(P1(),'zh')}做羽衣甘蓝汤`,`Let Mom teach ${res(P1(),'en')} to make kale soup`,`Deixar a mãe ensinar ${res(P1(),'pt')} a fazer caldo verde`),fx:()=>addLike(F1.id(),1),next:c5Oath}]};
}
function c5Oath(){
 if(!F1.cit())return {title:t('领事馆','The consulate','O consulado'),meta:F1.M('第四年','Year four','Quarto ano'),text:[
  t('你们俩谁都没有入籍。伊内丝是葡萄牙人，你也是；签证续了一次又一次，日子照样过。','Neither of you has naturalized. Inês is Portuguese, so are you; the visa gets renewed again and again, and life goes on.','Nenhum dos dois se naturalizou. A Inês é portuguesa, tu também; o visto vai sendo renovado e a vida continua.'),
  F1.has()?t(`${F1.kid()}是这片土地上出生或长大的孩子，已经是美国人；你们又去葡萄牙领事馆，把${res(F1.kHe(),'zh')}登记成了葡萄牙公民。两本护照，一个孩子。`,`${F1.kid()} is a child of this country, already American; you go to the Portuguese consulate too and register ${S.flags.child&&S.flags.child.sex==='girl'?'her':'him'} as Portuguese. Two passports, one kid.`,`${F1.kid()} é uma criança desta terra e já tem nacionalidade americana; vão também ao consulado português fazer o registo da nacionalidade portuguesa. Dois passaportes, uma criança.`)
   :t('领事馆的人问你们打不打算回去。伊内丝说：“回去是去看人，不是去住。”','The consulate clerk asks if you plan to go back. Inês says: "We go back to visit people. Not to live."','O funcionário do consulado pergunta se tencionam voltar. A Inês diz: «Voltamos para visitar pessoas. Não para viver.»')],choices:[
  {t:t('在领事馆门口拍一张照片','Take a photo outside the consulate','Tirar uma fotografia à porta do consulado'),next:c5Anniv},
  {t:t('回店里，照常开门','Go back to the shop and open as usual','Voltar ao restaurante e abrir como sempre'),fx:()=>{S.rep+=1},next:c5Anniv}]};
 return {title:t('宣誓','The oath','O juramento'),meta:F1.M('婚后第三年','Three years married','Três anos de casados'),text:[
  t('结婚满三年，你递了入籍申请。宣誓仪式在奥斯汀的一个礼堂里，一百二十个人，来自四十一个国家。','Three years married, you filed the N-400. The oath ceremony is in an auditorium in Austin: a hundred and twenty people from forty-one countries.','Com três anos de casamento entregaste o N-400. A cerimónia de juramento é num auditório em Austin: cento e vinte pessoas de quarenta e um países.'),
  t('美国和葡萄牙都允许双重国籍。你不用放弃任何东西，只是多了一样。','Both the U.S. and Portugal allow dual citizenship. You don\'t give anything up. You just add something.','Os Estados Unidos e Portugal permitem a dupla nacionalidade. Não abdicas de nada. Só acrescentas.'),
  F1.has()?t(`${P1()}抱着${F1.kid()}坐在观众席。孩子本来就是美国人，上个月又在葡萄牙领事馆登记成了葡萄牙公民。全家现在一共有五本护照，抽屉快关不上了。`,`${P1()} sits in the audience holding ${F1.kid()}, who\'s been American from the start and was registered as Portuguese at the consulate last month. The family now owns five passports; the drawer barely shuts.`,`${P1()} está na plateia com ${F1.kid()} ao colo: nacionalidade americana desde o início e, desde o mês passado, também a portuguesa, registada no consulado. A família tem agora cinco passaportes; a gaveta mal fecha.`)
   :t(`${P1()}坐在观众席，举着一面小小的星条旗，另一只手里攥着一面更小的葡萄牙国旗。`,`${P1()} sits in the audience waving a little Stars and Stripes, a smaller Portuguese flag clutched in the other hand.`,`${P1()} está na plateia a agitar uma bandeirinha americana, com uma bandeira portuguesa ainda mais pequena na outra mão.`)],choices:[
  {t:t('带着口音念完誓词','Say the oath, accent and all','Dizer o juramento, com sotaque e tudo'),fx:()=>{stat('tex',3)},next:c5Anniv},
  {t:t('念完，用葡语小声加一句“谢谢舅舅”','Finish, then add under your breath in Portuguese: "thank you, uncle"','No fim, acrescentar baixinho em português: «obrigado, tio»'),fx:()=>{stat('saud',-3)},next:c5Anniv},
  {t:t('出门就去厄尔那儿喝一杯','Head straight to Earl\'s for a drink','Ir direto ao Earl beber um copo'),req:()=>rel('earl').trust>=3||NEED(t('厄尔信任 3','Earl\'s trust 3','confiança do Earl 3')),fx:()=>{addTrust('earl',1)},next:()=>f1Say(c5Anniv,'',t('厄尔倒了两杯，自己喝了一杯。“若泽等这一天等了二十年，”他说，“他没等到。你替他喝。”','Earl pours two and drinks one himself. "José waited twenty years for this," he says. "Never got it. Drink his."','O Earl serve dois copos e bebe um. «O José esperou vinte anos por isto», diz. «Nunca chegou. Bebe tu o dele.»'),F1.M('孤星酒吧','The Lone Star Saloon','O Lone Star Saloon'))}]};
}
function c5Anniv(){
 const st=S.flags.weddingStyle||'mixed';
 return {title:t('又一个圣安东尼节','Another Santo António','Outro Santo António'),meta:F1.M('结婚纪念日','Anniversary','Aniversário de casamento'),text:[
  t('空地上又摆满了罗勒。今年的“圣安东尼新人”有四对，其中一对是汤米和他高中的女朋友，你认识他们的时候他们还在蹭店里的无线网。','The lot is full of basil again. This year there are four Santo António couples, one of them Tommy and his high-school sweetheart, who were mooching your Wi-Fi when you met them.','O terreno está outra vez cheio de manjericos. Este ano há quatro casais de Santo António, um deles o Tommy e a namorada do liceu, que andavam a roubar-te o Wi-Fi quando os conheceste.'),
  {luso:t('有人问你们当年为什么办葡式婚礼，你说：“因为沙丁鱼不会说谎。”','Someone asks why you had a Portuguese wedding. You say: "Sardines don\'t lie."','Alguém pergunta porque fizeram um casamento à portuguesa. Dizes: «Porque as sardinhas não mentem.»'),tex:t('有人问你们当年为什么办德州婚礼，你说：“因为靴子比皮鞋好跳舞。”','Someone asks why you had a Texan wedding. You say: "Boots dance better than dress shoes."','Alguém pergunta porque fizeram um casamento à texana. Dizes: «Porque com botas dança-se melhor do que com sapatos.»'),mixed:t('有人问你们当年的婚礼到底算哪国的，你说：“算这儿的。”','Someone asks what country your wedding counted as. You say: "This one. Here."','Alguém pergunta de que país era afinal o vosso casamento. Dizes: «Daqui.»')}[st]],choices:[
  {t:t(`和${res(P1(),'zh')}跳一支舞`,`Dance one with ${res(P1(),'en')}`,`Dançar uma com ${res(P1(),'pt')}`),fx:()=>addLike(F1.id(),1),next:c5End},
  {t:t('守着烤架烤到半夜','Work the grill till midnight','Ficar à grelha até à meia-noite'),fx:()=>{stat('oficio',2);S.cash+=200},next:c5End},
  {t:t('把你的罗勒交给孩子去送人','Let the kid give your basil away','Deixar a criança oferecer o teu manjerico'),req:()=>F1.has()||NEED(t('有孩子','A child','Ter um filho')),fx:()=>{S.rep+=2},next:c5End}]};
}
function c5End(){
 return {title:t('家','Home','Lar'),meta:F1.M('很晚了','Late','Tarde'),text:[
  t('人散了，你关了招牌的灯。楼上有人在等你。','The crowd is gone; you switch off the sign. Someone is waiting upstairs.','A multidão foi-se; apagas a tabuleta. Alguém espera por ti lá em cima.'),
  F1.has()?t(`${F1.kid()}已经睡着了，手里攥着一盆罗勒的叶子。`,`${F1.kid()} is already asleep, a fistful of basil leaves in one hand.`,`${F1.kid()} já adormeceu, com folhas de manjerico agarradas na mão.`):t('窗外，州际公路上的卡车一辆接一辆，像一条不会停的河。','Outside, the trucks on I-35 keep coming, a river that never stops.','Lá fora, os camiões da I-35 não param, um rio que nunca acaba.'),
  F1.L('home')],choices:[
  {t:t('关灯','Turn off the light','Apagar a luz'),next:()=>F1.has()?c6Open():F1G()()},
  {t:t('再在台阶上坐一会儿','Sit on the step a while longer','Ficar mais um bocado no degrau'),fx:()=>stat('saud',-2),next:()=>F1.has()?c6Open():F1G()()}]};
}

CH5=finalScene=>{F1.fin=finalScene;
 if(!S.flags.married)return S.flags.engaged?c5Wed():c5Propose();
 return c5Open();
};

FAMILY_EXTRA=choice=>{
 if(!S.settled||!NPCS[S.settled])return [];
 const n=SH(S.settled);
 if(choice==='stay'){
  if(S.flags.child)return [t(`很多年以后，${F1.kid()}在店里替你翻炭，用葡语骂炭不听话，用德州话招呼客人。门口的招牌一个字都没改。`,`Years later, ${F1.kid()} tends the coals for you, cursing them in Portuguese and greeting customers in Texan. The sign over the door hasn\'t changed a letter.`,`Muitos anos depois, ${F1.kid()} trata das brasas por ti, a ralhar com elas em português e a cumprimentar os clientes à texana. A tabuleta da porta não mudou uma letra.`)];
  if(S.flags.married)return [t(`很多年以后，你和${res(n,'zh')}还是每个星期天早上坐在后门台阶上喝咖啡，看那块空地上的罗勒一年比一年多。`,`Years later, you and ${res(n,'en')} still drink coffee on the back step every Sunday morning, watching the basil on the lot spread a little more each year.`,`Muitos anos depois, tu e ${res(n,'pt')} continuam a beber café no degrau das traseiras todos os domingos, a ver os manjericos do terreno a crescer de ano para ano.`)];
  return [];
 }
 if(S.flags.married||S.flags.engaged||NPCS[S.settled].group==='leave'||S.settled==='ines')return [choice==='home'?t(`${res(n,'zh')}和你一起上了飞机，靠窗的位置让给了${res(n,'zh')}。`,`${res(n,'en')} gets on the plane with you. You give up the window seat.`,`${res(n,'pt')} entra no avião contigo. Ficas sem o lugar da janela.`):t(`${res(n,'zh')}和你一起搬去了奥斯汀，周末一起开车回圣鲁伊斯吃饭。`,`${res(n,'en')} moves to Austin with you; on weekends you drive back to San Luís together to eat.`,`${res(n,'pt')} muda-se contigo para Austin; aos fins de semana voltam juntos a San Luís para comer.`)];
 return [t(`${res(n,'zh')}留在了圣鲁伊斯。你们说好每个星期天打一次电话，到现在一次都没断过。`,`${res(n,'en')} stays in San Luís. You agreed on a call every Sunday, and you haven\'t missed one yet.`,`${res(n,'pt')} fica em San Luís. Combinaram uma chamada todos os domingos, e ainda não falharam nenhuma.`)];
};
