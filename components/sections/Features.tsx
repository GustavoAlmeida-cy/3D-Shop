"use client";

import React from "react";
import { FaGamepad, FaHandRock } from "react-icons/fa";
import { FaBolt, FaKeyboard } from "react-icons/fa6";
import { IconType } from "react-icons";
import FeatureCard from "@/components/ui/FeatureCard";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: FaKeyboard,
    title: "Compact Design",
    description:
      "Experience a sleek, compact design that frees up space for intense gaming sessions, allowing for more mouse movement and a cleaner setup.",
  },
  {
    icon: FaBolt,
    title: "RGB Backlighting",
    description:
      "Customize your keyboard with vibrant RGB backlighting, featuring dynamic lighting effects and millions of colors to match your gaming rig.",
  },
  {
    icon: FaHandRock,
    title: "Mechanical Switches",
    description:
      "Enjoy precise, tactile feedback with durable mechanical switches, ensuring fast response times and reliable performance during gameplay.",
  },
  {
    icon: FaGamepad,
    title: "Gaming Mode",
    description:
      "Activate gaming mode to disable the Windows key and avoid accidental interruptions, keeping you focused on the game.",
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="container mx-auto my-32 pt-8 px-4 md:px-16"
      aria-label="Features section"
    >
      <h2 className="text-2xl font-semibold pb-16">
        <span className="animate-pulse">/ </span>Features
      </h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            index={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
