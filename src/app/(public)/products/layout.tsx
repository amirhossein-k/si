// app/shop/layout.tsx
'use client';
import SpinnerLyout from '@/components/spinner/SpinnerLyout';
import { LoadingProvider } from '@/context/LoadingContext';


export default function ShopLayout({ children }: { children: React.ReactNode }) {
 
  return <LoadingProvider>
    <SpinnerLyout/>
    {children}</LoadingProvider>;
}
