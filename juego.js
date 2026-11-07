const KEY="desafio-enf-digital-v1", MAXT=25, LAYOUT=3;
let state={n:4,names:[],scores:[],used:{},finalUsed:false,layout:LAYOUT};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null"); if(s&&s.scores) state=Object.assign(state,s);}catch(e){}
(function normalize(){
  for(let i=0;i<MAXT;i++){ if(!state.names[i]) state.names[i]="Equipo "+(i+1); if(typeof state.scores[i]!=="number") state.scores[i]=0; }
  // El tablero cambió de forma: las casillas usadas de versiones anteriores ya no corresponden.
  if(state.layout!==LAYOUT){ state.used={}; state.finalUsed=false; state.layout=LAYOUT; }
  state.finalUsed=!!state.finalUsed;
  state.n=Math.min(MAXT,Math.max(2,parseInt(state.n)||4));
})();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}

const $=id=>document.getElementById(id);
function el(tag,attrs,txt){const e=document.createElement(tag);if(attrs)for(const k in attrs)e.setAttribute(k,attrs[k]);if(txt!=null)e.textContent=txt;return e;}

/* ---------- tablero ---------- */
function renderBoard(){
  const b=$("board"); b.innerHTML="";
  CATS.forEach(c=>b.appendChild(el("div",{class:"cat"},c.name)));
  VALUES.forEach((v,vi)=>{
    CATS.forEach((c,ci)=>{
      const k=ci+"-"+vi;
      const t=el("button",{class:"tile",type:"button","aria-label":c.name+" por "+v+" puntos"},String(v));
      if(state.used[k]) t.disabled=true;
      t.addEventListener("click",()=>openQ(ci,vi));
      b.appendChild(t);
    });
  });
  $("finalBtn").disabled=state.finalUsed;
}

/* ---------- equipos y marcador ---------- */
function renderScores(){
  const s=$("scores"); s.innerHTML=""; s.classList.toggle("many",state.n>8);
  const max=Math.max(...state.scores.slice(0,state.n));
  for(let i=0;i<state.n;i++){
    const d=el("div",{class:"team"+(max>0&&state.scores[i]===max?" lead":"")});
    const inp=el("input",{id:"team-name-"+i,"aria-label":"Nombre del equipo "+(i+1)}); inp.value=state.names[i];
    inp.addEventListener("input",()=>{state.names[i]=inp.value||("Equipo "+(i+1));save();});
    const p=el("div",{class:"pts"},String(state.scores[i]));
    const adj=el("div",{class:"adj"});
    [-50,50].forEach(d2=>{const bt=el("button",{type:"button","aria-label":(d2>0?"Sumar":"Restar")+" 50 a "+state.names[i]},(d2>0?"+":"−")+"50");bt.addEventListener("click",()=>{state.scores[i]+=d2;save();renderScores();});adj.appendChild(bt);});
    d.append(inp,p,adj); s.appendChild(d);
  }
}

/* ---------- cronómetro de la ventana ---------- */
let cur=null, tick=null, left=30;
const fmt=s=>s>=60?Math.floor(s/60)+":"+String(s%60).padStart(2,"0"):String(s);
function stopTimer(){if(tick){clearInterval(tick);tick=null;}}
function setTimer(sec){stopTimer();left=sec;$("timer").textContent=fmt(left);$("timer").classList.remove("low");$("timerBtn").textContent="Iniciar tiempo";}
$("timerBtn").addEventListener("click",()=>{
  if(tick){stopTimer();$("timerBtn").textContent="Reanudar tiempo";return;}
  $("timerBtn").textContent="Pausar tiempo";
  tick=setInterval(()=>{left=Math.max(0,left-1);$("timer").textContent=fmt(left);$("timer").classList.toggle("low",left<=10);if(left===0){stopTimer();$("timerBtn").textContent="Tiempo agotado";}},1000);
});

