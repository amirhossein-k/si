/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
// src\app\(protected)\profile\[id]\address\page.tsx
import { useUser } from '@/context/UserContext'
import { ADRESS } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { GetUserAD, updateUserAddress } from '../../../../../../actions/GetUser'

const Addresspage = () => {
  const queryClient = useQueryClient();
  const userContext = useUser();
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState<ADRESS[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 1. Optimized query with specific key and staleTime
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userContext.id],
    queryFn: async () => {
      const data = await GetUserAD(userContext.id);
      return 'error' in data ? null : data;
    }, staleTime: 60 * 1000 // Cache for 1 minute
  });
  // به روزرسانی state هنگام دریافت داده جدید
// اصلاح useEffect
React.useEffect(() => {
  if (Array.isArray(user?.address)) {
    setNewAddress(user.address.map(addr => ({
      ...addr,
      id: addr.id || '', 
      userId: addr.userId || userContext.id
    })));
  } else {
    setNewAddress([]); // مقدار پیش‌فرض برای جلوگیری از خطا
  }
}, [user, userContext.id]);


  // 2. Memoized mutation with optimistic updates
  const mutation = useMutation({
    mutationFn: (addressData: { address: ADRESS[] }) => updateUserAddress(addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userContext.id] });
      setEditMode(false); // خروج از حالت ویرایش بعد از ثبت موفق

    },
    // Optimistic update
    onMutate: async (newAddress) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['user', userContext.id] })

      // Optimistic update
      const previousUser = queryClient.getQueryData(['user', userContext.id])
      queryClient.setQueryData(['user', userContext.id], (old: any) => ({
        ...old,
        address: newAddress
      }))

      return { previousUser }
    },
    onError: (err, _, context) => {
      console.error("Update error:", err);
      setErrorMessage('خطا در بروزرسانی آدرس');
      queryClient.setQueryData(['user', userContext.id], context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userContext.id] })
    },
  });
  // 3. Improved edit mode handling
  const handleEditToggle = useCallback(() => {
    if (!editMode && user?.address) {
      setNewAddress(user.address.map(addr => ({
        ...addr,
        // حذف نشده، فقط کپی شده
      })));
    }
    setEditMode(prev => !prev);
  }, [editMode, user?.address]);

  // 4. Optimized input handler with memoization
  const handleInputChange = useCallback((
    index: number,
    field: keyof ADRESS,
    value: string
  ) => {
    setNewAddress(prev => prev.map((addr, i) => 
      i === index ? { ...addr, [field]: value } : addr
    ))
  }, [])
  

  // 5. Early returns for loading/error states
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error || !user) return <p>خطا در دریافت اطلاعات</p>;

  // console.log(user.address[0]?.location)
  return (
    <div>
     <div className="space-y-4">
      <h2 className="text-xl font-semibold">مدیریت آدرس</h2>
      
      {errorMessage && (
        <div className="text-red-500 p-2 bg-red-50 rounded">{errorMessage}</div>
      )}

      {editMode ? (
        // Edit Mode
        <div className="space-y-4 text-black">
          {newAddress.map((address, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={address.location}
                onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                placeholder="آدرس کامل"
                className="w-full p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => handleInputChange(index, 'state', e.target.value)}
                  placeholder="استان"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.zipcode}
                  onChange={(e) => handleInputChange(index, 'zipcode', e.target.value)}
                  placeholder="کد پستی"
                  className="p-2 border rounded"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <button
              onClick={() => mutation.mutate({ address: newAddress })}
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {mutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </button>
            
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded"
            >
              لغو
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="space-y-2 text-black" dir='rtl'>
     {Array.isArray(user.address) ? (
            user.address.map((address, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded">
                <p className="font-medium">شهر: {address.location}</p>
                <div className="flex gap-2 text-sm text-gray-600">
                  <span>خیابان: {address.state}</span>
                  <span>کد پستی: {address.zipcode}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">هیچ آدرسی ثبت نشده است</p>
          )}
          
          
          <button
            onClick={handleEditToggle}
            className="text-blue-500 hover:text-blue-700"
          >
            {user.address?.length ? 'ویرایش آدرس' : 'افزودن آدرس'}
          </button>
        </div>
      )}
    </div>
    </div>
  )
}

export default Addresspage
