// components/Parallax.js
"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function Parallax({ heading, image, children, evenClasses }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // const parallaxVariants = {
  //   hidden: { opacity: 0, y: -100 },
  //   visible: { opacity: 1, y: 0 },
  // };

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
      className="relative overflow-hidden"
    >
      <div className={`${evenClasses} w-full h-screen flex`}>
        <motion.h1 className="text-white font-serif text-4xl z-10">
          {heading}
        </motion.h1>
        <div className="w-2/3 z-10 rounded">
          <Image
            src={image}
            alt={heading}
            height={600}
            width={600}
            className="opacity-75 h-1/3 object-contain rounded"
          />
        </div>
      </div>
      {children}
    </motion.div>
  );
}