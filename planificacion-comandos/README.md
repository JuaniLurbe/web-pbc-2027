# Planificación General · 3 Comandos (PBC 2027)

Dashboard colaborativo en tiempo real para coordinar día por día (15 al 22 de enero de 2027, Mendoza) las tareas del **Comando de Formación**, **Comando de Disciplinas** y **Comando de Liturgia**.

---

## Arquitectura y Conexión a Supabase

- **Proyecto Supabase:** `pbc-2027-comandos` (`sa-east-1`, São Paulo)
- **Tablas en Postgres (`public`):**
  - `camp_days`: los 8 días del campamento con sus ejes por Comando, pregunta central y símbolo de Nehemías.
  - `camp_members`: nómina de los 16 integrantes iniciales de Formación, Liturgia y Disciplinas.
  - `camp_tasks`: actividades día por día con franja horaria, responsable, estado, dependencias, ubicación y materiales.
  - `camp_authorized_users`: registro de usuarios autenticados habilitados por RLS.
- **Tiempo real (`Realtime`):** cambios de estado, edición de tareas y nuevas asignaciones se reflejan automáticamente entre dispositivos conectados.

## Cómo usar el tablero

1. Abrí [`index.html`](./index.html) (sirviendo la carpeta o publicándola en Vercel/hosting estático).
2. En la pantalla de acceso, creá tu cuenta con correo y contraseña eligiendo tu Comando (`Formación`, `Disciplinas` o `Liturgia`), o iniciá sesión si ya estás registrado.
   > *Nota para administradores:* En **Supabase Dashboard → Authentication → Sign In / Providers → Email**, podés desactivar **Confirm email** si querés que los 16 integrantes entren de forma instantánea sin confirmar casilla de correo.
3. Navegá entre las 5 vistas:
   - **Matriz 3×8:** visión cruzada de todos los días y los 3 Comandos en paralelo.
   - **Tablero Kanban:** gestión visual por estado (`Pendiente` → `En curso` → `Bloqueado` → `Listo`) con arrastrar y soltar.
   - **Cronograma del Día:** detalle horario (`Previo`, `Mañana`, `Tarde`, `Noche`), ubicación, materiales y dependencias.
   - **Nehemías & Liturgia:** línea espiritual continua de los 8 días.
   - **Equipo:** integrantes por Comando, carga de trabajo y exportación CSV/JSON.
