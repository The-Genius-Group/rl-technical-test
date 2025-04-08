import React from "react";

export function ProductToggle(props: ProductsProps) {
  const { products } = props;

  const { productIndexStateAction }: ProductsState = {
    productIndexStateAction: [0, () => {}],
  };

  const [productIndex, setProductIndex] = productIndexStateAction;

  const { nextProduct, previousProduct }: ProductsEventHandlers = {
    nextProduct: () => {},
    previousProduct: () => {},
  };

  if (products.length === 0) {
    return (
      <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-4xl font-bold text-center">No Products Found.</p>
      </section>
    );
  }

  const { title, description, image, presentmentPrice } =
    products[productIndex];

  return (
    <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
      <img className="w-full h-auto" src={image} />
      <p className="text-2xl text-center">{presentmentPrice}</p>
      <p className="text-lg text-center">{description}</p>
      <button
        onClick={previousProduct}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Previous Product
      </button>
      <button
        onClick={nextProduct}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Next Product
      </button>
    </section>
  );
}

interface Product {
  title: string;
  description: string;
  image: string;
  presentmentPrice: string;
}

interface ProductsProps {
  products: Product[];
}

interface ProductsState {
  productIndexStateAction: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
}

interface ProductsEventHandlers {
  nextProduct: React.MouseEventHandler<HTMLButtonElement>;
  previousProduct: React.MouseEventHandler<HTMLButtonElement>;
}
