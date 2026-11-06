---
name: pbc-2027-brand-and-web-design-skill
description: Skill maestra de identidad visual, sistema de diseño UI/UX y lineamientos narrativos para crear aplicaciones web, presentaciones (Demo Day), piezas gráficas y herramientas interactivas del Campamento Nacional de Milicianos "Protagonistas del Bien Común 2027" (FASTA - Mendoza).
version: 1.0.0
---

# SKILL: Sistema de Diseño y Manual de Marca "Protagonistas del Bien Común 2027"

## 1. Propósito de esta Skill
Actuar como Director de Arte, Diseñador UI/UX Senior y Arquitecto Frontend para cualquier pieza digital o interactiva del campamento **Protagonistas del Bien Común 2027** (15 al 22 de enero de 2027, Mendoza). 

Toda interfaz, landing page, tablero operativo, plantilla de *Pitch* o documento generado bajo esta skill debe aplicar la premisa del departamento de comunicaciones: **«No es repetir, es reinventar»**, respetando los tres elementos innegociables de la identidad "madre" y potenciándolos con una identidad "hermana" contemporánea, dinámica y de alto impacto visual.

---

## 2. Los 3 Pilares Innegociables del Manual de Marca

En orden estricto de jerarquía visual, toda pieza debe contener:

1. **El Color Principal — Verde Agua (`#64D5AB`):**
   * No tiene que ser el único color, pero **siempre debe estar presente y ser el acento protagonista** con el que se identifica inmediatamente al campamento.
2. **El Escudo Oficial del Campamento y el Lockup Tipográfico:**
   * Símbolo hexagonal de trazo continuo que integra la cúpula institucional (izquierda), el campanario con la cruz (derecha) y dos figuras humanas construyendo en comunión (centro inferior).
   * En el lockup tipográfico, **"Protagonistas del"** va en la línea superior (con un acento gráfico diagonal entre ambas palabras) y **"BIEN COMÚN"** en mayúsculas en la línea inferior.
3. **El Par Tipográfico Oficial (`Coolvetica` + `Raleway`):**
   * **Coolvetica (Principal):** Uso exclusivo e institucional para títulos, encabezados de impacto, numerales grandes, chapas de sección y el nombre del campamento. **Prohibido usarla en párrafos largos.**
   * **Raleway (Secundaria):** Uso obligatorio para cuerpos de texto, descripciones largas, etiquetas de formularios, tablas, botones secundarios y lectura prolongada.

---

## 3. Paleta de Colores y Tokens del Sistema UI

Para lograr el ritmo visual de **Alternancia Dual** (secciones *Dark & Tech* combinadas con secciones *Editorial & Póster*), se utiliza la siguiente paleta extendida derivada del `#64D5AB`:

| Token / Variable | Valor Hex | Rol en el Diseño Web / Gráfico |
| :--- | :--- | :--- |
| `--pbc-primary` | `#64D5AB` | **Verde Agua Oficial.** Fondos de póster, botones primarios (CTA), bordes activos, badges y acentos luminosos. |
| `--pbc-light` | `#89E2C1` | Estado `:hover` de botones primarios, brillos e indicadores activos. |
| `--pbc-dark` | `#3AA37C` | Variante de contraste sobre fondos claros y bordes secundarios. |
| `--pbc-deep` | `#0A0E0D` | **Fondo Principal Modo Oscuro (Dark & Tech)** y color de texto/bordes en las tarjetas modo póster. |
| `--pbc-carbon` | `#121917` | Fondo de contenedores secundarios, barras de filtros, modales y cabeceras. |
| `--pbc-card` | `#17211E` | Superficie de tarjetas interactivas oscuras con tinte esmeralda profundo. |
| `--pbc-paper` | `#F2F7F5` | **Fondo Claro Editorial** con sutil tinte verde agua para secciones de alto contraste y simuladores. |

