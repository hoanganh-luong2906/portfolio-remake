import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

type Variant = "error" | "warning" | "success" | "info";

const variantColors: Record<Variant, string> = {
  error: "#ff4d4d",
  warning: "#ffb37a",
  success: "#4ade80",
  info: "var(--accent)",
};

const variantIcons: Record<Variant, string> = {
  error: "⚠",
  warning: "⚠",
  success: "✓",
  info: "ℹ",
};

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  title?: string;
  children?: ReactNode;
}

export default function Alert({
  variant = "error",
  title,
  children,
  className,
  style,
  ...rest
}: AlertProps) {
  const color = variantColors[variant];
  return (
    <div
      className={cn(className)}
      style={{
        padding: "12px 14px",
        borderRadius: 10,
        fontSize: 13,
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        border: "1px solid",
        background: `color-mix(in oklab, ${color} 14%, transparent)`,
        borderColor: `color-mix(in oklab, ${color} 40%, transparent)`,
        color: "var(--fg)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: 14, flexShrink: 0 }}>
        {variantIcons[variant]}
      </span>
      <div>
        {title && <div style={{ fontWeight: 600 }}>{title}</div>}
        {children && (
          <div
            style={{
              color: "var(--fg-muted)",
              marginTop: title ? 2 : 0,
              fontSize: 12,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
