// src\app\api\cart\route.ts
import { getGuestSession, getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db';
import { generateRandomId } from "../../../../hooks/RoundomId";
import { addToCart, addToCartGuest, DeleteToCartGuest } from "@/lib/cartUtils";
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

 