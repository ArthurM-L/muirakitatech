import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export function useScramble(text: string, trigger: boolean, speed = 40) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    frame.current = 0;
    const len = text.length;

    const animate = () => {
      frame.current += 1;
      const progress = Math.min(frame.current / (speed * 0.8), 1);
      const revealed = Math.floor(progress * len);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, text, speed]);

  return display;
}
