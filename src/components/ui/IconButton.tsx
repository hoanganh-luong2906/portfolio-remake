import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "accent";

const sizes: Record<Size, number> = {
  sm: 30,
  md: 36,
  lg: 56,
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  children?: ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { size = "md", variant = "default", className, style, children, ...rest },
    ref,
  ) => {
    const dim = sizes[size];
    return (
      <button
        ref={ref}
        className={cn(className)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: dim,
          height: dim,
          borderRadius: "50%",
          border: "1px solid var(--line)",
          flexShrink: 0,
          background: variant === "accent" ? "var(--accent)" : "transparent",
          color: variant === "accent" ? "var(--accent-ink)" : "inherit",
          cursor: "pointer",
          transition:
            "background 0.25s ease, color 0.25s ease, transform 0.25s ease",
          ...style,
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
export default IconButton;
