// =============================================================
// ACTIVIDADES DEL TABLERO
// Sopa de letras, crucigrama, detecta el error, NANDA-NIC, ordena los pasos,
// ¿correcto o falta?, riesgo y medida y dilema. Se abren al tocar una casilla
// que en preguntas.js dice {act:"nombre"}. Aquí también se edita su contenido.
// =============================================================
(function(){
"use strict";
const h=(tag,attrs={},...kids)=>{const e=document.createElement(tag);for(const k in attrs){const v=attrs[k];if(v==null||v===false)continue;if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v);}kids.flat().forEach(c=>{if(c!=null&&c!=="")e.append(c);});return e;};
const shuffle=(a,r=Math.random)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const SIZE=15;

const WORDS=[
  ["TELEENFERMERIA","Cuidado enfermero brindado a distancia con apoyo de las TIC."],
  ["TELEMONITOREO","Seguimiento remoto de glucemia, peso o presión con dispositivos conectados."],
  ["CONSENTIMIENTO","Se obtiene antes de publicar la imagen de un paciente y puede revocarse en cualquier momento."],
  ["AUTENTICACION","Verifica que quien entra al RSE es realmente quien dice ser."],
  ["INTEROPERABLE","Así debe ser un RSE para que la alergia registrada en el centro de salud aparezca en el hospital."],
  ["BRECHADIGITAL","Desigualdad en acceso a internet y dispositivos (dos palabras, juntas)."],
  ["TRAZABILIDAD","Permite reconstruir quién hizo qué, cuándo y por qué durante el cuidado."],
  ["CONFIDENCIAL","Información que solo conocen quienes participan en la atención del paciente."],
  ["AUDITORIA","Revela que 19 personas sin relación asistencial abrieron la historia de un paciente."],
  ["PRIVACIDAD","Derecho del paciente a decidir quién conoce sus datos de salud."],
  ["ENMIENDA","Forma correcta de corregir una dosis mal registrada sin borrar el original."],
  ["CIFRADO","Vuelve ilegibles los datos de una laptop perdida para quien no tiene la clave."]
];

function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function buildWS(seed){
  const dirs=[[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];
  for(let attempt=0;attempt<50;attempt++){
    const r=mulberry(seed+attempt*7919),grid=Array(SIZE*SIZE).fill(""),place=[];let ok=true;
    for(const [w] of [...WORDS].sort((a,b)=>b[0].length-a[0].length)){
      let done=false;
      for(let t=0;t<400&&!done;t++){
        const [dr,dc]=dirs[Math.floor(r()*dirs.length)],r0=Math.floor(r()*SIZE),c0=Math.floor(r()*SIZE);
        const r1=r0+dr*(w.length-1),c1=c0+dc*(w.length-1);
        if(r1<0||r1>=SIZE||c1<0||c1>=SIZE)continue;
        const cells=[];let fits=true;
        for(let k=0;k<w.length;k++){const i=(r0+dr*k)*SIZE+(c0+dc*k);if(grid[i]&&grid[i]!==w[k]){fits=false;break;}cells.push(i);}
        if(!fits)continue;
        cells.forEach((i,k)=>grid[i]=w[k]);place.push({w,cells});done=true;
      }
      if(!done){ok=false;break;}
    }
    if(!ok)continue;
    const L="AEIOUSRNTLCDMPBGVQHFJ";
    for(let i=0;i<grid.length;i++)if(!grid[i])grid[i]=L[Math.floor(r()*L.length)];
    return {grid,place,found:new Set()};
  }
}

const CWW=[
  ["INTEGRIDAD","Propiedad del registro que se pierde si se borra un dato en lugar de enmendarlo."],
  ["REVOCABLE","Así es el consentimiento que dio el paciente para publicar su imagen."],
  ["ANONIMATO","Debe mantenerse en toda publicación sobre un caso clínico."],
  ["HIBRIDO","Modelo de teleenfermería que combina llamadas, visitas y tecnología para no excluir a nadie."],
  ["SECRETO","Deber profesional que sigue vigente cuando la enfermera usa redes sociales."],
  ["SOAPIE","Formato de nota: subjetivo, objetivo, análisis, plan, intervención y evaluación."],
  ["TRIAJE","Clasificación de prioridad que también se hace a distancia."],
  ["NANDA","Taxonomía internacional de diagnósticos de enfermería."],
  ["SESGO","___ de automatización: confiar ciegamente en lo que dice la IA."],
  ["FIRMA","Elemento electrónico que identifica al autor de cada registro."]
];

function buildCW(){
  const cells=new Map(),placed=[],K=(r,c)=>r+","+c,get=(r,c)=>cells.get(K(r,c));
  const fits=(w,r,c,d)=>{const dr=d,dc=1-d;if(get(r-dr,c-dc)||get(r+dr*w.length,c+dc*w.length))return -1;let n=0;
    for(let k=0;k<w.length;k++){const rr=r+dr*k,cc=c+dc*k,ch=get(rr,cc);if(ch){if(ch!==w[k])return -1;n++;}else if(get(rr+dc,cc+dr)||get(rr-dc,cc-dr))return -1;}return n;};
  const put=(w,clue,r,c,d)=>{for(let k=0;k<w.length;k++)cells.set(K(r+d*k,c+(1-d)*k),w[k]);placed.push({w,clue,r,c,d});};
  const list=[...CWW].sort((a,b)=>b[0].length-a[0].length);
  put(list[0][0],list[0][1],0,0,0);
  let pending=list.slice(1);
  for(let pass=0;pass<3&&pending.length;pass++){
    const next=[];
    for(const [w,clue] of pending){
      let best=null;
      for(const [key,ch] of cells){const [rr,cc]=key.split(",").map(Number);
        for(let k=0;k<w.length;k++){if(w[k]!==ch)continue;
          for(const d of [0,1]){const r=rr-d*k,c=cc-(1-d)*k,s=fits(w,r,c,d);if(s<1)continue;
            let r0=r,c0=c,r1=r+d*(w.length-1),c1=c+(1-d)*(w.length-1);
            for(const k2 of cells.keys()){const [a,b]=k2.split(",").map(Number);if(a<r0)r0=a;if(a>r1)r1=a;if(b<c0)c0=b;if(b>c1)c1=b;}
            const hh=r1-r0+1,wd=c1-c0+1,score=s*1000-Math.max(hh,wd)*10-hh*wd/10;
            if(!best||score>best.score)best={r,c,d,score};}}}
      if(best)put(w,clue,best.r,best.c,best.d);else next.push([w,clue]);
    }
    pending=next;
  }
  let minR=Infinity,minC=Infinity,maxR=-Infinity,maxC=-Infinity;
  for(const k of cells.keys()){const [a,b]=k.split(",").map(Number);minR=Math.min(minR,a);minC=Math.min(minC,b);maxR=Math.max(maxR,a);maxC=Math.max(maxC,b);}
  const letters=new Map();for(const [k,v] of cells){const [a,b]=k.split(",").map(Number);letters.set(K(a-minR,b-minC),v);}
  placed.forEach(p=>{p.r-=minR;p.c-=minC;});
  placed.sort((a,b)=>a.r-b.r||a.c-b.c);
  let n=0;const startNum=new Map();
  placed.forEach(p=>{const k=K(p.r,p.c);if(!startNum.has(k))startNum.set(k,++n);p.n=startNum.get(k);});
  return {placed,letters,rows:maxR-minR+1,cols:maxC-minC+1,K};
}

const NOTE=[
  {t:"Paciente masculino de 68 años, con diagnóstico de neumonía adquirida en la comunidad; antecedentes de HTA y DM2.",e:false},
  {t:"Paciente se ve bien y tranquilo.",e:true,why:"Es una apreciación subjetiva: no describe hallazgos observables ni medibles (conciencia, patrón respiratorio, coloración)."},
  {t:"14:00 · T° 38,5 °C, FC 98 lpm, FR 24 rpm, PA 138/84 mmHg, SatO₂ 92 % con O₂ por cánula nasal a 2 L/min.",e:false},
  {t:"Se deja registrada la ceftriaxona 1 g IV de las 16:00 para adelantar trabajo.",e:true,why:"Nunca se registra una intervención antes de realizarla. Si no se administra, el registro es falso y pone en riesgo al paciente."},
  {t:"Refiere dolor torácico 3/10 (EVA), punzante, en hemitórax derecho, que aumenta con la tos.",e:false},
  {t:"Se informa al médico.",e:true,why:"Falta a quién, a qué hora, qué se informó y qué indicó. Sin esos datos no hay trazabilidad."},
  {t:"Paracetamol: se borra «2 g» y se reemplaza por «1 g».",e:true,why:"No se borra un registro. Se hace una enmienda que conserve el original, con fecha, hora, motivo y firma."},
  {t:"El hijo solicita información; se consulta al paciente, consciente y orientado, que autoriza informar solo su estado general.",e:false},
  {t:"Pte c/ NAC, s/p ATB, BIC OK.",e:true,why:"Abreviaturas no estandarizadas y ambiguas (por ejemplo, «s/p» puede leerse como «sin pauta» o «status post»). Generan errores de interpretación."},
  {t:"Registrado con el usuario de la Lcda. Torres porque mi sesión estaba bloqueada.",e:true,why:"Cada registro debe hacerse con credenciales propias. Usar las de otra persona anula la autoría y la responsabilidad legal."},
  {t:"Se eleva la cabecera a 45° y se enseña tos asistida; el paciente realiza la técnica correctamente.",e:false}
];

const NANDA=[
  ["SatO₂ 86 %, FR 30 rpm, confusión de inicio reciente.","Deterioro del intercambio de gases","Oxigenoterapia"],
  ["Tos productiva con secreciones espesas que no logra expulsar; roncus en base derecha.","Limpieza ineficaz de las vías aéreas","Mejorar la tos"],
  ["T° 38,5 °C, piel caliente al tacto, FC 98 lpm.","Hipertermia","Tratamiento de la fiebre"],
  ["Refiere dolor torácico 3/10, punzante, que aumenta con la tos; expresión facial de dolor.","Dolor agudo","Manejo del dolor"],
  ["DM2, infección activa, ingesta oral disminuida; glucemia actual 168 mg/dL.","Riesgo de nivel de glucemia inestable","Manejo de la hiperglucemia"],
  ["Pregunta para qué sirve el oxígeno y se retira la cánula al dormir.","Conocimientos deficientes","Enseñanza: procedimiento/tratamiento"],
  ["68 años, DM2, catéter venoso periférico con 72 h de permanencia.","Riesgo de infección","Mantenimiento de dispositivos de acceso venoso"],
  ["Refiere temor a «morir ahogado», está inquieto y pregunta varias veces por su familia.","Ansiedad","Disminución de la ansiedad"]
];

const SEQS={
  dosis:{label:"Corregir una dosis mal registrada",steps:[
    "Detectar la discrepancia y verificar la dosis realmente administrada (orden médica, hoja de medicación, bomba).",
    "Valorar al paciente para descartar efectos por el error.",
    "Agregar una enmienda sin borrar ni sobrescribir el registro original.",
    "Indicar fecha, hora, motivo de la corrección y firmar con el usuario propio.",
    "Informar al médico o a la jefatura y notificar el evento según el protocolo de seguridad del paciente."]},
  tele:{label:"Alerta de telemonitoreo: +2 kg en 48 h",steps:[
    "Verificar que el dato sea fiable: dispositivo, hora y condiciones de la medición.",
    "Contactar al paciente y valorar signos de alarma (disnea, ortopnea, edema, diuresis).",
    "Aplicar el protocolo de escalamiento y comunicar el caso al médico tratante.",
    "Ejecutar la conducta indicada: valoración presencial o ajuste del tratamiento.",
    "Documentar en el RSE la alerta, la valoración, la comunicación y la conducta.",
    "Programar el seguimiento y reforzar la educación sobre autocontrol del peso."]},
  red:{label:"Publicación viral y el paciente pide retirarla",steps:[
    "Retirar la publicación de inmediato: el consentimiento es revocable.",
    "Conversar con el paciente, ofrecer disculpas y escuchar su preocupación.",
    "Informar a la jefatura o al comité de ética de la institución.",
    "Solicitar a la plataforma la eliminación de copias o capturas difundidas.",
    "Documentar lo actuado y revisar la política institucional de uso de redes."]}
};

const JUDGE=[
  ["Abrir con tu usuario la historia de un vecino hospitalizado en otro servicio para saber cómo sigue.",false,"Tener credenciales no autoriza el acceso: falta la relación asistencial. Además queda registrado en la auditoría."],
  ["Acceder a la historia restringida de un paciente inconsciente en Emergencias, registrando en el sistema el motivo del acceso.",true,"Es un acceso de emergencia justificado por beneficencia, con trazabilidad. El paciente debe ser informado después."],
  ["Enviar al WhatsApp del servicio la foto de una herida donde se ve la pulsera con el nombre del paciente.",false,"Expone datos identificativos en un canal no institucional y sin control de acceso."],
  ["Publicar en tu perfil profesional una infografía sobre pie diabético citando guías del MSP.",true,"Es educación sanitaria basada en evidencia y sin datos de pacientes."],
  ["Informar el diagnóstico al hijo de un paciente consciente y orientado sin consultarle a él.",false,"La información pertenece al paciente capaz. Se requiere su autorización."],
  ["Cerrar la sesión abierta de un colega y registrar el signo vital con tu propio usuario.",true,"Mantiene la autoría del registro y evita que otro responda por tu intervención."],
  ["Publicar: «Turno durísimo, perdimos al paciente de 34 años del accidente de la Perimetral».",false,"No hay nombre, pero la edad, el evento y el lugar permiten identificarlo de forma indirecta."],
  ["Hacer una videoconsulta desde una cafetería con el altavoz del teléfono.",false,"Terceros pueden escuchar información clínica. La privacidad del entorno también es responsabilidad del profesional."],
  ["Seguir la clasificación «riesgo bajo» de la IA aunque observas palidez, diaforesis y respuestas lentas.",false,"Es sesgo de automatización. El juicio clínico prevalece: hay que escalar y documentar la discrepancia."],
  ["Ofrecer seguimiento por llamada telefónica a los pacientes diabéticos que no tienen internet.",true,"Un modelo híbrido reduce la brecha digital sin excluir a los pacientes vulnerables."],
  ["Copiar la valoración del turno anterior en el RSE porque «el paciente sigue igual».",false,"El copiar y pegar perpetúa datos que ya no son ciertos y oculta cambios clínicos. Cada valoración debe ser actual."],
  ["Corregir un dato erróneo agregando una enmienda con fecha, hora, motivo y firma.",true,"Conserva la integridad y la trazabilidad del registro."]
];

const PAIRS=[
  ["Alguien ingresa al RSE con una contraseña robada.","Autenticación de doble factor"],
  ["Se pierde una laptop con historias clínicas descargadas.","Cifrado de datos"],
  ["Personal ajeno al caso abre la historia de una figura pública.","Auditoría de accesos"],
  ["Un estudiante en rotación puede ver diagnósticos psiquiátricos que no necesita.","Control de accesos por rol"],
  ["La alergia registrada en el centro de salud no aparece en el hospital.","Interoperabilidad de historias clínicas"],
  ["El paciente pide retirar la foto suya que se publicó con su permiso.","Revocación del consentimiento informado"],
  ["La sesión queda abierta en la estación de enfermería durante horas.","Cierre automático de sesión por inactividad"]
];

const DILEMMAS=[
  {t:"El algoritmo contra la enfermera",c:"El hospital adopta una IA que prioriza las alertas de telemonitoreo. En un mes, el personal deja de revisar las alertas de «riesgo bajo». Un paciente clasificado así sufre un evento adverso.",q:["¿Qué es el sesgo de automatización y cómo se previene?","¿Quién responde cuando el algoritmo falla?","Propongan tres reglas de uso seguro de la IA para el servicio."]},
  {t:"Perfil personal o profesional",c:"Una enfermera con 80 000 seguidores publica contenido educativo y también opiniones sobre la gestión del hospital donde trabaja. La dirección le pide cerrar la cuenta.",q:["¿Dónde termina la libertad de expresión y empieza el deber profesional?","¿Debe separar perfiles? ¿Basta con eso?","¿Es legítima la solicitud de la dirección?"]},
  {t:"La paradoja de la brecha digital",c:"Los adultos mayores y la población rural son quienes más se beneficiarían de la teleenfermería, pero también quienes menos acceso tienen a internet y dispositivos.",q:["¿Cómo resolverían esta paradoja desde la gestión del cuidado?","¿Qué papel pueden tener los cuidadores y los agentes comunitarios?","¿Qué indicador usarían para saber si el programa es equitativo?"]},
  {t:"Completo pero falso",c:"Una auditoría encuentra notas de enfermería impecables y completas, pero idénticas durante cinco turnos seguidos: fueron copiadas y pegadas. En ese tiempo, el paciente desarrolló una úlcera por presión no registrada.",q:["¿Por qué un registro copiado puede ser más peligroso que uno incompleto?","¿Qué consecuencias legales tiene para quienes firmaron?","¿Qué cambios propondrían en el sistema y en el equipo?"]},
  {t:"Romper el cristal",c:"Un paciente inconsciente llega a Emergencias. Su historia está restringida porque él pidió confidencialidad reforzada por su diagnóstico de VIH. Necesitan conocer su medicación habitual.",q:["¿Se justifica el acceso? Contrasten beneficencia y autonomía.","¿Qué condiciones debe cumplir ese acceso excepcional?","¿Se le informa al paciente cuando despierte? ¿Por qué?"]}
];

const CWD=buildCW();

/* ---------- actividades: cada una se dibuja dentro de la ventana de la casilla ---------- */
// render(caja) devuelve {check}: check() revisa, muestra la solución y devuelve el texto del resultado.
const ACTIVIDADES={
 sopa:{title:"Sopa de letras",time:300,
  intro:"Los equipos deducen cada palabra a partir de su pista y la buscan en la sopa (horizontal, vertical, diagonal o al revés). Cuando la digan bien, toque ✓ en la pista y la palabra se marca sola. También puede arrastrar sobre las letras.",
  render(box,names,opts={}){
    const ws=buildWS(opts.seed!=null?opts.seed:Math.floor(Math.random()*100000));
    const grid=h("div",{class:"wsgrid",style:"grid-template-columns:repeat("+SIZE+",1fr)","aria-label":"Sopa de letras"});
    ws.grid.forEach((ch,i)=>grid.append(h("div",{class:"cell","data-i":i,text:ch})));
    const ol=h("ol",{class:"clues"});let reveal=false;
    const cellsOf=w=>ws.place.find(p=>p.w===w).cells;
    function markWord(w,on){if(on){ws.found.add(w);cellsOf(w).forEach(i=>grid.children[i].classList.add("found"));}
      else{ws.found.delete(w);const keep=new Set();ws.found.forEach(x=>cellsOf(x).forEach(i=>keep.add(i)));cellsOf(w).forEach(i=>{if(!keep.has(i))grid.children[i].classList.remove("found");});}
      drawClues();if(opts.onChange)opts.onChange(ws.found.size,WORDS.length);}
    function drawClues(){ol.innerHTML="";WORDS.forEach(([w,clue],k)=>{const got=ws.found.has(w);
      const mark=(reveal||opts.student)?null:h("button",{type:"button",class:"mark"+(got?" undo":""),title:got?"Desmarcar":"La dijeron bien","aria-label":(got?"Desmarcar ":"Marcar como dicha: ")+"pista "+(k+1),text:got?"↺":"✓",onclick:()=>markWord(w,!got)});
      ol.append(h("li",{class:got?"ok":(reveal?"miss":null)},h("span",{class:"n",text:String(k+1).padStart(2,"0")}),h("div",{},h("div",{text:clue}),h("div",{class:"ans",text:got||reveal?w:"_ ".repeat(w.length).trim()+"  ("+w.length+")"})),mark));});}
    box.append(h("div",{class:"split"},grid,h("div",{class:"col"},ol)));
    let start=null,line=[];
    const cellAt=e=>{const t=document.elementFromPoint(e.clientX,e.clientY);return t&&t.classList.contains("cell")?+t.dataset.i:null;};
    const paint=()=>grid.querySelectorAll(".cell").forEach(c=>c.classList.toggle("sel",line.includes(+c.dataset.i)));
    grid.addEventListener("pointerdown",e=>{const i=cellAt(e);if(i===null)return;start=i;line=[i];paint();grid.setPointerCapture(e.pointerId);e.preventDefault();});
    grid.addEventListener("pointermove",e=>{if(start===null)return;const i=cellAt(e);if(i===null)return;
      const r0=Math.floor(start/SIZE),c0=start%SIZE,r1=Math.floor(i/SIZE),c1=i%SIZE,dr=r1-r0,dc=c1-c0;
      if(dr!==0&&dc!==0&&Math.abs(dr)!==Math.abs(dc))return;
      const n=Math.max(Math.abs(dr),Math.abs(dc)),sr=Math.sign(dr),sc=Math.sign(dc);line=[];
      for(let k=0;k<=n;k++)line.push((r0+sr*k)*SIZE+(c0+sc*k));paint();});
    const end=()=>{if(start===null)return;
      const key=line.join(","),rev=line.slice().reverse().join(",");
      const hit=ws.place.find(p=>!ws.found.has(p.w)&&(p.cells.join(",")===key||p.cells.join(",")===rev));
      if(hit)markWord(hit.w,true);
      start=null;line=[];paint();};
    grid.addEventListener("pointerup",end);grid.addEventListener("pointercancel",end);
    drawClues();
    return {check(){const n=ws.found.size;reveal=true;ws.place.forEach(p=>{if(!ws.found.has(p.w))p.cells.forEach(i=>grid.children[i].classList.add("missed"));});drawClues();
      return "Palabras encontradas: "+n+" de "+WORDS.length+". Las que faltaban quedan marcadas en la sopa.";}};
  }},

 cruci:{title:"Crucigrama",time:300,
  intro:"Los equipos dicen la palabra de cada pista. Cuando la digan bien, toque ✓ en la pista y la palabra se escribe sola en el crucigrama. También puede escribirla tocando las casillas. No lleva tildes.",
  render(box,names,opts={}){
    const {placed,letters,rows,cols,K}=CWD;let dir=0,active=null;
    const inp=(r,c)=>box.querySelector("#cw-"+r+"-"+c);
    const owner=new Map();placed.forEach((p,i)=>{for(let k=0;k<p.w.length;k++){const key=K(p.r+p.d*k,p.c+(1-p.d)*k);if(!owner.has(key))owner.set(key,{});owner.get(key)[p.d]=i;}});
    const nums=new Map();placed.forEach(p=>nums.set(K(p.r,p.c),p.n));
    const grid=h("div",{class:"cwgrid",style:"grid-template-columns:repeat("+cols+",minmax(0,1fr));width:"+cols*30+"px;max-width:100%"});
    const lists={0:h("ol",{class:"clues"}),1:h("ol",{class:"clues"})};
    function highlight(){grid.querySelectorAll(".cwcell").forEach(x=>x.classList.remove("act"));box.querySelectorAll(".clues li").forEach(li=>li.classList.toggle("act",+li.dataset.i===active));
      if(active==null)return;const p=placed[active];for(let k=0;k<p.w.length;k++)inp(p.r+p.d*k,p.c+(1-p.d)*k).parentElement.classList.add("act");}
    function move(r,c,step){const p=placed[active];if(!p)return;const k=(p.d?r-p.r:c-p.c)+step;if(k>=0&&k<p.w.length)inp(p.r+p.d*k,p.c+(1-p.d)*k).focus();}
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const key=K(r,c);
      if(!letters.has(key)){grid.append(h("div",{class:"cwblank"}));continue;}
      const i=h("input",{id:"cw-"+r+"-"+c,autocomplete:"off",autocapitalize:"characters",spellcheck:"false","aria-label":"Fila "+(r+1)+", columna "+(c+1)});
      const o=owner.get(key);
      i.addEventListener("focus",()=>{if(o[dir]===undefined)dir=o[0]!==undefined?0:1;active=o[dir];highlight();});
      i.addEventListener("mousedown",()=>{if(document.activeElement===i&&o[0]!==undefined&&o[1]!==undefined){dir=1-dir;active=o[dir];highlight();}});
      i.addEventListener("input",()=>{const v=i.value.toUpperCase().replace(/[^A-ZÑ]/g,"");i.value=v.slice(-1);i.parentElement.classList.remove("ok","bad");if(v)move(r,c,1);progress();});
      i.addEventListener("keydown",e=>{
        if(e.key==="Backspace"&&!i.value){e.preventDefault();move(r,c,-1);}
        const ar={ArrowRight:[0,1,0],ArrowLeft:[0,-1,0],ArrowDown:[1,0,1],ArrowUp:[-1,0,1]}[e.key];
        if(ar){e.preventDefault();dir=ar[2];const t=inp(r+ar[0],c+ar[1]);if(t)t.focus();else if(o[dir]!==undefined){active=o[dir];highlight();}}});
      grid.append(h("div",{class:"cwcell"},nums.has(key)?h("span",{class:"num",text:nums.get(key)}):null,i));
    }
    const said=new Set();
    // modo estudiante: las palabras completas se pintan de verde y se avisa el avance
    function progress(){if(!opts.student)return;let ok=0;
      placed.forEach((p,i)=>{const done=cellsOf(p).every(([e,ch])=>e.value===ch);if(done)ok++;box.querySelector('.clues li[data-i="'+i+'"]').classList.toggle("ok",done);});
      grid.querySelectorAll(".cwcell").forEach(x=>x.classList.remove("ok"));
      placed.forEach(p=>{if(cellsOf(p).every(([e,ch])=>e.value===ch))cellsOf(p).forEach(([e])=>e.parentElement.classList.add("ok"));});
      if(opts.onChange)opts.onChange(ok,placed.length);}
    const cellsOf=p=>p.w.split("").map((ch,k)=>[inp(p.r+p.d*k,p.c+(1-p.d)*k),ch]);
    function markWord(i,on){const p=placed[i];
      if(on){said.add(i);cellsOf(p).forEach(([e,ch])=>{e.value=ch;e.parentElement.classList.add("ok");});}
      else{said.delete(i);const keep=new Set();said.forEach(j=>cellsOf(placed[j]).forEach(([e])=>keep.add(e)));cellsOf(p).forEach(([e])=>{if(!keep.has(e)){e.value="";e.parentElement.classList.remove("ok");}});}
      const li=box.querySelector('.clues li[data-i="'+i+'"]'),b=li.querySelector(".mark");
      li.classList.toggle("ok",on);b.textContent=on?"↺":"✓";b.classList.toggle("undo",on);b.title=on?"Desmarcar":"La dijeron bien";}
    placed.forEach((p,i)=>{
      const mark=opts.student?null:h("button",{type:"button",class:"mark",title:"La dijeron bien","aria-label":"Marcar como dicha: pista "+p.n,text:"✓",onclick:e=>{e.stopPropagation();markWord(i,!said.has(i));}});
      const li=h("li",{"data-i":i},h("span",{class:"n",text:p.n}),h("div",{},h("div",{text:p.clue}),h("div",{class:"ans",text:p.w.length+" letras"})),mark);
      li.onclick=()=>{dir=p.d;inp(p.r,p.c).focus();active=i;highlight();};lists[p.d].append(li);});
    box.append(h("div",{class:"split"},grid,h("div",{class:"col"},h("h3",{text:"Horizontales"}),lists[0],h("h3",{text:"Verticales"}),lists[1])));
    return {check(){let ok=0;box.querySelectorAll(".mark").forEach(b=>b.remove());
      placed.forEach(p=>{let all=true;for(let k=0;k<p.w.length;k++){const e=inp(p.r+p.d*k,p.c+(1-p.d)*k),good=e.value===p.w[k];if(!good){all=false;e.value=p.w[k];}e.parentElement.classList.toggle("ok",good);e.parentElement.classList.toggle("bad",!good);}if(all)ok++;});
      return "Palabras correctas: "+ok+" de "+placed.length+". Las casillas en rojo muestran la letra correcta.";}};
  }},

 error:{title:"Detecta el error",time:240,
  intro:"Esta nota de enfermería de Juan Pérez tiene 6 errores de registro. Toquen cada frase incorrecta para marcarla.",
  render(box){
    const note=h("div",{class:"note"},h("div",{class:"note-meta",text:"NOTA DE ENFERMERÍA · Medicina Interna · Cama 12 · Turno vespertino"}));
    NOTE.forEach((n,i)=>{const b=h("button",{class:"seg",type:"button","data-i":i,"aria-pressed":"false",text:n.t});b.onclick=()=>{if(b.dataset.locked)return;b.classList.toggle("marked");b.setAttribute("aria-pressed",b.classList.contains("marked"));};note.append(b," ");});
    const why=h("div",{class:"col"});box.append(note,why);
    return {check(){
      let hit=0,fp=0;const errN=NOTE.filter(n=>n.e).length;
      note.querySelectorAll(".seg").forEach(b=>{const n=NOTE[+b.dataset.i],m=b.classList.contains("marked");b.dataset.locked="1";b.classList.remove("marked");
        if(n.e&&m){b.classList.add("hit");hit++;}else if(n.e){b.classList.add("miss");}else if(m){b.classList.add("wrong");fp++;}});
      why.innerHTML="";why.append(h("h3",{text:"Por qué son errores"}),h("ul",{class:"why"},...NOTE.filter(n=>n.e).map(n=>h("li",{},h("strong",{text:"«"+n.t+"» "}),n.why))));
      return "Errores encontrados: "+hit+" de "+errN+" · Marcas incorrectas: "+fp+". En verde los que encontraron; con borde punteado los que faltaron.";}};
  }},

 nanda:{title:"NANDA-NIC",time:300,
  intro:"Segundo día de hospitalización de Juan Pérez. Para cada grupo de datos, elijan la etiqueta diagnóstica NANDA y la intervención NIC prioritaria. Cada opción se usa una sola vez.",
  render(box){
    const dx=shuffle(NANDA.map(n=>n[1])),nic=shuffle(NANDA.map(n=>n[2]));
    const list=h("div",{class:"col"},h("div",{class:"nhead"},h("span",{text:"Datos de valoración"}),h("span",{text:"Diagnóstico NANDA"}),h("span",{text:"Intervención NIC"})));
    shuffle(NANDA.map((_,i)=>i)).forEach((i,k)=>{
      const s1=h("select",{id:"nd"+k,"data-i":i,"data-col":"1","aria-label":"Diagnóstico para: "+NANDA[i][0]},h("option",{value:"",text:"Diagnóstico…"}),...dx.map(o=>h("option",{value:o,text:o})));
      const s2=h("select",{id:"ni"+k,"data-i":i,"data-col":"2","aria-label":"Intervención para: "+NANDA[i][0]},h("option",{value:"",text:"Intervención…"}),...nic.map(o=>h("option",{value:o,text:o})));
      list.append(h("div",{class:"nrow"},h("span",{text:NANDA[i][0]}),s1,s2));
    });
    box.append(list,h("p",{class:"muted small",text:"Las etiquetas siguen la denominación usual en español de NANDA-I y NIC."}));
    return {check(){let ok=0;list.querySelectorAll("select").forEach(s=>{const right=NANDA[+s.dataset.i][+s.dataset.col],good=s.value===right;s.classList.toggle("ok",good);s.classList.toggle("no",!good);if(good)ok++;else s.after(h("span",{class:"fix",text:"Correcto: "+right}));});
      return "Aciertos: "+ok+" de "+NANDA.length*2+".";}};
  }},

 orden:{title:"Ordena los pasos",time:240,
  intro:"Los pasos del protocolo están desordenados. Muévanlos con las flechas hasta dejar la secuencia correcta.",
  render(box){
    const keys=Object.keys(SEQS),seq=SEQS[keys[Math.floor(Math.random()*keys.length)]];
    let order;do{order=shuffle(seq.steps.map((_,i)=>i));}while(order.every((v,i)=>v===i));
    const ul=h("ol",{class:"steps"});
    box.append(h("h3",{text:"Escenario: "+seq.label}),ul);
    function draw(){ul.innerHTML="";order.forEach((si,pos)=>{
      const up=h("button",{type:"button","aria-label":"Subir",text:"↑",onclick:()=>{if(pos>0){[order[pos-1],order[pos]]=[order[pos],order[pos-1]];draw();}}});
      const dn=h("button",{type:"button","aria-label":"Bajar",text:"↓",onclick:()=>{if(pos<order.length-1){[order[pos+1],order[pos]]=[order[pos],order[pos+1]];draw();}}});
      ul.append(h("li",{class:"step"},h("span",{class:"pos",text:pos+1}),h("span",{text:seq.steps[si]}),h("span",{class:"mv"},up,dn)));});}
    draw();
    return {check(){let ok=0;[...ul.children].forEach((li,pos)=>{const good=order[pos]===pos;li.classList.toggle("ok",good);li.classList.toggle("no",!good);if(good)ok++;});
      box.append(h("div",{class:"col"},h("h3",{text:"Orden correcto"}),h("ol",{class:"sub"},...seq.steps.map(s=>h("li",{text:s})))));
      return ok+" de "+order.length+" pasos en su lugar.";}};
  }},

 juicio:{title:"¿Correcto o falta?",time:240,
  intro:"Para cada situación, el equipo decide si la actuación es correcta o constituye una falta ética o legal. Justifiquen en voz alta antes de tocar.",
  render(box){
    let score=0,answered=0;const cards=shuffle(JUDGE).slice(0,6);
    const grid=h("div",{class:"jcards"});
    cards.forEach(([text,right,exp])=>{
      const verdict=h("div",{class:"verdict"}),ex=h("p",{class:"exp",hidden:"",text:exp}),opts=h("div",{class:"jopts"});
      const card=h("div",{class:"jcard"},h("p",{class:"jq",text}),verdict,ex,opts);
      const answer=val=>{if(card.dataset.done)return;card.dataset.done="1";answered++;const ok=val===right;if(ok)score++;
        if(val!==null)card.classList.add(ok?"good":"bad");verdict.textContent=(val===null?"":(ok?"Acierto. ":"No. "))+"Es "+(right?"correcto":"una falta")+".";ex.hidden=false;opts.hidden=true;};
      card._reveal=()=>answer(null);
      [["Correcto",true],["Falta",false]].forEach(([lab,val])=>opts.append(h("button",{type:"button",text:lab,onclick:()=>answer(val)})));
      grid.append(card);
    });
    box.append(grid);
    return {check(){const n=answered;grid.querySelectorAll(".jcard").forEach(c=>{if(!c.dataset.done)c._reveal();});
      return "Aciertos: "+score+" de "+cards.length+(n<cards.length?" (sin responder: "+(cards.length-n)+")":"")+".";}};
  }},

 empareja:{title:"Riesgo y medida",time:240,
  intro:"Relacionen cada situación de riesgo con la medida que la previene o la resuelve mejor. Cada medida se usa una sola vez.",
  render(box){
    const opts=shuffle(PAIRS.map(p=>p[1]));const list=h("div",{class:"col"});
    shuffle(PAIRS.map((p,i)=>i)).forEach((i,k)=>{
      const s=h("select",{id:"m"+k,"data-i":i,"aria-label":"Medida para: "+PAIRS[i][0]},h("option",{value:"",text:"Elija la medida…"}),...opts.map(o=>h("option",{value:o,text:o})));
      list.append(h("div",{class:"mrow"},h("span",{text:PAIRS[i][0]}),s));
    });
    box.append(list);
    return {check(){let ok=0;list.querySelectorAll("select").forEach(s=>{const right=PAIRS[+s.dataset.i][1],good=s.value===right;s.parentElement.classList.toggle("ok",good);s.parentElement.classList.toggle("no",!good);if(good)ok++;else s.after(h("span",{class:"fix",text:"Correcto: "+right}));});
      return "Pares correctos: "+ok+" de "+PAIRS.length+".";}};
  }},

 dilema:{title:"Dilema",time:300,
  intro:"Un equipo defiende una postura durante 3 minutos y otro la rebate. El resto evalúa los argumentos.",
  render(box,names){
    const d=DILEMMAS[Math.floor(Math.random()*DILEMMAS.length)];
    const idx=shuffle(names.map((_,k)=>k));
    box.append(h("div",{class:"dilemma"},h("div",{class:"who",text:names.length>1?"Defiende: "+names[idx[0]]+" · Rebate: "+names[idx[1]]:""}),h("h3",{text:d.t}),h("p",{text:d.c}),h("ol",{},...d.q.map(x=>h("li",{text:x})))));
    return {check(){return "No hay una sola respuesta correcta: valoren la solidez ética y legal de los argumentos y den los puntos al equipo que argumentó mejor.";}};
  }}
};
window.ACTIVIDADES=ACTIVIDADES;

/* ---------- código de "terminado" para las actividades en el celular ---------- */
// Formato: SOPA · Equipo 3 · 4:32 · K7Q   (las 3 últimas letras comprueban que el código es auténtico)
const firma=t=>{let x=7;for(const ch of "UNEMI-ENF|"+t)x=(Math.imul(x,31)+ch.charCodeAt(0))>>>0;return (x%46656).toString(36).toUpperCase().padStart(3,"0");};
const norm=n=>n.trim().replace(/\s+/g," ").toUpperCase();
window.CODIGOS={
  make(pref,name,time){return pref+" · "+name.trim().replace(/\s+/g," ")+" · "+time+" · "+firma(pref+"|"+norm(name)+"|"+time);},
  check(text){const m=/(SOPA|CRUCI)\s*·\s*(.+?)\s*·\s*(\d+:\d\d)\s*·\s*([0-9A-Z]{3})/i.exec(text||"");
    if(!m)return null;return {act:m[1].toUpperCase(),name:m[2],time:m[3],ok:firma(m[1].toUpperCase()+"|"+norm(m[2])+"|"+m[3])===m[4].toUpperCase()};}
};
})();
