# 里斯本·孤星 · LISBOA, LONE STAR

一款中 / 英 / 葡三语的叙事经营游戏。来自里斯本阿尔法马的年轻人蒂亚戈继承了舅舅若泽在德州小镇圣鲁伊斯（35 号州际公路上，奥斯汀与韦科之间）的葡萄牙烧烤店，要撑满 48 周。

A trilingual (Chinese / English / Portuguese) narrative management sim: Tiago, from Alfama, inherits his uncle José's Portuguese grill in a fictional Texas town on I-35 and has to keep it open for 48 weeks.

## 玩 / Play

打开 `lisboa/index.html` 即可（单文件，无需服务器）。开启 GitHub Pages 后，根目录 `index.html` 会跳转到游戏。

## 内容概览

- 店铺经营：逐桌模拟、定价、招牌菜、市场、外烩订单、升级、卫生检查、员工（最多 5 人）、长期订货
- 四项属性（魅力、手艺、德州味、乡愁），口音强弱与肌肉系统
- 16 条恋爱线、结婚生子留美的第五、六章
- 镇上的邻居：亚速尔裔老人、退伍军人、五金店老板，以及墨西哥裔面包房老板娘、特哈诺手风琴老人、哈利斯科来的神父、护理系女孩、澳门裔中餐馆老板娘和她在奥斯汀的儿子
- 更多德州人：镇上的修车铺老板、县书记员、流浪乐队老师、卷饼车妈妈、急救员、房产经纪人；各城市的流浪乐队小提琴手、靴匠、州议会环境律师、捕虾船长、报关行老板、航道焊工；农业推广专家、埃尔帕索华工后代李秀英、草原长大的兽医高明远、沃斯堡追风暴的气象员马天宇；非裔卫理公会牧师（六月十九日解放日）、自由人定居点后代县专员、黑人牛仔、县卫生检查员；韦科的藏族一家（藏历新年）
- 30 座真实德州城市、真实公路网、旅店与公路旅行
- 车辆：辅路二手车场 16 辆具体的二手车（品牌车型、年份、里程，每周轮换 6 辆），油耗、每周保险保养、抛锚、里程表与折价、餐车出摊
- 插图：全部菜品和车辆（`story/v2_art.js`，总览 `docs/art_preview.png`），以及全部 85 位人物的肖像（`story/v3_faces.js`，总览 `docs/portraits_preview.png`）
- 百科与调试模式（百科页底部开启）

## 项目结构

| 路径 | 内容 |
| --- | --- |
| `lisboa/template.html` | 引擎（全部界面、系统与 CSS），剧情数据插入点 `/*STORY-DATA*/` |
| `story/*.js` | 剧情、城市、人物数据（按文件名排序拼接） |
| `lisboa/index.html` | 构建产物：可直接游玩的单文件 |
| `build.py` | 把 `story/*.js` 注入模板，生成 `lisboa/index.html` 和 `check.js` |
| `validate.js` | 语法、三语完整性、中文里的拉丁字母、场景遍历、随机通关检查 |
| `tests/` | 经济/恋爱/家庭模拟机器人与 Playwright 界面测试 |
| `docs/` | 剧情圣经与各轮写作规范 |

## 开发

```bash
python3 build.py                 # 构建
node validate.js story/*.js      # 校验，应输出 NO PROBLEMS FOUND
node tests/econ_bot.js           # 经济平衡模拟（需先构建）
node tests/ui_wiki.js            # 浏览器测试（需要 Playwright）
```
