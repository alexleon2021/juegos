const KEY="desafio-enf-digital-v1", MAXT=25;
let state={n:4,names:[],scores:[],used:{},finalUsed:{},mode:"r1"};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null"); if(s&&s.scores) state=Object.assign(state,s);}catch(e){}
(function normalize(){
  for(let i=0;i<MAXT;i++){ if(!state.names[i]) state.names[i]="Equipo "+(i+1); if(typeof state.scores[i]!=="number") state.scores[i]=0; }
  if(typeof state.finalUsed!=="object"||state.finalUsed===null) state.finalUsed={r1:!!state.finalUsed};
  const u={}; for(const k in state.used){ u[k.includes(":")?k:"r1:"+k]=state.used[k]; } state.used=u;
  state.n=Math.min(MAXT,Math.max(2,parseInt(state.n)||4));
})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}

const $=id=>document.getElementById(id);
function el(tag,attrs,txt){const e=document.createElement(tag);if(attrs)for(const k in attrs)e.setAttribute(k,attrs[k]);if(txt!=null)e.textContent=txt;return e;}

const BOARDS={r1:{cats:CATS,final:FINAL},r2:{cats:CATS2,final:FINAL2}};

/* ---------- modos: Ronda 1, Ronda 2, Retos ---------- */
const MODES=["r1","r2","retos"];
function setMode(m){
  if(!MODES.includes(m)) m="r1";
  state.mode=m; save();
  MODES.forEach(x=>{ $("mode-"+x).hidden=x!==m; $("mtab-"+x).setAttribute("aria-selected",x===m); });
}
MODES.forEach(x=>$("mtab-"+x).addEventListener("click",()=>setMode(x)));

/* ---------- tableros ---------- */
function renderBoards(){
  for(const bid in BOARDS){
    const B=BOARDS[bid], b=$("board-"+bid); b.innerHTML="";
    B.cats.forEach(c=>b.appendChild(el("div",{class:"cat"},c.name)));
    VALUES.forEach((v,vi)=>{
      B.cats.forEach((c,ci)=>{
        const t=el("button",{class:"tile",type:"button","aria-label":c.name+" por "+v+" puntos"},String(v));
        if(state.used[bid+":"+ci+"-"+vi]) t.disabled=true;
        t.addEventListener("click",()=>openQ(bid,ci,vi));
        b.appendChild(t);
      });
    });
    $("final-"+bid).disabled=!!state.finalUsed[bid];
  }
}

/* ---------- equipos y marcador ---------- */
function teamsChanged(){document.dispatchEvent(new Event("equipos"));}
function renderScores(){
  const s=$("scores"); s.innerHTML=""; s.classList.toggle("many",state.n>8);
  const max=Math.max(...state.scores.slice(0,state.n));
  for(let i=0;i<state.n;i++){
    const d=el("div",{class:"team"+(max>0&&state.scores[i]===max?" lead":"")});
    const inp=el("input",{id:"team-name-"+i,"aria-label":"Nombre del equipo "+(i+1)}); inp.value=state.names[i];
    inp.addEventListener("input",()=>{state.names[i]=inp.value||("Equipo "+(i+1));save();teamsChanged();});
    const p=el("div",{class:"pts"},String(state.scores[i]));
    const adj=el("div",{class:"adj"});
    [-50,50].forEach(d2=>{const bt=el("button",{type:"button","aria-label":(d2>0?"Sumar":"Restar")+" 50 a "+state.names[i]},(d2>0?"+":"−")+"50");bt.addEventListener("click",()=>{state.scores[i]+=d2;save();renderScores();});adj.appendChild(bt);});
    d.append(inp,p,adj); s.appendChild(d);
  }
  teamsChanged();
}
// Usado por retos.js para leer equipos y sumar puntos.
window.Equipos={
  names:()=>state.names.slice(0,state.n),
  add:(i,p)=>{ if(i<0||i>=state.n) return; state.scores[i]+=p; save(); renderScores(); }
};

/* ---------- pregunta abierta ---------- */
let cur=null, tick=null, left=30;
function stopTimer(){if(tick){clearInterval(tick);tick=null;}}
function setTimer(sec){stopTimer();left=sec;$("timer").textContent=left;$("timer").classList.remove("low");$("timerBtn").textContent="Iniciar tiempo";}
$("timerBtn").addEventListener("click",()=>{
  if(tick){stopTimer();$("timerBtn").textContent="Reanudar tiempo";return;}
  $("timerBtn").textContent="Pausar tiempo";
  tick=setInterval(()=>{left=Math.max(0,left-1);$("timer").textContent=left;$("timer").classList.toggle("low",left<=10);if(left===0){stopTimer();$("timerBtn").textContent="Tiempo agotado";}},1000);
});

