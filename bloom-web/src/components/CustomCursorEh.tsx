import { useEffect, useRef } from "react";

/**
 * Cursor punto + anillo tipo portfolio-eh (solo escritorio pointer fino).
 * Respeta prefers-reduced-motion y dispositivos táctiles.
 */
export function CustomCursorEh() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersNoHover =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    if (reduce || prefersNoHover) return;

    document.body.dataset.ehCustomCursor = "on";

    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);

    return () => {
      delete document.body.dataset.ehCustomCursor;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        id="eh-cursor"
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        aria-hidden
      />
      <div
        ref={cursorRing}
        id="eh-cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        aria-hidden
      />
    </>
  );
}
