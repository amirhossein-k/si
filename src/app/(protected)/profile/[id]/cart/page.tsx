// src/app/(protected)/profile/[id]/cart/page.tsx
"use client";
import CartDrawer from "@/components/cart/CartDrawer";
import { UserContext } from "@/context/UserContext2";
import Link from "next/link";
import { useContext, useEffect } from "react";

const Cartpage = () => {
  const { user, loading, refreshUser } = useContext(UserContext);

  // دریافت خودکار اطلاعات کاربر هنگام ورود به صفحه
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  console.log('User data:', user);

  if (loading) {
    return <div className="text-center py-4">در حال بارگذاری اطلاعات کاربر...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-4">
        <Link href="/login" className="text-blue-500">
          لطفاً وارد شوید
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="name">{user.name}</div> */}
      <div className="countainer_address bg-red-400 my-2 px-2 py-2">
        <div className="address" dir="rtl">
          {user.address?.map((item) => (
            <div key={item.id}>
              <div>نشانی {item.location}</div>
              <div>شهر {item.state}</div>
              <div>کدپستی {item.zipcode}</div>
            </div>
          ))}
        </div>
        <Link
          href={`/profile/${user.id}/address`}
          className="bg-blue-400 rounded-md text-lg px-3 py-2 mb-2"
        >
          ویرایش آدرس
        </Link>
      </div>
      <div className="cart">{user.listordershop}</div>
      <CartDrawer cartPage={true} />
    </div>
  );
};

export default Cartpage;