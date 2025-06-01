// src\components\products\AddToCartButton.tsx
"use client";
import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddToCartResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

interface AddToCartButtonProps {
  productId: string;
  currectPath:string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const quantityRef = useRef<HTMLInputElement>(null);

  const handleAddToCart = async () => {
    const quantityValue = quantityRef.current?.value;
    const quantity = quantityValue ? parseInt(quantityValue, 10) : 1;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      const data: AddToCartResponse = await res.json();
      if (data.success || data.message) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("در لیست خرید اضافه شد", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.error(data.error || "خطا در افزودن به سبد خرید", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در افزودن به سبد خرید", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="number"
        min="1"
        defaultValue="1"
        ref={quantityRef}
        className="p-2 border rounded w-20 text-center text-red-500"
      />
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
    </div>
  );
};

export default AddToCartButton;