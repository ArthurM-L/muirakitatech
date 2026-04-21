import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import jungle from "@/assets/jungle-hero.jpg";

export const Showcase = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <h2 className="font-display text-foreground text-2xl md:text-4xl">
              Tecnologia que cresce
            </h2>
            <h2
              className="font-display text-amazon font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              como a floresta
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Da Amazônia para o digital — soluções vivas, escaláveis e sustentáveis.
            </p>
          </div>
        }
      >
        <img
          src={jungle}
          alt="Floresta amazônica representando a essência da Muirakitã Tech"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};
