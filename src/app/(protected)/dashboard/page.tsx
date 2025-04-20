// app/dashboard/page.tsx
'use client';
import ConfirmationModal from '@/app/components/ConfirmationModal';
import Image from 'next/image';
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

  return <div className='flex  flex-col gap-2'>
    <h1>Dashboard Content</h1>
    <Link href={'/'}>صفحه اصلی</Link>
    <Link href={'/dashboard/addproduct'}>اضافه کردن محصول</Link>
    <Link href={'/dashboard/upload'}>عکس</Link>
    {/* <Link href={'/dashboard/'}>ادرس</Link> */}

    <button onClick={()=>setShowModal(true)}>خروج از حساب کاربری</button>
    <ConfirmationModal 
    isOpen={showModal}
    onConfirm={()=>{
      setShowModal(false)
      // handleLogout()
      logout.mutate()
    }}
    onCancel={()=>setShowModal(false)}/>
    <Image alt='' width={500}
      height={300}
      className="w-full h-64 object-cover rounded-lg border" src={'https://c961427.parspack.net/c961427/uploads/1740128787471-download.jpg'}/>
  </div>;
}