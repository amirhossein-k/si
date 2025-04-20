// src/app/(public)/r/page.tsx
'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// اگر به ماژول‌های اضافی مانند Autoplay نیاز دارید، می‌توانید آنها را به‌صورت داینامیک ایمپورت کنید

export default function Page() {
  const slides = [
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-13.jpg',
      title: 'هدست بازی جلوه نورپردازی درخشان',
      text: '40% تخفیف برای محصولات و ارسال رایگان',
      link: '/shop',
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
      title: 'تا 20% تخفیف گلکسی باد سامسونگ',
      text: '30% تخفیف برای محصولات و ارسال رایگان',
      link: '/shop',
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
      title: 'نسخه ورزشی نسخه ویژه قرمز',
      text: 'اتصال بی سیم با تلویزیون، کامپیوتر، لپ تاپ...',
      link: '/shop',
    },
  ];

  const banners = [
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-10.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details',
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details',
    },
    {
      image: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
      title: 'کانون مهاجم ستاره',
      category: 'هدفون و صدا',
      link: '/product-details',
    },
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
                1024: { slidesPerView: 1, spaceBetween: 30 },
              }}
              className="swiper-container overflow-visible pb-8 lg:pb-12"
            >
              {slides.map((item) => (
                <SwiperSlide key={item.image}>
                  <div className="relative h-64 lg:h-80">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" />
                    <div className="absolute z-30 right-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 text-white">
                      <span className="text-xl font-bold">{item.title}</span>
                      <span className="text-base">{item.text}</span>
                      <a href={item.link} className="mt-2 inline-block bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                        بررسی کن
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* بنرهای جانبی */}
          <div className="w-full lg:w-5/12 px-2 mt-8 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {banners.map((banner, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 text-right text-white">
                    <h6 className="text-lg font-semibold mb-1">
                      <a href={banner.link} className="hover:text-gray-300">
                        {banner.title}
                      </a>
                    </h6>
                    <p className="text-sm">{banner.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