function fillExtra(q){
  const ex=$("qExtra"); ex.innerHTML="";
  if(q.ctx) ex.appendChild(el("p",{class:"ctx"},q.ctx));
  if(q.list){const ol=el("ol",{class:"sub"});q.list.forEach(x=>ol.appendChild(el("li",null,x)));ex.appendChild(ol);}
  if(q.opts){const ul=el("ul",{class:"opts"});q.opts.forEach((o,i)=>{const li=el("li",null,String.fromCharCode(65+i)+") "+o);li.dataset.i=i;ul.appendChild(li);});ex.appendChild(ul);}
  if(q.table){const t=el("table",{class:"mini"});q.table.forEach(r=>{const tr=el("tr");tr.append(el("th",null,r[0]),el("td",null,r[1]));t.appendChild(tr);});const w=el("div",{style:"overflow-x:auto"});w.appendChild(t);ex.appendChild(w);}
}
function openQ(bid,ci,vi){
  const c=BOARDS[bid].cats[ci], q=c.qs[vi], v=VALUES[vi];
  cur={bid,ci,vi,v,q,final:false};
  $("qTag").textContent=(bid==="r2"?"Ronda 2 · ":"")+c.name+" · "+v+" puntos";
  $("qText").textContent=q.q;
  fillExtra(q);
  $("answer").hidden=true; $("awardBox").hidden=true; setTimer(q.list?90:30); show();
}
function openFinal(bid){
  const F=BOARDS[bid].final;
  cur={bid,final:true,v:500,q:F};
  $("qTag").textContent=(bid==="r2"?"Ronda 2 · ":"")+"Pregunta final · hasta 500 puntos";
  $("qText").textContent=F.q;
  fillExtra(F);
  $("answer").hidden=true; $("awardBox").hidden=true; setTimer(60); show();
}
function show(){ $("overlay").hidden=false; $("showBtn").focus(); }
$("showBtn").addEventListener("click",()=>{
  if(!cur) return; stopTimer();
  const a=$("answer"); a.innerHTML=""; a.appendChild(el("h3",null,"Respuesta"));
  cur.q.a.split("\n").forEach(t=>a.appendChild(el("p",null,t)));
  a.hidden=false;
  if(cur.q.opts) document.querySelectorAll(".opts li").forEach(li=>{if(+li.dataset.i===cur.q.right) li.classList.add("right");});
  buildAward();
});
function buildAward(){
  const box=$("awardBox"); box.innerHTML="";
  const full=cur.v, half=cur.v/2;
  if(cur.final){
    const g=el("div",{class:"final-award"});
    for(let i=0;i<state.n;i++){
      const r=el("div",{class:"row"}); r.appendChild(el("span",{class:"lbl"},state.names[i]+":"));
      [500,300,100].forEach(p=>{const b=el("button",{type:"button",class:"award"},"+"+p);b.addEventListener("click",()=>{state.scores[i]+=p;b.disabled=true;save();renderScores();});r.appendChild(b);});
      g.appendChild(r);
    }
    box.appendChild(g);
  }else{
    const r1=el("div",{class:"row"}); r1.appendChild(el("span",{class:"lbl"},"Acierto (+"+full+"):"));
    const r2=el("div",{class:"row"}); r2.appendChild(el("span",{class:"lbl"},"Rebote (+"+half+"):"));
    for(let i=0;i<state.n;i++){
      [[r1,full],[r2,half]].forEach(([row,p])=>{const b=el("button",{type:"button",class:"award"},state.names[i]);b.addEventListener("click",()=>{state.scores[i]+=p;save();renderScores();b.disabled=true;});row.appendChild(b);});
    }
    box.append(r1,r2);
  }
  box.hidden=false;
}
function closeQ(){
  stopTimer();
  if(cur){ if(cur.final) state.finalUsed[cur.bid]=true; else state.used[cur.bid+":"+cur.ci+"-"+cur.vi]=true; save(); }
  cur=null; $("overlay").hidden=true; renderBoards();
}
$("closeBtn").addEventListener("click",closeQ);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("overlay").hidden) closeQ();});
for(const bid in BOARDS) $("final-"+bid).addEventListener("click",()=>openFinal(bid));

/* ---------- controles generales ---------- */
const sel=$("nteams");
for(let i=2;i<=MAXT;i++){ const o=el("option",{value:String(i)},String(i)); sel.appendChild(o); }
sel.value=String(state.n);
sel.addEventListener("change",e=>{state.n=+e.target.value;save();renderScores();});
$("resetBtn").addEventListener("click",()=>{$("confirmReset").hidden=false;});
$("resetNo").addEventListener("click",()=>{$("confirmReset").hidden=true;});
$("resetYes").addEventListener("click",()=>{state.scores=state.scores.map(()=>0);state.used={};state.finalUsed={};save();$("confirmReset").hidden=true;renderBoards();renderScores();});

renderBoards(); renderScores(); setMode(state.mode);
