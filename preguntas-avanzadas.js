// =============================================================
// RONDA 2 · NIVEL AVANZADO (para graduados de Enfermería)
// Mismo formato que preguntas.js:
//   q: la pregunta   a: la respuesta que se muestra
//   ctx: texto de contexto (opcional)   list: subpreguntas (opcional)
//   opts: opciones (opcional)   right: número de la opción correcta, empezando en 0
// Cada categoría debe tener exactamente 4 preguntas (100, 200, 300 y 400 puntos).
// =============================================================

const CATS2 = [
 {name:"Redes sociales", qs:[
  {q:"En un grupo de Facebook se recomienda un «remedio natural» para la diabetes y muchas personas dicen que lo probarán. ¿Cuál es la intervención más adecuada?",
   opts:["Denunciar el grupo y no comentar, para no darle visibilidad.","Comentar identificándose como profesional, con lenguaje empático, explicando el riesgo de abandonar el tratamiento y enlazando a una fuente oficial (MSP, OPS o ADA).","Publicar que quienes lo prueben ponen su vida en riesgo, para generar impacto.","Escribir en privado a cada persona que dijo que lo probaría."], right:1,
   a:"B. Corregir con evidencia, de forma no confrontacional y con fuentes oficiales es parte del deber de educación sanitaria."},
  {q:"Una enfermera de UCI publica: «Turno durísimo, perdimos a un paciente de 34 años del accidente de la Vía Perimetral 🙏». No incluye nombre ni foto. ¿Cuál es la valoración correcta?",
   opts:["Es aceptable, porque no hay datos identificativos directos.","Es aceptable si su perfil es privado.","Vulnera la confidencialidad, porque la edad, el evento y el lugar permiten identificar al paciente de forma indirecta.","Solo es falta si la familia presenta una queja."], right:2,
   a:"C. La identificación indirecta (edad, evento y lugar) también vulnera el secreto profesional."},
  {q:"Un paciente firmó el consentimiento para que se publicara su foto. Tres semanas después pide retirarla, pero ya fue compartida miles de veces. ¿Cuál es la afirmación más precisa?",
   opts:["El consentimiento firmado protege totalmente a la enfermera y no está obligada a hacer nada.","El consentimiento es revocable: debe retirar la publicación de inmediato y documentar la acción, aunque no pueda controlar las copias de terceros.","Debe retirarla solo si el paciente demuestra un daño.","Basta con editar la publicación y desenfocar la cara."], right:1,
   a:"B. El consentimiento es revocable en cualquier momento. La enfermera responde por su publicación, aunque no controle las copias de terceros."},
  {q:"Una enfermera con 80 000 seguidores critica en su cuenta personal la gestión del hospital donde trabaja. ¿Cuál es la postura más adecuada?",
   opts:["Debe cerrar la cuenta de inmediato.","Puede opinar, pero sin revelar datos de pacientes ni información interna reservada, y dejando claro que habla a título personal.","Puede publicar lo que quiera porque es su cuenta personal.","Solo puede publicar si la dirección aprueba cada publicación."], right:1,
   a:"B. No pierde su libertad de expresión, pero el secreto profesional y el deber de reserva sobre información institucional siguen vigentes en redes."}
 ]},
 {name:"Teleenfermería", qs:[
  {q:"¿Cuál de estos hallazgos es menos fiable de valorar por videoconsulta y exige una estrategia alternativa?",
   opts:["Patrón respiratorio y uso de músculos accesorios.","Estado de conciencia y orientación.","Edema con fóvea y llenado capilar.","Adherencia referida al tratamiento."], right:2,
   a:"C. El edema con fóvea y el llenado capilar requieren exploración táctil. Es la principal limitación de la valoración a distancia."},
  {q:"Un hospital rural quiere telemonitorear a pacientes diabéticos, pero muchos no tienen internet estable. ¿Qué propuesta respeta mejor la equidad?",
   opts:["Postergar el programa hasta que haya cobertura de internet.","Incluir solo a los pacientes con smartphone y conexión estable.","Un modelo híbrido: SMS o llamada para reportar glucemias, visitas domiciliarias de apoyo y cuidadores capacitados como enlace.","Entregar tablets a todos los pacientes sin capacitación previa."], right:2,
   a:"C. El modelo híbrido adapta la tecnología al contexto y no excluye a los pacientes más vulnerables."},
  {q:"Un paciente con insuficiencia cardíaca en telemonitoreo sube 2,1 kg en 48 horas. Por videollamada refiere «solo un poco de cansancio». ¿Cuál es la conducta prioritaria?",
   opts:["Registrar el dato y revalorar en la próxima videollamada.","Reforzar la educación sobre la restricción de sodio.","Reconocer un signo de descompensación y escalar según el protocolo, aunque el síntoma subjetivo sea leve.","Pedirle que se vuelva a pesar mañana para confirmar."], right:2,
   a:"C. Un aumento de más de 1 kg en 24 h o de unos 2 kg en pocos días es signo de alarma. El dato objetivo pesa más que el síntoma leve."},
  {q:"Una IA clasifica como «riesgo bajo» a un paciente posquirúrgico. Por videollamada, la enfermera nota palidez, diaforesis y respuestas lentas. ¿Qué debe hacer?",
   opts:["Seguir la clasificación del algoritmo, que está validado con miles de casos.","Priorizar su juicio clínico, escalar la atención y documentar la discrepancia con el sistema.","Esperar la próxima lectura automática para confirmar.","Pedir a otra enfermera que revise el algoritmo."], right:1,
   a:"B. La IA es una herramienta de apoyo. El juicio clínico y la responsabilidad son del profesional (evitar el sesgo de automatización)."}
 ]},
 {name:"Registros electrónicos", qs:[
  {q:"La alergia a la penicilina de un paciente consta en el sistema de su centro de salud, pero no aparece en el hospital de otra red, donde le administran amoxicilina. ¿Qué característica del RSE falló?",
   opts:["Accesibilidad","Interoperabilidad","Cifrado","Autenticación"], right:1,
   a:"B. Los datos existían, pero no se compartieron entre sistemas distintos."},
  {q:"¿Qué registro demuestra mejor la evaluación dentro del proceso de atención de enfermería?",
   opts:["«Se administró paracetamol 1 g IV a las 10:00.»","«Paciente con riesgo de caídas.»","«A las 11:00, T° 37,2 °C (antes 38,5 °C). Objetivo de termorregulación alcanzado parcialmente; se mantiene el plan.»","«Paciente tranquilo.»"], right:2,
   a:"C. Compara el resultado con el objetivo y decide sobre el plan: eso define la evaluación."},
  {q:"Juan Pérez, 68 años, con neumonía, refiere dolor torácico leve. ¿Cuál es el registro más correcto?",
   opts:["«Paciente con dolor torácico leve, sin importancia.»","«Paciente ansioso por el dolor.»","«Refiere dolor torácico 3/10 (EVA), punzante, en hemitórax derecho, que aumenta con la tos. FC 98, SatO₂ 92 % con O₂ a 2 L/min. Se informa al médico de turno a las 14:20.»","«Dolor torácico. Se administra analgesia.»"], right:2,
   a:"C. Es objetivo y medible, incluye hallazgos asociados, hora y comunicación al equipo."},
  {q:"Registró 2 g de ceftriaxona cuando administró 1 g, y lo detecta dos horas después. ¿Cuál es el procedimiento correcto?",
   opts:["Borrar la entrada y escribirla de nuevo con el dato correcto.","Pedir al administrador del sistema que elimine el registro.","Hacer una enmienda sin eliminar el original, con fecha, hora, motivo e identificación; verificar si hubo impacto clínico y notificar según el protocolo.","Dejarlo así, porque el paciente recibió la dosis correcta."], right:2,
   a:"C. La integridad del registro exige conservar el original. La corrección también debe poder rastrearse."}
 ]},
 {name:"Confidencialidad y ley", qs:[
  {q:"Según la Ley Orgánica de Protección de Datos Personales del Ecuador (2021), los datos de salud son:",
   opts:["Datos públicos cuando el paciente se atiende en el sistema público.","Datos sensibles, cuyo tratamiento exige mayores garantías.","Datos anónimos por naturaleza.","Datos de libre uso con fines de investigación."], right:1,
   a:"B. La LOPDP clasifica los datos relativos a la salud como datos sensibles."},
  {q:"Un colega deja su sesión del RSE abierta y usted necesita registrar con urgencia un signo vital. ¿Qué es lo correcto?",
   opts:["Registrar en la sesión abierta para no perder tiempo.","Cerrar esa sesión, ingresar con su propio usuario y registrar; recordar al colega el cierre de sesión.","Registrar en la sesión abierta y avisarle al colega después.","Anotarlo en papel y que el colega lo transcriba."], right:1,
   a:"B. Cada registro debe quedar firmado por quien lo realiza (autenticación y no repudio)."},
  {q:"Una enfermera de consulta externa abre la historia de un vecino hospitalizado en otro servicio «solo para saber cómo está». Tiene credenciales válidas. ¿Cómo se valora?",
   opts:["Es lícito, porque tiene usuario autorizado.","Es falta solo si divulga lo que leyó.","Es un acceso indebido: se justifica por la relación asistencial, no por tener credenciales, y queda en la auditoría.","Es aceptable si lo hace por preocupación genuina."], right:2,
   a:"C. Tener permiso técnico no equivale a estar autorizado: falta la relación asistencial."},
  {q:"El hijo de Juan Pérez exige ver el historial porque «es su papá y paga la cuenta». Juan está consciente y orientado. ¿Qué corresponde?",
   opts:["Mostrarle el historial, porque es familiar de primer grado.","Negarse y llamar a seguridad.","Explicar que la información pertenece al paciente, preguntar a Juan si autoriza y qué información, y derivar la información médica al profesional que corresponda.","Darle un resumen verbal sin el diagnóstico."], right:2,
   a:"C. La información pertenece al paciente capaz: se respeta su autonomía y el principio de mínimo necesario."}
 ]},
 {name:"Casos para debatir", qs:[
  {q:"El chat del servicio",
   ctx:"Una enfermera envía al WhatsApp del servicio la foto de una herida, con el nombre del paciente visible en la pulsera, para pedir opinión sobre la curación.",
   list:["Identifiquen tres riesgos de seguridad y privacidad.","¿Qué canal y condiciones harían aceptable la consulta?","¿Qué acción correctiva y qué acción preventiva proponen?"],
   a:"Riesgos: el paciente es identificable; es un canal no institucional sin control de accesos ni auditoría; la imagen queda copiada en teléfonos personales; no hay consentimiento.\nAceptable: canal institucional seguro, sin datos identificativos, con consentimiento y registro de la imagen en la historia.\nCorrectiva: eliminar la imagen del grupo y de los dispositivos, informar a la jefatura y notificar el incidente. Preventiva: protocolo de imágenes clínicas y capacitación."},
  {q:"Auditoría de accesos",
   ctx:"La auditoría muestra que la historia de una figura pública fue abierta 47 veces en 24 horas, incluidas 19 consultas de personal que no participaba en su cuidado.",
   list:["¿Qué medida detectó el problema y cuáles lo habrían prevenido?","Diferencien la responsabilidad individual de la institucional.","¿Cómo afecta a la confianza paciente–profesional?"],
   a:"Detectó: el registro de auditoría. Prevención: control de accesos por rol, alertas de acceso a pacientes con protección especial, aviso de confidencialidad al abrir la historia y capacitación.\nIndividual: cada acceso sin relación asistencial es una falta. Institucional: implementar controles, auditar y notificar la vulneración según la LOPDP.\nConfianza: los pacientes pueden ocultar información y la institución sufre daño reputacional."},
  {q:"Romper el cristal",
   ctx:"Un paciente inconsciente llega a Emergencias. Su historia está restringida porque pidió confidencialidad reforzada (diagnóstico de VIH). Necesitan conocer su medicación habitual.",
   list:["¿Se justifica el acceso? Contrasten beneficencia y autonomía.","¿Qué condiciones debe cumplir ese acceso excepcional?","¿Se le informa al paciente cuando despierte?"],
   a:"Sí: ante riesgo vital y un paciente que no puede decidir, prevalece la beneficencia.\nCondiciones: acceso limitado a lo necesario, justificación registrada en el sistema, auditoría posterior y uso solo durante la emergencia.\nSí se le informa: respeta su autonomía y mantiene la confianza."},
  {q:"Teleenfermería y responsabilidad",
   ctx:"Por videollamada, una enfermera indica antipiréticos a una puérpera de 5 días con fiebre de 38 °C. A las 12 horas ingresa con sepsis puerperal. No hay protocolo institucional de teleenfermería.",
   list:["¿Qué datos no podía obtener a distancia?","¿Qué banderas rojas obligan a derivar a atención presencial?","¿Qué debió documentar y quién responde?"],
   a:"No podía valorar: palpación abdominal y altura uterina, características y olor de los loquios, herida, presión arterial real y perfusión.\nBanderas rojas: fiebre de 38 °C o más en el puerperio, taquicardia, hipotensión, loquios fétidos, dolor abdominal, alteración de la conciencia → derivación inmediata.\nDocumentar: hora, datos valorados, limitaciones de la valoración, signos de alarma explicados, indicaciones y derivación ofrecida. Responden ambas: la enfermera por su juicio clínico y la institución por no tener protocolo."}
 ]}
];

const FINAL2 = {q:"Pregunta final (hasta 500 puntos por equipo): la orden verbal.",
  ctx:"A las 02:00, Juan Pérez presenta SatO₂ 86 %, FR 30 rpm y confusión. El médico ordena por teléfono subir el oxígeno y administrar furosemida. Al día siguiente niega haber dado la orden. ¿Cómo debieron registrar la orden para que sea trazable y los proteja? Tienen 60 segundos.",
  a:"Registrar fecha y hora, nombre del médico, la orden textual (fármaco, dosis, vía y frecuencia) y que se leyó de vuelta y fue confirmada.\nAnotar la hora de administración y la respuesta del paciente (SatO₂, FR, conciencia, diuresis) y, si lo hubo, el testigo.\nSolicitar que el médico valide la orden en el sistema en el plazo institucional. Ese registro completo es lo que protege a la enfermera."};
