import React from "react";
import ProductCard from "@/components/ui/ProductCard";

export type ProductType = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  modelSrc: string;
};

const products: ProductType[] = [
  {
    id: "1",
    imgSrc: "/assets/keyboard1.png",
    title: "Magic Keyboard",
    price: 79.99,
    modelSrc: "/assets/keyboard.glb",
  },
  {
    id: "2",
    imgSrc: "/assets/keyboard2.png",
    title: "Dragon Keyboard",
    price: 89.99,
    modelSrc: "/assets/keyboard2.glb",
  },
  {
    id: "3",
    imgSrc: "/assets/keyboard3.png",
    title: "Gold Keyboard",
    price: 99.99,
    modelSrc: "/assets/keyboard3.glb",
  },
];

interface CatalogProps {
  selectedProduct: ProductType;
  onProductClick: (product: ProductType) => void;
}

const Catalog: React.FC<CatalogProps> = ({
  selectedProduct,
  onProductClick,
}) => {
  return (
    <section id="catalog" className="container mx-auto my-0 pt-8 px-4 md:px-16">
      <h2 className="text-2xl font-semibold pb-16">
        <span className="animate-pulse">/ </span>Catalog
      </h2>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            index={index}
            title={product.title}
            imgSrc={product.imgSrc}
            price={product.price}
            isActive={selectedProduct.id === product.id}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
