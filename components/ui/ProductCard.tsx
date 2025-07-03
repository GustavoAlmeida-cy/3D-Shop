"use client";

import Image from "next/image";
import React from "react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useCart } from "../sections/Cart";

interface ProductCardProps {
  index: number;
  imgSrc: string;
  title: string;
  price: number;
  isActive: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  index,
  imgSrc,
  title,
  price,
  isActive,
  onClick,
}) => {
  const { addToCart } = useCart();

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede propagação para o clique do card
    addToCart({ imgSrc, title, price, quantity: 1 });
  };

  const containerClass = `
    w-80 h-32 flex flex-row gap-4 rounded-xl transition-all duration-300 cursor-pointer 
    ${isActive ? "bg-gradient scale-105" : "bg-stone-800 hover:scale-105"}
  `;

  return (
    <div onClick={onClick}>
      <AnimatedContainer delay={index * 0.2} styles={containerClass}>
        <Image
          src={imgSrc}
          alt={`Product image of ${title}`}
          width={120}
          height={120}
          className="rounded-xl object-cover"
          priority
        />

        <div className="flex flex-col justify-between px-4 py-6 text-slate-200 w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex flex-row items-center justify-between">
            <p className="text-slate-400">${price.toFixed(2)}</p>
            <button
              onClick={handleBuy}
              className="w-16 py-1 text-sm border rounded-xl hover:bg-stone-200 hover:text-stone-800 transition duration-300"
              aria-label={`Buy ${title}`}
            >
              Buy
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default ProductCard;
