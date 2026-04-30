/**
 * Contenido alineado con build-reales-deck.js (Los Reales del Edén — Dominio Villahermosa 2025).
 * Los integrantes pueden seguir aquí plan de contenido y hitos.
 */

export const SITE = {
  grupo: "Los Reales del Edén",
  subtitulo: "Dominio Villahermosa · plan operativo (equipo)",
  /** Mismo clip full-screen del brief Bloom (loop en fondo). */
  videoHero:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4",
};

export const MOTOR_HEX = {
  dinero: "#56A090",
  crecimiento: "#7399C9",
  autoridad: "#C4A962",
  alerta: "#C85852",
  naranja: "#C48860",
  coral: "#B0766E",
  morado: "#A699D4",
};

/** Resumen primera diapositiva + contraste North Star / fuera de foco. */
export const introPortada = {
  lineaFalsa: "El objetivo no es solo promover más tocadas.",
  manifiesto: "«más eventos privados»",
  norte:
    "Ser el grupo más visible y solicitado en Villahermosa.",
  parrafoCiudad:
    "En esta ciudad siguen cerrando recomendación, coordinadores y confianza cara a cara. Las redes amplifican; no sustituyen eso.",
  pieDeck: "Estrategia operativa · Villahermosa · 2025",
  tarjetaA: {
    titulo: "Fuera de foco",
    texto: "Sobrevivir de volumen sin posicionamiento claro.",
    tint: MOTOR_HEX.coral,
  },
  tarjetaB: {
    titulo: "North Star",
    texto: "Omnipresencia local con precio defendible y prueba real.",
    tint: MOTOR_HEX.dinero,
  },
  dobleMotor: {
    headline: "Un solo motor revienta el motor.",
    dek:
      "Las piezas tienen dos funciones — dinero hoy + crecimiento mañana. Más contenido sin sistema no garantiza más contratos.",
  },
};

export type MotorKey =
  | "dinero"
  | "crecimiento"
  | "autoridad"
  | "mixto";

/** Un día publicable del calendario — `texto` es el resumen; `detalle` explica qué hacer en lenguaje claro. */
export interface PlanDay {
  dia: string;
  texto: string;
  motor: MotorKey;
  detalle: string;
}

export interface PlanWeek {
  semana: number;
  label: string;
  sublabel: string;
  /** Color línea/accent */
  tint: string;
  dias: PlanDay[];
}

export const planDistribucion = {
  intro:
    "Cada pieza: motor + trabajo (atraer / probar / empujar a WhatsApp). Nada ritual sin hipótesis.",
  mixLine:
    "Distribución objetivo (~): 55% DINERO · 25% CRECIMIENTO · 20% AUTORIDAD.",
  producirLine:
    "Días sin post = grabación / edición / repurposing — no fallo: es producción.",
  repurposingGold:
    "Calendario ligado a cierre: responsable, fecha y seguimiento en WA / coord.",
  repurposingFoot:
    "Repurposing mínimo: 1 sesión fuerte → reel + 2–3 stories + clip para cierre en chat.",
  footerGold:
    "Mínimo 4 piezas/sem.; ideal 6+ con repurposing. 1 métrica útil/semana en reel viral: saves o shares — no vivir solo de vistas.",
};

