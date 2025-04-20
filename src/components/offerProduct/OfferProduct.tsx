"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { CATEGORYLayoutITEM } from "@/utils/types";
import { calculateTimeDifference2 } from "../../../hooks/percent";
const OfferProduct = ({ category }: { category: CATEGORYLayoutITEM[] }) => {
  console.log(calculateTimeDifference2("21/03/2025/23"), 'h1')
  console.log(calculateTimeDifference2("21/03/2025/22"), '6ها')
  // console.log(calculateTimeDifference2("22/03/2025/23"), 'd')
  return (
    <div
      className="flex flex-col sm:w-[95%] md:w-[95%] lg:w-[96%] m-auto h-[480px]  p-1 py-2 shadow-shadow-one "
      dir="rtl"
    >
      <div className="header p-2 flex justify-around w-full relative">
        <div className=" flex-1 flex  p-2 text-xl font-semibold relative ">
          تخفیف{" "}
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
            <SwiperSlide className=" py-2  shadow  px-4 " key={itt.title + index}>
              <div className="w-full rounded-lg relative overflow-hidden flex justify-center flex-col items-center h-full shadow-shadow-catmain bg-[#ffffff]   hover:bg-purple-300   group ">
                {/* <div className="absolute top-0 right-0 z-50 w-full h-full bg-[#97bad4df]"> */}


                <div className="group-hover:flex flex-col  hover:justify-between hidden absolute  top-0 right-0 z-50 w-full h-full  bg-[#adc6d0c6]">
                  <span
                    className="flex  p-1 justify-end mx-2 text-white z-30  cursor-pointer "
                    dir="ltr"
                  >
                    <i className="bi bi-heart text-2xl w-full text-white   hover:text-red-400"></i>
                  </span>
                  <div className="  top-[50%] flex flex-col justify-center items-center mx-auto my-auto gap-2 text-lg font-medium">
                    <Link
                      href={`/qhab/${itt.id}`}
                      className="p-2 w-full items-center justify-center flex rounded-md bg-sky-400 text-white"
                    >
                      اطلاعات محصول
                    </Link>
                    <span className="p-2 flex rounded-md bg-[#cba6f2d0] text-white cursor-pointer">
                      اضافه کردن به سبد
                    </span>
                  </div>
                  {/* </div> */}
                </div>
                <div className="w-full h-[75%] bg-fuchsia-300 relative">
                  <div className="absolute z-30 bg-black  text-white rounded px-2 py-1 right-2 top-3 group-hover:text-purple-300">
                    -5%
                  </div>
                  <Image
                    alt=""
                    // src={
                    //   itt?.productImage?.filter(
                    //     (item) => item.defaultImage === true
                    //   )[0].childImage
                    // }
                    src={itt.pic}
                    fill
                    style={{ objectFit: "fill" }}
                    quality={100}
                  // width={1500}
                  // height={1500}
                  />
                </div>
                <div className="w-full h-[25%] flex  flex-col  p-2 mb-5">
                  <div className="title flex-1 text-lg">{itt.title}</div>
                  <div className="price flex-1 text-lg" dir="ltr">
                    155 تومان
                  </div>
                </div>
                <div className="absolute -bottom-3 right-0">  <div className="w-full h-[50px]  "> مدت زمان مانده از تخفیف</div></div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                  {itt?.count && calculateTimeDifference2(itt?.count || "20")?.h === '100%' ? (
                    <>

                      {calculateTimeDifference2(itt?.count || "20")?.he === true ? (
                        <div className="absolute bottom-3 left-10 text-sky-500 text-center ">
                          {calculateTimeDifference2(itt?.count || "20").ht}
                        </div>
                      ) : (<div className="hidden"></div>)}
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: calculateTimeDifference2(itt?.count || "20").d }}></div>
                    </>
                  ) : (
                    <>

                      {calculateTimeDifference2(itt?.count || "20")?.het === true ? (
                        <div className="absolute bottom-3 left-0 text-sm text-sky-500 text-center ">
                         کمتر از یک ساعت
                        </div>
                      ) :
                       
                        calculateTimeDifference2(itt?.count || "20")?.hetr === true ? (
                          <div className="absolute bottom-3 left-7 text-sky-500 text-center ">
                          {calculateTimeDifference2(itt?.count || "20").dt}
                        </div>
                        ):(
                        <div className="absolute bottom-3 left-3 text-sky-500 text-center ">
                          {calculateTimeDifference2(itt?.count || "20").dt}
                        </div>
                       )}
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: calculateTimeDifference2(itt?.count || "20").h }}></div>
                    </>
                  )}

                </div>
              </div>
            </SwiperSlide>
          );
        })}      </Swiper>
    </div>
  );
};

export default OfferProduct;
