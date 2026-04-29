"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "top", label: "01 — Intro" },
  { id: "domains", label: "02 — Domains" },
  { id: "work", label: "03 — Work" },
  { id: "about", label: "04 — About" },
  { id: "contact", label: "05 — Contact" },
];

export default function HomeClient() {
  const spotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("top");

  // Active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Spotlight cursor
  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;
    let raf: number | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) {
        const tick = () => {
          cx += (tx - cx) * 0.18;
          cy += (ty - cy) * 0.18;
          spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
          if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
            raf = requestAnimationFrame(tick);
          } else {
            raf = null;
          }
        };
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div ref={spotRef} className="spotlight" />

      <div className="sidedots" aria-hidden="true">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            title={s.label}
            onClick={() => scrollTo(s.id)}
            className={`sidedot ${active === s.id ? "active" : ""}`}
            style={{ border: 0, padding: 0, cursor: "pointer" }}
          />
        ))}
      </div>
    </>
  );
}
