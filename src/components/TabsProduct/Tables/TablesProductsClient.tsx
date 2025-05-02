// components/TabsProduct/Tables/TablesProductsClient.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TablesProducts, { DashboardProduct } from './TablesProducts';
import useLogout from '../../../../hooks/useLogout';
import ConfirmationModalDashboardList from '@/app/components/ConfirmationModalListDashboard';
import { POSTTYPE } from '@/utils/types';

interface Props {
  products: POSTTYPE[];
  edit: boolean
}

export default function TablesProductsClient({ products,edit }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
console.log(edit,'editmode')
  const handleView = (p: DashboardProduct) => {
    router.push(`/products/${p.id}`);
  };
  const handleEdit = (p: DashboardProduct) => {
    router.push(`/dashboard/list?id=${p.id}&edit=true`);
    setShowModal(true)
  };
  const handleDelete = async (p: DashboardProduct) => {
    if (!confirm('آیا مطمئنید می‌خواهید این محصول را حذف کنید؟')) return;
    await fetch(`/api/dashboard/products/${p.id}`, { method: 'DELETE' });
    router.refresh();
  };
  const logout = useLogout()

  return (
    <>
    
    
    <TablesProducts
      products={products.map(p => ({...p, count: p.count || 0}))}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
    <ConfirmationModalDashboardList
          products={products}
        isOpen={showModal}
        onConfirm={()=>{
          setShowModal(false)
          // handleLogout()
          logout.mutate()
        }}
        onCancel={()=>setShowModal(false)}/>
    </>
  );
}