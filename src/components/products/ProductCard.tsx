// components/products/ProductCard.tsx
'use client'
import { useLoading } from '@/context/LoadingContext';
import { renderCountStatus } from '@/utils/CountStatus';
import { calculatePercentage } from '@/utils/OfferMade';
import { PHOTO, POSTTYPE } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';


export default function ProductCard({ product }: { product:POSTTYPE }) {
  console.log(product, 'prodict')

  const [isPending,startTransition] = useTransition()  
  const {setIsLoadingNavId} = useLoading()

  const router = useRouter()

    useEffect(() => {
      if (!isPending) {
        setIsLoadingNavId(false);
      }
    }, [isPending, setIsLoadingNavId]);

  const handlePush = () => {
    setIsLoadingNavId(true);
    startTransition(() => {
      router.push(`/products/${product.id}`);
    });
  };
  return (
    <div className=" text-black border flex flex-col justify-between rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative " dir='rtl'>
      
      {product.count ===0 && (
      <div className="soldout flex justify-center items-center bg-[#2ec8d379] w-full absolute h-[100%] left-0 top-0 z-10 rounded-lg">
       <span className='text-2xl text-[#000000]'> ناموجود</span>
      </div>
    )}
        
      {/* {product.productImage.filter(def=> def.defaultImage===true)[0].childImage} */}
      <Image
        src={product.productImage.length !== 0 ? product.productImage.filter((item: PHOTO) => item.defaultImage === true)[0].childImage : ""}
        alt={product.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
   <div className="body">
   <h1 className='text-xl'>{product.title}</h1>
      {product.count!==0&& renderCountStatus(product.countproduct.toString())}

      {/* <div className="count_less text-red-300">تنها1عدد در انبار باقی مانده</div> */}
   
      <p className=" text-gray-600 flex gap-2 te relative">
  <span className='text-lg flex gap-4'>
    <span>
      {product.price.toLocaleString()}
    </span>
    {product.priceOffer !== 0 && (
      <>
        <span className="diagonal-line w-[45px] h-[2px] absolute bg-red-600 rotate-[0deg] right-2 top-[13px] inline-block"></span>
        {calculatePercentage(product.priceOffer, product.price.toString()).toLocaleString()}
      </>
    )}
  </span>
  <Image
    quality={100}
    width={25}
    height={30}
    src={"https://c961427.parspack.net/c961427/uploads/dollar2%20%281%29%201.jpg"}
    alt=""
  />
</p>

      <div className="star-point  p-1 w-fit">
        <span className="flex  gap-2 text-sm">
          <span className="">4.2</span>
          <i className="bi bi-star-fill text-yellow-500"></i>
        </span>
      </div>
   </div>
      <div className="buttom z-40  my-1 bg-slate-100 border  flex justify-center group">
        <Link
          href={`/products/${product.id}`}
          // href={`qhab/${product.id}`}
          onClick={handlePush}
          // href="#"
          className="sm:w-[50%]  z-40    group-hover:scale-105 bg-slate-100  block px-1 py-2 text-center cursor-pointer group-hover:bg-blue-200 group-hover:duration-500 group-hover:animate-pulse group-hover:w-full"
        >
          مشاهده
        </Link>
      </div>
    </div>

  );
}