import { VariantProps } from "cva";
import { directionsVariants } from "../ui/Tooltip/Tooltip";

export const tooltipVariants = ({
  direction,
}: VariantProps<typeof directionsVariants>) => {
  switch (direction) {
    case "right":
      return {
        initial: { x: -15, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: {
          x: -15,
          opacity: 0,
        },
      };
    case "left":
      return {
        initial: { x: 15, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: {
          x: 15,
          opacity: 0,
          scale: 0.5,
        },
      };
    case "top":
      return {
        initial: { y: 15, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: {
          y: 15,
          opacity: 0,
          scale: 0.5,
        },
      };
    case "bottom":
      return {
        initial: { y: -15, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: {
          y: -15,
          opacity: 0,
          scale: 0.5,
        },
      };
    default:
      break;
  }
};