export const plan30Semanas: PlanWeek[] = [
  {
    semana: 1,
    label: "Sem 1",
    sublabel: "Prueba + hook",
    tint: MOTOR_HEX.dinero,
    dias: [
      {
        dia: "D1",
        texto:
          "Prueba brutal: gancho visual 0–1 s + contraste real si hay",
        motor: "dinero",
        detalle:
          "Hoy publican un reel muy corto pensado para los primeros segundos: en cuanto empiece el video tiene que pasar algo que detenga el dedo (contraste fuerte, movimiento claro, o un antes/después real en el lugar). No es un comercial bonito: es probar si la gente se queda a ver. Si tienen material de cuando el salón estaba vacío y luego lleno, úsenlo. Al final del día anoten: ¿cuánta gente lo vio y cuántos escribieron o preguntaron algo?",
      },
      {
        dia: "D2",
        texto:
          'Stories serie 3 tapas — CTA “fecha + personas” WA (Zeigarnik)',
        motor: "dinero",
        detalle:
          "Hacen tres historias seguidas como si fuera una mini-serie (por ejemplo: preparación, llegada al lugar, y la tercera cortada a medias para generar curiosidad). La idea es que quien ve el segundo quiera el tercero. En la última historia dejan escrito que para fecha y número de personas escriban al WhatsApp del grupo (número claro). Zeigarnik es solo eso: dejar la historia incompleta para que quieran el siguiente paso. Revisan que alguien del equipo esté listo para contestar ese día.",
      },
      {
        dia: "D4",
        texto:
          "Cover viral: mismo audio 2 ganchos (curiosidad + firma)",
        motor: "crecimiento",
        detalle:
          "Eligen una canción o audio que ya mucha gente reconozca en redes (trend). Arman un solo reel usando ese audio con dos “entradas” mentales: primero algo que genere curiosidad (“¿y si…?”) y después que se note que son Los Reales (su estilo, su ciudad, su sello). No tienen que cerrar venta en el comentario: este día es para que personas nuevas los descubran. Si pueden, anoten vistas y guardados para comparar después.",
      },
      {
        dia: "D7",
        texto:
          "Urgencia real: solo si agenda lo respalda — evitar falsas escaseces",
        motor: "dinero",
        detalle:
          "Solo hoy pueden hablar de “fechas que se van” o “poco cupo” si es verdad mirando la agenda. Si no es real, no lo digan: daña la confianza. El contenido puede ser story o post diciendo qué fechas o meses ya van ocupados y que escriban al WhatsApp para ver disponibilidad. Objetivo: que alguien tome acción (mensaje) por miedo sano a quedarse fuera, no por truco vacío.",
      },
    ],
  },
  {
    semana: 2,
    label: "Sem 2",
    sublabel: "Objeciones",
    tint: MOTOR_HEX.crecimiento,
    dias: [
      {
        dia: "D8",
        texto:
          "Demostración poder: silencio → pista — sin spoiler en portada",
        motor: "dinero",
        detalle:
          "El video empieza cuando el ambiente todavía no está prendido (gente sentada, pista fría) y después muestran el salto a cuando ya todos bailan. Importante: la portada o primer frame del reel NO debe adelantar el final alegre; si no, se pierde el efecto sorpresa. Con esto responden en silencio a la duda de muchos clientes: “¿de verdad levantan el evento?”. Editen corto y claro.",
      },
      {
        dia: "D10",
        texto:
          'Versatilidad: corrido→cumbia (destruye “no se adaptan”)',
        motor: "dinero",
        detalle:
          "Graben o editen un clip donde se vea un cambio de estilo en vivo (por ejemplo de corrido a cumbia) sin parar la fiesta. Sirve para la familia o el comité que dice “no sé si tocan lo nuestro”. No hace falta discurso largo: el oído y la imagen hacen el trabajo. Si pueden, subtítulo simple explicando el cambio para quien ve sin audio.",
      },
      {
        dia: "D12",
        texto:
          "Reto/trend: audio propio regional (no solo moda ajena)",
        motor: "crecimiento",
        detalle:
          "Participan en un reto o tendencia de redes, pero conectado con Villahermosa o con su sonido (no solo copiar lo que hace gente de otros lados). Puede ser baile, frase, o formato viral de moda. La meta es verse actuales y locales a la vez. Definan antes quién graba y quién sube para no duplicar o perder el día.",
      },
      {
        dia: "D14",
        texto:
          "Testimonio con nombre/contexto — audio > solo screenshot",
        motor: "dinero",
        detalle:
          "Publican prueba de alguien que ya los contrató: ideal video corto o nota de voz del cliente/coordinador diciendo qué pasó (tipo de evento, cómo se sintió, recomendación). Si solo tienen captura de pantalla de un mensaje, súmenle contexto en texto o voz encima. “Nombre real o apellido + tipo de evento” ayuda más que un “muy buenos” anónimo.",
      },
    ],
  },
  {
    semana: 3,
    label: "Sem 3",
    sublabel: "Autoridad",
    tint: MOTOR_HEX.autoridad,
    dias: [
      {
        dia: "D15",
        texto:
          'Historia Natanael: pico-emoción + cierre (“qué cambió después”)',
        motor: "autoridad",
        detalle:
          "No basta con decir “abrimos para fulano”. Cuéntenlo como historia: qué estaba en juego, el momento más fuerte en tarima, qué sintieron y qué aprendieron o qué cambió después para el grupo. Puede ser voz en off + fotos o video del evento. Esto construye respeto y memoria; es contenido de autoridad, no de moda pasajera.",
      },
      {
        dia: "D17",
        texto:
          "BTS soundcheck — humaniza (liking / reciprocidad antes del pitch)",
        motor: "dinero",
        detalle:
          "“BTS” = detrás de escena: ensayo, prueba de sonido, afinación, risas, errores leves. La gente contrata personas, no logos perfectos. Suben algo humano antes de volver a hablar de fechas o precios. Objetivo: que quien vea sienta cercanía y confianza (reciprocidad: ustedes muestran algo real, el público se inclina a escucharlos después).",
      },
      {
        dia: "D18",
        texto:
          "Mashup 60 s: 3 géneros; subtítulos grandes (silent scroll)",
        motor: "crecimiento",
        detalle:
          "Arman un video de alrededor de un minuto donde pasen tres géneros distintos (fragmentos cortos seguidos). Mucha gente ve reels en silencio: usen letras grandes en pantalla que digan el género o una frase pegajosa. Sirve para demostrar rango musical sin un comercial aburrido.",
      },
      {
        dia: "D21",
        texto: "Precio-tabla story: framing; detalle solo por WA",
        motor: "dinero",
        detalle:
          "En historias pueden mostrar una tabla o rangos simples de precios para orientar (por ejemplo “desde / hasta” o paquetes A-B). Eso enmarca expectativas y filtra curiosos. Los detalles finos, descuentos y condiciones solo por WhatsApp o llamada, no en debate público en comentarios. Alguien del equipo debe tener las respuestas listas ese día.",
      },
    ],
  },
  {
    semana: 4,
    label: "Sem 4",
    sublabel: "Compuesto",
    tint: MOTOR_HEX.naranja,
    dias: [
      {
        dia: "D23",
        texto:
          "Best-of 90 s: solo clips ya probados — no nuevo por nuevo",
        motor: "crecimiento",
        detalle:
          "Montan un video de hasta 90 segundos reutilizando solo fragmentos de reels o clips que ya les funcionó (más vistas, más mensajes o más guardados). No inventan contenido nuevo ese día: es ordenar lo bueno en un solo “greatest hits”. Así refuerzan lo que ya saben que conecta con su público.",
      },
      {
        dia: "D24",
        texto:
          "Urgencia fechas peak (verdadera) + mismo día DM activo",
        motor: "dinero",
        detalle:
          "Si tienen fechas fuertes (temporada de XV, diciembre, feriados, etc.) ya tomadas o casi llenas, lo comunican con honestidad. Ese mismo día alguien debe estar pendiente del WhatsApp/Instagram para contestar rápido a quien pregunte. La urgencia solo funciona si la respuesta es rápida y real.",
      },
      {
        dia: "D27",
        texto:
          "2.º testimonio + clip mismo evento ambiente si existe",
        motor: "dinero",
        detalle:
          "Segundo testimonio distinto al primero: otra persona u otro tipo de evento. Si tienen video del ambiente de ese mismo evento (gente bailando, luces), mézclenlo con la voz o el mensaje del cliente. Refuerza que el testimonio no es inventado y que el resultado se ve en la pista.",
      },
      {
        dia: "D29",
        texto:
          "Cover siguiente hit — medir saves vs reel anterior",
        motor: "crecimiento",
        detalle:
          "Otro cover de una canción que esté pegando ahora. Anoten en una hoja o nota del celular cuántos guardados y compartidos tuvo comparado con el cover que subieron antes en el plan. No es vanidad: es aprender qué tipo de rola les trae más alcance útil para el siguiente mes.",
      },
    ],
  },
];

