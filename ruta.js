// =============================================================
// RUTA DEL CUIDADO · motor del juego individual
// El contenido (preguntas y actividades) está en ruta-contenido.js
// =============================================================
(function(){
"use strict";
const KEY="ruta-cuidado-v1";
const $=s=>document.querySelector(s);
const h=(tag,attrs={},...kids)=>{const e=document.createElement(tag);for(const k in attrs){const v=attrs[k];if(v==null||v===false)continue;if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else if(k==="html")e.innerHTML=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v);}kids.flat().forEach(c=>{if(c!=null&&c!=="")e.append(c);});return e;};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const store={get(){try{return JSON.parse(localStorage.getItem(KEY)||"null");}catch(e){return null;}},set(v){try{localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}},clear(){try{localStorage.removeItem(KEY);}catch(e){}}};

/* ---------- estaciones en orden ---------- */
const ZONES=RUTA.unidades;
const ST=[];
ZONES.forEach((z,zi)=>z.estaciones.forEach((s,si)=>ST.push(Object.assign({zone:zi,id:z.id+"-"+si},s))));

/* ---------- puntos máximos de cada tipo de reto ---------- */
const MAXPTS=s=>{switch(s.tipo){
  case "mc":return s.pts||100;
  case "caso":return 80*s.preguntas.length;
  case "vf":return 20*s.items.length;
  case "calc":return 150;
  case "codigo":return 120;
  case "orden":return 150;
  case "empareja":return 25*s.pares.length;
  case "clasifica":return 20*s.items.length;
  case "sopa":return 20*s.palabras.length;
  case "cruci":return 30*buildCW(s.palabras).placed.length;
  case "error":return 40*s.segs.filter(x=>x.e).length;
  case "eval":return 60*s.n;
  default:return 100;}};
const MAX_TOTAL=ST.reduce((a,s)=>a+MAXPTS(s),0);
const TIPOS={mc:"Pregunta",caso:"Caso clínico",vf:"Verdadero o falso",calc:"Cálculo",codigo:"Código en R",orden:"Ordenar pasos",empareja:"Emparejar",clasifica:"Clasificar",sopa:"Sopa de letras",cruci:"Crucigrama",error:"Detecta el error",eval:"Evaluación del pabellón"};
const ICON={mc:"?",caso:"✚",vf:"V/F",calc:"x̄",codigo:"R",orden:"1·2·3",empareja:"⇄",clasifica:"▤",sopa:"A·Z",cruci:"#",error:"!",eval:"★"};
const RANKS=[[0,"Estudiante en práctica"],[.2,"Interno de enfermería"],[.4,"Enfermero(a) de cuidado directo"],[.6,"Enfermero(a) especialista"],[.8,"Líder del cuidado digital"]];
const rankOf=p=>{let r=RANKS[0][1];RANKS.forEach(([t,n])=>{if(p>=t*MAX_TOTAL)r=n;});return r;};

/* ---------- estado ---------- */
let S=store.get();
const fresh=name=>({name,start:Date.now(),idx:0,pts:{},comodines:3,end:null});
const total=()=>Object.values(S.pts).reduce((a,b)=>a+b,0);
const save=()=>store.set(S);
const fmtT=ms=>{const m=Math.floor(ms/60000);return Math.floor(m/60)+" h "+String(m%60).padStart(2,"0")+" min";};

/* ---------- pantallas ---------- */
function showScreen(id){["#inicio","#mapa","#final","#verificar"].forEach(s=>$(s).hidden=s!=="#"+id);$("#hud").hidden=!(id==="mapa");window.scrollTo(0,0);}

function initInicio(){
  const saved=store.get();
  $("#cont").hidden=!(saved&&saved.name);
  if(saved&&saved.name){$("#contName").textContent=saved.name;$("#contPts").textContent=Object.values(saved.pts).reduce((a,b)=>a+b,0);$("#contIdx").textContent=Math.min(saved.idx+1,ST.length)+" de "+ST.length;}
  $("#nEst").textContent=ST.length;$("#nUni").textContent=ZONES.length;
}
$("#startBtn").addEventListener("click",()=>{
  const n=$("#playerName").value.trim().replace(/\s+/g," ");
  if(n.split(" ").length<2){$("#nameErr").hidden=false;$("#playerName").focus();return;}
  $("#nameErr").hidden=true;
  if(store.get()&&!$("#confirmNew").dataset.ok){$("#confirmNew").hidden=false;return;}
  S=fresh(n);save();goMap();
});
$("#playerName").addEventListener("keydown",e=>{if(e.key==="Enter")$("#startBtn").click();});
$("#newYes").addEventListener("click",()=>{$("#confirmNew").dataset.ok="1";$("#confirmNew").hidden=true;$("#startBtn").click();});
$("#newNo").addEventListener("click",()=>{$("#confirmNew").hidden=true;});
$("#contBtn").addEventListener("click",()=>{S=store.get();goMap();});

/* ---------- mapa ---------- */
const SP=96, PADT=120;
function nodePos(i){const n=ST.length;const y=PADT+(n-1-i)*SP;const x=50+Math.sin(i*0.85)*30;return {x,y};}
function goMap(){
  if(S.end){showFinal();return;}
  showScreen("mapa");drawMap();updHud();
  requestAnimationFrame(()=>{const p=nodePos(S.idx);window.scrollTo({top:p.y-window.innerHeight/2+$("#map").getBoundingClientRect().top+window.scrollY,behavior:"instant"});});
}
function drawMap(){
  const map=$("#map");map.innerHTML="";
  const H=PADT+ST.length*SP+40;map.style.height=H+"px";
  // camino
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","trail");svg.setAttribute("viewBox","0 0 100 "+H);svg.setAttribute("preserveAspectRatio","none");
  const pts=ST.map((_,i)=>nodePos(i)),meta={x:50,y:40};
  const mk=(list,cls)=>{const p=document.createElementNS(svg.namespaceURI,"polyline");p.setAttribute("points",list.map(q=>q.x+","+q.y).join(" "));p.setAttribute("class",cls);p.setAttribute("vector-effect","non-scaling-stroke");svg.appendChild(p);};
  mk([...pts,meta],"trail-all");mk(pts.slice(0,S.idx+1),"trail-done");
  map.appendChild(svg);
  // meta
  map.appendChild(h("div",{class:"goal",style:"top:"+(meta.y-30)+"px"},h("span",{class:"goal-flag",text:"⚑"}),h("span",{text:RUTA.meta})));
  // zonas
  ZONES.forEach((z,zi)=>{const first=ST.findIndex(s=>s.zone===zi);const p=nodePos(first);
    map.appendChild(h("div",{class:"zone-tag",style:"top:"+(p.y+34)+"px;--zc:"+z.color},h("b",{text:z.pabellon}),h("span",{text:z.nombre})));});
  // estaciones
  ST.forEach((s,i)=>{const p=nodePos(i);
    const st=i<S.idx?"done":i===S.idx?"current":"locked";
    const got=S.pts[s.id];
    const b=h("button",{type:"button",class:"node "+st+(s.tipo==="eval"?" boss":""),style:"left:"+p.x+"%;top:"+p.y+"px;--zc:"+ZONES[s.zone].color,"aria-label":"Estación "+(i+1)+": "+TIPOS[s.tipo]+(st==="done"?", "+got+" puntos":st==="locked"?", bloqueada":""),disabled:st!=="current"?"":null},
      h("span",{class:"ic",text:ICON[s.tipo]}),h("span",{class:"num",text:i+1}));
    if(st==="current")b.addEventListener("click",()=>openStation(i));
    if(st==="done")b.title=TIPOS[s.tipo]+": "+got+" de "+MAXPTS(s)+" puntos";
    map.appendChild(b);
  });
  // enfermero
  const p=nodePos(S.idx);
  const av=h("div",{class:"avatar",style:"left:calc("+p.x+"% + 34px);top:"+(p.y-30)+"px"});av.innerHTML=NURSE;map.appendChild(av);
  $("#goBtn").textContent=S.idx<ST.length?"Ir a la estación "+(S.idx+1)+" · "+TIPOS[ST[S.idx].tipo]:"Ver resultado";
}
$("#goBtn").addEventListener("click",()=>{if(S.idx<ST.length)openStation(S.idx);else finish();});
function updHud(){
  const t=total();$("#hudName").textContent=S.name;$("#hudPts").textContent=t;$("#hudRank").textContent=rankOf(t);
  $("#hudStep").textContent=Math.min(S.idx,ST.length)+" / "+ST.length;$("#hudBar").style.width=(100*S.idx/ST.length)+"%";
  $("#hudCom").textContent=S.comodines;
}
setInterval(()=>{if(S&&!S.end&&!$("#hud").hidden)$("#hudTime").textContent=fmtT(Date.now()-S.start);},1000);

const NURSE='<svg viewBox="0 0 48 64" aria-hidden="true"><ellipse cx="24" cy="61" rx="13" ry="3" fill="rgba(0,0,0,.25)"/><path d="M11 58c0-12 5-22 13-22s13 10 13 22z" fill="#EAF6F3"/><path d="M20 38h8l-4 7z" fill="#5BD3B0"/><rect x="21" y="46" width="6" height="2" fill="#FF8A65"/><rect x="23" y="44" width="2" height="6" fill="#FF8A65"/><circle cx="24" cy="24" r="10" fill="#F2C7A5"/><path d="M14 22c0-7 4-11 10-11s10 4 10 11c-3-3-6-4-10-4s-7 1-10 4z" fill="#3B2A22"/><path d="M15 14l2-7h14l2 7c-6-2-12-2-18 0z" fill="#fff"/><rect x="23" y="7.5" width="2" height="5" fill="#FF8A65"/><rect x="21.5" y="9" width="5" height="2" fill="#FF8A65"/><circle cx="20.5" cy="25" r="1.2" fill="#1C2B2E"/><circle cx="27.5" cy="25" r="1.2" fill="#1C2B2E"/><path d="M21 29q3 2.5 6 0" stroke="#1C2B2E" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>';

/* ---------- ventana del reto ---------- */
let curI=-1;
function openStation(i){
  curI=i;const s=ST[i],z=ZONES[s.zone];
  $("#rTag").textContent=z.pabellon+" · Estación "+(i+1)+" de "+ST.length;
  $("#rType").textContent=TIPOS[s.tipo];$("#rType").style.setProperty("--zc",z.color);
  $("#rMax").textContent="Hasta "+MAXPTS(s)+" puntos";
  $("#rTitle").textContent=s.titulo||TIPOS[s.tipo];
  const body=$("#rBody");body.innerHTML="";$("#rFoot").innerHTML="";
  if(s.tema)body.append(h("p",{class:"tema",text:s.tema}));
  RENDER[s.tipo](s,body,finishStation);
  $("#reto").hidden=false;$("#reto").scrollTop=0;document.body.classList.add("modal-open");
}
function finishStation(points,note){
  const s=ST[curI];points=Math.max(0,Math.round(points));
  const max=MAXPTS(s),ratio=points/max;
  const msg=ratio>=.99?"¡Excelente!":ratio>=.6?"¡Bien hecho!":ratio>0?"Sigue adelante":"Esta vez no sumaste, pero ya conoces la respuesta";
  const foot=$("#rFoot");foot.innerHTML="";
  foot.append(h("div",{class:"result "+(ratio>=.6?"good":"mid")},h("strong",{text:msg+" +"+points+" puntos"}),note?h("span",{text:" "+note}):null),
    h("button",{type:"button",class:"primary big",id:"nextBtn",text:"Continuar el recorrido",onclick:()=>{
      S.pts[s.id]=points;S.idx=curI+1;save();closeStation();
      if(S.idx>=ST.length)finish();else{drawMap();updHud();animateTo(S.idx);}
    }}));
  foot.scrollIntoView({behavior:"smooth",block:"end"});
}
function closeStation(){$("#reto").hidden=true;document.body.classList.remove("modal-open");}
function animateTo(i){const p=nodePos(i);const top=p.y-window.innerHeight/2+$("#map").getBoundingClientRect().top+window.scrollY;window.scrollTo({top,behavior:"smooth"});
  const av=$(".avatar");if(av){av.classList.add("hop");setTimeout(()=>av.classList.remove("hop"),700);}}

/* ---------- utilidades de los retos ---------- */
const checkBtn=(label,fn)=>h("button",{type:"button",class:"primary",text:label,onclick:fn});
const ctxBlock=s=>s.ctx?h("div",{class:"ctx"},...[].concat(s.ctx).map(t=>h("p",{text:t}))):null;
const tableBlock=t=>t?h("div",{class:"tbl-wrap"},h("table",{class:"data"},h("thead",{},h("tr",{},...t[0].map(c=>h("th",{text:c})))),h("tbody",{},...t.slice(1).map(r=>h("tr",{},...r.map(c=>h("td",{text:c}))))))):null;
const expBlock=t=>t?h("div",{class:"exp"},h("b",{text:"Para recordar: "}),t):null;
const numOf=v=>parseFloat(String(v).replace(",",".").replace(/[^0-9.\-]/g,""));

function mcBlock(q,{pts=100,tries=2,comodin=true}={},done){
  const box=h("div",{class:"mc"});
  if(q.ctx)box.append(ctxBlock(q));
  box.append(h("p",{class:"q",text:q.q}));
  if(q.tabla)box.append(tableBlock(q.tabla));
  const order=shuffle(q.opts.map((_,i)=>i));let left=tries,over=false;
  const list=h("div",{class:"opts"});
  const fb=h("div",{class:"fb"});
  order.forEach(oi=>{const b=h("button",{type:"button",class:"opt","data-i":oi},h("span",{class:"letter"}),h("span",{text:q.opts[oi]}));
    b.addEventListener("click",()=>{if(over||b.disabled)return;
      if(oi===q.right){b.classList.add("right");over=true;lock();const p=left===tries?pts:Math.round(pts/2);fb.replaceChildren(h("p",{class:"ok",text:left===tries?"¡Correcto!":"Correcto en el segundo intento."}),expBlock(q.exp));done(p);}
      else{b.classList.add("wrong");b.disabled=true;left--;
        if(left<=0){over=true;lock();list.querySelector('[data-i="'+q.right+'"]').classList.add("right");fb.replaceChildren(h("p",{class:"bad",text:"No es correcto. La respuesta correcta está en verde."}),expBlock(q.exp));done(0);}
        else fb.replaceChildren(h("p",{class:"bad",text:"No es correcto. Tiene un intento más (vale la mitad)."}));}});
    list.append(b);});
  [...list.children].forEach((b,k)=>b.querySelector(".letter").textContent=String.fromCharCode(65+k));
  function lock(){list.querySelectorAll(".opt").forEach(b=>b.disabled=true);if(cb)cb.remove();}
  box.append(list);
  let cb=null;
  if(comodin&&q.opts.length>2){cb=h("button",{type:"button",class:"comodin",text:"Consultar a un colega ("+S.comodines+")",title:"Elimina dos opciones incorrectas"});
    if(S.comodines<=0)cb.disabled=true;
    cb.addEventListener("click",()=>{if(S.comodines<=0)return;S.comodines--;save();updHud();
      shuffle([...list.querySelectorAll(".opt:not(:disabled)")].filter(b=>+b.dataset.i!==q.right)).slice(0,2).forEach(b=>{b.disabled=true;b.classList.add("gone");});cb.remove();});
    box.append(cb);}
  box.append(fb);
  return box;
}

/* ---------- tipos de reto ---------- */
const RENDER={
mc(s,body,fin){body.append(mcBlock(s,{pts:MAXPTS(s)},p=>fin(p)));},

caso(s,body,fin){
  body.append(ctxBlock(s));if(s.tabla)body.append(tableBlock(s.tabla));
  let k=0,sum=0;const area=h("div",{class:"col"});body.append(area);
  const next=()=>{const q=s.preguntas[k];
    area.append(h("p",{class:"sub-n",text:"Pregunta "+(k+1)+" de "+s.preguntas.length}),mcBlock(q,{pts:80,tries:1,comodin:true},p=>{sum+=p;k++;
      if(k<s.preguntas.length)area.append(h("div",{class:"row"},checkBtn("Siguiente pregunta",e=>{e.target.remove();next();})));
      else fin(sum);}));};
  next();},

vf(s,body,fin){
  if(s.q)body.append(h("p",{class:"q",text:s.q}));
  const labels=s.labels||["Verdadero","Falso"];let answered=0,sum=0;
  const list=h("div",{class:"col"});
  shuffle(s.items).forEach(([text,val,exp])=>{
    const verdict=h("p",{class:"verdict"}),btns=h("div",{class:"row vf-btns"});
    const card=h("div",{class:"vf-card"},h("p",{text}),btns,verdict);
    [[labels[0],true],[labels[1],false]].forEach(([lab,v])=>btns.append(h("button",{type:"button",text:lab,onclick:()=>{
      btns.remove();answered++;const ok=v===val;if(ok)sum+=20;card.classList.add(ok?"good":"bad");
      verdict.replaceChildren(h("b",{text:(ok?"Correcto. ":"Incorrecto. ")+"Es "+(val?labels[0]:labels[1]).toLowerCase()+". "}),exp||"");
      if(answered===s.items.length)fin(sum,sum/20+" de "+s.items.length+" aciertos.");}})));
    list.append(card);});
  body.append(list);},

calc(s,body,fin){
  body.append(ctxBlock(s));if(s.tabla)body.append(tableBlock(s.tabla));
  body.append(h("p",{class:"q",text:s.q}));
  let left=2;const inp=h("input",{type:"text",inputmode:"decimal",class:"num-in",placeholder:"Escriba el resultado","aria-label":"Resultado"});
  const fb=h("div",{class:"fb"});
  const btn=checkBtn("Comprobar",()=>{const v=numOf(inp.value);if(isNaN(v)){fb.replaceChildren(h("p",{class:"bad",text:"Escriba un número (puede usar coma o punto decimal)."}));return;}
    const ok=Math.abs(v-s.answer)<=(s.tol!=null?s.tol:0.05);
    if(ok){done(left===2?150:75,left===2?"¡Correcto!":"Correcto en el segundo intento.");}
    else{left--;if(left>0)fb.replaceChildren(h("p",{class:"bad",text:"No es el resultado. Revise el cálculo e intente otra vez (vale la mitad)."}),s.pista?h("p",{class:"hint",text:"Pista: "+s.pista}):null);
      else done(0,"La respuesta correcta es "+String(s.answer).replace(".",",")+(s.unidad?" "+s.unidad:"")+".");}});
  function done(p,msg){inp.disabled=true;btn.remove();fb.replaceChildren(h("p",{class:p?"ok":"bad",text:msg}),expBlock(s.exp));fin(p);}
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")btn.click();});
  body.append(h("div",{class:"row"},inp,s.unidad?h("span",{class:"unit",text:s.unidad}):null,btn),fb);},

codigo(s,body,fin){
  body.append(ctxBlock(s));
  body.append(h("p",{class:"q",text:s.q}));
  const pre=h("pre",{class:"code"});const parts=s.code.split("____");
  const inp=h("input",{type:"text",class:"code-in",autocomplete:"off",autocapitalize:"off",spellcheck:"false","aria-label":"Complete el código"});
  pre.append(parts[0],inp,parts[1]||"");body.append(pre);
  let left=2;const fb=h("div",{class:"fb"});
  const norm=t=>t.trim().toLowerCase().replace(/\s+/g,"").replace(/\(\)$/,"");
  const btn=checkBtn("Comprobar",()=>{const v=norm(inp.value);if(!v)return;
    if(s.answers.map(norm).includes(v))done(left===2?120:60,"¡Correcto!");
    else{left--;if(left>0)fb.replaceChildren(h("p",{class:"bad",text:"No es la función correcta. Intente otra vez (vale la mitad)."}),s.pista?h("p",{class:"hint",text:"Pista: "+s.pista}):null);
      else done(0,"La respuesta correcta es "+s.answers[0]+".");}});
  function done(p,msg){inp.disabled=true;inp.value=p?inp.value:s.answers[0];btn.remove();fb.replaceChildren(h("p",{class:p?"ok":"bad",text:msg}),s.salida?h("pre",{class:"code out",text:s.salida}):null,expBlock(s.exp));fin(p);}
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")btn.click();});
  body.append(h("div",{class:"row"},btn),fb);},

orden(s,body,fin){
  body.append(h("p",{class:"q",text:s.q}));
  let order;do{order=shuffle(s.steps.map((_,i)=>i));}while(order.every((v,i)=>v===i));
  const ul=h("ol",{class:"steps"});let checks=0;const fb=h("div",{class:"fb"});
  const draw=()=>{ul.innerHTML="";order.forEach((si,pos)=>{
    const up=h("button",{type:"button","aria-label":"Subir",text:"↑",onclick:()=>{if(pos>0){[order[pos-1],order[pos]]=[order[pos],order[pos-1]];draw();}}});
    const dn=h("button",{type:"button","aria-label":"Bajar",text:"↓",onclick:()=>{if(pos<order.length-1){[order[pos+1],order[pos]]=[order[pos],order[pos+1]];draw();}}});
    ul.append(h("li",{class:"step"},h("span",{class:"pos",text:pos+1}),h("span",{text:s.steps[si]}),h("span",{class:"mv"},up,dn)));});};
  draw();
  const btn=checkBtn("Comprobar",()=>{checks++;let ok=0;[...ul.children].forEach((li,pos)=>{const g=order[pos]===pos;li.classList.toggle("ok",g);li.classList.toggle("no",!g);if(g)ok++;});
    if(ok===order.length){end(checks===1?150:90,"Secuencia correcta.");}
    else if(checks===1)fb.replaceChildren(h("p",{class:"bad",text:ok+" de "+order.length+" pasos están en su lugar (en verde). Corrija y compruebe otra vez."}));
    else end(Math.round(150*0.4*ok/order.length),ok+" de "+order.length+" pasos en su lugar.");});
  function end(p,msg){btn.remove();ul.querySelectorAll(".mv").forEach(m=>m.remove());fb.replaceChildren(h("p",{class:p>=90?"ok":"bad",text:msg}),h("p",{class:"hint",text:"Orden correcto:"}),h("ol",{class:"sol"},...s.steps.map(t=>h("li",{text:t}))),expBlock(s.exp));fin(p);}
  body.append(ul,h("div",{class:"row"},btn),fb);},

empareja(s,body,fin){
  body.append(h("p",{class:"q",text:s.q}));
  const opts=shuffle(s.pares.map(p=>p[1]));const list=h("div",{class:"col"});
  shuffle(s.pares.map((_,i)=>i)).forEach((i,k)=>{
    const sel=h("select",{"data-i":i,"aria-label":s.pares[i][0]},h("option",{value:"",text:"Elija…"}),...opts.map(o=>h("option",{value:o,text:o})));
    list.append(h("div",{class:"mrow"},h("span",{text:s.pares[i][0]}),sel));});
  const fb=h("div",{class:"fb"});
  const btn=checkBtn("Comprobar",()=>{let ok=0;list.querySelectorAll("select").forEach(sel=>{const r=s.pares[+sel.dataset.i][1],g=sel.value===r;sel.parentElement.classList.add(g?"ok":"no");sel.disabled=true;if(g)ok++;else sel.after(h("span",{class:"fix",text:"Correcto: "+r}));});
    btn.remove();fb.replaceChildren(expBlock(s.exp));fin(ok*25,ok+" de "+s.pares.length+" pares correctos.");});
  body.append(list,h("div",{class:"row"},btn),fb);},

clasifica(s,body,fin){
  body.append(h("p",{class:"q",text:s.q}));
  const list=h("div",{class:"col"});
  shuffle(s.items).forEach(([t,c])=>{const sel=h("select",{"data-c":c,"aria-label":t},h("option",{value:"",text:"Clasificar…"}),...s.categorias.map((n,i)=>h("option",{value:i,text:n})));
    list.append(h("div",{class:"mrow"},h("span",{text:t}),sel));});
  const fb=h("div",{class:"fb"});
  const btn=checkBtn("Comprobar",()=>{let ok=0;list.querySelectorAll("select").forEach(sel=>{const g=sel.value!==""&&+sel.value===+sel.dataset.c;sel.parentElement.classList.add(g?"ok":"no");sel.disabled=true;if(g)ok++;else sel.after(h("span",{class:"fix",text:"Correcto: "+s.categorias[+sel.dataset.c]}));});
    btn.remove();fb.replaceChildren(expBlock(s.exp));fin(ok*20,ok+" de "+s.items.length+" bien clasificados.");});
  body.append(list,h("div",{class:"row"},btn),fb);},

sopa(s,body,fin){
  const words=s.palabras.map(p=>p[0]);const N=Math.max(12,...words.map(w=>w.length));
  const ws=buildWS(words,N);
  body.append(h("p",{class:"q",text:"Deduzca cada palabra a partir de su pista y búsquela en la sopa (horizontal, vertical, diagonal o al revés). Arrastre sobre las letras para marcarla."}));
  const grid=h("div",{class:"wsgrid",style:"grid-template-columns:repeat("+N+",1fr)"});
  ws.grid.forEach((ch,i)=>grid.append(h("div",{class:"cell","data-i":i,text:ch})));
  const ol=h("ol",{class:"clues"});let over=false;
  const draw=()=>{ol.innerHTML="";s.palabras.forEach(([w,c],k)=>{const got=ws.found.has(w);ol.append(h("li",{class:got?"ok":over?"miss":null},h("span",{class:"n",text:k+1}),h("div",{},h("div",{text:c}),h("div",{class:"ans",text:got||over?w:"_ ".repeat(w.length).trim()+"  ("+w.length+")"}))));});
    cnt.textContent=ws.found.size+" de "+words.length+" palabras";};
  const cnt=h("span",{class:"cnt"});
  let start=null,line=[];
  const cellAt=e=>{const t=document.elementFromPoint(e.clientX,e.clientY);return t&&t.classList&&t.classList.contains("cell")&&grid.contains(t)?+t.dataset.i:null;};
  const paint=()=>grid.querySelectorAll(".cell").forEach(c=>c.classList.toggle("sel",line.includes(+c.dataset.i)));
  grid.addEventListener("pointerdown",e=>{if(over)return;const i=cellAt(e);if(i===null)return;start=i;line=[i];paint();grid.setPointerCapture(e.pointerId);e.preventDefault();});
  grid.addEventListener("pointermove",e=>{if(start===null)return;const i=cellAt(e);if(i===null)return;
    const r0=Math.floor(start/N),c0=start%N,r1=Math.floor(i/N),c1=i%N,dr=r1-r0,dc=c1-c0;
    if(dr!==0&&dc!==0&&Math.abs(dr)!==Math.abs(dc))return;
    const n=Math.max(Math.abs(dr),Math.abs(dc)),sr=Math.sign(dr),sc=Math.sign(dc);line=[];for(let k=0;k<=n;k++)line.push((r0+sr*k)*N+(c0+sc*k));paint();});
  const end=()=>{if(start===null)return;const key=line.join(","),rev=line.slice().reverse().join(",");
    const hit=ws.place.find(p=>!ws.found.has(p.w)&&(p.cells.join(",")===key||p.cells.join(",")===rev));
    if(hit){ws.found.add(hit.w);hit.cells.forEach(i=>grid.children[i].classList.add("found"));draw();if(ws.found.size===words.length)stop();}
    start=null;line=[];paint();};
  grid.addEventListener("pointerup",end);grid.addEventListener("pointercancel",end);
  const quit=h("button",{type:"button",class:"ghost",text:"Terminar y ver las que faltan",onclick:()=>stop()});
  function stop(){if(over)return;over=true;quit.remove();ws.place.forEach(p=>{if(!ws.found.has(p.w))p.cells.forEach(i=>grid.children[i].classList.add("missed"));});draw();fin(ws.found.size*20,ws.found.size+" de "+words.length+" palabras encontradas.");}
  body.append(h("div",{class:"row"},cnt,quit),h("div",{class:"split"},grid,ol));draw();},

cruci(s,body,fin){
  const CW=buildCW(s.palabras);const {placed,letters,rows,cols,K}=CW;let dir=0,active=null;
  body.append(h("p",{class:"q",text:"Complete el crucigrama. Toque una casilla para escribir y vuelva a tocarla para cambiar entre horizontal y vertical, o toque una pista. No lleva tildes."}));
  const inp=(r,c)=>body.querySelector("#cw-"+r+"-"+c);
  const owner=new Map();placed.forEach((p,i)=>{for(let k=0;k<p.w.length;k++){const key=K(p.r+p.d*k,p.c+(1-p.d)*k);if(!owner.has(key))owner.set(key,{});owner.get(key)[p.d]=i;}});
  const nums=new Map();placed.forEach(p=>nums.set(K(p.r,p.c),p.n));
  const cell=Math.max(22,Math.min(34,Math.floor(560/cols)));
  const grid=h("div",{class:"cwgrid",style:"grid-template-columns:repeat("+cols+",minmax(0,1fr));width:"+cols*cell+"px;max-width:100%"});
  const lists={0:h("ol",{class:"clues"}),1:h("ol",{class:"clues"})};
  const hl=()=>{grid.querySelectorAll(".cwcell").forEach(x=>x.classList.remove("act"));body.querySelectorAll(".clues li").forEach(li=>li.classList.toggle("act",+li.dataset.i===active));if(active==null)return;const p=placed[active];for(let k=0;k<p.w.length;k++)inp(p.r+p.d*k,p.c+(1-p.d)*k).parentElement.classList.add("act");};
  const move=(r,c,st)=>{const p=placed[active];if(!p)return;const k=(p.d?r-p.r:c-p.c)+st;if(k>=0&&k<p.w.length)inp(p.r+p.d*k,p.c+(1-p.d)*k).focus();};
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const key=K(r,c);
    if(!letters.has(key)){grid.append(h("div",{class:"cwblank"}));continue;}
    const i=h("input",{id:"cw-"+r+"-"+c,autocomplete:"off",autocapitalize:"characters",spellcheck:"false","aria-label":"Fila "+(r+1)+", columna "+(c+1)});const o=owner.get(key);
    i.addEventListener("focus",()=>{if(o[dir]===undefined)dir=o[0]!==undefined?0:1;active=o[dir];hl();});
    i.addEventListener("mousedown",()=>{if(document.activeElement===i&&o[0]!==undefined&&o[1]!==undefined){dir=1-dir;active=o[dir];hl();}});
    i.addEventListener("input",()=>{const v=i.value.toUpperCase().replace(/[^A-ZÑ]/g,"");i.value=v.slice(-1);if(v)move(r,c,1);prog();});
    i.addEventListener("keydown",e=>{if(e.key==="Backspace"&&!i.value){e.preventDefault();move(r,c,-1);}
      const ar={ArrowRight:[0,1,0],ArrowLeft:[0,-1,0],ArrowDown:[1,0,1],ArrowUp:[-1,0,1]}[e.key];if(ar){e.preventDefault();dir=ar[2];const t=inp(r+ar[0],c+ar[1]);if(t)t.focus();}});
    grid.append(h("div",{class:"cwcell"},nums.has(key)?h("span",{class:"cnum",text:nums.get(key)}):null,i));}
  placed.forEach((p,i)=>{const li=h("li",{"data-i":i},h("span",{class:"n",text:p.n}),h("div",{},h("div",{text:p.clue}),h("div",{class:"ans",text:p.w.length+" letras"})));li.onclick=()=>{dir=p.d;inp(p.r,p.c).focus();active=i;hl();};lists[p.d].append(li);});
  const cellsOf=p=>p.w.split("").map((ch,k)=>[inp(p.r+p.d*k,p.c+(1-p.d)*k),ch]);
  const cnt=h("span",{class:"cnt"});
  function prog(){let n=0;placed.forEach((p,i)=>{const d=cellsOf(p).every(([e,ch])=>e.value===ch);if(d)n++;body.querySelector('.clues li[data-i="'+i+'"]').classList.toggle("ok",d);});
    grid.querySelectorAll(".cwcell").forEach(x=>x.classList.remove("ok"));placed.forEach(p=>{if(cellsOf(p).every(([e,ch])=>e.value===ch))cellsOf(p).forEach(([e])=>e.parentElement.classList.add("ok"));});
    cnt.textContent=n+" de "+placed.length+" palabras";if(n===placed.length)stop();}
  let over=false;
  const quit=h("button",{type:"button",class:"ghost",text:"Terminar y ver la solución",onclick:()=>stop()});
  function stop(){if(over)return;over=true;quit.remove();let n=0;
    placed.forEach(p=>{const d=cellsOf(p).every(([e,ch])=>e.value===ch);if(d)n++;cellsOf(p).forEach(([e,ch])=>{if(e.value!==ch){e.value=ch;e.parentElement.classList.add("bad");}e.disabled=true;});});
    fin(n*30,n+" de "+placed.length+" palabras correctas."+(n<placed.length?" Las casillas en rojo muestran la solución.":""));}
  body.append(h("div",{class:"row"},cnt,quit),h("div",{class:"split"},grid,h("div",{class:"col"},h("h3",{text:"Horizontales"}),lists[0],h("h3",{text:"Verticales"}),lists[1])));prog();},

error(s,body,fin){
  body.append(h("p",{class:"q",text:s.q}));
  const errN=s.segs.filter(x=>x.e).length;
  const note=h("div",{class:"note"},s.meta?h("div",{class:"note-meta",text:s.meta}):null);
  s.segs.forEach((n,i)=>{const b=h("button",{class:"seg",type:"button","data-i":i,"aria-pressed":"false",text:n.t});b.onclick=()=>{if(b.dataset.locked)return;b.classList.toggle("marked");b.setAttribute("aria-pressed",b.classList.contains("marked"));};note.append(b," ");});
  const fb=h("div",{class:"fb"});
  const btn=checkBtn("Comprobar",()=>{let hit=0,fp=0;note.querySelectorAll(".seg").forEach(b=>{const n=s.segs[+b.dataset.i],m=b.classList.contains("marked");b.dataset.locked="1";b.classList.remove("marked");
      if(n.e&&m){b.classList.add("hit");hit++;}else if(n.e)b.classList.add("miss");else if(m){b.classList.add("wrong");fp++;}});
    btn.remove();fb.replaceChildren(h("h3",{text:"Por qué son errores"}),h("ul",{class:"why"},...s.segs.filter(n=>n.e).map(n=>h("li",{},h("strong",{text:"«"+n.t+"» "}),n.why))));
    fin(hit*40-fp*20,hit+" de "+errN+" errores encontrados; "+fp+" marcas incorrectas.");});
  body.append(h("p",{class:"hint",text:"Hay "+errN+" errores. Toque las frases incorrectas para marcarlas."}),note,h("div",{class:"row"},btn),fb);},

eval(s,body,fin){
  body.append(h("p",{class:"q",text:"Para salir de este pabellón responda "+s.n+" preguntas al azar. Necesita al menos "+s.minimo+" correctas. Si no lo logra, puede intentarlo otra vez con otras preguntas."}));
  const area=h("div",{class:"col"});body.append(area);
  const round=()=>{area.innerHTML="";const qs=shuffle(s.banco).slice(0,s.n);let k=0,ok=0;
    const next=()=>{const q=qs[k];area.append(h("p",{class:"sub-n",text:"Pregunta "+(k+1)+" de "+s.n}),mcBlock(q,{tries:1,comodin:false},p=>{if(p)ok++;k++;
      if(k<s.n)area.append(h("div",{class:"row"},checkBtn("Siguiente",e=>{e.target.remove();next();})));
      else if(ok>=s.minimo)fin(ok*60,ok+" de "+s.n+" correctas. ¡Pabellón superado!");
      else area.append(h("div",{class:"result mid"},h("strong",{text:ok+" de "+s.n+" correctas: necesita "+s.minimo+". "}),"Lea las explicaciones y vuelva a intentarlo."),h("div",{class:"row"},checkBtn("Intentar otra vez",()=>{round();$("#reto").scrollTop=0;})));}));};
    next();};
  round();}
};

