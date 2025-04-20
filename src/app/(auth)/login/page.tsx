'use client';
import { useState ,useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/context/UserContext2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useContext(UserContext); // دریافت setUser از Context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('لطفا ایمیل و رمز عبور را وارد کنید');
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data); // به‌روزرسانی Context با اطلاعات کاربر

        router.push(`/profile/${data.id}`);
      } else {
        const data = await res.json();
        setError(data.error || 'اطلاعات وارد شده صحیح نیست');
      }
    } catch (err) {
        console.log(err,'log login error')
      setError(`خطا در ارتباط با سرور${err}`);
    }
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ورود
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