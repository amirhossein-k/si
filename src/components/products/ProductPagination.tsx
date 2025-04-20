// components/products/ProductPagination.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function ProductPagination({ currentPage, totalPages }: { 
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-2 my-8">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => router.push(`/products?page=${i + 1}`)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}