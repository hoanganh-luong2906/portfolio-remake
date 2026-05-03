import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type Variant = "default" | "sm";

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: ElementType;
  children?: ReactNode;
}

const Card = forwardRef<HTMLElement, CardProps>(
  (
    { variant = "default", as: Tag = "div", className, children, ...rest },
    ref,
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn("glass", variant === "sm" && "glass-sm", className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Card.displayName = "Card";
export default Card;
