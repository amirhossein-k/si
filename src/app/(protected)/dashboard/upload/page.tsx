/* eslint-disable @next/next/no-img-element */
// components/ParsPackUploader.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Upload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setError('لطفا فایلی انتخاب کنید');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'خطا در آپلود');

      alert(`عکس با موفقیت آپلود شد!\nلینک: ${data.url}`);
      setPreview(null);
      setImageUrl(data.url)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{},[loading])

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg text-black">
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            انتخاب عکس:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="block w-full mt-1 file:btn file:btn-primary"
            />
          </label>
        </div>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="پیشنمایش"
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'در حال آپلود...' : 'آپلود به پارس‌پک'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      {imageUrl && <div className="image"><Image width={500}
      height={300}
      className="w-full h-64 object-cover rounded-lg border" alt=''src={imageUrl ??""}/></div>}
    </div>
  );
}