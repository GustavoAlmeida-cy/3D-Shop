import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Preview = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    const loader = new GLTFLoader();

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const scene = new THREE.Scene();
    const containerWidth = mount.clientWidth;
    const containerHeight = mount.clientHeight;

    const sceneWidth = containerWidth <= 1536 ? containerWidth : 1536;
    const sceneHeight =
      window.innerWidth <= window.innerHeight
        ? window.innerHeight
        : window.innerHeight;

    scene.rotation.x = THREE.MathUtils.degToRad(60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneWidth / sceneHeight,
      0.1,
      1000
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLightTop = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightTop.position.set(5, 10, 7.5);
    scene.add(directionalLightTop);

    const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightLeft.position.set(-10, 5, 0);
    scene.add(directionalLightLeft);

    const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightRight.position.set(10, 5, 0);
    scene.add(directionalLightRight);

    loader.load("/assets/keyboard.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, -2);
      scene.add(model);
    });

    camera.position.z = 5;

    renderer.setAnimationLoop(animate);

    function animate() {
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
      className="w-full h-[400px] md:h-[800px] pt-8 md:pt-0"
    />
  );
};

export default Preview;
