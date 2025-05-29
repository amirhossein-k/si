// src/lib/cartUtils.ts
import { getGuestSession, createGuestSession } from "@/lib/auth";
import prisma from "@/lib/db";
export async function DeleteToCartGuest(
  productId: string,
  userId: string,
  
): Promise<boolean> {
  
  // دریافت سفارشات موجود از کوکی
  const guestSession = await getGuestSession();
  // eslint-disable-next-line prefer-const
  let currentOrders = guestSession?.orders || [];

  // بررسی و آپدیت مقدار
  const updatedOrders = currentOrders.filter((order) => {
    const [id] = order.split("|");
    return productId !== id
  });

 

  // ایجاد/آپدیت سشن مهمان
  return await createGuestSession({
    userId,
    orders: updatedOrders
  });
}


 export async function addToCartGuest(
  productId: string,
  quantity: number,
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  list: string[]
): Promise<boolean> {
  const newOrderItem = `${productId}|${quantity}`;
  
  // دریافت سفارشات موجود از کوکی
  const guestSession = await getGuestSession();
  // eslint-disable-next-line prefer-const
  let currentOrders = guestSession?.orders || [];

  // بررسی و آپدیت مقدار
  const index = currentOrders.findIndex((item) => {
    const [id] = item.split("|");
    return id === productId;
  });

  if (index >= 0) {
    currentOrders[index] = newOrderItem;
  } else {
    currentOrders.push(newOrderItem);
  }

  // ایجاد/آپدیت سشن مهمان
  return await createGuestSession({
    userId,
    orders: currentOrders
  });
}

// تابع دامی برای افزودن به سبد خرید (در پروژه واقعی این تابع باید به دیتابیس یا session متصل شو د)
export async function addToCart(productId: string, quantity: number, userId: string, list: string[]) {
  console.log(`Product ${productId} added with quantity ${quantity}`);
  // منطق واقعی افزودن به سبد خرید در اینجا قرار می‌گیرد

  // ساخت رشته سفارش به صورت "productId|quantity"
  const newOrderItem = `${productId}|${quantity}`;
  // دریافت لیست سفارش‌های فعلی (اگر undefined بود، یک آرایه خالی در نظر می‌گیریم)
  // eslint-disable-next-line prefer-const
  let currentOrders = list || [];

  // یافتن اندیس محصول موجود در لیست (اگر وجود داشته باشد)
  const index = currentOrders.findIndex((item) => {
    const [id] = item.split("|");
    return id === productId;

  });
  if (index >= 0) {
    // اگر محصول موجود است، تعداد قبلی را بررسی می‌کنیم
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, existingQtyStr] = currentOrders[index].split("|");
    const existingQty = Number(existingQtyStr);
    if (existingQty === quantity) {
      // اگر تعداد تغییر نکرده، کاری انجام نمی‌دهیم
      return;
    } else {
      // در غیر این صورت مقدار سفارش قبلی را جایگزین می‌کنیم
      currentOrders[index] = newOrderItem;
    }
  } else {
    // اگر محصول در لیست نیست، به آرایه اضافه می‌کنیم
    currentOrders.push(newOrderItem);
  }

  // به‌روزرسانی فیلد listordershop در دیتابیس
  await prisma.user.update({
    where: { id: userId },
    data: { listordershop: currentOrders },
  });

  return
}
