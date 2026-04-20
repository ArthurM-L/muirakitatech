export const FrogLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Body */}
    <ellipse cx="32" cy="42" rx="22" ry="16" fill="hsl(var(--amazon-green))" />
    {/* Head */}
    <ellipse cx="32" cy="26" rx="20" ry="16" fill="hsl(var(--amazon-green))" />
    {/* Eye bumps */}
    <circle cx="20" cy="18" r="9" fill="hsl(var(--amazon-green))" />
    <circle cx="44" cy="18" r="9" fill="hsl(var(--amazon-green))" />
    {/* Glasses */}
    <circle cx="20" cy="18" r="7" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2" />
    <circle cx="44" cy="18" r="7" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2" />
    <line x1="27" y1="18" x2="37" y2="18" stroke="currentColor" strokeWidth="2" />
    {/* Pupils */}
    <circle cx="21" cy="19" r="2.5" fill="currentColor" />
    <circle cx="45" cy="19" r="2.5" fill="currentColor" />
    {/* Smile */}
    <path d="M22 32 Q32 38 42 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);
