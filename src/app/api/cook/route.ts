// app/api/cook/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USERTYPE } from "@/utils/types";
import { GetUser } from "../../../../actions/GetUser";

export async function GET(): Promise<NextResponse<USERTYPE | { error: string }>> {
  try {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'No session' }, { status: 401 });
    }

    const sessionData: { userId?: string } = JSON.parse(sessionCookie);
    
    if (!sessionData?.userId) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    const response = await GetUser(sessionData.userId);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: response.status }
      );
    }

    const userData: USERTYPE = await response.json();
    return NextResponse.json(userData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error("Error in /api/cook:", error);
    return NextResponse.json(
      { error: "خطای سرور" },
      { status: 500 }
    );
  }
}