/* ---------- abrir casilla: pregunta o actividad ---------- */
function fillExtra(q){
  const ex=$("qExtra"); ex.innerHTML="";
  if(q.ctx) ex.appendChild(el("p",{class:"ctx"},q.ctx));
  if(q.list){const ol=el("ol",{class:"sub"});q.list.forEach(x=>ol.appendChild(el("li",null,x)));ex.appendChild(ol);}
  if(q.opts){const ul=el("ul",{class:"opts"});q.opts.forEach((o,i)=>{const li=el("li",null,String.fromCharCode(65+i)+") "+o);li.dataset.i=i;ul.appendChild(li);});ex.appendChild(ul);}
  if(q.table){const t=el("table",{class:"mini"});q.table.forEach(r=>{const tr=el("tr");tr.append(el("th",null,r[0]),el("td",null,r[1]));t.appendChild(tr);});const w=el("div",{style:"overflow-x:auto"});w.appendChild(t);ex.appendChild(w);}
}
function openQ(ci,vi){
  const c=CATS[ci], q=c.qs[vi], v=VALUES[vi];
  cur={ci,vi,v,q,final:false};
  $("answer").hidden=true; $("awardBox").hidden=true;
  const card=document.querySelector("#overlay .card");
  if(q.act){
    const A=window.ACTIVIDADES[q.act];
    card.classList.add("wide");
    $("qTag").textContent=c.name+" · "+v+" puntos · Actividad";
    $("qText").textContent=A.title;
    const ex=$("qExtra"); ex.innerHTML="";
    ex.appendChild(el("p",{class:"ctx"},A.intro));
    const box=el("div",{class:"act-box"}); ex.appendChild(box);
    cur.activity=A.render(box,state.names.slice(0,state.n));
    $("showBtn").textContent="Revisar y ver solución";
    setTimer(A.time);
  }else{
    card.classList.remove("wide");
    $("qTag").textContent=c.name+" · "+v+" puntos";
    $("qText").textContent=q.q;
    fillExtra(q);
    $("showBtn").textContent="Mostrar respuesta";
    setTimer(q.list?90:30);
  }
  show();
}
function openFinal(){
  cur={final:true,v:500,q:FINAL};
  document.querySelector("#overlay .card").classList.remove("wide");
  $("qTag").textContent="Pregunta final · hasta 500 puntos";
  $("qText").textContent=FINAL.q;
  fillExtra(FINAL);
  $("showBtn").textContent="Mostrar respuesta";
  $("answer").hidden=true; $("awardBox").hidden=true; setTimer(60); show();
}
function show(){ $("overlay").hidden=false; $("overlay").scrollTop=0; $("showBtn").focus({preventScroll:true}); }
$("showBtn").addEventListener("click",()=>{
  if(!cur) return; stopTimer();
  const a=$("answer"); a.innerHTML="";
  if(cur.activity){
    if(!cur.checked){ cur.result=cur.activity.check(); cur.checked=true; }
    a.appendChild(el("h3",null,"Resultado"));
    a.appendChild(el("p",null,cur.result));
    a.appendChild(el("p",{class:"muted"},"Asigne los puntos según el desempeño: completos si lo resolvieron bien, la mitad si fue parcial."));
  }else{
    a.appendChild(el("h3",null,"Respuesta"));
    cur.q.a.split("\n").forEach(t=>a.appendChild(el("p",null,t)));
    if(cur.q.opts) document.querySelectorAll(".opts li").forEach(li=>{if(+li.dataset.i===cur.q.right) li.classList.add("right");});
  }
  a.hidden=false;
  buildAward();
  a.scrollIntoView({behavior:"smooth",block:"start"});
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
    const r1=el("div",{class:"row"}); r1.appendChild(el("span",{class:"lbl"},(cur.activity?"Completo":"Acierto")+" (+"+full+"):"));
    const r2=el("div",{class:"row"}); r2.appendChild(el("span",{class:"lbl"},(cur.activity?"Parcial":"Rebote")+" (+"+half+"):"));
    for(let i=0;i<state.n;i++){
      [[r1,full],[r2,half]].forEach(([row,p])=>{const b=el("button",{type:"button",class:"award"},state.names[i]);b.addEventListener("click",()=>{state.scores[i]+=p;save();renderScores();b.disabled=true;});row.appendChild(b);});
    }
    box.append(r1,r2);
  }
  box.hidden=false;
}
function closeQ(){
  stopTimer();
  if(cur){ if(cur.final) state.finalUsed=true; else state.used[cur.ci+"-"+cur.vi]=true; save(); }
  cur=null; $("overlay").hidden=true; $("qExtra").innerHTML=""; renderBoard();
}
$("closeBtn").addEventListener("click",closeQ);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("overlay").hidden) closeQ();});
$("finalBtn").addEventListener("click",openFinal);

/* ---------- controles generales ---------- */
const sel=$("nteams");
for(let i=2;i<=MAXT;i++) sel.appendChild(el("option",{value:String(i)},String(i)));
sel.value=String(state.n);
sel.addEventListener("change",e=>{state.n=+e.target.value;save();renderScores();});
$("resetBtn").addEventListener("click",()=>{$("confirmReset").hidden=false;});
$("resetNo").addEventListener("click",()=>{$("confirmReset").hidden=true;});
$("resetYes").addEventListener("click",()=>{state.scores=state.scores.map(()=>0);state.used={};state.finalUsed=false;save();$("confirmReset").hidden=true;renderBoard();renderScores();});

renderBoard(); renderScores();
