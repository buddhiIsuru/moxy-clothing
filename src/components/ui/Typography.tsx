import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "serif-display";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const defaultComponents = {
  "serif-display": "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subtitle: "span",
  body: "p",
  caption: "span",
} as const;

const variantStyles = {
  "serif-display": "font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.01em] text-brand-text leading-[1.02]",
  h1: "font-sans text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light tracking-[0.01em] text-brand-text leading-none",
  h2: "font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.01em] text-brand-text leading-tight",
  h3: "font-sans text-xl sm:text-2xl font-light text-brand-text leading-snug",
  h4: "font-sans text-base sm:text-lg font-light text-brand-text leading-snug",
  subtitle: "font-sans text-xs sm:text-sm tracking-[0.22em] text-brand-accent uppercase font-medium",
  body: "font-sans text-sm sm:text-base text-brand-muted leading-relaxed font-light",
  caption: "font-sans text-xs text-brand-muted tracking-[0.08em]",
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  component,
  className,
  ...props
}) => {
  const Component = component || defaultComponents[variant];

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
