import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Music,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SITE,
  barYTerritorioAmplio,
  cierreDeck,
  dobleMotorDetalle,
  ejecucionRituales,
  erroresComunesLista,
  formatosSix,
  hexByMotor,
  introPortada,
  pasosHitosOrdenados,
  plan30Semanas,
  planDistribucion,
  preciosAmplio,
  propuestaMusical,
  sistemaDineroAmplio,
  tableroDeck,
  type MotorKey,
  type PlanDay,
} from "../data/realesDominio";
import { CustomCursorEh } from "./CustomCursorEh";
import { MusicParticleField } from "./MusicParticleField";

type TabId =
  | "marco"
  | "plan"
  | "creativos"
  | "ventas"
  | "territorio"
  | "tablero"
  | "equipo";

/** Pestañas: cada una = capítulo del mismo deck, con más texto desplegable aquí. */
const TABS: readonly {
  id: TabId;
  label: string;
  hint: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "marco",
    label: "Marco y motores",
    hint: "Por qué existe el plan, North Star y cómo trabajan los dos motores.",
    Icon: Sparkles,
  },
  {
    id: "plan",
    label: "Plan 30 días",
    hint: "Calendario por semana + reparto 55/25/20 y reglas de repurposing.",
    Icon: CalendarDays,
  },
  {
    id: "creativos",
    label: "Creativos",
    hint: "Los 6 formatos con gancho y trabajo; propuesta musical para la firma.",
    Icon: Music,
  },
  {
    id: "ventas",
    label: "Ventas (WA)",
    hint: "Embudo WhatsApp, filtros, video de cierre y estructura de precios.",
    Icon: MessageCircle,
  },
  {
    id: "territorio",
    label: "Territorio",
    hint: "Bar como laboratorio + dominio VH digital y físico (y línea roja).",
    Icon: MapPin,
  },
  {
    id: "tablero",
    label: "Tablero viernes",
    hint: "Lo que llenan cada semana: KPI, origen de cierres, contenido y reel viral.",
    Icon: LayoutDashboard,
  },
  {
    id: "equipo",
    label: "Equipo y orden",
    hint: "Errores a cortar, pasos en secuencia y rituales para no fallar en silos.",
    Icon: UsersRound,
  },
] as const;

function MotorDot({ k }: { k: MotorKey }) {
  const c = hexByMotor(k);
  return (
    <span
      className="inline-block size-2.5 shrink-0 rounded-full ring-1 ring-eh-cream/25"
      style={{ backgroundColor: c }}
      title={k}
    />
  );
}

