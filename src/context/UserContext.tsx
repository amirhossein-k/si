// // contexts/UserContext.tsx
'use client';
import { createContext, useContext } from 'react';
import { USERTYPE } from '@/utils/types';

interface UserContextType {
  user: USERTYPE;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context.user;
}

export default UserContext;



