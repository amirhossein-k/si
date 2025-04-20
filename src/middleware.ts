// // # مدیریت احراز هویت سراسری
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getSession } from '@/lib/auth'
// import { generateRandomId } from "../hooks/RoundomId";


// export const config = {
//   matcher: ['/register', '/login']
// }

// export async function middleware(request: NextRequest) {
//   const session = await getSession(request.cookies.toString())
//   // مسیرهای عمومی
//   const publicPaths = ['/login', '/register'];

//   // اگر لاگین کرده و سعی کند به صفحات عمومی دسترسی یابد
//   if (session && publicPaths.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }
//   // اگر لاگین نکرده و سعی کند به صفحه خصوصی دسترسی یابد
//   if (!session && !publicPaths.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   const guestId = request.cookies.get('sessionGuest');
//   if (!guestId) {
//     // تولید یک id یکتا برای کاربر مهمان
//     const newGuestId = generateRandomId();
//     const response = NextResponse.next();
//     response.cookies.set('sessionGuest', newGuestId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24 * 7, // به عنوان مثال 7 روز
//       path: '/',
//     });
//     return response;
//   }



//   return NextResponse.next();
// }

// # مدیریت احراز هویت سراسری
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from '@/lib/auth'


export const config = {
  matcher: ['/register', '/login']
}

export async function middleware(request: NextRequest) {
  const session = await getSession(request.cookies.toString())
  // مسیرهای عمومی
  const publicPaths = ['/login', '/register'];

  // اگر لاگین کرده و سعی کند به صفحات عمومی دسترسی یابد
  if (session && publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  // اگر لاگین نکرده و سعی کند به صفحه خصوصی دسترسی یابد
  if (!session && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // // اگر کاربر لاگین کرده باشد و بخواهد به رجیستر/لاگین دسترسی پیدا کند
  // if (session && request.nextUrl.pathname.startsWith('/register')) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }


  return NextResponse.next();
}


// export async function middleware(request:NextRequest) {
//     const session = await getSession(request.headers.get('cookie')|| '')

//   // منطق احراز هویت
//   if(!session && request.nextUrl.pathname.startsWith('/protected')){
//     return NextResponse.redirect(new URL('/login',request.url))
//   }
//   return NextResponse.next()
// }