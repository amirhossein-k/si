// components/TabsProduct/Tables/TablesProducts.tsx
'use client'
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from '@heroui/react';

// تعریف نوع محصول مطابق با Prisma schema
export interface DashboardProduct {
  id: string;
  title: string;
  price: number;
  count: number;          // تعداد کل
  countproduct: number;   // موجودی
  priceOffer: number;     // مقدار تخفیف
  published: boolean;
}

interface TablesProductsProps {
  products: DashboardProduct[];
}

// ستون‌های جدول
const columns: { name: string; uid: keyof DashboardProduct | 'actions' }[] = [
  { name: 'عنوان', uid: 'title' },
  { name: 'قیمت (تومان)', uid: 'price' },
  { name: 'موجودی', uid: 'countproduct' },
  { name: 'تخفیف', uid: 'priceOffer' },
  { name: 'وضعیت', uid: 'published' },
  { name: 'عملیات', uid: 'actions' },
];

// نگاشت وضعیت منتشرشده
const publishedColorMap: Record<'true' | 'false', 'success' | 'danger'> = {
  true: 'success',
  false: 'danger',
};

export default function TablesProducts({ products }: TablesProductsProps) {
  const renderCell = React.useCallback(
    (
      product: DashboardProduct,
      columnKey: keyof DashboardProduct | 'actions'
    ): React.ReactNode => {
      if (columnKey === 'actions') {
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="جزئیات">
              <span className="cursor-pointer"><i className="bi bi-eye"></i></span>
            </Tooltip>
            <Tooltip content="ویرایش">
              <span className="cursor-pointer"><i className="bi bi-pencil"></i></span>
            </Tooltip>
            <Tooltip content="حذف" color="danger">
              <span className="cursor-pointer"><i className="bi bi-trash"></i></span>
            </Tooltip>
          </div>
        );
      }
      // حالا برای بقیه ستون‌ها مقدار را از محصول می‌گیریم
      const value = product[columnKey];
      switch (columnKey) {
        case 'title':
          return <span className="font-medium">{value as string}</span>;
        case 'price':
          return <span>{(value as number).toLocaleString()}</span>;
        case 'countproduct':
          return <span>{value as number}</span>;
        case 'priceOffer':
          return <span>{(value as number) > 0 ? `${(value as number).toLocaleString()}` : '-'}</span>;
        case 'published': {
          const boolVal = value as boolean;
          const key = boolVal ? 'true' : 'false';
          return (
            <Chip size="sm" color={publishedColorMap[key]} variant="flat">
              {boolVal ? 'منتشر' : 'پیش‌نویس'}
            </Chip>
          );
        }
        default:
          return null;
      }
    },
    []
  );

  return (
    <Table aria-label="لیست محصولات">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={products}>
        {(product) => (
          <TableRow key={product.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(product, columnKey as keyof DashboardProduct | 'actions')}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
