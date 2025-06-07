"use client";

import { FormattedPostType } from "@/utils/types";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PropertySite = ({ category }: { category: FormattedPostType[] }) => {
  return (
    <div className="flex md:w-[80%]  lg:w-[58%] xl:w-[50%] w-[100%] mx-auto flex-row my-4 mb-5 ">
      <ul className="w-full flex gap-5">
        <li className="flex-1 flex-col flex rounded-md  h-[180px] bg-[#ffff] relative shadow-propvist_t">
            <div className="relative h-[120px]">
 <Image
        className="rounded-md w-full h-full"
            alt=""
            fill
            style={{ objectFit: "fill" }}
            quality={100}
            src={
              "https://c713657.parspack.net/c713657/uploads/online-pay-1%20copy.jpg"
            }
          />
            </div>
         
        <p className=" text-center flex justify-center items-center font-semibold  h-[50px] ">انتخابی هوشمندانه

  </p>
        </li>
        <li className="flex-1 flex-col flex rounded-md  h-[180px] bg-[#ffff] relative shadow-propvist_b">
          {" "}
          <div className="relative h-[120px]">

          <Image
            className="rounded-md w-full h-full"
            fill
            style={{ objectFit: "fill" }}
            quality={100}
            src={
              "https://c713657.parspack.net/c713657/uploads/location-1%20copy.jpg"
            }
            alt=""
          />
          </div>
          <p className=" text-center flex justify-center items-center font-semibold  h-[50px] "> پشتیبانی آنلاین </p>
        </li>

        <li className="flex-1 flex-col flex rounded-md  h-[180px] bg-[#ffff] relative shadow-propvist_t" >
          {" "}
           <div className="relative h-[120px]">

          <Image
            className="rounded-md "
            fill
            style={{ objectFit: "fill" }}
            quality={100}
            src={
              "https://c713657.parspack.net/c713657/uploads/delivery-1%20copy.jpg"
            }
            alt=""
          />
           </div>
                     <p className=" text-center flex justify-center items-center font-semibold  h-[50px] ">  ارسال فوری

</p>

        </li>
        <li className="flex-1 flex-col flex rounded-md  h-[180px] bg-[#ffff] relative shadow-propvist_b">
          {" "}
           <div className="relative h-[120px]">

          <Image
            className="rounded-md "
            fill
            style={{ objectFit: "fill" }}
            quality={100}
            src={
              "https://c713657.parspack.net/c713657/uploads/club-1%20copy.jpg"
            }
            alt=""
          />
           </div>
                     <p className=" text-center flex justify-center items-center font-semibold  h-[50px] ">ضمانت بهترین قیمت

</p>

        </li>
        <li className="flex-1 flex-col flex rounded-md  h-[180px] bg-[#ffff] relative shadow-propvist_t">
          {" "}
           <div className="relative h-[120px]">

          <Image
            className="rounded-md "
            fill
            style={{ objectFit: "fill" }}
            quality={100}
            src={
              "https://c713657.parspack.net/c713657/uploads/cash-1%20copy.jpg"
            }
            alt=""
          />
           </div>
                     <p className=" text-center flex justify-center items-center font-semibold  h-[50px]  "> پرداخت آنلاین

 </p>

        </li>
      </ul>
    </div>
  );
};

export default PropertySite;