### Configuración rápida para Tailwind CSS
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                pbc: {
                    DEFAULT: '#64D5AB',
                    light: '#89E2C1',
                    soft: '#E6F8F1',
                    dark: '#3AA37C',
                    deep: '#0A0E0D',
                    carbon: '#121917',
                    card: '#17211E',
                    paper: '#F2F7F5'
                }
            },
            fontFamily: {
                coolvetica: ['Coolvetica', 'Impact', 'Arial Black', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif']
            }
        }
    }
}
```

---

## 4. Reglas Tipográficas y Jerarquía

### Importación en HTML
```html
<link href="https://fonts.cdnfonts.com/css/coolvetica" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet">
```

### Reglas de Composición
* **Clase `.font-brand` (Coolvetica):**
  * `font-family: 'Coolvetica', 'Arial Black', sans-serif;`
  * `letter-spacing: 0.01em;`
  * `line-height: 0.98;` (interlineado compacto estilo afiche urbano).
  * En títulos H1 y H2, combinar palabras en blanco (`#FFFFFF`) con palabras clave resaltadas en Verde Agua (`#64D5AB`).
* **Cuerpo de Texto (Raleway):**
  * Pesos recomendados: `400` (regular para descripciones), `600` (semibold para subtítulos y tarjetas), `800`/`900` (extrabold/black para badges, píldoras de metadatos y botones).

---

## 5. Recursos Gráficos y Efectos del Manual de Marca

El Manual de Identidad (página 9: *Complementos*) define tres recursos visuales que deben inyectarse mediante CSS para evitar que la web luzca plana o genérica:

### 5.1 Texturas de Granulado y Ruido (`Grain & Noise`)
Aporta tactilidad de afiche impreso sobre las superficies digitales oscuras.
```css
.bg-grain {
    background-image: radial-gradient(rgba(100, 213, 171, 0.12) 1px, transparent 0),
                      radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 24px 24px;
    background-position: 0 0, 12px 12px;
}

.noise-overlay {
    position: relative;
}
.noise-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.045;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    z-index: 1;
}
```

### 5.2 Desenfoque de Movimiento (`Motion Blur Watermarks`)
Inspirado directamente en el póster oficial de Mendoza (`15al 22/01 2027` y `MENDOZA`). Se aplica en textos gigantes (`text-7xl` a `text-[12rem]`) posicionados en `absolute` en el fondo de las secciones:
```css
/* Sobre fondos oscuros (#0A0E0D) */
.motion-watermark {
    filter: blur(2px);
    text-shadow: -18px 0px 14px rgba(100, 213, 171, 0.35), 18px 0px 14px rgba(10, 14, 13, 0.25);
    user-select: none;
    pointer-events: none;
}

/* Sobre fondos claros o verde agua (#64D5AB) */
.motion-watermark-dark {
    filter: blur(1.5px);
    text-shadow: -15px 0px 12px rgba(10, 14, 13, 0.22), 15px 0px 12px rgba(10, 14, 13, 0.12);
    user-select: none;
    pointer-events: none;
}
```

### 5.3 Desenfoque Normal (`Ambient Glow`)
Esferas de luz difusa posicionadas detrás de los bloques principales:
```html
<div class="absolute -top-24 -left-24 w-96 h-96 bg-pbc/20 rounded-full blur-[110px] pointer-events-none"></div>
```

---

## 6. Arquitectura de Componentes y Alternancia Visual

La experiencia de usuario se estructura alternando dos atmósferas complementarias:

### A. Atmósfera 1: "Dark & Tech Workspace" (Para Exploración, Catálogo e IA)
* **Fondo:** `bg-pbc-deep` (`#0A0E0D`) con `.noise-overlay` y `.bg-grain`.
* **Tarjetas (`.tech-card`):**
  ```css
  .tech-card {
      border: 1px solid rgba(100, 213, 171, 0.22);
      background: linear-gradient(145deg, rgba(23, 33, 30, 0.92), rgba(14, 20, 18, 0.96));
      transition: all 0.25s ease;
  }
  .tech-card:hover {
      border-color: #64D5AB;
      box-shadow: 0 12px 32px -10px rgba(100, 213, 171, 0.22);
      transform: translateY(-3px);
  }
  ```
