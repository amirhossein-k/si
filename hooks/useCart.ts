import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


const Cart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();

    // console.log("API Response:", typeof data);
    return Array.isArray(data) ? data : []; // پیشگیری از خطا

  };


export const useCart = ()=>{
    const queryClient = useQueryClient();

      // دریافت سبد خرید
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
// console.log(cart,'cartuyuyu')
  // حذف محصول از سبد خرید
  const removeFromCart = useMutation({
    mutationFn: async (id:string) => {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  return {cart,isLoading,removeFromCart}
}
