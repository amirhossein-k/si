// app/dashboard/page.tsx
'use client';
import ConfirmationModal from '@/app/components/ConfirmationModal';
import Link from 'next/link';
// import {  useRouter } from 'next/navigation';
import { useState } from 'react';
import useLogout from '../../../../hooks/useLogout';

export default  function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  // const router = useRouter()
const logout = useLogout()
 

  // const handleLogout = async()=>{
  //   try {
  //     const res = await fetch('/api/logout')
  //     if(res.ok){
  //       router.push('/login')
  //     }else{
  //       console.error('خطا در خروج');
  //     }
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     console.error('خطا در خروج', error);
  //   }
  // }

  return <div className='flex  flex-col gap-2' dir='rtl'>
    <h1 className='text-center shadow-lg py-2 text-lg font-bold'>صفحه مدیریت</h1>
    <div className="flex flex-row justify-around gap-3">
    <Link href={'/'} className='border w-full rounded-md py-2 text-center shadow-md hover:bg-sky-300'>صفحه اصلی</Link>
    <Link href={'/dashboard/addproduct'} className='border w-full rounded-md py-2 text-center shadow-md hover:bg-sky-300'>اضافه کردن محصول</Link>
    <Link href={'/dashboard/list'} className='border w-full rounded-md py-2 text-center shadow-md hover:bg-sky-300'>لیست محصولات</Link>
    </div>
    {/* <Link href={'/dashboard/upload'}>عکس</Link> */}
    {/* <Link href={'/dashboard/'}>ادرس</Link> */}

    <button onClick={()=>setShowModal(true)} className='border w-[50%] mx-auto rounded-md py-2 text-center shadow-md hover:bg-sky-300'>خروج از حساب کاربری</button>
    <ConfirmationModal 
    isOpen={showModal}
    onConfirm={()=>{
      setShowModal(false)
      // handleLogout()
      logout.mutate()
    }}
    onCancel={()=>setShowModal(false)}/>
    
  </div>;
}