// =============================================================
// PREGUNTAS DEL JUEGO
// Para cambiar una pregunta, edite el texto entre comillas.
//   q: la pregunta   a: la respuesta que se muestra
//   opts: opciones (opcional)   right: número de la opción correcta, empezando en 0
//   table: tabla de datos (opcional)
// Cada categoría debe tener exactamente 4 preguntas (100, 200, 300 y 400 puntos).
// =============================================================


const CATS = [
 {name:"Redes sociales", qs:[
  {q:"Den una regla práctica para decidir si algo se puede publicar en redes sociales.",
   a:"«Si no lo diría en el ascensor del hospital, no lo publique». Otra válida: imaginar la publicación en la portada de un periódico junto a su nombre, su institución y el rostro del paciente."},
  {q:"Verdadero o falso: un grupo cerrado de WhatsApp de colegas es un espacio confidencial para compartir casos con el nombre del paciente.", opts:["Verdadero","Falso"], right:1,
   a:"Falso. Cualquier miembro puede hacer capturas de pantalla. Los casos deben anonimizarse por completo (sin nombre, iniciales, fechas, lugar ni rasgos identificables)."},
  {q:"Un paciente hospitalizado en su servicio le envía una solicitud de amistad en Facebook. ¿Qué hacen?",
   a:"No aceptarla. Explicar con amabilidad que, por respeto a la relación profesional, no se aceptan solicitudes de pacientes, y ofrecer los canales institucionales. Se protegen los límites terapéuticos."},
  {q:"Mencionen tres de los seis principios de la ANA sobre redes sociales para enfermería.",
   a:"No publicar información identificable de pacientes; mantener los límites profesionales en línea; saber que pacientes, colegas y empleadores pueden ver lo que se publica; usar la configuración de privacidad y separar lo personal de lo profesional; informar a la autoridad sobre contenido que dañe a un paciente; participar en las políticas institucionales."}
 ]},
 {name:"Desinformación", qs:[
  {q:"¿Qué significa cada letra del método SIFT?",
   a:"S: detenerse (Stop). I: investigar la fuente. F: buscar mejor cobertura en fuentes confiables. T: rastrear el origen de la afirmación."},
  {q:"¿Qué propone la técnica del «sándwich de la verdad» para corregir un mito?",
   a:"Empezar con el dato correcto, advertir brevemente sobre el mito y cerrar otra vez con el dato y una acción concreta. Así no se refuerza el mito."},
  {q:"«El té de hojas de papaya cura el dengue». ¿Veredicto? ¿Cuál es el mensaje clave para la población?",
   a:"Engañoso. Algunos estudios pequeños exploran su efecto sobre las plaquetas, pero no hay tratamiento antiviral para el dengue. Mensaje: muchos líquidos, solo paracetamol para la fiebre y acudir de inmediato ante signos de alarma (dolor abdominal fuerte, vómitos persistentes, sangrado, somnolencia)."},
  {q:"¿Qué término usó la OMS durante la pandemia para la sobreabundancia de información, cierta o falsa, y qué disciplina surgió de ello?",
   a:"Infodemia. Surgió la gestión de la infodemia (infodemic management), con formación específica para profesionales de la salud."}
 ]},
 {name:"Registros electrónicos", qs:[
  {q:"¿Cuál de estos registros es gestionado por el propio paciente?", opts:["EMR (registro de una institución)","EHR (historia compartida entre instituciones)","PHR (registro personal de salud)"], right:2,
   a:"PHR, registro personal de salud. El EMR pertenece a una institución; el EHR integra información de varias instituciones y requiere interoperabilidad."},
  {q:"SNOMED CT, LOINC y la CIPE permiten que dos sistemas «entiendan lo mismo» con los mismos datos. ¿Qué nivel de interoperabilidad es?", opts:["Técnico","Sintáctico","Semántico","Organizacional"], right:2,
   a:"Semántico. El técnico es la conexión, el sintáctico el formato del mensaje (por ejemplo HL7 FHIR) y el organizacional los acuerdos y políticas para compartir."},
  {q:"Calculen el NEWS2 y digan qué respuesta corresponde.", table:[["FR","24 rpm"],["SatO2","91 % al aire"],["PAS","132 mmHg"],["FC","104 lpm"],["Conciencia","Alerta"],["Temperatura","38,5 °C"]],
   a:"7 puntos: FR 2 + SatO2 3 + aire 0 + PAS 0 + FC 1 + conciencia 0 + temperatura 1. Riesgo alto: respuesta de emergencia, comunicación inmediata al médico y monitorización continua."},
  {q:"¿Qué es la «e-iatrogenia» en los registros electrónicos? Den dos ejemplos.",
   a:"Errores inducidos por la propia tecnología. Ejemplos: copiar y pegar notas anteriores, elegir el paciente o la dosis equivocada en un menú desplegable, fatiga de alertas, plantillas rígidas, información fragmentada en muchas pantallas."}
 ]},
 {name:"Confidencialidad y ley", qs:[
  {q:"Según la Ley Orgánica de Protección de Datos Personales del Ecuador, ¿cómo se clasifican los datos de salud?",
   a:"Como datos sensibles, que requieren especial protección. El titular de esos datos es el paciente."},
  {q:"¿Qué significan las tres letras de la tríada CID de la seguridad de la información?",
   a:"Confidencialidad (solo accede quien está autorizado), Integridad (la información no se altera indebidamente) y Disponibilidad (está accesible cuando se necesita)."},
  {q:"Expliquen la diferencia entre «necesidad de conocer» y «mínimo privilegio».",
   a:"Necesidad de conocer: el profesional accede solo a la información que necesita para atender a ese paciente. Mínimo privilegio: cada rol del sistema tiene solo los permisos indispensables (por ejemplo, admisión sin acceso a notas clínicas)."},
  {q:"Se filtró el diagnóstico de una paciente desde el sistema del hospital. ¿Quién debe notificar la vulneración y a quién?",
   a:"La institución, como responsable del tratamiento, debe notificar a la Superintendencia de Protección de Datos Personales y comunicarlo a la paciente si hay riesgo para sus derechos. El profesional que la detecta debe reportarla internamente sin demora."}
 ]},
 {name:"¿Qué harían?", qs:[
  {q:"Una colega les pide su usuario y contraseña porque «el sistema no le deja registrar».",
   a:"No compartir las credenciales: cada acceso es personal y queda registrado a su nombre. Ayudarla a resolverlo con soporte técnico o la jefatura."},
  {q:"Se dan cuenta de que registraron una dosis incorrecta (la administrada fue la correcta).",
   a:"Corregir con la función de enmienda del sistema, sin borrar el original, indicando el motivo. Si el error pudo afectar decisiones, comunicarlo al equipo y notificar el incidente si la institución lo contempla."},
  {q:"La hija de un paciente adulto, consciente y orientado, les pide ver en la pantalla sus exámenes.",
   a:"No mostrar la pantalla. Preguntar al paciente si autoriza que se informe a su hija y qué información; coordinar con el médico; orientar sobre el trámite formal de solicitud de la historia clínica."},
  {q:"Revisando la auditoría ven que una enfermera de otro servicio abrió la historia de una persona famosa con la que no tenía relación asistencial.",
   a:"Es un acceso indebido. Reportarlo por los canales institucionales (dirección, delegado de protección de datos), documentar la evidencia, activar el procedimiento disciplinario y evaluar la notificación. Prevención: formación, alertas y auditorías proactivas."}
 ]}
];
const VALUES=[100,200,300,400];
const FINAL={q:"Pregunta final (hasta 500 puntos por equipo): reescriban de forma objetiva esta nota de enfermería. Tienen 60 segundos y la escriben en el chat.",
  ctx:"Nota original: «Paciente quejumbroso, refiere dolor».",
  a:"Ejemplo de respuesta: «Refiere dolor en la herida abdominal, 7/10 en la escala numérica, punzante, que aumenta al movilizarse. FC 98 lpm, PA 130/80 mmHg. Se administra analgesia prescrita a las 14:00; reevaluación a las 14:45: dolor 3/10». Criterios: sin juicios de valor, intensidad con escala, localización y características, signos vitales, intervención con hora y reevaluación."};

