import { useState } from "react";

export default function useProductState(index: number): ProductsStateInterface {
    const productIndexStateAction = useState(index);
    return { productIndexStateAction };
}

export interface ProductsStateInterface {
    productIndexStateAction: [
        number,
        React.Dispatch<React.SetStateAction<number>>
    ];
}