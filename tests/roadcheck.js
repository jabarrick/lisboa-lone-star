// connectivity: every road must touch another road at a shared point; every city within ~0.25° of a road it uses
const fs=require('fs');const src=fs.readFileSync('check.js','utf8');
const R=eval(src.match(/const ROADS=(\{[\s\S]*?\n\});/)[1].replace(/^/,'('))+'';
