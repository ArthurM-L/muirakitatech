import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on true pointer devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;
    let isHovering = false;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const tick = () => {
      const speed = isHovering ? 0.09 : 0.13;
      rx += (mx - rx) * speed;
      ry += (my - ry) * speed;
      const offset = isHovering ? 28 : 18;
      ring.style.transform = `translate(${rx - offset}px, ${ry - offset}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      isHovering = true;
      ring.classList.add("cursor-expanded");
      dot.classList.add("cursor-gold");
    };
    const onLeave = () => {
      isHovering = false;
      ring.classList.remove("cursor-expanded");
      dot.classList.remove("cursor-gold");
    };

    const bindInteractives = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    bindInteractives();
    raf = requestAnimationFrame(tick);

    // Re-bind when React re-renders new interactives
    const mo = new MutationObserver(bindInteractives);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};
