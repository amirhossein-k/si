// src\app\api\products\add\route.ts
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
  tableContent: string
  detailImage: ImageObject[]; // آرایه‌ای از اشیای تصویر
  imageDefult: string;
  selectedImageId: string;
  count: number;
  countproduct: number;
  priceOffer: number;
  category:string[]
  tags:string[]
  
}

export async function POST(request: Request) {
  try {
    const requestData: ProductRequest = await request.json();
    const { name, price, html, checkbox,tableContent, detailImage,imageDefult, selectedImageId, count,countproduct,priceOffer,category,tags } = requestData;
    // eslint-disable-next-line prefer-const
    let checkedit = checkbox === "انتشار";
    console.log('haaaaaaaaaaa')
console.log(`${name}  || ${price} || ${html} || ${checkbox} ===${checkedit} || ${detailImage} ||${imageDefult} 
  || ${selectedImageId} || ${count} || ${countproduct} || ${priceOffer} || ${category} || ${tags} || ${tableContent}`)
    console.log("🛠️ [API] Full requestData:", requestData);
    console.log("🛠️ [API] tableContent:", JSON.stringify(requestData.tableContent));
    // اعتبارسنجی فیلدهای اجباری
    if (!name || !price || !html) {
      return NextResponse.json(
        { error: 'عنوان، قیمت و نویسنده الزامی هستند' },
        { status: 400 }
      );
    }
// ---- اینجا بخش حذف قبل از <table> ----
    let cleanTableContent = "";
    const idx = tableContent.indexOf("<table");
    if (idx !== -1) {
      cleanTableContent = tableContent.slice(idx);
    }
    console.log("» جدول تمیز:", cleanTableContent);


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
console.log(">>> Received tableContent on server:", tableContent);


    const newProduct = await prisma.post.create({
      data: {
        title: name,
        content: html,
        tableContent: cleanTableContent ,// اگر tableContent null یا undefined باشد، خالی ذخیره شود
        published: checkedit,
        price:Number(price),
        authorId: session?.id,
        count,
        countproduct,
        priceOffer,
        tags,
       

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

    // category
    for(let i = 0; i<category.length;i++){
      await prisma.categoryList.create({
        data:{
          category:category[i],
          ownerId:newProduct.id
        }
      })
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
