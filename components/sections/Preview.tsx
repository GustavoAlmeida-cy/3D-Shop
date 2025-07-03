import { object } from "framer-motion/client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Preview = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const scene = new THREE.Scene();
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sceneWidth, sceneHeight);

    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneWidth / sceneHeight,
      0.1,
      1000
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );

      scene.add(cube);
    }

    camera.position.z = 6;

    renderer.setAnimationLoop(animate);

    function animate() {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
        }
      });

      renderer.render(scene, camera);
    }

    // Função de limpeza: será executada quando o componente for desmontado
    // ou antes da próxima execução do useEffect (no StrictMode)
    return () => {
      // Pare a animação para evitar vazamentos de memória
      renderer.setAnimationLoop(null);
      // Remova o elemento DOM do renderer
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="preview"
      className="w-full h-[400px] md:h-[80vh] pt-8 md:pt-0"
    />
  );
};

export default Preview;
