// =============================================================
// PÁGINA PARA LOS ESTUDIANTES (sopa.html y crucigrama.html)
// Cada grupo resuelve la actividad en su celular o computadora.
// Al terminar recibe un código para pegar en el chat de Meet.
// =============================================================
(function(){
"use strict";
const ACT=document.body.dataset.act;            // "sopa" o "cruci"
const PREF=ACT==="sopa"?"SOPA":"CRUCI";
const A=window.ACTIVIDADES[ACT];
const $=id=>document.getElementById(id);
const fmt=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");

let t0=0,tick=null,done=false;

$("startBtn").addEventListener("click",()=>{
  const name=$("groupName").value.trim();
  if(!name){$("nameErr").hidden=false;$("groupName").focus();return;}
  $("nameErr").hidden=true;
  $("intro").hidden=true;$("play").hidden=false;
  $("who").textContent=name;
  A.render($("box"),[],{student:true,seed:20261107,onChange:(n,total)=>{
    $("count").textContent=n+" de "+total;
    $("bar").style.width=(100*n/total)+"%";
    if(n===total&&!done)finish(name);
  }});
  $("count").textContent="0 de "+(ACT==="sopa"?12:10);
  t0=Date.now();
  tick=setInterval(()=>{$("clock").textContent=fmt(Math.floor((Date.now()-t0)/1000));},1000);
  window.scrollTo(0,0);
});
$("groupName").addEventListener("keydown",e=>{if(e.key==="Enter")$("startBtn").click();});

function finish(name){
  done=true;clearInterval(tick);
  const time=fmt(Math.floor((Date.now()-t0)/1000));
  $("clock").textContent=time;
  const code=window.CODIGOS.make(PREF,name,time);
  $("code").textContent=code;
  $("done").hidden=false;
  $("box").classList.add("locked");
  $("done").scrollIntoView({behavior:"smooth",block:"center"});
}
$("copyBtn").addEventListener("click",()=>{
  const txt=$("code").textContent;
  const ok=()=>{$("copyBtn").textContent="Copiado ✓";};
  const fallback=()=>{const r=document.createRange();r.selectNodeContents($("code"));const s=getSelection();s.removeAllRanges();s.addRange(r);$("copyBtn").textContent="Selecciónelo y cópielo";};
  try{navigator.clipboard.writeText(txt).then(ok,fallback);}catch(e){fallback();}
});
})();
