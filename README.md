# Desafío Enfermería Digital

Juego de preguntas por equipos para la Unidad 3 de **TIC aplicada en Enfermería** (Maestría en Enfermería, UNEMI Posgrados). La docente lo proyecta en Google Meet y los estudiantes responden por equipos.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página del juego |
| `preguntas.js` | Las preguntas y respuestas (aquí se editan) |
| `juego.js` | El funcionamiento del juego |
| `estilos.css` | Colores y diseño |

## Publicar en GitHub y Vercel

1. Cree un repositorio nuevo en GitHub (por ejemplo, `desafio-enfermeria-digital`), público o privado.
2. Pulse **Add file → Upload files**, arrastre los cuatro archivos y el README, y pulse **Commit changes**.
3. Entre a vercel.com con su cuenta de GitHub y pulse **Add New → Project**.
4. Elija el repositorio y pulse **Import**. En *Framework Preset* deje **Other**; no hace falta configurar nada más.
5. Pulse **Deploy**. En menos de un minuto tendrá un enlace del tipo `https://desafio-enfermeria-digital.vercel.app`.

Cada vez que cambie un archivo en GitHub, Vercel publica la nueva versión automáticamente.

## Cambiar las preguntas

Abra `preguntas.js` en GitHub, pulse el lápiz (**Edit**), cambie los textos entre comillas y pulse **Commit changes**. Respete las comillas, las comas y las llaves. Cada categoría tiene 4 preguntas.

## Cómo se juega

- Elija el número de equipos (de 2 a 6) y escriba sus nombres en el marcador.
- Cada equipo elige una categoría y un valor; abra la pregunta y pulse **Iniciar tiempo** (30 segundos).
- Pulse **Mostrar respuesta** y asigne los puntos: valor completo si acierta, la mitad en un rebote.
- La **Pregunta final** permite dar hasta 500 puntos a cada equipo.
- **Reiniciar juego** borra los puntajes para otro grupo. El progreso se guarda en el navegador de la docente.

## Rally de Enfermería Digital (`rally.html`)

Segundo juego, por estaciones, para la misma unidad (Tema 3: redes sociales y teleenfermería; Tema 4: registros sanitarios electrónicos). En Vercel se abre agregando `/rally.html` al enlace del proyecto, por ejemplo `https://desafio-enfermeria-digital.vercel.app/rally.html`.

- Elija la cantidad de grupos (de 1 a 12) y escriba sus nombres. La página reparte las estaciones por rondas.
- En **Plan de rondas** puede desmarcar las estaciones que no quiera usar.
- Estaciones: sopa de letras con pistas, crucigrama, detecta el error en una nota de enfermería, diagnóstico NANDA e intervención NIC, ordena los pasos de un protocolo, ¿correcto o falta?, riesgo y medida, y un dilema final para debatir.
- Cada grupo tiene botones para sumar o restar puntos y hay un cronómetro de 3 a 10 minutos.
- Los puntajes se guardan en el navegador de la docente.
