/* Writer D - Chapter 4: Spring / Santo Antonio (weeks 37-48) + ENDING_EXTRA */
function c4_fs(n,key){
 S.flags.festivalScore=clamp((S.flags.festivalScore||0)+n,0,10);
 if(key&&n>0){S.flags.c4_crew=(S.flags.c4_crew||[]).concat([key])}
 if(n>0)log(`节日筹备 +${n}（现在 ${S.flags.festivalScore}/10）`,`Festival prep +${n} (now ${S.flags.festivalScore}/10)`,`Preparação da festa +${n} (agora ${S.flags.festivalScore}/10)`);
}
function c4_crew(k){return (S.flags.c4_crew||[]).indexOf(k)>=0}
function c4_proof(){return !!(S.flags.evidence||S.flags.c4_witness)}
// chapter-3 hooks: Fitzgerald already agreed to testify / Roz trusts you enough to back you up
function c4_doubtOK(){return !!(S.flags.c3_fitzWilling||S.flags.rF_rozShield||rel('roz').trust>=5)}
function c4_path(){return S.flags.travisDeal||'council'}
const C4_PLUS=t('节日筹备 +1','Festival prep +1','Preparação da festa +1');
const C4_ZERO=t('节日筹备没有进展','No progress on the festival','A festa não avança');
const C4_META=t('第四章 · 春','Chapter 4 · Spring','Capítulo 4 · Primavera');
const C4_FEST=t('筹办圣安东尼节','Planning Santo António','A preparar o Santo António');

function c4_votes(speech){
 let v=0;
 if(S.flags.license===true)v++;
 if(S.flags.stormOpen===true)v++;
 if(rel('dale').trust>=5||(S.flags.homecoming==='truth'&&rel('dale').trust>=3))v++;
 if(S.rep>=45)v++;
 if(c4_proof())v++;
 if(S.flags.c4_roz)v++;
 if(S.flags.c4_state)v++;
 v+=speech?1:0;
 return Math.min(5,v);
}
function c4_voteScene(){
 const v=S.flags.c4_votes,blocked=S.flags.c4_vote==='blocked';
 const why=[];
 if(S.flags.license===true)why.push(t('当初批你酒类执照的那位议员，第一个举手。','The councilman who backed your liquor license raises his hand first.','O vereador que te apoiou na licença do álcool é o primeiro a levantar a mão.'));
 if(S.flags.stormOpen===true)why.push(t('冰暴那周在你店里取过暖的老太太，替她丈夫举起了手。','The old woman who warmed herself at your grill during the ice storm raises her husband\'s hand for him.','A senhora que se aqueceu na tua grelha durante a tempestade de gelo levanta a mão do marido por ele.'));
 return {title:t('投票结果','The vote','A votação'),meta:t(`反对改划 ${v} 票 · 赞成 ${5-v} 票`,`Against rezoning ${v} · For ${5-v}`,`Contra a requalificação ${v} · A favor ${5-v}`),text:[...why,
  blocked?t('木槌落下：“改划被否决。”阿尔贝蒂娜太太把毛线针插回毛线团，像收起一把剑。','The gavel falls. "Rezoning denied." Dona Albertina slides her needles back into the yarn like a sword into its sheath.','O martelo bate. «Requalificação indeferida.» A Dona Albertina espeta as agulhas no novelo como quem embainha uma espada.')
  :t('木槌落下：“改划通过。”特拉维斯经过你身边，没看你。赢的人从来不需要看输的人。','The gavel falls. "Rezoning approved." Travis walks past without looking at you. Winners never have to look at losers.','O martelo bate. «Requalificação aprovada.» O Travis passa sem olhar para ti. Quem ganha nunca precisa de olhar para quem perde.')],
  choices:[{t:t('走出礼堂','Walk out of the hall','Sair do salão')}]};
}

function c4_end(){
 const s=S.flags.festivalScore||0;
 const p={expose:t('科琳的报道还挂在主街每一家店的玻璃上。','Colleen\'s article is still taped in every window on Main Street.','O artigo da Colleen continua colado em todas as montras da rua principal.'),council:t('议会的记录里，永远留下了若泽的名字。','José\'s name is in the council minutes now, for good.','O nome do José ficou para sempre na ata da câmara.'),deal:t('特拉维斯的支票还在抽屉里，没人提起它，它也哪儿都不去。','Travis\'s check is still in the drawer. Nobody mentions it. It isn\'t going anywhere.','O cheque do Travis continua na gaveta. Ninguém fala dele. E ele não vai a lado nenhum.')}[c4_path()];
 return {title:t('第四章 · 春：圣安东尼节　完','End of Chapter 4 · Spring: Santo António','Fim do Capítulo 4 · Primavera: Santo António'),meta:t(`第 48 周 · 现金 $${Math.round(S.cash)} · 口碑 ${Math.round(S.rep)} · 节日 ${s}/10`,`Week 48 · Cash $${Math.round(S.cash)} · Reputation ${Math.round(S.rep)} · Festival ${s}/10`,`Semana 48 · Dinheiro $${Math.round(S.cash)} · Reputação ${Math.round(S.rep)} · Festa ${s}/10`),text:[p,
  t(`魅力 ${charm()} · 手艺 ${S.stats.oficio} · 德州味 ${S.stats.tex} · 乡愁 ${S.stats.saud}。若泽的信，你找到了 ${S.letters} 封。`,`Charm ${charm()} · Craft ${S.stats.oficio} · Texanness ${S.stats.tex} · Homesickness ${S.stats.saud}. You've found ${S.letters} of José's letters.`,`Charme ${charm()} · Ofício ${S.stats.oficio} · Texanidade ${S.stats.tex} · Saudade ${S.stats.saud}. Encontraste ${S.letters} cartas do José.`),
  t('还剩最后一个星期天。然后，格蕾丝会把那份文件推到你面前。','One last Sunday left. Then Grace will slide those papers across the desk.','Falta um último domingo. Depois, a Grace vai empurrar aqueles papéis na tua direção.')],
  choices:[{t:t('过完这一年的最后一天','Live the last day of the year','Viver o último dia do ano')}]};
}

