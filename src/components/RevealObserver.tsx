"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let obs: IntersectionObserver;

    const setup = () => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
      );

      document.querySelectorAll(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("in");
        } else {
          obs.observe(el);
        }
      });
    };

    const id = requestAnimationFrame(() => requestAnimationFrame(setup));
    const fallback = setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.in)")
        .forEach((el) => el.classList.add("in"));
    }, 1200);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(fallback);
      if (obs!) obs.disconnect();
    };
  }, [pathname]);

  return null;
}
