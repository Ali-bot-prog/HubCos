"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  {
    value: 50,
    label: "Tamamlanan Kule",
    suffix: "+",
  },
  {
    value: 12000,
    label: "MW Soğutma Kapasitesi",
    suffix: "",
  },
  {
    value: 40,
    label: "Yıllık Endüstriyel Tecrübe",
    suffix: "",
  },
  {
    value: 150,
    label: "Metre Maksimum Yükseklik",
    suffix: "m",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="text-4xl md:text-5xl font-bold text-secondary" />;
}

export default function StatsSection() {
  return (
    <section className="bg-primary py-20 text-white border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-400 font-medium text-sm md:text-base uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
