// src\app\(public)\products\[id]\page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { GetProduct } from "../../../../../actions/GetProductList";
import ImagesProduct from "@/components/imageShow/ImagesProductID";
import { PHOTO, FormattedPostType } from "@/utils/types";
import AddToCartButton from "@/components/products/AddToCartButton";
import Tabs from "@/components/TabsProduct/Tabs";
import CurrentPath from "@/components/path/CurrentPath";
import { calculatePercentage } from "@/utils/OfferMade";
import { Rating, ThinStar } from "@smastrom/react-rating";
// دریافت محصول بر اساس `slug`
async function getProduct(id: string): Promise<FormattedPostType | null> {
  try {
    const response = await GetProduct();
    if (!response.ok) throw new Error("خطا در دریافت اطلاعات محصول");

    const products: FormattedPostType[] = await response.json();
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
  const currectPath = 'product'
  if (!product) notFound();

  // اعتبارسنجی تصاویر
  const safeImages: PHOTO[] = product.productImage?.length
    ? product.productImage
    : [
        {
          id: "default",
          childImage: "/default-image.jpg",
          defaultImage: true,
          fileKey: "",
          ownerId: "",
        },
      ];

      console.log(product,'product')
      
  return (
    <div className="p-6 " dir="rtl">
      <div className="nav">
        <CurrentPath productId={product.id}  cat={product.categoryList[0].category || ""} />
      </div>
      <div className="top flex xl:flex-row flex-col gap-3">
        <div className="images xl:w-[40%] w-full h-full flex justify-center items-center md:my-0">
          <ImagesProduct images={safeImages} />
        </div>

        <div className="body p-2 w-full xl:w-[60%] flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="score flex flex-row gap-4">
           {product.review && product.review.length > 0 && (
    <span className="mr-2">
      <Rating
        style={{ maxWidth: 100 }}
        value={
          product.review.reduce((sum, review) => sum + review.rating, 0) / product.review.length
        }
        readOnly
        itemStyles={{
          itemStrokeWidth: 2,
          activeFillColor: "#f1a545",
          activeStrokeColor: "#d3d3d3",
          itemShapes:ThinStar
        }}
      />
    </span>
  )}
            <div className="count">{product.review.length} نظر</div>
          </div>
          <div className="buy_text">
            <p className="mt-2 text-lg font-semibold">
              {product.priceOffer !== 0 ? (
                <>
                  <span className="relative mx-2 w-fit">
                    {product.price?.toLocaleString() ?? "."}
                    <span className="diagonal-line w-[80%] h-[2px] absolute bg-red-600 rotate-[0deg] right-[7px] top-[13px] inline-block"></span>
                  </span>
                  {calculatePercentage(
                    product.priceOffer,
                    product.price.toString()
                  ).toLocaleString()}
                </>
              ) : (
                <>{product.price?.toLocaleString() ?? "."}</>
              )}{" "}
              تومان
            </p>
          </div>
          <ul className="property my-2 border-t-1 border-t-[#000] py-2 list-disc px-3">
            <h2 className="font-semibold text-sm mb-2">ویژگی‌ها:</h2>

            {product.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>;
            })}
          </ul>
          <div className="my-4">
            <h2 className="font-semibold text-sm mb-2">دسته بندی:</h2>
            <div className="flex flex-wrap gap-2">
              {product.categoryList.map((cat) => (
                <Link href={`/products/list?category=${cat.category}&sort=new`}
                key={cat.id}
                
                >

                <span
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-200"
                  >
                  {cat.category}
                </span>
                  </Link>
              ))}
            </div>
          </div>
          <div className="buy">
            <AddToCartButton productId={product.id} currectPath={currectPath} />
          </div>
          <p className="text-gray-700">{product.published}</p>

          <Link
            href="/products"
            className="text-blue-500 mt-4 block hover:underline"
          >
            بازگشت به لیست محصولات
          </Link>
        </div>
      </div>
      <div className="botom bg-green-">
        <Tabs description={product.content ?? ""} id={product.id} tableContent={product.tableContent ??""}/>
      </div>
    </div>
  );
}
