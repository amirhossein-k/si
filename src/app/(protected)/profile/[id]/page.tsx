// src\app\(protected)\profile\[id]\page.tsx
'use client'
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

const Profilepage = () => {
  const user = useUser();

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold">پروفایل کاربر</h1>
    <p>آی دی: {user.id}</p>
    <p>ایمیل: {user.email}</p>
    <p>نام: {user.name}</p>
    <Link href={`/profile/${user.id}/address`} className='text-lg text-red-500' >ادرس</Link>
    <Link href={`/dashboard`} className='text-lg text-red-500' >داشبورد</Link>
    {/* سایر اطلاعات کاربر */}
  </div>
  )
}

export default Profilepage
