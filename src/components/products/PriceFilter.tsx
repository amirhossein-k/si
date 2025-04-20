// components/PriceFilter.tsx
'use client';
import React, { useState, useTransition, useEffect } from 'react';
import { Slider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import FilterParent from '../Filter/FilterParent';

interface PriceFilterProps {
  selectedCategory?: string;
  selectedSort?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedCategory, selectedSort }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setIsLoadingFilter } = useLoading();

  // وقتی isPending false شود، loading را خاموش می‌کنیم
  useEffect(() => {
    if (!isPending) {
      setIsLoadingFilter(false);
    }
  }, [isPending, setIsLoadingFilter]);

  const handlePriceFilterDelete = () => {
    setIsLoadingFilter(true);
    startTransition(() => {
      router.push(`/products/list`);
    });
  };

  const handleNavigation = (url: string) => {
    setIsLoadingFilter(true);
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <div className="mt-4 parent-filter group ">
      <FilterParent title_Filter="فیلتر قیمت" />
      <div className="subtitle  group-hover:flex flex-col hidden p-2">
      <Slider
        minValue={0}
        maxValue={50000}
        step={10}
        defaultValue={priceRange}
        onChange={(value: number | number[]) => {
          if (Array.isArray(value)) {
            setPriceRange([value[0], value[1]]);
          }
        }}
      />
      <div className="mt-2 text-sm">
        قیمت از {priceRange[0]} تا {priceRange[1]}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() =>
            handleNavigation(
              `/products/list?category=${selectedCategory || ''}&sort=${selectedSort || 'new'}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
            )
          }
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          اعمال فیلتر قیمت
        </button>
        <button
          onClick={handlePriceFilterDelete}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          حذف تغییرات
        </button>
      </div>
      </div>
    </div>
  );
};

export default PriceFilter;
