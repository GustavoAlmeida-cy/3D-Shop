import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  name: string;
  imgSrc: string;
  text: string;
  stars: number; // De 1 a 5, assumido como inteiro
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  imgSrc,
  text,
  stars,
}) => {
  const clampedStars = Math.max(0, Math.min(stars, 5));
  const filledStars = Array.from({ length: clampedStars });
  const emptyStars = Array.from({ length: 5 - clampedStars });

  return (
    <div className="w-64 h-40 flex flex-col bg-stone-800 rounded-xl gap-y-2 px-4 py-6 mr-4 text-slate-200 shadow-md">
      <div className="flex justify-between items-center text-xs">
        {/* Avatar e nome */}
        <div className="flex items-center gap-3">
          <Image
            src={imgSrc}
            alt={`Profile picture of ${name}`}
            width={35}
            height={35}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-medium">{name}</span>
        </div>

        {/* Estrelas */}
        <div className="flex items-center gap-1 text-yellow-400">
          {filledStars.map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
          {emptyStars.map((_, i) => (
            <FaStar key={`empty-${i}`} className="opacity-30" />
          ))}
        </div>
      </div>

      <p className="text-slate-300 text-xs mt-2 line-clamp-4">{text}</p>
    </div>
  );
};

export default ReviewCard;
