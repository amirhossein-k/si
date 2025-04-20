import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { getGuestSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log(email,'email')
    // پیدا کردن کاربر در دیتابیس
    const user = await prisma.user.findUnique({
      where: { email },include:{}
    });
console.log(user)
    if (!user) {
      return NextResponse.json(
        { error: 'کاربری با این ایمیل وجود ندارد' },
        { status: 404 }
      );
    }

    // بررسی تطابق رمز عبور
    if (user.password !== null) {
        // اکنون TypeScript می‌داند password یک string است
        
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return NextResponse.json(
            { error: 'رمز عبور نادرست است' },
            { status: 401 }
          );
        }
      }

    // ایجاد سشن (با کوکی)
    const session = {
      userId: user.id,
      email: user.email,
    };
    console.log(session,'seesion')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
        let guestSession = await getGuestSession();
    
   if(guestSession){
    await prisma.user.update({
      where: { id: session.userId },
      data: { listordershop: guestSession?.orders },
    });
   }
  
    return NextResponse.json(
      { message: 'ورود موفقیت‌آمیز بود',id:user.id },
      
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${JSON.stringify(session)}; Path=/; HttpOnly; SameSite=Lax; ${
            process.env.NODE_ENV === 'production' ? 'Secure' : ''
          }`,
        },
      }
    );
    
  } catch (error) {
    console.log(error,'error login error')
    return NextResponse.json(
      { error: 'خطا در سرور' },
      { status: 500 }
    );
  }
}