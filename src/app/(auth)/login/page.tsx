'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context/UserContext2';
import { USERTYPE } from '@/utils/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useUserContext();
  const queryClient = useQueryClient();

  // تابع ورود
  const loginUser = async (credentials: { email: string; password: string }): Promise<USERTYPE> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'اطلاعات وارد شده صحیح نیست');
    }

    return res.json();
  };

  // مدیریت ورود با useMutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data); // به‌روزرسانی Context
      queryClient.invalidateQueries({ queryKey: ['user'] }); // باطل‌سازی کش کاربر
      toast.success('ورود با موفقیت انجام شد');
      setEmail('');
      setPassword('');
      router.push(`/profile/${data.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'خطا در ارتباط با سرور');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی ساده
    if (!email || !password) {
      toast.error('لطفاً ایمیل و رمز عبور را وارد کنید');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('لطفاً یک ایمیل معتبر وارد کنید');
      return;
    }

    if (password.length < 6) {
      toast.error('رمز عبور باید حداقل 6 کاراکتر باشد');
      return;
    }

    mutation.mutate({ email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">ایمیل:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>

      <p className="mt-4 text-center">
        حساب ندارید؟{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
}