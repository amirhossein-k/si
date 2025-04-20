"use client"
import { useContext, useEffect, useTransition } from 'react';
// import gsap from 'gsap';
import style from '@/features/styles/FirstItem.module.css'
import { CATEGORYLayoutITEM } from '@/utils/types';
import Image from 'next/image';
// import GridCategoryItem from '../category/GridCategory';
// import Link from 'next/link';
// import { useUserContext } from '@/context/UserContext2';
import { useRouter } from 'next/navigation';
import { UserContext } from "@/context/UserContext2";

export default function FitstItem({category}: {category: CATEGORYLayoutITEM[]}) {
  const { setLoadingNav} = useContext(UserContext);

    // const { setLoadingNav } = useUserContext();
          const [isPending,startTransition] = useTransition()  
    
      const router = useRouter()
      const handlePush = (url:string) => {
        setLoadingNav(true);
        startTransition(() => {
          router.push(`${url}`);
        });
      };
      useEffect(() => {
        if (!isPending) {
          setLoadingNav(false);
        }
      }, [isPending, setLoadingNav]);
  return (
    <div className="grid grid-cols-1 lg:grid-rows-1  w-full md:w-[50%] h-full">
    {/* بخش دسته‌بندی */}
    <div className="FitstItem z-30  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:auto-rows-[150px] auto-rows-[250px] gap-2 ">
      {category?.map((item: CATEGORYLayoutITEM, index) => (
        <div className="row-span-1 md:col-span-1 lg:auto-rows-[150px]  lg:col-span-1 gap-2 " key={index + item.id}>
          <button
           onClick={()=>handlePush(`${item.link}`)}
            // href={item.link ?? ""}
            className="overflow-hidden relative rounded-3xl  h-full flex items-center justify-center"
          >
            <Image
              src={item.pic}
              alt=""
              className="object-fill w-full hover:scale-110"
              style={{
                transition: "all 0.5s ease",
                height: "inherit",
              }}
              priority
              quality={100}
              width={200}
              height={200}
            />
            <span className={`text-[#f9f9f9] ${style.neon_text} textShadow2 sm:text-xl text-2xl absolute mx-0 right-7   drop-shadow-category`}>
              {item.title}
            </span>
          </button>
        </div>
      ))}
    </div>

   
  </div>
  );
}
