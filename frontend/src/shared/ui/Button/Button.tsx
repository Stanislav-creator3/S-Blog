import { cva, VariantProps } from "cva";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 rounded-[8px] text-center cursor-pointer whitespace-nowrap duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    intent: {
      default:
        "transition-colors bg-base-accent hover:bg-blue-700 text-base-white",
      secondary:
        "transition-all border-2 border-base-accent hover:drop-shadow-lg hover:scale-95 text-base-black",
      ghost:
        "transition-colors bg-transparent border border-gray-terliary hover:bg-gray-200 text-base-black",
    },
    size: {
      default: "h-10 py-2 px-4 rounded-[8px]",
      sm: "w-9 h-9 px-3 rounded-[8px]",
      lg: "w-50 h-11 px-8 rounded-[8px]",
      full: "w-full",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ className, intent, size, ...props }) => {
  return (
    <button
      className={buttonVariants({ intent, size, className })}
      {...props}
    ></button>
  );
};

export { Button, buttonVariants };
