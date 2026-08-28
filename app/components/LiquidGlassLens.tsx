"use client";

import type { CSSProperties, ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";

type LiquidGlassRuntimeProps = {
  children: ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  className?: string;
  padding?: string;
  overLight?: boolean;
  style?: CSSProperties;
  mode?: "standard" | "polar" | "prominent" | "shader";
};

type LiquidGlassLensProps = LiquidGlassRuntimeProps & {
  fallbackStyle?: CSSProperties;
};

export function LiquidGlassLens({
  children,
  className,
  fallbackStyle,
  elasticity = 0.08,
  ...props
}: LiquidGlassLensProps) {
  const [Glass, setGlass] = useState<ComponentType<LiquidGlassRuntimeProps> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    let active = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);

    syncMotion();
    media.addEventListener("change", syncMotion);
    void import("liquid-glass-react")
      .then((module) => {
        if (active) setGlass(() => module.default as ComponentType<LiquidGlassRuntimeProps>);
      })
      .catch(() => {
        if (active) setGlass(null);
      });

    return () => {
      active = false;
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  if (!Glass) {
    return <div className={className} style={fallbackStyle}>{children}</div>;
  }

  return (
    <Glass
      {...props}
      className={className}
      elasticity={reduceMotion ? 0 : elasticity}
      mode="standard"
    >
      {children}
    </Glass>
  );
}
