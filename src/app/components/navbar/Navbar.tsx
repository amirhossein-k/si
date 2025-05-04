'use client';

import Link from 'next/link';
import React, { useContext, useEffect, useState, useTransition } from 'react';
import { UserContext } from '@/context/UserContext2';
import styles from '@/features/styles/navbar.module.css';
import useWindowSize from "@/../hooks/size";
import CartDrawer from '@/components/cart/CartDrawer';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [search, setSearch] = useState(false);
  const [metr] = useState(768);
  const { width } = useWindowSize();
  const { user } = useContext(UserContext);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // مدیریت باز و بسته شدن منوی موبایل
  useEffect(() => {
    if (width) {
      setOpen(width <= metr);
    }
  }, [width, metr]);

  // نمایش پیام "صبر کنید" هنگام انتقال
  useEffect(() => {
    let toastId: string | undefined;
    if (isPending) {
      toastId = toast.loading('صبر کنید...');
    } else if (toastId) {
      toast.dismiss(toastId);
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending]);

  const handleFavorite = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenFavorite(!openFavorite);
  };

  // تابع برای مدیریت انتقال با پیام
  const navigateWithLoading = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <nav className="flex justify-between items-center min-h-[1vh] h-full mx-auto relative bg-[#263C97]">
      {/* left nav */}
      <div className="nav-link flex justify-between items-center h-full">
        <ul className="flex gap-6 justify-between p-1">
          <li className="border rounded-md bg-white min-w-1/2 text-stone-600 hover:text-sky-500 cursor-pointer">
            <button
              className="w-full h-full block"
              onClick={() => navigateWithLoading(user ? `/profile/${user.id}` : '/register')}
            >
              <i className="bi bi-person text-xl w-full h-full block py-2 px-3" />
            </button>
          </li>
          <li
            onClick={(e) => handleFavorite(e)}
            className="border rounded-md bg-white min-w-1/2 text-stone-600 hover:text-sky-500 cursor-pointer flex items-center relative"
          >
            <CartDrawer cartPage={false} />
          </li>
          <li
            onClick={() => setSearch(!search)}
            className="border rounded-md bg-white min-w-1/2 text-stone-600 hover:text-sky-500 cursor-pointer flex items-center"
          >
            <i className="bi bi-search text-xl w-full h-full block py-2 px-3" />
          </li>
        </ul>
      </div>
      {/* center brand photo */}
      <div
        className="h-full justify-center"
        style={search ? { display: 'none' } : { display: 'flex' }}
      >
        <Link href="/" className="w-full">
          {/* <Image
            src={one}
            alt="logo"
            width={65}
            className="cursor-pointer"
          /> */}
        </Link>
      </div>
      <div
        className="h-full"
        style={!search ? { display: 'none' } : { display: 'flex' }}
        dir="rtl"
      >
        <input type="text" placeholder="جستجو..." className="p-2 rounded-lg" />
      </div>
      {/* right nav */}
      <div
        style={
          open
            ? { top: '-100%', scale: '0', transitionProperty: 'top' }
            : { top: '0%', scale: '1', transitionProperty: 'scale' }
        }
        className="nav-link fixed bg-[#263C97] duration-500 transition-all flex items-center md:min-h-fit md:static right-0 top-[-100%] md:w-[31%] h-screen w-[50vh] md:h-full p-1 z-50"
      >
        <ul
          dir="rtl"
          className="z-50 flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 w-full h-full"
        >
          <div
            className="flex items-end justify-start p-2 md:hidden mb-5 text-white"
            onClick={() => setOpen(!open)}
          >
            <i className="bi bi-x-octagon text-2xl hover:text-red-500"></i>
          </div>
          <li className="hover:text-sky-500 px-2 border-b pb-2 text-xl bg-transparent text-white md:border-0 cursor-pointer sm:text-lg md:text-base lg:text-lg w-full font-medium">
            <button onClick={() => navigateWithLoading('/')}>صفحه اصلی</button>
          </li>
          <li
            className={`sm:w-full md:w-[150%] lg:w-[110%] hover:text-sky-500 border-b pb-2 text-lg text-white md:border-0 cursor-pointer sm:text-lg md:text-base lg:text-lg font-medium`}
          >
            <div className={`${styles.dropdown} relative`}>
              <button className="py-2 px-4 rounded items-center">
                <span className="mr-1">دسته بندی کالاها</span>
              </button>
              <ul
                className={`${styles.dropdown_menu} dropdown_menu md:absolute hidden text-gray-700 pt-1 w-full`}
              >
                <li>
                  <a
                    className="rounded-t bg-[#263C97] text-white hover:bg-gray-200 hover:text-sky-500 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    One
                  </a>
                </li>
                <li>
                  <a
                    className="bg-[#263C97] text-white hover:bg-gray-200 hover:text-sky-500 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    One
                  </a>
                </li>
                <li>
                  <a
                    className="rounded-b bg-[#263C97] text-white hover:bg-gray-200 hover:text-sky-500 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    One
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="hover:text-sky-500 px-2 border-b pb-2 text-lg text-white md:border-0 cursor-pointer w-full sm:text-lg md:text-base lg:text-lg font-medium">
            <button onClick={() => navigateWithLoading('/about')}>درباره ما</button>
          </li>
        </ul>
      </div>
      {/* right nav user - grid icon */}
      <div className="flex gap-6 px-3 md:hidden">
        <i
          className="bi bi-grid text-lg cursor-pointer flex justify-center items-center text-purple-300 min-w-1/2 p-2 hover:text-sky-500 md:hidden"
          onClick={() => setOpen(!open)}
        ></i>
      </div>
    </nav>
  );
};

export default Navbar;