export interface FormatoDeck {
  n: string;
  motorEtiqueta: "DINERO" | "CRECIMIENTO" | "AUTORIDAD";
  nombre: string;
  gancho: string;
  como: string;
  colorHex: string;
}

export const formatosSix: FormatoDeck[] = [
  {
    n: "01",
    motorEtiqueta: "DINERO",
    nombre: "Prueba Bruta",
    gancho: "“Así se puso una fiesta en Villahermosa…”",
    como: "Cámara fija. Gente bailando. Sin edición exagerada. La realidad vende sola.",
    colorHex: MOTOR_HEX.dinero,
  },
  {
    n: "02",
    motorEtiqueta: "DINERO",
    nombre: "Demostración de poder",
    gancho: "“Llegamos y nadie bailaba… 20 min después:”",
    como: "Arranca con público apagado. Corte duro a pista llena. No necesita voz en off.",
    colorHex: MOTOR_HEX.dinero,
  },
  {
    n: "03",
    motorEtiqueta: "DINERO",
    nombre: "Versatilidad real",
    gancho: "“De corrido a cumbia sin parar la fiesta”",
    como: "Transición de género en vivo, sin corte. Destruye la objeción “no sé si se adaptan”.",
    colorHex: MOTOR_HEX.dinero,
  },
  {
    n: "04",
    motorEtiqueta: "CRECIMIENTO",
    nombre: "Cover viral",
    gancho: "“¿Y si esta rola fuera sierreña?”",
    como: "Canción popular adaptada a su estilo. Alcance masivo. No tiene que cerrar contratos — trae ojos.",
    colorHex: MOTOR_HEX.crecimiento,
  },
  {
    n: "05",
    motorEtiqueta: "AUTORIDAD",
    nombre: "La historia de Natanael Cano",
    gancho: "“Ese día aprendimos qué significa tocar en grande”",
    como: "No como dato. Como historia: qué pasó, qué sintieron, qué cambió. Vale más que 100 posts.",
    colorHex: MOTOR_HEX.autoridad,
  },
  {
    n: "06",
    motorEtiqueta: "DINERO",
    nombre: "Rescate de evento",
    gancho: "“La fiesta estaba muerta… hasta que entramos”",
    como: "Contraste real. Antes apagado → después lleno. Vende más que “tocamos bien”.",
    colorHex: MOTOR_HEX.dinero,
  },
];

