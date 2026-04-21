"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => setReduced(mq.matches);
    updateReduced();
    mq.addEventListener("change", updateReduced);
    return () => {
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener("change", updateReduced);
    };
  }, []);

  const scaleDimensions = (): [number, number] => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100]);

  return (
    <div
      className="h-[36rem] md:h-[48rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-20 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mt-6 md:mt-10 mx-auto h-[20rem] md:h-[28rem] w-full border-4 border-border p-2 md:p-6 bg-card rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
