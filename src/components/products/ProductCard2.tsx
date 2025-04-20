// components/ProductCard.tsx
'use client';
import { POSTTYPE } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

interface ProductImage {
  url: string;
}

export interface Product {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  productImage?: ProductImage[];
}

interface ProductCardProps {
  product: POSTTYPE;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      {product.productImage && product.productImage[0] && (
        <Image
          src={product.productImage[0].childImage}
          alt={product.title || 'Product Image'}
          width={300}
          height={200}
          className="object-cover rounded"
        />
      )}
      <h2 className="mt-2 font-bold">{product.title}</h2>
      {/* <p className="text-sm text-gray-600">{product.description}</p> */}
      <p className="mt-1 font-semibold text-lg">{product.price} تومان</p>
    </div>
  );
};

export default ProductCard;
