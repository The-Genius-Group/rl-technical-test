"use client";
import React from "react";
import useProductState, { ProductsStateInterface } from "@/app/hooks/useProductIndexState";
import ProductToggleButton from "@/components/products/button";

export function ProductToggle(props: ProductsProps) {
  const { products } = props;
  const { productIndexStateAction }: ProductsStateInterface = useProductState(0);
  const [productIndex, setProductIndex] = productIndexStateAction;

  const { nextProduct, previousProduct }: ProductsEventHandlers = {
    nextProduct: (e) => { setProductIndex((prev: number) => Math.min(prev + 1, products.length - 1)) },
    previousProduct: (e) => { setProductIndex((prev: number) => Math.max(prev - 1, 0)) }
  };

  if (products.length === 0) {
    return (
      <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-4xl font-bold text-center">No Products Found.</p>
      </section>
    );
  }

  const { title, description, image, price } =
    products[productIndex];

  const imageSrc: string = image?.src || 'https://placehold.co/400x400.png'; // use backup image instead
  let formattedPrice: string = price?.trim() ? price : `From ${getLowestProductPrice(products[productIndex].variants)}`; // potential for useMemo hook

  return (
    <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-[800px] m-auto">
      <h1 className="text-4xl font-bold text-center w-full">{title}</h1>
      <div className="flex justify-center items-center w-full max-w-[400px] aspect-[1/1] m-auto">
        <img className="m-auto" src={imageSrc} alt={image?.alt || title} />
      </div>
      <p className="text-2xl text-center w-full">{formattedPrice}</p>
      { description &&
        <p className="text-lg text-center">{description}</p>
      }
      <div className="flex justify-between w-full">
        <ProductToggleButton message="Previous Product" callback={previousProduct} />
        <ProductToggleButton message="Next Product" callback={nextProduct} />
      </div>
    </section>
  );
}

function getLowestProductPrice(variants: VariantPrice[]): string {
  if(variants.length === 1) return variants[0].price || 'N/A';

  const sortedVariants = variants.slice().sort((a,b) => Number(a.price) - Number(b.price));

  return sortedVariants[0].price || 'N/A';
}

interface VariantPrice {
  price: string;
}

interface ProductImage {
  src: string | null;
  alt?: string;
}

interface Product {
  title: string;
  description?: string;
  image: ProductImage;
  price: string;
  variants: VariantPrice[];
}

interface ProductsProps {
  products: Product[];
}

interface ProductsEventHandlers {
  nextProduct: React.MouseEventHandler<HTMLButtonElement>;
  previousProduct: React.MouseEventHandler<HTMLButtonElement>;
}
