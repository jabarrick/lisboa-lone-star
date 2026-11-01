# 德州地图扩展规格（写手必读）

先读 `/home/claude/lisboa-game/STORY_BIBLE.md`（人物中文名、三语规范、代码接口、自检方法照旧有效）。
引擎：`/home/claude/lisboa-game/lisboa/template.html`。在 `<script>` 里搜索 `v0.5 travel`（旅行系统）、`v0.4 systems`（市场、订单、小游戏、`grillScene`）、`const DISH=`、`const NPCS=`。所有工作都在 `/home/claude/lisboa-game/` 下进行，**不要用 /tmp 下的任何目录**。

## 1. 目标

用户的要求：“德州不可能只有一座城市，请使用真实地名，设计多所城市和多个地点，并据此扩展游戏内容。”

- 家乡**圣鲁伊斯**仍是虚构小镇（剧情里有污染的罐头厂和反派商人，不适合套在真实小镇上），但它被放进真实地图：35 号州际公路上，大约在奥斯汀以北 55 英里、韦科以南 45 英里（萨拉多附近）。
- 地图上的其他城市和地点**全部用真实地名**和真实、广为人知、长期不变的地标（公园、广场、大学校园、历史街区、公共景点、自然区）。
- **真实私人商家**（具体餐馆、商店、品牌）不要点名；用描述代替（“清晨六点就排起长队的烧烤老店”“西镇那家捷克面包店”）。不要编造关于真实人物的事。不要写具体门票价格、营业时间、演出日期这类会变的细节。

## 2. 游戏日历（用于季节性内容）

48 周 = 一年。夏 1–12 周、秋 13–24、冬 25–36、春 37–48。已有剧情锚点：第 12 周七月四日集市、18 周万圣节、22 周感恩节、28 周圣诞、29–30 周冰暴、48 周圣安东尼节。

真实季节活动请映射到这些周数（用 `inSeason(a,b)` 判断）：桃子季（弗雷德里克斯堡）1–10 周；德州博览会（达拉斯公园博览会）14–17 周；香肠节（新布朗费尔斯）19–21 周；休斯敦牲畜展暨牛仔竞技 38–41 周；矢车菊（蓝帽花）盛开 38–44 周；圣安东尼奥嘉年华 43–45 周。季节外可以给“不在季节”的提示（`req` 返回说明字符串）。

## 3. 城市清单与分工

| 写手 | 城市（id） | 英里 | 行程 |
| --- | --- | --- | --- |
| W1 中部与山地 | 奥斯汀 `austin` | 55 | day |
| | 洛克哈特 `lockhart`（“德州烧烤之都”） | 85 | day |
| | 新布朗费尔斯与格鲁恩 `gruene` | 105 | day |
| | 弗雷德里克斯堡 `fredericksburg` | 120 | day |
| | 圣安东尼奥 `sanantonio` | 130 | day |
| W2 北部与海岸 | 韦科 `waco`（可顺路写捷克小镇西镇 West） | 45 | day |
| | 达拉斯 `dallas` | 140 | overnight，住宿 110 |
| | 沃思堡 `fortworth` | 145 | overnight，住宿 100 |
| | 休斯敦 `houston` | 180 | overnight，住宿 110 |
| | 加尔维斯顿 `galveston` | 230 | overnight，住宿 120 |
| W3 西部、家乡与路上 | 马尔法 `marfa` | 430 | overnight，住宿 140 |
| | 家乡新地点 `EXTRA_LOCS`（4–5 处） | — | — |
| | 路上随机事件 `ROAD_EVENTS`（8–10 个） | — | — |

## 4. 每座城市要写什么

每座城市 3–4 个地点（loc），每个地点 2–3 个行动（act），每个行动的 `run()` 返回一个场景（大多数有 2–4 个选择）。内容要混合：

