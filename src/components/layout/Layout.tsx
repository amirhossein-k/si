

import { cn } from "@/utils/cn";
import {cva, type VariantProps} from "class-variance-authority";

const variants = cva(" rounded-3xl       ", {
  variants: {
    size: {
      first:" my-5   self-start flex  lg:w-[50%]   w-full",
      categoryMain: " col-span-4 row-span-1 md:row-span-2  h-fit bg-stone-300",
      slider:"  h-full   lg:w-[40%]   w-full",
      banner: " p-2    w-full ",
      offer: "p-2 col-span-full   row-span-1   w-full    p-2 ",
      newproduct: "p-2 col-span-full   row-span-1   w-full    p-2 ",
    },
  },
  defaultVariants: {
    size: "categoryMain",
  },
});

type GridItemProps = {children: React.ReactNode} & VariantProps<
  typeof variants
>;

const Layout = ({size, children}: GridItemProps) => {
  return (
    <div className={cn(variants({size, className: ""}))}>
      {children}
    </div>
  );
};

export default Layout;