export const tableroDeck = {
  titulo:
    "15 minutos, mismo formato. Feedback loop antes que opiniones.",
  notaVanidad:
    "Métrica vanidad fuera del tablero: likes y vistas solo como nota al pie si aportan decisión.",
  kpis: [
    {
      clave: "CITAS NUEVAS (sem)",
      placeholder: "—",
      hint: "Solicitudes serias vía WA o llamada.",
    },
    {
      clave: "CERRADOS (sem)",
      placeholder: "—",
      hint: "Con anticipo / contrato donde aplique.",
    },
    {
      clave: "TICKET PROM.",
      placeholder: "—",
      hint: "Solo cerrados.",
    },
    {
      clave: "COTIZ. ABIERTAS",
      placeholder: "—",
      hint: "Pipeline sin perder.",
    },
  ],
  origenTitulo:
    "Origen de cierres (ej. últimos 30 días o últimos 5)",
  origins: [
    { pct: "42%", label: "Recom.", tint: MOTOR_HEX.dinero },
    { pct: "28%", label: "Coord.", tint: MOTOR_HEX.crecimiento },
    { pct: "22%", label: "Redes", tint: MOTOR_HEX.autoridad },
    { pct: "8%", label: "Otro", tint: MOTOR_HEX.naranja },
  ],
  originsNota:
    "% ilustrativos — sustituir con datos reales cada viernes.",
  lateralContenido: {
    titulo: "CONTENIDO (sem)",
    sub: "Plan vs publicado",
    ejemplo: "ej. 3 / 4 piezas",
  },
  lateralReel: {
    titulo: "REEL VIRAL (sem)",
    cols: ["Saves", "Shares"],
    notaPie:
      "Comparar con reel anterior — no con otros grupos.",
  },
  northStarPie:
    "North Star semanal: cerrados con origen trazable + consistencia de contenido. Si la tabla va vacía tres viernes seguidos, el problema no es el algoritmo — es operación.",
};

