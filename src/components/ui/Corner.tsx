import React from "react";
import { cn } from "@/lib/utils";

interface CornerProps {
  pos: "tl" | "tr" | "bl" | "br";
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Corner: React.FC<CornerProps> = ({
  pos,
  offset = 18,
  className,
  style,
}) => {
  const isTop = pos[0] === "t";
  const isLeft = pos[1] === "l";

  return (
    <div
      aria-hidden="true"
      className={cn("absolute z-10 w-4.5 h-4.5 pointer-events-none", className)}
      style={{
        top: isTop ? offset : "auto",
        bottom: !isTop ? offset : "auto",
        left: isLeft ? offset : "auto",
        right: !isLeft ? offset : "auto",
        borderTop: isTop ? "1px solid rgba(184,160,122,0.60)" : "none",
        borderBottom: !isTop ? "1px solid rgba(184,160,122,0.60)" : "none",
        borderLeft: isLeft ? "1px solid rgba(184,160,122,0.60)" : "none",
        borderRight: !isLeft ? "1px solid rgba(184,160,122,0.60)" : "none",
        ...style,
      }}
    />
  );
};
