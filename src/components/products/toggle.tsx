'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  images: { src: string }[];
  variants: { price: string }[];
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Product display component
export default function ProductDisplay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });

  const fetchProduct = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data.products[0] || null);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to fetch product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(1);
  }, []);

  const handleNextPage = () => {
    if (!pagination.hasNextPage) return;
    fetchProduct(pagination.currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (!pagination.hasPreviousPage) return;
    fetchProduct(pagination.currentPage - 1);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center p-4">Error: {error}</div>
  );

  if (!product) return (
    <div className="text-center p-4">No products found</div>
  );

  return (
    <div className="max-w-[400px] mx-auto p-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-9">
          {product.images[0] && (
            <img
              src={product.images[0].src}
              alt={product.title}
              className="w-full h-[300px] object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
            <p className="text-[14px] text-white/90">
              ${Number(product.variants[0]?.price || 0).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description || 'No description available' }}></p>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={handlePreviousPage}
            disabled={!pagination.hasPreviousPage}
            className={`px-6 py-2 rounded-md transition-colors ${
              pagination.hasPreviousPage
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!pagination.hasNextPage}
            className={`px-6 py-2 rounded-md transition-colors ${
              pagination.hasNextPage
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
