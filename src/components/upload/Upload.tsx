/* eslint-disable @next/next/no-img-element */
// components/ParsPackUploader.tsx
'use client';
// import Image from 'next/image';

interface ImageObject {
  key: string;
  url: string;
  id: string;
}
interface UploadProps {
  detailImage: ImageObject[];
  setDetailImage: React.Dispatch<React.SetStateAction<ImageObject[]>>;
}

import { useState } from 'react';
// interface UploadProps {
//   detailImage: { key: string; url: string };
//   setDetailImage: (image: { key: string; url: string }) => void;
// }
export default function Upload({ setDetailImage }: UploadProps ) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // const [detailImage,setDetailImage] = useState<string>('')

  // const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {

   


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
      // setDetailImage({key:data.Key,url:data.url})
      const num=String(Math.floor(performance.now() * 1000) + Math.floor(Math.random() * 1000))
      setDetailImage(prevImage=>[...prevImage,{key:data.Key,url:data.url,id:num}])

    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }

  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      const previewUrl = URL.createObjectURL(file); // ساخت آدرس موقت
      setPreview(previewUrl)
    
    }
  };


  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg text-black">
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            انتخاب عکس:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
          // type="submit"
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'در حال آپلود...' : 'آپلود به پارس‌پک'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      
    </div>
  );
}