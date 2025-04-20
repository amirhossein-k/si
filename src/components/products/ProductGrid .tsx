// components/products/ProductGrid.tsx
'use client';
import React from 'react';
import { POSTTYPE } from '@/utils/types';
import ProductCard from './ProductCard';
import { useLoading } from '@/context/LoadingContext';
import { Spinner} from "@heroui/react";

interface ProductGridProps {
  products: POSTTYPE[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { isLoading,isLoadingFilter } = useLoading();
  return (
    <div className="relative">
     {(isLoading || isLoadingFilter) && (
  <div className="absolute inset-0 gap-4 bg-white bg-opacity-80 flex items-center justify-center z-50">
    <span>لطفا کمی صبر کنید</span>
    <Spinner classNames={{ label: "text-foreground mt-4" }} variant="wave" />
  </div>
)}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">

        {products.map((product: POSTTYPE) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
