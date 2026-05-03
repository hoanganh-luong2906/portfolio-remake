import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type Variant = "default" | "accent" | "accent-2" | "glass";
type Size = "sm" | "md";

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { height: 24, padding: "0 8px", fontSize: 11 },
  md: { height: 30, padding: "0 12px", fontSize: 12 },
};

const variantStyles: Record<Variant, React.CSSProperties> = {
  default: {},
  accent: {},
  "accent-2": {
    background: "color-mix(in oklab, var(--accent-2) 15%, transparent)",
    color: "var(--accent-2)",
    borderColor: "color-mix(in oklab, var(--accent-2) 35%, transparent)",
  },
  glass: {
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    borderColor: "rgba(255,255,255,0.18)",
  },
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", size = "md", className, style, children, ...rest },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn("chip", variant === "accent" && "chip-accent", className)}
        style={{ ...sizeStyles[size], ...variantStyles[variant], ...style }}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
export default Badge;
