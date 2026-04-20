import { cn } from "@/lib/utils";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { useState, type ElementType } from "react";

export interface CardFlipProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: LucideIcon | ElementType;
  accent?: "amazon" | "gold";
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function CardFlip({
  title,
  subtitle,
  description,
  features,
  icon: Icon,
  accent = "amazon",
  ctaLabel = "Quero esse",
  onCtaClick,
  className,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const accentText = accent === "gold" ? "text-gold" : "text-amazon";
  const accentBorder = accent === "gold" ? "group-hover:border-gold/50" : "group-hover:border-amazon/50";

  return (
    <div
      className={cn(
        "group relative h-[360px] w-full [perspective:2000px]",
        className,
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-transform duration-700 ease-out",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full overflow-hidden rounded-2xl",
            "[transform:rotateY(0deg)] [backface-visibility:hidden]",
            "glass-card flex flex-col p-6 md:p-7",
            accentBorder,
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amazon/5 via-transparent to-gold/5" />

          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative flex h-[120px] w-full max-w-[220px] flex-col items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 rounded-sm bg-gradient-to-r from-amazon/20 via-amazon/40 to-amazon/20 opacity-0 animate-slide-in-card"
                  style={{
                    width: `${55 + ((i * 13) % 40)}%`,
                    animationDelay: `${i * 0.25}s`,
                    marginLeft: `${(i * 11) % 25}%`,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl",
                    "bg-gradient-to-br from-amazon via-leaf to-amazon",
                    "shadow-[0_0_30px_-6px_hsl(var(--amazon-green)/0.6)]",
                    "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  )}
                >
                  <Icon className="h-7 w-7 text-background" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-auto">
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1.5">
                <h3
                  className={cn(
                    "font-display text-2xl uppercase leading-tight tracking-wide transition-transform duration-500 ease-out group-hover:-translate-y-1",
                    accentText,
                  )}
                >
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground transition-transform delay-75 duration-500 ease-out group-hover:-translate-y-1">
                  {subtitle}
                </p>
              </div>
              <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-amazon/30 bg-amazon/10 text-amazon transition-all duration-300 group-hover:border-amazon group-hover:bg-amazon group-hover:text-background">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full overflow-hidden rounded-2xl",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
            "glass-card flex flex-col p-6 md:p-7",
            accentBorder,
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amazon/10 via-transparent to-gold/10" />

          <div className="relative z-10 flex-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amazon to-leaf">
                <Icon className="h-4 w-4 text-background" />
              </div>
              <h3 className={cn("font-display text-xl uppercase leading-tight tracking-wide", accentText)}>
                {title}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-sm text-foreground/90 transition-all duration-500"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 80 + 200}ms`,
                  }}
                >
                  <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-amazon/15 text-amazon">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className={cn(
              "relative z-10 mt-4 flex items-center justify-between gap-2 rounded-lg border border-amazon/30 bg-amazon/10 p-3 text-sm font-semibold transition-all duration-300",
              "hover:border-amazon hover:bg-amazon hover:text-background",
              accentText,
            )}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
