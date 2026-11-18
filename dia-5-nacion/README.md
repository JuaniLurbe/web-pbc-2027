# Día 5 · Nación — Protagonistas del Bien Común 2027

Subcarpeta de trabajo para el proyecto del **Día 5 («Nación ~ Protagonismo hoy»)** del Campamento Nacional de Milicianos **Protagonistas del Bien Común 2027** (FASTA · Mendoza, 15 al 22 de enero de 2027), enmarcado en los **3 niveles de participación política**: **Patria → Nación → Estado**.

---

## Contenido de esta carpeta

| Archivo | Propósito |
| :--- | :--- |
| `index.html` | **Dashboard visual interactivo** con la identidad oficial PBC 2027 (`#64D5AB`, `Coolvetica` + `Raleway`, modo Dark & Tech + Editorial Póster). Se puede abrir directamente en el navegador (`doble clic` o Live Server). |
| `directorio-dia5.md` | **Documento maestro** con el marco formativo del Día 5, ficha institucional de ACDE Argentina, reseñas detalladas de cada perfil de LinkedIn y mapa de cobertura por área profesional. |
| `data/contactos.json` | **Base de datos estructurada** en JSON para escalar el directorio o conectarlo a futuras vistas/apps. |
| `data/contactos.js` | **Espejo JS local** (`window.PBC_DIA5_DATA`) para que `index.html` funcione sin servidor ni bloqueos CORS al abrirse desde disco (`file://`). |

---

## Cómo seguir compilando contactos

1. **Desde el Dashboard (`index.html`)**: Usá el botón **«+ Sumar Contacto»** para cargar nuevos links de LinkedIn y reseñas (se guardan en el navegador con opción de exportar a JSON o CSV).
2. **En el repositorio**: Agregá nuevas entradas en `data/contactos.json`, `data/contactos.js` y documentalas en `directorio-dia5.md`.