/* ---------- generadores: sopa y crucigrama ---------- */
function buildWS(words,N){
  const dirs=[[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];
  for(let attempt=0;attempt<200;attempt++){
    const grid=Array(N*N).fill(""),place=[];let ok=true;
    for(const w of [...words].sort((a,b)=>b.length-a.length)){let done=false;
      for(let t=0;t<500&&!done;t++){const [dr,dc]=dirs[Math.floor(Math.random()*dirs.length)],r0=Math.floor(Math.random()*N),c0=Math.floor(Math.random()*N);
        const r1=r0+dr*(w.length-1),c1=c0+dc*(w.length-1);if(r1<0||r1>=N||c1<0||c1>=N)continue;
        const cells=[];let fits=true;for(let k=0;k<w.length;k++){const i=(r0+dr*k)*N+(c0+dc*k);if(grid[i]&&grid[i]!==w[k]){fits=false;break;}cells.push(i);}
        if(!fits)continue;cells.forEach((i,k)=>grid[i]=w[k]);place.push({w,cells});done=true;}
      if(!done){ok=false;break;}}
    if(!ok)continue;const L="AEIOUSRNTLCDMPBGVHFJ";for(let i=0;i<grid.length;i++)if(!grid[i])grid[i]=L[Math.floor(Math.random()*L.length)];
    return {grid,place,found:new Set()};}
  throw new Error("No se pudo armar la sopa");
}
function buildCW(list){
  const cells=new Map(),placed=[],K=(r,c)=>r+","+c,get=(r,c)=>cells.get(K(r,c));
  const fits=(w,r,c,d)=>{const dr=d,dc=1-d;if(get(r-dr,c-dc)||get(r+dr*w.length,c+dc*w.length))return -1;let n=0;
    for(let k=0;k<w.length;k++){const rr=r+dr*k,cc=c+dc*k,ch=get(rr,cc);if(ch){if(ch!==w[k])return -1;n++;}else if(get(rr+dc,cc+dr)||get(rr-dc,cc-dr))return -1;}return n;};
  const put=(w,clue,r,c,d)=>{for(let k=0;k<w.length;k++)cells.set(K(r+d*k,c+(1-d)*k),w[k]);placed.push({w,clue,r,c,d});};
  const L=[...list].sort((a,b)=>b[0].length-a[0].length);put(L[0][0],L[0][1],0,0,0);let pending=L.slice(1);
  for(let pass=0;pass<4&&pending.length;pass++){const next=[];
    for(const [w,clue] of pending){let best=null;
      for(const [key,ch] of cells){const [rr,cc]=key.split(",").map(Number);
        for(let k=0;k<w.length;k++){if(w[k]!==ch)continue;
          for(const d of [0,1]){const r=rr-d*k,c=cc-(1-d)*k,sc=fits(w,r,c,d);if(sc<1)continue;
            let r0=r,c0=c,r1=r+d*(w.length-1),c1=c+(1-d)*(w.length-1);
            for(const k2 of cells.keys()){const [a,b]=k2.split(",").map(Number);if(a<r0)r0=a;if(a>r1)r1=a;if(b<c0)c0=b;if(b>c1)c1=b;}
            const hh=r1-r0+1,wd=c1-c0+1,score=sc*1000-Math.max(hh,wd)*10-hh*wd/10;if(!best||score>best.score)best={r,c,d,score};}}}
      if(best)put(w,clue,best.r,best.c,best.d);else next.push([w,clue]);}
    pending=next;}
  let minR=1e9,minC=1e9,maxR=-1e9,maxC=-1e9;for(const k of cells.keys()){const [a,b]=k.split(",").map(Number);minR=Math.min(minR,a);minC=Math.min(minC,b);maxR=Math.max(maxR,a);maxC=Math.max(maxC,b);}
  const letters=new Map();for(const [k,v] of cells){const [a,b]=k.split(",").map(Number);letters.set(K(a-minR,b-minC),v);}
  placed.forEach(p=>{p.r-=minR;p.c-=minC;});placed.sort((a,b)=>a.r-b.r||a.c-b.c);
  let n=0;const sn=new Map();placed.forEach(p=>{const k=K(p.r,p.c);if(!sn.has(k))sn.set(k,++n);p.n=sn.get(k);});
  return {placed,letters,rows:maxR-minR+1,cols:maxC-minC+1,K};
}
window.RUTA_TEST={buildCW,buildWS,ST,MAXPTS,MAX_TOTAL};

/* ---------- final y certificado ---------- */
const firma=t=>{let x=7;for(const ch of "UNEMI-RUTA|"+t)x=(Math.imul(x,31)+ch.charCodeAt(0))>>>0;return (x%1679616).toString(36).toUpperCase().padStart(4,"0");};
const codeOf=(name,pts,min)=>"RUTA · "+name+" · "+pts+" pts · "+min+" min · "+firma(name.toUpperCase()+"|"+pts+"|"+min);
function finish(){if(!S.end){S.end=Date.now();save();}showFinal();}
function showFinal(){
  showScreen("final");const t=total(),min=Math.round((S.end-S.start)/60000);
  $("#fName").textContent=S.name;$("#fPts").textContent=t;$("#fMax").textContent=MAX_TOTAL;$("#fPct").textContent=Math.round(100*t/MAX_TOTAL)+" %";
  $("#fRank").textContent=rankOf(t);$("#fTime").textContent=fmtT(S.end-S.start);
  $("#fDate").textContent=new Date(S.end).toLocaleDateString("es-EC",{day:"numeric",month:"long",year:"numeric"});
  $("#fCode").textContent=codeOf(S.name,t,min);
  const tb=$("#fZones");tb.innerHTML="";
  ZONES.forEach((z,zi)=>{const sts=ST.filter(s=>s.zone===zi);const got=sts.reduce((a,s)=>a+(S.pts[s.id]||0),0),mx=sts.reduce((a,s)=>a+MAXPTS(s),0);
    tb.append(h("tr",{},h("td",{text:z.nombre}),h("td",{class:"r",text:got+" / "+mx})));});
}
$("#copyCode").addEventListener("click",()=>{const txt=$("#fCode").textContent,b=$("#copyCode");
  const sel=()=>{const r=document.createRange();r.selectNodeContents($("#fCode"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selecciónelo y cópielo";};
  try{navigator.clipboard.writeText(txt).then(()=>b.textContent="Copiado ✓",sel);}catch(e){sel();}});
$("#restartBtn").addEventListener("click",()=>{$("#restartConfirm").hidden=false;});
$("#restartNo").addEventListener("click",()=>{$("#restartConfirm").hidden=true;});
$("#restartYes").addEventListener("click",()=>{store.clear();S=null;$("#restartConfirm").hidden=true;$("#confirmNew").dataset.ok="1";initInicio();showScreen("inicio");});

/* ---------- verificación para la docente (ruta.html#verificar) ---------- */
$("#vIn").addEventListener("input",()=>{const m=/RUTA\s*·\s*(.+?)\s*·\s*(\d+)\s*pts\s*·\s*(\d+)\s*min\s*·\s*([0-9A-Z]{4})/i.exec($("#vIn").value);const o=$("#vOut");
  if(!$("#vIn").value.trim()){o.textContent="";o.className="v-out";return;}
  if(!m){o.textContent="No parece un código de la Ruta del Cuidado.";o.className="v-out bad";return;}
  const ok=firma(m[1].toUpperCase()+"|"+m[2]+"|"+m[3])===m[4].toUpperCase();
  o.textContent=ok?"Código válido: "+m[1]+" obtuvo "+m[2]+" puntos en "+m[3]+" minutos.":"Código no válido: fue modificado.";o.className="v-out "+(ok?"good":"bad");});

/* ---------- arranque ---------- */
function route(){if(location.hash==="#verificar"){showScreen("verificar");return;}
  if(S&&S.end){showFinal();return;}
  initInicio();showScreen("inicio");}
window.addEventListener("hashchange",route);
initInicio();route();
})();