* **Uso ideal:** Hero principal, los 4 Pilares de *Magnifica Humanitas*, Catálogo filtrable de las 15 Experiencias estilo Hackatón, Matriz Comparativa y Ventanas Modales.

### B. Atmósfera 2: "Editorial & Póster Urbano" (Para Itinerario y Simuladores)
* **Fondo:** Pleno en Verde Agua `bg-pbc` (`#64D5AB`) o papel claro `bg-pbc-paper` (`#F2F7F5`) con texto en negro profundo `#0A0E0D`.
* **Tarjetas (`.editorial-card`):** Bordes sólidos de $2\text{ px}$ y sombra dura desplazada sin difuminar, evocando un dossier impreso o afiche:
  ```css
  .editorial-card {
      border: 2px solid #0A0E0D;
      box-shadow: 6px 6px 0px #0A0E0D;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .editorial-card:hover {
      transform: translate(-2px, -2px);
      box-shadow: 9px 9px 0px #0A0E0D;
  }
  ```
* **Uso ideal:** Tarjeta destacada de la encíclica, Línea de tiempo interactiva de los 7 Días + Consejo Final, Simulador del Lienzo del Bien Común (8 bloques) y Tarjetas de Aliados Locales (ACDE, CONIN, Mendoza).

---

## 7. Activo Vectorial: Escudo Oficial en SVG

Siempre que se requiera el logo del campamento en cabeceras, pies de página o filminas del *Demo Day*, utilizar este SVG vectorial reconstruido (cambiando el atributo `stroke` entre `#64D5AB`, `#FFFFFF` o `#0A0E0D` según el fondo):

```html
<svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
    <!-- Hexágono Exterior -->
    <polygon points="100,10 185,58 185,162 100,210 15,162 15,58" stroke="#64D5AB" stroke-width="10" stroke-linejoin="miter" fill="none"/>
    <!-- Cúpula Izquierda -->
    <path d="M58,58 L70,36 L82,58" stroke="#64D5AB" stroke-width="8" stroke-linejoin="miter"/>
    <path d="M58,58 L58,72 M82,58 L82,72" stroke="#64D5AB" stroke-width="8"/>
    <path d="M18,86 C35,64 95,64 102,98 L102,148" stroke="#64D5AB" stroke-width="9" stroke-linecap="round"/>
    <!-- Bandas cruzadas de la cúpula -->
    <line x1="18" y1="115" x2="101" y2="128" stroke="#64D5AB" stroke-width="8"/>
    <line x1="18" y1="142" x2="118" y2="162" stroke="#64D5AB" stroke-width="8" stroke-linecap="round"/>
    <line x1="18" y1="138" x2="54" y2="121" stroke="#64D5AB" stroke-width="8"/>
    <line x1="54" y1="121" x2="116" y2="161" stroke="#64D5AB" stroke-width="8"/>
    <!-- Columnas inferiores izquierda -->
    <line x1="25" y1="144" x2="21" y2="165" stroke="#64D5AB" stroke-width="7"/>
    <line x1="55" y1="150" x2="48" y2="180" stroke="#64D5AB" stroke-width="7"/>
    <line x1="69" y1="153" x2="62" y2="188" stroke="#64D5AB" stroke-width="7"/>
    <!-- Campanario Derecha con Cruz -->
    <line x1="142" y1="26" x2="142" y2="52" stroke="#64D5AB" stroke-width="8" stroke-linecap="square"/>
    <line x1="131" y1="36" x2="153" y2="36" stroke="#64D5AB" stroke-width="8" stroke-linecap="square"/>
    <polyline points="111,148 106,90 123,80 123,63 142,52 162,61 162,75 184,84" stroke="#64D5AB" stroke-width="9" stroke-linejoin="miter"/>
    <!-- Arco del Campanario -->
    <path d="M138,144 L132,96 C131,82 152,82 154,96 L162,175" stroke="#64D5AB" stroke-width="8" stroke-linecap="round"/>
    <!-- Figuras Humanas Construyendo -->
    <circle cx="88" cy="172" r="9" stroke="#64D5AB" stroke-width="7" fill="none"/>
    <circle cx="122" cy="153" r="11" stroke="#64D5AB" stroke-width="7" fill="none"/>
    <path d="M72,186 C85,194 98,185 112,174 C126,164 139,169 148,184" stroke="#64D5AB" stroke-width="8" stroke-linecap="round"/>
    <polyline points="99,198 97,188 110,181 112,197" stroke="#64D5AB" stroke-width="7" stroke-linejoin="miter"/>
</svg>
```

