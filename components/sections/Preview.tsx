"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProductType } from "./Catalog";

interface PreviewProps {
  selectedProduct: ProductType;
}

const Preview: React.FC<PreviewProps> = ({ selectedProduct }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const isMouseDownRef = useRef(false);
  const isTouchDownRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartRotationRef = useRef(0);
  const velocityYRef = useRef(0);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !selectedProduct) return;

    // Limpa o container
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    // Setup cena, câmera e renderizador
    const scene = new THREE.Scene();
    scene.rotation.x = THREE.MathUtils.degToRad(60);

    const width = Math.min(mount.clientWidth, 1536);
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Iluminação
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const directionalLights = [
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0xffffff, 1),
    ];
    directionalLights[0].position.set(5, 10, 7.5);
    directionalLights[1].position.set(-10, 5, 0);
    directionalLights[2].position.set(10, 5, 0);
    directionalLights.forEach((light) => scene.add(light));

    // Carregamento do modelo GLTF
    const loader = new GLTFLoader();
    loader.load(selectedProduct.modelSrc, (gltf) => {
      if (modelRef.current) scene.remove(modelRef.current);

      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 12, -2);
      scene.add(model);
      modelRef.current = model;
    });

    // Física do pulo
    const gravity = 0.002;
    const bounceFactor = 0.3;
    const groundY = 0;

    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        velocityYRef.current -= gravity;
        modelRef.current.position.y += velocityYRef.current;

        if (modelRef.current.position.y <= groundY) {
          modelRef.current.position.y = groundY;
          velocityYRef.current *= -bounceFactor;
          if (Math.abs(velocityYRef.current) < 0.01) velocityYRef.current = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manipuladores de interação
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !modelRef.current) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      modelRef.current.rotation.y = mouseX * Math.PI;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!modelRef.current) return;
      isTouchDownRef.current = true;
      touchStartXRef.current = e.touches[0].clientX;
      touchStartRotationRef.current = modelRef.current.rotation.y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchDownRef.current || !modelRef.current) return;
      const deltaX = e.touches[0].clientX - touchStartXRef.current;
      modelRef.current.rotation.y =
        touchStartRotationRef.current + deltaX * 0.01;
    };

    const handleTouchEnd = () => {
      isTouchDownRef.current = false;
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleInteractionEnd = () => {
      isMouseDownRef.current = false;

      const animateBack = () => {
        if (!modelRef.current) return;

        const diff = modelRef.current.rotation.y;
        if (Math.abs(diff) > 0.01) {
          modelRef.current.rotation.y -= diff * 0.1;
          requestAnimationFrame(animateBack);
        } else {
          modelRef.current.rotation.y = 0;
        }
      };

      requestAnimationFrame(animateBack);
    };

    // Eventos
    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mousedown", handleMouseDown);
    mount.addEventListener("mouseup", handleInteractionEnd);
    mount.addEventListener("mouseleave", handleInteractionEnd);

    mount.addEventListener("touchstart", handleTouchStart);
    mount.addEventListener("touchmove", handleTouchMove);
    mount.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
      renderer.dispose();

      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mousedown", handleMouseDown);
      mount.removeEventListener("mouseup", handleInteractionEnd);
      mount.removeEventListener("mouseleave", handleInteractionEnd);

      mount.removeEventListener("touchstart", handleTouchStart);
      mount.removeEventListener("touchmove", handleTouchMove);
      mount.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedProduct]);

  return (
    <div
      ref={mountRef}
      id="preview"
      className="w-full h-[400px] p-2 mt-2"
      lang="en"
      aria-label="3D model preview of selected product"
    />
  );
};

export default Preview;
