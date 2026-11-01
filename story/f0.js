// family arc — fixed facts every family writer relies on (do not edit)
// citizen: partner is a US citizen (marriage-based green card path); carry: partner can carry a pregnancy
(function(){
 const F={lucia:1,jolene:1,savannah:1,clara:1,hannah:1,brooke:1,megan:1,colleen:1,ashley:1,ines:1,roz:1,delphine:1,grace:1,maya:1,wade:0,kyle:0};
 Object.keys(F).forEach(id=>{PARTNER[id]={citizen:id!=='ines',carry:!!F[id]}});
})();
