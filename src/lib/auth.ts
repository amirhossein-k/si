// lib/auth.ts
import { cookies } from "next/headers";
import { GetUser } from "../../actions/GetUser";
import { USERTYPE } from "@/utils/types";

interface Session {
  userId: string;
  email: string;
}

// تابع getSession
export async function getSession(cookieHeader?: string): Promise<USERTYPE | null> {
  if (cookieHeader) {
    // منطق Middleware
    const sessionCookie = cookieHeader
      .split('; ')
      .find(c => c.startsWith('session='))
      ?.split('=')[1];

    if (!sessionCookie) return null;
    return JSON.parse(decodeURIComponent(sessionCookie))  as USERTYPE;
  }

  // منطق کامپوننت‌های سرور
  const cookieStore = await cookies(); // بدون await
  const sessionCookie = cookieStore.get('session')?.value;
console.log(sessionCookie,'cook')
  //get detail user
  if(sessionCookie){
    const oop = await JSON.parse(sessionCookie) as { userId: string };

    const  data:Response  = await GetUser(oop ? oop.userId: "")
    const userDetail: USERTYPE = await data.json();
    return userDetail
  }else{
    return null
  }

  
// if(sessionCookie){
//   return userDetail
// }else{
//   return null
// }

  // return sessionCookie ? JSON.parse(sessionCookie) : null;
}

// تابع createSession
export async function createSession(user: Session) { // حذف async
  (await cookies()).set('session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

// تابع destroySession
export async function destroySession() { // حذف async
  (await cookies()).delete('session');
}



// تابع createSession متغیر
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function createSessionDynamic(data: any,sessionName:string) { // حذف async
//   (await cookies()).set(`${sessionName}`, JSON.stringify(data), {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7,
//     path: '/',
//   });
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function createSessionDynamic(data: any, sessionName: string): Promise<boolean> {
//   try {
//     (await cookies()).set(`${sessionName}`, JSON.stringify(data), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24 * 7,
//       path: '/',
//     });
//     return true;
//   } catch (error) {
//     console.error('خطا در ایجاد سشن:', error);
//     return false;
//   }
// }


// // تابع getSessiondynamic
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getSessionDynamic(sessionName:string,cookieHeader?: string): Promise<any | null> {
//   if (cookieHeader) {
//     // منطق Middleware
//     const sessionCookie = cookieHeader
//       .split('; ')
//       .find(c => c.startsWith('sessionGuest='))
//       ?.split('=')[1];

//     if (!sessionCookie) return null;
//     return JSON.parse(decodeURIComponent(sessionCookie))  ;
//   }


//   // منطق کامپوننت‌های سرور
//   const cookieStore = await cookies(); // بدون await
//   const sessionCookie = cookieStore.get(sessionName)?.value;
// console.log(sessionCookie,'cook')
//   //get detail user
//   if(sessionCookie){
//     const oop = await JSON.parse(sessionCookie) 

//     return oop
//   }else{
//     return null
//   }
// }

// افزودن نوع برای سشن سفارشات مهمان
interface GuestOrderSession {
  userId: string;
  orders: string[]; // آرایه‌ای از رشته‌های "productId|quantity"
}

// تابع ایجاد/آپدیت سشن مهمان
export async function createGuestSession(orderData: GuestOrderSession): Promise<boolean> {
  try {
    (await cookies()).set('guestSession', JSON.stringify(orderData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 هفته
      path: '/',
    });
    return true;
  } catch (error) {
    console.error('خطا در ایجاد سشن مهمان:', error);
    return false;
  }
}

// تابع دریافت سشن مهمان
export async function getGuestSession(): Promise<GuestOrderSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('guestSession')?.value;

  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie) as GuestOrderSession;
    } catch (error) {
      console.error('خطا در پردازش سشن مهمان:', error);
      return null;
    }
  }
  return null;
}