1. **观光与感受**：真实地标的画面、德州味/乡愁变化（比如加尔维斯顿的海让他想起特茹河口，乡愁升；在沃思堡牲畜场看赶牛，德州味升）。
2. **经营机会**（这是重点，每座城至少 2 个）：
   - 批发/特价采购：`cityBuy(ing, 数量, 价格倍数)`，返回花费（钱不够返回 0）。食材 id：`beef pork fish dairy imp`。例：休斯敦港边的葡语杂货店，进口货 0.6 倍价当场拿货；加尔维斯顿码头鲜鱼便宜。
   - 快闪摊/集市：`popupSell(最多份数, 价格倍数)`，从库存卖出，返回 `{sold, cash}`，并加线上评分。例：奥斯汀农夫集市、圣安东尼奥嘉年华。
   - 比赛：`cityGrill(q=>场景)` 启动烤架小游戏，结束后用火候 q（0.7–1.3）决定名次和奖金。例：洛克哈特烧烤大赛、沃思堡牛仔竞技场外的烧烤摊比拼。
   - 学新菜：先在 `story/<你的文件>.js` 里定义 `Object.assign(DISH,{kolache:{n:['捷克果馅包','Kolache','Kolache'],ing:'dairy',price:4,unlock:true,pref:{trucker:3,family:2,student:2}}})`（`unlock:true` 表示要学会才出现在菜单里；`ing` 只能用上面五种；`pref` 的客群 id：`luso trucker ranch oil family student`，0–3 分），然后在某个行动里调用 `learnDish('kolache')`。每位写手学 1–2 道真实的当地菜。
   - 招人/拉生意：在城里结识的人可以带来外烩订单或口碑（直接改 `S.cash`、`S.rep`、`S.online`）。
3. **和人物线交叉**：已认识的人可以在相应城市出现（用 `rel(id).met` 判断），例如玛雅与奥斯汀、格蕾丝与韦科、布鲁克与沃思堡牛仔竞技、凯尔与格鲁恩老舞厅、德尔菲娜与奥斯汀美食圈、伊内丝与休斯敦机场。如果玩家带了同伴（`S.tripWith` 是人物 id 或 null），至少给每座城市写一个用到 `S.tripWith`（`SH(S.tripWith)`）的分支。
4. **一次性内容**用 `S.flags.<前缀>_xxx` 记录，`req` 返回说明字符串（例如“今天已经去过了”“只在第 38–41 周”）。可重复的内容要有随机变化（`pick([...])`）。

## 5. 代码格式

只写一个文件：W1 `story/tx1.js`，W2 `story/tx2.js`，W3 `story/tx3.js`。可用一个 IIFE 包住私有辅助函数，私有名字加前缀（`tx1_`、`tx2_`、`tx3_`）。

```js
Object.assign(CITIES,{
 austin:{
  n:t('奥斯汀','Austin','Austin'), region:'central', miles:55, trip:'day',
  desc:t('一句话简介','One-line description','Descrição numa frase'),
  arrive:()=>[ t(...) ],            // 可选：抵达时的额外段落（可按季节/去过几次变化），返回数组
  locs:[
   {id:'capitol', n:t('州议会大厦','Texas State Capitol','Capitólio do Texas'), acts:[
     {id:'tour', n:t('参观','Take the tour','Fazer a visita'), cost:2, req:()=>true, tip:t(...), run:()=>({title,meta,text:[...],choices:[...]})},
   ]},
  ]
 }
});
```
- `region` 用 `central | north | coast | hill | west`。
- `cost` 是精力（1–4）。城里的行动和在家一样，每次占一个时段。
- 场景格式、`say()`、`stat()`、`addLike()`、`addTrust()`、`rel()`、`S.*`、`NEED()`、`MONEY(n)`、`CHARM_REQ(n)`、`log()` 等都和 STORY_BIBLE 第 7 节一样。
- 家乡新地点（W3）：`EXTRA_LOCS.push({id:'feedstore', n:t(...), open:()=>true, acts:[...]})`，行动格式同上。家乡地点可以用 `meetScene(id)`、和已有人物互动。
- 路上事件（W3）：`ROAD_EVENTS.push({id:'tx3_flat', cond:c=>c.miles>100, run:c=>场景})`，`c` 是要去的城市对象（`c.n` 城市名，`c.miles`）。

## 6. 体量与质量

- 每位写手约 5,500–6,500 个汉字（三语全写）。
- 中文里不能有拉丁字母（地名全用中文译名：奥斯汀、韦科、洛克哈特、新布朗费尔斯、格鲁恩、弗雷德里克斯堡、圣安东尼奥、达拉斯、沃思堡、休斯敦、加尔维斯顿、马尔法、萨拉多、西镇；州际公路写“35 号州际公路”）。英文和葡语用原名（I-35 可以）。
- 写出真实感：每个地点至少一个只有那里才有的具体细节（不会变的地理、历史、风物）。

## 7. 自检

```
cd /home/claude/lisboa-game && node validate.js story/*.js
```
会检查每座城市的字段、每个行动能否跑通、三语齐全、中文无拉丁字母、随机整年试玩（会随机出门）是否崩溃，并打印城市/地点/行动数量。改到 NO PROBLEMS FOUND。不要修改 template.html、validate.js、build.py 或别人的文件。
