# Desafío Enfermería Digital

Juego por equipos para la Unidad 3 de **TIC aplicada en Enfermería** (Maestría en Enfermería, UNEMI Posgrados). La docente lo proyecta en Google Meet y los estudiantes participan por equipos (de 2 a 25).

Es un solo tablero de 5 categorías y 6 filas (100 a 600 puntos), con 30 casillas. Al abrir una casilla puede salir una pregunta o una actividad:

| Puntos | Redes sociales | Desinformación | Registros electrónicos | Confidencialidad y ley | ¿Qué harían? |
|---|---|---|---|---|---|
| 100 | Pregunta | Pregunta | Pregunta | Pregunta | Pregunta |
| 200 | Pregunta | Pregunta | Pregunta | Pregunta | Pregunta |
| 300 | ¿Correcto o falta? | Sopa de letras | Detecta el error | Riesgo y medida | Ordena los pasos |
| 400 | Pregunta difícil | Pregunta difícil | Pregunta difícil | Pregunta difícil | Pregunta difícil |
| 500 | Caso para debatir | Crucigrama | NANDA-NIC | Caso para debatir | Caso para debatir |
| 600 | Pregunta difícil | Pregunta difícil | Pregunta difícil | Pregunta difícil | Dilema |

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página del juego |
| `preguntas.js` | Qué hay en cada casilla: preguntas y actividades (aquí se editan) |
| `actividades.js` | Las actividades: sopa de letras, crucigrama, detecta el error, NANDA-NIC, ordena los pasos, ¿correcto o falta?, riesgo y medida y dilema |
| `juego.js` | Funcionamiento del tablero y del marcador |
| `estilos.css` | Colores y diseño |

## Publicar en GitHub y Vercel

1. Cree un repositorio nuevo en GitHub, público o privado.
2. Pulse **Add file → Upload files**, arrastre los archivos y pulse **Commit changes**.
3. Entre a vercel.com con su cuenta de GitHub y pulse **Add New → Project**.
4. Elija el repositorio y pulse **Import**. En *Framework Preset* deje **Other**; no hace falta configurar nada más.
5. Pulse **Deploy**.

Cada vez que cambie un archivo en GitHub, Vercel publica la nueva versión automáticamente. Use el enlace principal del proyecto (el que aparece en **Domains** dentro de Vercel): los enlaces con un código en medio corresponden a versiones antiguas fijas.

## Cambiar las preguntas

Abra `preguntas.js` en GitHub, pulse el lápiz (**Edit**), cambie los textos entre comillas y pulse **Commit changes**. Respete las comillas, las comas y las llaves. Cada categoría tiene 6 casillas. Para que una casilla sea una actividad, escriba `{act:"sopa"}` (u otra: `cruci`, `error`, `nanda`, `orden`, `juicio`, `empareja`, `dilema`).

## Cómo se juega

- Elija el número de equipos (de 2 a 25) y escriba sus nombres en el marcador.
- Por turnos, cada equipo elige una categoría y un valor. Pulse **Iniciar tiempo**: 30 segundos para las preguntas, 90 para los casos y de 4 a 5 minutos para las actividades.
- En la sopa de letras y el crucigrama, los estudiantes dicen las palabras y usted toca ✓ en la pista para marcarla (↺ la desmarca).
- Pulse **Mostrar respuesta** (o **Revisar y ver solución** en las actividades) y asigne los puntos: valor completo si lo resolvieron bien, la mitad si fue un rebote o un resultado parcial.
- La **Pregunta final** permite dar hasta 500 puntos a cada equipo.
- **Reiniciar juego** borra los puntajes para otro grupo. El progreso se guarda en el navegador de la docente.
