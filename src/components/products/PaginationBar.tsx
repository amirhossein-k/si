// components/PaginationBar.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Pagination } from '@heroui/react';

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  selectedCategory?: string;
  selectedSort?: string;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ totalPages, currentPage, selectedCategory, selectedSort }) => {
  const router = useRouter();

  return (
    <div className="mt-8">
      <Pagination 
        total={totalPages}
        initialPage={currentPage}
        onChange={(page: number) =>
          router.push(`/products/list?category=${selectedCategory || ''}&sort=${selectedSort || 'new'}&page=${page}`)
        }
      />
    </div>
  );
};

export default PaginationBar;
