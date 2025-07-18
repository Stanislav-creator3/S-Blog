import { cva, VariantProps } from "cva";
import { Link } from "react-router";

interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof variants> {
  className?: string;
  href: string;
  children: React.ReactNode;
}

export const variants = cva({
  base: "transition duration-200 hover:opacity-80",
  variants: {
    intent: {
      default: "text-base-accent",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const LinkUi = ({
  className,
  href,
  children,
  intent,
  ...props
}: Props) => {
  return (
    <Link className={variants({ intent, className })} to={href} {...props}>
      {children}
    </Link>
  );
};
