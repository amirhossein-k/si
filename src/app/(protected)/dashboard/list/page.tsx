// src\app\(protected)\dashboard\list\page.tsx
"use server";
import React from "react";
import {
  GetProductDashboard,
  GetProductParams,
} from "../../../../../actions/GetProductListDashboard";
import TablesProductsClient from '@/components/TabsProduct/Tables/TablesProductsClient';

interface SearchParams {
  page?: string;
  edit?:boolean
}
export default async function Listpage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  
  const { page,edit } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 9;

  const { products, totalCount } = await GetProductDashboard({
    page: currentPage,
  } as GetProductParams);
  const totalPages = Math.ceil(totalCount / limit);
  console.log(totalPages)
  return (
    <div className="flex flex-col">
      <div className="title py-2 w-full font-bold text-lg text-center shadow-md">
        لیست محصولات
      </div>
      <div className="body w-full">
      <TablesProductsClient products={products} edit={edit|| false} />
      </div>
    </div>
  );
}

