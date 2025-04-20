// src/app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createGuestSession, getGuestSession, getSession } from "@/lib/auth";
import { generateRandomId } from "../../../../hooks/RoundomId";

// اینترفیس درخواست Cart
interface CartRequestBody {
  productId: string;
  quantity: number;
}

// POST /api/cart
export async function POST(request: NextRequest) {
  try {
    const bodyReq: CartRequestBody = await request.json();

    // اعتبارسنجی اولیه
    if (!bodyReq.productId || typeof bodyReq.productId !== "string") {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    const session = await getSession();
    if (session) {
      // کاربر لاگین شده
      await addToCart(
        bodyReq.productId,
        bodyReq.quantity,
        session.id,
        session.listordershop
      );
      return NextResponse.json({ success: true });
    }

    // کاربر مهمان
    let guestSession = await getGuestSession();
    if (!guestSession) {
      guestSession = { userId: generateRandomId(), orders: [] };
    }

    const success = await addToCartGuest(
      bodyReq.productId,
      bodyReq.quantity,
      guestSession.userId
    );
    return success
      ? NextResponse.json({ success: true, message: "به سبد خرید اضافه شد" })
      : NextResponse.json({ error: "خطا در ذخیره‌سازی" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// GET /api/cart
export async function GET() {
  try {
    const session = await getSession();
    let cartItems: { productId: string; quantity: number }[] = [];

    if (session) {
      // کاربر لاگین
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { listordershop: true },
      });
      cartItems = parseOrders(user?.listordershop || []);
    } else {
      // مهمان
      const guest = await getGuestSession();
      cartItems = parseOrders(guest?.orders || []);
    }

    const products = await prisma.post.findMany({
      where: { id: { in: cartItems.map((i) => i.productId) } },
    });
    const cartData = products.map((p) => ({
      ...p,
      quantity: cartItems.find((i) => i.productId === p.id)?.quantity || 1,
    }));
    return NextResponse.json(cartData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/cart
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "شناسه محصول الزامی است" },
        { status: 400 }
      );
    }

    const session = await getSession();
    if (session) {
      // حذف برای کاربر لاگین
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { listordershop: true },
      });
      if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
      }
      const updated = user.listordershop.filter((o) => o.split("|")[0] !== id);
      await prisma.user.update({
        where: { id: session.id },
        data: { listordershop: updated },
      });
      return NextResponse.json({
        success: true,
        message: "محصول با موفقیت حذف شد",
      });
    } else {
      // حذف برای مهمان
      const guest = await getGuestSession();
      if (!guest) {
        return NextResponse.json(
          { error: "ابتدا محصولی به سبد اضافه کنید" },
          { status: 400 }
        );
      }
      const updatedOrders = guest.orders.filter((o) => o.split("|")[0] !== id);
      await createGuestSession({
        userId: guest.userId,
        orders: updatedOrders,
      });
      return NextResponse.json({
        success: true,
        message: "محصول با موفقیت حذف شد",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "خطا در پردازش درخواست" },
      { status: 500 }
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
// ------------ توابع کمکی (غیر-exported) ----------------
////////////////////////////////////////////////////////////////////////////////

async function addToCart(
  productId: string,
  quantity: number,
  userId: string,
  list: string[]
) {
  const newOrderItem = `${productId}|${quantity}`;
  const currentOrders = list || [];
  const idx = currentOrders.findIndex((i) => i.split("|")[0] === productId);
  if (idx >= 0) {
    currentOrders[idx] = newOrderItem;
  } else {
    currentOrders.push(newOrderItem);
  }
  await prisma.user.update({
    where: { id: userId },
    data: { listordershop: currentOrders },
  });
}

async function addToCartGuest(
  productId: string,
  quantity: number,
  userId: string
): Promise<boolean> {
  const guest = await getGuestSession();
  const currentOrders = guest?.orders || [];
  const newOrderItem = `${productId}|${quantity}`;
  const idx = currentOrders.findIndex((i) => i.split("|")[0] === productId);
  if (idx >= 0) {
    currentOrders[idx] = newOrderItem;
  } else {
    currentOrders.push(newOrderItem);
  }
  return createGuestSession({ userId, orders: currentOrders });
}

function parseOrders(list: string[]): { productId: string; quantity: number }[] {
  return list.map((item) => {
    const [productId, qty] = item.split("|");
    return { productId, quantity: Number(qty) };
  });
}
