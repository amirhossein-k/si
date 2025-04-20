//src\context\UserContext2.tsx
"use client"

import React, { createContext, useState, useEffect, ReactNode, useCallback
  // , useContext 
} from 'react';
import { USERTYPE } from '@/utils/types';


interface UserContextType {
  user: USERTYPE | null;
  setUser: (user: USERTYPE | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingNav: boolean;
  setLoadingNav: (isLoading: boolean) => void;
  
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERTYPE | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingNav, setLoadingNav] = useState(true);

  // for go to other page by click link
  const [isLoading, setIsLoading] = useState(false)

  const logout = async () => {
    try {
      await fetch('/api/logout', { 
        method: 'POST',
        credentials: 'include' 
      });
      setUser(null);
    } catch (error) {
      console.error("خطا در خروج:", error);
    }
  };  
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cook', { 
        credentials: 'include',
        cache: 'no-store' // غیرفعال کردن کش برای دریافت داده تازه
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("خطا در دریافت سشن:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // دریافت اولیه داده + گوش دادن به تغییرات مسیر
    const handleRouteChange = () => refreshUser();
    
    // فراخوانی اولیه
    refreshUser();
    
    // افزودن شنونده برای تغییر مسیر
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [refreshUser]);
  
  return (
    <UserContext.Provider value={{ user, setUser, logout,refreshUser ,loading,isLoading,setIsLoading,loadingNav, setLoadingNav}}>
      {children}
    </UserContext.Provider>
  );
};
// export const useUserContext = ()=>{
//     const context = useContext(UserContext)
//     if(!context){
//         throw new Error('useLoading must be used within a LoadingProvider')
//     }
//     return context
// }