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
