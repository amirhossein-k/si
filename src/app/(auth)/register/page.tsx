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
            <h1 className="text-white">ثبت نام</h1>
            {errorMessage && (
        <div className="mb-4 text-red-500">
          {errorMessage}
        </div>
      )}
            <form onSubmit={handleSubmitt} className="space-y-4">
            <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-white">نام:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1  text-white">ایمیل:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-white">رمز عبور:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border p-2 w-full"
          />
        </div>
               
                <button className="text-white"  disabled={pending} type="submit">
                   
                {pending ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                   </button>
            </form>
            <p className="text-white">
                قبلا ثبت نام کردم
                <Link href="/login" className="text-blue-600 hover:underline">
          وارد شوید
        </Link>
            </p>
        </div>
    )

}