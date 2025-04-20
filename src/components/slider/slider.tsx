"use client";
import {Swiper, SwiperSlide} from "swiper/react";

import {Autoplay, Pagination, Navigation} from "swiper/modules";
import Image from "next/image";
import { CATEGORYLayoutITEM } from "@/utils/types";

const SliderComponent = ({category}: {category: CATEGORYLayoutITEM[]}) => {
  
  return (
    <div
      className={`order-first md:order-last min-w-[50%] md:min-w-[100%]: h-[450px] md:flex-1  bg-red-400 rounded-2xl overflow-hidden  `}
    >

      {/* <div className="">{cat}</div> */}
      <Swiper
        // spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
      >
        {category.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Image src={item.pic} alt="" fill quality={100} />
              <div className="absolute w-fit  z-30 right-3 top-[40%]  justify-center items-end flex flex-col gap-2">

              <span className="">{item.title}</span>
              <span className="">{item?.subtitle}</span>
              </div>
              <button className="text-black absolute w-fit  z-30 right-3 top-[80%] bg-transparent shadow-xl text-md border border-[#ffffff] font-normal hover:bg-white transition-colors duration-75 rounded-2xl px-3 py-2">بررسی کن</button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    
  );
};

export default SliderComponent;