export interface PasoAccion {
  n: number;
  plazo: string;
  accion: string;
  etiqueta: string;
  stripe: string;
}

export const pasosHitosOrdenados: PasoAccion[] = [
  {
    n: 1,
    plazo: "Esta semana",
    accion:
      "WhatsApp Business con mensaje automático: «¿Qué fecha y cuántas personas?» — link en todas las bios.",
    etiqueta: "INMEDIATO",
    stripe: MOTOR_HEX.alerta,
  },
  {
    n: 2,
    plazo: "Esta semana",
    accion:
      "Perfil convertido en vendedor: bio enfocada, 9 fotos solo eventos, destacados organizados.",
    etiqueta: "INMEDIATO",
    stripe: MOTOR_HEX.alerta,
  },
  {
    n: 3,
    plazo: "Semana 1",
    accion:
      "Primer video Prueba Bruta desde el bar. Cámara fija, baile/gente, gancho primeros 3 s.",
    etiqueta: "MOTOR DINERO",
    stripe: MOTOR_HEX.naranja,
  },
  {
    n: 4,
    plazo: "Semana 1",
    accion:
      "Primer cover viral con la rola más de moda. Hook del tipo «¿Y si X fuera sierreña?»",
    etiqueta: "MOTOR CREC.",
    stripe: MOTOR_HEX.crecimiento,
  },
  {
    n: 5,
    plazo: "Semana 2",
    accion:
      "3 coordinadores Villahermosa: llamada personal — no mensaje masivo ni promo.",
    etiqueta: "MUY ALTO",
    stripe: MOTOR_HEX.autoridad,
  },
  {
    n: 6,
    plazo: "Semana 2",
    accion:
      "5 salones con tarjeta + QR a WhatsApp. Material físico, sin pedir favores.",
    etiqueta: "ALTO",
    stripe: MOTOR_HEX.autoridad,
  },
  {
    n: 7,
    plazo: "Semana 3",
    accion:
      "Historia Natanael en video narrada, emoción real — no bullet de currículum.",
    etiqueta: "AUTORIDAD",
    stripe: MOTOR_HEX.dinero,
  },
  {
    n: 8,
    plazo: "Mes 1",
    accion:
      "Ejecutar 1 diferenciador visual o de interacción; consistente en cada show/video.",
    etiqueta: "DOMINIO",
    stripe: MOTOR_HEX.morado,
  },
  {
    n: 9,
    plazo: "Mes 1",
    accion:
      "Cerrar ≥2 privados imperfectos mejor que cero cerrados limpios. Prioridad flujo y testimonio.",
    etiqueta: "DINERO REAL",
    stripe: MOTOR_HEX.dinero,
  },
];

