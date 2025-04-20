// src/app/(public)/products/[id]/page.tsx
import { notFound } from "next/navigation";
// import { Post } from '@/app/(public)/products/page';
import Link from "next/link";
import { GetProduct } from "../../../../../actions/GetProductList";
import ImagesProduct from "@/components/imageShow/ImagesProductID";
import { PHOTO, POSTTYPE } from "@/utils/types";
import AddToCartButton from "@/components/products/AddToCartButton";
import Tabs from "@/components/TabsProduct/Tabs";
import CurrentPath from "@/components/path/CurrentPath";
import { calculatePercentage } from "@/utils/OfferMade";
// دریافت محصول بر اساس `slug`
async function getProduct(id: string): Promise<POSTTYPE | null> {

  try {
    const response = await GetProduct();
    if (!response.ok) throw new Error("خطا در دریافت اطلاعات محصول");

    const products: POSTTYPE[] = await response.json();
    return products.find((p) => p.id === id) ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
    if (!product) notFound();

  // if (!product) return notFound(); // اگر محصول وجود نداشت، صفحه 404 نمایش داده شود
  // اعتبارسنجی تصاویر
  const safeImages: PHOTO[] = product.productImage?.length
    ? product.productImage
    : [{ id: "default", childImage: "/default-image.jpg", defaultImage: true, fileKey: "", ownerId: "" }];

    
  console.log(product, 'miiiiii')
  return (
    <div className="p-6 " dir="rtl">
      <div className="nav">
      <CurrentPath productId={product.id}/>
         
      
      </div>
      <div className="top  flex xl:flex-row flex-col gap-3">

        <div className="images xl:w-[40%] w-full h-full flex justify-center items-center md:my-0">
          <ImagesProduct images={safeImages} />
        </div>

        <div className="body bg-red-400 p-2 w-full xl:w-[60%]  flex flex-col gap-3">

          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="score flex flex-row gap-4">
            <div className="icone">
              <i className="bi bi-star-fill text-yellow-500"></i>
              <i className="bi bi-star text-yellow-500"></i>
            </div>
            <div className="count">0نظر</div>
            <button>افزودن امتیاز</button>
          </div>
          <div className="buy_text">
            <p className="mt-2 text-lg font-semibold">{product.price?.toLocaleString() ?? "."}  {product.priceOffer !== 0 && (
                  <>
                    <span className="diagonal-line w-[45px] h-[2px] absolute bg-red-600 rotate-[0deg] right-2 top-[13px] inline-block"></span>
                    {calculatePercentage(product.priceOffer, product.price.toString()).toLocaleString()}
                  </>
                )} تومان</p>

          </div>
          <ul className="property my-2 border-t-1 border-t-[#000] py-2 list-disc px-3">
            <li className=""> صدای باس و استریو.</li>
            <li className="">  صفحه نمایش با وضوح 3088 در 1440 پیکسل.</li>
          </ul>
          <div className="buy">
            <AddToCartButton productId={product.id} />
          </div>
          <p className="text-gray-700">{product.published}</p>


          <Link href="/products" className="text-blue-500 mt-4 block hover:underline">
            بازگشت به لیست محصولات
          </Link>
        </div>
      </div>
<div className="botom bg-green-">
<Tabs description={product.content ?? ''} />

</div>

    </div>
  );
}

