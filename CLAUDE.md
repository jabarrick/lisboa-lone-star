# CLAUDE.md — 里斯本·孤星 / Lisboa, Lone Star

Single-file browser game. The user (Yu) writes in Chinese; answer in Chinese.

## Build & check (always, after every change)
- `python3 build.py` → writes `lisboa/index.html` (the playable game) and `check.js` (extracted script, used by bots).
- `node validate.js story/*.js` must print `NO PROBLEMS FOUND`. "never fired" lines for rare romance/family events are normal.
- UI: `node tests/ui_wiki.js`, `node tests/ui_mappage.js`, `node tests/ui_shots.js shop,biz,map,people,ach,log,wiki` (screenshots in /tmp; desktop 1280×900 and phone 390×844). Playwright + Chromium are preinstalled — do not reinstall.
- Commit both `lisboa/template.html` and the rebuilt `lisboa/index.html`.

## Architecture
- Engine: `lisboa/template.html` (CSS, systems, UI). Story data from `story/*.js` is concatenated (sorted) at `/*STORY-DATA*/`.
- i18n: every player-visible string is `t(zh,en,pt)` (or `tt([zh,en,pt])`), which returns a token resolved by `res()` at render. Chinese text must contain no Latin letters (validator enforces; write highways as “35 号州际公路”). English/Portuguese must contain no CJK.
- Registries story files extend: `STORY` events `{id, when:()=>bool, run:()=>scene}`, `NPCS`, `CITIES`, `EXTRA_LOCS`, `ROAD_EVENTS`, `ROMX`, `PARTNER`, `CH5`, `DISH` (+`learnDish`), `grantPerk(ing,mult,[zh,en,pt])`.
- Scene: `{title, meta, text:[...], choices:[{t, req:()=>true|reasonString, fx, next:()=>scene}]}`. Helpers: `say`, `stat`, `addLike`, `addTrust`, `rel`, `charm`, `NEED`, `MONEY`, `log(zh,en,pt)`.
- State `S` (saved in localStorage). Time: 3 slots/day, 7 days, 48 weeks; week 49 = one-year ending.
- Map: `TX_PT` coordinates, `ROADS` polylines (real highways, shared junction points), city `via` routes in `story/tx99_via.js`.
- Staff: `STAFF` + `STAFF_MAX` (5). Wiki/debug: `wikiPanel`, `debugPanel`, `CHEATS`, debug flag in localStorage `lisboa-lone-star-debug`.
- Layout: desktop two columns (scene+map | fixed-height panel with `.pscroll`, `panelFill()` fills leftover space) + action board in masonry columns. Phone (≤760px): one view at a time (`mview`: story/act/map/panel) with bottom tab bar `.mnav`. The user wants compact layouts with no blank areas.

## Content rules
- Real Texas place names and long-standing facts; no real private businesses named; no specific prices/opening hours of real venues.
- Roads must follow the real highway network; no invented roads.
