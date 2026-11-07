// =============================================================
// PREGUNTAS Y ACTIVIDADES DEL TABLERO
// Para cambiar una pregunta, edite el texto entre comillas.
//   q: la pregunta   a: la respuesta que se muestra
//   ctx: texto de contexto (opcional)   list: subpreguntas (opcional)
//   opts: opciones (opcional)   right: número de la opción correcta, empezando en 0
//   table: tabla de datos (opcional)
// Una casilla también puede ser una actividad: {act:"nombre"}.
//   Actividades disponibles (están en actividades.js):
//   sopa, cruci, error, nanda, orden, juicio, empareja, dilema
// Cada categoría debe tener exactamente 6 casillas (100 a 600 puntos).
// =============================================================

const CATS = [
 {name:"Redes sociales", qs:[
  // 100
  {q:"Den una regla práctica para decidir si algo se puede publicar en redes sociales.",
   a:"«Si no lo diría en el ascensor del hospital, no lo publique». Otra válida: imaginar la publicación en la portada de un periódico junto a su nombre, su institución y el rostro del paciente."},
  // 200
  {q:"Verdadero o falso: un grupo cerrado de WhatsApp de colegas es un espacio confidencial para compartir casos con el nombre del paciente.",
   opts:["Verdadero","Falso"], right:1,
   a:"Falso. Cualquier miembro puede hacer capturas de pantalla. Los casos deben anonimizarse por completo (sin nombre, iniciales, fechas, lugar ni rasgos identificables)."},
  // 300
  {act:"juicio"},
  // 400
  {q:"Una enfermera de UCI publica: «Turno durísimo, perdimos a un paciente de 34 años del accidente de la Vía Perimetral 🙏». No incluye nombre ni foto. ¿Cuál es la valoración correcta?",
   opts:["Es aceptable, porque no hay datos identificativos directos.","Es aceptable si su perfil es privado.","Vulnera la confidencialidad, porque la edad, el evento y el lugar permiten identificar al paciente de forma indirecta.","Solo es falta si la familia presenta una queja."], right:2,
   a:"C. La identificación indirecta (edad, evento y lugar) también vulnera el secreto profesional."},
  // 500
  {q:"El chat del servicio",
   ctx:"Una enfermera envía al WhatsApp del servicio la foto de una herida, con el nombre del paciente visible en la pulsera, para pedir opinión sobre la curación.",
   list:["Identifiquen tres riesgos de seguridad y privacidad.","¿Qué canal y condiciones harían aceptable la consulta?","¿Qué acción correctiva y qué acción preventiva proponen?"],
   a:"Riesgos: el paciente es identificable; es un canal no institucional sin control de accesos ni auditoría; la imagen queda copiada en teléfonos personales; no hay consentimiento.\nAceptable: canal institucional seguro, sin datos identificativos, con consentimiento y registro de la imagen en la historia.\nCorrectiva: eliminar la imagen del grupo y de los dispositivos, informar a la jefatura y notificar el incidente. Preventiva: protocolo de imágenes clínicas y capacitación."},
  // 600
  {q:"Un paciente firmó el consentimiento para que se publicara su foto. Tres semanas después pide retirarla, pero ya fue compartida miles de veces. ¿Cuál es la afirmación más precisa?",
   opts:["El consentimiento firmado protege totalmente a la enfermera y no está obligada a hacer nada.","El consentimiento es revocable: debe retirar la publicación de inmediato y documentar la acción, aunque no pueda controlar las copias de terceros.","Debe retirarla solo si el paciente demuestra un daño.","Basta con editar la publicación y desenfocar la cara."], right:1,
   a:"B. El consentimiento es revocable en cualquier momento. La enfermera responde por su publicación, aunque no controle las copias de terceros."}
 ]},
 {name:"Desinformación", qs:[
  // 100
  {q:"¿Qué significa cada letra del método SIFT?",
   a:"S: detenerse (Stop). I: investigar la fuente. F: buscar mejor cobertura en fuentes confiables. T: rastrear el origen de la afirmación."},
  // 200
  {q:"¿Qué propone la técnica del «sándwich de la verdad» para corregir un mito?",
   a:"Empezar con el dato correcto, advertir brevemente sobre el mito y cerrar otra vez con el dato y una acción concreta. Así no se refuerza el mito."},
  // 300
  {act:"sopa"},
  // 400
  {q:"En un grupo de Facebook se recomienda un «remedio natural» para la diabetes y muchas personas dicen que lo probarán. ¿Cuál es la intervención más adecuada?",
   opts:["Denunciar el grupo y no comentar, para no darle visibilidad.","Comentar identificándose como profesional, con lenguaje empático, explicando el riesgo de abandonar el tratamiento y enlazando a una fuente oficial (MSP, OPS o ADA).","Publicar que quienes lo prueben ponen su vida en riesgo, para generar impacto.","Escribir en privado a cada persona que dijo que lo probaría."], right:1,
   a:"B. Corregir con evidencia, de forma no confrontacional y con fuentes oficiales es parte del deber de educación sanitaria."},
  // 500
  {act:"cruci"},
  // 600
  {q:"«El té de hojas de papaya cura el dengue». ¿Veredicto? ¿Cuál es el mensaje clave para la población?",
   a:"Engañoso. Algunos estudios pequeños exploran su efecto sobre las plaquetas, pero no hay tratamiento antiviral para el dengue. Mensaje: muchos líquidos, solo paracetamol para la fiebre y acudir de inmediato ante signos de alarma (dolor abdominal fuerte, vómitos persistentes, sangrado, somnolencia)."}
 ]},
 {name:"Registros electrónicos", qs:[
  // 100
  {q:"¿Cuál de estos registros es gestionado por el propio paciente?",
   opts:["EMR (registro de una institución)","EHR (historia compartida entre instituciones)","PHR (registro personal de salud)"], right:2,
   a:"PHR, registro personal de salud. El EMR pertenece a una institución; el EHR integra información de varias instituciones y requiere interoperabilidad."},
  // 200
  {q:"SNOMED CT, LOINC y la CIPE permiten que dos sistemas «entiendan lo mismo» con los mismos datos. ¿Qué nivel de interoperabilidad es?",
   opts:["Técnico","Sintáctico","Semántico","Organizacional"], right:2,
   a:"Semántico. El técnico es la conexión, el sintáctico el formato del mensaje (por ejemplo HL7 FHIR) y el organizacional los acuerdos y políticas para compartir."},
  // 300
  {act:"error"},
  // 400
  {q:"Juan Pérez, 68 años, con neumonía, refiere dolor torácico leve. ¿Cuál es el registro más correcto?",
   opts:["«Paciente con dolor torácico leve, sin importancia.»","«Paciente ansioso por el dolor.»","«Refiere dolor torácico 3/10 (EVA), punzante, en hemitórax derecho, que aumenta con la tos. FC 98, SatO₂ 92 % con O₂ a 2 L/min. Se informa al médico de turno a las 14:20.»","«Dolor torácico. Se administra analgesia.»"], right:2,
   a:"C. Es objetivo y medible, incluye hallazgos asociados, hora y comunicación al equipo."},
  // 500
  {act:"nanda"},
  // 600
  {q:"Registró 2 g de ceftriaxona cuando administró 1 g, y lo detecta dos horas después. ¿Cuál es el procedimiento correcto?",
   opts:["Borrar la entrada y escribirla de nuevo con el dato correcto.","Pedir al administrador del sistema que elimine el registro.","Hacer una enmienda sin eliminar el original, con fecha, hora, motivo e identificación; verificar si hubo impacto clínico y notificar según el protocolo.","Dejarlo así, porque el paciente recibió la dosis correcta."], right:2,
   a:"C. La integridad del registro exige conservar el original. La corrección también debe poder rastrearse."}
 ]},
 {name:"Confidencialidad y ley", qs:[
  // 100
  {q:"Según la Ley Orgánica de Protección de Datos Personales del Ecuador, ¿cómo se clasifican los datos de salud?",
   a:"Como datos sensibles, que requieren especial protección. El titular de esos datos es el paciente."},
  // 200
  {q:"¿Qué significan las tres letras de la tríada CID de la seguridad de la información?",
   a:"Confidencialidad (solo accede quien está autorizado), Integridad (la información no se altera indebidamente) y Disponibilidad (está accesible cuando se necesita)."},
  // 300
  {act:"empareja"},
  // 400
  {q:"Una enfermera de consulta externa abre la historia de un vecino hospitalizado en otro servicio «solo para saber cómo está». Tiene credenciales válidas. ¿Cómo se valora?",
   opts:["Es lícito, porque tiene usuario autorizado.","Es falta solo si divulga lo que leyó.","Es un acceso indebido: se justifica por la relación asistencial, no por tener credenciales, y queda en la auditoría.","Es aceptable si lo hace por preocupación genuina."], right:2,
   a:"C. Tener permiso técnico no equivale a estar autorizado: falta la relación asistencial."},
  // 500
  {q:"Auditoría de accesos",
   ctx:"La auditoría muestra que la historia de una figura pública fue abierta 47 veces en 24 horas, incluidas 19 consultas de personal que no participaba en su cuidado.",
   list:["¿Qué medida detectó el problema y cuáles lo habrían prevenido?","Diferencien la responsabilidad individual de la institucional.","¿Cómo afecta a la confianza paciente–profesional?"],
   a:"Detectó: el registro de auditoría. Prevención: control de accesos por rol, alertas de acceso a pacientes con protección especial, aviso de confidencialidad al abrir la historia y capacitación.\nIndividual: cada acceso sin relación asistencial es una falta. Institucional: implementar controles, auditar y notificar la vulneración según la LOPDP.\nConfianza: los pacientes pueden ocultar información y la institución sufre daño reputacional."},
  // 600
  {q:"El hijo de Juan Pérez exige ver el historial porque «es su papá y paga la cuenta». Juan está consciente y orientado. ¿Qué corresponde?",
   opts:["Mostrarle el historial, porque es familiar de primer grado.","Negarse y llamar a seguridad.","Explicar que la información pertenece al paciente, preguntar a Juan si autoriza y qué información, y derivar la información médica al profesional que corresponda.","Darle un resumen verbal sin el diagnóstico."], right:2,
   a:"C. La información pertenece al paciente capaz: se respeta su autonomía y el principio de mínimo necesario."}
 ]},
 {name:"¿Qué harían?", qs:[
  // 100
  {q:"Una colega les pide su usuario y contraseña porque «el sistema no le deja registrar».",
   a:"No compartir las credenciales: cada acceso es personal y queda registrado a su nombre. Ayudarla a resolverlo con soporte técnico o la jefatura."},
  // 200
  {q:"Se dan cuenta de que registraron una dosis incorrecta (la administrada fue la correcta).",
   a:"Corregir con la función de enmienda del sistema, sin borrar el original, indicando el motivo. Si el error pudo afectar decisiones, comunicarlo al equipo y notificar el incidente si la institución lo contempla."},
  // 300
  {act:"orden"},
  // 400
  {q:"Un paciente con insuficiencia cardíaca en telemonitoreo sube 2,1 kg en 48 horas. Por videollamada refiere «solo un poco de cansancio». ¿Cuál es la conducta prioritaria?",
   opts:["Registrar el dato y revalorar en la próxima videollamada.","Reforzar la educación sobre la restricción de sodio.","Reconocer un signo de descompensación y escalar según el protocolo, aunque el síntoma subjetivo sea leve.","Pedirle que se vuelva a pesar mañana para confirmar."], right:2,
   a:"C. Un aumento de más de 1 kg en 24 h o de unos 2 kg en pocos días es signo de alarma. El dato objetivo pesa más que el síntoma leve."},
  // 500
  {q:"Romper el cristal",
   ctx:"Un paciente inconsciente llega a Emergencias. Su historia está restringida porque pidió confidencialidad reforzada (diagnóstico de VIH). Necesitan conocer su medicación habitual.",
   list:["¿Se justifica el acceso? Contrasten beneficencia y autonomía.","¿Qué condiciones debe cumplir ese acceso excepcional?","¿Se le informa al paciente cuando despierte?"],
   a:"Sí: ante riesgo vital y un paciente que no puede decidir, prevalece la beneficencia.\nCondiciones: acceso limitado a lo necesario, justificación registrada en el sistema, auditoría posterior y uso solo durante la emergencia.\nSí se le informa: respeta su autonomía y mantiene la confianza."},
  // 600
  {act:"dilema"}
 ]}
];
const VALUES=[100,200,300,400,500,600];
const FINAL={q:"Pregunta final (hasta 500 puntos por equipo): reescriban de forma objetiva esta nota de enfermería. Tienen 60 segundos y la escriben en el chat.",
  ctx:"Nota original: «Paciente quejumbroso, refiere dolor».",
  a:"Ejemplo de respuesta: «Refiere dolor en la herida abdominal, 7/10 en la escala numérica, punzante, que aumenta al movilizarse. FC 98 lpm, PA 130/80 mmHg. Se administra analgesia prescrita a las 14:00; reevaluación a las 14:45: dolor 3/10». Criterios: sin juicios de valor, intensidad con escala, localización y características, signos vitales, intervención con hora y reevaluación."};
