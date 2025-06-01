// src\components\newproduct\NewProduct.tsx
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { FormattedPostType } from "@/utils/types";
import { calculatePercentage } from "@/utils/OfferMade";
import { usePathname } from "next/navigation";
// import AddToCartButton from "../products/AddToCartButton";

// import { parse, differenceInDays } from "date-fns";
const OfferProduct = ({ category }: { category: FormattedPostType[] }) => {
const currectPath = usePathname()
console.log(currectPath)

const getDaysSinceCreation = (createdAt: string): string => {
  try {
    console.log("createdAt input:", createdAt);

    // اعتبارسنجی فرمت MM/dd/yyyy/HH
    if (!createdAt || !/^\d{2}\/\d{2}\/\d{4}\/\d{2}$/.test(createdAt)) {
      console.warn("Invalid createdAt format:", createdAt);
      return "نامشخص";
    }

    // تجزیه رشته تاریخ (MM/dd/yyyy/HH)
    const [month, day, year, hour] = createdAt.split('/').map(Number);
    const createdDate = new Date(year, month - 1, day, hour); // ماه از 0 شروع می‌شود
    if (isNaN(createdDate.getTime())) {
      console.warn("Parsed date is invalid:", createdDate);
      return "نامشخص";
    }

    const now = new Date();
    console.log("Current date:", now);
    console.log("Created date:", createdDate);

    // محاسبه تفاوت به میلی‌ثانیه
    const diffMs = now.getTime() - createdDate.getTime();
    // تبدیل به روز
    const daysDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    console.log("Days difference:", daysDiff);

    // مدیریت خروجی
    if (daysDiff < 0) {
      return "آینده";
    } else if (daysDiff === 0) {
      return "امروز";
    } else {
      return `${daysDiff} روز قبل`;
    }
  } catch (error) {
    console.error("Error calculating days since creation:", error);
    return "نامشخص";
  }
};

  return (
    <div
      className="flex flex-col sm:w-[95%] md:w-[95%] lg:w-[96%] m-auto h-[480px]  p-1 py-2 shadow-shadow-one "
      dir="rtl"
    >
      <div className="header p-2 flex justify-around w-full relative">
        <div className=" flex-1 flex  p-2 text-xl font-semibold relative ">
          محصولات جدید{" "}
          <span className="border-b-2 border-b-[#249cc0] w-[20%] z-40 absolute bottom-0 right-0"></span>
        </div>
        <div className="absolute bottom-2  border-b-[#cfcfcf] border-b-2    w-[95%]"></div>
        <div className="flex-1 flex justify-end  text-lg p-2 cursor-pointer ">
          مشاهده همه محصولات
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          495: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          570: {
            slidesPerView: 2,
            slidesPerGroup: 3,
          },
          769: {
            slidesPerView: 2,
            slidesPerGroup: 3,
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },

          1180: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          1550: {
            slidesPerView: 5,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper  "
        style={{ padding: "0 20px " }}
      >
        {category?.map((itt, index) => {
          return (
            <SwiperSlide className=" py-2  shadow  px-4" key={itt.title + index}>
              <div className="w-full rounded-lg relative overflow-hidden flex justify-center flex-col items-center h-full shadow-shadow-catmain bg-[#ffffff]   hover:bg-purple-300   group ">
                {/* <div className="absolute top-0 right-0 z-50 w-full h-full bg-[#97bad4df]"> */}
                <div className="group-hover:flex flex-col hover:justify-between hidden absolute  top-0 right-0 z-50 w-full h-full  bg-[#adc6d0c6]">
                  <span
                    className="flex  p-1 justify-end mx-2 text-white z-30  cursor-pointer "
                    dir="ltr"
                  >
                    <i className="bi bi-heart text-2xl w-full text-white   hover:text-red-400"></i>
                  </span>
                  <div className="  top-[50%] flex flex-col justify-center items-center mx-auto my-auto gap-2 text-lg font-medium">
                    <Link
                      href={`/products/${itt.id}`}
                      className="p-2 w-full items-center justify-center flex rounded-md bg-sky-400 text-white"
                    >
                      اطلاعات محصول
                    </Link>
                    {/* <span className="p-2 flex rounded-md bg-[#cba6f2d0] text-white cursor-pointer">
                     <AddToCartButton productId={itt.id} currectPath={currectPath}/>
                    </span> */}
                  </div>
                  {/* </div> */}
                </div>
                <div className="w-full h-[75%] bg-fuchsia-300 relative">
                  {
                    itt.priceOffer !==0 ? (
                      <div className="absolute z-30 bg-[#000000]  text-white rounded px-2 py-1 right-2 top-3 group-hover:text-purple-300">
                    {itt.priceOffer}%
                  </div>
                    ): (
                      <div className="">
                    
                  </div>
                    )
                  }
                  
                  <Image
                    alt=""
                    // src={
                    //   itt?.productImage?.filter(
                    //     (item) => item.defaultImage === true
                    //   )[0].childImage
                    // }
                    src={itt?.productImage?.filter((item)=>item.defaultImage === true)[0]?.childImage ||
                      'https://c713657.parspack.net/c713657/uploads/1748537697698-WhatsApp%20Image%202025-01-25%20at%2021.28.45_cdccb435.jpg'
                    }
                    fill
                    style={{ objectFit: "fill" }}
                    quality={100}
                    // width={1500}
                    // height={1500}
                  />
                </div>
                <div className="w-full h-[25%] flex  flex-col  p-2">
                  <div className="title flex-1 text-lg">{itt.title}</div>
                  {/* <div className="price flex-1 text-lg" dir="ltr">
                   
                  </div> */}
                  <div className="buy_text">
            <p className="mt-2 text-lg font-semibold">
              {itt.priceOffer !== 0 ? (
                <>
                  <span className="relative mx-2 w-fit">
                    {itt.price?.toLocaleString() ?? "."}
                    <span className="diagonal-line w-[80%] h-[2px] absolute bg-red-600 rotate-[0deg] right-[7px] top-[13px] inline-block"></span>
                  </span>
                  {calculatePercentage(
                    itt.priceOffer,
                    itt.price.toString()
                  ).toLocaleString()}
                </>
              ) : (
                <>{itt.price?.toLocaleString() ?? "."}</>
              )}{" "}
              تومان
            </p>
          </div>
                </div>
               <div className="time">{getDaysSinceCreation(itt.createdAt)}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default OfferProduct;
