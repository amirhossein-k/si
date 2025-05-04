/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from "next/link"
import { useState } from "react"
import {singUp} from '@/../actions/signup'

export default function RegisterPage(){

  const [errorMessage, setErrorMessage] = useState('');
    const [pending, setPending] = useState(false);
   




    async function handleSubmitt(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setPending(true);
      setErrorMessage('');
      const formData = new FormData(e.currentTarget);
      try {
        await singUp(formData);
      } catch (error:any) {
        console.error(error);
        setErrorMessage(error.message || 'خطایی رخ داده است.');
        // مدیریت خطا
      } finally {
        setPending(false);
      }
    }
  
    
    
    return(
        <div className="max-w-md mx-auto text-black">
            <h1 className="text-center text-xl shadow-md my-2 py-2 "> فرم ثبت نام </h1>
            {errorMessage && (
        <div className="mb-4 text-red-500">
          {errorMessage}
        </div>
      )}
            <form onSubmit={handleSubmitt} className="space-y-4 text-black">
            <div className="mb-4">
          <label htmlFor="name" className="block mb-1 ">نام:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="border-2 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1  ">ایمیل:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className=" border-2 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 ">رمز عبور:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border-2 p-2 w-full"
          />
        </div>
               
                <button className="text-white font-bold text-lg border rounded-lg px-2 py-2 inline w-full bg-blue-500"  disabled={pending} type="submit">
                   
                {pending ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                   </button>
            </form>
            <p className="flex flex-row-reverse mt-2">
               
                <Link href="/login" className="text-blue-600 hover:underline">
          وارد شوید
        </Link>
            </p>
        </div>
    )

}