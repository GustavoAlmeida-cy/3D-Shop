import React from "react";
import { IconType } from "react-icons";
import AnimatedContainer from "./AnimatedContainer";

interface FeaturesCardProps {
  index: number;
  icon: IconType;
  title: string;
  description: string;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({
  index,
  icon: Icon,
  title,
  description,
}) => {
  const delay = index % 2 === 0 ? 0.2 : 0.7;

  return (
    <AnimatedContainer
      delay={delay}
      styles="w-80 h-72 bg-stone-800 rounded-xl overflow-hidden relative"
    >
      {/* Background Icon decorativo */}
      <Icon
        className="absolute top-0 right-0 w-40 h-40 text-stone-900 z-0 pointer-events-none select-none"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-4 px-4 py-6">
        <Icon className="w-8 h-8 mb-4 text-slate-100" aria-hidden />
        <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </AnimatedContainer>
  );
};

export default FeaturesCard;
