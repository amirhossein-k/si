'use client'
import { UserContext } from "@/context/UserContext2";
import { Spinner} from "@heroui/react";
import React, { useContext } from 'react'

const SpinnersNav = () => {
    // const [isPending,startTransition] = useTransition()
  const { user,loadingNav} = useContext(UserContext);
    console.log(user,'ii')
   
  return (
    <div className={`loading  ${loadingNav ? "block " : "hidden"} fixed gap-4 text-center rounded-lg z-50  w-[300px] h-[50px] flex justify-center items-center  top-2 right-2   bg-gray-400`}
    dir="rtl"
    >
          {/* <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} /> */}

          <Spinner classNames={{label: "text-foreground mt-4"}}  variant="wave" />
{user ? (
    <>
    <span className="font-bold">    
   
   {user?.name}
   </span>
   <span>جان لطفا کمی صبر کن </span>    
       </>
):(
    <span>لطفا کمی صبر کنید</span>
)}
      
   
    
      </div>
  )
}

export default SpinnersNav
