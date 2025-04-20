import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useContext } from "react";

import { UserContext } from "@/context/UserContext2";

const useLogout = ()=>{
    const queryClient = useQueryClient()
    const router = useRouter()
    const { logout: userContextLogout } = useContext(UserContext);

    return useMutation({
        mutationFn: async ()=>{
            ///درخواست خروج کاربر api
            await fetch("/api/logout", { credentials: "include" });
        },
        onSuccess: ()=>{
                  // حذف کش سبد خرید و اطلاعات کاربر
                  queryClient.removeQueries({queryKey:['cart']})
                  queryClient.removeQueries({queryKey:['user']})
                    // به روزرسانی UserContext (تغییر مقدار user به null)
      userContextLogout();
     // هدایت به صفحه ورود
     router.push("/login");
        }
    })
}

export default useLogout;
