"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  children?: React.ReactNode;
  imageUrl: string;
  height?: string;
  overlayOpacity?: number;
}

export default function ParallaxSection({
  children,
  imageUrl,
  height = "400px",
  overlayOpacity = 0.4,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex items-center justify-center p-8"
      style={{ height }}
    >
      <motion.div
        className="absolute inset-0 z-0 h-[140%] -top-[20%]"
        style={{
          y,
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0 z-10 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