export const ejecucionRituales = {
  intro:
    "Este sistema no falla por ideas; falla si no hay ritual semanal ante el caos. Menos promesas, más calendario compartido.",
  filas: [
    {
      titulo: "Ritual 45 min / semana",
      texto:
        "Citas nuevas, cotizaciones abiertas, contenido grabado vs publicado, 1 llamada a coordinador. Sin reunión fija = solo ansiedad.",
    },
    {
      titulo: "Dueño único de WhatsApp",
      texto:
        "Una persona, un guion, un menú de precios. Varias voces = regateo en cadena.",
    },
    {
      titulo: "Mínimo viable real",
      texto:
        "Si 4 piezas/sem es imposible hoy: 2 + 1 reel “dinero” y medir. Consistencia baja > ráfaga.",
    },
    {
      titulo: "Métricas que no mienten",
      texto:
        "Tablero: citas, cerrados, origen, ticket, plan vs reel; saves/shares del viral (likes fuera si no deciden).",
    },
  ],
  reglaRojaFinal:
    "Si no pueden sostener el ritual, achiquen el plan — pero no mientan sobre la ejecución.",
};

export const cierreDeck = {
  preguntaCorta: "¿En Villahermosa, si alguien piensa grupo — en quién piensa primero?",
  recordatorio:
    "Ese es el objetivo real; precios, contenido y redes son herramientas para llegar ahí.",
  numerosMagicos: [
    { valor: "2", sub: "motores activos" },
    { valor: "1", sub: "diferenciador visible" },
    { valor: "3", sub: "coordinadores mes 1" },
  ],
};

/** Slide doble motor — texto completo */
export const dobleMotorDetalle = {
  headlineDeck: "Un solo motor revienta el motor.",
  parrafoDeck:
    "Todo lo que hagan se divide en dos funciones — pero no es automático: más contenido no garantiza más contratos.",
  motor1: {
    etiqueta: "Motor 1 — Dinero",
    titulo: "Dinero",
    subtitulo: "Paga las cuentas hoy (y alimenta recomendación)",
    color: MOTOR_HEX.dinero,
    bullets: [
      "Eventos reales + prueba social creíble",
      "Seguimiento y cierre (no solo «que vean el reel»)",
      "CTA a WhatsApp con conversación controlada",
      "Disponibilidad y urgencia reales",
    ],
  },
  motor2: {
    etiqueta: "Motor 2 — Crecimiento",
    titulo: "Crecimiento",
    subtitulo:
      "Amplifica alcance · si no convierte en citas o eventos, es hobby.",
    color: MOTOR_HEX.crecimiento,
    bullets: [
      "Covers virales con sello propio (oído en 3 s)",
      "Retos / trends con su sonido, no genéricos",
      "Mashups raros que nadie más hace igual",
      "¿Cuántos eventos cerraron solo por reel sin recomendación previa?",
    ],
  },
  alertaRoja:
    "Error común: solo reels sin sistema relacional y de cierre = seguidores, no negocio.",
  pieVerde:
    "Prioridad: cerrar eventos y fortalecer recomendación y coordinadores. Ajusten el reparto de contenido solo después de medir; si el crecimiento no trae citas, bájalo.",
};

/** Propuesta musical — lo que debe pasar en 10 segundos */
export const propuestaMusical = {
  headline:
    "Si suenan «igual que otros», la mejor estrategia revienta. Definan qué se oye distinto antes de subir otro reel.",
  filas: [
    {
      titulo: "Firma sonora",
      texto:
        "¿Qué 2–3 elementos musicales son inequívocamente ustedes? (línea de bajo, cadencia, bloques de género, finales de frase…)",
    },
    {
      titulo: "Carta mínima",
      texto:
        "Lista corta «esto sí / esto no»: géneros que dominan, qué rechazan, qué mezclan y cómo anuncian el cambio en vivo.",
    },
    {
      titulo: "Prueba de oído",
      texto:
        "Alguien ajeno escucha 10 s a ciegas: ¿nombra al grupo correcto sin ver la escena? Si no, siguen genéricos.",
    },
    {
      titulo: "Contenido alineado",
      texto:
        "Cada reel debe enseñar esa firma: no solo baile en cámara — el sonido debe delatar que son Los Reales.",
    },
  ],
  meta: "Meta: que el cliente no diga «tocan bien», diga «suenan a ustedes».",
  colorAcento: MOTOR_HEX.morado,
};

