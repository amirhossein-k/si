

import { cn } from "@/utils/cn";
import {cva, type VariantProps} from "class-variance-authority";

const variants = cva("     ", {
  variants: {
    size: {
      first:" my-5 px-5  md:gap-4 gap-5 flex md:flex-row w-full flex-col",
      
     
    },
  },
  defaultVariants: {
    size: "first",
  },
});

type GridItemProps = {children: React.ReactNode} & VariantProps<
  typeof variants
>;

const LayoutFirst = ({size, children}: GridItemProps) => {
  return (
    <div className={cn(variants({size, className: ""}))}>
      {children}
    </div>
  );
};

export default LayoutFirst;
