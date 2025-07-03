"use client";

import React, { useState } from "react";
import Catalog, { ProductType } from "@/components/sections/Catalog";
import Preview from "@/components/sections/Preview";

const initialProduct: ProductType = {
  id: "1",
  imgSrc: "/assets/keyboard1.png",
  title: "Magic Keyboard",
  price: 79.99,
  modelSrc: "/assets/keyboard.glb",
};

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>(initialProduct);

  const handleProductClick = (product: ProductType) => {
    setSelectedProduct(product);
  };

  return (
    <section
      className="max-w-[1535px] flex flex-col mx-auto pt-8"
      aria-label="Product catalog and preview"
      lang="en"
    >
      <Catalog
        selectedProduct={selectedProduct}
        onProductClick={handleProductClick}
      />
      <Preview selectedProduct={selectedProduct} />
    </section>
  );
};

export default Products;
