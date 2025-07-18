import { motion } from "motion/react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router";

export const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface Props {
  Icon: IconType;
  text: string;
  href: string;
  onClose: () => void;
}

const MenuItem = ({ href, Icon, text, onClose }: Props) => {
  return (
    <motion.li
      onClick={onClose}
      className="list-none p-0 mb-5 cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={href} className="flex items-center justify-start">
        <span className="bg-[rgba(255,255,255,0.6)] glass mr-2">
          <Icon
            size={40}
            className="text-base-accent p-1"
          />
        </span>
        <p className="flex-1 text-2xl text-center bg-[rgba(255,255,255,0.6)] p-1 glass">
          {text}
        </p>
      </Link>
    </motion.li>
  );
};

export default MenuItem;