export const sistemaDineroAmplio = {
  titulo: "Sistema de dinero — de pasivo a agresivo",
  headline:
    "Tu sistema actual espera que el cliente llegue.\nEste sistema va por él.",
  reglaCierreRoja:
    "Fecha se aparta solo con anticipo. Sin anticipo, sigue disponible.",
  pasos: [
    {
      fase: "ENTRADA",
      color: MOTOR_HEX.dinero,
      nombre: "WhatsApp automático",
      cuerpo: [
        'Mensaje preconfigurado que arranca: «¿Qué fecha es tu evento y cuántas personas?»',
        "No saludan. No dicen precio. Van al dato.",
      ],
      regla: "El que pregunta controla la conversación.",
    },
    {
      fase: "FILTRO",
      color: MOTOR_HEX.autoridad,
      nombre: "No respondas precio directo",
      cuerpo: [
        'Si preguntan «¿cuánto cobran?» sin contexto: pedir tipo de evento, duración y lugar.',
        "Luego enviar menú con rangos (ver precios): paquete base, horas extra, peak, km.",
        "Sin estructura de precios el filtro no filtra — solo enoja.",
      ],
      regla: "Así dejas de competir por precio.",
    },
    {
      fase: "CIERRE",
      color: MOTOR_HEX.crecimiento,
      nombre: "El video hace el trabajo",
      cuerpo: [
        "No respondas con párrafo largo.",
        "Manda el clip de ambiente real más fuerte que tengan.",
        "El video cierra más que mil palabras de venta.",
      ],
      regla: "Quien manda evidencia, vende.",
    },
  ],
};

export const preciosAmplio = {
  tituloSlide: "Precios — sin esto el filtro de WhatsApp falla",
  intro:
    "Responder «depende» sin anclas = pierdes venta o destruyes margen. Rangos por tipo de evento y horas + 3 anclas de valor antes del precio final.",
  bloques: [
    {
      titulo: "Matriz mínima",
      color: MOTOR_HEX.autoridad,
      lineas: [
        "Día / temporada (vie vs sáb, mes alto)",
        "Tipo (boda / XV / empresa / bar)",
        "Horas incluidas vs hora extra",
        "Incluye / no incluye: transporte, sonido propio",
      ],
    },
    {
      titulo: "Tres anclas antes del número",
      color: MOTOR_HEX.dinero,
      lineas: [
        "Video de rescate o pista llena real",
        "Coordinador o cliente que recomiende por nombre",
        'Límite real de fechas: «así van junio y julio»',
      ],
    },
    {
      titulo: "Escalón y descuento",
      color: MOTOR_HEX.crecimiento,
      lineas: [
        "Precio lista + precio piso autorizado (solo con condiciones)",
        "Nada de negociar eterno en chat: opción A / B distinta",
        "Anticipo mínimo escrito (misma regla que sistema de dinero).",
      ],
    },
  ],
  reglaPie:
    "Documentar internamente montos reales (aunque no estén en redes). Si no conocen piso y techo, el cliente negocia contra ustedes mismos.",
};

