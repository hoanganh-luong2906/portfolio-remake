import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type Variant = "h-display" | "h-section" | "body" | "eyebrow" | "mono";

const defaultTags: Record<Variant, ElementType> = {
  "h-display": "h1",
  "h-section": "h2",
  body: "p",
  eyebrow: "div",
  mono: "div",
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: ElementType;
  muted?: boolean;
  dim?: boolean;
  children?: ReactNode;
}

const Text = forwardRef<HTMLElement, TextProps>(
  (
    { variant = "body", as, muted, dim, className, style, children, ...rest },
    ref,
  ) => {
    const Tag = as ?? defaultTags[variant];
    const colorStyle: React.CSSProperties = dim
      ? { color: "var(--fg-dim)" }
      : muted
        ? { color: "var(--fg-muted)" }
        : {};

    return (
      <Tag
        ref={ref}
        className={cn(variant, className)}
        style={{ ...colorStyle, ...style }}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = "Text";
export default Text;
