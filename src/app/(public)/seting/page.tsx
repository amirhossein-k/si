'use server';

import Link from "next/link";
import { cookies } from 'next/headers';


export default async function  asyncSetingpage () {
    const cookieStore = cookies()
    const cookieUser = (await cookieStore).get('session')
  
    const userData = cookieUser ? JSON.parse(cookieUser.value) : null;
  
  
    return (
      <div className="flex flex-col my-8 px-2  gap-3 justify-center items-center">
        صفحه اصلی سایت
        <div className="products"><Link href={'/products'}>محصولات</Link></div>
        <div className="products"><Link href={'/dashboard'}>داشبورد</Link></div>
        <div className="products"><Link href={'/register'}>ثبت نام</Link></div>
        <div className="products"><Link href={'/login'}>ورود</Link></div>
        <div className="products"> <Link href={`/profile/${userData?.userId ? userData.userId : 'login'}`}>
          پروفایل
        </Link></div>
        {/* {isPending ? <Loading/>: JSON.stringify(data?.slice(0,10))}  */}
        {/* <button onClick={()=>setId((prev)=>prev+1)}>Increment ID</button> */}
        {/* <button onClick={()=>refetch()}>Retech</button> */}
      </div>
    );
}

 
