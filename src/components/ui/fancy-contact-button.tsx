import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FancyContactButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactElement;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  /** Tailwind gradient classes — already themed for Muirakitã (amazon → gold). */
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

/**
 * Premium contact tile with animated gradient background, used for WhatsApp /
 * Instagram / e-mail CTAs. Renders as an <a> so it can deep-link.
 */
export const FancyContactButton = React.forwardRef<
  HTMLAnchorElement,
  FancyContactButtonProps
>(
  (
    {
      icon,
      title,
      subtitle,
      size = "md",
      gradientFrom = "from-amazon/40",
      gradientVia = "via-leaf/40",
      gradientTo = "to-gold/50",
      className,
      ...props
    },
    ref,
  ) => {
    const sizes = {
      sm: "p-3 rounded-xl",
      md: "p-4 rounded-2xl",
      lg: "p-5 rounded-2xl",
    } as const;

    return (
      <a
        ref={ref}
        className={cn(
          "group relative isolate flex w-full max-w-sm overflow-hidden border border-amazon/25 bg-background/40 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:border-amazon/50",
          sizes[size],
          className,
        )}
        {...props}
      >
        {/* Animated gradient layer */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100",
            gradientFrom,
            gradientVia,
            gradientTo,
          )}
          style={{ backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite" }}
        />
        {/* Glow on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, hsl(var(--amazon-green) / 0.35), transparent 60%)",
          }}
        />

        <div className="flex w-full items-center gap-4">
          {/* Icon */}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/60 ring-1 ring-amazon/30 backdrop-blur">
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className:
                "w-6 h-6 text-foreground transition-transform duration-300 group-hover:scale-110 drop-shadow",
            })}
          </span>

          {/* Texts */}
          <span className="flex flex-col text-left">
            <span className="font-display text-base text-foreground sm:text-lg">{title}</span>
            {subtitle && (
              <span className="text-xs text-muted-foreground sm:text-sm">{subtitle}</span>
            )}
          </span>

          {/* Arrow */}
          <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-background/50 ring-1 ring-amazon/30 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4 text-amazon" />
          </span>
        </div>
      </a>
    );
  },
);
FancyContactButton.displayName = "FancyContactButton";
