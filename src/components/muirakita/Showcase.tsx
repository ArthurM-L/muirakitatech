import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import jungle from "@/assets/jungle-hero.jpg";

export const Showcase = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="font-display text-foreground text-3xl md:text-5xl">
              Tecnologia que cresce
            </h2>
            <h2
              className="font-display text-amazon font-bold mt-1 leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              como a floresta
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Da Amazônia para o digital — soluções vivas, escaláveis e sustentáveis.
            </p>
          </>
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