function PanelMarco() {
  return (
    <div className="space-y-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-eh-cream/45">
          Primera lectura
        </p>
        <h2 className="mt-3 font-serif text-2xl font-medium italic tracking-tight text-eh-cream/95 sm:text-3xl">
          {introPortada.manifiesto}
        </h2>
        <p className="mt-3 text-sm text-eh-cream/50">{introPortada.lineaFalsa}</p>
        <p className="mt-8 text-lg font-medium leading-snug text-eh-cream">
          {introPortada.norte}
        </p>
        <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-eh-cream/50">
          {introPortada.parrafoCiudad}
        </p>
        <p className="mt-8 text-[10px] tracking-[0.2em] text-eh-cream/35">
          {introPortada.pieDeck}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article
          className="rounded-3xl p-6 liquid-glass"
          style={{
            borderLeft: `4px solid ${introPortada.tarjetaA.tint}`,
          }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-eh-cream/55">
            {introPortada.tarjetaA.titulo}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-eh-cream/75">
            {introPortada.tarjetaA.texto}
          </p>
        </article>
        <article
          className="rounded-3xl p-6 liquid-glass"
          style={{
            borderLeft: `4px solid ${introPortada.tarjetaB.tint}`,
          }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-eh-cream/55">
            {introPortada.tarjetaB.titulo}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-eh-cream/75">
            {introPortada.tarjetaB.texto}
          </p>
        </article>
      </div>

      <section className="rounded-3xl p-8 liquid-glass">
        <p className="font-serif text-xl font-medium italic tracking-tight text-eh-cream sm:text-2xl">
          {introPortada.dobleMotor.headline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-eh-cream/55">
          {introPortada.dobleMotor.dek}
        </p>
      </section>

      <section className="space-y-8">
        <h3 className="text-lg font-semibold text-eh-cream">
          {dobleMotorDetalle.headlineDeck}
        </h3>
        <p className="text-sm leading-relaxed text-eh-cream/55">
          {dobleMotorDetalle.parrafoDeck}
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {[dobleMotorDetalle.motor1, dobleMotorDetalle.motor2].map((m) => (
            <div
              key={m.titulo}
              className="rounded-3xl p-6 liquid-glass"
              style={{ borderLeft: `5px solid ${m.color}` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-eh-cream/40">
                {m.etiqueta}
              </p>
              <p className="mt-2 font-serif text-2xl italic text-eh-cream">{m.titulo}</p>
              <p className="mt-2 text-sm italic text-eh-cream/65">{m.subtitulo}</p>
              <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-relaxed text-eh-cream/75">
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-red-950/60 px-5 py-4 text-sm font-medium text-red-100/95">
          {dobleMotorDetalle.alertaRoja}
        </div>
        <p className="text-sm leading-relaxed text-eh-cream/60">
          {dobleMotorDetalle.pieVerde}
        </p>
      </section>
    </div>
  );
}

type PlanDayModal = {
  id: string;
  weekLabel: string;
  weekSublabel: string;
  day: PlanDay;
};

function PanelPlan() {
  const [open, setOpen] = useState<PlanDayModal | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="space-y-12">
      <div className="rounded-3xl p-8 liquid-glass-strong">
        <p className="font-serif text-xl italic text-eh-cream/95">
          {planDistribucion.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-eh-cream/10 px-3 py-1.5 text-xs font-medium uppercase text-emerald-200/90">
            55% dinero
          </span>
          <span className="rounded-full bg-eh-cream/10 px-3 py-1.5 text-xs font-medium uppercase text-sky-200/90">
            25% crecimiento
          </span>
          <span className="rounded-full bg-eh-cream/10 px-3 py-1.5 text-xs font-medium uppercase text-amber-100/90">
            20% autoridad
          </span>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-eh-cream/55">
          {planDistribucion.mixLine}
        </p>
        <p className="mt-4 text-sm text-eh-cream/58">{planDistribucion.producirLine}</p>
        <div className="mt-8 space-y-2 border-l-2 border-amber-200/40 pl-6">
          <p className="text-sm font-medium text-amber-100/90">
            {planDistribucion.repurposingGold}
          </p>
          <p className="text-xs text-eh-cream/50">{planDistribucion.repurposingFoot}</p>
        </div>
      </div>

      {plan30Semanas.map((wk) => (
        <div key={wk.semana}>
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <div
              className="rounded-2xl px-5 py-3 text-left liquid-glass"
              style={{ borderLeft: `6px solid ${wk.tint}` }}
            >
              <span className="block text-xl font-semibold text-eh-cream">
                {wk.label}
              </span>
              <span className="text-[11px] text-eh-cream/45">{wk.sublabel}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {wk.dias.map((d) => {
              const id = `${wk.semana}-${d.dia}`;
              const isOpen = open?.id === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    setOpen({
                      id,
                      weekLabel: wk.label,
                      weekSublabel: wk.sublabel,
                      day: d,
                    })
                  }
                  aria-haspopup="dialog"
                  aria-expanded={isOpen}
                  aria-label={`Explicación detallada de ${d.dia}: ${d.texto}`}
                  className="group flex min-h-[9.5rem] flex-col rounded-2xl p-4 text-left transition-[background-color,box-shadow,transform] duration-200 ease-out liquid-glass motion-safe:hover:bg-eh-cream/[0.06] motion-safe:active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eh-accent/70"
                  style={{ borderLeft: `4px solid ${hexByMotor(d.motor)}` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase text-eh-cream/90">
                      {d.dia}
                    </span>
                    <MotorDot k={d.motor} />
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-snug text-eh-cream/78">
                    {d.texto}
                  </p>
                  <span className="mt-3 text-[10px] font-medium tracking-wide text-eh-accent/85 group-hover:text-eh-accent">
                    Toca para ver qué hacer →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="fixed inset-0 bg-[rgba(4,5,12,0.72)] backdrop-blur-[6px]"
            aria-label="Cerrar detalle del día"
            onClick={() => setOpen(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-day-dialog-title"
            className="relative z-[1] my-auto flex w-[min(100%,36rem)] max-w-lg max-h-[min(42rem,calc(100dvh-1.25rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] flex-col overflow-hidden rounded-2xl border border-eh-cream/12 shadow-[0_24px_80px_rgba(0,0,0,0.55)] liquid-glass-strong"
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-eh-cream/10 px-4 py-3.5 sm:px-6 sm:py-4">
              <div className="min-w-0 pt-0.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-eh-cream/45">
                  {open.weekLabel} · {open.weekSublabel}
                </p>
                <h2
                  id="plan-day-dialog-title"
                  className="mt-1.5 font-mono text-lg font-semibold tracking-tight text-eh-cream sm:text-xl"
                >
                  {open.day.dia}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(null)}
                className="shrink-0 rounded-xl p-2 text-eh-cream/70 transition-colors hover:bg-eh-cream/10 hover:text-eh-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eh-accent/70"
                aria-label="Cerrar"
              >
                <X className="size-5" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-6 sm:py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-eh-accent/90">
                Qué hacer ese día
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-eh-cream/88 sm:text-base">
                {open.day.detalle}
              </p>
              <div className="mt-8 border-t border-eh-cream/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-eh-cream/40">
                  Resumen (equipo / marketing)
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-eh-cream/72">
                  {open.day.texto}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <MotorDot k={open.day.motor} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-eh-cream/50">
                    {open.day.motor === "dinero"
                      ? "Enfoque: ventas / WhatsApp"
                      : open.day.motor === "crecimiento"
                        ? "Enfoque: alcance y nuevos ojos"
                        : open.day.motor === "autoridad"
                          ? "Enfoque: confianza y prestigio"
                          : "Enfoque mixto"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs font-semibold italic text-amber-100/85">
        {planDistribucion.footerGold}
      </p>
    </div>
  );
}

function PanelCreativos() {
  return (
    <div className="space-y-14">
      <section>
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">Seis formatos</h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-eh-cream/55">
          Cada formato cumple un solo rol: atraer mirada, demostrar resultado o
          empujar a conversación en WhatsApp — nunca los tres a la vez en un solo
          clip.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {formatosSix.map((f) => (
            <article
              key={f.n}
              className="flex flex-col rounded-3xl liquid-glass"
              style={{ borderLeft: `6px solid ${f.colorHex}` }}
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-lg font-semibold text-eh-cream/90">{f.n}</span>
                  <span className="rounded-full bg-eh-cream/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-eh-cream/85">
                    {f.motorEtiqueta}
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-medium text-eh-cream">{f.nombre}</h4>
                <p className="mt-2 font-serif text-sm italic text-amber-100/90">
                  {f.gancho}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-eh-cream/55">
                  {f.como}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">Propuesta musical</h3>
        <p className="mt-4 text-sm leading-relaxed text-eh-cream/58">
          {propuestaMusical.headline}
        </p>
        <div className="mt-8 space-y-4">
          {propuestaMusical.filas.map((row) => (
            <article
              key={row.titulo}
              className="rounded-2xl p-6 liquid-glass"
              style={{
                borderLeft: `4px solid ${propuestaMusical.colorAcento}`,
              }}
            >
              <h4 className="font-semibold text-purple-200/95">{row.titulo}</h4>
              <p className="mt-3 text-sm leading-relaxed text-eh-cream/65">
                {row.texto}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm italic text-amber-100/90">
          {propuestaMusical.meta}
        </p>
      </section>
    </div>
  );
}

function PanelVentas() {
  return (
    <div className="space-y-14">
      <section>
        <h3 className="text-xl font-semibold text-eh-cream">{sistemaDineroAmplio.titulo}</h3>
        <p className="mt-6 max-w-prose whitespace-pre-line font-serif text-lg italic leading-relaxed text-eh-cream/90">
          {sistemaDineroAmplio.headline}
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {sistemaDineroAmplio.pasos.map((p) => (
            <div
              key={p.fase}
              className="flex flex-col rounded-3xl p-6 liquid-glass"
              style={{ borderLeft: `5px solid ${p.color}` }}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] text-eh-cream/45">
                {p.fase}
              </p>
              <h4 className="mt-3 text-base font-semibold text-eh-cream">{p.nombre}</h4>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-eh-cream/65">
                {p.cuerpo.map((ln) => (
                  <li key={ln} className="leading-snug">
                    {ln}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-6 border-t border-eh-cream/10 pt-4 text-sm font-semibold italic leading-snug text-eh-cream/90">
                {p.regla}
              </blockquote>
            </div>
          ))}
        </div>
        <p className="mt-10 rounded-2xl bg-red-950/55 px-6 py-4 text-center text-sm font-semibold text-red-100/95">
          {sistemaDineroAmplio.reglaCierreRoja}
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-eh-cream">{preciosAmplio.tituloSlide}</h3>
        <p className="mt-4 text-sm leading-relaxed text-eh-cream/60">
          {preciosAmplio.intro}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {preciosAmplio.bloques.map((b) => (
            <div
              key={b.titulo}
              className="rounded-3xl p-6 liquid-glass"
              style={{ borderLeft: `5px solid ${b.color}` }}
            >
              <h4 className="font-semibold" style={{ color: b.color }}>
                {b.titulo}
              </h4>
              <ul className="mt-5 list-inside list-disc space-y-3 text-sm leading-relaxed text-eh-cream/65">
                {b.lineas.map((ln) => (
                  <li key={ln}>{ln}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 rounded-2xl bg-orange-950/50 px-5 py-5 text-center text-sm font-medium text-orange-100/95">
          {preciosAmplio.reglaPie}
        </p>
      </section>
    </div>
  );
}

function PanelTerritorio() {
  const b = barYTerritorioAmplio;
  return (
    <div className="space-y-16">
      <section>
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">{b.bar.titulo}</h3>
        <p className="mt-6 text-sm leading-relaxed text-eh-cream/62">{b.bar.parrafo}</p>
        <div className="mt-8 rounded-2xl px-6 py-5 text-sm leading-relaxed text-eh-cream/72 liquid-glass">
          {b.bar.riesgo}
        </div>
        <p className="mt-6 rounded-2xl px-6 py-4 text-sm font-semibold text-orange-200/95 liquid-glass">
          {b.bar.reglaNueva}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {b.bar.usos.map((u) => (
            <div
              key={u.titulo}
              className="rounded-3xl p-6 liquid-glass"
              style={{ borderLeft: `4px solid ${u.color}` }}
            >
              <h4 className="font-semibold" style={{ color: u.color }}>
                {u.titulo}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-eh-cream/60">{u.desc}</p>
              <p className="mt-4 text-xs italic text-eh-cream/48">{u.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-eh-cream/[0.06] pt-16">
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">{b.dominioTitulo}</h3>
        <p className="mt-4 font-serif text-lg italic text-eh-cream/88">
          {b.dominioLead}
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-200/85">
              {b.digitalTitulo}
            </p>
            <ul className="mt-6 space-y-5">
              {b.digital.map((row) => (
                <li key={row.t}>
                  <p className="font-medium text-eh-cream">{row.t}</p>
                  <p className="mt-1 text-sm text-eh-cream/55">{row.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/85">
              {b.fisicoTitulo}
            </p>
            <ul className="mt-6 space-y-5">
              {b.fisico.map((row) => (
                <li key={row.t}>
                  <p className="font-medium text-eh-cream">{row.t}</p>
                  <p className="mt-1 text-sm text-eh-cream/55">{row.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 rounded-2xl bg-red-950/40 px-6 py-6 text-sm leading-relaxed text-red-100/90 liquid-glass">
          {b.lineaRoja}
        </p>
      </section>
    </div>
  );
}

function PanelTablero() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-serif text-2xl italic tracking-tight text-eh-cream sm:text-3xl">
          {tableroDeck.titulo}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-eh-cream/55">{tableroDeck.notaVanidad}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tableroDeck.kpis.map((k) => (
          <div key={k.clave} className="rounded-3xl p-5 liquid-glass">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-eh-cream/40">
              {k.clave}
            </p>
            <p className="my-4 font-serif text-4xl italic text-eh-cream/90 sm:my-5 sm:text-5xl">{k.placeholder}</p>
            <p className="text-[11px] leading-snug text-eh-cream/45">{k.hint}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[2rem] p-6 liquid-glass sm:p-8">
        <h4 className="text-base font-semibold text-eh-cream">{tableroDeck.origenTitulo}</h4>
        <div className="mt-6 w-full overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]">
          <div className="flex h-14 min-w-[300px] overflow-hidden rounded-2xl sm:min-w-full sm:h-16 sm:rounded-full">
          {tableroDeck.origins.map((seg) => (
            <div
              key={seg.label}
              className="flex min-w-0 shrink-0 flex-col items-center justify-center px-1 py-1 text-[9px] font-bold uppercase leading-tight tracking-wide text-black/90 sm:text-[10px]"
              style={{ width: seg.pct, minWidth: "2.5rem", backgroundColor: seg.tint }}
            >
              <span className="text-center">{seg.label}</span>
              <span className="opacity-80">{seg.pct}</span>
            </div>
          ))}
          </div>
        </div>
        <p className="mt-4 text-[11px] text-eh-cream/42">{tableroDeck.originsNota}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl p-6 liquid-glass">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              {tableroDeck.lateralContenido.titulo}
            </p>
            <p className="mt-3 text-xs text-eh-cream/50">{tableroDeck.lateralContenido.sub}</p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-eh-cream/10">
              <div className="h-full w-[75%] rounded-full bg-emerald-400/45" />
            </div>
            <p className="mt-3 text-[11px] text-eh-cream/50">
              {tableroDeck.lateralContenido.ejemplo}
            </p>
          </div>
          <div className="rounded-2xl p-6 liquid-glass">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
              {tableroDeck.lateralReel.titulo}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-8">
              {tableroDeck.lateralReel.cols.map((c) => (
                <div key={c}>
                  <p className="text-[10px] text-eh-cream/35">{c}</p>
                  <p className="mt-3 font-serif text-5xl italic text-eh-cream/95">—</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] italic text-eh-cream/40">
              {tableroDeck.lateralReel.notaPie}
            </p>
          </div>
        </div>
      </div>
      <blockquote className="rounded-3xl px-6 py-5 text-center text-sm italic leading-relaxed text-amber-100/92 bg-eh-cream/[0.04]">
        {tableroDeck.northStarPie}
      </blockquote>
    </div>
  );
}

function PanelEquipo() {
  return (
    <div className="space-y-16">
      <section>
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">Lo que hay que dejar de hacer</h3>
        <p className="mt-3 text-sm text-eh-cream/50">
          Señales que el deck ve con frecuencia; si reconocen algo, no es ataque:
          es donde el plan pierde dinero.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {erroresComunesLista.map((e) => (
            <article key={e.n} className="rounded-2xl border-l-4 border-red-500/65 p-5 liquid-glass">
              <p className="text-xs font-bold text-red-300/95">{e.n}</p>
              <h4 className="mt-2 font-semibold text-eh-cream">{e.titulo}</h4>
              <p className="mt-2 text-sm leading-relaxed text-eh-cream/58">{e.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-eh-cream sm:text-2xl">Plan de acción — en ese orden</h3>
        <p className="mt-4 font-serif text-lg italic text-eh-cream/80">
          Sin hacer todo el mismo día. Respetar el orden libera efectos compuestos.
        </p>
        <div className="mt-10 divide-y divide-eh-cream/10 overflow-hidden rounded-3xl liquid-glass-strong">
          {pasosHitosOrdenados.map((step) => (
            <div
              key={step.n}
              className="grid gap-5 p-5 sm:grid-cols-[3rem_auto_1fr_auto] sm:items-start sm:p-8"
            >
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-black"
                style={{ backgroundColor: step.stripe }}
              >
                {step.n}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-eh-cream/42 sm:mt-3">
                {step.plazo}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-eh-cream/78">{step.accion}</p>
              <span className="self-start rounded-xl bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-eh-cream/90">
                {step.etiqueta}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-eh-cream">Ejecución — ritual semanal</h3>
        <p className="mt-6 text-sm italic leading-relaxed text-eh-cream/70">
          {ejecucionRituales.intro}
        </p>
        <ul className="mt-10 space-y-5">
          {ejecucionRituales.filas.map((row) => (
            <li
              key={row.titulo}
              className="rounded-2xl border-l-[5px] border-emerald-400/55 bg-eh-cream/[0.03] px-6 py-5"
            >
              <strong className="text-sm font-semibold text-emerald-200/95">
                {row.titulo}
              </strong>
              <p className="mt-2 text-sm leading-relaxed text-eh-cream/56">{row.texto}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 rounded-2xl border border-red-900/55 bg-red-950/45 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-red-100/95">
          {ejecucionRituales.reglaRojaFinal}
        </p>
      </section>

      <section className="rounded-[2rem] px-8 py-12 text-center liquid-glass-strong">
        <p className="text-xs uppercase tracking-[0.35em] text-eh-cream/42">Cierre del deck</p>
        <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl italic leading-tight tracking-tight text-eh-cream sm:text-3xl">
          {cierreDeck.preguntaCorta}
        </p>
        <p className="mx-auto mt-10 max-w-md text-sm text-eh-cream/52">{cierreDeck.recordatorio}</p>
        <div className="mx-auto mt-14 flex max-w-xl flex-wrap justify-center gap-4">
          {cierreDeck.numerosMagicos.map((x) => (
            <div
              key={x.sub}
              className="min-w-[5rem] flex-1 rounded-3xl px-5 py-8 liquid-glass"
            >
              <p className="font-serif text-5xl italic text-eh-cream">{x.valor}</p>
              <p className="mt-3 text-[10px] font-medium uppercase leading-tight tracking-wider text-eh-cream/38">
                {x.sub.replace(/\s+/g, " ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function LosRealesPortal() {
  const [tab, setTab] = useState<TabId>("marco");

  const active = useMemo(() => TABS.find((t) => t.id === tab)!, [tab]);

  /** Enlace compartible: ejemplo `#tab=ventas` */
  const irATab = useCallback((id: TabId) => {
    setTab(id);
    history.replaceState(null, "", `#tab=${id}`);
  }, []);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    const m = raw.match(/^tab=([^&]+)/);
    if (m) {
      const id = m[1] as TabId;
      if (TABS.some((t) => t.id === id)) setTab(id);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const panel = useMemo(() => {
    switch (tab) {
      case "marco":
        return <PanelMarco />;
      case "plan":
        return <PanelPlan />;
      case "creativos":
        return <PanelCreativos />;
      case "ventas":
        return <PanelVentas />;
      case "territorio":
        return <PanelTerritorio />;
      case "tablero":
        return <PanelTablero />;
      case "equipo":
        return <PanelEquipo />;
      default:
        return null;
    }
  }, [tab]);

  return (
    <div className="relative isolate min-h-dvh min-h-[100dvh] overflow-x-clip pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
      <a href="#portal-main" className="eh-skip-link">
        Saltar al contenido del plan
      </a>
      <div className="pointer-events-none fixed inset-0 z-0 bg-eh-bg" aria-hidden>
        <div className="absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <video
              className="relative z-0 h-full w-full min-h-full min-w-full object-cover blur-[10px] brightness-[0.66] contrast-[1.05] saturate-[0.88]"
              style={{ transform: "translateZ(0) scale(1.04)" }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden
            >
              <source src={SITE.videoHero} type="video/mp4" />
            </video>
          </div>
          <div
            className="absolute inset-0 z-[3] bg-gradient-to-b from-[rgba(24,26,72,0.94)] via-[rgba(14,17,54,0.9)] to-[rgba(10,13,42,0.97)]"
            aria-hidden
          />
          <div className="absolute inset-0 z-[4] eh-layer-grid" aria-hidden />
          <div className="absolute inset-0 z-[5] eh-layer-noise" aria-hidden />
          <MusicParticleField />
        </div>
      </div>

      <div
        className="sticky top-0 z-40"
        style={{
          paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))",
        }}
      >
        <div className="mx-auto max-w-5xl pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] pb-3 sm:px-6 sm:pb-4">
          <div className="overflow-hidden rounded-2xl border border-eh-cream/10 liquid-glass-strong shadow-[0_12px_48px_rgba(0,0,0,0.32)]">
            <header
              role="banner"
              className="flex items-center gap-3 border-b border-eh-cream/[0.08] px-3 py-3 sm:gap-4 sm:px-5 sm:py-3.5"
            >
              <Sparkles
                className="size-[18px] shrink-0 text-eh-accent sm:size-[22px]"
                aria-hidden
                strokeWidth={1.5}
              />
              <img
                src="/logo.png"
                alt="Los Reales del Edén"
                width={44}
                height={44}
                className="eh-brand-ring size-11 shrink-0 rounded-xl object-cover sm:size-10"
              />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12px] font-medium uppercase leading-snug tracking-[0.1em] text-eh-cream sm:text-[13px] sm:tracking-[0.12em]">
                  {SITE.grupo}
                </p>
                <p className="mt-1 line-clamp-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-eh-accent/85 sm:mt-0.5 sm:line-clamp-1 sm:text-[10px] sm:tracking-[0.18em]">
                  {SITE.subtitulo}
                </p>
              </div>
            </header>
            <nav
              role="tablist"
              className="eh-tab-track flex gap-2 overflow-x-auto px-2 py-2.5 sm:px-3 sm:py-2"
              aria-label="Secciones del plan"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => irATab(t.id)}
                  className={`flex min-h-[48px] shrink-0 snap-start cursor-pointer items-center whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-[11px] font-medium outline-none transition-colors duration-[240ms] ease-out motion-safe:active:scale-[0.98] motion-safe:hover:bg-eh-cream/10 sm:min-h-[44px] sm:px-4 sm:text-xs ${
                    tab === t.id
                      ? "border border-eh-accent/25 bg-[rgba(139,124,246,0.12)] text-eh-cream shadow-[inset_0_0_0_1px_rgba(245,240,232,0.18)] ring-1 ring-eh-accent/20"
                      : "text-eh-cream/65"
                  }`}
                >
                  <span className="flex items-center gap-2 sm:gap-2.5">
                    <t.Icon
                      aria-hidden
                      className={`size-[17px] shrink-0 sm:size-[18px] ${
                        tab === t.id
                          ? "text-eh-accent"
                          : "text-eh-accent/55"
                      }`}
                      strokeWidth={1.65}
                    />
                    <span className="max-w-[11.5rem] font-semibold leading-tight tracking-tight sm:max-w-none">
                      {t.label}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] pb-20 sm:px-6 sm:pb-32">
        <main
          id="portal-main"
          tabIndex={-1}
          className="scroll-mt-[min(32vh,11rem)] outline-none sm:scroll-mt-40"
        >
          <div
            className="rounded-2xl px-4 py-8 liquid-glass-strong sm:rounded-[2rem] sm:px-12 sm:py-14"
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
          >
          <p className="mb-8 max-w-prose border-l-[3px] border-eh-accent/40 pl-3 text-xs font-light italic leading-relaxed text-eh-cream/65 sm:mb-10 sm:pl-4 sm:text-[13px] sm:leading-relaxed">
            {active.hint}
          </p>
          <div key={tab} className="eh-panel-enter">
            {panel}
          </div>
          </div>
        </main>
      </div>

      <CustomCursorEh />
    </div>
  );
}
