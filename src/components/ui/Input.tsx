import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, className, style, id, ...rest }, ref) => {
    const inputEl = (
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 12,
              display: "flex",
              alignItems: "center",
              color: "var(--fg-muted)",
              pointerEvents: "none",
            }}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(className)}
          style={{
            width: "100%",
            height: 40,
            paddingLeft: icon ? 36 : 14,
            paddingRight: 14,
            background: "var(--input-bg)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-sm)",
            color: "var(--fg)",
            fontSize: 14,
            outline: "none",
            ...style,
          }}
          {...rest}
        />
      </div>
    );

    if (!label) return inputEl;

    return (
      <div>
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily:
              'var(--font-jetbrains-mono, "JetBrains Mono"), monospace',
            color: "var(--fg-dim)",
            marginBottom: 8,
          }}
        >
          {label}
        </label>
        {inputEl}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
