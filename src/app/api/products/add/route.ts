import { getSession } from "@/lib/auth";
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

interface ImageObject {
  key: string;
  url: string;
  id: string;
}

interface ProductRequest {
  name: string;
  price: number;
  html: string;
  checkbox: string;
  detailImage: ImageObject[]; // آرایه‌ای از اشیای تصویر
  imageDefult: string;
  selectedImageId: string;
  count: number;
  countproduct: number;
  priceOffer: number;
}

export async function POST(request: Request) {
  try {
    const requestData: ProductRequest = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, price, html, checkbox, detailImage,imageDefult, selectedImageId, count,countproduct,priceOffer } = requestData;
    // eslint-disable-next-line prefer-const
    let checkedit = checkbox === "انتشار";
    console.log('haaaaaaaaaaa')
console.log(`${name}  || ${price} || ${html} || ${checkbox} ===${checkedit} || ${detailImage} ||${imageDefult} || ${selectedImageId} || ${count} || ${countproduct} || ${priceOffer}`)
    // اعتبارسنجی فیلدهای اجباری
    if (!name || !price || !html) {
      return NextResponse.json(
        { error: 'عنوان، قیمت و نویسنده الزامی هستند' },
        { status: 400 }
      );
    }

    const session = await getSession();
    console.log(session, 'sesiion data');
    console.log(session?.id);
    if (!session) {
      return NextResponse.json(
        { error: 'کاربر احراز هویت نشده است' },
        { status: 401 }
      );
    }
console.log('before')
    const newProduct = await prisma.post.create({
      data: {
        title: name,
        content: html,
        published: checkedit,
        price:Number(price),
        authorId: session?.id,
        count,
        countproduct,
        priceOffer
      },
      include: { author: true },
    });
    console.log(newProduct, 'post save');

    const filternotEmty = detailImage.filter(filt => filt.key !== '');
    for (let i = 0; i < filternotEmty.length; i++) {
      if (filternotEmty[i].id === selectedImageId) {
        await prisma.productImage.create({
          data: {
            defaultImage: true,
            childImage: filternotEmty[i].url,
            fileKey: filternotEmty[i].key,
            ownerId: newProduct.id,
          },
        });
      } else {
        await prisma.productImage.create({
          data: {
            defaultImage: false,
            childImage: filternotEmty[i].url,
            fileKey: filternotEmty[i].key,
            ownerId: newProduct.id,
          },
        });
      }
    }

    return NextResponse.json(
      { success: true, message: "پست جدید ذخیره شد" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error, 'error login error');
    return NextResponse.json(
      { error: 'خطا در سرور' },
      { status: 500 }
    );
  }
}
