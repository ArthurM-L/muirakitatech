import { useMemo } from "react";

export const Fireflies = ({ count = 18 }: { count?: number }) => {
  const flies = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 5,
        delay: Math.random() * 8,
        opacity: 0.2 + Math.random() * 0.25,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flies.map((f, i) => (
        <span
          key={i}
          className="firefly absolute bottom-0 rounded-full bg-amazon"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            boxShadow: `0 0 ${f.size * 3}px hsl(var(--amazon-green) / 0.7)`,
          }}
        />
      ))}
    </div>
  );
};
