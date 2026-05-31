import React from "react";
import { cn } from "@/lib/utils";

interface GrainProps {
  className?: string;
  style?: React.CSSProperties;
}

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E\")";

export const Grain: React.FC<GrainProps> = ({ className, style }) => (
  <div
    aria-hidden="true"
    className={cn("absolute inset-0 pointer-events-none z-1", className)}
    style={{
      backgroundImage: GRAIN_URL,
      backgroundRepeat: "repeat",
      ...style,
    }}
  />
);
