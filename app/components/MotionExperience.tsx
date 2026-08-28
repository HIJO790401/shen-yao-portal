"use client";

import Lenis from "lenis";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.25 });
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-serene-reveal]"));
    document.documentElement.setAttribute("data-serene-motion", "ready");

    if (reduceMotion) {
      revealTargets.forEach((target) => target.setAttribute("data-serene-visible", "true"));
      return;
    }

    const lenis = new Lenis({ autoRaf: true, lerp: 0.085 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-serene-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, [pathname, reduceMotion]);

  return <motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? 1 : scaleX }} aria-hidden="true" />;
}
