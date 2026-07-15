"use client";

import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";

export function MotionExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.25 });

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, []);

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
