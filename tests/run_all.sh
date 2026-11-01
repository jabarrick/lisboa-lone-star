#!/usr/bin/env bash
# Build, validate and run every bot and browser test; prints one PASS/FAIL line per test.
# Usage: bash tests/run_all.sh        (add "quick" to skip the slow simulation bots)
cd "$(dirname "$0")/.." || exit 1
python3 build.py >/dev/null || { echo "FAIL build"; exit 1; }
fail=0
run(){ # name, command, regex that must appear in the output, regex that must not
  local out; out=$(timeout 600 bash -c "$2" 2>&1); local rc=$?
  if [ $rc -eq 0 ] && grep -qE "$3" <<<"$out" && ! grep -qE "${4:-^\$NEVER\$}" <<<"$out"; then echo "PASS $1"
  else echo "FAIL $1"; tail -5 <<<"$out" | sed 's/^/     /'; fail=1; fi; }
run validate   "node validate.js story/*.js"   "NO PROBLEMS FOUND"
run roadcheck  "node tests/roadcheck.js"        "ROADS OK"
run p3         "node tests/p3_test.js"          "P3 OK"
run cars      "node tests/v1_cars_test.js"     "CARS OK"
run tx7        "node tests/tx7_test.js"         "witness"
for t in ui_wiki ui_mappage; do run $t "node tests/$t.js" "phone errors \[\]" "errors \[[^]]"; done
for t in ui_phone ui_test ui_map ui_map2 ui_inn ui_travel ui_road ui_routes; do run $t "node tests/$t.js" "errors:? ?(none|\[\])" "TimeoutError"; done
run ui_overflow "node tests/ui_overflow.js" "LAYOUT OK"
run ui_shots   "node tests/ui_shots.js shop,biz,map,people,ach,log,wiki" "" "Error"
if [ "$1" != quick ]; then
  run econ_bot    "node tests/econ_bot.js shop"   "endings"
  run romance_bot "node tests/romance_bot.js"     "crashes 0"
  run family_bot  "node tests/family_bot.js"      "crashes 0"
fi
[ $fail -eq 0 ] && echo "ALL PASS" || { echo "SOME FAILED"; exit 1; }
