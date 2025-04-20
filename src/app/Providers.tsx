// app/providers.tsx
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import CartDrawer from '@/components/cart/CartDrawer';
import Navbar from './components/navbar/Navbar';
// import { UserProvider } from '@/context/UserContext2';
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
           {/* <UserProvider>  */}
           <HeroUIProvider>
           
        <Navbar />
        {children}
        </HeroUIProvider>

      {/* </UserProvider> */}


    </QueryClientProvider>
  );
}