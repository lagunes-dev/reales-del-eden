const pptxgen = require("pptxgenjs");

const C = {
  /** Fondo cinematográfico: negro puro como el landing liquid-glass */
  dark: "000000",
  /** Texto principal — blanco roto */
  ink: "EDEAE6",
  muted: "9E9A93",
  dim: "6E6A64",

  champagne: "C4A962",
  champagneHi: "D8C48A",

  surface: "181614",
  surface2: "1E1C18",
  graybg: "181614",
  graybg2: "1E1C18",
  graybg3: "282522",
  line: "3A3834",
  stroke: "3A3834",

  gold: "C4A962",
  goldlt: "D8C48A",

  gray: "9E9A93",
  cream: "E8E3DA",

  red: "C85852",
  redbg: "1F1515",
  coral: "B0766E",

  green: "56A090",
  greenbg: "101A16",

  blue: "7399C9",
  bluebg: "131A22",

  orange: "C48860",
  orangebg: "1F1712",

  purple: "A699D4",
  purplebg: "16141E",

  /** Retrocompat títulos que usaban blanco puro */
  white: "EDEAE6",
};

const H = 5.625;
/** Alineado a slides-cinematic-landing.html: Instrument Serif + Barlow */
const FONT = { display: "Instrument Serif", head: "Barlow", body: "Barlow" };
const mkS = () => ({
  type: "outer",
  blur: 22,
  offset: 2,
  angle: 125,
  color: "000000",
  opacity: 0.52,
});

/** Paneles tipo glass: mismo significado neutro sin reescribir cada slide */
const CARD_NEUTRAL = new Set([C.surface, C.surface2, C.graybg, C.graybg2]);

function barFilled(s, x, y, w, h, fill01, fillCol, trackCol = C.stroke) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: trackCol }, rectRadius: 0.036,
  });
  const fw = Math.max(0, Math.min(1, fill01)) * w;
  if (fw > 0.02) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: fw, h, fill: { color: fillCol }, rectRadius: 0.036,
    });
  }
}

let pres;

function bg(s, color = C.dark) {
  s.background = { color };
}

function label(s, txt, color = C.champagneHi) {
  s.addText(txt, {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.28,
    fontSize: 8,
    bold: true,
    color,
    charSpacing: 1,
    fontFace: FONT.head,
    align: "left",
    margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 0.408,
    w: 2.0,
    h: 0.019,
    fill: { color: C.champagneHi, transparency: 18 },
  });
}

function pill(s, txt, x, y, bgCol, txtCol = C.dark) {
  const w = Math.max(txt.length * 0.085 + 0.34, 0.78);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h: 0.25,
    fill: { color: bgCol, transparency: 58 },
    line: { color: "FFFFFF", transparency: 68, width: 0.5 },
    shadow: {
      type: "outer",
      blur: 10,
      offset: 1,
      angle: 125,
      color: "000000",
      opacity: 0.35,
    },
    rectRadius: 0.06,
  });
  s.addText(txt.toUpperCase(), {
    x,
    y,
    w,
    h: 0.25,
    fontSize: 7,
    bold: true,
    color: txtCol,
    fontFace: FONT.head,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

function normHex(cc) {
  if (cc == null || cc === "") return null;
  const s = String(cc).trim().replace(/^#/, "");
  return /^[0-9A-Fa-f]{6}$/i.test(s) ? s.slice(0, 6).toUpperCase() : null;
}

/** Glass aprox.: PPTX no tiene backdrop-blur; relleno claro muy transparente + borde luminoso */
function card(s, x, y, w, h, tint) {
  const neutral =
    tint === undefined || tint === null || CARD_NEUTRAL.has(tint);

  let fill = { color: "FFFFFF", transparency: 93 };
  let lineOpts = { color: "FFFFFF", transparency: 78, width: 0.52 };

  if (!neutral) {
    const th = normHex(tint);
    if (th != null) {
      fill = { color: th, transparency: 80 };
      lineOpts = { color: "FFFFFF", transparency: 72, width: 0.48 };
    }
  }

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill,
    line: lineOpts,
    shadow: mkS(),
    rectRadius: 0.073,
  });
}

function accentStripe(s, x, y, h, accent, wStripe = 0.038) {
  s.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w: wStripe,
    h,
    fill: { color: accent },
  });
}

