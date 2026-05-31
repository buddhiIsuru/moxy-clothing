import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-xs transition-all duration-300 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-45";

  const sizeStyles = {
    sm: "px-4 py-2.5 text-[10px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-9 py-4 text-xs",
    xl: "px-11 py-5 text-xs",
  };

  const variantStyles = {
    primary: "bg-brand-cta text-white font-medium border border-brand-cta hover:bg-brand-accent hover:border-brand-accent hover:text-brand-text shadow-[0_12px_28px_rgba(17,17,17,0.10)] hover:shadow-[0_16px_34px_rgba(200,169,126,0.18)]",
    secondary: "bg-transparent text-brand-text border border-brand-text/20 hover:border-brand-text hover:bg-brand-text/[0.03]",
    link: "bg-transparent text-brand-text border-b border-brand-text/25 hover:border-brand-accent px-0 py-1 hover:text-brand-accent rounded-none",
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
