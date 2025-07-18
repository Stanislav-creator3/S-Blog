import { VariantProps } from "cva";
import { avatarVariants } from "./Avatar";

export interface TAvatar extends VariantProps<typeof avatarVariants>  {
  className?: string;
  src?: string;
  username: string;
};
