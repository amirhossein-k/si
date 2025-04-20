import { useState, useCallback, useContext, useEffect } from 'react';
import Link from 'next/link';
import { UserContext } from '@/context/UserContext2';
import { POSTTYPE } from '@/utils/types';
import { useCart } from '../../../hooks/useCart';
import { usePathname } from 'next/navigation';

export default function CartDrawer({ cartPage }: { cartPage: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, isLoading, removeFromCart } = useCart();
  // const userContext = useContext(UserContext);
  // const currentUser = userContext?.user ?? null;
  const { user,refreshUser ,loading: userLoading  } = useContext(UserContext);

  const pathname = usePathname();

  // بستن سبد خرید هنگام تغییر مسیر
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

    // اطمینان از فراخوانی مجدد refreshUser در صورت نیاز
    useEffect(() => {
      if (!user) {
        refreshUser();
      }
    }, [user, refreshUser]);
  const toggleDrawer = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);


  if (userLoading) {
    return <div className="loading-indicator">در حال بارگذاری...</div>;
  }
  return (
    <div className="w-full h-full block cart cursor-default relative">
      {!cartPage && (
        <button onClick={toggleDrawer} className="top-4 left-4 text-black p-2 rounded">
          🛒 سبد خرید
        </button>
      )}
      {isOpen && (
        <div className={`z-[200] fixed left-0 top-0 h-full w-72 bg-white shadow-lg p-4`}>
          <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
            ✖️
          </button>
          <h2 className="text-xl font-bold mb-4">سبد خرید</h2>
          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : Array.isArray(cart) && cart.length === 0 ? (
            <p>سبد خرید شما خالی است.</p>
          ) : (
            Array.isArray(cart) &&
            cart.map((item: POSTTYPE) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2 text-black">
                <span className="flex-1">{item.title}</span>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => removeFromCart.mutate(item.id)} className="text-red-500">
                  🗑
                </button>
              </div>

            ))
          )}
          <div className="w-full flex justify-center mt-4">
            {user ? (
              <Link
                href={`/profile/${user.id}/cart`}
                className="text-black bg-blue-300 text-lg px-3 py-2 rounded-md font-thin"
              >
                سفارش نهایی
              </Link>
            ) : (
              <Link href={'/login'} className="text-lg text-blue-400">لطفاً وارد شوید</Link>
            )}
          </div>
        </div>
      )}
      {cartPage && (
        <div className={`relative block h-full bg-white shadow-lg p-4`}>
          <h2 className="text-xl font-bold mb-4">سبد خرید</h2>
          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : Array.isArray(cart) && cart.length === 0 ? (
            <p>سبد خرید شما خالی است.</p>
          ) : (
            Array.isArray(cart) &&
            cart.map((item: POSTTYPE) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2 text-black">
                <span className="flex-1">{item.title}</span>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => removeFromCart.mutate(item.id)} className="text-red-500">
                  🗑
                </button>
              </div>

            ))
          )}
          <div className="w-full flex justify-center mt-4">
            {user ? (
              <Link
                href={`/profile/${user.id}/cart/payment`}
                className="text-black bg-blue-300 text-lg px-3 py-2 rounded-md font-thin"
              >
                سفارش نهایی
              </Link>
            ) : (
              <Link href={'/login'} className="text-lg text-blue-400">لطفاً وارد شوید</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
