// src\app\(protected)\profile\[id]\page.tsx
'use client'
import ConfirmationModal from '@/app/components/ConfirmationModal';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useState } from 'react';
import useLogout from '../../../../../hooks/useLogout';

const Profilepage = () => {
  const user = useUser();
  const logout = useLogout()
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold">پروفایل کاربر</h1>
    <p>آی دی: {user.id}</p>
    <p>ایمیل: {user.email}</p>
    <p>نام: {user.name}</p>
   <div className="flex  gap-3">
   <Link href={`/profile/${user.id}/address`} className='text-lg text-red-500' >ادرس</Link>
   {
    user.admin && (
      <Link href={`/dashboard`} className='text-lg text-red-500' >  داشبورد مدیریت</Link>
    )
   }
   </div>
    {/* سایر اطلاعات کاربر */}
     <button onClick={()=>setShowModal(true)}>خروج از حساب کاربری</button>
        <ConfirmationModal 
        isOpen={showModal}
        onConfirm={()=>{
          setShowModal(false)
          // handleLogout()
          logout.mutate()
        }}
        onCancel={()=>setShowModal(false)}/>
  </div>
  
  )
}

export default Profilepage
