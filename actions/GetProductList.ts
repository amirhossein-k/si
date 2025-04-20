"use server";
import prisma from '@/lib/db'
import { POSTTYPE } from '@/utils/types';
import { NextResponse } from 'next/server'


export async function GetProduct() {
    try {
        const listProduct:POSTTYPE[] = await prisma.post.findMany({ orderBy: {
            createdAt: 'desc'
          },include:{
            productImage:true
          }
      })
        return NextResponse.json(listProduct)

    } catch (error) {
        console.log(error, 'error get listproduct error')
        return NextResponse.json(
            { error: 'خطا در سرور' },
            { status: 500 }
        );
    }

}

