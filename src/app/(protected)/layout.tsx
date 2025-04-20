// src\app\(protected)\layout.tsx
'use server'
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { USERTYPE } from "@/utils/types";
import UserProvider from "@/components/provider/UserProvider";

export default async function ProtectedLayout({children}:{children:React.ReactNode}){
    // get detail user  by session 
    const userDetail = await getSession()
    // console.log(userDetail,'userDetail')
    if(!userDetail){
        redirect('/login')
    }
    return  <UserProvider user={userDetail as USERTYPE}>{children}</UserProvider>
}
