// app/shop/page.tsx
import { GetProduct, GetProductParams } from "@/../actions/GetProductListOrder";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import CurrentPath from "@/components/path/CurrentPath";
import PaginationBar from "@/components/products/PaginationBar";
// import ProductCard from '@/components/products/ProductCard';
import ProductGrid from "@/components/products/ProductGrid ";
import SortBar from "@/components/products/SortBar";
import Spinners from "@/components/products/Spinner";
// import { POSTTYPE } from '@/utils/types';
import { Metadata } from "next";

interface ShopPageProps {
  searchParams: {
    category?: string;
    sort?: "new" | "old" | "cheap" | "expensive";
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    count?:  string; // دریافت به صورت رشته از URL;
  };
}

export const metadata: Metadata = {
  title: "صفحه فروشگاه",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  // اضافه کردن await برای حل مشکل "sync-dynamic-apis"

  const { category, sort, page, minPrice, maxPrice, count } =
    await Promise.resolve(searchParams);
    console.log(count,'avalibale')
  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 9;

  // تبدیل مقادیر قیمت به عدد در صورت وجود
  const minPriceNum = minPrice ? Number(minPrice) : undefined;
  const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;
  // / تبدیل مقدار count به عدد. اگر count در URL موجود نباشد، undefined است.
  const countNum = count !== undefined ? Number(count) : undefined;
  // دریافت محصولات و تعداد کل موارد بر اساس فیلترها
  const { products, totalCount } = await GetProduct({
    category,
    sort,
    page: currentPage,
    minPrice: minPriceNum,
    maxPrice: maxPriceNum,
    count: countNum, // ارسال به صورت عددی,
  } as GetProductParams);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto px-4 py-8 " dir="rtl">
      {/* صفحه ای که هستی را نشان میدهد */}
      <CurrentPath productId={""} />
      {/* loading  در بخش بالای صفحه در صورت کلیک روی محصول یا دکمه ها به نمایش در می اورد */}
      <Spinners />

      {/* نوار مرتب‌سازی */}
      <SortBar selectedSort={sort} selectedCategory={category} />

      {/* ساختار دو ستونه: در حالت xl به بالا صفحه دو ستونه نمایش داده می‌شود */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-4">
        {/* ستون اول: FilterSidebar - در حالت rtl اولین ستون در سمت راست قرار می‌گیرد */}
        {/* <div> */}
        <FilterSidebar selectedCategory={category} selectedSort={sort} />
        {/* </div> */}

        {/* ستون دوم: لیست محصولات */}
        <div className="col-span-3">
          <ProductGrid products={products} />
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            selectedCategory={category}
            selectedSort={sort}
          />
        </div>
      </div>
    </div>
  );
}
