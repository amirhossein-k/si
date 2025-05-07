import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { getGuestSession } from '@/lib/auth';
import { USERTYPE } from '@/utils/types';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // اعتبارسنجی ورودی‌ها
    if (!email || !password) {
      return NextResponse.json(
        { error: 'ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    // پیدا کردن کاربر در دیتابیس
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        admin: true,
        createdAt: true,
        isVerfied: true,
        listordershop: true,
        password: true,
        posts: {
          select: {
            id: true,
            title: true,
            price: true,
            content: true,
            count: true,
            countproduct: true,
            priceOffer: true,
            published: true,
            authorId: true,
            createdAt: true,
            updatedAt: true,
            tags:true,
            productImage: {
              select: {
                id: true,
                defaultImage: true,
                childImage: true,
                fileKey: true,
                ownerId: true,
              },
            },
            categoryList: {
              select: {
                id: true,
                category: true,
              },
            },
            review: {
              select: {
                id: true,
                reviewText: true,
                name: true,
                email: true,
                createdAt: true,
              },
            },
          },
        },
        address: {
          select: {
            id: true,
            location: true,
            state: true,
            zipcode: true,
            userId: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'کاربری با این ایمیل وجود ندارد' },
        { status: 404 }
      );
    }

    // بررسی تطابق رمز عبور
    if (user.password) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json(
          { error: 'رمز عبور نادرست است' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'رمز عبور برای این کاربر تنظیم نشده است' },
        { status: 401 }
      );
    }

    // ایجاد سشن (با کوکی)
    const session = {
      userId: user.id,
      email: user.email,
    };

    const guestSession = await getGuestSession();

    if (guestSession) {
      await prisma.user.update({
        where: { id: session.userId },
        data: { listordershop: guestSession?.orders || [] },
      });
    }

    // شیء کاربر بدون رمز عبور برای پاسخ
    const userResponse: USERTYPE = {
      id: user.id,
      email: user.email,
      password: null, // رمز عبور حذف می‌شود
      name: user.name,
      admin: user.admin,
      createdAt: user.createdAt,
      isVerfied: user.isVerfied,
      listordershop: user.listordershop || [],
      posts: user.posts.map((post) => ({
        ...post,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        productImage: post.productImage,
        categoryList: post.categoryList,
        review: post.review,
        tags:post.tags
      })),
      address: user.address,
    };

    return NextResponse.json(userResponse, {
      status: 200,
      headers: {
        'Set-Cookie': `session=${JSON.stringify(session)}; Path=/; HttpOnly; SameSite=Lax; ${
          process.env.NODE_ENV === 'production' ? 'Secure' : ''
        }`,
      },
    });
  } catch (error) {
    console.error('خطا در ورود:', error);
    return NextResponse.json(
      { error: 'خطای سرور رخ داد' },
      { status: 500 }
    );
  }
}