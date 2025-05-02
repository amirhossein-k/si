// components/ConfirmationModal.tsx
"use client";

import Upload from "@/components/upload/Upload";
import { POSTTYPE } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface ImageEdit {
  defaultImage: boolean;
  childImage: string;
  fileKey:string
  id: string;
}
interface ImageObject {
  key: string;
  url: string;
  id: string;
}
export default function ConfirmationModalDashboardList({
  isOpen,
  onConfirm,
  onCancel,
  products,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  products: POSTTYPE[];
}) {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState<number>(0);
  const [countproduct, setCountproduct] = useState<number>(0);
  const [priceOffer, setPriceOffer] = useState<number>(0);
  // const [description, setDescription] = useState('');
  // const [error, setError] = useState('');
  // const [imageDefult, setImageDefult] = useState('');
  const [images, setImages] = useState<ImageEdit[]>();
  const [detailImage, setDetailImage] = useState<ImageObject[]>([{ key: '', url: "",id:"" }])
  // const [checkbox, setCheckbox] = useState(false);
  useEffect(() => {
    if (!id) return;
    // پیدا کردن محصول با آن id
    const p = products.find((prod) => prod.id === id);
    if (p) {
      setName(p.title);
      setPrice(String(p.price));
      setCount(p.count);
      setCountproduct(p.countproduct);
      setPriceOffer(p.priceOffer);
      setImages(p.productImage.map(img => ({
        defaultImage: img.defaultImage,
        childImage: img.childImage,
        fileKey: img.fileKey || '',
        id: img.id
      })));
      // setCheckbox(p.published);
    }
  }, [id, products]);  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg">
        <p className="mb-4 text-xl">ویرایش محصول</p>
        <form className="">
                  <Upload detailImage={detailImage} setDetailImage={setDetailImage} edit={true} imageEdit={images}/>
          
          <div className="flex">
            <div>
              <label className="block mb-2">نام محصول:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">قیمت:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
          <label className="block mb-2">تخفیف:</label>
          <input
            type="number"
            value={priceOffer}
            onChange={(e) => setPriceOffer(Number(e.target.value))}
            className="w-full p-2 border rounded"
            
          />
        </div>
            <div className="count">
              <label className={`mx-2`} htmlFor="available">
                وضعیت موجودی :
              </label>
              <input
                className="border-gray-400 border rounded-lg px-2 py-2 "
                id="available"
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
            <div className="countproduct">
        <label className={`mx-2`} htmlFor="countproduct">تعداد محصول  :</label>
          <input className='border-gray-400 border rounded-lg px-2 py-2 ' id='countproduct' type="number" value={countproduct} onChange={e=>setCountproduct(Number(e.target.value))} />
        </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded text-xl"
            >
              ثبت
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 px-4 py-2 rounded text-black text-xl"
            >
              لغو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