---

## 8. Patrones Interactivos Clave de la Plataforma

Cuando se generen nuevas vistas o módulos para esta plataforma, respetar estos 4 patrones funcionales:

1. **Cinta de Progreso del Itinerario (5 Pasos):**
   * `Ver la realidad` $\rightarrow$ `Discernirla` $\rightarrow$ `Asumir una responsabilidad` $\rightarrow$ `Participar` $\rightarrow$ `Construir`.
2. **Tarjetas de Experiencias Hackatón con Ficha Modal:**
   * En la vista previa mostrar siempre: Número de experiencia (`#01` a `#15`), duración en horas, Día sugerido del campamento, badge especial si incluye **Integración Técnica de IA** (`🤖 IA`), referentes metodológicos (Stanford d.school, Harvard PON/HKS, Silicon Valley, Santander X) y un recuadro destacado con el **Producto Final Tangible**.
   * Al abrir el modal: desplegar fundamentación conceptual, cronograma paso a paso dividido en fases con tiempos exactos, ejemplos por carrera y criterios de evaluación.
3. **Simulador del Lienzo del Bien Común (Mission-Model Canvas DSI):**
   * Grilla interactiva de 8 bloques editables: (1) Herida Social Diagnosticada, (2) Propuesta de Valor Ético, (3) Comunidad Corresponsable, (4) Criterio de Subsidiariedad, (5) Recursos Vocacionales y Dones, (6) Aliados de Tracción Real, (7) Sostenibilidad Operativa, y (8) Métricas de Florecimiento.
4. **Previsualizador de Demo Day (Regla 3 Minutos / 3 Filminas):**
   * Filmina 01 (Minuto 1): *La Herida y el Diagnóstico* (El llanto de Nehemías).
   * Filmina 02 (Minuto 2): *Prototipo / MVP en Acción* (La obra en las manos).
   * Filmina 03 (Minuto 3): *Tramo de Muralla y Tracción* (Hoja de ruta al volver a los rucas y ciudades).

---

## 9. Lineamientos de Tono, Lenguaje y Narrativa

* **Vocabulario Carismático y Doctrinal:** Integrar con naturalidad conceptos como *Bien Común*, *Doctrina Social de la Iglesia (DSI)*, *subsidiariedad*, *solidaridad*, *dignidad de la persona humana*, *estructuras temporales*, *rucas*, *miliciano*, *Ciudad de Dios en la ciudad de los hombres*, *el propio tramo de muralla* (Nehemías) y la encíclica *Magnifica Humanitas* (Papa León XIV).
* **Tono Esperanzado y Operativo:** Evitar tanto el pesimismo derrotista ante las crisis contemporáneas como el optimismo tecnocrático ingenuo. Transmitir un espíritu de esperanza viril, serena y comprometida que pasa siempre de la contemplación y la oración a un **entregable tangible y aplicable en la realidad**.