export const barYTerritorioAmplio = {
  bar: {
    titulo: "El bar — laboratorio, no tu única carta de evento caro",
    parrafo:
      "El bar paga hoy y da material real. Si toda la señal es «grupo de bar», la gente ancla barato y baja urgencia. Usen bar como fábrica de clips; hacia privados, otro contexto (salón, cliente, vestuario).",
    riesgo:
      "Dominar vitrina solo-bar no cuadra para evento premium. Mitigan equilibrando ratio hacia contenido que luzca grupo de evento, no solo barra.",
    reglaNueva: "No hay show sin grabación. Sin cámara = dinero indirecto perdido.",
    usos: [
      {
        titulo: "Fábrica de contenido",
        color: MOTOR_HEX.dinero,
        desc: "Cada show = sesión: luz y público real. Clips editables como evento, no solo barra.",
        meta: "Meta: 3 clips usables + 1 toma para WhatsApp/cierre.",
      },
      {
        titulo: "Laboratorio de hooks",
        color: MOTOR_HEX.crecimiento,
        desc: "Qué rola prende = hipótesis del próximo reel. Contrasta con audio firma (propuesta musical).",
        meta: "Meta: 1 hook ganador/semana probado en vivo antes de viralizar.",
      },
      {
        titulo: "Prueba social semanal",
        color: MOTOR_HEX.autoridad,
        desc: "Constancia profesional; puede anclar barato. Contrapeso: agenda, anticipos y fechas tomadas.",
        meta: "Meta: story en vivo + screenshot confirma/anticipo (sin datos sensibles).",
      },
    ],
  },
  dominioTitulo: "Dominio local — omnipresencia en Villahermosa",
  dominioLead:
    "Que nadie piense en grupo sin pensar primero en Los Reales del Edén.",
  digitalTitulo: "Digital — donde está el organizador",
  digital: [
    {
      t: "Salones de eventos",
      d: 'Comentario real, no promo. «Ese lugar tiene buena acústica».',
    },
    { t: "DJs y coordinadores", d: "Son parte del mismo ecosistema de evento." },
    {
      t: "Etiquetas en fotos del cliente",
      d: "El organizador lo comparte → sus contactos lo ven.",
    },
    {
      t: "Historias del día del evento",
      d: 'Que mencionen al grupo el día del show.',
    },
  ],
  fisicoTitulo: "Físico — donde cierran decisiones",
  fisico: [
    {
      t: "3 coordinadores aliados",
      d: "Una llamada personal > 50 k seguidores. Relación no transacción.",
    },
    {
      t: "5 salones con material",
      d: "Tarjeta + QR a WhatsApp. Dejar material, no pedir favores.",
    },
    {
      t: "Facebook de nicho",
      d: "Novias, XV, organización. Presencia constante.",
    },
    {
      t: "Sistema testimonio",
      d: "Día siguiente espontáneo. Sin guión de estudio.",
    },
  ],
  lineaRoja:
    "Omnipresencia mal hecha = spam. 1) Valor primero — nunca pitch en comentario. 2) Pocas interacciones/día, curadas. 3) Offline antes que polémica. 4) Si huele a desesperación, no lo publican.",
};

export const erroresComunesLista = [
  {
    n: "01",
    titulo: "Solo contenido de eventos",
    texto:
      "Sin motor viral, el alcance son quien ya los busca — no nuevos ojos.",
  },
  {
    n: "02",
    titulo: "Precio que se negocia solo",
    texto:
      "Aceptar menos del mínimo destruye posicionamiento; el filtro de WA evita esto.",
  },
  {
    n: "03",
    titulo: "Natanael como dato",
    texto:
      "«Abrimos para…» es dato; contado como historia = activo de autoridad.",
  },
  {
    n: "04",
    titulo: "Shows sin grabación",
    texto: "Sin cámara: hooks no descubiertos, prueba perdida.",
  },
  {
    n: "05",
    titulo: "Sin diferenciador visible",
    texto:
      "«Tocamos bien» = todos. Sin señal única, invisibles.",
  },
  {
    n: "06",
    titulo: "Cero omnipresencia local",
    texto: "Quien no aparece en VH no existe en el ecosistema chico.",
  },
  {
    n: "07",
    titulo: "Reel = sustituto de recomendación",
    texto:
      "Si nadie contrata solo redes sin puente humano, sobrestiman viral. Medir contratos.",
  },
  {
    n: "08",
    titulo: "Indistinguibles en 10 s de audio",
    texto: "Sin firma sonora el cerebro archiva «otro grupo».",
  },
];

export function hexByMotor(key: MotorKey): string {
  switch (key) {
    case "dinero":
      return MOTOR_HEX.dinero;
    case "crecimiento":
      return MOTOR_HEX.crecimiento;
    case "autoridad":
      return MOTOR_HEX.autoridad;
    default:
      return "#737373";
  }
}
