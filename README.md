# Desafío Enfermería Digital

Juego por equipos para la Unidad 3 de **TIC aplicada en Enfermería** (Maestría en Enfermería, UNEMI Posgrados). La docente lo proyecta en Google Meet y los estudiantes participan por equipos (de 2 a 25).

Todo está en una sola página, con tres partes y un solo marcador:

- **Ronda 1:** tablero de preguntas de 100 a 400 puntos y pregunta final.
- **Ronda 2 · Nivel avanzado:** preguntas de aplicación clínica y ética para graduados, más una columna de casos para debatir y su propia pregunta final.
- **Retos por estaciones:** sopa de letras con pistas, crucigrama, detecta el error en una nota de enfermería, NANDA-NIC, ordena los pasos, ¿correcto o falta?, riesgo y medida, y dilema final.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página del juego |
| `preguntas.js` | Preguntas de la Ronda 1 (aquí se editan) |
| `preguntas-avanzadas.js` | Preguntas de la Ronda 2 (aquí se editan) |
| `juego.js` | Funcionamiento de los tableros y del marcador |
| `retos.js` | Funcionamiento y contenido de los retos por estaciones |
| `estilos.css` | Colores y diseño |

## Publicar en GitHub y Vercel

1. Cree un repositorio nuevo en GitHub, público o privado.
2. Pulse **Add file → Upload files**, arrastre los archivos y pulse **Commit changes**.
3. Entre a vercel.com con su cuenta de GitHub y pulse **Add New → Project**.
4. Elija el repositorio y pulse **Import**. En *Framework Preset* deje **Other**; no hace falta configurar nada más.
5. Pulse **Deploy**.

Cada vez que cambie un archivo en GitHub, Vercel publica la nueva versión automáticamente. Use el enlace principal del proyecto (el que aparece en **Domains** dentro de Vercel): los enlaces con un código en medio corresponden a versiones antiguas fijas.

## Cambiar las preguntas

Abra `preguntas.js` (Ronda 1) o `preguntas-avanzadas.js` (Ronda 2) en GitHub, pulse el lápiz (**Edit**), cambie los textos entre comillas y pulse **Commit changes**. Respete las comillas, las comas y las llaves. Cada categoría tiene 4 preguntas.

## Cómo se juega

- Elija el número de equipos (de 2 a 25) y escriba sus nombres en el marcador.
- **Rondas 1 y 2:** cada equipo elige una categoría y un valor; abra la pregunta y pulse **Iniciar tiempo**. Pulse **Mostrar respuesta** y asigne los puntos: valor completo si acierta, la mitad en un rebote. La pregunta final permite dar hasta 500 puntos a cada equipo.
- **Retos:** en **Reparto** elija qué estaciones usar; la página reparte a los equipos por rondas. Al revisar cada estación aparece un puntaje sugerido; elija el equipo en **Dar puntos** y pulse **Sumar**. Hay un cronómetro de 3 a 10 minutos.
- **Reiniciar juego** borra los puntajes para otro grupo. El progreso se guarda en el navegador de la docente.