async function build() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Los Reales del Edén — Dominio Villahermosa 2025";
  pres.theme = {
    headFontFace: FONT.head,
    bodyFontFace: FONT.body,
  };

  // SLIDE 1 — PORTADA
  {
    const s = pres.addSlide();
    bg(s, C.dark);

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 0.07,
      h: H,
      fill: { color: C.champagne, transparency: 56 },
      line: { color: "FFFFFF", transparency: 78, width: 0.4 },
    });

    s.addText("Los Reales del Edén", {
      x: 0.72,
      y: 0.48,
      w: 6,
      h: 0.38,
      fontSize: 10.5,
      color: C.muted,
      fontFace: FONT.head,
      charSpacing: 0.75,
      margin: 0,
    });

    s.addText("El objetivo no es", {
      x: 0.72,
      y: 0.95,
      w: 5.5,
      h: 0.35,
      fontSize: 12.5,
      color: C.dim,
      fontFace: FONT.head,
      margin: 0,
    });
    s.addText('\u201cmás eventos privados\u201d', {
      x: 0.72,
      y: 1.22,
      w: 5.95,
      h: 1.25,
      fontSize: 36,
      color: C.ink,
      fontFace: FONT.display,
      italic: true,
      align: "left",
      lineSpacingMultiple: 1.08,
      margin: 0,
    });

    s.addText("Ser el grupo más visible y solicitado\nen Villahermosa.", {
      x: 0.72,
      y: 2.72,
      w: 5.6,
      h: 0.95,
      fontSize: 18,
      color: C.champagneHi,
      fontFace: FONT.display,
      italic: true,
      lineSpacingMultiple: 1.32,
      margin: 0,
    });

    s.addText(
      "En esta ciudad siguen cerrando recomendación, coordinadores y confianza cara a cara.\nLas redes amplifican; no sustituyen eso.",
      {
        x: 0.72,
        y: 3.75,
        w: 5.35,
        h: 0.75,
        fontSize: 11,
        color: C.muted,
        fontFace: FONT.body,
        italic: true,
        lineSpacingMultiple: 1.38,
        margin: 0,
      }
    );

    card(s, 6.48, 0.82, 3.05, 1.88, C.surface2);
    accentStripe(s, 6.48, 0.82, 1.88, C.coral, 0.042);
    s.addText("Fuera de foco", {
      x: 6.65,
      y: 0.95,
      w: 2.7,
      h: 0.28,
      fontSize: 8,
      bold: true,
      color: C.coral,
      fontFace: FONT.head,
      charSpacing: 0.5,
      margin: 0,
    });
    s.addText("Sobrevivir de volumen\nsin posicionamiento claro.", {
      x: 6.65,
      y: 1.28,
      w: 2.75,
      h: 0.85,
      fontSize: 12,
      color: C.cream,
      fontFace: FONT.body,
      lineSpacingMultiple: 1.32,
      margin: 0,
    });

    card(s, 6.48, 2.88, 3.05, 2.12, C.surface2);
    accentStripe(s, 6.48, 2.88, 2.12, C.green, 0.042);
    s.addText("North star", {
      x: 6.65,
      y: 3.02,
      w: 2.7,
      h: 0.28,
      fontSize: 8,
      bold: true,
      color: C.green,
      fontFace: FONT.head,
      charSpacing: 0.5,
      margin: 0,
    });
    s.addText("Omnipresencia local con\nprecio defendible y prueba real.", {
      x: 6.65,
      y: 3.36,
      w: 2.75,
      h: 1.1,
      fontSize: 12,
      color: C.cream,
      fontFace: FONT.body,
      lineSpacingMultiple: 1.32,
      margin: 0,
    });

    s.addText("Estrategia operativa · Villahermosa · 2025", {
      x: 0.72,
      y: 5.28,
      w: 8.8,
      h: 0.22,
      fontSize: 7.5,
      color: C.dim,
      fontFace: FONT.head,
      charSpacing: 1.2,
      margin: 0,
    });
  }

  // SLIDE 2 — DOBLE MOTOR
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "El sistema — doble motor");

    s.addText("Un solo motor revienta el motor.", {
      x: 0.5, y: 0.44, w: 9, h: 0.46,
      fontSize: 24,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.2,
      margin: 0
    });
    s.addText("Todo lo que hagan se divide en dos funciones — pero no es automático: más contenido no garantiza más contratos.", {
      x: 0.5, y: 0.92, w: 9, h: 0.52,
      fontSize: 11.5, color: C.muted, fontFace: FONT.body, lineSpacingMultiple: 1.28, margin: 0
    });

    const cTop = 1.52;
    const cH = 3.52;
    card(s, 0.5, cTop, 4.3, cH, C.greenbg);
    accentStripe(s, 0.5, cTop, cH, C.green, 0.04);
    s.addText("MOTOR 1", {
      x: 0.62,
      y: cTop + 0.14,
      w: 3.95,
      h: 0.22,
      fontSize: 7.8,
      bold: true,
      color: C.green,
      charSpacing: 0.75,
      fontFace: FONT.head,
      margin: 0,
    });
    s.addText("Dinero", {
      x: 0.62,
      y: cTop + 0.38,
      w: 3.95,
      h: 0.55,
      fontSize: 28,
      italic: true,
      color: C.champagneHi,
      fontFace: FONT.display,
      margin: 0,
    });
    s.addText("Paga las cuentas hoy (y alimenta recomendación)", {
      x: 0.62,
      y: cTop + 0.95,
      w: 3.92,
      h: 0.34,
      fontSize: 11,
      italic: true,
      color: "8EB8AD",
      fontFace: FONT.body,
      margin: 0,
    });

    const dineroItems = [
      "Eventos reales + prueba social creíble",
      "Seguimiento y cierre (no solo «que vean el reel»)",
      "CTA a WhatsApp con conversación controlada",
      "Disponibilidad y urgencia reales",
    ];
    dineroItems.forEach((it, i) => {
      s.addText(it, {
        x: 0.62,
        y: cTop + 1.38 + i * 0.44,
        w: 4.08,
        h: 0.34,
        fontSize: 11,
        color: C.cream,
        fontFace: FONT.body,
        bullet: true,
        valign: "middle",
        margin: 0,
      });
    });

    card(s, 5.2, cTop, 4.3, cH, C.bluebg);
    accentStripe(s, 5.2, cTop, cH, C.blue, 0.04);
    s.addText("MOTOR 2", {
      x: 5.32,
      y: cTop + 0.14,
      w: 4,
      h: 0.22,
      fontSize: 7.8,
      bold: true,
      color: C.blue,
      charSpacing: 0.75,
      fontFace: FONT.head,
      margin: 0,
    });
    s.addText("Crecimiento", {
      x: 5.32,
      y: cTop + 0.38,
      w: 4,
      h: 0.55,
      fontSize: 28,
      italic: true,
      color: C.champagneHi,
      fontFace: FONT.display,
      margin: 0,
    });
    s.addText(
      "Amplifica alcance · si no convierte en citas o eventos, es hobby.",
      {
        x: 5.32,
        y: cTop + 0.92,
        w: 3.92,
        h: 0.42,
        fontSize: 11,
        italic: true,
        color: "91AEDE",
        fontFace: FONT.body,
        lineSpacingMultiple: 1.22,
        margin: 0,
      }
    );

    const crecItems = [
      "Covers virales con sello propio (oído en 3 s)",
      "Retos / trends con su sonido, no genéricos",
      "Mashups raros que nadie más hace igual",
      "¿Cuántos eventos cerraron solo por reel sin recomendación previa?",
    ];
    crecItems.forEach((it, i) => {
      s.addText(it, {
        x: 5.32,
        y: cTop + 1.38 + i * 0.44,
        w: 4.05,
        h: 0.34,
        fontSize: 11,
        color: C.cream,
        fontFace: FONT.body,
        bullet: true,
        valign: "middle",
        margin: 0,
      });
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 4.96,
      w: 9,
      h: 0.3,
      fill: { color: C.redbg },
      rectRadius: 0.04,
    });
    s.addText("Error común: solo reels sin sistema relacional y de cierre = seguidores, no negocio.", {
      x: 0.68,
      y: 5.0,
      w: 8.65,
      h: 0.24,
      fontSize: 9.2,
      bold: true,
      color: C.red,
      fontFace: FONT.head,
      valign: "middle",
      margin: 0,
    });

    s.addText(
      "Prioridad: cerrar eventos y fortalecer recomendación y coordinadores. Ajusten el reparto de contenido solo después de medir; si el crecimiento no trae citas, bájalo.",
      {
        x: 0.55,
        y: 5.32,
        w: 8.9,
        h: 0.36,
        fontSize: 8.85,
        color: C.champagneHi,
        fontFace: FONT.body,
        align: "center",
        lineSpacingMultiple: 1.2,
        margin: 0,
      }
    );
  }

  // SLIDE 3 — POSICIONAMIENTO
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Posicionamiento — el que realmente vende");

    s.addText('Olvida «premium». Por ahora.', {
      x: 0.5, y: 0.46, w: 9, h: 0.5,
      fontSize: 25, italic: true, color: C.ink, fontFace: FONT.display, lineSpacingMultiple: 1.18, margin: 0
    });

    card(s, 0.5, 1.08, 9, 1.42, C.surface2);
    accentStripe(s, 0.5, 1.08, 1.42, C.champagne, 0.042);
    s.addText('"Convertimos cualquier evento en ambiente asegurado,\nporque sabemos leer al público en vivo."', {
      x: 0.78, y: 1.16, w: 8.4, h: 1.22,
      fontSize: 18,
      italic: true,
      color: C.champagneHi,
      fontFace: FONT.display,
      align: "left",
      lineSpacingMultiple: 1.38,
      margin: 0
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.62, w: 9, h: 0.58, fill: { color: C.redbg }, rectRadius: 0.035,
    });
    accentStripe(s, 0.5, 2.62, 0.58, C.coral, 0.038);
    s.addText("Sin evidencia creíble, la frase es la misma que cualquier grupo. La promesa se sostiene con material, no con copy.", {
      x: 0.75, y: 2.7, w: 8.45, h: 0.42,
      fontSize: 9.8,
      bold: false,
      color: "D4B4AF",
      fontFace: FONT.body,
      align: "left",
      lineSpacingMultiple: 1.26,
      margin: 0
    });

    const reasons = [
      { title: "Reduce riesgo", desc: "El organizador tiene miedo de que la fiesta se caiga. Esto lo elimina si lo respaldan con video real.", color: C.green },
      { title: "Es entendible", desc: "\"Premium\" no significa nada. \"Ambiente asegurado\" todos saben qué es — pero hay que demostrarlo.", color: C.blue },
      { title: "Cualquiera lo quiere", desc: "Boda, XV o empresa: todos quieren que funcione. Ahí entran recomendación y coordinadores, no solo el algoritmo.", color: C.orange },
    ];
    reasons.forEach((r, i) => {
      const x = 0.5 + i * 3.1;
      const ry = 3.2;
      card(s, x, ry, 2.85, 2.15, C.surface2);
      accentStripe(s, x, ry, 2.15, r.color, 0.038);
      s.addText(r.title, { x: x + 0.15, y: ry + 0.12, w: 2.55, h: 0.34, fontSize: 13, bold: true, color: r.color, fontFace: FONT.head, margin: 0 });
      s.addText(r.desc, { x: x + 0.15, y: ry + 0.52, w: 2.55, h: 1.55, fontSize: 11, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.32, margin: 0 });
    });
  }

  // SLIDE — PROPUESTA MUSICAL (hueco estratégico)
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Propuesta musical — lo que debe pasar en 10 segundos");

    s.addText("Si suenan \"igual que otros\", la mejor estrategia de marketing revienta. Definan qué se oye distinto antes de subir un reel más.", {
      x: 0.5, y: 0.46, w: 9, h: 0.82,
      fontSize: 19,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.32,
      margin: 0
    });

    const mus = [
      { t: "Firma sonora", d: "¿Qué 2–3 elementos musicales son inequívocamente ustedes? (línea de bajo, cadencia, bloques de género, finales de frase, etc.)" },
      { t: "Carta mínima", d: "Lista corta de \"esto sí / esto no\": qué géneros dominan, qué rechazan, qué mezclan y cómo anuncian el cambio en vivo." },
      { t: "Prueba de oído", d: "Alguien ajeno escucha 10 s a ciegas: ¿nombra al grupo correcto sin ver la escena? Si no, siguen genéricos." },
      { t: "Contenido alineado", d: "Cada reel debe enseñar esa firma: no solo baile en cámara — el sonido debe delatar que son Los Reales." },
    ];
    mus.forEach((row, i) => {
      const y = 1.14 + i * 1.02;
      card(s, 0.5, y, 9, 0.92, C.surface2);
      accentStripe(s, 0.5, y, 0.92, C.purple, 0.036);
      s.addText(row.t, { x: 0.65, y: y + 0.1, w: 8.7, h: 0.26, fontSize: 14, bold: true, color: C.purple, fontFace: FONT.head, margin: 0 });
      s.addText(row.d, { x: 0.65, y: y + 0.38, w: 8.7, h: 0.5, fontSize: 11, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.28, margin: 0 });
    });

    s.addText("Meta: que el cliente no diga \"tocan bien\", diga \"suenan a ustedes\".", {
      x: 0.5, y: 5.28, w: 9, h: 0.28,
      fontSize: 11, italic: true, color: C.gold, fontFace: FONT.head, align: "center", margin: 0
    });
  }

  // SLIDE 4 — 6 FORMATOS
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Contenido — formatos concretos, no teoría");

    s.addText("Cada formato tiene un trabajo. Ninguno sustituye seguimiento ni precios claros — son soportes.", {
      x: 0.5, y: 0.44, w: 9, h: 0.82,
      fontSize: 19,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.32,
      margin: 0
    });

    const formats = [
      {
        n: "01", motor: "DINERO", mC: C.green,
        name: "Prueba Bruta",
        hook: '"Así se puso una fiesta en Villahermosa…"',
        how: "Cámara fija. Gente bailando. Sin edición exagerada. La realidad vende sola.",
      },
      {
        n: "02", motor: "DINERO", mC: C.green,
        name: "Demostración de Poder",
        hook: '"Llegamos y nadie bailaba… 20 min después:"',
        how: "Arranca con público apagado. Corte duro a pista llena. No necesita voz en off.",
      },
      {
        n: "03", motor: "DINERO", mC: C.green,
        name: "Versatilidad Real",
        hook: '"De corrido a cumbia sin parar la fiesta"',
        how: "Transición de género en vivo, sin corte. Destruye la objeción de \"no sé si se adaptan\".",
      },
      {
        n: "04", motor: "CRECIMIENTO", mC: C.blue,
        name: "Cover Viral",
        hook: '"¿Y si esta rola fuera sierreña?"',
        how: "Canción popular adaptada a su estilo. Alcance masivo. No tiene que cerrar contratos — trae ojos.",
      },
      {
        n: "05", motor: "AUTORIDAD", mC: C.gold,
        name: "La Historia de Natanael Cano",
        hook: '"Ese día aprendimos qué significa tocar en grande"',
        how: "No como dato. Como historia: qué pasó, qué sintieron, qué cambió. Esto vale más que 100 posts.",
      },
      {
        n: "06", motor: "DINERO", mC: C.green,
        name: "Rescate de evento",
        hook: '"La fiesta estaba muerta… hasta que entramos"',
        how: "Muestra contraste real. Antes apagado → después lleno. Esto vende más que tocar bien.",
      },
    ];

    function drawCompactCard(f, x, y, w, h) {
      card(s, x, y, w, h, C.surface2);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h, fill: { color: f.mC } });
      s.addText(f.n, { x: x + 0.12, y: y + 0.08, w: 0.4, h: 0.3, fontSize: 10, bold: true, color: f.mC, fontFace: FONT.head, margin: 0 });
      pill(s, f.motor, x + 0.55, y + 0.1, f.mC, C.dark);
      s.addText(f.name, { x: x + 0.12, y: y + 0.42, w: w - 0.2, h: 0.3, fontSize: 12, bold: true, color: C.ink, fontFace: FONT.head, margin: 0 });
      s.addText(f.hook, { x: x + 0.12, y: y + 0.75, w: w - 0.2, h: 0.26, fontSize: 9.5, italic: true, color: C.gold, fontFace: FONT.body, margin: 0 });
      s.addText(f.how, { x: x + 0.12, y: y + 1.02, w: w - 0.2, h: h - 1.05, fontSize: 9, color: C.gray, fontFace: FONT.body, margin: 0 });
    }

    function drawTallCard(f, x, y, w, h) {
      card(s, x, y, w, h, C.surface2);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h, fill: { color: f.mC } });
      s.addText(f.n, { x: x + 0.12, y: y + 0.08, w: 0.4, h: 0.3, fontSize: 10, bold: true, color: f.mC, fontFace: FONT.head, margin: 0 });
      pill(s, f.motor, x + 0.55, y + 0.1, f.mC, f.mC === C.gold ? C.dark : C.dark);
      s.addText(f.name, { x: x + 0.12, y: y + 0.45, w: w - 0.2, h: 0.45, fontSize: 12, bold: true, color: C.ink, fontFace: FONT.head, lineSpacingMultiple: 1.2, margin: 0 });
      s.addText(f.hook, { x: x + 0.12, y: y + 0.95, w: w - 0.2, h: 0.7, fontSize: 10, italic: true, color: C.gold, fontFace: FONT.body, lineSpacingMultiple: 1.3, margin: 0 });
      s.addText(f.how, { x: x + 0.12, y: y + 1.7, w: w - 0.2, h: h - 1.75, fontSize: 10, color: C.gray, fontFace: FONT.body, lineSpacingMultiple: 1.4, margin: 0 });
    }

    formats.forEach((f, i) => {
      if (i < 3) {
        const row = i;
        drawCompactCard(f, 0.5, 1.08 + row * 1.45, 3.35, 1.28);
      } else if (i === 3) {
        drawCompactCard(f, 4.05, 1.08, 2.2, 2.1);
      } else if (i === 5) {
        drawCompactCard(f, 4.05, 3.24, 2.2, 2.15);
      } else if (i === 4) {
        drawTallCard(f, 7.6, 1.08, 2.2, 4.31);
      }
    });
  }

  // SLIDE 5 — SISTEMA DE DINERO
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Sistema de dinero — de pasivo a agresivo");

    s.addText("Tu sistema actual espera que el cliente llegue.\nEste sistema va por él.", {
      x: 0.5, y: 0.42, w: 9, h: 0.82,
      fontSize: 22,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.3,
      margin: 0
    });

    const steps = [
      {
        n: "ENTRADA", color: C.green,
        title: "WhatsApp automático",
        body: "Mensaje pre-configurado que arranca así:\n\"¿Qué fecha es tu evento y cuántas personas?\"\nNo saludan. No dicen precio. Van al dato.",
        rule: "El que pregunta controla la conversación."
      },
      {
        n: "FILTRO", color: C.gold,
        title: "No respondas precio directo",
        body: "Si preguntan \"¿cuánto cobran?\" antes de contexto: pedir tipo de evento, duración y lugar. Luego enviar menú con rangos (ver slide de precios): paquete base, horas extra, fecha peak, kilómetros. Sin estructura de precios el filtro no filtra — solo enoja.",
        rule: "Así dejas de competir por precio."
      },
      {
        n: "CIERRE", color: C.blue,
        title: "El video hace el trabajo",
        body: "No respondas con texto largo.\nManda el video más impactante de ambiente real.\nEl video cierra más que mil palabras de venta.",
        rule: "Quien manda evidencia, vende."
      },
    ];

    steps.forEach((st, i) => {
      const x = 0.5 + i * 3.15;
      card(s, x, 1.35, 2.95, 3.55, C.surface2);
      accentStripe(s, x, 1.35, 3.55, st.color, 0.038);

      s.addText(st.n, { x: x + 0.12, y: 1.45, w: 2.7, h: 0.28, fontSize: 8.5, bold: true, color: st.color, charSpacing: 3, fontFace: FONT.head, margin: 0 });
      s.addText(st.title, { x: x + 0.12, y: 1.76, w: 2.7, h: 0.42, fontSize: 14, bold: true, color: C.ink, fontFace: FONT.head, lineSpacingMultiple: 1.15, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: 2.22, w: 2.7, h: 0.025, fill: { color: C.graybg3 } });
      s.addText(st.body, { x: x + 0.12, y: 2.28, w: 2.7, h: 1.75, fontSize: 10.5, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.4, margin: 0 });

      s.addShape(pres.shapes.RECTANGLE, { x, y: 4.45, w: 2.95, h: 0.45, fill: { color: st.color, transparency: 85 } });
      s.addText(st.rule, { x: x + 0.1, y: 4.45, w: 2.75, h: 0.45, fontSize: 10, bold: true, italic: true, color: st.color, fontFace: FONT.head, valign: "middle", margin: 0 });
    });

    s.addText("\u2794", {
      x: 3.5,
      y: 2.88,
      w: 0.6,
      h: 0.4,
      fontSize: 18,
      color: C.dim,
      fontFace: FONT.display,
      align: "center",
      margin: 0,
    });
    s.addText("\u2794", {
      x: 6.65,
      y: 2.88,
      w: 0.6,
      h: 0.4,
      fontSize: 18,
      color: C.dim,
      fontFace: FONT.display,
      align: "center",
      margin: 0,
    });

    s.addText("REGLA DE CIERRE: Fecha se aparta solo con anticipo. Sin anticipo, sigue disponible.", {
      x: 0.6, y: 4.95, w: 8.8, h: 0.32,
      fontSize: 10, bold: true, color: C.red,
      fontFace: FONT.head, align: "center", margin: 0
    });
  }

  // SLIDE — PRECIOS: ANCLAS Y ESTRUCTURA
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Precios — sin esto el filtro de WhatsApp falla");

    s.addText("Responder \"depende\" sin anclas = pierdes venta o destruyes margen. Definan rangos por tipo de evento y horas, más 3 anclas de valor antes del precio final.", {
      x: 0.5, y: 0.44, w: 9, h: 0.95,
      fontSize: 17.5,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.3,
      margin: 0
    });

    const priceBlocks = [
      {
        title: "Matriz mínima",
        lines: "· Día / temporada (viernes vs sábado, mes alto)\n· Tipo (boda / XV / empresarial / bar)\n· Horas incluidas vs hora extra\n· Incluye/no incluye: transporte, sonido propio",
        c: C.gold,
      },
      {
        title: "Tres anclas antes del número",
        lines: "1) Video de rescate o pista llena real\n2) Coordinador o cliente que los recomiende por nombre\n3) Límite de fechas: \"así están armados junio y julio\"",
        c: C.green,
      },
      {
        title: "Escalón y descuento",
        lines: "· Precio lista + precio piso autorizado (solo con condiciones)\n· Nada de negociar en chat largo: opción A / B con alcance distinto\n· Anticipo mínimo escrito (misma regla que slide anterior)",
        c: C.blue,
      },
    ];
    priceBlocks.forEach((b, i) => {
      const x = 0.5 + i * 3.15;
      const y = 1.18;
      card(s, x, y, 2.95, 3.75, C.surface2);
      accentStripe(s, x, y, 3.75, b.c, 0.038);
      s.addText(b.title, { x: x + 0.12, y: y + 0.15, w: 2.7, h: 0.38, fontSize: 14, bold: true, color: b.c, fontFace: FONT.head, margin: 0 });
      s.addText(b.lines, { x: x + 0.12, y: y + 0.58, w: 2.7, h: 3.05, fontSize: 10.5, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.38, margin: 0 });
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 5.05,
      w: 9,
      h: 0.48,
      fill: { color: C.orangebg },
      rectRadius: 0.045,
    });
    accentStripe(s, 0.5, 5.05, 0.48, C.orange, 0.032);
    s.addText("REGLA: Documentar internamente montos reales (aunque no estén en redes). Si no saben su piso y techo, el cliente negocia contra ustedes mismos.", {
      x: 0.6, y: 5.08, w: 8.8, h: 0.42,
      fontSize: 10, bold: true, color: C.orange, fontFace: FONT.head, align: "center", lineSpacingMultiple: 1.2, margin: 0
    });
  }

  // SLIDE — EL BAR (matiz de percepción)
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "El bar — laboratorio, no tu única carta de “evento caro”");

    s.addText("El bar paga hoy y da material auténtico. Pero si toda la señal pública es “grupo de bar”, la gente ancla precio bajo, disponibilidad alta y poca urgencia. Usen el bar como fábrica de clips; la historia hacia privados debe mostrar otro contexto cuando puedan (salón, cliente, vestuario de evento).", {
      x: 0.5, y: 0.42, w: 9, h: 1.12,
      fontSize: 17.5,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.3,
      margin: 0
    });

    card(s, 0.5, 1.42, 9, 0.62, C.surface2);
    accentStripe(s, 0.5, 1.42, 0.62, C.coral, 0.034);
    s.addText("RIESGO REAL: dominar eventos con vitrina solo de bar no cuadra. Mitigan equilibrando ratio: contenido que luzca como grupo de evento, no solo de barra.", {
      x: 0.65,
      y: 1.48,
      w: 8.75,
      h: 0.52,
      fontSize: 11,
      color: "D4B8B4",
      fontFace: FONT.body,
      lineSpacingMultiple: 1.26,
      margin: 0,
    });

    card(s, 0.5, 2.12, 9, 0.68, C.surface2);
    accentStripe(s, 0.5, 2.12, 0.68, C.orange, 0.034);
    s.addText("REGLA NUEVA: No hay show sin grabación. Si no grabas, perdiste dinero indirecto.", {
      x: 0.65, y: 2.22, w: 8.7, h: 0.52,
      fontSize: 13, bold: true, color: C.orange, fontFace: FONT.head, valign: "middle", margin: 0
    });

    const uses = [
      {
        title: "Fábrica de contenido",
        color: C.green,
        desc: "Cada show es sesión de grabación: iluminación y gente real. Prioricen clips que puedan editarse para verse como “evento”, no solo barra.",
        detail: "Meta: 3 clips usables por noche + 1 toma pensada para WhatsApp/cierre."
      },
      {
        title: "Laboratorio de hooks",
        color: C.blue,
        desc: "Qué canción prende al público = hipótesis para el próximo reel. Contrasten con audio que delate su firma musical (slide anterior).",
        detail: "Meta: 1 hook ganador por semana, probado en vivo antes de viralizar."
      },
      {
        title: "Prueba social semanal",
        color: C.gold,
        desc: "La constancia transmite profesionismo; también puede anclar “barato”. Compensen con historias de agenda, anticipos y fechas tomadas.",
        detail: "Meta: story en vivo + screenshot de confirmación/anticipo (sin datos sensibles)."
      },
    ];

    uses.forEach((u, i) => {
      const x = 0.5 + i * 3.15;
      const uy = 2.92;
      card(s, x, uy, 2.95, 2.65, C.surface2);
      accentStripe(s, x, uy, 2.65, u.color, 0.036);
      s.addText(u.title, { x: x + 0.12, y: uy + 0.12, w: 2.7, h: 0.36, fontSize: 12, bold: true, color: u.color, fontFace: FONT.head, margin: 0 });
      s.addText(u.desc, { x: x + 0.12, y: uy + 0.52, w: 2.7, h: 1.28, fontSize: 10.5, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.34, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: uy + 1.88, w: 2.7, h: 0.025, fill: { color: C.graybg3 } });
      s.addText(u.detail, { x: x + 0.12, y: uy + 1.93, w: 2.7, h: 0.58, fontSize: 9.5, italic: true, color: u.color, fontFace: FONT.head, margin: 0 });
    });
  }

  // SLIDE 7 — DIFERENCIADOR
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Diferenciación — crea algo que nadie más puede copiar fácil");

    s.addText("\"Tocamos bien\" no sirve.", {
      x: 0.5, y: 0.42, w: 9, h: 0.52,
      fontSize: 28,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      margin: 0
    });
    s.addText("El show y el audio mandan. Lo visual acelera; si suenan genéricos, el reel solo entierra la propuesta más rápido.", {
      x: 0.5, y: 1.06, w: 9, h: 0.42,
      fontSize: 12, italic: true, color: C.gray, fontFace: FONT.body, lineSpacingMultiple: 1.25, margin: 0
    });

    const diffs = [
      {
        tag: "OPCIÓN A", color: C.green, recommended: true,
        title: "Interacción exagerada",
        desc: "Bromas con el público, dinámicas, llamar a alguien al frente. La gente recuerda cómo los hicieron sentir, no las canciones.",
        why: "Fácil de replicar en video. Muy difícil de copiar por otros grupos."
      },
      {
        tag: "OPCIÓN B", color: C.blue, recommended: true,
        title: "Estilo visual consistente",
        desc: "Vestimenta idéntica en cada show. Una imagen que se reconoce al instante en cualquier foto o video.",
        why: "Primeras 0.5 segundos del reel — el cerebro ya sabe quiénes son."
      },
      {
        tag: "OPCIÓN C", color: C.purple, recommended: false,
        title: "Formato de mezcla único",
        desc: "Bloques por género dentro del mismo show. Anunciado: \"Ahora 15 minutos de puros corridos duros.\" El público sabe qué esperar.",
        why: "Crea expectativa y estructura — muy diferente a improvisar."
      },
      {
        tag: "OPCIÓN D", color: C.orange, recommended: false,
        title: "Energía de show",
        desc: "Movimiento en escena, no solo tocar parado. No tiene que ser coreografía — solo intención física en cada momento.",
        why: "En video, la energía vende antes de que se escuche la música."
      },
    ];

    diffs.forEach((d, i) => {
      const x = i % 2 === 0 ? 0.5 : 5.2;
      const y = 1.4 + Math.floor(i / 2) * 1.68;
      card(s, x, y, 4.5, 1.52, C.surface2);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h: 1.52, fill: { color: d.color } });
      pill(s, d.tag, x + 0.12, y + 0.1, d.color, C.dark);
      if (d.recommended) pill(s, "RECOMENDADO", x + 0.12 + d.tag.length * 0.095 + 0.5, y + 0.1, C.green, C.dark);
      s.addText(d.title, { x: x + 0.12, y: y + 0.4, w: 4.25, h: 0.3, fontSize: 13, bold: true, color: C.ink, fontFace: FONT.head, margin: 0 });
      s.addText(d.desc, { x: x + 0.12, y: y + 0.72, w: 4.25, h: 0.46, fontSize: 10, color: C.gray, fontFace: FONT.body, lineSpacingMultiple: 1.28, margin: 0 });
      s.addText(d.why, { x: x + 0.12, y: y + 1.22, w: 4.25, h: 0.24, fontSize: 9.5, italic: true, color: d.color, fontFace: FONT.body, margin: 0 });
    });

    s.addText("REGLA: Elegir 1 diferenciador en 7 días. No elegir = seguir siendo uno más.", {
      x: 0.5, y: 5.08, w: 9, h: 0.38,
      fontSize: 11, bold: true, color: C.red,
      fontFace: FONT.head, align: "center", margin: 0
    });
  }

  // SLIDE 8 — DOMINIO LOCAL
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Dominio local — omnipresencia en Villahermosa");

    s.addText("Que nadie en Villahermosa piense en contratar un grupo\nsin pensar primero en Los Reales del Edén.", {
      x: 0.5, y: 0.4, w: 9, h: 1.06,
      fontSize: 24,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.28,
      margin: 0
    });

    card(s, 0.5, 1.38, 4.3, 3.48, C.surface2);
    accentStripe(s, 0.5, 1.38, 3.48, C.purple, 0.04);
    s.addText("DIGITAL · Aparecer donde está el organizador", {
      x: 0.62, y: 1.48, w: 4.1, h: 0.3, fontSize: 10, bold: true, color: C.purple, charSpacing: 1,
      fontFace: FONT.head, margin: 0
    });

    const digitalTactics = [
      ["Comentar en salones de eventos", "No promo. Comentario real. \"Ese lugar tiene excelente acústica\""],
      ["Comentar en posts de DJs y coordinadores", "Posicionarse como parte del ecosistema de eventos"],
      ["Etiquetar clientes en sus propias fotos del evento", "El organizador lo comparte → sus contactos lo ven"],
      ["Aparecer en historias del cliente", "Pedir que mencionen al grupo en el día del evento"],
    ];
    digitalTactics.forEach(([title, desc], i) => {
      const y = 1.88 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.62, y: y + 0.05, w: 0.05, h: 0.48, fill: { color: C.purple } });
      s.addText(title, { x: 0.77, y, w: 3.9, h: 0.26, fontSize: 10.5, bold: true, color: C.cream, fontFace: FONT.body, margin: 0 });
      s.addText(desc, { x: 0.77, y: y + 0.28, w: 3.9, h: 0.38, fontSize: 9.5, color: C.gray, fontFace: FONT.body, margin: 0 });
    });

    card(s, 5.2, 1.38, 4.3, 3.48, C.surface2);
    accentStripe(s, 5.2, 1.38, 3.48, C.green, 0.04);
    s.addText("FÍSICO · Estar donde se toman las decisiones", {
      x: 5.32, y: 1.48, w: 4.1, h: 0.3, fontSize: 10, bold: true, color: C.green, charSpacing: 1,
      fontFace: FONT.head, margin: 0
    });

    const physicalTactics = [
      ["3 coordinadores aliados", "Una llamada personal vale más que 50k seguidores. Relación, no transacción."],
      ["5 salones con material físico", "Tarjeta con QR directo a WhatsApp. Dejarla no pedir favores."],
      ["Grupos de Facebook de nicho", "Novias, mamás de XV, grupos de organización. Presencia constante."],
      ["Sistema de testimonio", "Grabación espontánea el día siguiente. Sin guión. Sin cámara de producción."],
    ];
    physicalTactics.forEach(([title, desc], i) => {
      const y = 1.88 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y: y + 0.05, w: 0.05, h: 0.48, fill: { color: C.green } });
      s.addText(title, { x: 5.47, y, w: 3.9, h: 0.26, fontSize: 10.5, bold: true, color: C.cream, fontFace: FONT.body, margin: 0 });
      s.addText(desc, { x: 5.47, y: y + 0.28, w: 3.9, h: 0.38, fontSize: 9.5, color: C.gray, fontFace: FONT.body, margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.98, w: 9, h: 0.58, fill: { color: C.graybg2 } });
    s.addText("LÍNEA ROJA — omnipresencia mal hecha = spam y desesperación. Reglas: 1) Valor primero (elogio específico, dato útil), nunca pitch en comentario público. 2) Poquísimas interacciones por día, curadas. 3) Offline antes que polémica en redes. 4) Si dudan si parece “urgidos por trabajo”, no lo publican.", {
      x: 0.58, y: 5.0, w: 8.84, h: 0.54,
      fontSize: 9, bold: true, color: C.red, fontFace: FONT.head, align: "center", lineSpacingMultiple: 1.22, margin: 0
    });
  }

  // SLIDE 9 — PLAN 30 DÍAS
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Plan de contenido — 30 días, doble motor");

    s.addText("Cada pieza: motor + job (atraer / probar / empujar a WhatsApp). Nada ritual sin hipótesis.", {
      x: 0.5,
      y: 0.38,
      w: 9,
      h: 0.4,
      fontSize: 15,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.2,
      margin: 0
    });
    s.addText(
      "Distribución objetivo (~): 55% DINERO · 25% CRECIMIENTO · 20% AUTORIDAD. Días sin post = grabación/edición/repurposing — no fallo, es producción.",
      {
        x: 0.5,
        y: 0.79,
        w: 9,
        h: 0.28,
        fontSize: 9.2,
        color: C.gray,
        fontFace: FONT.body,
        lineSpacingMultiple: 1.18,
        margin: 0
      }
    );
    s.addText(
      "Calendario ligado a cierre: responsable, fecha y seguimiento en WA/coord. Repurposing mínimo: 1 sesión fuerte → reel + 2–3 stories + clip para cierre en chat.",
      {
        x: 0.5,
        y: 1.04,
        w: 9,
        h: 0.26,
        fontSize: 9,
        italic: true,
        color: C.gold,
        fontFace: FONT.head,
        lineSpacingMultiple: 1.15,
        margin: 0
      }
    );

    const legY = 1.26;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: legY, w: 0.18, h: 0.18, fill: { color: C.green } });
    s.addText("DINERO", { x: 0.72, y: legY, w: 1.0, h: 0.18, fontSize: 9, bold: true, color: C.green, fontFace: FONT.head, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.75, y: legY, w: 0.18, h: 0.18, fill: { color: C.blue } });
    s.addText("CRECIMIENTO", { x: 1.97, y: legY, w: 1.3, h: 0.18, fontSize: 9, bold: true, color: C.blue, fontFace: FONT.head, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 3.3, y: legY, w: 0.18, h: 0.18, fill: { color: C.gold } });
    s.addText("AUTORIDAD", { x: 3.52, y: legY, w: 1.2, h: 0.18, fontSize: 9, bold: true, color: C.gold, fontFace: FONT.head, valign: "middle", margin: 0 });

    const weeks = [
      {
        label: "SEM 1", sublabel: "Prueba + hook", color: C.green,
        days: [
          { d: "D1", t: "Prueba brutal: gancho visual 0–1s + contraste real si hay", m: C.green },
          { d: "D2", t: "Stories serie 3 tapas — CTA “fecha + personas” WA (Zeigarnik)", m: C.green },
          { d: "D4", t: "Cover viral: mismo audio 2 ganchos (curiosidad + firma)", m: C.blue },
          { d: "D7", t: "Urgencia real: solo si agenda lo respalda — evita falsas escases", m: C.green },
        ]
      },
      {
        label: "SEM 2", sublabel: "Objeciones", color: C.blue,
        days: [
          { d: "D8", t: "Demostración poder: silencio → pista — sin spoiler en portada", m: C.green },
          { d: "D10", t: "Versatilidad: transición corrido→cumbia (destruye “no se adaptan”)", m: C.green },
          { d: "D12", t: "Reto/trend: audio propio regional (no solo moda ajena)", m: C.blue },
          { d: "D14", t: "Testimonio con nombre/contexto — audio > solo screenshot", m: C.green },
        ]
      },
      {
        label: "SEM 3", sublabel: "Autoridad", color: C.gold,
        days: [
          { d: "D15", t: "Historia Natanael: pico-emoción+cierre (“qué cambió después”)", m: C.gold },
          { d: "D17", t: "BTS soundcheck — humaniza (liking/reciprocidad antes del pitch)", m: C.green },
          { d: "D18", t: "Mashup 60s: 3 géneros; subtítulos grandes (silent scroll)", m: C.blue },
          { d: "D21", t: "Precio-tabla story: framing; detalle solo por WA", m: C.green },
        ]
      },
      {
        label: "SEM 4", sublabel: "Compuesto", color: C.orange,
        days: [
          { d: "D23", t: "Best-of 90s: solo clips ya probados — no nuevo por nuevo", m: C.blue },
          { d: "D24", t: "Urgencia fechas peek (verdadera) + mismo día DM activo", m: C.green },
          { d: "D27", t: "2° testimonio + clip ambiente mismo evento si existe", m: C.green },
          { d: "D29", t: "Cover siguiente hit — medir saves vs reel anterior", m: C.blue },
        ]
      },
    ];

    weeks.forEach((wk, wi) => {
      const baseY = 1.52 + wi * 0.92;
      card(s, 0.5, baseY, 1.2, 0.82, wk.color);
      s.addText(wk.label, { x: 0.5, y: baseY + 0.03, w: 1.2, h: 0.34, fontSize: 12, bold: true, color: C.dark, fontFace: FONT.head, align: "center", margin: 0 });
      s.addText(wk.sublabel, { x: 0.5, y: baseY + 0.44, w: 1.2, h: 0.32, fontSize: 8, color: "555555", fontFace: FONT.head, align: "center", margin: 0 });

      wk.days.forEach((day, di) => {
        const x = 1.82 + di * 2.04;
        card(s, x, baseY, 1.93, 0.82, C.surface2);
        s.addShape(pres.shapes.RECTANGLE, { x, y: baseY, w: 0.04, h: 0.82, fill: { color: day.m } });
        s.addText(day.d, { x: x + 0.1, y: baseY + 0.05, w: 0.45, h: 0.2, fontSize: 8.5, bold: true, color: day.m, fontFace: FONT.head, margin: 0 });
        s.addText(day.t, { x: x + 0.1, y: baseY + 0.27, w: 1.75, h: 0.5, fontSize: 8.5, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.2, margin: 0 });
      });
    });

    s.addText("MÍNIMO 4 piezas/sem.; ideal 6+ con repurposing. 1 métrica útil/semana en reel viral: saves o shares — no vivir solo de vistas.", {
      x: 0.5, y: 5.06, w: 9, h: 0.42,
      fontSize: 8.5, bold: true, color: C.gold,
      fontFace: FONT.head, align: "center", lineSpacingMultiple: 1.12, margin: 0
    });
  }

  // SLIDE — TABLERO NORTH STAR (Executive / Bento — UI UX Pro Max: Comparative + Financial cues)
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Tablero — números + origen · revisión viernes");

    s.addText("15 minutos, mismo formato. Feedback loop antes que opiniones.", {
      x: 0.5,
      y: 0.38,
      w: 9,
      h: 0.48,
      fontSize: 22,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.2,
      margin: 0
    });
    s.addText(
      "Métrica vanidad fuera del tablero: likes y vistas solo como nota al pie si aportan decisión.",
      {
        x: 0.5,
        y: 0.9,
        w: 9,
        h: 0.26,
        fontSize: 9,
        color: C.gray,
        fontFace: FONT.body,
        lineSpacingMultiple: 1.2,
        margin: 0,
      }
    );

    function tile(x, y, w, h, accent, titleTxt, placeholder, hint) {
      card(s, x, y, w, h, C.surface);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h, fill: { color: accent } });
      s.addText(titleTxt, {
        x: x + 0.14,
        y: y + 0.08,
        w: w - 0.22,
        h: 0.34,
        fontSize: 7.8,
        bold: true,
        color: accent,
        charSpacing: 1,
        fontFace: FONT.head,
        margin: 0,
      });
      s.addText(placeholder, {
        x: x + 0.14,
        y: y + 0.4,
        w: w - 0.22,
        h: 0.72,
        fontSize: 26,
        italic: true,
        color: C.ink,
        fontFace: FONT.display,
        valign: "middle",
        margin: 0,
      });
      if (hint) {
        s.addText(hint, {
          x: x + 0.14,
          y: y + h - 0.52,
          w: w - 0.22,
          h: 0.42,
          fontSize: 8,
          color: C.gray,
          fontFace: FONT.body,
          lineSpacingMultiple: 1.2,
          margin: 0,
        });
      }
    }

    const rowY = 1.12;
    const gx = 0.2;
    const tw = 2.05;
    const th = 1.52;
    tile(0.5, rowY, tw, th, C.green, "CITAS NUEVAS (sem)", "\u2014", "Solicitudes serias vía WA o llamada.");
    tile(0.5 + tw + gx, rowY, tw, th, C.goldlt, "CERRADOS (sem)", "\u2014", "Con anticipo / contrato donde aplique.");
    tile(0.5 + (tw + gx) * 2, rowY, tw, th, C.blue, "TICKET PROM.", "\u2014", "Solo cerrados.");
    tile(0.5 + (tw + gx) * 3, rowY, tw, th, C.orange, "COTIZ. ABIERTAS", "\u2014", "Pipeline sin perder.");

    card(s, 0.5, 2.7, 5.94, 1.94, C.surface);
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.7, w: 0.055, h: 1.94, fill: { color: C.purple } });
    s.addText("Origen de cierres (ej. últimos 30 días o muestra últimos 5)", {
      x: 0.64,
      y: 2.84,
      w: 5.72,
      h: 0.28,
      fontSize: 9.5,
      bold: true,
      color: C.ink,
      fontFace: FONT.head,
      margin: 0,
    });

    const origins = [
      { p: 0.42, c: C.green, l: "Recom." },
      { p: 0.28, c: C.blue, l: "Coord." },
      { p: 0.22, c: C.gold, l: "Redes" },
      { p: 0.08, c: C.orange, l: "Otro" },
    ];
    const bx = 0.64;
    const byBar = 3.18;
    const bw = 5.74;
    const bh = 0.42;
    let lx = bx;
    origins.forEach((seg) => {
      const segW = bw * seg.p;
      s.addShape(pres.shapes.RECTANGLE, {
        x: lx, y: byBar, w: Math.max(segW, 0.06), h: bh, fill: { color: seg.c },
      });
      s.addText(seg.l, {
        x: lx,
        y: byBar + 0.08,
        w: Math.max(segW, 0.08),
        h: 0.28,
        fontSize: 8.5,
        bold: true,
        color: C.dark,
        fontFace: FONT.head,
        align: "center",
        valign: "middle",
        margin: 0,
      });
      lx += bw * seg.p;
    });
    s.addText("% ilustrativos \u2014 reemplazar con datos reales cada viernes.", {
      x: 0.64,
      y: 3.72,
      w: 5.74,
      h: 0.22,
      fontSize: 7.8,
      color: C.gray,
      fontFace: FONT.body,
      margin: 0,
    });

    card(s, 6.58, rowY, 2.92, th, C.surface);
    s.addShape(pres.shapes.RECTANGLE, { x: 6.58, y: rowY, w: 0.055, h: th, fill: { color: C.green } });
    s.addText("CONTENIDO (sem)", {
      x: 6.72,
      y: rowY + 0.08,
      w: 2.65,
      h: 0.3,
      fontSize: 7.8,
      bold: true,
      color: C.green,
      charSpacing: 1,
      fontFace: FONT.head,
      margin: 0,
    });
    s.addText("Plan vs publicado", {
      x: 6.72,
      y: rowY + 0.38,
      w: 2.65,
      h: 0.24,
      fontSize: 9,
      color: C.gray,
      fontFace: FONT.body,
      margin: 0,
    });
    barFilled(s, 6.72, rowY + 0.66, 2.65, 0.2, 0.75, C.green);
    s.addText("ej. 3 / 4 piezas", {
      x: 6.72,
      y: rowY + 0.9,
      w: 2.65,
      h: 0.28,
      fontSize: 8.5,
      color: C.cream,
      fontFace: FONT.body,
      margin: 0,
    });

    card(s, 6.58, 2.7, 2.92, 1.94, C.surface);
    s.addShape(pres.shapes.RECTANGLE, { x: 6.58, y: 2.7, w: 0.055, h: 1.94, fill: { color: C.blue } });
    s.addText("REEL VIRAL (sem)", {
      x: 6.72,
      y: 2.86,
      w: 2.65,
      h: 0.28,
      fontSize: 7.8,
      bold: true,
      color: C.blue,
      charSpacing: 1,
      fontFace: FONT.head,
      margin: 0,
    });
    s.addText("Saves", {
      x: 6.72,
      y: 3.24,
      w: 0.85,
      h: 0.2,
      fontSize: 8,
      color: C.gray,
      fontFace: FONT.body,
      margin: 0,
    });
    s.addText("\u2014", {
      x: 7.58,
      y: 3.2,
      w: 1.78,
      h: 0.45,
      fontSize: 24,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      margin: 0,
    });
    s.addText("Shares", {
      x: 6.72,
      y: 3.72,
      w: 0.85,
      h: 0.2,
      fontSize: 8,
      color: C.gray,
      fontFace: FONT.body,
      margin: 0,
    });
    s.addText("\u2014", {
      x: 7.58,
      y: 3.68,
      w: 1.78,
      h: 0.45,
      fontSize: 24,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      margin: 0,
    });
    s.addText("Comparar con reel anterior \u2014 no con otros grupos.", {
      x: 6.72,
      y: 4.28,
      w: 2.65,
      h: 0.38,
      fontSize: 8,
      italic: true,
      color: C.gray,
      fontFace: FONT.body,
      lineSpacingMultiple: 1.2,
      margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.85, w: 9, h: 0.58, fill: { color: C.graybg2 } });
    s.addText(
      "North Star semanal: cerrados con origen trazable + consistencia de contenido. Si la tabla va vacía tres viernes seguidos, el problema no es el algoritmo \u2014 es operación.",
      {
        x: 0.62,
        y: 4.9,
        w: 8.76,
        h: 0.48,
        fontSize: 9,
        italic: true,
        color: C.gold,
        fontFace: FONT.body,
        align: "center",
        lineSpacingMultiple: 1.18,
        margin: 0,
      }
    );
  }

  // SLIDE 10 — ERRORES
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Lo que hay que dejar de hacer hoy mismo");

    s.addText("Algunos de estos están pasando ahora mismo.", {
      x: 0.5,
      y: 0.44,
      w: 9,
      h: 0.32,
      fontSize: 17,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      margin: 0
    });

    const errores = [
      { n: "01", title: "Solo contenido de eventos", desc: "Sin motor de crecimiento viral, el alcance está limitado a quien ya los busca. Nunca llegas a nuevos ojos." },
      { n: "02", title: "Precio que se negocia solo", desc: "Cada vez que aceptan menos del mínimo destruyen el posicionamiento. El filtro de WhatsApp elimina esto." },
      { n: "03", title: "Natanael Cano como dato suelto", desc: "\"Abrimos para Natanael Cano\" es un dato. Narrado como historia, es el activo de autoridad más fuerte que tienen." },
      { n: "04", title: "Shows sin grabación", desc: "Cada show sin cámara es contenido perdido, hooks no descubiertos, prueba social que nadie vio." },
      { n: "05", title: "Sin diferenciador visible", desc: "\"Tocamos bien\" es lo mismo que dicen todos. Sin un elemento visual o de interacción único, son invisibles." },
      { n: "06", title: "Cero omnipresencia local", desc: "No comentan, no etiquetan, no aparecen. En Villahermosa, quien no se ve no existe. El ecosistema de eventos es pequeño." },
      { n: "07", title: "Creer que el reel reemplaza recomendación", desc: "Si casi nadie los contrata solo por redes sin puente relacional, el \"motor viral\" está sobrestimado. Medir contratos, no solamente alcance." },
      { n: "08", title: "Indistinguibles en 10 s de audio", desc: "Sin firma sonora clara, el mejor embudo y el mejor copy no importan: el cerebro los archiva como \"otro grupo\"." },
    ];

    errores.forEach((e, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.5 : 5.15;
      const y = 0.93 + row * 1.05;

      card(s, x, y, 4.45, 0.95, C.surface2);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h: 0.95, fill: { color: C.red } });

      s.addText(e.n, { x: x + 0.13, y: y + 0.05, w: 0.42, h: 0.32, fontSize: 17, bold: true, color: C.red, fontFace: FONT.head, margin: 0 });
      s.addText(e.title, { x: x + 0.58, y: y + 0.08, w: 3.75, h: 0.3, fontSize: 11.5, bold: true, color: C.ink, fontFace: FONT.head, margin: 0 });
      s.addText(e.desc, { x: x + 0.13, y: y + 0.42, w: 4.2, h: 0.48, fontSize: 9.5, color: C.gray, fontFace: FONT.body, lineSpacingMultiple: 1.22, margin: 0 });
    });
  }

  // SLIDE 11 — PLAN DE ACCIÓN (9 pasos)
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Plan de acción — en este orden exacto");

    s.addText("Sin saltarse pasos. Sin hacer todo a la vez.", {
      x: 0.5, y: 0.48, w: 9, h: 0.5,
      fontSize: 22,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      margin: 0
    });

    const acciones = [
      { n: 1, plazo: "Esta semana", accion: "WhatsApp Business con mensaje automático: \"¿Qué fecha y cuántas personas?\" — link en todas las bios", iC: C.red, tag: "INMEDIATO" },
      { n: 2, plazo: "Esta semana", accion: "Perfil convertido en vendedor: bio enfocada, 9 fotos solo de eventos, destacados organizados", iC: C.red, tag: "INMEDIATO" },
      { n: 3, plazo: "Semana 1", accion: "Primer video Prueba Bruta desde el bar. Cámara fija, gente bailando, hook en los primeros 3 segundos", iC: C.orange, tag: "MOTOR DINERO" },
      { n: 4, plazo: "Semana 1", accion: "Primer cover viral: elegir la canción más de moda y adaptarla. Publicar con hook \"¿Y si X fuera sierreña?\"", iC: C.blue, tag: "MOTOR CREC." },
      { n: 5, plazo: "Semana 2", accion: "Contactar 3 coordinadores de eventos en Villahermosa. Llamada personal — no mensaje masivo, no promo", iC: C.gold, tag: "MUY ALTO" },
      { n: 6, plazo: "Semana 2", accion: "Visitar 5 salones de eventos con tarjeta + QR de WhatsApp. Dejar material físico, no pedir favores", iC: C.gold, tag: "ALTO" },
      { n: 7, plazo: "Semana 3", accion: "Publicar la historia de Natanael Cano: narrada en video, con emoción real, no como dato de currículum", iC: C.green, tag: "AUTORIDAD" },
      { n: 8, plazo: "Mes 1", accion: "Elegir y ejecutar 1 diferenciador visual o de interacción. Consistente desde ahora en cada show y cada video", iC: C.purple, tag: "DOMINIO" },
      { n: 9, plazo: "Mes 1", accion: "Cerrar mínimo 2 eventos privados aunque no sean perfectos. Prioridad: flujo y testimonios.", iC: C.green, tag: "DINERO REAL" },
    ];

    const rowH = 0.445;
    const y0 = 0.9;

    for (let i = 0; i < acciones.length; i++) {
      const a = acciones[i];
      const y = y0 + i * rowH;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: rowH, fill: { color: i % 2 === 0 ? C.graybg : C.graybg2 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.4, h: rowH, fill: { color: a.iC } });
      s.addText(String(a.n), { x: 0.5, y, w: 0.4, h: rowH, fontSize: 14, bold: true, color: C.dark, fontFace: FONT.head, align: "center", valign: "middle", margin: 0 });
      s.addText(a.plazo, { x: 0.97, y: y + 0.04, w: 1.15, h: rowH - 0.08, fontSize: 8.5, bold: true, color: a.iC, fontFace: FONT.head, valign: "middle", margin: 0 });
      s.addText(a.accion, { x: 2.17, y: y + 0.03, w: 5.95, h: rowH - 0.06, fontSize: 9.5, color: C.cream, fontFace: FONT.body, valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 8.22, y: y + 0.08, w: 1.18, h: rowH - 0.16, fill: { color: a.iC } });
      s.addText(a.tag, { x: 8.22, y: y + 0.08, w: 1.18, h: rowH - 0.16, fontSize: 7, bold: true, color: C.dark, fontFace: FONT.head, align: "center", valign: "middle", margin: 0 });
    }
  }

  // SLIDE — EJECUCIÓN: el plan falla sin disciplina
  {
    const s = pres.addSlide();
    bg(s, C.dark);
    label(s, "Ejecución — sistema mínimo vivo");

    s.addText("Este deck no falla por ideas; falla si esperan disciplina perfecta sin diseño anti-caos. Menos promesas, más ritual semanal.", {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 14,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      lineSpacingMultiple: 1.34,
      margin: 0
    });

    const exec = [
      { t: "Ritual de 45 min / semana", d: "Revisar: citas nuevas, cotizaciones abiertas, contenido grabado vs publicado, 1 llamada a coordinador. Sin reunión fija, no hay negocio — solo ansiedad." },
      { t: "Dueño único de WhatsApp", d: "Una persona responde con el guion y el menú de precios. Mezclar voces = cliente confundido y precio regateado en cadena." },
      { t: "Mínimo viable real", d: "Si 4 piezas/semana es imposible hoy, acuerden 2 + 1 reel “dinero” y midan. Mejor consistencia baja que ráfaga y abandono." },
      { t: "Métricas que no mienten", d: "Llenar el tablero semanal (slide anterior): citas, cerrados, origen, ticket, contenido plan vs publicado y saves/shares del reel viral. Likes fuera de esa tabla = distracción." },
    ];
    exec.forEach((row, i) => {
      const y = 1.12 + i * 1.02;
      card(s, 0.5, y, 9, 0.95, C.surface2);
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.95, fill: { color: C.green } });
      s.addText(row.t, { x: 0.65, y: y + 0.1, w: 8.6, h: 0.26, fontSize: 13, bold: true, color: C.green, fontFace: FONT.head, margin: 0 });
      s.addText(row.d, { x: 0.65, y: y + 0.4, w: 8.6, h: 0.5, fontSize: 10.5, color: C.cream, fontFace: FONT.body, lineSpacingMultiple: 1.28, margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.2, w: 9, h: 0.34, fill: { color: C.redbg } });
    s.addText("Regla final: si no pueden sostener el ritual, reduzcan el plan hasta que quepa — pero no mientan sobre la ejecución.", {
      x: 0.55, y: 5.24, w: 8.9, h: 0.26,
      fontSize: 9, bold: true, color: C.red, fontFace: FONT.head, align: "center", margin: 0
    });
  }

  // SLIDE 12 — CIERRE
  {
    const s = pres.addSlide();
    bg(s, C.dark);

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 0.055,
      h: H,
      fill: { color: C.champagne, transparency: 45 },
    });

    s.addText("La pregunta que importa", {
      x: 0.5, y: 0.45, w: 9, h: 0.32,
      fontSize: 9.5, bold: true, color: C.champagneHi, charSpacing: 1.25,
      fontFace: FONT.head, align: "center", margin: 0
    });

    s.addText("¿En seis meses,\ncuándo alguien en Villahermosa\npiense en contratar un grupo —\n¿en quién piensa primero?", {
      x: 0.5, y: 0.85, w: 9, h: 2.35,
      fontSize: 28,
      italic: true,
      color: C.ink,
      fontFace: FONT.display,
      align: "center",
      lineSpacingMultiple: 1.22,
      margin: 0
    });

    s.addText("Ese es el objetivo real. Todo lo demás — precio, contenido, bar, coordinadores — son herramientas para llegar ahí.", {
      x: 1.0, y: 3.32, w: 8, h: 0.72,
      fontSize: 13.5,
      italic: true,
      color: C.gray,
      fontFace: FONT.body,
      align: "center",
      lineSpacingMultiple: 1.38,
      margin: 0
    });

    const metrics = [
      { val: "2", label: "motores activos\nsiempre" },
      { val: "1", label: "diferenciador\nvisible\nclaro" },
      { val: "3", label: "coordinadores\naliados mes 1" },
    ];
    metrics.forEach((m, i) => {
      const x = 1.5 + i * 2.7;
      card(s, x, 3.95, 2.2, 1.45, C.surface2);
      accentStripe(s, x, 3.95, 1.45, C.champagne, 0.042);
      s.addText(m.val, {
        x,
        y: 4.09,
        w: 2.2,
        h: 0.68,
        fontSize: 38,
        italic: true,
        color: C.champagneHi,
        fontFace: FONT.display,
        align: "center",
        margin: 0
      });
      s.addText(m.label, { x: x + 0.1, y: 4.75, w: 2.0, h: 0.55, fontSize: 11, color: C.gray, fontFace: FONT.body, align: "center", lineSpacingMultiple: 1.2, margin: 0 });
    });
  }

  const outPath =
    process.env.PPTX_OUT ||
    require("path").join(process.cwd(), "LosRealesDelEden_Dominio2025.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Deck generado:", outPath);
}

build().catch(console.error);
