"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
interface AddToCartResponse {
  success?: boolean;
  error?: string;
  message?:string
}

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const quantityRef = useRef<HTMLInputElement>(null);
  const handleAddToCart = async () => {
     // خواندن مقدار تعداد از input بدون trigger re-render
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
          quantity// یا هر مقدار دلخواه
        }),
      });
      const data: AddToCartResponse = await res.json();
      if (data.success|| data.message) {
        setResponseMessage("Product added to cart successfully!");
        queryClient.invalidateQueries({ queryKey: ["cart"] });

      } else {
        setResponseMessage(data.error || "Error adding to cart");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };


    // پاکسازی پیام بعد از ۵ ثانیه
    useEffect(() => {
      if (responseMessage) {
        const timer = setTimeout(() => {
          setResponseMessage("");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [responseMessage]);

  return (
    <div className="flex flex-col items-center gap-2 ">
    {/* استفاده از input عددی برای دریافت تعداد */}
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
    {responseMessage && (
      <div className="p-2 bg-gray-100 text-gray-700 rounded">
        {responseMessage}
      </div>
    )}
  </div>
  );
};

export default AddToCartButton;
