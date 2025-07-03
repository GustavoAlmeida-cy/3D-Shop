"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProductType } from "./Catalog";

interface PreviewProps {
  selectedProduct: ProductType;
}

const Preview = ({ selectedProduct }: PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const isMouseDownRef = useRef(false);
  const velocityYRef = useRef(0);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !selectedProduct) return;

    const loader = new GLTFLoader();
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    const scene = new THREE.Scene();
    scene.rotation.x = THREE.MathUtils.degToRad(60);

    const containerWidth = mount.clientWidth;
    const sceneWidth = Math.min(containerWidth, 1536);
    const sceneHeight = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneWidth / sceneHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Luzes
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const lights = [
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0xffffff, 1),
    ];
    lights[0].position.set(5, 10, 7.5);
    lights[1].position.set(-10, 5, 0);
    lights[2].position.set(10, 5, 0);
    lights.forEach((light) => scene.add(light));

    // Carregamento do modelo
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
      const model = modelRef.current;
      if (model) {
        velocityYRef.current -= gravity;
        model.position.y += velocityYRef.current;

        if (model.position.y <= groundY) {
          model.position.y = groundY;
          velocityYRef.current *= -bounceFactor;
          if (Math.abs(velocityYRef.current) < 0.01) velocityYRef.current = 0;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // Eventos de interação
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !modelRef.current) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      modelRef.current.rotation.y = mouseX * Math.PI;
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleInteractionEnd = () => {
      isMouseDownRef.current = false;
      const animateBack = () => {
        const model = modelRef.current;
        if (!model) return;

        const diff = model.rotation.y;
        if (Math.abs(diff) > 0.01) {
          model.rotation.y -= diff * 0.1;
          requestAnimationFrame(animateBack);
        } else {
          model.rotation.y = 0;
        }
      };
      requestAnimationFrame(animateBack);
    };

    // Adiciona eventos
    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mousedown", handleMouseDown);
    mount.addEventListener("mouseup", handleInteractionEnd);
    mount.addEventListener("mouseleave", handleInteractionEnd);

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
    };
  }, [selectedProduct]);

  return (
    <div
      ref={mountRef}
      id="preview"
      className="w-full h-[400px] md:h-[800px] pt-8 md:pt-0"
    />
  );
};

export default Preview;
