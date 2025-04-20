"use client";
import Image from 'next/image';
import {Swiper, SwiperSlide} from "swiper/react";

// import {Autoplay, Pagination, Navigation} from "swiper/modules";


// بارگذاری دینامیک Swiper و SwiperSlide (فقط سمت کلاینت)

export const SliderSectionPage = () => {
  const slides = [
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-13.jpg',
      title: 'هدست بازی جلوه نورپردازی درخشان',
      text: '40% تخفیف برای محصولات و ارسال رایگان',
      link: '/shop'
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
      title: 'تا 20% تخفیف گلکسی باد سامسونگ',
      text: '30% تخفیف برای محصولات و ارسال رایگان',
      link: '/shop'
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
      title: 'نسخه ورزشی نسخه ویژه قرمز',
      text: 'اتصال بی سیم با تلویزیون، کامپیوتر، لپ تاپ...',
      link: '/shop'
    }
  ];

  const banners = [
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-10.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details'
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details'
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details'
    },
    // سایر بنرها را به اینجا اضافه کنید
  ];

  return (
    <div className="bg-gray-50 pt-16 lg:pt-24">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap -mx-2">
      {/* بخش اسلایدر */}
      <div className="w-full lg:w-7/12 px-2 overflow-hidden">
        <Swiper
          dir="rtl"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 1, spaceBetween: 30 }
          }}
          className="swiper-container overflow-visible pb-8 lg:pb-12"
        >
         <div
      className={`h-full w-full relative `}
    >
           {slides.map((item) => {
                   return (
                     <SwiperSlide key={item.image}>
                       <Image src={item.image} alt="" fill quality={100} />
                       <div className="absolute w-fit  z-30 right-3 top-[40%]  justify-center items-end flex flex-col gap-2">
         
                       <span className="">{item.title}</span>
                       <span className="">{item?.text}</span>
                       </div>
                       <button className="text-black absolute w-fit  z-30 right-3 top-[80%] bg-transparent shadow-xl text-md border border-[#ffffff] font-normal hover:bg-white transition-colors duration-75 rounded-2xl px-3 py-2">بررسی کن</button>
                     </SwiperSlide>
                   );
                 })}
                 </div>
        </Swiper>
          </div>

          <div className="w-full lg:w-5/12 px-2 mt-8 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {banners.map((banner, index) => (
                <div key={index} className="relative group">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 text-right">
                    <h6 className="text-white text-lg font-semibold mb-1">
                      <a href={banner.link} className="hover:text-gray-300">
                        {banner.title}
                      </a>
                    </h6>
                    <p className="text-gray-200 text-sm">{banner.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SliderSectionPage;