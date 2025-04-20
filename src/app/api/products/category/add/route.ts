

import { getSession } from "@/lib/auth";
import prisma from '@/lib/db';
import { NextResponse } from "next/server";

interface CategoryRequest {

    category_Title: string
}

export async function POST(request: Request) {
    try {

        const requestData: CategoryRequest = await request.json();

        const { category_Title } = requestData;
        if (!category_Title) {
            return NextResponse.json(
                { error: 'عنوان، قیمت و نویسنده الزامی هستند' },
                { status: 400 }
            );
        }
        const session = await getSession()
        if (session) {
            const newcategory = await prisma.categoryList.create({
                data: {
                    category_Title
                }
            })
            console.log(newcategory,'newcategory')
        }

        return NextResponse.json(
            { success: true, message: "دسته بندی جدید قرار گرفت" }
            ,
            { status: 201 })

    } catch (error) {
        console.log(error, 'error login error')
        return NextResponse.json(
            { error: 'خطا در سرور' },
            { status: 500 }
        );
    }
}
