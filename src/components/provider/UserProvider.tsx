// components/UserProvider.tsx
'use client';
import React from 'react';
import UserContext from '@/context/UserContext';
import { USERTYPE } from '@/utils/types';

interface UserProviderProps {
  user: USERTYPE;
  children: React.ReactNode;
}

export default function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