STORY.push(
/* ---------- W37: opening ---------- */
{id:'c4_open',when:()=>S.week===37&&S.day===1&&S.slot===0,run:()=>{
 S.flags.festivalScore=S.flags.festivalScore||0;
 const ev=!!S.flags.evidence;
 return {title:t('春：圣安东尼节','Spring: Santo António','Primavera: Santo António'),meta:t('第四章 · 开篇','Chapter 4 · Opening','Capítulo 4 · Abertura'),text:[
  t('三月的风吹着主街上的星条旗，公路边冒出了第一片蓝帽子花。遗嘱规定的一年，还剩十二周。','March wind snaps the flags on Main Street; the first bluebonnets are up along the highway. Twelve weeks left on the year the will demands.','O vento de março agita as bandeiras na rua principal; nascem as primeiras flores azuis à beira da estrada. Faltam doze semanas para o ano que o testamento exige.'),
  ev?t('床底下的饼干铁盒里，躺着 1998 年的水质报告和和解协议副本。若泽的签名歪歪扭扭，像在发抖。','In the biscuit tin under your bed: the 1998 water report and a copy of the settlement. José\'s signature wobbles, as if he were shaking.','Na lata de bolachas debaixo da cama: o relatório da água de 1998 e uma cópia do acordo. A assinatura do José treme, como se ele estivesse a tremer.')
   :t('罐头厂那一夜，你空手而回：铁柜被人撬过，只剩一层灰。现在，那份报告只活在几个老人的记忆里。','You came back from the cannery empty-handed: the locker had been forced, only dust left. Now the report lives only in a few old men\'s memories.','Da fábrica voltaste de mãos vazias: o cacifo fora arrombado, só restava pó. Agora o relatório vive apenas na memória de uns quantos velhos.'),
  ],choices:[
  {t:t('去格蕾丝的办公室问问法律上怎么办','Ask Grace what the law says','Perguntar à Grace o que diz a lei'),fx:()=>{addTrust('grace',1);rel('grace').met=true}},
  {t:t('在店后的空地上站一会儿','Stand out on the empty lot for a while','Ficar um bocado no terreno vazio'),fx:()=>{stat('saud',3);S.lusoThisWeek=true}}]};
}},

/* ---------- W37: three roads ---------- */
{id:'c4_choice',when:()=>S.week===37&&S.day===3&&S.slot===2,run:()=>{
 const ev=!!S.flags.evidence;
 const after=()=>say(t('决定','The decision','A decisão'),{
  expose:t('科琳把复印件装进牛皮纸袋：“周二头版。之后，你就不能假装不知道了。”','Colleen slides the copies into a manila envelope. "Front page, Tuesday. After that, you can\'t pretend you didn\'t know."','A Colleen mete as cópias num envelope pardo. «Primeira página, terça-feira. Depois disso, já não podes fingir que não sabias.»'),
  council:t('格蕾丝在日历上圈出一个星期四：“议会会议。你要用最正式的英语，把这件事讲清楚。”','Grace circles a Thursday on her calendar. "Council meeting. You\'ll lay it all out in your most formal English."','A Grace marca uma quinta-feira no calendário. «Reunião da câmara. Vais expor tudo no teu inglês mais formal.»'),
  deal:t('特拉维斯笑了：“明智。改划一通过，钱就到账。我会悄悄清理干净。”','Travis smiles. "Smart. Money lands the day the rezoning passes. I\'ll clean it up quiet."','O Travis sorri. «Esperto. O dinheiro cai no dia em que a requalificação passar. Eu limpo tudo com discrição.»')}[c4_path()]);
 const ch=ev?[
  {t:t('把证据交给科琳，让它上报纸','Give the evidence to Colleen for the paper','Entregar as provas à Colleen para o jornal'),fx:()=>{S.flags.travisDeal='expose';rel('colleen').met=true;addTrust('colleen',2);S.rep+=2;log('证据交给了科琳','Gave the evidence to Colleen','Entregaste as provas à Colleen')},next:after},
  {t:t('在镇议会上公开','Make it public at the town council','Torná-lo público na câmara'),req:()=>rel('grace').trust>=3||charm()+formalPenalty()>=45||NEED(t('格蕾丝信任 3','Grace\'s trust 3','confiança da Grace 3')),fx:()=>{S.flags.travisDeal='council';addTrust('grace',1);log('决定在镇议会公开证据','Decided to go public at the council','Decidiste revelar tudo na câmara')},next:after},
  {t:t('跟特拉维斯谈个价钱','Name a price to Travis','Dizer um preço ao Travis'),fx:()=>{S.flags.travisDeal='deal';S.flags.c4_dealCash=15000;stat('tex',3);log('和特拉维斯谈成了交易：$15,000','Struck a deal with Travis: $15,000','Fizeste um acordo com o Travis: $15.000')},next:after}]
 :[
  {t:t('请罗兹出来作证','Ask Roz to testify','Pedir à Roz que testemunhe'),req:()=>rel('roz').trust>=5||NEED(t('罗兹信任 5','Roz\'s trust 5','confiança da Roz 5')),fx:()=>{S.flags.travisDeal='council';S.flags.c4_witness='roz';S.flags.c4_roz=true;addTrust('roz',1);log('罗兹答应在议会作证','Roz agreed to testify at the council','A Roz aceitou testemunhar na câmara')},next:after},
  {t:t('请科琳的祖父开口','Ask Colleen\'s grandfather to speak','Pedir ao avô da Colleen que fale'),req:()=>rel('colleen').trust>=4||S.rep>=50||NEED(t('科琳信任 4 或口碑 50','Colleen\'s trust 4 or reputation 50','confiança da Colleen 4 ou reputação 50')),fx:()=>{S.flags.travisDeal='expose';S.flags.c4_witness='fitz';rel('colleen').met=true;addTrust('colleen',1);log('老菲茨杰拉德答应开口','Old Man Fitzgerald agreed to talk','O velho Fitzgerald aceitou falar')},next:after},
  {t:t('什么都没有，也去议会说','Go to the council with nothing but your word','Ir à câmara só com a tua palavra'),fx:()=>{S.flags.travisDeal='council';stat('tex',2)},next:after},
  {t:t('跟特拉维斯谈个价钱','Name a price to Travis','Dizer um preço ao Travis'),fx:()=>{S.flags.travisDeal='deal';S.flags.c4_dealCash=8000;log('和特拉维斯谈成了交易：$8,000','Struck a deal with Travis: $8,000','Fizeste um acordo com o Travis: $8.000')},next:after}];
 return {title:t('三条路','Three roads','Três caminhos'),meta:C4_META,text:[
  
  t('三条消息。科琳：“头版给你留着。”格蕾丝：“议会两周后投票。”特拉维斯：“开个价。”','Three messages. Colleen: "Front page is yours." Grace: "Council votes in two weeks." Travis: "Name your price."','Três mensagens. Colleen: «A primeira página é tua.» Grace: «A câmara vota daqui a duas semanas.» Travis: «Diz um preço.»'),
  ev?t('铁盒就在你手边。','The tin is right next to you.','A lata está mesmo ao teu lado.'):t('你只有几个名字：知道内情的罗兹，当年当工头的老菲茨杰拉德。','All you have are names: Roz, who knows things, and Old Man Fitzgerald, the old foreman.','Só tens nomes: a Roz, que sabe coisas, e o velho Fitzgerald, o antigo capataz.')],choices:ch};
}},

/* ---------- W38: consequences ---------- */
{id:'c4_path',when:()=>S.week===38&&S.day===2&&S.slot===1,run:()=>{
 const p=c4_path();
 if(p==='expose')return {title:t('头版','Front page','Primeira página'),meta:t('《圣鲁伊斯号角报》','The San Luís Clarion','O San Luís Clarion'),text:[
  t('头版标题：“罐头厂的地下水”。中午，奥斯汀电视台的转播车就停在了你店门口。','The headline: "What\'s Under the Cannery." By noon an Austin TV van is parked outside your shop.','O título: «O que há debaixo da fábrica». Ao meio-dia, uma carrinha de uma televisão de Austin está à tua porta.'),
  t('特拉维斯一个人来了：“三千份的小报，你觉得能吓到我？”他的手指在杯沿上敲个不停。','Travis comes alone. "A three-thousand-copy rag. You think that scares me?" His finger won\'t stop tapping the cup.','O Travis vem sozinho. «Um jornaleco de três mil exemplares. Achas que me assusta?» O dedo dele não para de bater na chávena.')],choices:[
  {t:t('平静地说：“吓到你的不是报纸。”','Calmly: "It\'s not the paper that scares you."','Com calma: «Não é o jornal que te assusta.»'),fx:()=>{addTrust('colleen',1);stat('tex',2)}},
  {t:`[${faceWord()}] `+t('出去对着镜头笑','Go out and smile for the camera','Ir lá fora sorrir para a câmara'),req:CHARM_REQ(50),fx:()=>{flirt();S.online=clamp(S.online+6,0,100);S.rep+=2}},
  {t:t('和科琳一起打给州环境质量委员会','Call the state environmental agency with Colleen','Ligar com a Colleen à agência ambiental do estado'),req:()=>S.stats.tex>=30||S.accent==='淡'||NEED(t('德州味 30 或淡口音','Texanness 30 or a light accent','Texanidade 30 ou sotaque leve')),fx:()=>{S.flags.c4_state=true;addTrust('colleen',1);log('州里答应派人取样','The state agreed to send inspectors','O estado prometeu enviar inspetores')}}]};
 if(p==='council')return {title:t('排练','Rehearsal','Ensaio'),meta:NM('grace'),text:[
  t('格蕾丝拉下百叶窗：“我是镇长，你有三分钟。开始。”','Grace pulls the blinds. "I\'m the mayor. You have three minutes. Go."','A Grace fecha as persianas. «Sou o presidente da câmara. Tens três minutos. Começa.»'),
  t('第四句你就卡住了。“环境”这个词，舌头总想念成葡语。','You stall at the fourth sentence; your tongue keeps saying "environment" in Portuguese.','Encravas à quarta frase; a língua insiste em dizer «ambiente» em português.')],choices:[
  {t:t('再来一遍，直到她点头','Again, until she nods','Outra vez, até ela acenar'),fx:()=>{S.flags.c4_prep=true;addTrust('grace',1);addLike('grace',1)}},
  {t:t('先用葡语写一遍，再自己翻成英语','Write it in Portuguese first, then translate it yourself','Escrever primeiro em português e depois traduzir'),req:()=>S.stats.oficio>=35||NEED(t('手艺 35','Craft 35','Ofício 35')),fx:()=>{S.flags.c4_prep=true;stat('saud',3);S.lusoThisWeek=true}},
  {t:t('“到时候我会临场发挥的。”','"I\'ll improvise on the night."','«Na altura improviso.»'),fx:()=>stat('charme',1)}]};
 return {title:t('合同','The contract','O contrato'),meta:NM('travis'),text:[
  t('你在律师带来的合同第九页签了名。律师走时，露西娅的皮卡正好停在门口。','You sign page nine of the lawyer\'s contract. As he leaves, Lucía\'s pickup pulls up out front.','Assinas a nona página do contrato do advogado. Quando ele sai, a carrinha da Lucía está a parar à porta.'),
  t('“那是博伊德家的律师。他来干什么？”','"That\'s the Boyds\' lawyer. What was he doing here?"','«Aquele é o advogado dos Boyd. O que veio cá fazer?»')],choices:[
  {t:t('说实话','Tell the truth','Dizer a verdade'),fx:()=>{rel('lucia').met=true;addLike('lucia',-1);addTrust('lucia',1);S.flags.c4_toldLucia=true},next:()=>say('',t('她放下肉，没收钱就走了。到门口又停住：“至少你没骗我。”','She sets the meat down and leaves without taking your money. At the door: "At least you didn\'t lie to me."','Pousa a carne e sai sem receber. À porta: «Ao menos não me mentiste.»'))},
  {t:t('“他来吃牛胸肉。”','"He came for the brisket."','«Veio comer peito fumado.»'),fx:()=>{rel('lucia').met=true;addTrust('lucia',-2);S.flags.c4_liedLucia=true}},
  {t:t('岔开话题，问她这周有什么肉','Change the subject: what meat has she got this week','Mudar de assunto: que carne tem ela esta semana'),fx:()=>{rel('lucia').met=true;addTrust('lucia',-1)}}]};
}},

/* ---------- W38: Old Man Fitzgerald, letter 11 ---------- */
{id:'c4_fitz',when:()=>S.week===38&&S.day===5&&S.slot===2,run:()=>{
 letter(11);rel('colleen').met=true;
 const need=!c4_proof();
 const ch=[];
 if(need)ch.push({t:t('请他在议会上作证','Ask him to testify at the council','Pedir-lhe que testemunhe na câmara'),req:()=>rel('colleen').trust>=3||S.rep>=40||NEED(t('科琳信任 3 或口碑 40','Colleen\'s trust 3 or reputation 40','confiança da Colleen 3 ou reputação 40')),fx:()=>{S.flags.c4_witness='fitz';addTrust('colleen',1);log('老菲茨杰拉德答应作证','Old Man Fitzgerald will testify','O velho Fitzgerald vai testemunhar')},next:()=>say('',t('老人戴回帽子：“我欠他二十年。一个晚上，还得起。”','The old man puts his hat back on. "I owe him twenty years. One evening I can pay."','O velho volta a pôr o chapéu. «Devo-lhe vinte anos. Uma noite consigo pagar.»'))});
 ch.push({t:t('给他倒一杯波特酒，听他讲完','Pour him a glass of port and let him finish','Servir-lhe um cálice de Porto e ouvi-lo até ao fim'),fx:()=>{addLike('colleen',1);stat('saud',3);S.lusoThisWeek=true}},
  {t:t('谢谢他，把信收进铁盒','Thank him, put the letter in the tin','Agradecer e guardar a carta na lata'),fx:()=>addTrust('colleen',1)});
 return {title:t('第 11 封信','Letter #11','Carta n.º 11'),meta:t('老菲茨杰拉德','Old Man Fitzgerald','O velho Fitzgerald'),text:[
  t('科琳扶着祖父进来。老人放下一个发黄的信封：“2003 年若泽给我的，说他出了事就替他寄。我没寄——怕里面写着我。”','Colleen helps her grandfather in. He sets down a yellowed envelope. "José gave me this in 2003. Said mail it if anything happened to him. I never did. Scared I was in it."','A Colleen ajuda o avô a entrar. Ele pousa um envelope amarelado. «O José deu-mo em 2003, para mandar se lhe acontecesse alguma coisa. Nunca o mandei. Tive medo de lá estar.»'),
  t('“费尔南达：我签了字。他们给了我一块地，跟爸爸那条船的甲板差不多大。这是我第二次选择活下去，而不是开口。第一次，‘圣安东尼号’沉了，我让爸爸说他想说的。第二次，我收下汉克的地，对那些水闭了嘴。报告我留着，等一个比我勇敢的人。”','"Fernanda: I signed. They gave me a piece of land about the size of Father\'s deck. It\'s the second time I\'ve chosen to survive instead of speak. The first time, the Santo António went down and I let Father say what he wanted. The second time, I took Hank\'s land and kept quiet about the water. I\'ve kept the report, for someone braver than me."','«Fernanda: assinei. Deram-me um terreno do tamanho do convés do barco do pai. É a segunda vez que escolho sobreviver em vez de falar. Da primeira, o Santo António foi ao fundo e deixei o pai dizer o que quis. Da segunda, aceitei a terra do Hank e calei-me sobre a água. Guardei o relatório, para alguém mais corajoso do que eu.»'),
  t('老人看着你：“他说的那个人，是你吗？”','The old man looks at you. "That someone he meant. Is it you?"','O velho olha para ti. «Esse alguém de que ele fala. És tu?»')],choices:ch};
}},

/* ---------- W39: council vote ---------- */
{id:'c4_council',when:()=>S.week===39&&S.day===4&&S.slot===2,run:()=>{
 rel('dale').met=true;
 const intro=[t('礼堂坐满了，特拉维斯坐第一排，阿尔贝蒂娜太太在后排织毛线。议程第一项：罐头厂地块改划。','The hall is full. Travis in the front row, Dona Albertina knitting at the back. Item one: rezoning the cannery tract.','O salão está cheio. O Travis na primeira fila, a Dona Albertina a fazer tricô lá atrás. Primeiro ponto: requalificar o terreno da fábrica.')];
 const finish=sp=>()=>{const v=c4_votes(sp);S.flags.c4_votes=v;S.flags.c4_vote=v>=3?'blocked':'passed';if(v>=3){S.rep+=5;addTrust('albertina',1)}log(v>=3?'改划被否决':'改划通过了',v>=3?'Rezoning denied':'Rezoning approved',v>=3?'Requalificação indeferida':'Requalificação aprovada')};
 if(c4_path()==='deal')return {title:t('镇议会','Town council','A câmara'),meta:C4_META,text:[...intro,
  t('合同在你的内袋里。改划一通过，钱就到账。你的手心全是汗。','The contract is in your inside pocket. The money comes the moment the rezoning passes. Your palms are soaked.','O contrato está no bolso de dentro. O dinheiro chega quando a requalificação passar. Tens as mãos encharcadas.')],choices:[
  {t:t('坐着不动','Stay in your seat','Ficar sentado'),fx:()=>{S.flags.c4_votes=1;S.flags.c4_vote='passed';const c=S.flags.c4_dealCash||15000;S.cash+=c;stat('saud',5);addTrust('roz',-1);addTrust('colleen',-1);log(`改划通过，特拉维斯付了 $${c}`,`Rezoning passed; Travis paid $${c}`,`Requalificação aprovada; o Travis pagou $${c}`)},next:c4_voteScene},
  {t:t('站起来，当众撕掉合同','Stand up and tear the contract in front of everyone','Levantar-te e rasgar o contrato à frente de todos'),req:()=>c4_proof()||c4_doubtOK()||NEED(t('证据或证人','Evidence or a witness','Provas ou uma testemunha')),fx:()=>{S.flags.travisDeal='council';addTrust('roz',2);addTrust('dale',1);S.rep+=3;finish(1)();log('当众撕毁了和特拉维斯的合同','Tore up Travis\'s contract in public','Rasgaste o contrato do Travis em público')},next:()=>({title:t('撕纸的声音','The sound of tearing paper','O som do papel a rasgar'),meta:C4_META,text:[t('礼堂里只剩撕纸声。你说：“他付钱，是为了让一份报告消失。我不卖。”特拉维斯第一次没有笑。','Only the sound of tearing paper. "He\'s paying to make a report disappear. I\'m not selling." For the first time, Travis isn\'t smiling.','Só se ouve o papel a rasgar. «Ele está a pagar para fazer desaparecer um relatório. Eu não vendo.» Pela primeira vez, o Travis não sorri.')],choices:[{t:t('等待投票','Wait for the vote','Esperar pela votação'),next:c4_voteScene}]})}]};
 return {title:t('镇议会','Town council','A câmara'),meta:C4_META,text:[...intro,
  t(c4_proof()?'轮到你了。你手里的东西够了——剩下的，是怎么让这间屋子里的人相信你。':'轮到你了。你手里几乎什么都没有，只有若泽的名字。','It\'s your turn. '+(c4_proof()?'What you\'re holding is enough — the rest is making this room believe you.':'You\'re holding almost nothing. Just José\'s name.'),'É a tua vez. '+(c4_proof()?'O que tens nas mãos chega — o resto é convencer esta sala.':'Não tens quase nada nas mãos. Só o nome do José.'))],choices:[
  {t:t('用最正式的英语逐条陈述','Lay it out point by point in your most formal English','Expor ponto por ponto no inglês mais formal'),fx:()=>{const ok=charm()+formalPenalty()+(S.flags.c4_prep?12:0)+R(-10,10)>=50;S.flags.c4_speech=ok;finish(ok)()},next:()=>({title:t('陈述','The statement','A exposição'),meta:t(`正式场合口音修正 ${formalPenalty()}`,`Formal-setting accent modifier ${formalPenalty()}`,`Modificador de sotaque em contexto formal ${formalPenalty()}`),text:[S.flags.c4_speech?t('你一个词都没卡。坐下时，格蕾丝在桌下冲你竖了大拇指。','You don\'t stumble once. As you sit, Grace gives you a thumbs-up under the table.','Não tropeças uma única vez. Quando te sentas, a Grace faz-te um polegar para cima por baixo da mesa.'):t('“地下水”你念错了两次，后排有人笑出声。议员们礼貌地记着笔记，礼貌得让你心里发凉。','You mispronounce "groundwater" twice; someone laughs at the back. The council takes polite notes — polite enough to chill you.','Pronuncias mal «groundwater» (água subterrânea) duas vezes; alguém se ri. Os vereadores tomam notas com uma educação que te gela.')],choices:[{t:t('等待投票','Wait for the vote','Esperar pela votação'),next:c4_voteScene}]})},
  {t:t('不念稿，讲若泽的故事','Drop the script and tell José\'s story','Largar o papel e contar a história do José'),req:()=>S.flags.homecoming==='truth'||rel('dale').trust>=4||NEED(t('返校赛之夜说过实话，或戴尔牧师信任 4','Told the truth at homecoming, or Pastor Dale\'s trust 4','ter dito a verdade no regresso a casa, ou confiança do Pastor Dale 4')),fx:()=>{addTrust('dale',1);finish(1)()},next:()=>({title:t('若泽的故事','José\'s story','A história do José'),meta:C4_META,text:[t('你讲一个弃船救人、当众念出检测数字、然后沉默了一辈子的人。讲到一半，戴尔牧师摘下了眼镜。','You tell them about a man who abandoned ship to save a life, read the test numbers aloud in the cannery yard, then kept silent for the rest of his life. Halfway through, Pastor Dale takes off his glasses.','Falas de um homem que abandonou o barco para salvar uma vida, leu os números das análises em voz alta e depois se calou para sempre. A meio, o Pastor Dale tira os óculos.')],choices:[{t:t('等待投票','Wait for the vote','Esperar pela votação'),next:c4_voteScene}]})},
  {t:t('请格蕾丝代你发言','Ask Grace to speak for you','Pedir à Grace que fale por ti'),req:()=>rel('grace').trust>=5||NEED(t('格蕾丝信任 5','Grace\'s trust 5','confiança da Grace 5')),fx:()=>{addTrust('grace',1);finish(1)()},next:c4_voteScene},
  {t:`[${faceWord()}] `+t('笑着请大家相信你','Smile and ask them to trust you','Sorrir e pedir que confiem em ti'),req:CHARM_REQ(50),fx:()=>{flirt();S.rep+=1;finish(0)()},next:()=>({title:t('笑容','The smile','O sorriso'),meta:C4_META,text:[t('他们都对你笑了，然后低头看文件。他们喜欢你，但这不等于相信你。','They all smile back, then look down at their papers. They like you. That isn\'t the same as believing you.','Sorriem-te todos e depois olham para os papéis. Gostam de ti. Não é o mesmo que acreditarem em ti.')],choices:[{t:t('等待投票','Wait for the vote','Esperar pela votação'),next:c4_voteScene}]})}]};
}},

/* ---------- W40: aftermath + Albertina's idea ---------- */
{id:'c4_after',when:()=>S.week===40&&S.day===1&&S.slot===0,run:()=>{
 if(S.flags.stormOpen===true)c4_fs(1,'storm');
 if(S.flags.c4_vote==='blocked')c4_fs(1,'vote');
 const v=S.flags.c4_vote==='blocked',deal=c4_path()==='deal';
 return {title:t('第二天早上','The morning after','Na manhã seguinte'),meta:C4_META,text:[
  v?t('州里的人来罐头厂边上打了三口取样井。特拉维斯的皮卡第一次没停在健身房门口。','State inspectors drill three test wells by the cannery. For the first time, Travis\'s truck isn\'t parked outside the gym.','Os inspetores do estado abrem três furos junto à fábrica. Pela primeira vez, a carrinha do Travis não está à porta do ginásio.')
  :deal?t('推土机开到了罐头厂门口，你的账户多了一长串数字。露西娅这周没来送肉。','Bulldozers roll up to the cannery gate; your account has a long new number in it. Lucía doesn\'t deliver the meat this week.','As escavadoras chegam ao portão da fábrica; a tua conta tem um número novo e comprido. A Lucía não vem trazer a carne esta semana.')
  :t('改划通过了。但你的话全进了会议记录，开发之前必须做环境评估。特拉维斯赢了投票，输了时间。','The rezoning passed. But your words went into the minutes, and nothing gets built without an environmental review. Travis won the vote and lost the clock.','A requalificação passou. Mas as tuas palavras ficaram na ata, e nada se constrói sem avaliação ambiental. O Travis ganhou a votação e perdeu o tempo.'),
  t('阿尔贝蒂娜太太把一张 1979 年的传单拍在柜台上：“圣安东尼节。若泽年年说要在这儿办，从没办成。今年你来办。里斯本六月过，我们就在蓝帽子花开时办——圣人不会介意。”','Dona Albertina slaps a 1979 flyer on the counter. "Santo António. Every year José said he\'d hold one here, and never did. This year, you will. Lisbon does it in June; we\'ll do it when the bluebonnets bloom. The saint won\'t mind."','A Dona Albertina bate com um folheto de 1979 no balcão. «Santo António. Todos os anos o José dizia que ia fazer um cá, e nunca fez. Este ano fazes tu. Em Lisboa é em junho; nós fazemos quando florirem as flores azuis. O santo não se importa.»'),
  ],choices:[
  {t:t('“好，我来办。”','"All right. I\'ll do it."','«Está bem. Eu faço.»'),fx:()=>{S.rep+=2;S.flags.c4_festStart=true}},
  {t:t('“为什么是我？”','"Why me?"','«Porquê eu?»'),fx:()=>{addTrust('albertina',2);S.flags.c4_festStart=true},next:()=>say('',t('她掏出一张纸：一串名字和电话，若泽的笔迹。“他早就列好了谁会帮忙，只是不敢打这些电话。”','She pulls out a sheet: names and numbers in José\'s hand. "He knew who\'d help. He just never dared make the calls."','Tira uma folha: nomes e números com a letra do José. «Ele sabia quem ia ajudar. Só nunca teve coragem de telefonar.»'))}]};
}},

/* ---------- W40: basil pots ---------- */
{id:'c4_albertina',when:()=>S.week===40&&S.day===3&&S.slot===1,run:()=>({title:t('罗勒盆栽','The basil pots','Os manjericos'),meta:C4_FEST,text:[
 t('教堂地下室里坐着九位亚速尔裔老太太。圣安东尼节要送一盆小罗勒，插纸康乃馨，夹一首四行情诗。','Nine Azorean-born ladies sit in the church basement. On Santo António you give a little basil pot with a paper carnation and a four-line love poem.','Nove senhoras açorianas estão na cave da igreja. No Santo António oferece-se um manjerico com um cravo de papel e uma quadra de amor.'),
 t('“我们记得怎么种，”阿尔贝蒂娜说，“就是忘了诗怎么写。”','"We remember how to grow them," Albertina says. "We\'ve forgotten how the poems go."','«Lembramo-nos de como se semeiam», diz a Albertina. «Esquecemo-nos foi de como são as quadras.»')],choices:[
 {t:t('用葡语跟她们一起念四行诗','Recite the quatrains with them in Portuguese','Dizer as quadras com elas em português'),req:()=>S.stats.saud>=40||S.accent==='浓'||NEED(t('乡愁 40 或浓口音','Homesickness 40 or a heavy accent','Saudade 40 ou sotaque carregado')),fx:()=>{addLike('albertina',2);S.lusoThisWeek=true;c4_fs(1,'albertina')},next:()=>say('',t('念到第三首，最老的那位接上了最后一句。她五十年没说过这句话了。','By the third poem, the oldest lady supplies the last line. She hasn\'t said it in fifty years.','À terceira quadra, a mais velha diz o último verso. Não o dizia há cinquenta anos.'),C4_PLUS)},
 {t:t('帮她们在店后空地翻土育苗','Help them turn the soil and sow seedlings on the lot','Ajudá-las a cavar e semear no terreno'),req:()=>S.stats.oficio>=40||NEED(t('手艺 40','Craft 40','Ofício 40')),fx:()=>{addTrust('albertina',1);stat('tex',1);c4_fs(1,'albertina')},next:()=>say('',t('若泽的空地上，第一次长出了绿色的东西。','For the first time, something green grows on José\'s lot.','Pela primeira vez cresce algo verde no terreno do José.'),C4_PLUS)},
 {t:t('出钱买两百盆罗勒苗','Pay for two hundred basil seedlings','Pagar duzentos pés de manjerico'),req:MONEY(150),fx:()=>{S.cash-=150;c4_fs(1,'albertina')},next:()=>say('',t('奥斯汀苗圃的苗，比她们种的整齐，也难看。','Nursery seedlings from Austin — neater than theirs, and uglier.','Pés de um viveiro de Austin — mais certinhos do que os delas, e mais feios.'),C4_PLUS)},
 {t:t('交给她们自己办','Leave it to them','Deixar com elas'),fx:()=>stat('saud',2),next:()=>say('',t('她们点点头，又低头织起了毛线。','They nod and go back to their knitting.','Acenam e voltam ao tricô.'),C4_ZERO)}]})},

/* ---------- W41: ranch ---------- */
{id:'c4_ranch',when:()=>S.week===41&&S.day===4&&S.slot===1,run:()=>{
 rel('beto').met=true;
 const cold=c4_path()==='deal'&&!S.flags.c4_toldLucia;
 return {title:t('牧场的烤架','The ranch grills','As grelhas do rancho'),meta:C4_FEST,text:[
  t('贝托嚼着草根：“专找丢失东西的圣人？让他先把我去年跑丢的公牛找回来。”','Beto chews his grass stem. "A saint for lost things? He can start with the bull I lost last year."','O Beto mastiga a palha. «Um santo das coisas perdidas? Que comece pelo touro que perdi no ano passado.»'),
  cold?t('露西娅在马厩里刷马，自始至终没回头。','Lucía grooms a horse in the barn and never once turns around.','A Lucía escova um cavalo no estábulo e nunca se vira.'):t('露西娅靠着栅栏：“我们有三个大烤架，还有能拉花车的拖车。看你出什么价。”','Lucía leans on the fence. "Three big grills and a trailer that could pull a float. Depends what you\'re offering."','A Lucía encosta-se à cerca. «Três grelhadores grandes e um atrelado para um carro alegórico. Depende do que ofereces.»')],choices:[
  {t:t('跟贝托干一整天活，换烤架','Work a full day with Beto in exchange for the grills','Trabalhar um dia inteiro com o Beto em troca das grelhas'),req:()=>S.stats.tex>=30||rel('beto').trust>=4||NEED(t('德州味 30 或贝托信任 4','Texanness 30 or Beto\'s trust 4','Texanidade 30 ou confiança do Beto 4')),fx:()=>{addTrust('beto',1);stat('tex',2);c4_fs(1,'ranch')},next:()=>say('',t('天黑时贝托把烤架绑上拖车：“告诉你的圣人，公牛的事我记着。”','At dusk Beto straps the grills to the trailer. "Tell your saint I haven\'t forgotten the bull."','Ao anoitecer o Beto prende as grelhas ao atrelado. «Diz ao teu santo que não me esqueci do touro.»'),C4_PLUS)},
  {t:t('请露西娅骑马走在游行最前面','Ask Lucía to ride at the head of the parade','Pedir à Lucía que vá a cavalo à frente do desfile'),req:()=>(!cold&&rel('lucia').like>=4)||NEED(t('露西娅好感 4（且不在生你的气）','Lucía\'s affection 4 (and not angry with you)','afeto da Lucía 4 (e que não esteja zangada contigo)')),fx:()=>{rel('lucia').met=true;addLike('lucia',1);c4_fs(1,'ranch')},next:()=>say('',t('她想了想：“我穿什么？”这是你认识她以来，她第一次问这种问题。','She thinks about it. "What do I wear?" It\'s the first time since you\'ve known her that she\'s asked a question like that.','Pensa um bocado. «Visto o quê?» É a primeira vez desde que a conheces que faz uma pergunta destas.'),C4_PLUS)},
  {t:t('按天付租金','Pay to rent them by the day','Pagar o aluguer à diária'),req:MONEY(200),fx:()=>{S.cash-=200;c4_fs(1,'ranch')},next:()=>say('',t('贝托收了钱，数都没数。','Beto takes the money without counting it.','O Beto aceita o dinheiro sem o contar.'),C4_PLUS)},
  {t:t('店里的烤架够用了','The shop grill will do','A grelha do restaurante chega'),fx:()=>stat('oficio',1),next:()=>say('',t('一个烤架，一次八条。会排很长的队。','One grill, eight sardines at a time. The line will be long.','Uma grelha, oito sardinhas de cada vez. A fila vai ser comprida.'),C4_ZERO)}]};
}},

/* ---------- W41: church / Pastor Dale ---------- */
{id:'c4_church',when:()=>S.week===41&&S.day===7&&S.slot===0,run:()=>{
 rel('dale').met=true;
 return {title:NM('dale'),meta:C4_FEST,text:[
  t('戴尔牧师拦住你：“天主教圣人的游行，要从我的浸信会教堂门口过，还要占镇公园？这得议会批。”','Pastor Dale stops you. "A Catholic saint\'s parade past my Baptist church, in the town park? That needs a council permit."','O Pastor Dale trava-te. «Um desfile de um santo católico à porta da minha igreja batista, no parque da vila? Isso precisa de licença da câmara.»'),
  S.flags.c4_vote==='blocked'?t('他顿了一下：“不过上次投票之后，我欠你一个公道。”','He pauses. "Though after that vote, I reckon I owe you a fair hearing."','Faz uma pausa. «Mas depois daquela votação, acho que te devo uma conversa justa.»'):t('他的语气很平，像在宣读条例。','His tone is flat, like he\'s reading out an ordinance.','O tom dele é neutro, como quem lê um regulamento.')],choices:[
  {t:t('正式递交申请，承诺全场不卖酒','Apply formally and promise no liquor on the grounds','Fazer o pedido formal e prometer que não há álcool no recinto'),fx:()=>{const ok=charm()+formalPenalty()+rel('dale').trust*4+(S.flags.c4_vote==='blocked'?10:0)+R(-10,10)>=55;S.flags.c4_permit=ok;if(ok)c4_fs(1,'church')},next:()=>say('',S.flags.c4_permit?t('一周后，许可证寄到了，右下角是牧师工整的签名。','A week later the permit arrives, the pastor\'s tidy signature in the corner.','Uma semana depois chega a licença, com a assinatura certinha do pastor.'):t('他说会“认真考虑”。在德州，这几个字的意思你已经懂了。','He says he\'ll "give it serious thought." You know by now what that means in Texas.','Diz que vai «pensar seriamente». Já sabes o que isso quer dizer no Texas.'),S.flags.c4_permit?C4_PLUS:C4_ZERO)},
  {t:t('请他在游行开头做一段祷告','Invite him to open the parade with a prayer','Convidá-lo a abrir o desfile com uma oração'),req:()=>rel('dale').trust>=4||NEED(t('戴尔牧师信任 4','Pastor Dale\'s trust 4','confiança do Pastor Dale 4')),fx:()=>{addTrust('dale',1);c4_fs(1,'church')},next:()=>say('',t('牧师愣了一下，笑了：“若泽也问过我一次。我那时候拒绝了。”','The pastor blinks, then laughs. "José asked me that once. I said no."','O pastor hesita e depois ri-se. «O José pediu-me isso uma vez. Disse que não.»'),C4_PLUS)},
  {t:t('让阿尔贝蒂娜太太去跟他说','Send Dona Albertina to talk to him','Mandar a Dona Albertina falar com ele'),req:()=>rel('albertina').like>=5||NEED(t('阿尔贝蒂娜好感 5','Albertina\'s affection 5','afeto da Albertina 5')),fx:()=>{c4_fs(1,'church')},next:()=>say('',t('你不知道她说了什么。你只知道牧师出来的时候，耳朵是红的。','You don\'t know what she said. You only know the pastor\'s ears were red when he came out.','Não sabes o que ela lhe disse. Só sabes que o pastor saiu com as orelhas vermelhas.'),C4_PLUS)},
  {t:t('游行绕开主街，走小路','Route the parade around Main Street, down the back roads','Desviar o desfile da rua principal pelas ruas de trás'),fx:()=>{S.rep-=1},next:()=>say('',t('小路上没有人行道，也没有观众。',`The back roads have no sidewalks. And no audience.`,'As ruas de trás não têm passeio. Nem público.'),C4_ZERO)}]};
}},

/* ---------- W42: Rui ---------- */
{id:'c4_rui',when:()=>S.week===42&&S.day===2&&S.slot===2,run:()=>{
 const sent=+S.flags.sentMoney||0;
 return {title:t('鲁伊的电话','Rui calls','O Rui liga'),meta:t('里斯本','Lisbon','Lisboa'),text:[
  sent>=500?t(`“妈出院了。你寄的那 $${sent}，付了康复科的账。”弟弟停了一下，“我以前说你只顾自己。我收回。”`,`"Mom\'s out of hospital. The $${sent} you sent paid for her rehab." Your brother pauses. "I used to say you only cared about yourself. I take it back."`,`«A mãe teve alta. Os $${sent} que mandaste pagaram a fisioterapia.» O teu irmão faz uma pausa. «Eu dizia que só pensavas em ti. Retiro o que disse.»`)
   :t('“妈出院了。钱的事我们自己扛过去了，差一点没扛住。”他的声音里没有责怪，只是累。','"Mom\'s out. We got through the money part ourselves. Barely." No blame in his voice. Just tiredness.','«A mãe teve alta. O dinheiro aguentámos sozinhos. Por pouco.» Não há censura na voz dele. Só cansaço.'),
  t('“听说你在德州办圣安东尼节？”他笑出声，“我想去看。可机票七百，我出不起。”','"You\'re throwing a Santo António in Texas?" He laughs. "I want to see that. The ticket\'s seven hundred. Can\'t swing it."','«Vais fazer um Santo António no Texas?» Ri-se. «Quero ver isso. O bilhete custa setecentos. Não tenho.»')],choices:[
  {t:t('给他买机票','Buy him the ticket','Comprar-lhe o bilhete'),req:MONEY(700),fx:()=>{S.cash-=700;S.flags.c4_rui=true;stat('saud',-5);c4_fs(1,'rui')},next:()=>say('',t('“我带阿尔法马的纸花环过去，”鲁伊说，“整整一箱。”',`"I\'ll bring paper garlands from Alfama," Rui says. "A whole box."`,'«Levo grinaldas de papel de Alfama», diz o Rui. «Uma caixa inteira.»'),C4_PLUS)},
  {t:t('“你留下陪妈。”','"Stay with Mom."','«Fica com a mãe.»'),fx:()=>{stat('saud',5)}},
  {t:t('“那天你去阿尔法马，开视频给我看。”','"Go to Alfama that night and video-call me."','«Nessa noite vai a Alfama e liga-me em vídeo.»'),fx:()=>{S.lusoThisWeek=true;stat('saud',-2);S.flags.c4_ruiVideo=true}}]};
}},

/* ---------- W42: Kyle's band ---------- */
{id:'c4_kyle',when:()=>S.week===42&&S.day===5&&S.slot===2,run:()=>{
 rel('kyle').met=true;
 return {title:t('孤星法多','Lone Star Fado','Lone Star Fado'),meta:C4_FEST,text:[
  t('凯尔看了三遍里斯本游行的录像：“他们有铜管和手风琴。我们有一把钢棒吉他，和一个只会两首歌的鼓手。”','Kyle watches the Lisbon parade video three times. "They\'ve got brass and accordion. We\'ve got a steel guitar and a drummer who knows two songs."','O Kyle vê três vezes o vídeo das marchas. «Eles têm metais e acordeão. Nós temos uma guitarra de aço e um baterista que sabe duas músicas.»')],choices:[
  {t:t('一句一句教他们唱一首老游行曲','Teach them an old parade song line by line','Ensinar-lhes uma marcha antiga verso a verso'),req:()=>S.stats.saud>=35||rel('kyle').like>=4||NEED(t('乡愁 35 或凯尔好感 4','Homesickness 35 or Kyle\'s affection 4','Saudade 35 ou afeto do Kyle 4')),fx:()=>{addLike('kyle',1);S.lusoThisWeek=true;c4_fs(1,'kyle')},next:()=>say('',t('凯尔把“里斯本”唱成了“利斯本”。你决定不纠正他。','Kyle sings "Lisboa" as "Lease-boa." You decide not to correct him.','O Kyle canta «Lisboa» como «Lisbôa». Decides não o corrigir.'),C4_PLUS)},
  {t:t('让他们按乡村乐重新编一版','Let them rework it as country','Deixá-los fazer uma versão country'),req:()=>S.stats.tex>=40||NEED(t('德州味 40','Texanness 40','Texanidade 40')),fx:()=>{stat('tex',2);c4_fs(1,'kyle')},next:()=>say('',t('第五遍的时候，厄尔在吧台后面跟着打起了拍子。','By the fifth run-through, Earl is tapping along behind the bar.','À quinta vez, o Earl já marca o ritmo atrás do balcão.'),C4_PLUS)},
  {t:t('花钱从奥斯汀请一支铜管乐队','Hire a brass band from Austin','Contratar uma banda de metais de Austin'),req:MONEY(400),fx:()=>{S.cash-=400;addLike('kyle',-1);c4_fs(1,'kyle')},next:()=>say('',t('凯尔说没关系。他说了两遍。','Kyle says it\'s fine. He says it twice.','O Kyle diz que não faz mal. Diz duas vezes.'),C4_PLUS)},
  {t:t('“放录音就行。”','"We\'ll just play a recording."','«Põe-se uma gravação.»'),fx:()=>{},next:()=>say('',t('凯尔点点头，把吉他放回琴盒，扣得很慢。','Kyle nods and puts his guitar back in its case. He fastens the latches slowly.','O Kyle acena e guarda a guitarra. Fecha o estojo devagar.'),C4_ZERO)}]};
}},

/* ---------- W43: Megan's choir ---------- */
{id:'c4_megan',when:()=>S.week===43&&S.day===3&&S.slot===1&&rel('megan').met,run:()=>({title:t('唱诗班','The choir','O coro'),meta:C4_FEST,text:[
 t('梅根拦住你：“我想让唱诗班在游行最后用葡语唱一首。我爸还不知道。”','Megan catches you. "I want the choir to sing one in Portuguese at the end of the parade. Dad doesn\'t know yet."','A Megan apanha-te. «Quero que o coro cante uma em português no fim do desfile. O meu pai ainda não sabe.»')],choices:[
 {t:t('一句一句教她们葡语发音','Coach their Portuguese pronunciation line by line','Ensinar-lhes a pronúncia verso a verso'),req:()=>S.stats.saud>=40||NEED(t('乡愁 40','Homesickness 40','Saudade 40')),fx:()=>{addLike('megan',1);addTrust('megan',1);S.lusoThisWeek=true;c4_fs(1,'megan')},next:()=>say('',t('鼻元音差点把唱诗班难哭。到周五，她们唱得比你还像里斯本人。','The nasal vowels nearly make the choir cry. By Friday they sound more Lisbon than you.','As vogais nasais quase fazem o coro chorar. À sexta já soam mais lisboetas do que tu.'),C4_PLUS)},
 {t:t('“唱你们自己的赞美诗就好。”','"Sing one of your own hymns."','«Cantem um dos vossos hinos.»'),fx:()=>{addTrust('dale',1);c4_fs(1,'megan')},next:()=>say('',t('梅根有点失望，但她爸这次没反对。','Megan\'s a little let down, but her father doesn\'t object.','A Megan fica desiludida, mas o pai não se opõe.'),C4_PLUS)},
 {t:`[${faceWord()}] `+t('答应每次排练都去听','Promise to come to every rehearsal','Prometer ir a todos os ensaios'),req:CHARM_REQ(55),fx:()=>{flirt();addLike('megan',2);c4_fs(1,'megan')},next:()=>say('',t('排练的出勤率从没这么高过。不全是为了唱歌。','Rehearsal attendance has never been this high. Not all of it is about singing.','Os ensaios nunca tiveram tanta gente. Nem tudo é pela música.'),C4_PLUS)},
 {t:t('“别惹你爸了。”','"Don\'t cross your dad."','«Não arranjes problemas com o teu pai.»'),fx:()=>addTrust('megan',-1),next:()=>say('',t('她说“好”。那个“好”字比任何一首赞美诗都冷。','She says "okay." It\'s colder than any hymn.','Diz «está bem». Mais frio do que qualquer hino.'),C4_ZERO)}]})},

/* ---------- W43: Delphine / publicity ---------- */
{id:'c4_delphine',when:()=>S.week===43&&S.day===6&&S.slot===1,run:()=>{
 rel('delphine').met=true;
 return {title:NM('delphine'),meta:C4_FEST,text:[
  t('德尔菲娜：“给我一个故事，我让两万个关注者开一小时车来吃沙丁鱼。”','Delphine: "Give me a story and I\'ll have twenty thousand followers driving an hour for sardines."','A Delphine: «Dá-me uma história e ponho vinte mil seguidores a conduzir uma hora por sardinhas.»')],choices:[
  {t:t('让她拍真实的筹备：老太太、罗勒、烤架','Let her shoot the real prep: the old ladies, the basil, the grills','Deixá-la fotografar a preparação a sério: as senhoras, os manjericos, as grelhas'),req:()=>S.stats.oficio>=45||S.online>=30||NEED(t('手艺 45 或线上评分 30','Craft 45 or online rating 30','Ofício 45 ou avaliação online 30')),fx:()=>{S.online=clamp(S.online+5,0,100);addLike('delphine',1);c4_fs(1,'delphine')},next:()=>say('',t('她的标题是《九位老太太，和一个忘了怎么回家的男人》。转发数一夜过了三千。','Her headline: "Nine Old Ladies and a Man Who Forgot the Way Home." Three thousand shares overnight.','O título dela: «Nove senhoras e um homem que se esqueceu do caminho para casa». Três mil partilhas numa noite.'),C4_PLUS)},
  {t:`[${faceWord()}] `+t('拍你自己当封面','Put yourself on the cover','Seres tu a capa'),req:CHARM_REQ(60),fx:()=>{flirt();S.online=clamp(S.online+8,0,100);c4_fs(1,'delphine')},next:()=>say('',t('点赞很多。评论区一半在问你是不是单身。没有一条问沙丁鱼。','Lots of likes. Half the comments ask if you\'re single. Not one asks about the sardines.','Muitos gostos. Metade dos comentários pergunta se és solteiro. Nenhum pergunta pelas sardinhas.'),C4_PLUS)},
  {t:t('请科琳在报上登一整版','Ask Colleen for a full page in the paper','Pedir à Colleen uma página inteira no jornal'),req:()=>rel('colleen').trust>=4||NEED(t('科琳信任 4','Colleen\'s trust 4','confiança da Colleen 4')),fx:()=>{addTrust('colleen',1);c4_fs(1,'delphine')},next:()=>say('',t('《号角报》第一次用了彩色印刷。沙丁鱼是银色的。','For the first time ever, the Clarion runs a color page. The sardines are silver.','Pela primeira vez, o Clarion imprime uma página a cores. As sardinhas são prateadas.'),C4_PLUS)},
  {t:t('“不用宣传，镇上的人就够了。”','"No publicity. The town is enough."','«Não é preciso publicidade. A vila chega.»'),fx:()=>stat('tex',1),next:()=>say('',t('德尔菲娜耸耸肩，自己点了一份猪排包。','Delphine shrugs and orders herself a pork sandwich.','A Delphine encolhe os ombros e pede uma bifana.'),C4_ZERO)}]};
}},

/* ---------- W44: high school ---------- */
{id:'c4_school',when:()=>S.week===44&&S.day===2&&S.slot===1,run:()=>({title:t('校队','The team','A equipa'),meta:C4_FEST,text:[
 t('游行要二十个人举花拱门。汤米和小戴尔带来了整个橄榄球队，像一堵会吃东西的墙。','The parade needs twenty people to carry the arches. Tommy and Little Dale bring the whole football team, a wall that eats.','O desfile precisa de vinte pessoas para os arcos. O Tommy e o Dale Júnior trazem a equipa de futebol inteira, uma parede que come.'),
 t('“我们不跳舞，”小戴尔说，“我们走路。有区别。”','"We don\'t dance," Little Dale says. "We walk. There\'s a difference."','«Nós não dançamos», diz o Dale Júnior. «Nós andamos. É diferente.»')],choices:[
 {t:t('亲自教他们游行的步子','Teach them the parade steps yourself','Ensinar-lhes tu os passos da marcha'),req:()=>charm()>=50||S.stats.tex>=40||NEED(t('魅力 50 或德州味 40','Charm 50 or Texanness 40','Charme 50 ou Texanidade 40')),fx:()=>{S.rep+=1;c4_fs(1,'school')},next:()=>say('',t('第三天，他们发现游行步子跟训练的侧滑步差不多，从此练得比比赛还认真。','On day three they realize the step is basically a shuffle drill, and train harder than for any game.','Ao terceiro dia percebem que o passo é quase um exercício de treino, e esforçam-se mais do que nos jogos.'),C4_PLUS)},
 {t:t('请阿什莉来当教练','Ask Ashley to coach them','Pedir à Ashley que os treine'),req:()=>rel('ashley').like>=3||rel('ashley').trust>=3||NEED(t('阿什莉好感或信任 3','Ashley\'s affection or trust 3','afeto ou confiança da Ashley 3')),fx:()=>{rel('ashley').met=true;addLike('ashley',1);c4_fs(1,'school')},next:()=>say('',t('阿什莉吹了一声哨子，二十个人同时出了左脚。','Ashley blows her whistle and twenty left feet move at once.','A Ashley apita e vinte pés esquerdos avançam ao mesmo tempo.'),C4_PLUS)},
 {t:t('用免费猪排包收买他们','Bribe them with free pork sandwiches','Suborná-los com bifanas grátis'),req:MONEY(120),fx:()=>{S.cash-=120;c4_fs(1,'school')},next:()=>say('',t('四十个猪排包，十分钟。他们答应了，嘴里塞得说不清楚。','Forty sandwiches, ten minutes. They say yes with their mouths too full to be understood.','Quarenta bifanas em dez minutos. Dizem que sim com a boca demasiado cheia para se perceber.'),C4_PLUS)},
 {t:t('“那就不要拱门了。”','"Then forget the arches."','«Então esquece os arcos.»'),fx:()=>{},next:()=>say('',t('汤米看起来比你还失望。',`Tommy looks more disappointed than you are.`,'O Tommy parece mais desiludido do que tu.'),C4_ZERO)}]})},

/* ---------- W44: sardines ---------- */
{id:'c4_sardines',when:()=>S.week===44&&S.day===5&&S.slot===0,run:()=>({title:t('沙丁鱼','The sardines','As sardinhas'),meta:C4_FEST,text:[
 t('圣安东尼节至少要烤一千条沙丁鱼。离德州最近的沙丁鱼船，隔着一个大西洋。','Santo António needs at least a thousand sardines. The nearest sardine boat is an Atlantic away.','O Santo António precisa de pelo menos mil sardinhas. O barco mais próximo está a um Atlântico de distância.')],choices:[
 {t:t('从新泽西的进口商订葡萄牙冷冻沙丁鱼','Order frozen Portuguese sardines from an importer in New Jersey','Encomendar sardinha portuguesa congelada a um importador de Nova Jérsia'),req:MONEY(500),fx:()=>{S.cash-=500;S.lusoThisWeek=true;c4_fs(1,'sardines')},next:()=>say('',t('箱子上印着“马托西纽什”。你摸着那几个字，像摸着一封家信。','The boxes are stamped "Matosinhos." You run your fingers over the word like a letter from home.','As caixas dizem «Matosinhos». Passas os dedos pela palavra como por uma carta de casa.'),C4_PLUS)},
 {t:t('开车去加尔维斯顿，找墨西哥湾的渔船','Drive to Galveston and find a Gulf boat','Ir a Galveston procurar um barco do Golfo'),req:()=>S.stats.oficio>=50||NEED(t('手艺 50','Craft 50','Ofício 50')),fx:()=>{stat('tex',2);stat('oficio',2);c4_fs(1,'sardines')},next:()=>say('',t('墨西哥湾的鱼更肥更咸，你叫它“德州沙丁鱼”。阿尔贝蒂娜尝了一条，没说话，又拿了一条。','Gulf fish are fattier and saltier; you call them "Texas sardines." Albertina eats one, says nothing, takes another.','O peixe do Golfo é mais gordo e salgado; chamas-lhe «sardinha texana». A Albertina come uma, não diz nada e tira outra.'),C4_PLUS)},
 {t:t('用店里的进口存货','Use the imported stock in the shop','Usar o stock importado do restaurante'),req:()=>S.inv.imp>=10||NEED(t('进口货 10 份','10 units of imports','10 doses de importados')),fx:()=>{S.inv.imp-=10;c4_fs(1,'sardines')},next:()=>say('',t('冷柜空了一半。','Half the freezer is empty now.','Meia arca ficou vazia.'),C4_PLUS)},
 {t:t('改烤鸡翅','Grill chicken wings instead','Grelhar asas de frango'),fx:()=>stat('tex',2),next:()=>say('',t('鸡翅很好吃，只是没人会因此想起里斯本。','The wings are good. Nobody remembers Lisbon over them.','As asas estão boas. Ninguém se lembra de Lisboa por causa delas.'),C4_ZERO)}]})},

/* ---------- W45: Hank Boyd ---------- */
{id:'c4_hank',when:()=>S.week===45&&S.day===1&&S.slot===1,run:()=>{
 const v=S.flags.c4_vote==='blocked',deal=c4_path()==='deal';
 return {title:t('汉克·博伊德','Hank Boyd','Hank Boyd'),meta:t('罐头厂的老板','The cannery\'s owner','O dono da fábrica'),text:[
  t('特拉维斯没下车。他八十岁的父亲汉克拖着氧气瓶，坐上若泽常坐的凳子。','Travis stays at the wheel. His father Hank, eighty, towing an oxygen tank, sits on José\'s old stool.','O Travis fica ao volante. O pai, o Hank, oitenta anos e garrafa de oxigénio, senta-se no banco do José.'),
  v?t('“我建的不是工厂，是地上的窟窿。你舅舅想告诉我，我拿一块地堵了他的嘴。死之前，我想说一次实话。”','"I didn\'t build a factory. I built a hole in the ground. Your uncle tried to tell me, and I shut him up with a patch of dirt. I\'d like to tell the truth once before I die."','«Não construí uma fábrica, construí um buraco no chão. O teu tio tentou avisar-me e eu calei-o com um pedaço de terra. Queria dizer a verdade uma vez antes de morrer.»')
   :deal?t('“我儿子赢了。我这辈子也一直在赢。”他拍拍氧气瓶，“你看看我。”','"My boy won. I\'ve won my whole life too." He pats the oxygen tank. "Look at me."','«O meu filho ganhou. Eu também passei a vida a ganhar.» Bate na garrafa de oxigénio. «Olha para mim.»')
   :t('“投票是我儿子赢了，可评估下个月就出来。你舅舅要是还在，会笑的。”','"My boy won the vote, but the review comes out next month. Your uncle would be laughing."','«O meu filho ganhou a votação, mas a avaliação sai no mês que vem. O teu tio estaria a rir-se.»')],choices:[
  {t:t('请他在节日上当众说那句实话','Ask him to say that truth out loud at the festival','Pedir-lhe que diga essa verdade em público na festa'),req:()=>v||NEED(t('改划被否决','The rezoning was denied','a requalificação ter sido indeferida')),fx:()=>{S.flags.c4_hank='speech';c4_fs(1,'hank')},next:()=>say('',t('他点点头，自己付了烟花钱：“这个镇子欠若泽一点响声。”','He nods and pays for the fireworks himself. "This town owes José some noise."','Acena e paga ele o fogo de artifício. «Esta vila deve um bocado de barulho ao José.»'),C4_PLUS)},
  {t:t('收下他的 $500 赞助','Accept his $500 sponsorship','Aceitar o patrocínio de $500'),fx:()=>{S.cash+=500;S.rep-=1;S.flags.c4_hank='money'},next:()=>say('',t('支票上的签名，和若泽那份协议上的一模一样。','The signature on the check is the same one on José\'s settlement.','A assinatura no cheque é igual à do acordo do José.'))},
  {t:t('请他离开','Ask him to leave','Pedir-lhe que se vá embora'),fx:()=>{S.flags.c4_hank='no';stat('saud',2)},next:()=>say('',t('他慢慢走了。特拉维斯隔着挡风玻璃看了你很久。','He leaves slowly. Through the windshield, Travis watches you for a long time.','Sai devagar. Pelo para-brisas, o Travis fica muito tempo a olhar para ti.'))}]};
}},

/* ---------- W45: arches and costumes ---------- */
{id:'c4_arches',when:()=>S.week===45&&S.day===4&&S.slot===1,run:()=>({title:t('拱门和服装','Arches and costumes','Arcos e trajes'),meta:C4_FEST,text:[
 t('里斯本每个街区都有自己的拱门和服装。你只有十天、一卷铁丝和一箱皱纹纸。','In Lisbon every neighborhood has its own arches and costumes. You have ten days, a roll of wire and a box of crepe paper.','Em Lisboa cada bairro tem os seus arcos e trajes. Tu tens dez dias, um rolo de arame e uma caixa de papel crepe.')],choices:[
 {t:t('请萨凡纳用真花做拱门','Ask Savannah to make the arches with real flowers','Pedir à Savannah arcos de flores verdadeiras'),req:()=>rel('savannah').like>=3||NEED(t('萨凡纳好感 3','Savannah\'s affection 3','afeto da Savannah 3')),fx:()=>{rel('savannah').met=true;addLike('savannah',1);c4_fs(1,'arches')},next:()=>say('',t('她用了向日葵和蓝帽子花。“德州的颜色，”她说，“葡萄牙的形状。”','She uses sunflowers and bluebonnets. "Texas colors," she says. "Portuguese shape."','Usa girassóis e flores azuis. «Cores do Texas», diz ela. «Forma portuguesa.»'),C4_PLUS)},
 {t:t('请克拉拉带图书馆的缝纫小组做服装','Ask Clara to bring the library sewing circle','Pedir à Clara o grupo de costura da biblioteca'),req:()=>rel('clara').like>=3||NEED(t('克拉拉好感 3','Clara\'s affection 3','afeto da Clara 3')),fx:()=>{rel('clara').met=true;addLike('clara',1);c4_fs(1,'arches')},next:()=>say('',t('克拉拉照着一本 1950 年代的画册，一针一针缝出了阿尔法马的背心。','Clara follows a 1950s picture book and stitches Alfama vests one by one.','A Clara segue um livro de fotografias dos anos 50 e cose coletes de Alfama um a um.'),C4_PLUS)},
 {t:t('自己熬夜糊纸花','Stay up making paper flowers yourself','Fazer flores de papel noite dentro'),req:()=>S.stats.oficio>=40||NEED(t('手艺 40','Craft 40','Ofício 40')),fx:()=>{S.energy=Math.max(0,S.energy-2);stat('saud',2);c4_fs(1,'arches')},next:()=>say('',t('凌晨三点，你满手胶水，想起小时候妈妈也这样在厨房里给街区糊花。','At 3 a.m., fingers sticky with glue, you remember your mother doing this in the kitchen for the neighborhood.','Às três da manhã, de dedos cheios de cola, lembras-te da tua mãe a fazer isto na cozinha para o bairro.'),C4_PLUS)},
 {t:t('不要拱门，大家穿自己的衣服','No arches; everyone wears their own clothes','Sem arcos; cada um vai com a sua roupa'),fx:()=>{},next:()=>say('',t('牛仔裤和格子衬衫。也算一种传统。','Jeans and plaid shirts. That\'s a tradition too, of a kind.','Calças de ganga e camisas aos quadrados. Também é uma tradição, à sua maneira.'),C4_ZERO)}]})},

/* ---------- W46: Mother's last call ---------- */
{id:'c4_mother',when:()=>S.week===46&&S.day===3&&S.slot===2,run:()=>{
 const sent=+S.flags.sentMoney||0;
 const end=t('最后她说：“你不用为了他留下，也不用为了我回来。这一年是你自己的。”','At the end she says: "You don\'t have to stay for him, or come back for me. This year was yours."','No fim diz: «Não tens de ficar por ele, nem de voltar por mim. Este ano foi teu.»');
 return {title:t('妈妈','Mother','A mãe'),meta:t('最后一通电话','The last call','A última chamada'),text:[
  t('这一次是妈妈自己打来的。她的声音轻了一点，但还是那个会问你吃了没有的声音。','This time your mother calls herself. Her voice is lighter, but it\'s still the voice that asks if you\'ve eaten.','Desta vez é a tua mãe que liga. A voz está mais fraca, mas continua a ser a que pergunta se já comeste.'),
  sent>0?t('“鲁伊说了钱的事。傻孩子。”她顿了顿，“谢谢你。”','"Rui told me about the money. Silly boy." A pause. "Thank you."','«O Rui contou-me do dinheiro. Tonto.» Uma pausa. «Obrigada.»'):t('“你那边忙，我知道。不用惦记我。”','"You\'re busy over there. I know. Don\'t worry about me."','«Estás ocupado aí, eu sei. Não te preocupes comigo.»'),
  t('“你在那个店里，”她终于问，“找到他的什么了吗？”','"In that shop," she finally asks, "did you find anything of his?"','«Nesse restaurante», pergunta por fim, «encontraste alguma coisa dele?»')],choices:[
  {t:t('告诉她沉船那一夜的真相','Tell her the truth about the night the boat sank','Contar-lhe a verdade sobre a noite do naufrágio'),req:()=>S.letters>=8||NEED(t('若泽的信 8 封','8 of José\'s letters','8 cartas do José')),fx:()=>{S.flags.c4_toldMother=true;stat('saud',4)},next:()=>({title:t('妈妈','Mother','A mãe'),meta:t('最后一通电话','The last call','A última chamada'),text:[t('沉默了很久。“我知道。爸临死前说了。”她笑了一声，比哭还难听，“他等我原谅，我等他道歉。我们俩都等成了老人。”','A long silence. "I know. Father told me before he died." She laughs, worse than crying. "He waited for my forgiveness, I waited for his apology. We waited ourselves old."','Um silêncio longo. «Eu sei. O pai contou-me antes de morrer.» Ri-se, pior do que chorar. «Ele à espera do meu perdão, eu à espera das desculpas dele. Ficámos velhos à espera.»'),end],choices:[{t:t('挂断电话','Hang up','Desligar')}]})},
  {t:t('念一段若泽的信给她听','Read her a passage from one of José\'s letters','Ler-lhe um trecho de uma carta do José'),req:()=>S.letters>=11||NEED(t('若泽的信 11 封','11 of José\'s letters','11 cartas do José')),fx:()=>{S.flags.c4_readMother=true;stat('saud',2)},next:()=>({title:t('妈妈','Mother','A mãe'),meta:t('最后一通电话','The last call','A última chamada'),text:[t('你刚念出“费尔南达”，她就哭了。那种憋了三十年、终于有地方放下的哭。','You read the word "Fernanda" and she starts to cry — the kind held in for thirty years that has finally found somewhere to set itself down.','Lês «Fernanda» e ela começa a chorar — o choro guardado trinta anos que finalmente encontrou onde pousar.'),end],choices:[{t:t('挂断电话','Hang up','Desligar')}]})},
  {t:t('只说他过得很好，有很多朋友','Just say he lived well and had lots of friends','Dizer só que ele viveu bem e tinha muitos amigos'),fx:()=>stat('saud',3),next:()=>({title:t('妈妈','Mother','A mãe'),meta:t('最后一通电话','The last call','A última chamada'),text:[t('“那就好。”她说。你们都知道这不是全部，但今晚，这样就够了。','"Good," she says. You both know that\'s not all of it. Tonight it\'s enough.','«Ainda bem», diz ela. Os dois sabem que não é tudo. Hoje chega.'),end],choices:[{t:t('挂断电话','Hang up','Desligar')}]})}]};
}},

/* ---------- W46: letter 12 ---------- */
{id:'c4_letter12',when:()=>S.week===46&&S.day===6&&S.slot===0,run:()=>{
 letter(12);rel('grace').met=true;
 return {title:t('第 12 封信','Letter #12','Carta n.º 12'),meta:NM('grace'),text:[
  t('格蕾丝放下一个封好的信封：“遗嘱附件规定，你撑到最后一个月，就交给你。他是走前两周写的。”','Grace sets down a sealed envelope. "The codicil says if you made it to the last month, this is yours. He wrote it two weeks before he passed."','A Grace pousa um envelope fechado. «O aditamento diz que, se chegasses ao último mês, isto era teu. Ele escreveu-a duas semanas antes de morrer.»'),
  t(`“亲爱的外甥：如果格蕾丝把信给了你，说明你来了，也留下了。店后那块地不是礼物，是一笔债。我没还上，你也不必替我还。我没回家，不是因为没人原谅我，是因为我一直没原谅自己。”`,`"Dear nephew: if Grace gave you this, it means you came, and you stayed. The lot behind the shop isn\'t a gift. It\'s a debt. I never paid it, and you don\'t have to pay it for me. I didn\'t go home, not because no one would forgive me, but because I never forgave myself."`,`«Querido sobrinho: se a Grace te deu isto, é porque vieste e ficaste. O terreno atrás do restaurante não é uma prenda. É uma dívida. Nunca a paguei, e tu não tens de a pagar por mim. Não voltei para casa não por ninguém me perdoar, mas porque nunca me perdoei a mim próprio.»`),
  t('“别为了我留下。想留就留，想走就走。只是六月十三号，买一盆小罗勒，写四行诗，送给一个你爱的人。我一辈子都没送出去过。——若泽”','"Don\'t stay for me. Stay if you want, go if you want. Only, on the thirteenth of June, buy a little basil pot, write four lines, and give it to someone you love. I never once gave mine away. — José"','«Não fiques por mim. Fica se quiseres, vai se quiseres. Só que, a 13 de junho, compra um manjerico, escreve uma quadra e dá-a a alguém de quem gostes. Eu nunca dei a minha. — José»')],choices:[
  {t:t('把信读两遍','Read it twice','Lê-la duas vezes'),fx:()=>{stat('saud',3);addTrust('grace',1)}},
  {t:t('把信递给格蕾丝','Hand the letter to Grace','Dar a carta à Grace'),fx:()=>{addTrust('grace',2);addLike('grace',1)},next:()=>say('',t('她读完，擦了擦眼镜：“我替他办了十年文件，从不知道他会写这样的字。”','She reads it and wipes her glasses. "Ten years doing his paperwork. I never knew he could write like that."','Lê e limpa os óculos. «Dez anos a tratar-lhe dos papéis. Nunca soube que escrevia assim.»'))},
  {t:t('折好放进胸前口袋，去开店','Fold it into your shirt pocket and open the shop','Dobrá-la no bolso da camisa e abrir o restaurante'),fx:()=>{stat('tex',2);stat('oficio',1)}}]};
}},

/* ---------- W47: the forecast ---------- */
{id:'c4_storm',when:()=>S.week===47&&S.day===2&&S.slot===1,run:()=>({title:t('天气预报','The forecast','A previsão do tempo'),meta:C4_FEST,text:[
 t('气象员指着一片红色：“周六有强雷暴。”阿尔贝蒂娜在胸前画了个十字。','The weatherman points at a red blob. "Severe storms Saturday." Albertina crosses herself.','O homem do tempo aponta para uma mancha vermelha. «Trovoadas fortes no sábado.» A Albertina benze-se.')],choices:[
 {t:t('找韦德和牧场的人搭大帐篷','Get Wade and the ranch hands to put up big tents','Pedir ao Wade e aos homens do rancho que montem tendas grandes'),req:()=>rel('wade').trust>=3||S.stats.tex>=45||NEED(t('韦德信任 3 或德州味 45','Wade\'s trust 3 or Texanness 45','confiança do Wade 3 ou Texanidade 45')),fx:()=>{rel('wade').met=true;addTrust('wade',1);c4_fs(1,'tents')},next:()=>say('',t('韦德看了一眼天，说了四个字：“桩打深点。”',`Wade looks at the sky and says three words: "Drive 'em deep."`,'O Wade olha para o céu e diz três palavras: «Estacas bem fundas.»'),C4_PLUS)},
 {t:t('租帐篷','Rent tents','Alugar tendas'),req:MONEY(300),fx:()=>{S.cash-=300;c4_fs(1,'tents')},next:()=>say('',t('婚庆公司的白帐篷，带蕾丝边。贝托说他这辈子没在蕾丝底下烤过肉。','White wedding tents with lace trim. Beto says he\'s never grilled under lace.','Tendas brancas de casamento, com renda. O Beto diz que nunca assou carne debaixo de renda.'),C4_PLUS)},
 {t:t('相信圣安东尼','Trust Saint Anthony','Confiar no Santo António'),fx:()=>{const ok=R(0,1)>0.4;S.flags.c4_sunny=ok;c4_fs(ok?1:-1,'saint')},next:()=>say('',S.flags.c4_sunny?t('周四，那片红色往东挪走了。阿尔贝蒂娜说：“看吧。”','On Thursday the red blob drifts east. Albertina says: "See?"','Na quinta-feira a mancha vermelha desvia-se para leste. A Albertina diz: «Estás a ver?»'):t('周四，红色一动不动。阿尔贝蒂娜叹气：“他管丢的东西，不管天气。”','On Thursday the red hasn\'t moved. Albertina sighs. "He finds lost things. He doesn\'t do weather."','Na quinta a mancha não saiu do sítio. A Albertina suspira. «Ele trata das coisas perdidas. Não do tempo.»'),S.flags.c4_sunny?C4_PLUS:t('节日筹备 −1','Festival prep −1','Preparação da festa −1'))}]})},

/* ---------- W47: the eve ---------- */
{id:'c4_eve',when:()=>S.week===47&&S.day===5&&S.slot===2,run:()=>{
 const s=S.flags.festivalScore||0,ch=[];
 if(S.settled&&NPCS[S.settled])ch.push({t:t('写给','Write it for ','Escrever para ')+NM(S.settled),fx:()=>{S.flags.c4_verse='settled';addLike(S.settled,1);addTrust(S.settled,1)}});
 ch.push({t:t('写给若泽','Write it for José','Escrever para o José'),fx:()=>{S.flags.c4_verse='jose';stat('saud',2)}},
  {t:S.flags.c4_rui?t('写给妈妈，让鲁伊带回去','Write it for Mom, for Rui to take home','Escrever para a mãe, para o Rui levar'):t('写给妈妈，明天寄出','Write it for Mom and mail it tomorrow','Escrever para a mãe e mandá-la amanhã'),fx:()=>{S.flags.c4_verse='mother';stat('saud',-3)}},
  {t:t('写给整个圣鲁伊斯，贴在店门上','Write it for all of San Luís and tape it to the door','Escrever para San Luís inteira e colá-la na porta'),req:()=>S.stats.tex>=40||NEED(t('德州味 40','Texanness 40','Texanidade 40')),fx:()=>{S.flags.c4_verse='town';S.rep+=2;c4_fs(1,'verse')}});
 return {title:t('节日前夜','The eve','A véspera'),meta:t(`节日筹备 ${s}/10`,`Festival prep ${s}/10`,`Preparação da festa ${s}/10`),text:[
  t('空地上摆满了罗勒，烤架已经排好。你一个人坐在台阶上，手里是一张空白的小纸条。','The lot is full of basil pots, the grills lined up. You sit alone on the step with a blank slip of paper.','O terreno está cheio de manjericos, as grelhas alinhadas. Estás sozinho no degrau com um papelinho em branco.'),
  s>=6?t('你数了数明天会来帮忙的人，手指不够用了。','You count the people coming to help tomorrow and run out of fingers.','Contas as pessoas que vêm ajudar amanhã e os dedos não chegam.'):t('你数了数明天会来帮忙的人，一只手就够了。','You count the people coming to help tomorrow. One hand is enough.','Contas as pessoas que vêm ajudar amanhã. Chega uma mão.'),
  t('四行诗。若泽没送出去的那种。','Four lines. The kind José never gave away.','Quatro versos. Daqueles que o José nunca deu.')],choices:ch};
}},

/* ---------- W48: the festival ---------- */
{id:'c4_festival',when:()=>S.week===48&&S.day===6&&S.slot===0,run:()=>{
 const s=S.flags.festivalScore||0,ok=s>=6;
 S.flags.festival=ok;
 if(ok){S.rep+=8+s;S.cash+=200+s*80;S.online=clamp(S.online+s,0,100)}else{S.rep+=2;S.cash+=s*40}
 log(ok?`圣安东尼节办成了（${s}/10）`:`圣安东尼节办得很冷清（${s}/10）`,ok?`The Santo António festival was a success (${s}/10)`:`The Santo António festival was a quiet one (${s}/10)`,ok?`A festa de Santo António foi um sucesso (${s}/10)`:`A festa de Santo António foi modesta (${s}/10)`);
 const lines=[];
 if(c4_crew('ranch'))lines.push(t('牧场的三个烤架烧到半夜，烟柱在州际公路上都看得见。','The three ranch grills burn till midnight; you can see the smoke from the interstate.','As três grelhas do rancho ardem até à meia-noite; vê-se o fumo da autoestrada.'));
 if(c4_crew('school'))lines.push(t('二十个橄榄球队员举着花拱门走过主街，步子整整齐齐。','Twenty football players carry the flower arches down Main Street, perfectly in step.','Vinte jogadores de futebol americano levam os arcos pela rua principal, a compasso perfeito.'));
 if(c4_crew('kyle'))lines.push(t('凯尔的乐队把游行曲弹出了乡村味。没人在乎，所有人都在跳。','Kyle\'s band plays the parade song country-style. Nobody cares. Everybody dances.','A banda do Kyle toca a marcha à country. Ninguém se importa. Toda a gente dança.'));
 if(c4_crew('megan'))lines.push(t('游行结束时，唱诗班的歌声从教堂台阶上落下来，主街安静了三分钟。','When the parade ends, the choir sings from the church steps and Main Street goes quiet for three minutes.','No fim do desfile, o coro canta nos degraus da igreja e a rua principal fica três minutos em silêncio.'));
 if(c4_crew('rui'))lines.push(t('鲁伊把阿尔法马的纸花环挂满了一整条街，冲你喊了一句只有你听得懂的脏话。','Rui strings Alfama\'s paper garlands down a whole street and shouts a swear word only you understand.','O Rui enche uma rua inteira de grinaldas de Alfama e grita-te um palavrão que só tu percebes.'));
 if(S.flags.c4_hank==='speech')lines.push(t('烟花之前，汉克·博伊德拿起话筒：“若泽说的是实话。我说的是假话。”然后坐下了。','Before the fireworks, Hank Boyd takes the microphone. "José told the truth. I lied." Then he sits down.','Antes do fogo de artifício, o Hank Boyd pega no microfone. «O José disse a verdade. Eu menti.» E senta-se.'));
 const tier=s>=8?t('天黑时，主街上挤了两千人，牛仔和亚速尔老太太手拉手跳舞。你分不清哪样是里斯本，哪样是德州。','By dark two thousand people pack Main Street; cowboys and Azorean grandmothers dance hand in hand. You can\'t tell which part is Lisbon and which is Texas.','Ao anoitecer há duas mil pessoas na rua principal; cowboys e avós açorianas dançam de mãos dadas. Já não sabes o que é Lisboa e o que é Texas.')
  :ok?t('来的人比你想的多，沙丁鱼五点就卖光了。阿尔贝蒂娜说，这是 1979 年以来最好的一次。','More people come than you expected; the sardines sell out by five. Albertina says it\'s the best since 1979.','Vem mais gente do que esperavas; as sardinhas esgotam às cinco. A Albertina diz que é a melhor desde 1979.')
  :s>=3?t('来了几百人，大多是熟面孔。游行走到一半就散了。不算失败，只是不像你梦里的那样。','A few hundred people come, mostly familiar faces. The parade falls apart halfway. Not a failure. Just not the one you dreamed.','Vêm umas centenas de pessoas, quase todas conhecidas. O desfile desfaz-se a meio. Não é um fracasso. Só não é o que sonhaste.')
  :t('来的人不到一百。老太太们把罗勒递给路人，有人收，有人摆手。天黑前你就浇灭了炭火。','Fewer than a hundred come. The ladies offer basil to passers-by; some take it, some wave it off. You douse the coals before dark.','Vêm menos de cem pessoas. As senhoras oferecem manjericos a quem passa; uns aceitam, outros não. Apagas as brasas antes de anoitecer.');
 const give=[];
 if(S.settled&&NPCS[S.settled])give.push({t:t('把你的罗勒送给','Give your basil pot to ','Dar o teu manjerico a ')+NM(S.settled),fx:()=>{addLike(S.settled,1);S.flags.c4_basil='settled'},next:c4_end});
 give.push({t:t('把你的罗勒送给阿尔贝蒂娜太太','Give your basil pot to Dona Albertina','Dar o teu manjerico à Dona Albertina'),fx:()=>{addLike('albertina',2);S.flags.c4_basil='albertina'},next:c4_end},
  {t:t('把你的罗勒种在店后的空地上','Plant your basil on the lot behind the shop','Plantar o teu manjerico no terreno atrás do restaurante'),fx:()=>{stat('saud',-5);stat('tex',3);S.flags.c4_basil='lot'},next:c4_end});
 if(S.flags.c4_rui)give.push({t:t('让鲁伊把你的罗勒带回给妈妈','Have Rui carry your basil home to Mom','Pedir ao Rui que leve o manjerico à mãe'),fx:()=>{stat('saud',-3);S.flags.c4_basil='mother'},next:c4_end});
 return {title:t('圣安东尼节','The Santo António festival','A festa de Santo António'),meta:t(`第四章 · 章末 · 节日 ${s}/10`,`Chapter 4 · Finale · Festival ${s}/10`,`Capítulo 4 · Final · Festa ${s}/10`),text:[
  t('早上六点，你点燃第一堆炭。九位老太太穿着压箱底的黑裙子坐在空地边，膝上各放一盆罗勒。','At six a.m. you light the first coals. Nine old ladies in their best black dresses sit at the edge of the lot, a basil pot on every lap.','Às seis da manhã acendes as primeiras brasas. Nove senhoras de vestido preto de cerimónia sentam-se à beira do terreno, cada uma com um manjerico no colo.'),
  ...lines,tier,
  t('半夜人散了。你手里还剩最后一盆罗勒，和昨晚写的四行诗。','At midnight the crowd thins. You\'re left with one last basil pot and the four lines you wrote last night.','À meia-noite a multidão dispersa. Ficas com um último manjerico e a quadra de ontem à noite.')],choices:give};
}}
);

