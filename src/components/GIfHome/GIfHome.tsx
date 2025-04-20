import { CATEGORYLayoutITEM } from "@/utils/types";
import Image from "next/image";
import React from "react";

const GIfHome = ({category}: {category: CATEGORYLayoutITEM[]}) => {
  return (
    <div className="grid  w-full grid-cols-1 cursor-default lg:grid-rows-1  place-items-center  auto-rows-fr  md:grid-cols-2 lg:grid-cols-2 gap-2">
      {category?.map((item:CATEGORYLayoutITEM,index)=>(
        <div className="relative rounded overflow-hidden  " key={index + item.id}>
        
        <Image
          // className="w-full h-full"
          alt=""
          src={
           item.pic
          }
          //   fill
          width={600}
          height={600}
          quality={100}
        />
      </div>
      ))}
      
      
    </div>
  );
};

export default GIfHome;
