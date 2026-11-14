// =============================================================
// RUTA DEL CUIDADO · contenido del juego
// Cada unidad es un pabellón; cada estación es un reto.
// Tipos de reto: mc (pregunta), caso, vf (verdadero/falso), calc (cálculo),
// codigo (R), orden, empareja, clasifica, sopa, cruci, error, eval (evaluación del pabellón).
// Para agregar la Unidad 1 o la 4, copie el formato de un pabellón y póngalo en "unidades".
// =============================================================
const RUTA = {
 titulo:"Ruta del Cuidado",
 meta:"Meta: Líder del Cuidado Digital",
 unidades:[
{
 id:"u2", nombre:"Unidad 2 · Curación, salud digital, audiovisuales y estadística", pabellon:"Pabellón de Salud Digital", color:"#5BD3B0",
 estaciones:[
  // ---------- Tema 1: Curación de contenidos ----------
  {tipo:"mc", tema:"Tema 1 · Curación de contenidos", titulo:"Turno de noche en internet",
   q:"Busca en internet «cuidados del pie diabético» y obtiene 2 millones de resultados contradictorios. ¿Cómo se llama esta sobrecarga de información que hace invisible lo importante?",
   opts:["Infoxicación","Infodemia controlada","Curación de contenidos","Alfabetización digital"], right:0,
   exp:"La infoxicación es la sobrecarga de información. La curación de contenidos es justamente la respuesta para organizarla y filtrarla."},
  {tipo:"orden", tema:"Tema 1 · Curación de contenidos", titulo:"Las cinco fases de la curación",
   q:"Ordene las fases del proceso de curación de contenidos, de la primera a la última.",
   steps:["Búsqueda: localizar fuentes relevantes","Selección: filtrar por calidad y relevancia","Evaluación: analizar la validez científica","Organización: estructurar y sintetizar el contenido","Difusión: compartir con la audiencia adecuada"],
   exp:"Buscar, seleccionar, evaluar, organizar y difundir: así el curador transforma información dispersa en conocimiento útil."},
  {tipo:"empareja", tema:"Tema 1 · Curación de contenidos", titulo:"¿Qué criterio falla?",
   q:"Cada situación muestra un problema en una fuente. Elija el criterio de evaluación que NO se cumple.",
   pares:[["El artículo sobre vacunas no indica quién lo escribió ni qué institución lo respalda.","Autoría"],
          ["La guía de manejo de heridas es de 2009 y existe una versión de 2023.","Actualización"],
          ["Busca información para pacientes adultos mayores y el texto trata sobre neonatos.","Relevancia"],
          ["El blog afirma que el jengibre cura la hipertensión, sin estudios ni referencias.","Rigor científico"],
          ["El folleto para pacientes está lleno de términos técnicos que ellos no entienden.","Claridad y accesibilidad"]],
   exp:"Autoría, actualización, relevancia, rigor científico y claridad son los cinco criterios para evaluar un contenido."},
  {tipo:"clasifica", tema:"Tema 1 · Curación de contenidos", titulo:"Ordenando la caja de herramientas",
   q:"Clasifique cada herramienta según su función.",
   categorias:["Buscador académico","Base de datos bibliográfica","Verificación de hechos"],
   items:[["Google Scholar",0],["PubMed",0],["Scopus",1],["Web of Science",1],["Snopes",2],["FactCheck.org",2]],
   exp:"PubMed está especializado en ciencias de la salud; Web of Science permite analizar citaciones; Snopes y FactCheck.org verifican rumores y afirmaciones públicas."},
  {tipo:"caso", tema:"Tema 1 · Curación de contenidos", titulo:"La enfermera curadora",
   ctx:["En su servicio circula por WhatsApp un video viral que recomienda poner pasta dental en las quemaduras. La jefa le pide preparar material confiable para el equipo y los pacientes."],
   preguntas:[
    {q:"¿Qué fuente debería consultar primero para elaborar el material?", opts:["Una guía de práctica clínica de una sociedad científica o un organismo oficial (OMS, MSP)","El video con más reproducciones sobre el tema","Los comentarios de otros pacientes en redes sociales","Un blog de remedios caseros con muchos seguidores"], right:0,
     exp:"Las instituciones de salud y las sociedades científicas generan información basada en evidencia y consensos."},
    {q:"Al preparar el material, ¿qué rol está cumpliendo como curadora de contenidos?", opts:["Mediadora entre el conocimiento científico y las necesidades del contexto asistencial","Recopiladora de todo lo que circula en internet","Censora de las redes sociales del hospital","Productora de videos virales"], right:0,
     exp:"El curador no es un mero recopilador: es un analista crítico con responsabilidad ética, garante de la calidad y agente de mejora."},
    {q:"¿Qué plataforma le ayudaría a confirmar si el video ya fue desmentido?", opts:["Snopes o FactCheck.org","Scopus","RStudio","Google Meet"], right:0,
     exp:"Las plataformas de verificación de hechos analizan rumores y noticias falsas ampliamente difundidas."}]},
  {tipo:"sopa", tema:"Tema 1 · Curación de contenidos", titulo:"Sopa del curador",
   palabras:[["INFOXICACION","Sobrecarga de información que hace invisible lo importante."],["CURADOR","Profesional que investiga, filtra y comparte el contenido más valioso."],["AUTORIA","Criterio que pregunta quién escribió el contenido."],["RIGOR","___ científico: que la información esté respaldada por evidencia."],["PUBMED","Buscador especializado en ciencias de la salud y biomedicina."],["SCOPUS","Una de las bases de datos bibliográficas más amplias del mundo."],["SNOPES","Plataforma que verifica rumores y noticias falsas."],["DIFUSION","Última fase de la curación: compartir con la audiencia adecuada."],["EVIDENCIA","La práctica basada en la ___ reduce la variabilidad clínica."],["ETICA","Pilar que exige respetar la dignidad y los derechos de los pacientes."]]},

  // ---------- Tema 2: Salud digital ----------
  {tipo:"mc", tema:"Tema 2 · Salud digital (eHealth)", titulo:"¿Qué es la eSalud?",
   q:"¿Cuál es la definición más precisa de salud digital o eSalud?",
   opts:["La aplicación de las tecnologías de la información y la comunicación en salud para mejorar la atención y los sistemas sanitarios","El uso de redes sociales por parte de los hospitales","La venta de medicamentos por internet","La digitalización de las facturas del hospital"], right:0,
   exp:"La eSalud aplica las TIC para mejorar la atención y los sistemas sanitarios: HCE, telemedicina, apps y análisis de datos."},
  {tipo:"empareja", tema:"Tema 2 · Salud digital (eHealth)", titulo:"Herramientas de la salud digital",
   q:"Relacione cada necesidad con la herramienta digital que la resuelve.",
   pares:[["Centralizar toda la información clínica del paciente de forma accesible y segura","Historia Clínica Electrónica"],
          ["Hacer el control de un paciente que vive en una zona rural sin que viaje","Telemedicina"],
          ["Que el paciente registre su glucemia y reciba recordatorios de su tratamiento","Aplicaciones móviles de salud"],
          ["Gestionar camas, turnos e insumos de todo el hospital","Sistema de Información Hospitalaria (HIS)"],
          ["Procesar datos para tomar decisiones clínicas basadas en evidencia","Plataformas de análisis de datos"]],
   exp:"Cada herramienta responde a una necesidad distinta; juntas forman el ecosistema de salud digital."},
  {tipo:"vf", tema:"Tema 2 · Salud digital (eHealth)", titulo:"El Manual de Salud Digital del MSP",
   q:"Indique si cada afirmación sobre el Manual de Salud Digital del Ministerio de Salud Pública del Ecuador es verdadera o falsa.",
   items:[["Uno de sus objetivos es promover la equidad, reduciendo brechas entre zonas urbanas y rurales.",true,"Busca que las tecnologías estén disponibles en todas las regiones."],
          ["El manual propone digitalizar los registros médicos para optimizar la gestión de recursos.",true,""],
          ["La capacitación del personal de salud no forma parte de sus estrategias.",false,"La capacitación y formación continua es su primera estrategia de implementación."],
          ["Incluye políticas para la protección de datos y la privacidad de los pacientes.",true,"Es parte de las estrategias de políticas y regulaciones."],
          ["Propone trabajar solo con el sector público, sin alianzas privadas ni internacionales.",false,"Fomenta la cooperación público-privada y las alianzas internacionales."],
          ["La reducción de costos operativos y administrativos es uno de los beneficios esperados.",true,""]]},
  {tipo:"caso", tema:"Tema 2 · Telemedicina y teleenfermería", titulo:"Teleenfermería y diabetes",
   ctx:["Doña Rosa, de 67 años, vive con diabetes tipo 2 en una parroquia rural a 3 horas del hospital. El centro de salud inicia un programa de teleenfermería para su seguimiento."],
   preguntas:[
    {q:"¿Cuál es la principal ventaja del programa para doña Rosa?", opts:["Seguimiento continuo sin necesidad de viajar, con educación y detección temprana de complicaciones","Elimina la necesidad de controles presenciales para siempre","Reemplaza al personal de enfermería por una aplicación","Permite que ella misma ajuste la dosis de insulina sin supervisión"], right:0,
     exp:"La teleenfermería mejora el acceso y la continuidad del cuidado, pero no reemplaza la valoración presencial cuando se necesita."},
    {q:"Doña Rosa no sabe usar el teléfono inteligente. ¿Qué desafío de la salud digital aparece?", opts:["La brecha y alfabetización digital","La interoperabilidad semántica","La infoxicación","La asimetría negativa"], right:0,
     exp:"La infraestructura tecnológica y las competencias digitales del usuario son desafíos que hay que resolver con capacitación y apoyo del cuidador."},
    {q:"¿Qué debe garantizar la enfermera al registrar las glucemias que doña Rosa envía?", opts:["La confidencialidad y seguridad de los datos clínicos","Que los datos se compartan en el grupo de WhatsApp del barrio","Que solo se guarden en su celular personal","Que la paciente no tenga acceso a sus propios datos"], right:0,
     exp:"La seguridad de la información y la privacidad del paciente son condiciones para una salud digital responsable."}]},

  // ---------- Tema 3: Herramientas audiovisuales ----------
  {tipo:"clasifica", tema:"Tema 3 · Herramientas audiovisuales", titulo:"Audio, video y conferencias",
   q:"Clasifique cada plataforma según el tipo de herramienta audiovisual.",
   categorias:["Videoconferencia","Videos educativos","Audioconferencia"],
   items:[["Zoom",0],["Microsoft Teams",0],["Google Meet",0],["YouTube",1],["Vimeo",1],["Skype (llamada de voz)",2],["WhatsApp (nota o llamada de voz)",2]],
   exp:"Las videoconferencias permiten clases y reuniones en vivo; los videos educativos se consultan en cualquier momento; las audioconferencias sirven para discusiones solo con voz."},
  {tipo:"mc", tema:"Tema 3 · Herramientas audiovisuales", titulo:"Grabar para enseñar",
   q:"Quiere grabar en video la curación de una úlcera de un paciente para capacitar al personal nuevo. ¿Qué es lo primero que debe hacer?",
   opts:["Obtener el consentimiento informado del paciente y evitar que sea identificable","Grabar con su celular personal y subirlo a YouTube","Grabar sin avisar para que la técnica se vea natural","Pedir permiso solo a la jefa del servicio"], right:0,
   exp:"La documentación audiovisual exige consentimiento, protección de la identidad y almacenamiento seguro: la seguridad de la información es un desafío clave."},
  {tipo:"vf", tema:"Tema 3 · Herramientas audiovisuales", titulo:"Beneficios y desafíos",
   items:[["Las tecnologías audiovisuales facilitan la comprensión de conceptos complejos mediante representaciones visuales y auditivas.",true,""],
          ["Mejoran la accesibilidad para personas con discapacidad auditiva o visual (subtítulos, audio descripciones).",true,""],
          ["Una vez instalada la plataforma, el personal ya no necesita capacitación.",false,"La capacitación continua en competencias digitales es uno de los desafíos a superar."],
          ["El acceso desigual a dispositivos y conectividad es un desafío para su implementación.",true,""],
          ["Los estudiantes solo pueden ver el material educativo en horario de clase.",false,"Una ventaja es la flexibilidad: acceder en cualquier momento y lugar."]]},

  // ---------- Tema 4: Estadística descriptiva ----------
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"La media del turno",
   ctx:["Durante un turno se registró la frecuencia respiratoria (rpm) de 7 pacientes:"],
   tabla:[["Paciente","1","2","3","4","5","6","7"],["FR (rpm)","16","18","20","22","18","24","22"]],
   q:"¿Cuál es la media de la frecuencia respiratoria?", answer:20, tol:0.05, unidad:"rpm",
   pista:"Sume los 7 valores y divida entre 7.",
   exp:"16 + 18 + 20 + 22 + 18 + 24 + 22 = 140; 140 ÷ 7 = 20 rpm."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"Horas de atención",
   ctx:["Durante una semana se registraron las horas de atención diarias del personal de enfermería: 6, 7, 8, 6, 9 y 10 horas."],
   q:"Calcule la media (con dos decimales).", answer:7.67, tol:0.02, unidad:"horas",
   pista:"La suma es 46.",
   exp:"46 ÷ 6 = 7,67 horas."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"La mediana en emergencias",
   ctx:["Tiempos de espera (minutos) de 6 pacientes antes de ser atendidos en emergencias: 12, 18, 20, 25, 30 y 45."],
   q:"¿Cuál es la mediana?", answer:22.5, tol:0.05, unidad:"minutos",
   pista:"Con un número par de datos, la mediana es el promedio de los dos valores centrales.",
   exp:"Los valores centrales son 20 y 25: (20 + 25) ÷ 2 = 22,5 minutos."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"El paciente que se quedó 30 días",
   ctx:["Días de hospitalización de 7 pacientes de medicina interna: 3, 8, 2, 5, 4, 30, 6."],
   q:"¿Cuál es la mediana de los días de estancia?", answer:5, tol:0.01, unidad:"días",
   pista:"Primero ordene los datos de menor a mayor.",
   exp:"Ordenados: 2, 3, 4, 5, 6, 8, 30. El valor central es 5. La media sería 8,3 por el paciente de 30 días: con valores extremos, la mediana representa mejor la estancia típica."},
  {tipo:"mc", tema:"Tema 4 · Estadística descriptiva", titulo:"El diagnóstico más frecuente",
   q:"En un centro de atención primaria se registraron estos diagnósticos: asma, hipertensión, diabetes, hipertensión, asma, hipertensión. ¿Cuál es la moda?",
   opts:["Hipertensión","Asma","Diabetes","No hay moda porque los datos no son números"], right:0,
   exp:"La moda es el valor más frecuente (hipertensión aparece 3 veces) y es útil para datos cualitativos como los diagnósticos."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"Rango de saturación",
   tabla:[["Paciente","1","2","3","4","5","6","7","8","9","10"],["SatO₂ (%)","97","92","95","98","89","96","94","91","97","95"]],
   q:"Calcule el rango de la saturación de oxígeno.", answer:9, tol:0.01, unidad:"puntos %",
   pista:"Rango = valor máximo − valor mínimo.",
   exp:"98 − 89 = 9 puntos porcentuales."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"Varianza paso a paso",
   ctx:["Horas de sueño reportadas por 4 pacientes: 1, 3, 5 y 7. La media es 4."],
   q:"Calcule la varianza (diferencias al cuadrado respecto a la media, divididas entre el número de datos).", answer:5, tol:0.01,
   pista:"(1−4)² = 9; (3−4)² = 1; (5−4)² = 1; (7−4)² = 9.",
   exp:"(9 + 1 + 1 + 9) ÷ 4 = 20 ÷ 4 = 5."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"Desviación estándar",
   ctx:["Con los mismos datos, la varianza es 5."],
   q:"¿Cuál es la desviación estándar? (dos decimales)", answer:2.24, tol:0.02, unidad:"horas",
   pista:"Es la raíz cuadrada de la varianza.",
   exp:"√5 ≈ 2,24 horas: en promedio, los datos se alejan 2,24 horas de la media."},
  {tipo:"mc", tema:"Tema 4 · Estadística descriptiva", titulo:"Percentiles en pediatría",
   q:"El peso de un niño está en el percentil 80 para su edad. ¿Qué significa?",
   opts:["Su peso es mayor o igual que el del 80 % de los niños de su edad","Pesa el 80 % de lo que debería pesar","Tiene 80 % de probabilidad de obesidad","Está en el 20 % más bajo de su grupo"], right:0,
   exp:"El percentil indica el porcentaje de datos que quedan por debajo: solo el 20 % de los niños de su edad pesa más."},
  {tipo:"mc", tema:"Tema 4 · Estadística descriptiva", titulo:"La cola larga",
   q:"La mayoría de pacientes se queda 3 a 5 días, pero unos pocos se quedan más de 20, formando una cola larga hacia la derecha. ¿Qué tipo de asimetría tiene la distribución?",
   opts:["Asimetría positiva (sesgo a la derecha)","Asimetría negativa (sesgo a la izquierda)","Asimetría nula","No se puede saber sin RStudio"], right:0,
   exp:"Cuando la cola derecha es más larga, la asimetría es positiva y la media queda por encima de la mediana."},
  {tipo:"calc", tema:"Tema 4 · Estadística descriptiva", titulo:"Cuartiles: el segundo",
   ctx:["Tiempos de espera ordenados (minutos): 10, 15, 20, 25, 30, 35, 40, 45."],
   q:"¿Cuál es el segundo cuartil (Q2)?", answer:27.5, tol:0.05, unidad:"minutos",
   pista:"Q2 es la mediana.",
   exp:"Q2 = (25 + 30) ÷ 2 = 27,5: el 50 % de los pacientes esperó 27,5 minutos o menos."},
  {tipo:"caso", tema:"Tema 4 · Estadística en la práctica clínica", titulo:"Glucemias en ayunas",
   ctx:["Glucemia en ayunas (mg/dL) de 9 pacientes: 95, 110, 102, 95, 130, 88, 95, 120, 105."],
   preguntas:[
    {q:"¿Cuál es la media (aproximada)?", opts:["104,4 mg/dL","102 mg/dL","95 mg/dL","110 mg/dL"], right:0, exp:"La suma es 940; 940 ÷ 9 = 104,4 mg/dL."},
    {q:"¿Cuál es la mediana?", opts:["102 mg/dL","104,4 mg/dL","95 mg/dL","105 mg/dL"], right:0, exp:"Ordenados: 88, 95, 95, 95, 102, 105, 110, 120, 130. El quinto valor es 102."},
    {q:"¿Cuál es la moda?", opts:["95 mg/dL","88 mg/dL","130 mg/dL","No hay moda"], right:0, exp:"95 se repite 3 veces."}]},
  {tipo:"calc", tema:"Tema 4 · Estadística en la práctica clínica", titulo:"El IMC de don Luis",
   ctx:["Don Luis pesa 72 kg y mide 1,70 m."],
   q:"Calcule su índice de masa corporal (un decimal).", answer:24.9, tol:0.06, unidad:"kg/m²",
   pista:"IMC = peso ÷ talla².",
   exp:"1,70² = 2,89; 72 ÷ 2,89 = 24,9 kg/m² (normal, cerca del límite de sobrepeso)."},

  // ---------- RStudio ----------
  {tipo:"orden", tema:"Tema 4 · RStudio", titulo:"Instalando RStudio",
   q:"Ordene los pasos para instalar y empezar a usar RStudio.",
   steps:["Entrar a cran.r-project.org y descargar R","Instalar R con las opciones por defecto","Entrar a posit.co y descargar RStudio Desktop","Instalar y abrir RStudio para trabajar"],
   exp:"Primero se instala R y después RStudio, porque RStudio usa R para hacer los cálculos."},
  {tipo:"codigo", tema:"Tema 4 · RStudio", titulo:"Creando un vector",
   ctx:["Para guardar varios datos en RStudio se usa una función que los une en un vector."],
   q:"Complete el código para guardar tres frecuencias cardíacas:", code:"> fc <- ____(72, 80, 76)", answers:["c"],
   pista:"Es una sola letra.", exp:"c() une los valores y <- les asigna un nombre."},
  {tipo:"codigo", tema:"Tema 4 · RStudio", titulo:"La media en R",
   ctx:["Frecuencia respiratoria de 7 pacientes guardada en el vector fr."],
   q:"Complete la función que calcula la media:", code:"> fr <- c(16, 18, 20, 22, 18, 24, 22)\n> ____(fr)", answers:["mean"],
   salida:"[1] 20", pista:"En inglés, «media» se dice…", exp:"mean() calcula la media."},
  {tipo:"codigo", tema:"Tema 4 · RStudio", titulo:"La mediana en R",
   q:"Complete la función que calcula la mediana de los días de estancia:", code:"> estancia <- c(3, 8, 2, 5, 4, 30, 6)\n> ____(estancia)", answers:["median"],
   salida:"[1] 5", exp:"median() devuelve el valor central de los datos ordenados."},
  {tipo:"codigo", tema:"Tema 4 · RStudio", titulo:"Buscando la moda",
   ctx:["R no tiene una función propia para la moda: se cuenta cuántas veces aparece cada valor."],
   q:"Complete la función que cuenta las repeticiones de la escala de dolor:", code:"> dolor <- c(3, 5, 5, 7, 5, 2, 8, 5, 3, 7)\n> ____(dolor)", answers:["table"],
   salida:"dolor\n2 3 5 7 8\n1 2 4 2 1", exp:"table() cuenta las frecuencias: el 5 aparece 4 veces, así que la moda es 5."},
  {tipo:"codigo", tema:"Tema 4 · RStudio", titulo:"Seis medidas de una vez",
   q:"Complete la función que muestra mínimo, cuartiles, mediana, media y máximo en un solo paso:", code:"> pas <- c(120, 135, 110, 142, 128, 150, 118, 125)\n> ____(pas)", answers:["summary"],
   salida:"   Min. 1st Qu.  Median    Mean 3rd Qu.    Max.\n  110.0   119.5   126.5   128.5   136.8   150.0", exp:"summary() da 6 medidas a la vez."},
  {tipo:"empareja", tema:"Tema 4 · RStudio", titulo:"¿Qué gráfico necesito?",
   q:"Relacione cada necesidad con la función de RStudio que crea el gráfico adecuado.",
   pares:[["Contar pacientes por servicio (Medicina, Cirugía, Pediatría)","barplot(table(servicio))"],
          ["Ver cómo se reparten las temperaturas de los pacientes","hist(temp)"],
          ["Ver la mediana, los extremos y los valores atípicos de la saturación","boxplot(sat)"],
          ["Seguir la frecuencia cardíaca de un paciente hora por hora","plot(fc, type = \"l\")"]],
   exp:"Barras para categorías, histograma para distribución de datos numéricos, caja para mediana y atípicos, y líneas para la evolución en el tiempo."},
  {tipo:"caso", tema:"Tema 4 · RStudio", titulo:"Taller de signos vitales",
   ctx:["Temperatura (°C) de 10 pacientes: 36,5 · 38,2 · 37,0 · 36,8 · 39,1 · 36,5 · 37,4 · 38,0 · 36,5 · 37,2.","SatO₂ (%): 97 · 92 · 95 · 98 · 89 · 96 · 94 · 91 · 97 · 95."],
   preguntas:[
    {q:"¿Qué código cuenta cuántos pacientes tienen fiebre (38 °C o más)?", opts:["sum(temp >= 38)","mean(temp >= 38)","table(38)","count(temp)"], right:0, exp:"sum() cuenta los valores que cumplen la condición."},
    {q:"¿Cuántos pacientes tienen fiebre?", opts:["3","2","4","5"], right:0, exp:"38,2; 39,1 y 38,0."},
    {q:"¿Cuál es la moda de la temperatura?", opts:["36,5 °C","37,0 °C","38,0 °C","No hay moda"], right:0, exp:"36,5 °C aparece 3 veces."},
    {q:"¿Cuántos pacientes tienen SatO₂ menor a 92 %?", opts:["2","1","3","4"], right:0, exp:"89 % y 91 %. sum(sat < 92) devuelve 2."}]},
  {tipo:"cruci", tema:"Repaso de la Unidad 2", titulo:"Crucigrama de la Unidad 2",
   palabras:[["MEDIANA","Valor central de los datos ordenados; no la afectan los valores extremos."],["MODA","Valor que más se repite."],["RANGO","Máximo menos mínimo."],["VARIANZA","Promedio de las diferencias al cuadrado respecto a la media."],["PERCENTIL","Divide los datos ordenados en 100 partes iguales."],["CUARTIL","Divide los datos ordenados en 4 partes iguales."],["TELEMEDICINA","Consultas y seguimientos a distancia."],["CURACION","Proceso de buscar, filtrar, organizar y compartir contenido de valor."],["RSTUDIO","Programa gratuito para organizar datos, hacer estadística y gráficos."],["HISTOGRAMA","Gráfico que muestra cómo se reparten los datos numéricos, como la temperatura."]]},
  {tipo:"eval", titulo:"Evaluación del Pabellón de Salud Digital", n:5, minimo:4,
   banco:[
    {q:"¿Qué medida de tendencia central conviene usar para el tiempo de espera cuando hay valores extremos?", opts:["Mediana","Media","Rango","Varianza"], right:0, exp:"La mediana no se ve afectada por valores atípicos."},
    {q:"¿Qué expresa la desviación estándar?", opts:["La dispersión de los datos en las mismas unidades que los valores originales","El valor más frecuente","El valor central","La diferencia entre máximo y mínimo"], right:0, exp:"Es la raíz cuadrada de la varianza."},
    {q:"¿Qué criterio de evaluación revisa la fecha de publicación y vigencia de un contenido?", opts:["Actualización","Autoría","Relevancia","Claridad"], right:0, exp:"La actualización verifica que la información esté vigente."},
    {q:"¿Cuál es una base de datos bibliográfica que permite analizar citaciones?", opts:["Web of Science","Snopes","YouTube","Google Meet"], right:0, exp:"Web of Science ofrece literatura de alto impacto y análisis de citaciones."},
    {q:"¿Cuál NO es un objetivo del Manual de Salud Digital del MSP?", opts:["Reemplazar la atención presencial por completo","Facilitar el acceso a servicios de salud de calidad","Promover la equidad en la atención","Fomentar la innovación tecnológica"], right:0, exp:"El manual busca ampliar el acceso, no eliminar la atención presencial."},
    {q:"En RStudio, ¿qué función crea un histograma?", opts:["hist()","barplot()","boxplot()","summary()"], right:0, exp:"hist() muestra cómo se distribuyen los datos numéricos."},
    {q:"Si la cola izquierda de la distribución es más larga, la asimetría es:", opts:["Negativa","Positiva","Nula","Bimodal"], right:0, exp:"Cola izquierda más larga: asimetría negativa."},
    {q:"¿Qué porcentaje de los datos queda por debajo del tercer cuartil (Q3)?", opts:["75 %","25 %","50 %","100 %"], right:0, exp:"Q1 = 25 %, Q2 = 50 % y Q3 = 75 %."},
    {q:"¿Qué es la infoxicación?", opts:["Sobrecarga de información que dificulta identificar lo importante","Un virus informático","Una intoxicación por medicamentos","Un tipo de base de datos"], right:0, exp:"Es el exceso de información que la curación ayuda a filtrar."},
    {q:"¿Qué ventaja de las herramientas audiovisuales favorece a personas con discapacidad auditiva o visual?", opts:["Accesibilidad","Infoxicación","Interoperabilidad","Asimetría"], right:0, exp:"Subtítulos y audiodescripción mejoran la accesibilidad."}]}
 ]
},
{
  "id": "u3",
  "nombre": "Unidad 3 · Redes sociales, teleenfermería y registros electrónicos",
  "pabellon": "Pabellón de Ética y Registros",
  "color": "#FF8A65",
  "estaciones": [
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "Una publicación de madrugada",
    "q": "Una enfermera de UCI publica: «Turno durísimo, perdimos a un paciente de 34 años del accidente de la Vía Perimetral 🙏». No incluye nombre ni foto. ¿Cuál es la valoración correcta?",
    "opts": [
     "Es aceptable, porque no hay datos identificativos directos.",
     "Es aceptable si su perfil es privado.",
     "Vulnera la confidencialidad, porque la edad, el evento y el lugar permiten identificar al paciente de forma indirecta.",
     "Solo es falta si la familia presenta una queja."
    ],
    "right": 2,
    "exp": "La identificación indirecta (edad, evento y lugar) también vulnera el secreto profesional."
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "Método SIFT",
    "q": "Ante una publicación de salud dudosa, el método SIFT propone cuatro pasos. ¿Qué significa la S?",
    "opts": [
     "Detenerse (Stop) antes de compartir o reaccionar",
     "Seleccionar la fuente con más seguidores",
     "Sintetizar el contenido",
     "Sospechar de todo lo que circula"
    ],
    "right": 0,
    "exp": "S: detenerse. I: investigar la fuente. F: buscar mejor cobertura en fuentes confiables. T: rastrear el origen de la afirmación."
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "El remedio milagroso",
    "q": "En un grupo de Facebook se recomienda un «remedio natural» para la diabetes y muchas personas dicen que lo probarán. ¿Cuál es la intervención más adecuada?",
    "opts": [
     "Denunciar el grupo y no comentar, para no darle visibilidad.",
     "Comentar identificándose como profesional, con lenguaje empático, explicando el riesgo de abandonar el tratamiento y enlazando a una fuente oficial (MSP, OPS o ADA).",
     "Publicar que quienes lo prueben ponen su vida en riesgo, para generar impacto.",
     "Escribir en privado a cada persona que dijo que lo probaría."
    ],
    "right": 1,
    "exp": "Corregir con evidencia, de forma no confrontacional y con fuentes oficiales es parte del deber de educación sanitaria."
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "El sándwich de la verdad",
    "q": "Va a corregir un mito de salud en redes. ¿Qué propone la técnica del «sándwich de la verdad»?",
    "opts": [
     "Empezar con el dato correcto, mencionar brevemente el mito y cerrar otra vez con el dato y una acción concreta",
     "Repetir el mito varias veces para desmentirlo",
     "Ignorar el mito para no darle visibilidad",
     "Publicar el mito con letras rojas"
    ],
    "right": 0,
    "exp": "Abrir y cerrar con la verdad evita reforzar el mito."
   },
   {
    "tipo": "vf",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "¿Correcto o falta?",
    "q": "Para cada situación, decida si la actuación es correcta o constituye una falta ética o legal.",
    "labels": [
     "Correcto",
     "Falta"
    ],
    "items": [
     [
      "Abrir con tu usuario la historia de un vecino hospitalizado en otro servicio para saber cómo sigue.",
      false,
      "Tener credenciales no autoriza el acceso: falta la relación asistencial. Además queda registrado en la auditoría."
     ],
     [
      "Acceder a la historia restringida de un paciente inconsciente en Emergencias, registrando en el sistema el motivo del acceso.",
      true,
      "Es un acceso de emergencia justificado por beneficencia, con trazabilidad. El paciente debe ser informado después."
     ],
     [
      "Enviar al WhatsApp del servicio la foto de una herida donde se ve la pulsera con el nombre del paciente.",
      false,
      "Expone datos identificativos en un canal no institucional y sin control de acceso."
     ],
     [
      "Publicar en tu perfil profesional una infografía sobre pie diabético citando guías del MSP.",
      true,
      "Es educación sanitaria basada en evidencia y sin datos de pacientes."
     ],
     [
      "Informar el diagnóstico al hijo de un paciente consciente y orientado sin consultarle a él.",
      false,
      "La información pertenece al paciente capaz. Se requiere su autorización."
     ],
     [
      "Cerrar la sesión abierta de un colega y registrar el signo vital con tu propio usuario.",
      true,
      "Mantiene la autoría del registro y evita que otro responda por tu intervención."
     ],
     [
      "Publicar: «Turno durísimo, perdimos al paciente de 34 años del accidente de la Perimetral».",
      false,
      "No hay nombre, pero la edad, el evento y el lugar permiten identificarlo de forma indirecta."
     ],
     [
      "Hacer una videoconsulta desde una cafetería con el altavoz del teléfono.",
      false,
      "Terceros pueden escuchar información clínica. La privacidad del entorno también es responsabilidad del profesional."
     ]
    ]
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "La foto que se volvió viral",
    "q": "Un paciente firmó el consentimiento para que se publicara su foto. Tres semanas después pide retirarla, pero ya fue compartida miles de veces. ¿Cuál es la afirmación más precisa?",
    "opts": [
     "El consentimiento firmado protege totalmente a la enfermera y no está obligada a hacer nada.",
     "El consentimiento es revocable: debe retirar la publicación de inmediato y documentar la acción, aunque no pueda controlar las copias de terceros.",
     "Debe retirarla solo si el paciente demuestra un daño.",
     "Basta con editar la publicación y desenfocar la cara."
    ],
    "right": 1,
    "exp": "El consentimiento es revocable en cualquier momento. La enfermera responde por su publicación, aunque no controle las copias de terceros."
   },
   {
    "tipo": "orden",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "Control de daños",
    "q": "Una publicación suya con un paciente se vuelve viral y él pide retirarla. Ordene los pasos.",
    "steps": [
     "Retirar la publicación de inmediato: el consentimiento es revocable.",
     "Conversar con el paciente, ofrecer disculpas y escuchar su preocupación.",
     "Informar a la jefatura o al comité de ética de la institución.",
     "Solicitar a la plataforma la eliminación de copias o capturas difundidas.",
     "Documentar lo actuado y revisar la política institucional de uso de redes."
    ],
    "exp": "El consentimiento es revocable: lo primero es retirar la publicación y lo último, documentar y aprender."
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Redes sociales para profesionales de la salud",
    "titulo": "Perfil con 80 000 seguidores",
    "q": "Una enfermera con 80 000 seguidores critica en su cuenta personal la gestión del hospital donde trabaja. ¿Cuál es la postura más adecuada?",
    "opts": [
     "Debe cerrar la cuenta de inmediato.",
     "Puede opinar, pero sin revelar datos de pacientes ni información interna reservada, y dejando claro que habla a título personal.",
     "Puede publicar lo que quiera porque es su cuenta personal.",
     "Solo puede publicar si la dirección aprueba cada publicación."
    ],
    "right": 1,
    "exp": "No pierde su libertad de expresión, pero el secreto profesional y el deber de reserva sobre información institucional siguen vigentes en redes."
   },
   {
    "tipo": "sopa",
    "tema": "Repaso de los Temas 3 y 4",
    "titulo": "Sopa de la ética digital",
    "palabras": [
     [
      "TELEENFERMERIA",
      "Cuidado enfermero brindado a distancia con apoyo de las TIC."
     ],
     [
      "TELEMONITOREO",
      "Seguimiento remoto de glucemia, peso o presión con dispositivos conectados."
     ],
     [
      "CONSENTIMIENTO",
      "Se obtiene antes de publicar la imagen de un paciente y puede revocarse en cualquier momento."
     ],
     [
      "AUTENTICACION",
      "Verifica que quien entra al RSE es realmente quien dice ser."
     ],
     [
      "INTEROPERABLE",
      "Así debe ser un RSE para que la alergia registrada en el centro de salud aparezca en el hospital."
     ],
     [
      "BRECHADIGITAL",
      "Desigualdad en acceso a internet y dispositivos (dos palabras, juntas)."
     ],
     [
      "TRAZABILIDAD",
      "Permite reconstruir quién hizo qué, cuándo y por qué durante el cuidado."
     ],
     [
      "CONFIDENCIAL",
      "Información que solo conocen quienes participan en la atención del paciente."
     ],
     [
      "AUDITORIA",
      "Revela que 19 personas sin relación asistencial abrieron la historia de un paciente."
     ],
     [
      "PRIVACIDAD",
      "Derecho del paciente a decidir quién conoce sus datos de salud."
     ],
     [
      "ENMIENDA",
      "Forma correcta de corregir una dosis mal registrada sin borrar el original."
     ],
     [
      "CIFRADO",
      "Vuelve ilegibles los datos de una laptop perdida para quien no tiene la clave."
     ]
    ]
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Teleenfermería",
    "titulo": "Lo que la cámara no muestra",
    "q": "¿Cuál de estos hallazgos es menos fiable de valorar por videoconsulta y exige una estrategia alternativa?",
    "opts": [
     "Patrón respiratorio y uso de músculos accesorios.",
     "Estado de conciencia y orientación.",
     "Edema con fóvea y llenado capilar.",
     "Adherencia referida al tratamiento."
    ],
    "right": 2,
    "exp": "El edema con fóvea y el llenado capilar requieren exploración táctil. Es la principal limitación de la valoración a distancia."
   },
   {
    "tipo": "mc",
    "tema": "Tema 3 · Teleenfermería",
    "titulo": "Diabetes sin internet",
    "q": "Un hospital rural quiere telemonitorear a pacientes diabéticos, pero muchos no tienen internet estable. ¿Qué propuesta respeta mejor la equidad?",
    "opts": [
     "Postergar el programa hasta que haya cobertura de internet.",
     "Incluir solo a los pacientes con smartphone y conexión estable.",
     "Un modelo híbrido: SMS o llamada para reportar glucemias, visitas domiciliarias de apoyo y cuidadores capacitados como enlace.",
     "Entregar tablets a todos los pacientes sin capacitación previa."
    ],
    "right": 2,
    "exp": "El modelo híbrido adapta la tecnología al contexto y no excluye a los pacientes más vulnerables."
   },
   {
    "tipo": "caso",
    "tema": "Tema 3 · Teleenfermería",
    "titulo": "La alerta de las 3 a. m.",
    "ctx": [
     "Usted coordina un programa de telemonitoreo de pacientes con insuficiencia cardíaca y de recuperación posquirúrgica."
    ],
    "preguntas": [
     {
      "q": "Un paciente con insuficiencia cardíaca en telemonitoreo sube 2,1 kg en 48 horas. Por videollamada refiere «solo un poco de cansancio». ¿Cuál es la conducta prioritaria?",
      "opts": [
       "Registrar el dato y revalorar en la próxima videollamada.",
       "Reforzar la educación sobre la restricción de sodio.",
       "Reconocer un signo de descompensación y escalar según el protocolo, aunque el síntoma subjetivo sea leve.",
       "Pedirle que se vuelva a pesar mañana para confirmar."
      ],
      "right": 2,
      "exp": "Un aumento de más de 1 kg en 24 h o de unos 2 kg en pocos días es signo de alarma. El dato objetivo pesa más que el síntoma leve."
     },
     {
      "q": "Una IA clasifica como «riesgo bajo» a un paciente posquirúrgico. Por videollamada, la enfermera nota palidez, diaforesis y respuestas lentas. ¿Qué debe hacer?",
      "opts": [
       "Seguir la clasificación del algoritmo, que está validado con miles de casos.",
       "Priorizar su juicio clínico, escalar la atención y documentar la discrepancia con el sistema.",
       "Esperar la próxima lectura automática para confirmar.",
       "Pedir a otra enfermera que revise el algoritmo."
      ],
      "right": 1,
      "exp": "La IA es una herramienta de apoyo. El juicio clínico y la responsabilidad son del profesional (evitar el sesgo de automatización)."
     }
    ]
   },
   {
    "tipo": "orden",
    "tema": "Tema 3 · Teleenfermería",
    "titulo": "Protocolo de telemonitoreo",
    "q": "Un paciente con insuficiencia cardíaca sube 2 kg en 48 horas. Ordene la respuesta de enfermería.",
    "steps": [
     "Verificar que el dato sea fiable: dispositivo, hora y condiciones de la medición.",
     "Contactar al paciente y valorar signos de alarma (disnea, ortopnea, edema, diuresis).",
     "Aplicar el protocolo de escalamiento y comunicar el caso al médico tratante.",
     "Ejecutar la conducta indicada: valoración presencial o ajuste del tratamiento.",
     "Documentar en el RSE la alerta, la valoración, la comunicación y la conducta.",
     "Programar el seguimiento y reforzar la educación sobre autocontrol del peso."
    ],
    "exp": "Verificar, valorar, escalar, actuar, documentar y dar seguimiento."
   },
   {
    "tipo": "caso",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "Don Juan Pérez, cama 12",
    "ctx": [
     "Juan Pérez, 68 años, ingresa por neumonía. Antecedentes: HTA y diabetes tipo 2. Refiere disnea, tos productiva, fiebre de 38,5 °C y dolor torácico leve."
    ],
    "preguntas": [
     {
      "q": "La alergia a la penicilina de un paciente consta en el sistema de su centro de salud, pero no aparece en el hospital de otra red, donde le administran amoxicilina. ¿Qué característica del RSE falló?",
      "opts": [
       "Accesibilidad",
       "Interoperabilidad",
       "Cifrado",
       "Autenticación"
      ],
      "right": 1,
      "exp": "Los datos existían, pero no se compartieron entre sistemas distintos."
     },
     {
      "q": "¿Qué registro demuestra mejor la evaluación dentro del proceso de atención de enfermería?",
      "opts": [
       "«Se administró paracetamol 1 g IV a las 10:00.»",
       "«Paciente con riesgo de caídas.»",
       "«A las 11:00, T° 37,2 °C (antes 38,5 °C). Objetivo de termorregulación alcanzado parcialmente; se mantiene el plan.»",
       "«Paciente tranquilo.»"
      ],
      "right": 2,
      "exp": "Compara el resultado con el objetivo y decide sobre el plan: eso define la evaluación."
     },
     {
      "q": "Juan Pérez, 68 años, con neumonía, refiere dolor torácico leve. ¿Cuál es el registro más correcto?",
      "opts": [
       "«Paciente con dolor torácico leve, sin importancia.»",
       "«Paciente ansioso por el dolor.»",
       "«Refiere dolor torácico 3/10 (EVA), punzante, en hemitórax derecho, que aumenta con la tos. FC 98, SatO₂ 92 % con O₂ a 2 L/min. Se informa al médico de turno a las 14:20.»",
       "«Dolor torácico. Se administra analgesia.»"
      ],
      "right": 2,
      "exp": "Es objetivo y medible, incluye hallazgos asociados, hora y comunicación al equipo."
     }
    ]
   },
   {
    "tipo": "error",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "La nota del turno vespertino",
    "q": "Revise esta nota de enfermería de Juan Pérez y marque los errores de registro.",
    "meta": "NOTA DE ENFERMERÍA · Medicina Interna · Cama 12 · Turno vespertino",
    "segs": [
     {
      "t": "Paciente masculino de 68 años, con diagnóstico de neumonía adquirida en la comunidad; antecedentes de HTA y DM2.",
      "e": false
     },
     {
      "t": "Paciente se ve bien y tranquilo.",
      "e": true,
      "why": "Es una apreciación subjetiva: no describe hallazgos observables ni medibles (conciencia, patrón respiratorio, coloración)."
     },
     {
      "t": "14:00 · T° 38,5 °C, FC 98 lpm, FR 24 rpm, PA 138/84 mmHg, SatO₂ 92 % con O₂ por cánula nasal a 2 L/min.",
      "e": false
     },
     {
      "t": "Se deja registrada la ceftriaxona 1 g IV de las 16:00 para adelantar trabajo.",
      "e": true,
      "why": "Nunca se registra una intervención antes de realizarla. Si no se administra, el registro es falso y pone en riesgo al paciente."
     },
     {
      "t": "Refiere dolor torácico 3/10 (EVA), punzante, en hemitórax derecho, que aumenta con la tos.",
      "e": false
     },
     {
      "t": "Se informa al médico.",
      "e": true,
      "why": "Falta a quién, a qué hora, qué se informó y qué indicó. Sin esos datos no hay trazabilidad."
     },
     {
      "t": "Paracetamol: se borra «2 g» y se reemplaza por «1 g».",
      "e": true,
      "why": "No se borra un registro. Se hace una enmienda que conserve el original, con fecha, hora, motivo y firma."
     },
     {
      "t": "El hijo solicita información; se consulta al paciente, consciente y orientado, que autoriza informar solo su estado general.",
      "e": false
     },
     {
      "t": "Pte c/ NAC, s/p ATB, BIC OK.",
      "e": true,
      "why": "Abreviaturas no estandarizadas y ambiguas (por ejemplo, «s/p» puede leerse como «sin pauta» o «status post»). Generan errores de interpretación."
     },
     {
      "t": "Registrado con el usuario de la Lcda. Torres porque mi sesión estaba bloqueada.",
      "e": true,
      "why": "Cada registro debe hacerse con credenciales propias. Usar las de otra persona anula la autoría y la responsabilidad legal."
     },
     {
      "t": "Se eleva la cabecera a 45° y se enseña tos asistida; el paciente realiza la técnica correctamente.",
      "e": false
     }
    ]
   },
   {
    "tipo": "empareja",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "Del dato al diagnóstico",
    "q": "Segundo día de hospitalización de Juan Pérez. Relacione cada grupo de datos con la etiqueta diagnóstica NANDA.",
    "pares": [
     [
      "SatO₂ 86 %, FR 30 rpm, confusión de inicio reciente.",
      "Deterioro del intercambio de gases"
     ],
     [
      "Tos productiva con secreciones espesas que no logra expulsar; roncus en base derecha.",
      "Limpieza ineficaz de las vías aéreas"
     ],
     [
      "T° 38,5 °C, piel caliente al tacto, FC 98 lpm.",
      "Hipertermia"
     ],
     [
      "Refiere dolor torácico 3/10, punzante, que aumenta con la tos; expresión facial de dolor.",
      "Dolor agudo"
     ],
     [
      "DM2, infección activa, ingesta oral disminuida; glucemia actual 168 mg/dL.",
      "Riesgo de nivel de glucemia inestable"
     ],
     [
      "Pregunta para qué sirve el oxígeno y se retira la cánula al dormir.",
      "Conocimientos deficientes"
     ],
     [
      "68 años, DM2, catéter venoso periférico con 72 h de permanencia.",
      "Riesgo de infección"
     ],
     [
      "Refiere temor a «morir ahogado», está inquieto y pregunta varias veces por su familia.",
      "Ansiedad"
     ]
    ],
    "exp": "Las etiquetas siguen la denominación usual en español de NANDA-I."
   },
   {
    "tipo": "empareja",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "Del diagnóstico a la intervención",
    "q": "Ahora relacione cada diagnóstico NANDA con la intervención NIC prioritaria.",
    "pares": [
     [
      "Deterioro del intercambio de gases",
      "Oxigenoterapia"
     ],
     [
      "Limpieza ineficaz de las vías aéreas",
      "Mejorar la tos"
     ],
     [
      "Hipertermia",
      "Tratamiento de la fiebre"
     ],
     [
      "Dolor agudo",
      "Manejo del dolor"
     ],
     [
      "Riesgo de nivel de glucemia inestable",
      "Manejo de la hiperglucemia"
     ],
     [
      "Conocimientos deficientes",
      "Enseñanza: procedimiento/tratamiento"
     ],
     [
      "Riesgo de infección",
      "Mantenimiento de dispositivos de acceso venoso"
     ],
     [
      "Ansiedad",
      "Disminución de la ansiedad"
     ]
    ],
    "exp": "Las intervenciones siguen la denominación usual en español de la NIC."
   },
   {
    "tipo": "mc",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "La dosis equivocada",
    "q": "Registró 2 g de ceftriaxona cuando administró 1 g, y lo detecta dos horas después. ¿Cuál es el procedimiento correcto?",
    "opts": [
     "Borrar la entrada y escribirla de nuevo con el dato correcto.",
     "Pedir al administrador del sistema que elimine el registro.",
     "Hacer una enmienda sin eliminar el original, con fecha, hora, motivo e identificación; verificar si hubo impacto clínico y notificar según el protocolo.",
     "Dejarlo así, porque el paciente recibió la dosis correcta."
    ],
    "right": 2,
    "exp": "La integridad del registro exige conservar el original. La corrección también debe poder rastrearse."
   },
   {
    "tipo": "orden",
    "tema": "Tema 4 · Registros sanitarios electrónicos",
    "titulo": "Corregir sin borrar",
    "q": "Detecta que registró mal una dosis en el RSE. Ordene los pasos para corregirlo.",
    "steps": [
     "Detectar la discrepancia y verificar la dosis realmente administrada (orden médica, hoja de medicación, bomba).",
     "Valorar al paciente para descartar efectos por el error.",
     "Agregar una enmienda sin borrar ni sobrescribir el registro original.",
     "Indicar fecha, hora, motivo de la corrección y firmar con el usuario propio.",
     "Informar al médico o a la jefatura y notificar el evento según el protocolo de seguridad del paciente."
    ],
    "exp": "Nunca se borra el original: se enmienda con fecha, hora, motivo y firma."
   },
   {
    "tipo": "mc",
    "tema": "Tema 4 · Confidencialidad y privacidad",
    "titulo": "La ley ecuatoriana",
    "q": "Según la Ley Orgánica de Protección de Datos Personales del Ecuador (2021), los datos de salud son:",
    "opts": [
     "Datos públicos cuando el paciente se atiende en el sistema público.",
     "Datos sensibles, cuyo tratamiento exige mayores garantías.",
     "Datos anónimos por naturaleza.",
     "Datos de libre uso con fines de investigación."
    ],
    "right": 1,
    "exp": "La LOPDP clasifica los datos relativos a la salud como datos sensibles."
   },
   {
    "tipo": "caso",
    "tema": "Tema 4 · Confidencialidad y privacidad",
    "titulo": "Curiosos, sesiones abiertas y familiares",
    "ctx": [
     "Tres situaciones de un mismo turno en el servicio de Medicina Interna."
    ],
    "preguntas": [
     {
      "q": "Un colega deja su sesión del RSE abierta y usted necesita registrar con urgencia un signo vital. ¿Qué es lo correcto?",
      "opts": [
       "Registrar en la sesión abierta para no perder tiempo.",
       "Cerrar esa sesión, ingresar con su propio usuario y registrar; recordar al colega el cierre de sesión.",
       "Registrar en la sesión abierta y avisarle al colega después.",
       "Anotarlo en papel y que el colega lo transcriba."
      ],
      "right": 1,
      "exp": "Cada registro debe quedar firmado por quien lo realiza (autenticación y no repudio)."
     },
     {
      "q": "Una enfermera de consulta externa abre la historia de un vecino hospitalizado en otro servicio «solo para saber cómo está». Tiene credenciales válidas. ¿Cómo se valora?",
      "opts": [
       "Es lícito, porque tiene usuario autorizado.",
       "Es falta solo si divulga lo que leyó.",
       "Es un acceso indebido: se justifica por la relación asistencial, no por tener credenciales, y queda en la auditoría.",
       "Es aceptable si lo hace por preocupación genuina."
      ],
      "right": 2,
      "exp": "Tener permiso técnico no equivale a estar autorizado: falta la relación asistencial."
     },
     {
      "q": "El hijo de Juan Pérez exige ver el historial porque «es su papá y paga la cuenta». Juan está consciente y orientado. ¿Qué corresponde?",
      "opts": [
       "Mostrarle el historial, porque es familiar de primer grado.",
       "Negarse y llamar a seguridad.",
       "Explicar que la información pertenece al paciente, preguntar a Juan si autoriza y qué información, y derivar la información médica al profesional que corresponda.",
       "Darle un resumen verbal sin el diagnóstico."
      ],
      "right": 2,
      "exp": "La información pertenece al paciente capaz: se respeta su autonomía y el principio de mínimo necesario."
     }
    ]
   },
   {
    "tipo": "empareja",
    "tema": "Tema 4 · Confidencialidad y privacidad",
    "titulo": "Riesgo y medida",
    "q": "Relacione cada situación de riesgo con la medida de seguridad que la previene o resuelve.",
    "pares": [
     [
      "Alguien ingresa al RSE con una contraseña robada.",
      "Autenticación de doble factor"
     ],
     [
      "Se pierde una laptop con historias clínicas descargadas.",
      "Cifrado de datos"
     ],
     [
      "Personal ajeno al caso abre la historia de una figura pública.",
      "Auditoría de accesos"
     ],
     [
      "Un estudiante en rotación puede ver diagnósticos psiquiátricos que no necesita.",
      "Control de accesos por rol"
     ],
     [
      "La alergia registrada en el centro de salud no aparece en el hospital.",
      "Interoperabilidad de historias clínicas"
     ],
     [
      "El paciente pide retirar la foto suya que se publicó con su permiso.",
      "Revocación del consentimiento informado"
     ],
     [
      "La sesión queda abierta en la estación de enfermería durante horas.",
      "Cierre automático de sesión por inactividad"
     ]
    ],
    "exp": "Autenticación, cifrado, auditoría, control de accesos e interoperabilidad protegen la información del paciente."
   },
   {
    "tipo": "cruci",
    "tema": "Repaso de los Temas 3 y 4",
    "titulo": "Crucigrama de la Unidad 3",
    "palabras": [
     [
      "INTEGRIDAD",
      "Propiedad del registro que se pierde si se borra un dato en lugar de enmendarlo."
     ],
     [
      "REVOCABLE",
      "Así es el consentimiento que dio el paciente para publicar su imagen."
     ],
     [
      "ANONIMATO",
      "Debe mantenerse en toda publicación sobre un caso clínico."
     ],
     [
      "HIBRIDO",
      "Modelo de teleenfermería que combina llamadas, visitas y tecnología para no excluir a nadie."
     ],
     [
      "SECRETO",
      "Deber profesional que sigue vigente cuando la enfermera usa redes sociales."
     ],
     [
      "SOAPIE",
      "Formato de nota: subjetivo, objetivo, análisis, plan, intervención y evaluación."
     ],
     [
      "TRIAJE",
      "Clasificación de prioridad que también se hace a distancia."
     ],
     [
      "NANDA",
      "Taxonomía internacional de diagnósticos de enfermería."
     ],
     [
      "SESGO",
      "___ de automatización: confiar ciegamente en lo que dice la IA."
     ],
     [
      "FIRMA",
      "Elemento electrónico que identifica al autor de cada registro."
     ]
    ]
   },
   {
    "tipo": "eval",
    "titulo": "Evaluación del Pabellón de Ética y Registros",
    "n": 5,
    "minimo": 4,
    "banco": [
     {
      "q": "¿Qué término usó la OMS para la sobreabundancia de información, cierta o falsa, durante la pandemia?",
      "opts": [
       "Infodemia",
       "Infoxicación",
       "Desinformación controlada",
       "Viralización"
      ],
      "right": 0,
      "exp": "Infodemia; de ahí surgió la gestión de la infodemia."
     },
     {
      "q": "Un grupo cerrado de WhatsApp de colegas, ¿es un espacio confidencial para compartir casos con el nombre del paciente?",
      "opts": [
       "No: cualquiera puede hacer capturas; los casos deben anonimizarse por completo",
       "Sí, porque es un grupo cerrado",
       "Sí, si todos son profesionales de salud",
       "Sí, si se borra el mensaje después"
      ],
      "right": 0,
      "exp": "Los casos deben anonimizarse por completo."
     },
     {
      "q": "¿Qué tríada resume la seguridad de la información?",
      "opts": [
       "Confidencialidad, integridad y disponibilidad",
       "Cifrado, firma y contraseña",
       "Autoría, actualización y relevancia",
       "Media, mediana y moda"
      ],
      "right": 0,
      "exp": "Tríada CID."
     },
     {
      "q": "¿Qué diferencia hay entre «necesidad de conocer» y «mínimo privilegio»?",
      "opts": [
       "La primera limita el acceso a lo que se necesita para atender a ese paciente; la segunda da a cada rol solo los permisos indispensables",
       "Son sinónimos",
       "La primera es para médicos y la segunda para enfermeras",
       "La primera se aplica a papel y la segunda a sistemas"
      ],
      "right": 0,
      "exp": "Una se refiere a la persona y el caso; la otra, al diseño de permisos por rol."
     },
     {
      "q": "¿Qué falla si la alergia registrada en el centro de salud no aparece en el hospital?",
      "opts": [
       "Interoperabilidad",
       "Cifrado",
       "Autenticación",
       "Auditoría"
      ],
      "right": 0,
      "exp": "Los sistemas no compartieron los datos."
     },
     {
      "q": "¿Cómo se corrige un dato erróneo en el RSE?",
      "opts": [
       "Con una enmienda que conserva el original, con fecha, hora, motivo y firma",
       "Borrando y escribiendo de nuevo",
       "Pidiendo al administrador que lo elimine",
       "Dejándolo así si no hubo daño"
      ],
      "right": 0,
      "exp": "La integridad del registro exige conservar el original."
     },
     {
      "q": "¿Qué es el sesgo de automatización?",
      "opts": [
       "Confiar en exceso en lo que indica un sistema o algoritmo, por encima del juicio clínico",
       "Un error de cifrado",
       "Una forma de desinformación",
       "El uso de plantillas en el RSE"
      ],
      "right": 0,
      "exp": "El juicio clínico y la responsabilidad son del profesional."
     },
     {
      "q": "Según la LOPDP del Ecuador, ¿quién es el titular de los datos de salud?",
      "opts": [
       "El paciente",
       "El hospital",
       "El Ministerio de Salud",
       "El médico tratante"
      ],
      "right": 0,
      "exp": "Los datos de salud son sensibles y su titular es el paciente."
     }
    ]
   }
  ]
 }
 ]
};
