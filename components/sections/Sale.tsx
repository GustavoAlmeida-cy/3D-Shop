"use client";

import { a, easings, useSpring } from "@react-spring/three";
import { Canvas, useLoader } from "@react-three/fiber";
import { useInView } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  url: string;
  initial: [number, number, number];
  final: [number, number, number];
  rotation: [number, number, number];
  delay?: number;
}

const Model = ({ url, initial, final, rotation, delay = 200 }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, url);
  const model = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const { position } = useSpring({
    from: { position: initial },
    to: { position: final },
    config: { duration: 1500, easing: easings.easeInOutCubic },
    delay,
  });

  return (
    <a.group position={position} rotation={rotation} scale={[0.5, 0.5, 0.5]}>
      <primitive object={model} />
    </a.group>
  );
};

const Sale: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mountRef, { once: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const leftInitial: [number, number, number] = [-2, 0, 0];
  const rightInitial: [number, number, number] = [2, 0, 0];

  const leftFinal: [number, number, number] = [-3.1, -1.3, 0];
  const rightFinal: [number, number, number] = isMobile
    ? [2, -1, 0]
    : [2.9, 0.8, 0];

  const rotation: [number, number, number] = [
    Math.PI / 2,
    (Math.PI / 180) * 80,
    (Math.PI / 180) * -10,
  ];

  return (
    <section
      ref={mountRef}
      className="flex flex-col items-center container gap-8 pt-32 mx-auto relative"
      aria-label="Limited collection for sale"
    >
      <div className="absolute w-full h-screen lg:h-[150vh] top-0 md:top-[-60vh] left-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <directionalLight position={[-5, 5, 5]} intensity={3} />
          {isInView && (
            <>
              {!isMobile && (
                <Model
                  url="/assets/keyboard.glb"
                  initial={leftInitial}
                  final={leftFinal}
                  rotation={rotation}
                />
              )}

              <Model
                url="/assets/keyboard3.glb"
                initial={rightInitial}
                final={rightFinal}
                rotation={rotation}
                delay={400}
              />
            </>
          )}
        </Canvas>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Limited collection <br /> for sale
      </h2>
      <p className="uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent">
        Discount up to 30%
      </p>
      <Link
        href="#catalog"
        className="w-36 text-center py-3 rounded-xl text-xs bg-gradient"
      >
        Buy keyboard
      </Link>
    </section>
  );
};

export default Sale;