/* ---------- extra ending paragraphs ---------- */
ENDING_EXTRA=(choice)=>{
 const f=S.flags,out=[],path=f.travisDeal||'council',blocked=f.c4_vote==='blocked';
 if(path==='deal')out.push(blocked?t('特拉维斯的交易没成。合同的碎片，阿尔贝蒂娜夹进了她的圣经。','Travis\'s deal never happened. Albertina keeps the shreds of the contract in her Bible.','O negócio do Travis nunca se fez. A Albertina guarda os bocados do contrato na Bíblia.'):t('匝道修好了，砂车日夜从店后开过。废水清理了，报告却永远没有公开。每次卡车经过，你的咖啡杯都会轻轻一震。','The ramp got built; sand trucks roll past the shop day and night. The water was cleaned, but the report never came out. Every time a truck passes, your coffee cup trembles.','A rampa foi construída; os camiões passam atrás do restaurante dia e noite. A água foi limpa, mas o relatório nunca saiu. Sempre que passa um camião, a tua chávena treme.'));
 else if(blocked)out.push(path==='expose'?t('科琳的报道拿了州新闻奖，她把奖牌挂在祖父脖子上。罐头厂的地上后来长满了野花。','Colleen\'s story won a state press award; she hung the medal on her grandfather. Wildflowers later took over the cannery ground.','A reportagem da Colleen ganhou um prémio do estado; ela pendurou a medalha ao avô. Mais tarde, o terreno da fábrica encheu-se de flores bravas.'):t('州里的清理队在罐头厂干了一个夏天。会议记录里，若泽的名字后面多了一行字：“他是对的。”','The state cleanup crew worked the cannery all summer. In the minutes, a line was added after José\'s name: "He was right."','A equipa do estado limpou a fábrica o verão inteiro. Na ata, acrescentaram uma linha a seguir ao nome do José: «Ele tinha razão.»'));
 else out.push(t('改划通过了，可环境评估拖了两年，砂车始终没开进来。输掉投票，也能赢回时间。','The rezoning passed, but the review dragged on two years and the sand trucks never came. Losing a vote can still win you time.','A requalificação passou, mas a avaliação arrastou-se dois anos e os camiões nunca vieram. Perder uma votação também pode dar-nos tempo.'));
 if(f.festival)out.push(choice==='stay'?t('第二年蓝帽子花开时，节日又办了一次。这一次不用你打电话，所有人都来了。','The next year, when the bluebonnets bloomed, the festival came round again. This time you didn\'t have to call anyone. Everyone came.','No ano seguinte, quando as flores azuis abriram, houve outra festa. Desta vez não precisaste de telefonar a ninguém. Veio toda a gente.'):choice==='home'?t('第二年，阿尔贝蒂娜寄来一张照片：主街挂满纸花，牛仔举着罗勒。你把它贴在妈妈家的冰箱上。','The next year Albertina mailed a photo: Main Street strung with paper flowers, cowboys holding basil. You stuck it on your mother\'s fridge.','No ano seguinte a Albertina mandou uma fotografia: a rua principal cheia de flores de papel, cowboys de manjerico na mão. Colaste-a no frigorífico da tua mãe.'):t('第二年春天，你从奥斯汀开车回来过节。阿尔贝蒂娜说你胖了，又塞给你一盆罗勒。','The next spring you drove back from Austin for the festival. Albertina said you\'d put on weight and pressed another basil pot into your hands.','Na primavera seguinte voltaste de Austin para a festa. A Albertina disse que estavas mais gordo e meteu-te outro manjerico nas mãos.'));
 else out.push(t('那之后，老太太们每年还在教堂地下室种罗勒，有人路过就送一盆。','After that, the old ladies still sow basil in the church basement every year and give a pot to whoever passes.','Depois disso, as senhoras continuaram a semear manjericos na cave da igreja e dão um a quem passa.'));
 if(f.c4_toldMother||f.c4_readMother)out.push(choice==='home'?t('回里斯本的第一晚，妈妈让你把若泽的故事从头讲一遍。讲到沉船那夜，她握住了你的手。','Your first night back in Lisbon, your mother asks for José\'s story from the beginning. At the night of the shipwreck, she takes your hand.','Na primeira noite em Lisboa, a tua mãe pede a história do José desde o início. Na noite do naufrágio, pega-te na mão.'):t('那年夏天，妈妈飞了十一个小时来看你。她在空地上站了很久：“他在这儿也种了罗勒。”','That summer your mother flew eleven hours to see you. She stood on the lot a long time. "He grew basil here too."','Nesse verão a tua mãe voou onze horas para te ver. Ficou muito tempo no terreno. «Ele também cá plantou manjerico.»'));
 return out.slice(0,4);
};
