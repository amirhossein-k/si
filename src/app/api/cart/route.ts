// src\app\api\cart\route.ts
import { createGuestSession, getGuestSession, getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db';
import { generateRandomId } from "../../../../hooks/RoundomId";

// تعریف اینترفیس برای داده ورودی
interface CartRequestBody {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const bodyReq: CartRequestBody = await request.json();

    // اعتبارسنجی
    if (!bodyReq.productId || typeof bodyReq.productId !== 'string') {
      return NextResponse.json(
        { error: 'داده نامعتبر' },
        { status: 400 }
      );
    }

    // چک کردن کاربر لاگین شده
    const session = await getSession();
    if (session) {
      await addToCart(bodyReq.productId, bodyReq.quantity, session.id, session.listordershop);
      return NextResponse.json({ success: true });
    }

    // کاربر مهمان
    let guestSession = await getGuestSession();
    
    // اگر سشن مهمان وجود نداشت، ایجاد کنید
    if (!guestSession) {
      const newUserId = generateRandomId();
      guestSession = {
        userId: newUserId,
        orders: []
      };
    }

    // افزودن به سبد خرید مهمان
    const success = await addToCartGuest(
      bodyReq.productId,
      bodyReq.quantity,
      guestSession.userId,
      guestSession.orders
    );

    return success 
      ? NextResponse.json({ success: true, message: 'به سبد خرید اضافه شد' })
      : NextResponse.json({ error: 'خطا در ذخیره سازی' }, { status: 500 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "خطای سرور" },
      { status: 500 }
    );
  }
}
// تابع دامی برای افزودن به سبد خرید (در پروژه واقعی این تابع باید به دیتابیس یا session متصل شو د)
async function addToCart(productId: string, quantity: number, userId: string, list: string[]) {
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




// app/api/cart/route.ts
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      const see =await getGuestSession()

      if(see){
        console.log(see.orders,'seeeee')
        const currentOrders = see?.orders || [];

    const parsedData = currentOrders.map(item => {
      const [productId, quantity] = item.split("|");
      return { productId, quantity: Number(quantity) };
    });
    const products = await prisma.post.findMany({
      where: {
        id: {
          in: parsedData.map(item => item.productId)
        }
      }
    });
    // ترکیب داده‌ها با quantity
    const cartData = products.map(product => ({
      ...product,
      quantity: parsedData.find(p => p.productId === product.id)?.quantity || 1
    }));

    return NextResponse.json(cartData);
      }

      return NextResponse.json([], { status: 200 }); // یا مدیریت خطای مناسب
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { listordershop: true }
    });

    const currentOrders = user?.listordershop || [];

    const parsedData = currentOrders.map(item => {
      const [productId, quantity] = item.split("|");
      return { productId, quantity: Number(quantity) };
    });

    const products = await prisma.post.findMany({
      where: {
        id: {
          in: parsedData.map(item => item.productId)
        }
      }
    });

    // ترکیب داده‌ها با quantity
    const cartData = products.map(product => ({
      ...product,
      quantity: parsedData.find(p => p.productId === product.id)?.quantity || 1
    }));

    return NextResponse.json(cartData);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json(
        { error: "شناسه محصول الزامی است" },
        { status: 400 }
      );
    }
    const session = await getSession();

    if (!session) {
      const see =await getGuestSession()
      if(see){
        console.log(see.orders,'seeeee')
        // const currentOrders = see?.orders || [];
      

        const success = await DeleteToCartGuest(
          id,see.userId
        );
      
    
        return NextResponse.json(success);
      }


      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری شوید" }, 
        { status: 401 }
      );   
    
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { listordershop: true }
    });
    if (!user) {
      return NextResponse.json(
        { error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }
    // listordershop= 67c202ead8344485b507b8a2|5  === productId|quantity
    // حذف orderId از آرایه listordershop
    const updatedOrders = user.listordershop.filter((order) => {
      const [productId] = order.split("|");
      return productId !== id
    });


    // به‌روزرسانی کاربر با آرایه جدید
    await prisma.user.update({
      where: { id: session.id },
      data: { listordershop: updatedOrders },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'محصول با موفقیت از سبد خرید حذف شد' 
    });  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "خطا در پردازش درخواست" },
      { status: 500 }
    );
  
  }
}

 async function DeleteToCartGuest(
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