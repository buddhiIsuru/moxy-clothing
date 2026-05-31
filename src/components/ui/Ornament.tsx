import React from "react";
import { cn } from "@/lib/utils";

interface OrnamentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Ornament: React.FC<OrnamentProps> = ({ className, style }) => (
  <div
    aria-hidden="true"
    className={cn("flex items-center gap-2.5", className)}
    style={{ ...style }}
  >
    <div className="flex-1 h-px bg-[rgba(184,160,122,0.30)]" />
    <div className="w-1.5 h-1.5 border border-[rgba(184,160,122,0.55)] rotate-45 flex-shrink-0" />
    <div className="flex-1 h-px bg-[rgba(184,160,122,0.30)]" />
  </div>
);
