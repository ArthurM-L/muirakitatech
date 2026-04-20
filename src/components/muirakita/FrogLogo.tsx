import logo from "@/assets/muirakita-logo.png";

export const FrogLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <img
    src={logo}
    alt="Muirakitã Tech"
    className={`${className} object-contain`}
    loading="eager"
  />
);
