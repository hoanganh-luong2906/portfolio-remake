import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const sizeHeight: Record<Size, number> = {
  sm: 36,
  md: 48,
  lg: 56,
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      icon,
      iconPosition = "left",
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = cn(
      "btn",
      variant === "primary" ? "btn-primary" : "btn-ghost",
      className,
    );
    const style = {
      height: sizeHeight[size],
      ...(rest as { style?: React.CSSProperties }).style,
    };

    const inner = (
      <>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </>
    );

    if ((rest as ButtonAsLink).href !== undefined) {
      const { href, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          style={style}
          {...linkRest}
        >
          {inner}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        style={style}
        {...(rest as ButtonAsButton)}
      >
        {inner}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
