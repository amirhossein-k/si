// components/Navigation.tsx
'use client';
import React, {  useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';

interface NavigationProps {
  productId: string;
  cat:string
}

const catName = (catEn:string):string =>{
  switch(catEn){
    case 'lavazemKhane':
      return 'لوازم خانگی'
    case "mobile":
      return "موبایل"
    case "dekori":
      return  "لوازم دکوری"
    case "qhab":
      return "قاب ها"
    
    default:
      return ''
  }
  



}

export default function CurrentPath({ productId ,cat}: NavigationProps) {
  const pathname = usePathname() || "/";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setIsLoadingNavId,isLoadingNavId } = useLoading();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [isPending,startTransition] = useTransition()  
      const router = useRouter()
    
    const handlePush = (url:string) => {
        setIsLoadingNavId(true);
        startTransition(() => {
          router.push(`${url}`);
        });
      };
      
  return (
    <div className="flex shadow-card  gap-3 text-md mb-6" dir='rtl'>
      <button 
      onClick={()=>handlePush('/')}
      className="hover:text-black text-blue-400">
        خانه
      </button>
      <div>--</div>
      <button 
      onClick={()=>handlePush('/products/list')}
      className="hover:text-black text-blue-400">
        محصولات
      </button>
      <div>--</div>
      <button
        onClick={() => {
          const url = `/products/list?category=${cat}&sort=new`;
          console.log('Button clicked, URL:', url);
          handlePush(url);
        }}
        className="hover:text-black text-blue-400"
      >
        {catName(cat)}
      </button>
      {/* <Link href="/products/list" className="hover:text-black text-blue-400">
        قاب ها
      </Link> */}
      {productId && (
        <>
        
       <div>--</div>
         <Link href={pathname} className="hover:text-black text-blue-400">
         {productId}
       </Link>
        </>
      )}
     
    </div>
  );
}
